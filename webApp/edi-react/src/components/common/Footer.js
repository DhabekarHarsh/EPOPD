import React from "react";

export default function Footer() {
    return (
        <>
            <footer className="border-t bg-white shadow-inner dark:bg-gray-900">
                <div className="container p-6 pb-4 mx-auto">
                    <div className="lg:flex">
                        <div className="w-full -mx-6 lg:w-1/2">
                            <div className="px-6">
                                <div>
                                    <a href="/" className="text-xl font-bold text-gray-800 dark:text-white hover:text-gray-700 dark:hover:text-gray-300">EPOPD</a>
                                </div>

                                <p className="max-w-sm mt-2 text-gray-500 dark:text-gray-400">Early Prediction Of Parkinson's Disease</p>
                            </div>
                        </div>

                        <div className="mt-6 lg:mt-0 lg:flex-1">
                            <div className="grid grid-cols-2 gap-6 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-2">
                                <div>
                                    <h3 className="text-gray-700 uppercase dark:text-white">Track Records</h3>
                                    <a href="/image-test" className="block mt-2 text-sm text-gray-600 dark:text-gray-400 hover:underline">From Audio</a>
                                    <a href="/audio-test" className="block mt-2 text-sm text-gray-600 dark:text-gray-400 hover:underline">From Hand Drawing's</a>
                                </div>


                                <div>
                                    <h3 className="text-gray-700 uppercase dark:text-white">Contact Us</h3>
                                    <span className="block mt-2 text-sm text-gray-600 dark:text-gray-400 hover:underline">Vishwakarma Institute of Technology</span>
                                    <span className="block mt-2 text-sm text-gray-600 dark:text-gray-400 hover:underline">Bibwewadi, Pune</span>
                                </div>
                            </div>
                        </div>
                    </div>

                    <hr className="h-px my-4 bg-gray-200 border-none dark:bg-gray-700" />

                    <div>
                        <p className="text-center text-gray-500 dark:text-gray-400">© EPOPD 2023 - All rights reserved</p>
                    </div>
                </div>
            </footer>
        </>
    );
}