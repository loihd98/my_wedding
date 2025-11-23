"use client";

import React from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import Heart from "./Heart";
import { fadeInRight, imageAnimation, containerAnimation } from "@/lib/motionAnimations";

export const SectionDate = () => {
    return (
        <motion.div
            className="relative max-auto w-full px-10 h-fit min-w-[20px] flex flex-col gap-10 items-center overflow-hidden py-10"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-30%" }}
            variants={containerAnimation}
        >
            <Heart />
            <motion.div variants={imageAnimation}>
                <Image
                    src="/images/webp/save_the_date.webp"
                    alt="Save The Date Decoration"
                    width={273}
                    height={36}
                    className=" w-[200px] h-auto"
                />
            </motion.div>
            <motion.div
                className="h-auto w-full min-w-[20px] flex flex-col text-black text-[16.848px] font-medium text-center leading-normal tracking-normal normal-case no-underline not-italic pointer-events-none overflow-hidden break-words font-quicksand [text-shadow:0_0_2px_rgba(0,0,0,0)]"
                variants={fadeInRight}
            >
                <span>Đi một vòng lớn rồi vẫn gặp anh,</span>
                <span>Từ đó, thế gian bỗng hóa dịu dàng.</span>
            </motion.div>
        </motion.div>
    );
};
