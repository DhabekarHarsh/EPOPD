import React from "react";
import { useState } from "react";
import { auth, googleAuthProvider } from "./firebase";
import { signInWithEmailAndPassword } from "firebase/auth";
import { useNavigate } from 'react-router-dom';
import { createOrUpdateUser } from "../../api/auth";
import { signInWithPopup } from "firebase/auth";
import { findUserByEmail } from "../../api/user";
import { toast } from 'react-toastify';

export default function Login() {
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await signInWithEmailAndPassword(auth, email, password);
      await findUserByEmail(email)
      .then(res => {
          window.localStorage.setItem("userid", res.data._id);
          window.localStorage.setItem("name", res.data.name);
          window.localStorage.setItem("email", email);
        })
      .catch(err => {console.log(err);
      toast.error(err);})
      setEmail("");
      setPassword("");
      toast.success("Login Successful");
      navigate("/");
    }
    catch (error) {
      console.log(error.message);
      toast.error(error.message);
    }
  };

  const googleLogin = () => {
    signInWithPopup(auth, googleAuthProvider)
      .then(async (result) => {
        const { user } = result;
        const idTokenResult = await user.getIdTokenResult();
        window.localStorage.setItem("email", user.email);
        window.localStorage.setItem("authtoken", idTokenResult.token);
        createOrUpdateUser(idTokenResult.token, user.email.split("@")[0])
          .then((res) => {
            toast.success("Login Successful");
            window.localStorage.setItem("name", res.data.name);
            window.localStorage.setItem("userid", res.data._id);
          })
          .catch((err) => console.log("err => ", err));
        navigate("/");
      })
      .catch((err) => {
        console.log(err);
        toast.error(err);
      });
  };

  return (
    <>
      <div className="bg-white dark:bg-gray-900">
        <div className="flex justify-center h-screen">
          <div className="hidden bg-cover lg:block lg:w-3/5" style={{ backgroundImage: "url(https://images.unsplash.com/photo-1616763355603-9755a640a287?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80)" }}>
            <div className="flex items-center h-full px-20 bg-gray-900 bg-opacity-40">
              <div>
                <h2 className="text-4xl font-bold text-white">EPOPD</h2>

                <p className="max-w-xl mt-3 text-gray-300">
                  Early Prediction Of Parkinson's Disease
                </p>
                <p className="max-w-xl mt-3 text-gray-300">
                  Lorem ipsum dolor sit, amet consectetur adipisicing elit. In
                  autem ipsa, nulla laboriosam dolores, repellendus perferendis libero suscipit nam temporibus
                  molestiae
                </p>
              </div>
            </div>
          </div>

          <div className="flex items-center w-full max-w-md px-6 mx-auto lg:w-2/5">
            <div className="flex-1">
              <div className="text-center">
                <h2 className="text-4xl font-bold text-center text-gray-700 dark:text-white">EPOPD</h2>

                <p className="mt-3 text-gray-500 dark:text-gray-300">Sign in to access your account</p>
              </div>

              <div className="mt-6 flex gap-4 item-center">
                <button onClick={googleLogin} type="button" className="py-2 px-4 flex justify-center items-center  bg-red-600 hover:bg-red-700 focus:ring-red-500 focus:ring-offset-red-200 text-white w-full transition ease-in duration-200 text-center text-base font-semibold shadow-md focus:outline-none focus:ring-2 focus:ring-offset-2  rounded-lg ">
                  <svg width="20" height="20" fill="currentColor" className="mr-2" viewBox="0 0 1792 1792" xmlns="http://www.w3.org/2000/svg">
                    <path d="M896 786h725q12 67 12 128 0 217-91 387.5t-259.5 266.5-386.5 96q-157 0-299-60.5t-245-163.5-163.5-245-60.5-299 60.5-299 163.5-245 245-163.5 299-60.5q300 0 515 201l-209 201q-123-119-306-119-129 0-238.5 65t-173.5 176.5-64 243.5 64 243.5 173.5 176.5 238.5 65q87 0 160-24t120-60 82-82 51.5-87 22.5-78h-436v-264z">
                    </path>
                  </svg>
                  Google
                </button>
              </div>

              <div className="mt-6">
                <form onSubmit={handleSubmit} method="POST">
                  <div>
                    <label className="block mb-2 text-sm text-gray-600 dark:text-gray-200">Email Address</label>
                    <input type="email" name="email" id="email" onChange={(e) => setEmail(e.target.value)} placeholder="example@example.com" className="block w-full px-4 py-2 mt-2 text-gray-700 placeholder-gray-400 bg-white border border-gray-200 rounded-md dark:placeholder-gray-600 dark:bg-gray-900 dark:text-gray-300 dark:border-gray-700 focus:border-blue-400 dark:focus:border-blue-400 focus:ring-blue-400 focus:outline-none focus:ring focus:ring-opacity-40" required />
                  </div>

                  <div className="mt-6">
                    <div className="flex justify-between mb-2">
                      <label className="text-sm text-gray-600 dark:text-gray-200">Password</label>
                      <a href="/forgetpassword" className="text-sm text-gray-400 focus:text-blue-500 hover:text-blue-500 hover:underline">Forgot password?</a>
                    </div>

                    <input type="password" name="password" id="password" onChange={(e) => setPassword(e.target.value)} placeholder="Your Password" className="block w-full px-4 py-2 mt-2 text-gray-700 placeholder-gray-400 bg-white border border-gray-200 rounded-md dark:placeholder-gray-600 dark:bg-gray-900 dark:text-gray-300 dark:border-gray-700 focus:border-blue-400 dark:focus:border-blue-400 focus:ring-blue-400 focus:outline-none focus:ring focus:ring-opacity-40" required />
                  </div>

                  <div className="mt-6">
                    <button type="submit" className="w-full px-4 py-2 tracking-wide text-white transition-colors duration-300 transform bg-blue-500 rounded-md hover:bg-blue-400 focus:outline-none focus:bg-blue-400 focus:ring focus:ring-blue-300 focus:ring-opacity-50">
                      Sign in
                    </button>
                  </div>

                </form>

                <p className="mt-6 text-sm text-center text-gray-400">Don&#x27;t have an account yet? <a href="/register" className="text-blue-500 focus:outline-none focus:underline hover:underline">Sign up</a>.</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
