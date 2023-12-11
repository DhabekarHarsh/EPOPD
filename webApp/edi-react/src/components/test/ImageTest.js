import React from "react";
import { useState } from "react";
import axios from "axios";
import FormData from 'form-data';
import { saveHistory } from "../../api/history";
import { toast } from 'react-toastify';

export default function ImageTest() {
    const [image, setImage] = useState(null);
    const [imageName, setImageName] = useState("No Image Selected");
    const [parProb, setParProb] = useState(0);
    const [heaProb, setHeaProb] = useState(0);
    const [sel, setSel] = useState(0);
    const [imageSel, setImageSel] = useState("1");

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!image) {
            console.log("No image selected");
            return;
        }

        try {
            var apiUrl = "http://localhost:5000";
            if(imageSel==="1"){
                apiUrl = "http://localhost:5000/predict-spiral";
            }else{
                apiUrl = "http://localhost:5000/predict-wave";
            }
            const formData = new FormData();
            formData.append("file", image);

            const response = await axios.post(apiUrl, formData, {
                headers: {
                    "Content-Type": "multipart/form-data",
                },
            });

            console.log(response.data);
            setHeaProb(response.data.healthy_probability);
            setParProb(response.data.parkinson_probability);
            let userid = window.localStorage.getItem("userid") || "000";
            if(imageSel==="1"){
                saveHistory(userid, "image data from spiral drawing", imageName, response.data.parkinson_probability, response.data.healthy_probability)
                            .then((res) => {
                                toast.success("history saved");
                            })
                            .catch((err) => { console.log(err); toast.error("Please try again"); window.location.reload(); });
            }else{
                saveHistory(userid, "image data from wave drawing", imageName, response.data.parkinson_probability, response.data.healthy_probability)
                            .then((res) => {
                                toast.success("history saved");
                            })
                            .catch((err) => { console.log(err); toast.error("Please try again"); window.location.reload(); });
            }
            setSel(2);
        } catch (error) {
            console.error(error);
        }
    };

    return (
        <>
            <div className="flex items-center justify-center p-12 bg-white dark:bg-gray-900">
                <div className="mx-auto w-full max-w-[550px]">
                    <div className="text-center text-xl font-bold text-white">Hand Drawing Test for Parkinson's Disease</div>
                    <br />
                    <div className="flex flex-col">
                        <select id="sel1" className="border text-center p-1 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block dark:bg-gray-900 dark:border-white dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" onChange={(e) => setImageSel(e.target.value)}>
                            <option value="1">Upload Spiral Drawing</option>
                            <option value="2">Upload Wave Drawing</option>
                        </select>
                    </div>
                    <div>
                        <div className="mb-6 pt-4">
                            <div>
                                <label className="mb-5 block text-xl font-semibold text-white">
                                    Upload Image
                                </label>

                                <div className="mb-8">
                                    <input type="file" accept=".png, .jpg" name="image" id="image" onChange={(e) => { setImage(e.target.files.item(0)); setImageName(e.target.value); e.preventDefault(); }} className="sr-only" required />
                                    <label
                                        for="image"
                                        className="pattern relative flex min-h-[200px] items-center justify-center rounded-md border border-dashed border-[#e0e0e0] p-12 text-center cursor-pointer"
                                    >
                                        <div>
                                            <span className="mb-2 block text-xl font-semibold text-white">
                                                Drop files here
                                            </span>
                                            <span className="mb-2 block text-base font-medium text-white">
                                                Or
                                            </span>
                                            <span className="inline-flex rounded border border-[#e0e0e0] py-2 px-7 text-base font-medium text-white">Browse</span>
                                        </div>
                                    </label>
                                </div>

                                <div className="mb-5 rounded-md py-4 px-8">
                                    <div className="text-center rounded-md border border-dashed border-white">
                                        <span className="truncate pr-3 font-medium text-white">
                                            {imageName}
                                        </span>
                                    </div>
                                </div>
                            </div>

                        </div>

                        <button onClick={(e) => { handleSubmit(e); setSel(1) }} className="hover:shadow-form w-full rounded-md bg-[#6A64F1] py-3 px-8 text-center text-base font-semibold text-white outline-none" >Proceed</button>
                    </div>
                </div>
            </div>
            <div class="bg-white dark:bg-gray-900">
                {sel === 1 &&
                    <div className="text-center my-32">
                        <div className="lds-dual-ring"></div>
                    </div>
                }
                {sel === 2 &&
                    <div class="container px-6 py-8 mx-auto">
                        <h1 class="text-2xl font-semibold text-center text-gray-800 capitalize lg:text-3xl dark:text-white">Prediction Results</h1>

                        <p class="max-w-2xl mx-auto mt-4 text-center text-gray-500 xl:mt-6 dark:text-gray-300">
                            For Detecting Parkinsons Disease From Patients Voice Sample
                        </p>

                        <div class="grid grid-cols-1 gap-8 mt-6 xl:mt-12 xl:gap-12 md:grid-cols-2 lg:grid-cols-2">
                            <div class="w-full p-8 space-y-8 text-center bg-blue-600 rounded-lg">
                                <p class="font-medium text-gray-200 uppercase">Parkinsons Disease Probability</p>

                                <h2 class="text-5xl font-bold text-white uppercase dark:text-gray-100">
                                    {parProb}
                                </h2>
                            </div>

                            <div class="w-full p-8 space-y-8 text-center border border-gray-200 rounded-lg dark:border-gray-700">
                                <p class="font-medium text-gray-200 uppercase">Healthy Probability</p>

                                <h2 class="text-5xl font-bold text-white uppercase dark:text-gray-100">
                                    {heaProb}
                                </h2>
                            </div>

                        </div>
                    </div>}
            </div>
        </>
    );
}