import React from "react";
import ReCAPTCHA from "react-google-recaptcha";

type ReCaptchaComponentProps = {
  onVerify: (verified: boolean) => void;
};

const ReCaptchaComponent: React.FC<ReCaptchaComponentProps> = ({ onVerify }) => {
  const handleRecaptchaChange = (value: string | null) => {
    const isVerified = value !== null;  // ตรวจสอบว่าการยืนยันสำเร็จหรือไม่
    console.log(`reCAPTCHA value: ${value}`);  // log ค่าที่ได้รับจาก reCAPTCHA (string หรือ null)
    console.log(`isVerified: ${isVerified}`);  // log สถานะการยืนยัน (true/false)
    onVerify(isVerified);  // ส่งค่าสถานะการยืนยันกลับไปยัง parent component
  };

  return (
    <div className="">
      <ReCAPTCHA
        sitekey="6LcBH3EqAAAAAJshZTusvhZ9CQeDxW00okwzWxDc"
        onChange={handleRecaptchaChange}  // เมื่อมีการเปลี่ยนแปลงจะเรียกฟังก์ชัน handleRecaptchaChange
      />
    </div>
  );
};

export default ReCaptchaComponent;