"use client";

import React from "react";
import { motion } from "framer-motion";
import Heart from "./Heart";
import Image from "next/image";
import CountDown from "./CountDown";
import { fadeInLeft, fadeInRight, imageAnimation, containerAnimation } from "@/lib/motionAnimations";

interface SectionActorProps {
    currentSlug?: 'groom' | 'bridal'
}

const SectionActor = ({ currentSlug }: SectionActorProps) => {
    return (
        <motion.div
            className="relative max-auto w-full bg-white min-h-[450px] h-fit min-w-[20px] flex flex-col items-center overflow-hidden"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-10%" }}
            variants={containerAnimation}
        >
            <motion.div
                className="flex py-10 flex-col h-auto w-full min-w-[20px] text-black text-[16.848px] font-medium text-center leading-[1.45] tracking-[0px] normal-case no-underline not-italic pointer-events-none overflow-hidden break-words font-quicksand [text-shadow:0_0_2px_rgba(0,0,0,0)]"
                variants={fadeInLeft}
            >
                <span>To Our Family And Friends,</span>
                <span>Thank You For Celebrating Our Special Day,</span>
                <span>Supporting Us And Sharing Our Love.</span>
            </motion.div>

            <Heart />

            <motion.div variants={imageAnimation}>
                <Image
                    src="/images/my_lover.png"
                    alt="Wedding Quote Image"
                    width={250}
                    height={50}
                    className="object-cover mt-10"
                    priority
                />
            </motion.div>

            <motion.div
                className="flex justify-around w-full h-auto min-w-[20px] text-black text-[24.336px] font-medium text-center leading-normal tracking-[0px] normal-case no-underline not-italic pointer-events-none overflow-hidden break-words font-mallong [text-shadow:0_0_2px_rgba(0,0,0,0)]"
                variants={containerAnimation}
            >
                <motion.div
                    className="flex flex-col gap-3 w-1/2 items-center"
                    variants={fadeInLeft}
                >
                    <motion.div variants={imageAnimation}>
                        <Image
                            src="/images/groom.jpg"
                            alt="Groom Image"
                            width={168}
                            height={240}
                            className="object-cover mt-10"
                            priority
                        />
                    </motion.div>
                    <span>|</span>
                    <a
                        href="/groom"
                        className="hover:text-pink-600 transition-colors cursor-pointer"
                    >
                        <span>Hà Lợi</span>
                    </a>
                </motion.div>

                <motion.div
                    className="flex flex-col gap-3 w-1/2 items-center"
                    variants={fadeInRight}
                >
                    <motion.div variants={imageAnimation}>
                        <Image
                            src="/images/bridal.jpg"
                            alt="Bride Image"
                            width={168}
                            height={240}
                            className="object-cover mt-10"
                            priority
                        />
                    </motion.div>
                    <span>|</span>
                    <a
                        href="/bridal"
                        className="hover:text-pink-600 transition-colors cursor-pointer"
                    >
                        <span>Trần Hằng</span>
                    </a>
                </motion.div>
            </motion.div>

            <motion.span
                className="flex py-10 flex-col h-auto w-full min-w-[20px] text-black text-[16.848px] font-medium text-center leading-[1.45] tracking-[0px] normal-case no-underline not-italic pointer-events-none overflow-hidden break-words font-quicksand [text-shadow:0_0_2px_rgba(0,0,0,0)]"
                variants={fadeInLeft}
            >
                <span>My heart, the bird of the wilderness has found</span>
                <span>its sky in your eye.</span>
            </motion.span>

            <motion.div
                className="flex justify-between w-full"
                variants={fadeInRight}
            >
                <span className="h-auto w-full min-w-[20px] text-black text-[24.336px] font-medium text-center leading-normal tracking-[0px] normal-case no-underline not-italic pointer-events-none overflow-hidden break-words font-showcase [text-shadow:0_0_2px_rgba(0,0,0,0)]">
                    Welcome
                </span>
                <span className="h-auto w-full min-w-[20px] text-black text-[24.336px] font-medium text-center leading-normal tracking-[0px] normal-case no-underline not-italic pointer-events-none overflow-hidden break-words font-showcase [text-shadow:0_0_2px_rgba(0,0,0,0)]">
                    To
                </span>
                <span className="h-auto w-full min-w-[20px] text-black text-[24.336px] font-medium text-center leading-normal tracking-[0px] normal-case no-underline not-italic pointer-events-none overflow-hidden break-words font-showcase [text-shadow:0_0_2px_rgba(0,0,0,0)]">
                    Wedding
                </span>
            </motion.div>

            <motion.div
                className="h-[843px] max-w-[468px] relative w-full"
                variants={imageAnimation}
            >
                <Image
                    src="/images/album_layout.png"
                    alt="Wedding Album Layout"
                    fill
                    className="object-cover"
                    priority
                />
                <motion.div
                    className="absolute -top-4 md:left-[45px] left-[26px]"
                    variants={imageAnimation}
                >
                    <Image
                        src="/images/picture_2.jpg"
                        alt="Wedding Picture 2"
                        className="object-cover mt-10 w-[380] h-[260px] object-[25%_25%]"
                        priority
                        width={380}
                        height={260}
                    />
                    <span className="h-auto w-full min-w-[20px] absolute bottom-2 text-white text-[14.976px] font-medium text-center leading-normal tracking-[0px] normal-case no-underline not-italic pointer-events-none overflow-hidden break-words font-quicksand [text-shadow:0_0_2px_rgba(0,0,0,0)]">
                        I love three things in this world.
                    </span>
                </motion.div>

                <motion.div
                    className="absolute top-[250px] md:left-[45px] left-[26px]"
                    variants={imageAnimation}
                >
                    <Image
                        src="/images/picture_6.jpg"
                        alt="Wedding Picture 6"
                        className="object-cover mt-10 w-[380] h-[260px] object-[25%_85%]"
                        priority
                        width={380}
                        height={260}
                    />
                    <span className="h-auto w-full min-w-[20px] absolute bottom-2 text-white text-[14.976px] font-medium text-center leading-normal tracking-[0px] normal-case no-underline not-italic pointer-events-none overflow-hidden break-words font-quicksand [text-shadow:0_0_2px_rgba(0,0,0,0)]">
                        Sun, moon and you.
                    </span>
                </motion.div>

                <motion.div
                    className="absolute top-[518px] md:left-[45px] left-[26px]"
                    variants={imageAnimation}
                >
                    <Image
                        src="/images/picture_3.jpg"
                        alt="Wedding Picture 3"
                        className="object-cover mt-10 w-[380] h-[260px] object-[15%_0%]"
                        priority
                        width={380}
                        height={260}
                    />
                    <span className="h-auto w-full min-w-[20px] absolute bottom-2 text-white text-[14.976px] font-medium text-center leading-normal tracking-[0px] normal-case no-underline not-italic pointer-events-none overflow-hidden break-words font-quicksand [text-shadow:0_0_2px_rgba(0,0,0,0)]">
                        Sun for morning,moon for night, and you forever.
                    </span>
                </motion.div>
            </motion.div>

            <CountDown />
        </motion.div>
    );
};

export default SectionActor;
