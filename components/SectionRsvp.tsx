"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import { containerAnimation, fadeInRight } from "@/lib/motionAnimations";
import Heart from "./Heart";

const SectionRsvp = () => {
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [formData, setFormData] = useState({
        fullName: '',
        attendance: ''
    });

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        if (!formData.fullName || !formData.attendance) {
            alert('Vui lòng điền đầy đủ thông tin!');
            return;
        }

        setIsSubmitting(true);

        try {
            const data = {
                ...formData,
                timestamp: new Date().toLocaleString('vi-VN'),
                // url: window.location.href // Removed to prevent reload issues
            };

            const response = await fetch('/api/submit-rsvp', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(data)
            });

            const result = await response.json();

            if (response.ok) {
                alert(result.message || 'Cảm ơn bạn đã xác nhận!');
                setFormData({ fullName: '', attendance: '' });
            } else {
                alert(result.error || 'Có lỗi xảy ra, vui lòng thử lại!');
            }
        } catch (error) {
            console.error('RSVP Error:', error);
            alert('Có lỗi kết nối, vui lòng kiểm tra mạng và thử lại!');
        } finally {
            setIsSubmitting(false);
        }
    };
    return (
        <motion.div
            className="relative max-auto w-full bg-white  pt-10 h-fit min-w-[20px] flex flex-col items-center overflow-hidden"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-10%" }}
            variants={containerAnimation}
        >
            <Heart />
            <motion.div
                animate={{
                    scale: [1, 1.1, 1],
                    rotate: [0, -2, 2, -2, 0]
                }}
                transition={{
                    duration: 2,
                    repeat: Infinity,
                    repeatType: "loop",
                    ease: "easeInOut"
                }}
            >
                <Image
                    src="/images/present.png"
                    alt="QR Code Chú rể"
                    width={100}
                    height={100}
                    className="object-cover my-10"
                />
            </motion.div>
            <div className="w-full max-w-md space-y-6 mt-8">
                {/* Block 1 - Chú rể */}
                <div className="border-2 w-[350px] h-[350px] mx-auto border-gray-300 rounded-lg p-6 flex flex-col items-center bg-white">
                    <motion.div
                        className="h-auto w-full min-w-[20px] flex flex-col text-black text-[18.848px] font-medium text-center leading-normal tracking-normal normal-case no-underline not-italic pointer-events-none overflow-hidden break-words font-quicksand pb-2 [text-shadow:0_0_2px_rgba(0,0,0,0)]"
                        variants={fadeInRight}
                    >
                        <span>Mừng cưới đến chú rể</span>
                    </motion.div>
                    <div className="relative w-48 h-48 mb-4">
                        <Image
                            src="/images/qr_groom.jpg"
                            alt="QR Code Chú rể"
                            fill
                            className="object-contain"
                        />
                    </div>
                    <div className="text-center space-y-2">
                        <p className=" text-black text-[12.848px] font-medium text-center leading-normal tracking-normal normal-case no-underline not-italic pointer-events-none overflow-hidden break-words font-quicksand [text-shadow:0_0_2px_rgba(0,0,0,0)]">Tên tài khoản: <span className=" text-black text-[12.848px] font-medium text-center leading-normal tracking-normal normal-case no-underline not-italic pointer-events-none overflow-hidden break-words font-quicksand [text-shadow:0_0_2px_rgba(0,0,0,0)]">HA DINH LOI</span></p>
                        <p className=" text-black text-[12.848px] font-medium text-center leading-normal tracking-normal normal-case no-underline not-italic pointer-events-none overflow-hidden break-words font-quicksand [text-shadow:0_0_2px_rgba(0,0,0,0)]">Số tài khoản: <span className=" text-black text-[12.848px] font-medium text-center leading-normal tracking-normal normal-case no-underline not-italic pointer-events-none overflow-hidden break-words font-quicksand [text-shadow:0_0_2px_rgba(0,0,0,0)]">2206502400</span></p>
                        <p className=" text-black text-[12.848px] font-medium text-center leading-normal tracking-normal normal-case no-underline not-italic pointer-events-none overflow-hidden break-words font-quicksand [text-shadow:0_0_2px_rgba(0,0,0,0)]">Chi nhánh: <span className=" text-black text-[12.848px] font-medium text-center leading-normal tracking-normal normal-case no-underline not-italic pointer-events-none overflow-hidden break-words font-quicksand [text-shadow:0_0_2px_rgba(0,0,0,0)]">BIDV - CN Thăng Long</span></p>
                    </div>
                </div>

                {/* Block 2 - Cô dâu */}
                <div className="border-2 w-[350px] h-[350px] mx-auto border-gray-300 rounded-lg p-6 flex flex-col items-center bg-white">
                    <motion.div
                        className="h-auto w-full min-w-[20px] pb-2 flex flex-col text-black text-[18.848px] font-medium text-center leading-normal tracking-normal normal-case no-underline not-italic pointer-events-none overflow-hidden break-words font-quicksand [text-shadow:0_0_2px_rgba(0,0,0,0)]"
                        variants={fadeInRight}
                    >
                        <span>Mừng cưới đến cô dâu</span>
                    </motion.div>
                    <div className="relative w-48 h-48 mb-4">
                        <Image
                            src="/images/qr_bridal.jpg"
                            alt="QR Code Cô dâu"
                            fill
                            className="object-contain"
                        />
                    </div>
                    <div className="text-center space-y-2">
                        <p className=" text-black text-[12.848px] font-medium text-center leading-normal tracking-normal normal-case no-underline not-italic pointer-events-none overflow-hidden break-words font-quicksand [text-shadow:0_0_2px_rgba(0,0,0,0)]">Tên tài khoản: <span className=" text-black text-[12.848px] font-medium text-center leading-normal tracking-normal normal-case no-underline not-italic pointer-events-none overflow-hidden break-words font-quicksand [text-shadow:0_0_2px_rgba(0,0,0,0)]">TRAN THI HANG</span></p>
                        <p className=" text-black text-[12.848px] font-medium text-center leading-normal tracking-normal normal-case no-underline not-italic pointer-events-none overflow-hidden break-words font-quicksand [text-shadow:0_0_2px_rgba(0,0,0,0)]">Số tài khoản: <span className=" text-black text-[12.848px] font-medium text-center leading-normal tracking-normal normal-case no-underline not-italic pointer-events-none overflow-hidden break-words font-quicksand [text-shadow:0_0_2px_rgba(0,0,0,0)]">4506110518</span></p>
                        <p className=" text-black text-[12.848px] font-medium text-center leading-normal tracking-normal normal-case no-underline not-italic pointer-events-none overflow-hidden break-words font-quicksand [text-shadow:0_0_2px_rgba(0,0,0,0)]">Chi nhánh: <span className=" text-black text-[12.848px] font-medium text-center leading-normal tracking-normal normal-case no-underline not-italic pointer-events-none overflow-hidden break-words font-quicksand [text-shadow:0_0_2px_rgba(0,0,0,0)]">BIDV - CN HA DONG PGD AN HUNG</span></p>
                    </div>
                </div>
            </div>
            <div className="w-[350px] height-[350px] max-w-md my-10">
                <div className="border-2 border-gray-300 rounded-lg p-8 bg-white shadow-lg">
                    <motion.h2
                        className="text-2xl font-bold text-center mb-6 text-gray-800 font-quicksand"
                        variants={fadeInRight}
                    >
                        Xác nhận tham dự
                    </motion.h2>

                    <form className="space-y-6" onSubmit={handleSubmit}>
                        {/* Họ và tên field */}
                        <div className="space-y-2">
                            <label
                                htmlFor="fullName"
                                className="block text-sm font-semibold text-gray-700 font-quicksand"
                            >
                                Họ và tên <span className="text-red-500">*</span>
                            </label>
                            <input
                                type="text"
                                id="fullName"
                                name="fullName"
                                value={formData.fullName}
                                onChange={(e) => setFormData(prev => ({ ...prev, fullName: e.target.value }))}
                                className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:ring-2 focus:ring-pink-400 focus:border-pink-400 transition-all outline-none font-quicksand"
                                placeholder="Nhập họ và tên của bạn"
                                required
                            />
                        </div>

                        {/* Trạng thái tham dự field */}
                        <div className="space-y-2">
                            <label
                                className="block text-sm font-semibold text-gray-700 font-quicksand mb-3"
                            >
                                Bạn có tham dự chứ? <span className="text-red-500">*</span>
                            </label>
                            <div className="space-y-3">
                                <label className="flex items-center p-3 border-2 border-gray-300 rounded-lg cursor-pointer hover:bg-pink-50 transition-colors">
                                    <input
                                        type="radio"
                                        name="attendance"
                                        value="yes"
                                        checked={formData.attendance === 'yes'}
                                        onChange={(e) => setFormData(prev => ({ ...prev, attendance: e.target.value }))}
                                        className="w-5 h-5 text-pink-500 focus:ring-pink-400"
                                        required
                                    />
                                    <span className="ml-3 text-gray-700 font-quicksand">
                                        Có, tôi sẽ tham dự
                                    </span>
                                </label>

                                <label className="flex items-center p-3 border-2 border-gray-300 rounded-lg cursor-pointer hover:bg-gray-50 transition-colors">
                                    <input
                                        type="radio"
                                        name="attendance"
                                        value="no"
                                        checked={formData.attendance === 'no'}
                                        onChange={(e) => setFormData(prev => ({ ...prev, attendance: e.target.value }))}
                                        className="w-5 h-5 text-gray-500 focus:ring-gray-400"
                                    />
                                    <span className="ml-3 text-gray-700 font-quicksand">
                                        Tôi không thể tham dự
                                    </span>
                                </label>
                            </div>
                        </div>

                        {/* Submit button */}
                        <motion.button
                            type="submit"
                            disabled={isSubmitting}
                            className="w-full py-4 bg-[#baa58a] text-white font-semibold rounded-lg shadow-lg hover:shadow-xl disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:shadow-lg transition-all font-quicksand text-lg"
                            whileHover={{ scale: isSubmitting ? 1 : 1.02 }}
                            whileTap={{ scale: isSubmitting ? 1 : 0.98 }}
                        >
                            {isSubmitting ? 'Đang gửi...' : 'Gửi xác nhận'}
                        </motion.button>
                    </form>
                </div>
            </div>
            <Image src="/images/groom_bridal.png" alt="RSVP Image" width={150} height={350} className="py-10" />
            <Image src="/images/thank_you.png" alt="RSVP Image" width={200} height={350} className="pb-10" />
            <div className="bg-black py-2 px-3 text-white flex justify-between w-full font-mallong">
                <span>Created with ♥ by Evanloi</span>
                <span>|</span>
                <span>Chú rể: 0342429911</span>
                <span>|</span>
                <span>Cô dâu: 0395889888</span>
            </div>
        </motion.div >
    );
};
export default SectionRsvp;
