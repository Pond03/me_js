"use client";
import React, { useEffect, useState } from "react"

interface Errormodal {
    isOpen: boolean;
    onClose: () => void;
    imgerrorusage: string;
    titlenoMessageusage: string;
    errorusageMessage1: string;
    errorusageMessage2: string;
}

export default function ModalErrorUsage({ isOpen, onClose, imgerrorusage, titlenoMessageusage, errorusageMessage1, errorusageMessage2, }: Errormodal) {
    if (!isOpen) return null;
    return (
        <div>
            <div className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-60">
                <div className="bg-white  rounded-xl shadow-lg text-center lg:w-[670px] lg:h-[294px] relative w-[345px] h-[234px]">

                    <button
                        className="absolute top-4 right-4  text-gray-400 hover:text-gray-600 "
                        onClick={onClose}
                    >
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                            className="w-[20px] h-[20px] "
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth="2"
                                d="M6 18L18 6M6 6l12 12"
                            />
                        </svg>
                    </button>


                    <img
                        src={imgerrorusage}
                        alt="Error"
                        className="lg:w-[110px] lg:h-[110px] lg:mt-[44px] mx-auto w-[64px] h-[64px] mt-[36px] mb-[16px]"
                    />{" "}

                    <h2 className="text-[3D3D3D] lg:text-[20px] lg:mb-[16px] font-semibold text-[18px] mb-[8px] lg:mx-[40px] mx-[24px]">
                        {titlenoMessageusage}
                    </h2>
                    <p className="text-[8B8B8B] lg:text-[16px] text-[14px] mx-[24px]">{errorusageMessage1}</p>
                    <p className="text-[8B8B8B] lg:text-[16px] text-[14px] mx-[24px]">{errorusageMessage2}</p>

                </div>
            </div>
        </div>
    );
}