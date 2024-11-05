

"use client"
import { useState, useEffect } from 'react';
import Head from 'next/head';
import Image from 'next/image';
import { fetchWhistleblowerData } from '@/apiwhistle';


export default function Status() {
    const [complaintId, setComplaintId] = useState("");
    const [password, setPassword] = useState("");
    const [isSubmitEnabled, setIsSubmitEnabled] = useState(false);
    const [responseData, setResponseData] = useState(null);
    const [error, setError] = useState(null);


    useEffect(() => {
        if (password && complaintId) {
            setIsSubmitEnabled(true);
        } else {
            setIsSubmitEnabled(false);
        }
    }, [password, complaintId]);

    
    const handleSubmit = async () => {
        try {
            const data = await fetchWhistleblowerData(complaintId, password);
            setResponseData(data); 
            setError(null); 
        } catch (err) {
            const errorMessage = (err as Error).message; 
            setResponseData(null); 
        }
    };

    console.log('compla',complaintId)

    return (
        <div>
            <div className="lg:pt-12 lg:mx-[64px] mx-[24px]">
                <h1 className="lg:text-2xl lg:font-bold lg:mb-[32px] lg:block hidden">ติดตามสถานะข้อร้องเรียน</h1>
                <div >
                    <div className="lg:mb-[16px] mb-[16px]">
                        <label className="block text-[#3D3D3D] lg:mb-[10px] lg:text-[16px] font-semibold text-[14px] mb-[10px] mt-[16px]">เลขที่ข้อร้องเรียน</label>
                        <input
                            type="id"
                            className="lg:h-[44px] lg:p-2 lg:px-4 border rounded-full text-[16px] px-[16px] w-full h-[40px] "
                            placeholder="เลขที่ข้อร้องเรียน"
                            value={complaintId}
                            onChange={(e) => setComplaintId(e.target.value)}
                        />
                    </div>
                </div>

                <div className="lg:mb-[16px] mb-[16px]">
                    <label className="block text-[#3D3D3D] lg:mt-[10px] lg:mb-[10px] lg:text-[16px]  font-semibold text-[14px] mb-[10px]">รหัสผ่าน</label>
                    <input
                        type="password"
                        className="lg:h-[44px] lg:p-2 lg:px-4 border rounded-full text-[16px] px-[16px] w-full h-[40px] "
                        placeholder="รหัสผ่าน"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />
                </div>

                <div className="lg:mt-[40px] mt-[24px]">
                    <button
                        className={`w-full lg:h-[50px] h-[40px] ${isSubmitEnabled ? 'bg-[#4CBC55]' : 'bg-gray-300'} text-white lg:text-[20px] lg:p-3 rounded-full text-[16px]`}
                        type="submit"
                        disabled={!isSubmitEnabled}
                        onClick={handleSubmit}
                    >
                       ค้นหา
                    </button>
                </div>
            </div>
        </div>
    );
}
