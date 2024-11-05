import { ReactNode } from 'react';


interface CollapseProps {
    title: ReactNode;            
    children: ReactNode;      
    isOpen: boolean;         
    onClick: () => void;      
}


const Collapse: React.FC<CollapseProps> = ({ title, children, isOpen, onClick }) => {
    return (
        <div className="border-b border-[#D8D8D8] pt-[24px] mx-[24px] pb-[24px]">

            <button
                onClick={onClick}                             
                className="flex items-center w-full text-left focus:outline-none" 
            >

                <span>{isOpen ? (<svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M5 15L15 5M5 5L15 15" stroke="#4CBC55" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
                </svg>
                ) : (<svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M10 5V15M15 10L5 10" stroke="#3D3D3D" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
                </svg>
                )}</span>


                <span className="text-[16px] ml-[8px] font-semibold">{title}</span>
            </button>


            {isOpen && (
                <div className="">
                    {children} 
                </div>
            )}
        </div>
    );
};

export default Collapse;