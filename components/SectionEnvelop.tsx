"use client";

import React from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { EnvelopeAnimation } from "./EnvelopeAnimation";
import { fadeInLeft, imageAnimation, containerAnimation } from "@/lib/motionAnimations";

export const SectionEnvelop = ({ slug }: { slug: "groom" | "bridal" }) => {
  return (
    <motion.div
      className="bg-white relative max-auto w-full px-3 py-2 min-h-[450px] h-fit min-w-[20px] flex flex-col items-center overflow-hidden"
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-10%" }}
      variants={containerAnimation}
    >
      <motion.div
        className="font-showcase flex justify-between w-full px-3 py-2"
        variants={fadeInLeft}
      >
        <span className="text-black">YOU ARE</span>
        <span className="text-black">THE LOVE</span>
        <span className="text-black">MY LIFE</span>
      </motion.div>
      <motion.div variants={imageAnimation}>
        <Image
          src="/images/flower_1.png"
          alt="Flower decoration"
          width={100}
          height={100}
          className="absolute -left-8 top-[12rem] -translate-y-1/2 w-[100px] h-auto rotate-[35deg]"
        />
      </motion.div>
      <motion.span
        className="font-katty text-black text-[63.648px] font-medium text-center leading-normal tracking-normal normal-case no-underline not-italic pointer-events-none overflow-hidden break-words [text-shadow:0_0_2px_rgba(0,0,0,0)]"
        variants={fadeInLeft}
      >
        Wedding Invitation
      </motion.span>
      <span className="mt-16 h-auto w-full min-w-[20px] text-black text-[18.446px] font-medium text-center leading-normal tracking-normal normal-case no-underline not-italic pointer-events-none overflow-hidden break-words font-mallong [text-shadow:0_0_2px_rgba(0,0,0,0)]">
        Chạm để mở thiệp
      </span>
      <EnvelopeAnimation />

      <div className="relative mt-8">
        {/* Shadow overlay from envelope - fixed position with text */}
        <div
          className="absolute rounded-md inset-0 top-2 w-full h-[15px] animate-[envelopeShadow_3s_ease-in-out_infinite] pointer-events-none z-10"
          style={{
            background:
              "linear-gradient(90deg, rgba(0,0,0,0) 0%, rgba(0,0,0,0.6) 50%, rgba(0,0,0,0) 100%)",
            filter: "blur(3px)",
            opacity: 0.7,
          }}
        />

        <span className="relative h-auto w-full min-w-[20px] text-black text-[21.528px] font-medium text-center leading-normal tracking-normal normal-case no-underline not-italic pointer-events-none overflow-hidden break-words font-mallong block">
          TRÂN TRỌNG KÍNH MỜI
        </span>
      </div>
      <Image
        src="/images/flower_2.png"
        alt="Flower decoration"
        width={100}
        height={100}
        className="absolute -right-8 bottom-20 -translate-y-1/2 w-[100px] h-auto -rotate-[90deg]"
      />
      {/* <span className="mt-5 h-auto w-full min-w-[20px] text-[rgb(186,165,138)] text-[29.952px] font-medium text-center leading-normal tracking-normal normal-case no-underline not-italic pointer-events-none overflow-hidden break-words font-aquarelle [text-shadow:0_0_2px_rgba(0,0,0,0)]">
        Tên khách mời
      </span> */}
      <span className="mt-10 h-auto w-full min-w-[20px] text-black text-[21.528px] font-medium text-center leading-[1.33] tracking-normal uppercase no-underline not-italic pointer-events-none overflow-hidden break-words font-mallong [text-shadow:0_0_2px_rgba(0,0,0,0)]">
        ĐẾN DỰ BUỔI TIỆC CHUNG VUI CÙNG GIA ĐÌNH {slug === undefined ? '' : slug === 'groom' ? 'NHÀ TRAI' : 'NHÀ GÁI'} CHÚNG TÔI VÀO LÚC
      </span>
    </motion.div>
  );
};
