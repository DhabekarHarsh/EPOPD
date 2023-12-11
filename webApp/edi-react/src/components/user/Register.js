import React from "react";
import { auth } from "./firebase";
import { useState } from "react";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { useNavigate } from 'react-router-dom';
import { createOrUpdateUser } from "../../api/auth";
import { findUserByEmail } from "../../api/user";
import { toast } from 'react-toastify';

export default function Register() {
    const [email, setEmail] = useState();
    const [password, setPassword] = useState();
    const [name, setName] = useState();
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!email || !password || !name) {
            toast.error("Please enter your credentials");
            return;
        } if (password.length < 6) {
            toast.error("Password must be at least 6 characters");
            return;
        }

        let flag = 0;
        await findUserByEmail(email)
            .then(res => {
                console.log("res==>", res)
                if (res.data) {
                    toast.error("email already registered");
                    flag = 1;
                }
            })
            .catch(err => console.log(err))
        if (flag === 1) {
            return;
        }

        const result = await createUserWithEmailAndPassword(auth, email, password);
        const { user } = result;
        const idTokenResult = await user.getIdTokenResult();

        createOrUpdateUser(idTokenResult.token, name)
            .then((res) => {
                toast.success("Registration Successful");
                // window.localStorage.setItem("email", email);
                // window.localStorage.setItem("name", res.data.name);
                // window.localStorage.setItem("authtoken", idTokenResult.token);
                // window.localStorage.setItem("userid", res.data._id);
                navigate("/login");
            })
            .catch((err) => console.log("err => ", err));
    };

    return (
        <>
            <section className="bg-white dark:bg-gray-900">
                <div className="flex justify-center min-h-screen">
                    <div className="flex items-center w-full max-w-3xl p-8 mx-auto lg:px-12 lg:w-2/5">
                        <div className="w-full">
                            <h1 className="text-2xl font-semibold tracking-wider text-gray-800 capitalize dark:text-white">
                                Get your free EPOPD account now.
                            </h1>

                            <p className="mt-4 text-gray-500 dark:text-gray-400">
                                Let’s get you all set up so you can verify your personal account and begin setting up your profile.
                            </p>

                            <form onSubmit={handleSubmit} method="POST" autoComplete="off" className="grid grid-cols-1 gap-6 mt-8 md:grid-cols-1">
                                <div>
                                    <label className="block mb-2 text-sm text-gray-600 dark:text-gray-200">Name</label>
                                    <input type="text" placeholder="John" onChange={(e) => setName(e.target.value)} className="block w-full px-5 py-3 mt-2 text-gray-700 placeholder-gray-400 bg-white border border-gray-200 rounded-md dark:placeholder-gray-600 dark:bg-gray-900 dark:text-gray-300 dark:border-gray-700 focus:border-blue-400 dark:focus:border-blue-400 focus:ring-blue-400 focus:outline-none focus:ring focus:ring-opacity-40" />
                                </div>

                                <div>
                                    <label className="block mb-2 text-sm text-gray-600 dark:text-gray-200">Email address</label>
                                    <input type="email" placeholder="johnsnow@example.com" onChange={(e) => setEmail(e.target.value)} className="block w-full px-5 py-3 mt-2 text-gray-700 placeholder-gray-400 bg-white border border-gray-200 rounded-md dark:placeholder-gray-600 dark:bg-gray-900 dark:text-gray-300 dark:border-gray-700 focus:border-blue-400 dark:focus:border-blue-400 focus:ring-blue-400 focus:outline-none focus:ring focus:ring-opacity-40" />
                                </div>

                                <div>
                                    <label className="block mb-2 text-sm text-gray-600 dark:text-gray-200">Password</label>
                                    <input type="password" placeholder="Enter your password" onChange={(e) => setPassword(e.target.value)} className="block w-full px-5 py-3 mt-2 text-gray-700 placeholder-gray-400 bg-white border border-gray-200 rounded-md dark:placeholder-gray-600 dark:bg-gray-900 dark:text-gray-300 dark:border-gray-700 focus:border-blue-400 dark:focus:border-blue-400 focus:ring-blue-400 focus:outline-none focus:ring focus:ring-opacity-40" />
                                </div>

                                <button type="submit"
                                    className="flex items-center justify-between w-full px-6 py-3 text-sm tracking-wide text-white capitalize transition-colors duration-300 transform bg-blue-500 rounded-md hover:bg-blue-400 focus:outline-none focus:ring focus:ring-blue-300 focus:ring-opacity-50">
                                    <span>Sign Up </span>

                                    <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5 rtl:-scale-x-100" viewBox="0 0 20 20" fill="currentColor">
                                        <path fillRule="evenodd"
                                            d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z"
                                            clipRule="evenodd" />
                                    </svg>
                                </button>
                            </form>

                            <p className="mt-6 text-sm text-center text-gray-400">Already have an account? <a href="/login" className="text-blue-500 focus:outline-none focus:underline hover:underline">Login</a>.</p>

                        </div>
                    </div>

                    <div className="hidden bg-cover lg:block lg:w-3/5" style={{ backgroundImage: "url('https://images.unsplash.com/photo-1494621930069-4fd4b2e24a11?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=715&q=80')" }}>
                    </div>
                </div>
            </section>
        </>
    );
}
