import React from "react";
import { auth } from "./firebase";
import { useState } from "react";
import { sendPasswordResetEmail } from "firebase/auth";
// import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

export default function ForgotPass() {
    const [email, setEmail] = useState();
    // const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!email) {
            toast.error("Please enter your emailid");
            return;
        }
        const config = {
            url: "http://127.0.0.1:3000/login",
            handleCodeInApp: true,
        }
        await sendPasswordResetEmail(auth, email, config)
            .then(() => {
                toast.success(`Reset password link sent on ${email}`);
                setEmail("");
            })
            .catch((err) => { toast.error(err.message); });
        // const result = await createUserWithEmailAndPassword(auth, email, password);

    };

    return (
        <>
            <section className="bg-white dark:bg-gray-900">
                <div className="flex justify-center min-h-screen">
                    <div className="flex items-center w-full max-w-3xl p-8 mx-auto lg:px-12 lg:w-2/3">
                        <div className="w-full">
                            <h1 className="text-2xl text-center font-semibold tracking-wider text-gray-800 capitalize dark:text-white">
                                Forgot your EPOPD account password?
                            </h1>

                            <p className="mt-4 text-gray-500 text-center dark:text-gray-400">
                                Don't worry we will help you to reset your password!
                            </p>

                            <form onSubmit={handleSubmit} method="POST" autoComplete="off" className="grid grid-cols-1 gap-6 mt-8 md:grid-cols-1">
                               <div>
                                    <label className="block mb-2 text-sm text-gray-600 dark:text-gray-200">Email address</label>
                                    <input type="email" placeholder="johnsnow@example.com" onChange={(e) => setEmail(e.target.value)} className="block w-full px-5 py-3 mt-2 text-gray-700 placeholder-gray-400 bg-white border border-gray-200 rounded-md dark:placeholder-gray-600 dark:bg-gray-900 dark:text-gray-300 dark:border-gray-700 focus:border-blue-400 dark:focus:border-blue-400 focus:ring-blue-400 focus:outline-none focus:ring focus:ring-opacity-40" required/>
                                </div>

                                <button type="submit"
                                    className="flex items-center justify-between w-full px-6 py-3 text-sm tracking-wide text-white capitalize transition-colors duration-300 transform bg-blue-500 rounded-md hover:bg-blue-400 focus:outline-none focus:ring focus:ring-blue-300 focus:ring-opacity-50">
                                    <span>Forget Password</span>

                                    <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5 rtl:-scale-x-100" viewBox="0 0 20 20" fill="currentColor">
                                        <path fillRule="evenodd"
                                            d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z"
                                            clipRule="evenodd" />
                                    </svg>
                                </button>
                            </form>

                            <p className="mt-6 text-sm text-center text-gray-400">Go back to <a href="/login" className="text-blue-500 focus:outline-none focus:underline hover:underline">Login</a>.</p>

                        </div>
                    </div>

                    <div className="hidden bg-cover lg:block lg:w-1/3" style={{ backgroundImage: "url('https://images.unsplash.com/photo-1494621930069-4fd4b2e24a11?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=715&q=80')" }}>
                    </div>
                </div>
            </section>
        </>
    );
}
