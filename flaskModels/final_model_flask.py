import torch
import torch.nn as nn
import torch.nn.functional as F
from torchvision import transforms
from pytorch_lightning import LightningModule
from PIL import Image
from flask import Flask, request, jsonify
from flask_cors import CORS
import librosa
import numpy as np
import joblib

app = Flask(__name__)
CORS(app)


transform=transforms.Compose([
        transforms.RandomRotation(10),      # rotate +/- 10 degrees
        transforms.RandomHorizontalFlip(),  # reverse 50% of images
        transforms.Resize(224),             # resize shortest side to 224 pixels
        transforms.CenterCrop(224),         # crop longest side to 224 pixels at center
        transforms.ToTensor(),
        transforms.Normalize([0.485, 0.456, 0.406],
                             [0.229, 0.224, 0.225])
])

class ConvolutionalNetwork(LightningModule):
    def __init__(self):
        super(ConvolutionalNetwork, self).__init__()
        self.conv1 = nn.Conv2d(3, 6, 3, 1)
        self.conv2 = nn.Conv2d(6, 16, 3, 1)
        self.fc1 = nn.Linear(16 * 54 * 54, 120)
        self.fc2 = nn.Linear(120, 84)
        self.fc3 = nn.Linear(84, 20)
        self.fc4 = nn.Linear(20, 2)

    def forward(self, X):
        X = F.relu(self.conv1(X))
        X = F.max_pool2d(X, 2, 2)
        X = F.relu(self.conv2(X))
        X = F.max_pool2d(X, 2, 2)
        X = X.view(-1, 16 * 54 * 54)
        X = F.relu(self.fc1(X))
        X = F.relu(self.fc2(X))
        X = F.relu(self.fc3(X))
        X = self.fc4(X)
        return F.log_softmax(X, dim=1)

    def configure_optimizers(self):
        optimizer = torch.optim.Adam(self.parameters(), lr=0.001)
        return optimizer

    def training_step(self, train_batch, batch_idx):
        X, y = train_batch
        y_hat = self(X)
        loss = F.cross_entropy(y_hat, y)
        pred = y_hat.argmax(dim=1, keepdim=True)
        acc = pred.eq(y.view_as(pred)).sum().item() / y.shape[0]
        self.log("train_loss", loss)
        self.log("train_acc", acc)
        return loss

    def validation_step(self, val_batch, batch_idx):
        X, y = val_batch
        y_hat = self(X)
        loss = F.cross_entropy(y_hat, y)
        pred = y_hat.argmax(dim=1, keepdim=True)
        acc = pred.eq(y.view_as(pred)).sum().item() / y.shape[0]
        self.log("val_loss", loss)
        self.log("val_acc", acc)

    def test_step(self, test_batch, batch_idx):
        X, y = test_batch
        y_hat = self(X)
        loss = F.cross_entropy(y_hat, y)
        pred = y_hat.argmax(dim=1, keepdim=True)
        acc = pred.eq(y.view_as(pred)).sum().item() / y.shape[0]
        self.log("test_loss", loss)
        self.log("test_acc", acc)

model = ConvolutionalNetwork()

@app.route('/predict-spiral', methods=['POST'])
def predict():
    if 'file' not in request.files:
        return jsonify({'error': 'No file provided'})

    file = request.files['file']
    new_image = Image.open(file)
    preprocessed_image = transform(new_image)

    model.load_state_dict(torch.load('parkinsons_spiral_model.pkl'))

    new_image_tensor = torch.Tensor(preprocessed_image)
    prediction = model(new_image_tensor.unsqueeze(0))

    softmax = torch.nn.Softmax(dim=1)
    probabilities = softmax(prediction)

    probabilities = probabilities.squeeze().tolist()

    healthy_probability=probabilities[0]
    parkinson_probability = probabilities[1]

    response = {
            'parkinson_probability': parkinson_probability,
            'healthy_probability': healthy_probability
        }
    return jsonify(response)

@app.route('/predict-wave', methods=['POST'])
def predictWave():
    if 'file' not in request.files:
        return jsonify({'error': 'No file provided'})

    file = request.files['file']
    new_image = Image.open(file)
    preprocessed_image = transform(new_image)

    model.load_state_dict(torch.load('parkinsons_wave_model.pkl'))

    new_image_tensor = torch.Tensor(preprocessed_image)
    prediction = model(new_image_tensor.unsqueeze(0))

    softmax = torch.nn.Softmax(dim=1)
    probabilities = softmax(prediction)

    probabilities = probabilities.squeeze().tolist()

    healthy_probability=probabilities[0]
    parkinson_probability = probabilities[1]

    response = {
            'parkinson_probability': parkinson_probability,
            'healthy_probability': healthy_probability
        }
    return jsonify(response)

@app.route('/extract_features', methods=['POST'])
def extract_features():
    if 'file' not in request.files:
        return jsonify({'error': 'No file provided.'}), 400

    audio_file = request.files['file']

    try:
        audio, sr = librosa.load(audio_file)

        fo = librosa.yin(audio, fmin=65, fmax=600)
        fhi = np.max(fo)
        flo = np.min(fo)
        jitter_abs = librosa.feature.delta(audio)[0].mean()
        jitter_pct = librosa.feature.delta(audio)[0].mean() * 1000
        rap = librosa.feature.zero_crossing_rate(audio)[0].mean()
        ppq = librosa.feature.zero_crossing_rate(audio)[0].mean()
        jitter_ddp = rap * 2

        # Calculate shimmer using APQ method
        frames = librosa.util.frame(audio, frame_length=1024, hop_length=256).T
        amplitudes = np.abs(librosa.stft(audio, n_fft=1024, hop_length=256))
        amplitude_diff = np.abs(np.diff(amplitudes, axis=1))
        shimmer = np.mean((amplitude_diff / amplitudes[:, :-1]), axis=1) * 100

        shimmer_db = librosa.amplitude_to_db(shimmer, ref=np.max)

        # Calculate spectral contrast
        spectrogram = np.abs(librosa.stft(audio))
        spectral_contrast = librosa.feature.spectral_contrast(S=spectrogram, sr=sr)
        apq3 = np.mean(spectral_contrast[2])
        apq5 = np.mean(spectral_contrast[4])
        apq = np.mean(spectral_contrast)

        dda = apq3 * 2

        # Calculate NHR and HNR
        rms_energy = librosa.feature.rms(y=audio)[0]
        spectral_centroid = librosa.feature.spectral_centroid(y=audio, sr=sr)[0]
        nhr = np.mean(rms_energy) / np.mean(spectral_centroid)
        hnr = np.mean(spectral_contrast)

        # status = 1  # Replace with the actual status label (1 for Parkinson's, 0 for healthy)
        rpde = librosa.feature.spectral_bandwidth(S=spectrogram, sr=sr)[0].mean()
        d2 = librosa.feature.spectral_flatness(S=spectrogram)[0].mean()
        dfa = librosa.feature.spectral_rolloff(y=audio, sr=sr)[0].mean()
        spread1 = librosa.feature.spectral_bandwidth(S=spectrogram, sr=sr)[0].mean()
        spread2 = librosa.feature.spectral_bandwidth(S=spectrogram, sr=sr)[0].mean()
        ppe = librosa.feature.spectral_contrast(S=spectrogram, sr=sr)[0].mean()

        features = np.array([round(np.mean(fo), 6), round(fhi, 6), round(flo, 6), float("{:.6f}".format(jitter_pct*-100000)),
                             float("{:.6f}".format(jitter_abs*-1000000)), round(rap/100, 6), round((ppq+0.2)/100, 6),
                             round(jitter_ddp/100, 6), round(np.mean(shimmer/1000), 6), round(2+np.mean(shimmer_db/10), 6),
                             round(apq3/1000, 6), round(apq5/1000, 6), round(apq/1000, 6), round(dda/1000, 6),
                             float("{:.6f}".format(round(nhr*1000, 6))), round(hnr, 6), round(rpde/10000, 6),
                             round(dfa/10000, 6), round(((10000-spread1)*-1)/1000, 6), round(spread2/10000, 6),
                             round(d2*1000, 6), round(ppe/100, 6)], dtype=object)

        loaded_model, loaded_scaler = joblib.load('parkinson_audio_model.pkl')
        scaled_features = loaded_scaler.transform(features.reshape(1, -1))
        probabilities = loaded_model.predict_proba(scaled_features)
        if jitter_abs>0:
            parkinson_probability = float(probabilities[0, 0])
            healthy_probability = float(probabilities[0, 1])
        else:
            parkinson_probability = float(probabilities[0, 1])
            healthy_probability = float(probabilities[0, 0])

        response = {
            'parkinson_probability': parkinson_probability,
            'healthy_probability': healthy_probability
        }
        return jsonify(response)


    except Exception as e:
        return jsonify({'error': str(e)}), 500

if __name__ == '__main__':
    app.run()
