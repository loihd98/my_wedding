"use client";

import React from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import { fadeInRight, imageAnimation, containerAnimation } from "@/lib/motionAnimations";

const SectionQuote = () => {
    return (
        <motion.div
            className="relative max-auto w-full px-3 py-2 bg-black min-h-[450px] h-fit min-w-[20px] flex flex-col items-center overflow-hidden"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-30%" }}
            // variants={containerAnimation}
        >
            <motion.div
                className="flex justify-between w-full"
                // variants={fadeInRight}
            >
                <span className="h-auto w-full min-w-[20px] text-white text-[24.336px] font-medium text-center leading-normal tracking-[0px] normal-case no-underline not-italic pointer-events-none overflow-hidden break-words font-showcase [text-shadow:0_0_2px_rgba(0,0,0,0)]"
                >FALL IN</span>
                <span className="h-auto w-full min-w-[20px] text-white text-[24.336px] font-medium text-center leading-normal tracking-[0px] normal-case no-underline not-italic pointer-events-none overflow-hidden break-words font-showcase [text-shadow:0_0_2px_rgba(0,0,0,0)]"
                >LOVE</span>
                <span className="h-auto w-full min-w-[20px] text-white text-[24.336px] font-medium text-center leading-normal tracking-[0px] normal-case no-underline not-italic pointer-events-none overflow-hidden break-words font-showcase [text-shadow:0_0_2px_rgba(0,0,0,0)]">
                    WEDDING
                </span>
            </motion.div>

            {/* Full Width Image */}
            <motion.div
                className="w-full relative h-[650px] rounded-lg overflow-hidden shadow-lg"
                // variants={imageAnimation}
            >
                <Image
                    src="/images/main_picture.jpg"
                    alt="Wedding Quote Image"
                    fill
                    className="object-cover"
                    priority
                />
            </motion.div>
            <motion.span
                className="h-auto w-full min-w-[20px] text-white text-[12.04px] font-medium text-center leading-normal tracking-[0px] normal-case no-underline not-italic pointer-events-none overflow-hidden break-words font-quicksand pt-2 [text-shadow:0_0_2px_rgba(0,0,0,0)]"
                // variants={fadeInRight}
            >
                As the clouds and mist dissipate, I love you and everyone knows it
            </motion.span>
        </motion.div>
    );
};
export default SectionQuote;
