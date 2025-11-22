'use client'

import React from 'react';
import { motion } from 'framer-motion';
import Image from 'next/image';
import { fadeInLeft, fadeInRight, imageAnimation, containerAnimation } from "@/lib/motionAnimations";

const SectionMansory = () => {
    // Mock data for wedding gallery images
    const galleryImages = [
        { src: '/images/picture_1.jpg', alt: 'Wedding Photo 1', height: 'h-[250px]' },
        { src: '/images/picture_2.jpg', alt: 'Wedding Photo 2', height: 'h-[300px]' },
        { src: '/images/picture_3.jpg', alt: 'Wedding Photo 3', height: 'h-[270px]' },
        { src: '/images/picture_4.jpg', alt: 'Wedding Photo 4', height: 'h-[320px]' },
        { src: '/images/picture_5.jpg', alt: 'Wedding Photo 5', height: 'h-[230px]' },
        { src: '/images/picture_6.jpg', alt: 'Wedding Photo 6', height: 'h-[290px]' },
        { src: '/images/picture_7.jpg', alt: 'Wedding Photo 7', height: 'h-[280px]' },
        { src: '/images/picture_8.jpg', alt: 'Wedding Photo 8', height: 'h-[250px]' },
        { src: '/images/picture_9.jpg', alt: 'Wedding Photo 9', height: 'h-[310px]' },
        { src: '/images/picture_10.jpg', alt: 'Wedding Photo 10', height: 'h-[220px]' },
        { src: '/images/picture_1.jpg', alt: 'Wedding Photo 1', height: 'h-[280px]' },
        { src: '/images/picture_2.jpg', alt: 'Wedding Photo 2', height: 'h-[240px]' },
        { src: '/images/picture_3.jpg', alt: 'Wedding Photo 3', height: 'h-[330px]' },
        { src: '/images/picture_4.jpg', alt: 'Wedding Photo 4', height: 'h-[260px]' },
        { src: '/images/picture_5.jpg', alt: 'Wedding Photo 5', height: 'h-[300px]' },
        { src: '/images/picture_6.jpg', alt: 'Wedding Photo 6', height: 'h-[340px]' },
        { src: '/images/picture_7.jpg', alt: 'Wedding Photo 7', height: 'h-[250px]' },
        { src: '/images/picture_8.jpg', alt: 'Wedding Photo 8', height: 'h-[290px]' },
        { src: '/images/picture_9.jpg', alt: 'Wedding Photo 9', height: 'h-[320px]' },
        { src: '/images/picture_10.jpg', alt: 'Wedding Photo 10', height: 'h-[270px]' },
    ];

    // Split images into 2 columns
    const leftColumn = galleryImages.filter((_, index) => index % 2 === 0);
    const rightColumn = galleryImages.filter((_, index) => index % 2 === 1);

    return (
        <motion.div 
            className="w-full min-h-screen bg-gradient-to-br from-slate-50 via-white to-slate-100 overflow-hidden relative"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-10%" }}
            variants={containerAnimation}
        >
            {/* Section Header */}
            <motion.div 
                className="text-center py-12 px-4 relative z-10"
                variants={fadeInLeft}
            >
                <h2 className="text-4xl md:text-5xl h-auto w-full min-w-[20px] text-[rgb(186,165,138)] text-[39.312px] font-medium text-center leading-[1.22] tracking-[0px] normal-case no-underline not-italic pointer-events-none overflow-hidden break-words font-signora [text-shadow:0_0_2px_rgba(0,0,0,0)]">
                    Our Gallery
                </h2>
                <p className="text-lg text-gray-600 font-mallong max-w-2xl mx-auto">
                    Những khoảnh khắc đáng nhớ của chúng tôi
                </p>
            </motion.div>

            {/* Masonry Container with Infinite Scroll */}
            <div className="relative w-full h-screen overflow-hidden">
                <div className="absolute inset-0 flex gap-4 px-4 max-w-7xl mx-auto">

                    {/* Left Column - Scrolling Down */}
                    <div className="flex-1 flex flex-col gap-4 animate-[masonryScrollDown_40s_linear_infinite] will-change-transform">
                        {[...leftColumn, ...leftColumn, ...leftColumn, ...leftColumn].map((image, index) => (
                            <div
                                key={`left-${index}`}
                                className={`relative ${image.height} w-full rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-500 group bg-gray-100 flex-shrink-0`}
                                style={{ minHeight: image.height.replace('h-[', '').replace(']', '') }}
                            >
                                <Image
                                    src={image.src}
                                    alt={image.alt}
                                    fill
                                    className="object-cover transition-transform duration-700 group-hover:scale-110"
                                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                                    loading="lazy"
                                />
                                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors duration-300" />
                            </div>
                        ))}
                    </div>

                    {/* Right Column - Scrolling Up (Reverse) */}
                    <div className="flex-1 flex flex-col gap-4 animate-[masonryScrollUp_40s_linear_infinite] will-change-transform">
                        {[...rightColumn, ...rightColumn, ...rightColumn, ...rightColumn].map((image, index) => (
                            <div
                                key={`right-${index}`}
                                className={`relative ${image.height} w-full rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-500 group bg-gray-100 flex-shrink-0`}
                                style={{ minHeight: image.height.replace('h-[', '').replace(']', '') }}
                            >
                                <Image
                                    src={image.src}
                                    alt={image.alt}
                                    fill
                                    className="object-cover transition-transform duration-700 group-hover:scale-110"
                                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                                    loading="lazy"
                                />
                                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors duration-300" />
                            </div>
                        ))}
                    </div>

                </div>

                {/* Gradient Overlays for seamless effect */}
                <div className="absolute top-0 left-0 right-0 h-32 bg-gradient-to-b from-slate-50 to-transparent z-10 pointer-events-none" />
                <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-slate-100 to-transparent z-10 pointer-events-none" />
            </div>
        </motion.div>
    );
};

export default SectionMansory;
