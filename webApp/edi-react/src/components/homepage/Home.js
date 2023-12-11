import React from "react";
import { useNavigate } from "react-router-dom";

export default function Home() {
    const navigate = useNavigate();
    return (
    <>
    <section className="bg-white dark:bg-gray-900">
    <div className="container flex flex-col px-6 py-10 mx-auto space-y-6 lg:h-[32rem] lg:py-16 lg:flex-row lg:items-center">
        <div className="w-full lg:w-1/2">
            <div className="lg:max-w-lg">
                <h1 className="text-3xl font-bold tracking-wide text-gray-800 dark:text-white lg:text-5xl">
                    Early Prediction Of Parkinson's Disease
                </h1>

                <div className="mt-8 space-y-5">
                    <p className="flex items-center -mx-2 text-gray-700 dark:text-gray-200">
                        <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6 mx-2 text-blue-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>

                        <span className="mx-2">Predict for Patient's Voice Sample</span>
                    </p>

                    <p className="flex items-center -mx-2 text-gray-700 dark:text-gray-200">
                        <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6 mx-2 text-blue-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>

                        <span className="mx-2">Predict for Patient's Hand Drawing - Spiral</span>
                    </p>

                    <p className="flex items-center -mx-2 text-gray-700 dark:text-gray-200">
                        <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6 mx-2 text-blue-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>

                        <span className="mx-2">Predict for Patient's Hand Drawing - Wave</span>
                    </p>
                </div>
            </div>
        </div>

        <div className="flex items-center justify-center w-full h-96 lg:w-1/2">
            <img className="object-cover w-full h-full mx-auto rounded-md lg:max-w-2xl" src="https://www.nih.gov/sites/default/files/styles/floated_media_breakpoint-large/public/news-events/research-matters/2016/20160906-parkinsonian.jpg?itok=4UVI8clB&timestamp=1472838853" alt="lab"/>
        </div>
    </div>

    <div className="w-full bg-center bg-cover h-[58rem]" style={{backgroundImage: "url(https://www.physio-pedia.com/images/7/75/Parkinson_disease_symtpoms.png)"}}>
        <div className="flex items-center justify-center w-full h-full bg-gray-900 bg-opacity-50">
            <div className="text-center">
                <h1 className="text-2xl font-semibold text-white uppercase lg:text-3xl">Run <span className="text-blue-400 underline">Test to Predict</span></h1>
                <button onClick={() => {navigate("/tasks/add")}} className="w-full px-4 py-2 mt-4 text-sm font-medium text-white uppercase transition-colors duration-300 transform bg-blue-600 rounded-md lg:w-auto hover:bg-blue-500 focus:outline-none focus:bg-blue-500">Run Test</button>
            </div>
        </div>
    </div>

    </section>
    </> 
    );
}