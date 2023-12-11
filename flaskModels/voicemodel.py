# -*- coding: utf-8 -*-
"""AudioModel.ipynb

Automatically generated by Colaboratory.

Original file is located at
    https://colab.research.google.com/drive/1Mt1kBo1jhZ79ZC0sVhkmxSO5xBcRbXfa

Name: This is not a feature that can be extracted from the audio signal. It is typically a label or identifier associated with the individual or recording.

MDVP:Fo(Hz): Fundamental frequency (in Hz) represents the perceived pitch of the voice.

MDVP:Fhi(Hz): The highest frequency (in Hz) in the voice signal.

MDVP:Flo(Hz): The lowest frequency (in Hz) in the voice signal.

MDVP:Jitter(%): Jitter is a measure of the variation in the time between consecutive vocal fold vibrations, expressed as a percentage.

MDVP:Jitter(Abs): Jitter in absolute terms, measured in milliseconds.

MDVP:RAP: Relative average perturbation measures the average absolute difference between consecutive periods of the fundamental frequency.

MDVP:PPQ: Pitch period perturbation quotient measures the cycle-to-cycle variations of the pitch periods.

Jitter:DDP: Jitter derived difference measures the absolute differences between jitter measurements.

MDVP:Shimmer: Shimmer is a measure of the variation in amplitude or intensity of the speech signal.

MDVP:Shimmer(dB): Shimmer in decibels, a logarithmic scale representing the changes in amplitude.

Shimmer:APQ3: Amplitude perturbation quotient measures the variation in amplitude between consecutive periods.

Shimmer:APQ5: Similar to APQ3, but using a wider window of consecutive periods.

MDVP:APQ: Amplitude perturbation quotient measures the variation in amplitude of the speech signal.

Shimmer:DDA: Shimmer derived difference measures the absolute differences between shimmer measurements.

NHR: Noise-to-harmonics ratio represents the ratio of noise to the harmonics in the speech signal.

HNR: Harmonics-to-noise ratio measures the amount of periodic (harmonic) components compared to non-periodic (noise) components.

Status: This is a label indicating the presence or absence of Parkinson's disease in the subject.

RPDE: Recurrence period density entropy measures the complexity of the voice signal.

DFA: Detrended fluctuation analysis measures the self-similarity or fractal-like properties of the voice signal.

spread1, spread2, D2: These features are related to nonlinear dynamical complexity measures of the voice signal and require further explanation beyond the scope of this response.

PPE: Pitch period entropy measures the variability and unpredictability of the pitch periods.
"""

import librosa
import numpy as np

# Load the audio file
audio_path = "/content/LJ037-0171.wav"
audio, sr = librosa.load(audio_path)

# Extract features
name = "Sample Name"  # Replace with the actual name
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

status = 1  # Replace with the actual status label (1 for Parkinson's, 0 for healthy)
rpde = librosa.feature.spectral_bandwidth(S=spectrogram, sr=sr)[0].mean()
d2 = librosa.feature.spectral_flatness(S=spectrogram)[0].mean()
dfa = librosa.feature.spectral_rolloff(y=audio, sr=sr)[0].mean()
spread1 = librosa.feature.spectral_bandwidth(S=spectrogram, sr=sr)[0].mean()
spread2 = librosa.feature.spectral_bandwidth(S=spectrogram, sr=sr)[0].mean()
ppe = librosa.feature.spectral_contrast(S=spectrogram, sr=sr)[0].mean()

# Print the extracted features
print("Name:", name)
print("MDVP:Fo(Hz):", round(np.mean(fo), 6))
print("MDVP:Fhi(Hz):", round(fhi, 6))
print("MDVP:Flo(Hz):", round(flo, 6))
print("MDVP:Jitter(%):", round(jitter_pct/10, 6))
print("MDVP:Jitter(Abs):", "{:.6f}".format(round(jitter_abs, 6)))
print("MDVP:RAP:", round(rap/100, 6))
print("MDVP:PPQ:", round((ppq+0.2)/100, 6))
print("Jitter:DDP:", round(jitter_ddp/100, 6))
print("MDVP:Shimmer:", round(np.mean(shimmer/10000), 6))
print("MDVP:Shimmer(dB):", round(1-(np.mean(shimmer_db/10)*-1), 6))
print("Shimmer:APQ3:", round(apq3/1000, 6))
print("Shimmer:APQ5:", round(apq5/1000, 6))
print("MDVP:APQ:", round(apq/1000, 6))
print("Shimmer:DDA:", round(dda/1000, 6))
print("NHR:", "{:.6f}".format(round(nhr*1000, 6)))
print("HNR:", round(hnr, 6))
print("Status:", round(status, 6))
print("RPDE:", round(rpde/10000, 6))
print("DFA:", round(dfa/10000, 6))
print("spread1:", round(((10000-spread1)*-1)/1000, 6))
print("spread2:", round(spread2/10000, 6))
print("D2:", round(d2*100, 6))
print("PPE:", round(ppe/100, 6))

import librosa
import numpy as np

# Load the audio file
audio_path = "/content/clip1.wav"
audio, sr = librosa.load(audio_path)

# Extract features
name = "Sample Name"  # Replace with the actual name
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

status = 1  # Replace with the actual status label (1 for Parkinson's, 0 for healthy)
rpde = librosa.feature.spectral_bandwidth(S=spectrogram, sr=sr)[0].mean()
d2 = librosa.feature.spectral_flatness(S=spectrogram)[0].mean()
dfa = librosa.feature.spectral_rolloff(y=audio, sr=sr)[0].mean()
spread1 = librosa.feature.spectral_bandwidth(S=spectrogram, sr=sr)[0].mean()
spread2 = librosa.feature.spectral_bandwidth(S=spectrogram, sr=sr)[0].mean()
ppe = librosa.feature.spectral_contrast(S=spectrogram, sr=sr)[0].mean()

# Print the extracted features
print("Name:", name)
print("MDVP:Fo(Hz):", round(np.mean(fo), 6))
print("MDVP:Fhi(Hz):", round(fhi, 6))
print("MDVP:Flo(Hz):", round(flo, 6))
print("MDVP:Jitter(%):", round(jitter_pct/10, 6))
print("MDVP:Jitter(Abs):", "{:.6f}".format(round(jitter_abs, 6)))
print("MDVP:RAP:", round(rap/100, 6))
print("MDVP:PPQ:", round((ppq+0.2)/100, 6))
print("Jitter:DDP:", round(jitter_ddp/100, 6))
print("MDVP:Shimmer:", round(np.mean(shimmer/10000), 6))
print("MDVP:Shimmer(dB):", round(1-(np.mean(shimmer_db/10)*-1), 6))
print("Shimmer:APQ3:", round(apq3/1000, 6))
print("Shimmer:APQ5:", round(apq5/1000, 6))
print("MDVP:APQ:", round(apq/1000, 6))
print("Shimmer:DDA:", round(dda/1000, 6))
print("NHR:", "{:.6f}".format(round(nhr*1000, 6)))
print("HNR:", round(hnr, 6))
print("Status:", round(status, 6))
print("RPDE:", round(rpde/10000, 6))
print("DFA:", round(dfa/10000, 6))
print("spread1:", round(((10000-spread1)*-1)/1000, 6))
print("spread2:", round(spread2/10000, 6))
print("D2:", round(d2*100, 6))
print("PPE:", round(ppe/100, 6))

import librosa
import numpy as np

# Load the audio file
audio_path = "/content/clip1.wav"
audio, sr = librosa.load(audio_path)

# Extract features
name = "Sample Name"  # Replace with the actual name
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

# Print the extracted features
print("Name:", name)
print("MDVP:Fo(Hz):", round(np.mean(fo), 6))
print("MDVP:Fhi(Hz):", round(fhi, 6))
print("MDVP:Flo(Hz):", round(flo, 6))
print("MDVP:Jitter(%):", "{:.6f}".format(jitter_pct*-100000))
print("MDVP:Jitter(Abs):", "{:.6f}".format(jitter_abs*-1000000))
print("MDVP:RAP:", round(rap/100, 6))
print("MDVP:PPQ:", round((ppq+0.2)/100, 6))
print("Jitter:DDP:", round(jitter_ddp/100, 6))
print("MDVP:Shimmer:", round(np.mean(shimmer/1000), 6))
print("MDVP:Shimmer(dB):", round(2+np.mean(shimmer_db/10), 6))
print("Shimmer:APQ3:", round(apq3/1000, 6))
print("Shimmer:APQ5:", round(apq5/1000, 6))
print("MDVP:APQ:", round(apq/1000, 6))
print("Shimmer:DDA:", round(dda/1000, 6))
print("NHR:", "{:.6f}".format(round(nhr*1000, 6)))
print("HNR:", round(hnr, 6))
# print("Status:", round(status, 6))
print("RPDE:", round(rpde/10000, 6))
print("DFA:", round(dfa/10000, 6))
print("spread1:", round(((10000-spread1)*-1)/1000, 6))
print("spread2:", round(spread2/10000, 6))
print("D2:", round(d2*1000, 6))
print("PPE:", round(ppe/100, 6))

features12=np.array([round(np.mean(fo), 6), round(fhi, 6), round(flo, 6), float("{:.6f}".format(jitter_pct*-100000)), float("{:.6f}".format(jitter_abs*-1000000)), round(rap/100, 6), round((ppq+0.2)/100, 6), round(jitter_ddp/100, 6),
       round(np.mean(shimmer/1000), 6), round(2+np.mean(shimmer_db/10), 6), round(apq3/1000, 6), round(apq5/1000, 6), round(apq/1000, 6), round(dda/1000, 6), float("{:.6f}".format(round(nhr*1000, 6))), round(hnr, 6),
       round(rpde/10000, 6), round(dfa/10000, 6), round(((10000-spread1)*-1)/1000, 6), round(spread2/10000, 6), round(d2*1000, 6), round(ppe/100, 6)],
      dtype=object)

features12

import numpy as np
import pandas as pd
import os, sys
from sklearn.preprocessing import MinMaxScaler
from sklearn.model_selection import train_test_split
from xgboost import XGBClassifier
from sklearn.metrics import accuracy_score

df = pd.read_csv('/content/parkinsons.data.csv')

scaler = MinMaxScaler((-1, 1))

features = df.loc[:, df.columns != 'status'].values[:, 1:]
labels = df.loc[:, 'status'].values

X = scaler.fit_transform(features)
y = labels

x_train, x_test, y_train, y_test=train_test_split(X, y, test_size=0.15)

model = XGBClassifier()
model.fit(x_train, y_train)

import joblib

joblib.dump((model, scaler), 'parkinson_audio_model.pkl')

y_prediction = model.predict(x_test)
print("Accuracy Score is", accuracy_score(y_test, y_prediction) * 100)

selected_sample_features = features12
scaled_selected_sample_features = scaler.transform(selected_sample_features.reshape(1, -1))
probabilities = model.predict_proba(scaled_selected_sample_features)
parkinson_probability = probabilities[0, 1]
healthy_probability = probabilities[0, 0]

print("Probability of Parkinson's disease: ", parkinson_probability)
print("Probability of being healthy:", healthy_probability)

import joblib
loaded_model, loaded_scaler = joblib.load('parkinson_audio_model.pkl')

selected_sample_features = features12
scaled_selected_sample_features = loaded_scaler.transform(selected_sample_features.reshape(1, -1))
probabilities = loaded_model.predict_proba(scaled_selected_sample_features)
parkinson_probability = probabilities[0, 1]
healthy_probability = probabilities[0, 0]

print("Probability of Parkinson's disease: ", parkinson_probability)
print("Probability of being healthy:", healthy_probability)