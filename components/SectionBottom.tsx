

"use client";

import React from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import { fadeInRight, containerAnimation } from "@/lib/motionAnimations";

export const SectionBottom = () => {
    return (
        <motion.div
            className="bg-white relative max-auto w-full px-3 h-fit min-w-[20px] flex flex-col items-center overflow-hidden"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-10%" }}
            variants={containerAnimation}
        >
            <motion.div
                className="flex flex-col h-auto w-full min-w-[20px] text-black text-[16.848px] font-medium text-center leading-normal tracking-normal normal-case no-underline not-italic pointer-events-none overflow-hidden break-words font-mallong [text-shadow:0_0_2px_rgba(0,0,0,0)]"
                variants={fadeInRight}
            >
                <span>Hạnh phúc lớn nhất chính là được nắm tay anh,</span>
                <span>Cùng nhau đi hết cuộc đời lãng mạn này</span>
            </motion.div>
        </motion.div>
    );
};
