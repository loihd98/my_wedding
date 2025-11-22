"use client";

import React from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import DateBoard from "./DateBoard";
import { fadeInLeft, imageAnimation, containerAnimation } from "@/lib/motionAnimations";

const SectionSaveTheDate = () => {
    return (
        <motion.div
            className="relative max-auto w-full bg-white min-h-[450px] h-fit min-w-[20px] items-center overflow-hidden"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-10%" }}
            variants={containerAnimation}
        >
            <motion.div variants={imageAnimation}>
                <Image
                    src="/images/picture_card.png"
                    alt="Save The Date Decoration"
                    width={408}
                    height={652}
                    className=" w-[408PX] h-auto mx-auto py-10"
                />
            </motion.div>
            {/* Dark gradient overlay - covers only bottom half */}
            <div
                className="absolute z-[100] w-[360px] mx-auto py-10 bg-gradient-to-b from-transparent via-black/60 to-black/90 top-[200px] left-0 right-0 bottom-0 m-auto"
                style={{ height: "225px" }}
            ></div>
            {/* <div className="absolute inset-0 bg-gray-900/50"></div> */}
            {/* <motion.div variants={imageAnimation}> */}
            <Image
                src="/images/picture_7.jpg"
                alt="Save The Date Decoration"
                width={360}
                height={503}
                className=" w-[358px] z-8 h-[549px] object-cover mx-auto pt-10 absolute -top-[125px] left-0 -right-[2px] bottom-0 m-auto object-center"
            />
            {/* </motion.div> */}
            <motion.div
                className="flex flex-col items-center absolute h-auto w-full min-w-[20px] text-white text-[24.336px] bottom-[50px] font-medium text-center leading-[1.52] tracking-normal normal-case no-underline not-italic pointer-events-none overflow-hidden break-words font-madam-ghea [text-shadow:0_0_2px_rgba(0,0,0,0)]"
                variants={fadeInLeft}
            >
                <span>Thứ Bảy, 22/05/2050 </span>
                <span>Âm lịch 22/4 | 12:00 PM</span>
            </motion.div>
            <DateBoard className="absolute left-[75px] bottom-[180px] z-[101]" />
        </motion.div>
    );
};

export default SectionSaveTheDate;
