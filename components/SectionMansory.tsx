'use client'

import React, { useState, useRef, useEffect } from 'react';
import Image from 'next/image';

// ✅ Simple gallery images - NO useMemo, NO complex logic
const GALLERY_IMAGES = [
    { src: '/images/webp/picture_11.webp', alt: 'Wedding Photo 1', height: 'h-[250px]' },
    { src: '/images/webp/picture_10.webp', alt: 'Wedding Photo 2', height: 'h-[300px]' },
    { src: '/images/webp/picture_9.webp', alt: 'Wedding Photo 3', height: 'h-[270px]' },
    { src: '/images/webp/picture_4.webp', alt: 'Wedding Photo 4', height: 'h-[320px]' },
    { src: '/images/webp/picture_5.webp', alt: 'Wedding Photo 5', height: 'h-[230px]' },
    { src: '/images/webp/picture_6.webp', alt: 'Wedding Photo 6', height: 'h-[290px]' },
    { src: '/images/webp/picture_7.webp', alt: 'Wedding Photo 7', height: 'h-[280px]' },
    { src: '/images/webp/picture_8.webp', alt: 'Wedding Photo 8', height: 'h-[250px]' },
    { src: '/images/webp/picture_3.webp', alt: 'Wedding Photo 9', height: 'h-[310px]' },
    { src: '/images/webp/picture_2.webp', alt: 'Wedding Photo 10', height: 'h-[220px]' },
    { src: '/images/webp/picture_1.webp', alt: 'Wedding Photo 11', height: 'h-[220px]' },
];

// ✅ Simple placeholder gradient
const PLACEHOLDER = "data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTAiIGhlaWdodD0iMTAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGxpbmVhckdyYWRpZW50IGlkPSJnIiB4MT0iMCIgeTE9IjAiIHgyPSIxIiB5Mj0iMSI+PHN0b3Agb2Zmc2V0PSIwJSIgc3RvcC1jb2xvcj0iI2YwZjBmMCIvPjxzdG9wIG9mZnNldD0iMTAwJSIgc3RvcC1jb2xvcj0iI2QwZDBkMCIvPjwvbGluZWFyR3JhZGllbnQ+PHJlY3Qgd2lkdGg9IjEwIiBoZWlnaHQ9IjEwIiBmaWxsPSJ1cmwoI2cpIi8+PC9zdmc+";

const SectionMansory = () => {
    const [isVisible, setIsVisible] = useState(false);
    const sectionRef = useRef<HTMLDivElement>(null);
    const observerRef = useRef<IntersectionObserver | null>(null);

    // ✅ Super simple intersection observer - chỉ chạy 1 lần
    useEffect(() => {
        if (!sectionRef.current || observerRef.current) return;

        observerRef.current = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting) {
                    setIsVisible(true);
                    // Disconnect ngay lập tức
                    observerRef.current?.disconnect();
                    observerRef.current = null;
                }
            },
            { rootMargin: '100px' }
        );

        observerRef.current.observe(sectionRef.current);

        return () => {
            observerRef.current?.disconnect();
            observerRef.current = null;
        };
    }, []); // ✅ Empty deps

    // ✅ Simple column distribution
    const col1 = GALLERY_IMAGES.filter((_, i) => i % 3 === 0);
    const col2 = GALLERY_IMAGES.filter((_, i) => i % 3 === 1);
    const col3 = GALLERY_IMAGES.filter((_, i) => i % 3 === 2);

    return (
        <div
            ref={sectionRef}
            className="w-full min-h-screen bg-gradient-to-br from-slate-50 via-white to-slate-100 pt-16 pb-5"
        >
            {/* Header */}
            <div className="text-center py-12 px-4">
                <h2 className="text-4xl md:text-5xl text-[rgb(186,165,138)] font-medium font-signora">
                    Our Gallery
                </h2>
                <p className="text-lg text-gray-600 font-mallong max-w-2xl mx-auto mt-2">
                    Những khoảnh khắc đáng nhớ của chúng tôi
                </p>
            </div>

            {/* Simple grid */}
            <div className="max-w-7xl mx-auto px-4">
                <div className="grid grid-cols-2 lg:grid-cols-3 gap-4">

                    {/* Column 1 */}
                    <div className="flex flex-col gap-4">
                        {col1.map((img, idx) => (
                            <SimpleImage
                                key={`col1-${idx}`}
                                image={img}
                                isVisible={isVisible}
                            />
                        ))}
                    </div>

                    {/* Column 2 */}
                    <div className="flex flex-col gap-4">
                        {col2.map((img, idx) => (
                            <SimpleImage
                                key={`col2-${idx}`}
                                image={img}
                                isVisible={isVisible}
                            />
                        ))}
                    </div>

                    {/* Column 3 - Hidden on mobile */}
                    <div className="hidden lg:flex flex-col gap-4">
                        {col3.map((img, idx) => (
                            <SimpleImage
                                key={`col3-${idx}`}
                                image={img}
                                isVisible={isVisible}
                            />
                        ))}
                    </div>

                </div>
            </div>
        </div>
    );
};

// ✅ Ultra simple image component
const SimpleImage = ({
    image,
    isVisible
}: {
    image: typeof GALLERY_IMAGES[0],
    isVisible: boolean
}) => {
    const [loaded, setLoaded] = useState(false);
    const [error, setError] = useState(false);

    return (
        <div
            className={`relative ${image.height} w-full rounded-2xl overflow-hidden shadow-lg bg-gray-200`}
        >
            {/* Skeleton placeholder */}
            {!loaded && !error && (
                <div className="absolute inset-0 bg-gradient-to-br from-gray-200 via-gray-100 to-gray-200 animate-pulse" />
            )}

            {/* Error state */}
            {error && (
                <div className="absolute inset-0 bg-gray-300 flex items-center justify-center">
                    <div className="text-center text-gray-500">
                        <div className="text-2xl">📷</div>
                        <div className="text-xs mt-1">Ảnh lỗi</div>
                    </div>
                </div>
            )}

            {/* Image - always render, let Next.js handle lazy loading */}
            {isVisible && !error && (
                <Image
                    src={image.src}
                    alt={image.alt}
                    fill
                    className={`object-cover transition-opacity duration-500 ${loaded ? 'opacity-100' : 'opacity-0'
                        }`}
                    sizes="(max-width: 768px) 50vw, (max-width: 1024px) 50vw, 33vw"
                    quality={85}
                    placeholder="blur"
                    blurDataURL={PLACEHOLDER}
                    loading="lazy"
                    onLoad={() => setLoaded(true)}
                    onError={() => setError(true)}
                />
            )}
        </div>
    );
};

export default SectionMansory;