// pages/heard.js
"use client";
import React, { useEffect, useState } from "react";
import Head from "next/head";
import Image from "next/image";
import ModalpassUsage from "../Modal/ModalpassUsage";
import ModalErrorUsage from "../Modal/ModalErrorUsage";
import MyComponent from '../pages/reCAPTCHA';
import { postWhistleblowerUsage } from '@/apiwhistle';


export default function Usage() {
    const [email, setEmail] = useState("");
    const [complaintDetails, setComplaintDetails] = useState("");
    const [showSuccess, setShowSuccess] = useState(false);
    const [showFailure, setShowFailure] = useState(false);
    const [isSubmitEnabled, setIsSubmitEnabled] = useState(false);
    const [recaptchaVerified, setRecaptchaVerified] = useState(false);

    const closemodal = () => {
        setShowSuccess(false);
        setShowFailure(false);
    
        setShowSuccess(false);
        setShowFailure(false);
        setEmail("");
        setComplaintDetails("");
        setRecaptchaVerified(false);
    };
 

    
    useEffect(() => {
        if (email && complaintDetails && recaptchaVerified) {
            setIsSubmitEnabled(true);
        } else {
            setIsSubmitEnabled(false);
        }
    }, [email, complaintDetails, recaptchaVerified]);


    const handleSubmit = async (e: { preventDefault: () => void; }) => {
        e.preventDefault();

        const usageData = {
            name: "",  
            email: email,
            complaint: complaintDetails
        };

        try {
            const response = await postWhistleblowerUsage(usageData);
            console.log('Response from API:', response);
            setShowSuccess(true);
        } catch (error) {
            console.error('Error submitting usage issue:', error);
            setShowFailure(true);
        }
    };

    const handleRecaptchaVerify = (verified: boolean) => {
        setRecaptchaVerified(verified);
    }

    return (
        <div>
            <div className="lg:pt-12 lg:mx-[64px] mx-[24px]">
                <h1 className="lg:text-2xl lg:font-bold lg:mb-[32px] lg:block hidden">แจ้งปัญหาการใช้งาน</h1>
                <div >
                    <div className="lg:mb-[16px] mb-[16px]">
                        <label className="block text-[#3D3D3D] lg:mb-[10px] lg:text-[16px] font-semibold text-[14px] mb-[10px] mt-[16px]">อีเมล</label>
                        <input
                            type="email"
                            className="lg:h-[44px] lg:p-2 lg:px-4 border rounded-full text-[16px] px-[16px] w-full h-[40px] "
                            placeholder="example@mail.com"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                        />
                    </div>
                </div>

                <div className="lg:mb-[16px] mb-[16px]">
                    <label className="block text-[#3D3D3D] lg:mb-[10px] lg:text-[16px] font-semibold text-[14px] mb-[10px] ">แจ้งข้อร้องเรียน</label>
                    <textarea
                        className="block lg:w-full lg:h-[120px] lg:p-2 lg:border lg:rounded-md lg:px-4 w-full p-2 border rounded-md px-4 "
                        placeholder="รายละเอียดการร้องเรียน"
                        value={complaintDetails}
                        onChange={(e) => setComplaintDetails(e.target.value)}
                    ></textarea>
                </div>

                <div className="lg:mt-[16px] mt-[16px]">
                    <MyComponent onVerify={handleRecaptchaVerify} />
                </div>

                <div className="lg:mt-[40px] mt-[24px]">
                    <button
                        className={`w-full lg:h-[50px] h-[40px] ${isSubmitEnabled ? 'bg-[#4CBC55]' : 'bg-gray-300'} text-white lg:text-[20px] lg:p-3 rounded-full text-[16px]`}
                        type="submit"
                        disabled={!isSubmitEnabled}
                        onClick={handleSubmit} 
                    >
                        ส่งข้อมูล
                    </button>
                </div>
            </div>

            <div>
                <ModalErrorUsage
                    isOpen={showFailure}
                    onClose={closemodal}
                    imgerrorusage="/image/error.svg"
                    titlenoMessageusage="ส่งข้อความไม่สำเร็จ"
                    errorusageMessage1="ขณะนี้ระบบไม่สามารถรับแจ้งปัญหาการใช้งานได้"
                    errorusageMessage2="กรุณาลองใหม่อีกครั้ง หรือ ติดต่อ 02-257-7000 (Call Center)"
                />
            </div>

            <div>
                <ModalpassUsage
                    isOpen={showSuccess}
                    onClose={closemodal}
                    imgpassusage="/image/success.svg"
                    titlepassMessageusage="ส่งข้อความสำเร็จ"
                    passusageMessage1="ขอบคุณที่แจ้งปัญหาการใช้งานให้กับทางเรา ทางเราจะรีบดำเนินการติดต่อกลับโดยเร็ว"
                />
            </div>
        </div>
    );
}

