'use client'

import React, { useState, useEffect } from 'react';

interface TimeLeft {
    days: number;
    hours: number;
    minutes: number;
    seconds: number;
}

const CountDown = () => {
    const [timeLeft, setTimeLeft] = useState<TimeLeft>({
        days: 0,
        hours: 0,
        minutes: 0,
        seconds: 0
    });

    useEffect(() => {
        // Wedding date: November 30, 2025 at 11:30 AM
        const weddingDate = new Date('2025-11-30T11:30:00+07:00').getTime();

        const timer = setInterval(() => {
            const now = new Date().getTime();
            const difference = weddingDate - now;

            if (difference > 0) {
                const days = Math.floor(difference / (1000 * 60 * 60 * 24));
                const hours = Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
                const minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));
                const seconds = Math.floor((difference % (1000 * 60)) / 1000);

                setTimeLeft({ days, hours, minutes, seconds });
            } else {
                setTimeLeft({ days: 0, hours: 0, minutes: 0, seconds: 0 });
                clearInterval(timer);
            }
        }, 1000);

        return () => clearInterval(timer);
    }, []);

    const timeUnits = [
        { value: timeLeft.days, label: 'NGÀY' },
        { value: timeLeft.hours, label: 'GIỜ' },
        { value: timeLeft.minutes, label: 'PHÚT' },
        { value: timeLeft.seconds, label: 'GIÂY' }
    ];

    return (
        <div className="w-full h-[200px] px-4 py-6 flex items-center justify-center bg-gradient-to-b from-white to-gray-50">
            <div className="w-full max-w-md">
                <h2 className="text-center text-[rgb(186,165,138)] text-[20px] font-medium mb-6 font-signora">
                    ĐẾM NGƯỢC ĐẾN NGÀY CƯỚI
                </h2>

                <div className="grid grid-cols-4 gap-4">
                    {timeUnits.map((unit, index) => (
                        <div
                            key={index}
                            className="flex flex-col items-center justify-center bg-white rounded-lg shadow-md border border-gray-100 p-3 min-h-[80px]"
                        >
                            <div className="text-[rgb(186,165,138)] text-[24px] font-bold font-showcase mb-1">
                                {unit.value.toString().padStart(2, '0')}
                            </div>
                            <div className="text-black text-[12px] font-medium font-mallong uppercase tracking-wide">
                                {unit.label}
                            </div>
                        </div>
                    ))}
                </div>

                <div className="text-center mt-4 text-gray-600 text-[14px] font-signora">
                    30 Tháng 11, 2025 - 11:30 AM
                </div>
            </div>
        </div>
    );
};

export default CountDown;
