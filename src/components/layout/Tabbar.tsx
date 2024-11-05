"use client"

import { useEffect, useState } from 'react';
import Complaintform from "../pages/Complaintform";
import Status from "../pages/Status";
import Usage from "../pages/Usage";
import { title } from 'process';
import Collapse from '../Modal/Collapse';



const detailWhistle = [
    {
        detail: ['ท่านสามารถร้องเรียนหรือแจ้งเบาะแสเกี่ยวกับการกระทำผิดกฎหมายที่เกี่ยวข้องกับบริษัท โดยบริษัทจะรักษาข้อมูลของท่านเป็นความลับ', 'ทั้งนี้ ผู้ร้องเรียนต้องแจ้งข้อมูลที่เป็นความจริง ไม่กล่าวหาผู้อื่นโดยไม่มีหลักฐานที่ชัดเจนเพียงพอ'],
        detail2: ['ท่านสามารถร้องเรียนหรือแจ้งเบาะแสเกี่ยวกับการกระทำผิดกฎหมายที่เกี่ยวข้องกับบริษัท โดยบริษัทจะรักษาข้อมูลของท่านเป็นความลับ ทั้งนี้ ผู้ร้องเรียนต้องแจ้งข้อมูลที่เป็นความจริง ไม่กล่าวหาผู้อื่นโดยไม่มีหลักฐานที่ชัดเจนเพียงพอ'],
        remark: ['หมายเหตุ : ช่องทางนี้ไม่รับพิจารณาข้อร้องเรียนเรื่องสินค้าหรือการให้บริการ'],
    }
]


export default function Tabbar() {
    const [activeTab, setActiveTab] = useState('complaint');
    const [whistleDetail] = detailWhistle;
    const [currentDetail, setCurrentDetail] = useState(whistleDetail.detail);
    const [activeIndex, setActiveIndex] = useState<number | null>(null);

    const toggleCollapse = (index: number) => {
        setActiveIndex(activeIndex === index ? null : index);
    };
    

    useEffect(() => {
        const handleResize = () => {
            if (window.innerWidth >= 1024) { 
                setCurrentDetail(whistleDetail.detail);
                
            } else {
                setCurrentDetail(whistleDetail.detail2);
                
            }
        };

        handleResize(); 
        window.addEventListener('resize', handleResize); 
        return () => window.removeEventListener('resize', handleResize);
    }, [whistleDetail]);

    const getButtonClass = (tabName: string) => {
        return `text-[18px] block p-2 rounded-xl w-[270px] h-[42px] px-[12px] text-start ${activeTab === tabName ? 'bg-white text-[#4CBC55]' : 'text-white hover:bg-white hover:text-[#4CBC55]'
            }`;
    };

    return (
        <div>
            <div className="lg:text-center lg:h-[480px] lg:w-[100%] lg:pt-[80px] lg:pb-[234px] lg:mt-[56px] h-[262px] w-[430px] px-[24px] bg-cover " style={{
                backgroundImage: 'url(/image/bg.jpg)'
            }}>
                <div>
                    <p className="text-[#3D3D3D] lg:font-normal lg:text-[48px] lg:mb-[16px] text-[24px] pt-[40px] mb-[8px] font-semibold">Whistleblower</p>
                    <div>
                        {currentDetail.map((text, index) => (
                            <p key={index} className="text-[14px] text-[#3D3D3D] mb-[8px]">
                                {text}
                            </p>
                        ))}
                        <p className="text-[14px] text-[#4CBC55] mt-[8px] ">{whistleDetail.remark}</p>
                    </div>
                </div>
            </div>


            <div className="lg:hidden ">
                <Collapse
                    title={
                        <span className={activeIndex === 0 ? 'text-[#4CBC55]' : 'text-gray-800'}>
                            แจ้งข้อร้องเรียนและเบาะแส
                        </span>
                    }
                    isOpen={activeIndex === 0}
                    onClick={() => toggleCollapse(0)}
                >
                    {activeIndex === 0 && <Complaintform />}
                </Collapse>

                <Collapse
                    title={
                        <span className={activeIndex === 1 ? 'text-[#4CBC55]' : 'text-gray-800'}>
                            ติดตามสถานะข้อร้องเรียน
                        </span>
                    }
                    isOpen={activeIndex === 1}
                    onClick={() => toggleCollapse(1)}
                >
                    {activeIndex === 1 && <Status />}
                </Collapse>

                <Collapse
                    title={
                        <span className={activeIndex === 2 ? 'text-[#4CBC55]' : 'text-gray-800'}>
                            แจ้งปัญหาการใช้งาน
                        </span>
                    }
                    isOpen={activeIndex === 2}
                    onClick={() => toggleCollapse(2)}
                >
                    {activeIndex === 2 && <Usage />}
                </Collapse>
            </div>


            <div className='lg:-mt-[110px] lg:block hidden'>
                <div className="lg:grid grid-cols-3 lg:px-52 ">
                    <div className="lg:ml-[5%]">
                        <div className=" lg:bg-[url('/image/Whistleblower.jpg')] lg:rounded-l-xl lg:w-full lg:h-[1044px] lg:px-[40px] lg:shadow-lg ">
                            <h2 className="lg:text-[18px] text-[#B7E4BB] lg:mb-4 lg:pt-[48px] ">ตัวเลือกการแจ้งข้อมูล</h2>
                            <ul>
                                <li className="lg:mb-4 text-[16px] " >
                                    <button onClick={() => setActiveTab('complaint')} className={getButtonClass('complaint')}>
                                        แจ้งข้อร้องเรียนและเบาะแส
                                    </button>
                                </li>
                                <li className="lg:mb-4 text-[16px]">
                                    <button onClick={() => setActiveTab('status')} className={getButtonClass('status')}>
                                        ติดตามสถานะข้อร้องเรียน
                                    </button>
                                </li>
                                <li className="lg:mb-4 text-[16px]">
                                    <button onClick={() => setActiveTab('usage')} className={getButtonClass('usage')}>
                                        แจ้งปัญหาการใช้งาน
                                    </button>
                                </li>
                            </ul>
                        </div>
                    </div>

                    <div className="lg:col-span-2 lg:rounded-r-xl lg:bg-white lg:shadow-lg">
                        <div>
                            {activeTab === 'complaint' && <Complaintform />}
                            {activeTab === 'status' && <Status />}
                            {activeTab === 'usage' && <Usage />}
                        </div>
                    </div>
                </div>
            </div>



            <div className="lg:text-right lg:flex lg:justify-center lg:items-center lg:pt-[24px] hidden">
                <a href="https://drive.google.com/file/d/1uhaKpG3rBKn-iEondN-oNq9krLZOCoUd/view" className="text-[#3587F2] lg:text-[18px] lg:block lg:p-2 text-[12px] block mb-[4px]">คู่มือจรรยาบรรณธุรกิจ</a>
                <span className="lg:px-[16px] text-[#D8D8D8] lg:block hidden">|</span>
                <a href="https://drive.google.com/file/d/179nvVJri_DJ9fp30QY2gx6mEV2ompsXf/view" className="text-[#3587F2] lg:text-[18px] lg:block lg:p-2 text-[12px] block">นโยบายการรับข้อร้องเรียนและแจ้งเบาะแสการกระทำผิดหรือการทุจริต</a>
            </div>

            <div className=" pt-[24px] mx-[24px] lg:hidden">
                <a href="https://drive.google.com/file/d/1uhaKpG3rBKn-iEondN-oNq9krLZOCoUd/view" className="text-[#3587F2] text-[12px] block ">คู่มือจรรยาบรรณธุรกิจ</a>
                <span className="px-[16px] text-[#D8D8D8] hidden">|</span>
                <a href="https://drive.google.com/file/d/179nvVJri_DJ9fp30QY2gx6mEV2ompsXf/view" className="text-[#3587F2] text-[12px] block ">นโยบายการรับข้อร้องเรียนและแจ้งเบาะแสการกระทำผิดหรือการทุจริต</a>
            </div>

        </div>


    );
}
