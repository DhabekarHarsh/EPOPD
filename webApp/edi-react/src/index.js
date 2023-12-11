import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import { Route, Routes, BrowserRouter } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import Footer from './components/common/Footer';
import Navbar from './components/common/Navbar';
import Home from './components/homepage/Home';
import Login from './components/user/Login';
import Profile from './components/user/Profile';
import Team from './components/team/Team';
import ForgotPass from './components/user/ForgotPass';
import Register from './components/user/Register';
import 'react-toastify/dist/ReactToastify.css';
import AudioTest from './components/test/AudioTest';
import ImageTest from './components/test/ImageTest';
import Info from './components/information/Info';

export default function App() {
  return(
    <>
    <Navbar />
    <ToastContainer
        position="top-center"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={true}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/team" element={<Team />} />
          <Route path="/forgetpassword" element={<ForgotPass />} />
          <Route path="/register" element={<Register />} />
          <Route path="/audio-test" element={<AudioTest />} />
          <Route path="/image-test" element={<ImageTest />} />
          <Route path="/preventive-measures" element={<Info />} />
        </Routes>
      </BrowserRouter>
    <Footer/>
    </>
  );
}

ReactDOM.render(<React.StrictMode>
  <App />
</React.StrictMode>,
document.getElementById('root'));