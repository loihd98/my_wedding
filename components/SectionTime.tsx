"use client";

import React from "react";
import { motion } from "framer-motion";
import Divider from "./Divider";
import { fadeInRight, imageAnimation, containerAnimation } from "@/lib/motionAnimations";

const SectionTime = () => {
    return (
        <motion.div
            className="relative max-auto w-full px-3 py-2 min-h-[450px] h-fit min-w-[20px] flex flex-col items-center overflow-hidden bg-gradient-to-b from-white to-gray-50"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-10%" }}
            variants={containerAnimation}
        >
            <motion.span
                className="h-auto w-full min-w-[20px] text-[rgb(186,165,138)] text-[39.312px] font-medium text-center leading-[1.59] tracking-normal normal-case no-underline not-italic pointer-events-none overflow-hidden break-words font-signora [text-shadow:0_0_2px_rgba(0,0,0,0)]"
                variants={fadeInRight}
            >
                11 GIỜ 30 | CHỦ NHẬT | 30.11.2025
            </motion.span>
            <span className="h-auto w-full min-w-[20px] text-[rgb(0,0,0)] text-[18.72px] font-medium text-center leading-normal tracking-[0px] normal-case no-underline not-italic pointer-events-none overflow-hidden break-words font-signora [text-shadow:0_0_2px_rgba(0,0,0,0)]">
                (Nhằm ngày 11 tháng 10 năm Ất Tỵ)
            </span>
            <Divider />
            <span className="h-auto w-full min-w-[20px] text-[rgb(0,0,0)] text-[21.528px] font-medium text-center leading-[1.33] tracking-[0px] uppercase no-underline not-italic pointer-events-none overflow-hidden break-words font-mallong [text-shadow:0_0_2px_rgba(0,0,0,0)]">
                HÔN LỄ ĐƯỢC CỬ HÀNH TẠI
            </span>
            <div className="border-2 flex justify-center flex-col items-center mt-5 w-full border-dashed border-gold-950 rounded-lg p-2">
                <span className="h-auto w-full min-w-[20px] text-[rgb(186,165,138)] text-[39.312px] font-medium text-center leading-[1.22] tracking-[0px] normal-case no-underline not-italic pointer-events-none overflow-hidden break-words font-signora [text-shadow:0_0_2px_rgba(0,0,0,0)]">
                    TƯ GIA NHÀ TRAI
                </span>
                <div className="text-underline flex flex-col h-auto w-full min-w-[20px] tracking-5 text-black text-[18.72px] font-medium text-center leading-normal tracking-[0px] normal-case no-underline not-italic pointer-events-none overflow-hidden break-words font-signora [text-shadow:0_0_2px_rgba(0,0,0,0)]">
                    <span> Đ/c cũ: thôn An Phong, xã An Ninh, huyện Bình Lục, tỉnh Hà Nam</span>
                    <span> Đ/c mới: thôn An Phong, xã Bình Giang, tỉnh Ninh Bình</span>

                </div>

                {/* Google Maps Iframe */}
                <motion.div
                    className="w-full mt-4 mb-6"
                    variants={imageAnimation}
                >
                    <iframe
                        src="https://www.google.com/maps/embed?pb=!1m17!1m12!1m3!1d934.2926336679529!2d106.13540927570087!3d20.499234251938333!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m2!1m1!2zMjDCsDI5JzU3LjIiTiAxMDbCsDA4JzExLjkiRQ!5e0!3m2!1svi!2s!4v1763836464940!5m2!1svi!2s"
                        width="100%"
                        height="250"
                        style={{ border: 0 }}
                        allowFullScreen
                        loading="lazy"
                        referrerPolicy="no-referrer-when-downgrade"
                        className="rounded-lg shadow-md"
                    ></iframe>
                </motion.div>
                <a className="font-mallong" href="https://maps.app.goo.gl/wQnzeKK289WHxxL7A" target="_blank" rel="noopener noreferrer">https://maps.app.goo.gl/wQnzeKK289WHxxL7A</a>
            </div>

            <div className="border-2 flex justify-center flex-col items- w-full mt-5 border-dashed border-gold-950 rounded-lg p-2">
                <span className="h-auto w-full min-w-[20px] text-[rgb(186,165,138)] text-[39.312px] font-medium text-center leading-[1.22] tracking-[0px] normal-case no-underline not-italic pointer-events-none overflow-hidden break-words font-signora [text-shadow:0_0_2px_rgba(0,0,0,0)]">
                    TƯ GIA NHÀ GÁI
                </span>
                <div className="text-underline flex flex-col h-auto w-full min-w-[20px] tracking-5 text-black text-[18.72px] font-medium text-center leading-normal tracking-[0px] normal-case no-underline not-italic pointer-events-none overflow-hidden break-words font-signora [text-shadow:0_0_2px_rgba(0,0,0,0)]">
                    <span> Đ/c cũ: thôn Phúc Tiên, xã Hoằng Quỳ, huyện Hoằng Hóa, tỉnh Thanh Hóa</span>
                    <span> Đ/c mới: thôn Phúc Tiên, xã Hoằng Giang, tỉnh Thanh Hóa</span>
                </div>

                {/* Google Maps Iframe */}
                <motion.div
                    className="w-full mt-4 mb-6"
                    variants={imageAnimation}
                >
                    <iframe
                        src="https://www.google.com/maps/embed?pb=!1m17!1m12!1m3!1d938.0927377313519!2d105.80392826960528!3d19.8665522601356!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m2!1m1!2zMTnCsDUxJzU5LjYiTiAxMDXCsDQ4JzE2LjUiRQ!5e0!3m2!1svi!2s!4v1763836369073!5m2!1svi!2s"
                        width="100%"
                        height="250"
                        style={{ border: 0 }}
                        allowFullScreen
                        loading="lazy"
                        referrerPolicy="no-referrer-when-downgrade"
                        className="rounded-lg shadow-md"
                    ></iframe>
                </motion.div>
                <a className="text-center font-mallong" href="https://maps.app.goo.gl/tN1sTEvnD5NBmWbj9" target="_blank" rel="noopener noreferrer">https://maps.app.goo.gl/tN1sTEvnD5NBmWbj9</a>
            </div>

            <motion.div
                className="h-auto w-full py-10 min-w-[20px] text-black text-[17.784px] font-medium text-center leading-[1.6] tracking-[0px] normal-case no-underline not-italic pointer-events-none overflow-hidden break-words font-signora [text-shadow:0_0_2px_rgba(0,0,0,0)]"
                variants={fadeInRight}
            >
                <p>Gửi đến bạn tấm thiệp cưới đầy yêu thương.</p>
                <p>
                    Những ai nhận được lời mời này đều là những người đặc biệt với bọn
                    mình.
                </p>
                <p>Mong bạn và gia đình sẽ đến chung vui,</p>
                <p>Cùng chứng kiến khoảnh khắc hạnh phúc nhất của hai đứa.</p>
                <p>Cảm ơn vì luôn bên cạnh và yêu thương.</p>
                <p>Bọn mình rất mong được gặp bạn trong ngày vui này! ❤️</p>
            </motion.div>
        </motion.div>
    );
};

export default SectionTime;
