'use client'

import React from 'react';

interface DateBoardProps {
    className?: string;
}

const DateBoard: React.FC<DateBoardProps> = ({ className = '' }) => {
    // Generate calendar dates for November (30 days) starting from column 6
    const generateCalendarDates = () => {
        const calendarGrid = [];

        // First week: empty cells for columns 1-5, then November 1-2
        for (let i = 0; i < 5; i++) {
            calendarGrid.push({ day: null, month: null, isEmpty: true });
        }
        calendarGrid.push({ day: 1, month: 'November', isSpecial: false });
        calendarGrid.push({ day: 2, month: 'November', isSpecial: false });

        // Continue with November 3-29
        for (let i = 3; i <= 29; i++) {
            calendarGrid.push({
                day: i,
                month: 'November',
                isSpecial: false
            });
        }

        // November 30 (Tiệc cưới - Wedding Reception) - ends at column 7
        calendarGrid.push({
            day: 30,
            month: 'November',
            isSpecial: true,
            eventType: 'reception'
        });

        // December 1st (Đám cưới - Wedding Ceremony) at column 1 (next row)
        calendarGrid.push({
            day: 1,
            month: 'December',
            isSpecial: true,
            eventType: 'ceremony'
        });

        // Fill remaining cells to complete the grid if needed
        while (calendarGrid.length % 7 !== 0) {
            calendarGrid.push({ day: null, month: null, isEmpty: true });
        }

        return calendarGrid;
    };

    const calendarDates = generateCalendarDates();

    return (
        <div className={`${className} text-white`}>
            <div className="w-[300px] mx-auto">
                {/* Calendar Header */}
                {/* <div className="text-center mb-8">
                    <h2 className="text-3xl md:text-4xl font-bold text-[rgb(186,165,138)] font-signora mb-2">
                        November 2025
                    </h2>
                    <p className="text-white/70 font-mallong">
                        Đánh dấu ngày đặc biệt của chúng ta
                    </p>
                </div> */}

                {/* Calendar Grid */}
                <div className="relative grid grid-cols-7 ">
                    {calendarDates.map((date, index) => (
                        <div
                            key={index}
                            className={`
                                relative w-8 h-8 flex items-center justify-center
                                transition-all duration-300
                                ${date.isEmpty
                                    ? 'invisible' // Empty cells
                                    : date.isSpecial
                                        ? date.eventType === 'reception'
                                            ? 'text-[rgb(186,165,138)] transform scale-110' // Tiệc cưới - gold color
                                            : 'text-red-500 transform scale-110' // Đám cưới - red color
                                        : 'text-white hover:text-[rgb(186,165,138)]'
                                }
                                font-medium text-sm font-quicksand
                            `}
                        >
                            {!date.isEmpty && (
                                <div className="relative !w-[400px] flex items-center justify-center">
                                    {/* Wedding events with hover effects and heart SVG */}
                                    {date.isSpecial ? (
                                        <div className="relative flex flex-col items-center group cursor-pointer">
                                            {/* Number without border */}
                                            <div className={`px-2 relative transition-all duration-300 rounded-lg group-hover:shadow-lg ${date.eventType === 'reception'
                                                ? 'group-hover:bg-[rgb(186,165,138)] group-hover:bg-opacity-20 group-hover:shadow-[rgb(186,165,138)]'
                                                : 'group-hover:bg-red-500 group-hover:bg-opacity-20 group-hover:shadow-red-500'
                                                }`}>
                                                {date.day}
                                            </div>
                                            {/* Heart SVG always visible below the number */}
                                            <svg
                                                width="10"
                                                height="9"
                                                viewBox="0 0 24 22"
                                                fill="none"
                                                className={`${date.eventType === 'reception'
                                                    ? 'text-[rgb(186,165,138)]'
                                                    : 'text-red-500'
                                                    } transition-all duration-300 group-hover:scale-110 absolute top-6`}
                                            >
                                                <path
                                                    d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"
                                                    fill="currentColor"
                                                />
                                            </svg>
                                            {/* Tooltip - only visible on hover */}
                                            <div className="absolute -top-10 left-1/2 transform -translate-x-1/2 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none z-10">
                                                <div className={`text-white px-3 py-1 rounded-lg text-xs font-bold whitespace-nowrap shadow-lg ${date.eventType === 'reception'
                                                    ? 'bg-[rgb(186,165,138)]'
                                                    : 'bg-red-500'
                                                    }`}>
                                                    {date.eventType === 'reception' ? 'Tiệc Cưới' : 'Lễ thành hôn'}
                                                    {/* Arrow pointing down */}
                                                    <div className={`absolute top-full left-1/2 transform -translate-x-1/2 w-0 h-0 border-l-4 border-r-4 border-transparent ${date.eventType === 'reception'
                                                        ? 'border-t-[rgb(186,165,138)] border-t-4'
                                                        : 'border-t-red-500 border-t-4'
                                                        }`}></div>
                                                </div>
                                            </div>
                                        </div>
                                    ) : (
                                        <span>{date.day}</span>
                                    )}
                                </div>
                            )}
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default DateBoard;
