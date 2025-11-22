"use client";

import React, { useState } from "react";
import Image from "next/image";

interface EnvelopeAnimationProps {
  groomName?: string;
  brideName?: string;
  weddingDate?: string;
  invitationText?: string;
  heroImage?: string;
}

export const EnvelopeAnimation: React.FC<EnvelopeAnimationProps> = ({
  groomName = "Loi",
  brideName = "Hang",
  weddingDate = "15.06.2026",
  invitationText = "Chúng tôi trân trọng kính mời bạn đến dự lễ cưới của chúng tôi",
  heroImage = "/images/picture_1.jpg",
}) => {
  const [isOpen, setIsOpen] = useState(false);

  const handleToggle = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className="relative max-h-[380px]">
      <div
        className={`relative w-[280px] h-[180px] mt-2 rounded-bl-md rounded-br-md mx-auto bg-[#c4bbab] shadow-[0_4px_20px_rgba(0,0,0,0.2)] cursor-pointer animate-[float_3s_ease-in-out_infinite] ${isOpen ? "envelope-open" : "envelope-close"
          }`}
        onClick={handleToggle}
      >
        {/* Front Flap */}
        <div
          className={`absolute w-0 h-0 border-l-[140px] border-l-transparent border-r-[140px] border-r-transparent border-b-[82px] border-b-transparent border-t-[98px] border-t-[#c4bbab] origin-top transition-all ${isOpen
            ? "[transform:rotateX(180deg)] duration-[0.4s] ease-in-out delay-0 z-10"
            : "[transform:rotateX(0deg)] duration-[0.4s] ease-in-out delay-[0.6s] z-40"
            }`}
        />

        {/* Front Pocket */}
        <div className="absolute w-0 h-0 z-30 border-l-[140px] border-l-[#d9d2c7] border-r-[140px] border-r-[#d9d2c7] border-b-[90px] border-b-[#e8e3d8] border-t-[90px] border-t-transparent rounded-bl-md rounded-br-md" />

        {/* Letter */}
        <div
          className={`relative bg-white w-[90%] mx-auto h-[90%] top-[5%] rounded-md shadow-[0_2px_26px_rgba(0,0,0,0.12)] overflow-hidden transition-all ${isOpen
            ? "translate-y-[-60px] duration-[0.4s] ease-in-out delay-[0.6s] z-20"
            : "translate-y-0 duration-[0.4s] ease-in-out delay-0 z-10"
            }`}
        >
          {/* Gradient Overlay */}
          <div className="absolute inset-0 pointer-events-none bg-gradient-to-b from-transparent via-[rgba(255,227,239,0.7)] to-[rgba(215,227,239,1)] [background-position:0_25%] [background-size:100%_300%]" />

          {/* Hero Image */}
          <div className="absolute top-0 left-0 w-full h-full overflow-hidden rounded-t-md z-10">
            <Image
              src={heroImage}
              alt="Wedding invitation"
              width={280}
              height={50}
              className="object-cover w-full h-full"
            />
          </div>
        </div>

        {/* Wax Seal */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-40">
          <Image
            src="/images/wax-seal.webp"
            alt="Wax seal"
            width={30}
            height={30}
            className="object-contain w-full h-full cursor-pointer hover:scale-110 transition-transform duration-200"
          />
        </div>

        {/* Hearts Animation */}
        <div className="absolute top-[90px] left-0 right-0 z-20">
          {/* Heart 1 */}
          <div
            className={`absolute bottom-0 left-[20%] scale-[0.3] ${isOpen
              ? "opacity-100 animate-[heartFly_6s_linear_1_0.7s_forwards,heartSway_2s_ease-in-out_4_0.7s_alternate_forwards]"
              : "opacity-0"
              }`}
          >
            <div className="relative w-[30px] h-[30px]">
              <div className="absolute left-[15px] top-0 w-[30px] h-[48px] bg-[#d00000] rounded-t-[30px] -rotate-45 origin-[0_100%]" />
              <div className="absolute left-0 top-0 w-[30px] h-[48px] bg-[#d00000] rounded-t-[30px] rotate-45 origin-[100%_100%]" />
            </div>
          </div>

          {/* Heart 2 */}
          <div
            className={`absolute bottom-0 left-[55%] scale-[0.4] ${isOpen
              ? "opacity-100 animate-[heartFly_7s_linear_1_0.7s_forwards,heartSway_4s_ease-in-out_2_0.7s_alternate_forwards]"
              : "opacity-0"
              }`}
          >
            <div className="relative w-[35px] h-[35px]">
              <div className="absolute left-[17px] top-0 w-[35px] h-[56px] bg-[#d00000] rounded-t-[35px] -rotate-45 origin-[0_100%]" />
              <div className="absolute left-0 top-0 w-[35px] h-[56px] bg-[#d00000] rounded-t-[35px] rotate-45 origin-[100%_100%]" />
            </div>
          </div>

          {/* Heart 3 */}
          <div
            className={`absolute bottom-0 left-[10%] scale-[0.35] ${isOpen
              ? "opacity-100 animate-[heartFly_8s_linear_1_0.7s_forwards,heartSway_2s_ease-in-out_6_0.7s_alternate_forwards]"
              : "opacity-0"
              }`}
          >
            <div className="relative w-[32px] h-[32px]">
              <div className="absolute left-[16px] top-0 w-[32px] h-[51px] bg-[#d00000] rounded-t-[32px] -rotate-45 origin-[0_100%]" />
              <div className="absolute left-0 top-0 w-[32px] h-[51px] bg-[#d00000] rounded-t-[32px] rotate-45 origin-[100%_100%]" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
