'use client'

import React, { useEffect } from 'react';
import Image from 'next/image';

const SectionMansory = () => {
    // Disable all event listeners to prevent reload issues
    // useEffect(() => {
    //     // Detect in-app browser
    //     const isInAppBrowser = typeof window !== 'undefined' && (
    //         navigator.userAgent.toLowerCase().includes('facebook') ||
    //         navigator.userAgent.toLowerCase().includes('instagram') ||
    //         navigator.userAgent.toLowerCase().includes('line') ||
    //         navigator.userAgent.toLowerCase().includes('messenger') ||
    //         navigator.userAgent.toLowerCase().includes('zalo')
    //     );

    //     // Skip passive listeners for in-app browsers to prevent issues
    //     if (isInAppBrowser) {
    //         console.log('In-app browser detected, skipping passive listeners');
    //         return;
    //     }

    //     const handleWheel = (e: WheelEvent) => {
    //         // Passive wheel event handler - no preventDefault needed
    //     };

    //     const handleTouchMove = (e: TouchEvent) => {
    //         // Passive touch event handler
    //     };

    //     // Add passive event listeners only for regular browsers
    //     const addPassiveListeners = () => {
    //         document.addEventListener('wheel', handleWheel, { passive: true });
    //         document.addEventListener('touchmove', handleTouchMove, { passive: true });
    //     };

    //     addPassiveListeners();

    //     return () => {
    //         document.removeEventListener('wheel', handleWheel);
    //         document.removeEventListener('touchmove', handleTouchMove);
    //     };
    // }, []);

    // Mock data for wedding gallery images
    const galleryImages = [
        { src: '/images/picture_11.jpg', alt: 'Wedding Photo 1', height: 'h-[250px]' },
        { src: '/images/picture_10.jpg', alt: 'Wedding Photo 2', height: 'h-[300px]' },
        { src: '/images/picture_9.jpg', alt: 'Wedding Photo 3', height: 'h-[270px]' },
        { src: '/images/picture_4.jpg', alt: 'Wedding Photo 4', height: 'h-[320px]' },
        { src: '/images/picture_5.jpg', alt: 'Wedding Photo 5', height: 'h-[230px]' },
        { src: '/images/picture_6.jpg', alt: 'Wedding Photo 6', height: 'h-[290px]' },
        { src: '/images/picture_7.jpg', alt: 'Wedding Photo 7', height: 'h-[280px]' },
        { src: '/images/picture_8.jpg', alt: 'Wedding Photo 8', height: 'h-[250px]' },
        { src: '/images/picture_3.jpg', alt: 'Wedding Photo 9', height: 'h-[310px]' },
        { src: '/images/picture_2.jpg', alt: 'Wedding Photo 10', height: 'h-[220px]' },
        { src: '/images/picture_1.jpg', alt: 'Wedding Photo 11', height: 'h-[220px]' },
    ];

    // Split images into 3 columns for better layout
    const column1 = galleryImages.filter((_, index) => index % 3 === 0);
    const column2 = galleryImages.filter((_, index) => index % 3 === 1);
    const column3 = galleryImages.filter((_, index) => index % 3 === 2);

    return (
        <div className="w-full min-h-screen bg-gradient-to-br from-slate-50 via-white to-slate-100 pt-16 pb-5">
            {/* Section Header */}
            <div className="text-center py-12 px-4">
                <h2 className="text-4xl md:text-5xl h-auto w-full min-w-[20px] text-[rgb(186,165,138)] text-[39.312px] font-medium text-center leading-[1.22] tracking-[0px] normal-case no-underline not-italic pointer-events-none overflow-hidden break-words font-signora [text-shadow:0_0_2px_rgba(0,0,0,0)]">
                    Our Gallery
                </h2>
                <p className="text-lg text-gray-600 font-mallong max-w-2xl mx-auto">
                    Những khoảnh khắc đáng nhớ của chúng tôi
                </p>
            </div>

            {/* Static Masonry Grid - Simplified */}
            <div className="max-w-7xl mx-auto px-4">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">

                    {/* Column 1 */}
                    <div className="flex flex-col gap-4">
                        {column1.map((image, index) => (
                            <div
                                key={`col1-${index}`}
                                className={`relative ${image.height} w-full rounded-2xl overflow-hidden shadow-lg bg-gray-100`}
                            >
                                <Image
                                    src={image.src}
                                    alt={image.alt}
                                    fill
                                    className="object-cover"
                                    sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
                                    {...(index === 0 ? { priority: true } : { loading: 'lazy' as const })}
                                />
                            </div>
                        ))}
                    </div>

                    {/* Column 2 */}
                    <div className="flex flex-col gap-4">
                        {column2.map((image, index) => (
                            <div
                                key={`col2-${index}`}
                                className={`relative ${image.height} w-full rounded-2xl overflow-hidden shadow-lg bg-gray-100`}
                            >
                                <Image
                                    src={image.src}
                                    alt={image.alt}
                                    fill
                                    className="object-cover"
                                    sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
                                    {...(index === 0 ? { priority: true } : { loading: 'lazy' as const })}
                                />
                            </div>
                        ))}
                    </div>

                    {/* Column 3 */}
                    <div className="hidden lg:flex flex-col gap-4">
                        {column3.map((image, index) => (
                            <div
                                key={`col3-${index}`}
                                className={`relative ${image.height} w-full rounded-2xl overflow-hidden shadow-lg group bg-gray-100 transform-gpu will-change-transform`}
                                onClick={(e) => e.preventDefault()}
                                style={{ contain: 'layout style paint' }}
                            >
                                <Image
                                    src={image.src}
                                    alt={image.alt}
                                    fill
                                    className="object-cover transition-transform duration-500 ease-out"
                                    sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
                                    {...(index === 0 ? { priority: true } : { loading: 'lazy' as const })}
                                />
                            </div>
                        ))}
                    </div>

                </div>
            </div>
        </div>
    );
};

export default SectionMansory;
