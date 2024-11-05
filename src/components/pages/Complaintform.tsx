
"use client";
import { useState, useEffect } from 'react';
import Head from 'next/head';
import Image from 'next/image';
import ModalErrorComplaint from '../Modal/ModalErrorComplaint';
import ModalpassComplaint from '../Modal/ModalpassComplaint';
import MyComponent from '../pages/reCAPTCHA';
import { postWhistleblowerComplaint } from '@/apiwhistle';


export default function Complaintform() {
    const [complaintId, setComplaintId] = useState("");
    const [password, setPassword] = useState("");
    const [name, setName] = useState("");
    const [phone, setPhone] = useState("");
    const [email, setEmail] = useState("");
    const [address, setAddress] = useState("");
    const [complaintDetails, setComplaintDetails] = useState("");
    const [showSuccess, setShowSuccess] = useState(false);
    const [showFailure, setShowFailure] = useState(false);
    const [isSubmitEnabled, setIsSubmitEnabled] = useState(false);
    const [recaptchaVerified, setRecaptchaVerified] = useState(false);
    const [error, setError] = useState(""); 

    const closemodal = () => {
        setShowSuccess(false);
        setShowFailure(false);

        setComplaintId(generateComplaintId()); 
        setPassword("");
        setName("");
        setPhone("");
        setEmail("");
        setAddress("");
        setComplaintDetails("");
        setRecaptchaVerified(false);
        setError(""); 
    };
 

    useEffect(() => {
        if (complaintId && password && name && phone && email && address && complaintDetails && recaptchaVerified) {
            setIsSubmitEnabled(true);
        } else {
            setIsSubmitEnabled(false);
        }
    }, [complaintId, password, name, phone, email, address, complaintDetails, recaptchaVerified]);

    const generateComplaintId = () => {
        return Math.random().toString(36).substr(2, 6);
    };


    useEffect(() => {
        setComplaintId(generateComplaintId());
    }, []);

    const handleSubmit = async (e: { preventDefault: () => void; }) => {
        e.preventDefault();

        const complaintData = {
            pin: complaintId,
            pass: password,
            name: name,
            mobile: phone,
            email: email,
            address: address,
            complaint: complaintDetails
        };
        try {
            const response = await postWhistleblowerComplaint(complaintData);
            console.log('Response from API:', response);
            setShowSuccess(true); 
        } catch (error) {
            console.error('Error submitting complaint:', error);
            setShowFailure(true); 
        }
    };


    const handleRecaptchaVerify = (verified: boolean) => {
        setRecaptchaVerified(verified);
    }

    const handleChange = (e: { target: { value: any; }; }) => {
        const value = e.target.value;

       
        if (/^\d*$/.test(value)) {
            if (value.length <= 10) {
                setPhone(value); 
                setError(""); 
            }
        } else {
            setError("กรอกได้เฉพาะตัวเลขเท่านั้น"); 
        }
    };


    return (
        <div className='lg:block'>
            <div className="lg:pt-12 lg:mx-[64px]">
                <h1 className="lg:text-2xl lg:font-bold lg:mb-[32px] lg:block hidden">แจ้งข้อร้องเรียนและเบาะแส</h1>
                <div >
                    <p className="text-[#8B8B8B] lg:font-normal lg:text-[14px] lg:mb-[16px] text-[12px] my-[16px]">ส่วนที่ใช้เพื่อติดตามสถานะข้อร้องเรียน</p>

                    <div className='lg:grid gap-4 grid-cols-2'>
                        <div className="lg:mb-[16px]">
                            <label className="block text-[#3D3D3D]  lg:mb-[10px] lg:text-[16px] font-semibold text-[14px] mb-[8px]">เลขที่ข้อร้องเรียน</label>
                            <div className="lg:flex lg:items-center lg:rounded-md mb-[10px]">
                                <span className="text-[#4CBC55] lg:font-bold ">
                                    {complaintId ? (
                                        <span className="lg:text-[32px] font-semibold text-[24px] mr-[8px]">{complaintId}</span>
                                    ) : (
                                        <span className="lg:text-[20px] font-semibold text-[15px] mr-[8px]">กำลังโหลด...</span>
                                    )}
                                </span>
                                <button type="button" className=" lg:text-[#4CBC55] w-[20px] h-[20px]" onClick={() => navigator.clipboard.writeText(complaintId)}>
                                    <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <path d="M13.75 6.875V5C13.75 3.96447 12.9105 3.125 11.875 3.125H5C3.96447 3.125 3.125 3.96447 3.125 5V11.875C3.125 12.9105 3.96447 13.75 5 13.75H6.875M13.75 6.875H15C16.0355 6.875 16.875 7.71447 16.875 8.75V15C16.875 16.0355 16.0355 16.875 15 16.875H8.75C7.71447 16.875 6.875 16.0355 6.875 15V13.75M13.75 6.875H8.75C7.71447 6.875 6.875 7.71447 6.875 8.75V13.75"
                                            stroke="#4CBC55"
                                            stroke-width="1.5"
                                            stroke-linecap="round"
                                            stroke-linejoin="round" />
                                    </svg>
                                </button>

                            </div>
                        </div>

                        <div className="lg:mb-[16px]">
                            <label className="block text-[#3D3D3D]  lg:mb-[10px] lg:text-[16px] font-semibold text-[14px] mb-[10px]">รหัสผ่าน</label>
                            <input
                                type="password"
                                className="lg:h-[44px] lg:p-2 lg:px-4 border rounded-full text-[16px] px-[16px] w-full h-[40px] "
                                placeholder="รหัสผ่าน"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                            />
                        </div>
                    </div>
                </div>

                <div className='lg:block hidden'>
                    <hr />
                </div>


                <div className="lg:mb-[16px] mb-[16px]">
                    <p className="text-[#8B8B8B] lg:font-normal lg:text-[14px] lg:mb-[16px] my-[16px] text-[12px]">ส่วนรายละเอียดข้อมูล</p>
                    <label className="block text-[#3D3D3D]  lg:mb-[10px] lg:text-[16px] font-semibold text-[14px] mb-[10px]" >ชื่อ - นามสกุลผู้แจ้ง</label>
                    <input
                        type="text"
                        className="lg:h-[44px] lg:p-2 lg:px-4 border rounded-full text-[16px] px-[16px] w-full h-[40px] "
                        placeholder="ชื่อ - นามสกุลผู้แจ้ง"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                    />
                </div>
                <div className='lg:grid gap-4 grid-cols-2'>
                    <div className="lg:mb-[16px] mb-[16px]">
                        <label className="block text-[#3D3D3D] lg:mb-[10px] lg:text-[16px] font-semibold text-[14px] mb-[10px]">เบอร์โทร</label>
                        <input
                            type="text"
                            className={`lg:h-[44px] lg:p-2 lg:px-4 border rounded-full text-[16px] px-[16px] w-full h-[40px] ${error ? 'border-red-500' : ''}`}
                            placeholder="xxx-xxx-xxxx"
                            value={phone}
                            onChange={handleChange}
                        />
                        {error && <p className="text-red-500 text-[14px] mt-2">{error}</p>}
                    </div>

                    <div className="lg:mb-[16px] mb-[16px]">
                        <label className="block text-[#3D3D3D]  lg:mb-[10px] lg:text-[16px] font-semibold text-[14px] mb-[10px]">อีเมล</label>
                        <input
                            type="email"
                            className="lg:h-[44px] lg:p-2 lg:px-4 border rounded-full text-[16px] px-[16px] w-full h-[40px] "
                            placeholder="example@gmail.com"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                        />
                    </div>
                </div>
                <div className="lg:mb-[16px] mb-[16px]">
                    <label className="block text-[#3D3D3D]  lg:mb-[10px] lg:text-[16px] font-semibold text-[14px] mb-[10px]">ที่อยู่ปัจจุบันผู้แจ้ง</label>
                    <textarea
                        className="block lg:w-full lg:h-[120px] lg:p-2 lg:border lg:rounded-md lg:px-4 w-full p-2 border rounded-md px-4 "
                        placeholder="ที่อยู่ปัจจุบันผู้แจ้ง"
                        value={address}
                        onChange={(e) => setAddress(e.target.value)}
                    ></textarea>
                </div>
                <div className="lg:mb-[16px] mb-[16px]">
                    <label className="block text-[#3D3D3D]  lg:mb-[10px] lg:text-[16px] font-semibold text-[14px] mb-[10px]">แจ้งข้อร้องเรียน</label>
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

                <div className="lg:mt-[40px] lg:block hidden">
                    <button
                        className={`w-full lg:h-[50px] h-[40px] ${isSubmitEnabled ? 'bg-[#4CBC55]' : 'bg-gray-300'} text-white lg:text-[20px] lg:p-3 rounded-full text-[16px]`}
                        type="submit"
                        disabled={!isSubmitEnabled}
                        onClick={handleSubmit} 
                    >
                        ส่งข้อมูล
                    </button>
                </div>

                <div className="mt-[24px] lg:hidden">
                    <button
                        className={`w-full lg:h-[50px] h-[40px] ${isSubmitEnabled ? 'bg-[#4CBC55]' : 'bg-gray-300'} text-white lg:text-[20px] lg:p-3 rounded-full text-[16px]`}
                        type="submit"
                        disabled={!isSubmitEnabled}
                        onClick={handleSubmit} 
                    >
                        ส่งข้อความ
                    </button>
                </div>
            </div>

            <div>
                <ModalErrorComplaint
                    isOpen={showFailure}
                    onClose={closemodal}
                    imgerrorcom="/image/error.svg"
                    titleerrorMessage="ส่งข้อความไม่สำเร็จ"
                    errorMessagecom1="ขณะนี้ระบบไม่สามารถรับแจ้งข้อร้องเรียนและเบาะแสได้"
                    errorMessagecom2="กรุณาลองใหม่อีกครั้ง หรือ ติดต่อ 02-257-7000 (Call Center)"
                />
            </div>

            <div>
                <ModalpassComplaint
                    isOpen={showSuccess}
                    onClose={closemodal}
                    imgpasscom="/image/success.svg"
                    titlepassMessage="ส่งข้อความสำเร็จ"
                    passMessagecom1="ขอบคุณที่แจ้งข้อร้องเรียนและเบาะแสให้กับทางเรา ทางเราจะรีบดำเนินการติดต่อกลับโดยเร็ว"
                />
            </div>

        </div>

    );
}