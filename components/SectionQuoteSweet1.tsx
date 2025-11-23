"use client";

import React from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import { fadeInLeft, imageAnimation, containerAnimation } from "@/lib/motionAnimations";

const SectionQuoteSweet1 = () => {
    return (
        <div
            className="relative mt-10 max-auto w-full min-h-[450px] h-fit min-w-[20px] flex flex-col items-center overflow-hidden"
        // initial="hidden"
        // whileInView="visible"
        // viewport={{ once: true, margin: "-10%" }}
        // variants={containerAnimation}
        >
            <div
                className="flex justify-between w-full absolute top-3 z-10"
            // variants={fadeInLeft}
            >
                <span className="h-auto w-full min-w-[20px] text-white text-[24.336px] font-medium text-center leading-normal tracking-[0px] normal-case no-underline not-italic pointer-events-none overflow-hidden break-words font-showcase [text-shadow:0_0_2px_rgba(0,0,0,0)]"
                >Two hearts</span>
                <span className="h-auto w-full min-w-[20px] text-white text-[24.336px] font-medium text-center leading-normal tracking-[0px] normal-case no-underline not-italic pointer-events-none overflow-hidden break-words font-showcase [text-shadow:0_0_2px_rgba(0,0,0,0)]"
                >one love</span>
                <span className="h-auto w-full min-w-[20px] text-white text-[24.336px] font-medium text-center leading-normal tracking-[0px] normal-case no-underline not-italic pointer-events-none overflow-hidden break-words font-showcase [text-shadow:0_0_2px_rgba(0,0,0,0)]">
                    one lifetime
                </span>
            </div>

            {/* Full Width Image */}
            <div
                className="w-full relative h-[650px]  overflow-hidden shadow-lg"
            // variants={imageAnimation}
            >
                <Image
                    src="/images/webp/picture_5.jpg"
                    alt="Wedding Quote Image"
                    fill
                    className="object-cover"
                    priority
                />
            </div>
        </div>
    );
};
export default SectionQuoteSweet1;
