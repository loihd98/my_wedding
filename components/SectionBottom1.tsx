

"use client";

import React from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import { fadeInRight, containerAnimation } from "@/lib/motionAnimations";

export const SectionBottom1 = () => {
    return (
        <motion.div
            className="bg-white pt-10 relative max-auto w-full px-3 h-fit min-w-[20px] flex flex-col items-center overflow-hidden"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-10%" }}
            variants={containerAnimation}
        >
            <motion.div
                className="flex flex-col h-auto w-full min-w-[20px] text-black text-[14.848px] font-medium text-center leading-normal tracking-normal normal-case no-underline not-italic pointer-events-none overflow-hidden break-words font-mallong [text-shadow:0_0_2px_rgba(0,0,0,0)]"
                variants={fadeInRight}
            >
                <span>&quot;Hết lần này đến lần khác, đem chuyện tình riêng khoe với thế gian,</span>
                <span>Chỉ vì mỗi lần nhìn em, anh lại thấy đó là điều đáng tự hào nhất.&quot;</span>
            </motion.div>
        </motion.div>
    );
};
