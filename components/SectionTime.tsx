import React from "react";
import Divider from "./Divider";

const SectionTime = () => {
    return (
        <div className="relative max-auto w-full px-3 py-2 min-h-[450px] h-fit min-w-[20px] flex flex-col items-center overflow-hidden bg-gradient-to-b from-white to-gray-50">
            <span className="h-auto w-full min-w-[20px] text-[rgb(186,165,138)] text-[39.312px] font-medium text-center leading-[1.59] tracking-normal normal-case no-underline not-italic pointer-events-none overflow-hidden break-words font-signora [text-shadow:0_0_2px_rgba(0,0,0,0)]">
                11 GIỜ 30 | CHỦ NHẬT | 30.11.2025
            </span>
            <span className="h-auto w-full min-w-[20px] text-[rgb(0,0,0)] text-[18.72px] font-medium text-center leading-normal tracking-[0px] normal-case no-underline not-italic pointer-events-none overflow-hidden break-words font-signora [text-shadow:0_0_2px_rgba(0,0,0,0)]">
                (Nhằm ngày 05 tháng 09 năm Ất Tỵ)
            </span>
            <Divider />
            <span className="h-auto w-full min-w-[20px] text-[rgb(0,0,0)] text-[21.528px] font-medium text-center leading-[1.33] tracking-[0px] uppercase no-underline not-italic pointer-events-none overflow-hidden break-words font-mallong [text-shadow:0_0_2px_rgba(0,0,0,0)]">
                HÔN LỄ ĐƯỢC CỬ HÀNH TẠI
            </span>
            <span className="h-auto w-full min-w-[20px] text-[rgb(186,165,138)] text-[39.312px] font-medium text-center leading-[1.22] tracking-[0px] normal-case no-underline not-italic pointer-events-none overflow-hidden break-words font-signora [text-shadow:0_0_2px_rgba(0,0,0,0)]">
                TƯ GIA NHÀ GÁI
            </span>
            <span className="h-auto w-full min-w-[20px] text-black text-[18.72px] font-medium text-center leading-normal tracking-[0px] normal-case no-underline not-italic pointer-events-none overflow-hidden break-words font-signora [text-shadow:0_0_2px_rgba(0,0,0,0)]">
                124 Đường Chiến Thắng, Lê Chân, Hải Phòng
            </span>

            {/* Google Maps Iframe */}
            <div className="w-full mt-4 mb-6">
                <iframe
                    src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3728.556!2d106.69234!3d20.85734!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x314a7b9c4b0d5c1f%3A0x1234567890abcdef!2s124%20%C4%90%C6%B0%E1%BB%9Dng%20Chi%E1%BA%BFn%20Th%E1%BA%AFng%2C%20L%C3%AA%20Ch%C3%A2n%2C%20H%E1%BA%A3i%20Ph%C3%B2ng!5e0!3m2!1sen!2svn!4v1234567890123!5m2!1sen!2svn"
                    width="100%"
                    height="250"
                    style={{ border: 0 }}
                    allowFullScreen
                    loading="lazy"
                    referrerPolicy="no-referrer-when-downgrade"
                    className="rounded-lg shadow-md"
                ></iframe>
            </div>

            <div className="h-auto w-full min-w-[20px] text-black text-[17.784px] font-medium text-center leading-[1.6] tracking-[0px] normal-case no-underline not-italic pointer-events-none overflow-hidden break-words font-signora [text-shadow:0_0_2px_rgba(0,0,0,0)]">
                <p>Gửi đến bạn tấm thiệp cưới đầy yêu thương.</p>
                <p>
                    Những ai nhận được lời mời này đều là những người đặc biệt với bọn
                    mình.
                </p>
                <p>Mong bạn và gia đình sẽ đến chung vui,</p>
                <p>Cùng chứng kiến khoảnh khắc hạnh phúc nhất của hai đứa.</p>
                <p>Cảm ơn vì luôn bên cạnh và yêu thương.</p>
                <p>Bọn mình rất mong được gặp bạn trong ngày vui này! ❤️</p>
            </div>
        </div>
    );
};

export default SectionTime;
