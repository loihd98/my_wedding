import React from "react";
import Image from "next/image";

const SectionQuote = () => {
    return (
        <div className="relative max-auto w-full px-3 py-2 bg-black min-h-[450px] h-fit min-w-[20px] flex flex-col items-center overflow-hidden ">
            <div className="flex justify-between w-full">
                <span className="h-auto w-full min-w-[20px] text-white text-[24.336px] font-medium text-center leading-normal tracking-[0px] normal-case no-underline not-italic pointer-events-none overflow-hidden break-words font-showcase [text-shadow:0_0_2px_rgba(0,0,0,0)]"
                >FALL IN</span>
                <span className="h-auto w-full min-w-[20px] text-white text-[24.336px] font-medium text-center leading-normal tracking-[0px] normal-case no-underline not-italic pointer-events-none overflow-hidden break-words font-showcase [text-shadow:0_0_2px_rgba(0,0,0,0)]"
                >LOVE</span>
                <span className="h-auto w-full min-w-[20px] text-white text-[24.336px] font-medium text-center leading-normal tracking-[0px] normal-case no-underline not-italic pointer-events-none overflow-hidden break-words font-showcase [text-shadow:0_0_2px_rgba(0,0,0,0)]"
                >WEDDING</span>
            </div>

            {/* Full Width Image */}
            <div className="w-full relative h-[650px] rounded-lg overflow-hidden shadow-lg">
                <Image
                    src="/images/main_picture.jpg"
                    alt="Wedding Quote Image"
                    fill
                    className="object-cover"
                    priority
                />
            </div>
            <span className="h-auto w-full min-w-[20px] text-white text-[12.04px] font-medium text-center leading-normal tracking-[0px] normal-case no-underline not-italic pointer-events-none overflow-hidden break-words font-quicksand pt-2 [text-shadow:0_0_2px_rgba(0,0,0,0)]"
            >As the clouds and mist dissipate, I love you and everyone knows it</span>
        </div>
    );
};
export default SectionQuote;
