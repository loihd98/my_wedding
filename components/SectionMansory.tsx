'use client'

import React, { useEffect, useState, useRef, useMemo, useCallback } from 'react';
import Image from 'next/image';
import { useImageCache } from '@/lib/imageCache';

const SectionMansory = () => {
    const [visibleImages, setVisibleImages] = useState<Set<number>>(new Set());
    const [failedImages, setFailedImages] = useState<Set<number>>(new Set());
    const [isIntersecting, setIsIntersecting] = useState(false);
    const sectionRef = useRef<HTMLDivElement>(null);
    const { preloadImages } = useImageCache();

    // ✅ FIX 1: Prevent re-initialization với useRef
    const hasLoadedRef = useRef(false);
    const timeoutsRef = useRef<NodeJS.Timeout[]>([]);

    // Gallery images - đã có useMemo là tốt
    const galleryImages = useMemo(() => [
        { src: '/images/webp/picture_11.webp', alt: 'Wedding Photo 1', height: 'h-[250px]', priority: true },
        { src: '/images/webp/picture_10.webp', alt: 'Wedding Photo 2', height: 'h-[300px]', priority: true },
        { src: '/images/webp/picture_9.webp', alt: 'Wedding Photo 3', height: 'h-[270px]', priority: true },
        { src: '/images/webp/picture_4.webp', alt: 'Wedding Photo 4', height: 'h-[320px]' },
        { src: '/images/webp/picture_5.webp', alt: 'Wedding Photo 5', height: 'h-[230px]' },
        { src: '/images/webp/picture_6.webp', alt: 'Wedding Photo 6', height: 'h-[290px]' },
        { src: '/images/webp/picture_7.webp', alt: 'Wedding Photo 7', height: 'h-[280px]' },
        { src: '/images/webp/picture_8.webp', alt: 'Wedding Photo 8', height: 'h-[250px]' },
        { src: '/images/webp/picture_3.webp', alt: 'Wedding Photo 9', height: 'h-[310px]' },
        { src: '/images/webp/picture_2.webp', alt: 'Wedding Photo 10', height: 'h-[220px]' },
        { src: '/images/webp/picture_1.webp', alt: 'Wedding Photo 11', height: 'h-[220px]' },
    ], []);

    // ✅ FIX 2: Intersection Observer - chỉ chạy 1 lần
    useEffect(() => {
        if (hasLoadedRef.current) return; // Prevent duplicate execution

        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting && !hasLoadedRef.current) {
                        hasLoadedRef.current = true;
                        setIsIntersecting(true);

                        // Preload first 3 images
                        preloadImages(galleryImages.slice(0, 3).map(img => img.src))
                            .catch(console.error);

                        // Disconnect immediately
                        observer.disconnect();
                    }
                });
            },
            { rootMargin: '50px' }
        );

        if (sectionRef.current) {
            observer.observe(sectionRef.current);
        }

        return () => observer.disconnect();
    }, []); // ✅ Empty deps - chỉ chạy khi mount

    // ✅ FIX 3: Progressive loading - chỉ chạy 1 lần khi isIntersecting = true
    useEffect(() => {
        if (!isIntersecting || hasLoadedRef.current === false) return;

        // Clear any existing timeouts
        timeoutsRef.current.forEach(clearTimeout);
        timeoutsRef.current = [];

        // Load first 3 images immediately
        setVisibleImages(new Set([0, 1, 2]));

        // Load remaining images progressively
        galleryImages.slice(3).forEach((_, index) => {
            const timeout = setTimeout(() => {
                const newIndex = index + 3;
                setVisibleImages(prev => {
                    const newSet = new Set(prev);
                    newSet.add(newIndex);
                    return newSet;
                });
            }, (index + 1) * 300);

            timeoutsRef.current.push(timeout);
        });

        // Cleanup function
        return () => {
            timeoutsRef.current.forEach(clearTimeout);
            timeoutsRef.current = [];
        };
    }, [isIntersecting]); // ✅ Chỉ phụ thuộc vào isIntersecting, không có galleryImages

    const gradientBase64 =
        "data:image/svg+xml;base64," +
        btoa(
            `<svg xmlns="http://www.w3.org/2000/svg" width="10" height="10">
      <linearGradient id="g" x1="0" y1="0" x2="1" y2="1">
        <stop offset="0%" stop-color="#f0f0f0"/>
        <stop offset="100%" stop-color="#d0d0d0"/>
      </linearGradient>
      <rect width="10" height="10" fill="url(#g)"/>
    </svg>`
        );

    // Split images into 3 columns
    const column1 = useMemo(() => galleryImages.filter((_, index) => index % 3 === 0), [galleryImages]);
    const column2 = useMemo(() => galleryImages.filter((_, index) => index % 3 === 1), [galleryImages]);
    const column3 = useMemo(() => galleryImages.filter((_, index) => index % 3 === 2), [galleryImages]);
    const isIapBrowser = typeof window !== 'undefined' && /zalo|fbav|line/i.test(navigator.userAgent);

    // ✅ FIX 4: Memoize error handlers
    const handleImageError = useCallback((originalIndex: number, src: string) => {
        console.error(`Failed to load image ${originalIndex}: ${src}`);
        setFailedImages(prev => {
            const newSet = new Set(prev);
            newSet.add(originalIndex);
            return newSet;
        });
    }, []);

    const handleImageLoad = useCallback((originalIndex: number, src: string) => {
        console.log(`Successfully loaded image ${originalIndex}: ${src}`);
    }, []);

    // Image component with lazy loading and placeholder
    const ImageWithPlaceholder = useCallback(({
        image,
        originalIndex,
        displayIndex,
        columnIndex
    }: {
        image: typeof galleryImages[0],
        originalIndex: number,
        displayIndex: number,
        columnIndex: number
    }) => {
        const shouldLoad = visibleImages.has(originalIndex);
        const hasFailed = failedImages.has(originalIndex);

        return (
            <div
                className={`relative ${image.height} w-full rounded-2xl overflow-hidden shadow-lg bg-gray-200 transition-all duration-500`}
                style={{
                    contain: 'layout style paint',
                    contentVisibility: isIapBrowser ? 'visible' : 'auto',
                }}
            >
                {/* Skeleton placeholder */}
                {!shouldLoad && !hasFailed && (
                    <div className="absolute inset-0 bg-gradient-to-br from-gray-200 via-gray-100 to-gray-200 animate-pulse">
                        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent animate-shimmer"></div>
                    </div>
                )}

                {/* Error state */}
                {hasFailed && (
                    <div className="absolute inset-0 bg-gray-300 flex items-center justify-center">
                        <div className="text-center text-gray-500">
                            <div className="text-2xl mb-2">📷</div>
                            <div className="text-sm">Không thể tải ảnh</div>
                            <div className="text-xs mt-1">{image.alt}</div>
                        </div>
                    </div>
                )}

                {/* Actual image */}
                {shouldLoad && !hasFailed && (
                    <Image
                        src={image.src}
                        alt={image.alt}
                        fill
                        className="object-cover transition-opacity duration-500"
                        sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
                        quality={85}
                        placeholder="blur"
                        blurDataURL={gradientBase64}
                        loading={image.priority ? "eager" : "lazy"}
                        priority={image.priority}
                        onLoad={() => handleImageLoad(originalIndex, image.src)}
                        onError={() => handleImageError(originalIndex, image.src)}
                        unoptimized={false}
                    />
                )}
            </div>
        );
    }, [visibleImages, failedImages, isIapBrowser, handleImageError, handleImageLoad, gradientBase64]);

    return (
        <div
            ref={sectionRef}
            className="w-full min-h-screen bg-gradient-to-br from-slate-50 via-white to-slate-100 pt-16 pb-5"
        >
            {/* Section Header */}
            <div className="text-center py-12 px-4">
                <h2 className="text-4xl md:text-5xl h-auto w-full min-w-[20px] text-[rgb(186,165,138)] text-[39.312px] font-medium text-center leading-[1.22] tracking-[0px] normal-case no-underline not-italic pointer-events-none overflow-hidden break-words font-signora [text-shadow:0_0_2px_rgba(0,0,0,0)]">
                    Our Gallery
                </h2>
                <p className="text-lg text-gray-600 font-mallong max-w-2xl mx-auto">
                    Những khoảnh khắc đáng nhớ của chúng tôi
                </p>
            </div>

            {/* Optimized Masonry Grid */}
            <div className="max-w-7xl mx-auto px-4">
                <div className="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-3 gap-4">

                    {/* Column 1 */}
                    <div className="flex flex-col gap-4">
                        {column1.map((image, displayIndex) => {
                            const originalIndex = galleryImages.findIndex(img => img.src === image.src);
                            return (
                                <ImageWithPlaceholder
                                    key={`col1-${originalIndex}`}
                                    image={image}
                                    originalIndex={originalIndex}
                                    displayIndex={displayIndex}
                                    columnIndex={0}
                                />
                            );
                        })}
                    </div>

                    {/* Column 2 */}
                    <div className="flex flex-col gap-4">
                        {column2.map((image, displayIndex) => {
                            const originalIndex = galleryImages.findIndex(img => img.src === image.src);
                            return (
                                <ImageWithPlaceholder
                                    key={`col2-${originalIndex}`}
                                    image={image}
                                    originalIndex={originalIndex}
                                    displayIndex={displayIndex}
                                    columnIndex={1}
                                />
                            );
                        })}
                    </div>

                    {/* Column 3 */}
                    <div className="hidden lg:flex flex-col gap-4">
                        {column3.map((image, displayIndex) => {
                            const originalIndex = galleryImages.findIndex(img => img.src === image.src);
                            return (
                                <ImageWithPlaceholder
                                    key={`col3-${originalIndex}`}
                                    image={image}
                                    originalIndex={originalIndex}
                                    displayIndex={displayIndex}
                                    columnIndex={2}
                                />
                            );
                        })}
                    </div>

                </div>
            </div>

            {/* Loading indicator */}
            {isIntersecting && visibleImages.size < galleryImages.length && (
                <div className="text-center mt-8">
                    <div className="inline-flex items-center px-4 py-2 text-gray-500">
                        <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-gray-400 mr-2"></div>
                        Đang tải thêm ảnh... ({visibleImages.size}/{galleryImages.length})
                    </div>
                </div>
            )}
        </div>
    );
};

export default SectionMansory;