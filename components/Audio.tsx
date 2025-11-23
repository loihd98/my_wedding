"use client";

import { useState, useRef, useEffect, useCallback } from "react";
import Image from "next/image";

export default function Audio() {
  const audioRef = useRef<HTMLAudioElement>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isAudioSupported, setIsAudioSupported] = useState(true);
  const [userInteracted, setUserInteracted] = useState(false);

  // ✅ FIX 1: useRef thay vì useState để tránh re-render
  const isInAppBrowserRef = useRef(false);
  const [showIABWarning, setShowIABWarning] = useState(false);
  const detectionDoneRef = useRef(false);

  // ✅ FIX 2: Detection chỉ chạy 1 lần duy nhất
  useEffect(() => {
    if (typeof window === 'undefined' || detectionDoneRef.current) return;

    detectionDoneRef.current = true;

    const userAgent = navigator.userAgent.toLowerCase();

    // Simple check: if contains any of these keywords = IAB
    const isIAB = (
      userAgent.includes('fban') ||        // Facebook
      userAgent.includes('fbav') ||        // Facebook
      userAgent.includes('instagram') ||   // Instagram
      userAgent.includes('line') ||        // LINE
      userAgent.includes('messenger') ||   // Messenger
      userAgent.includes('zalo') ||        // Zalo
      userAgent.includes('tiktok') ||      // TikTok
      userAgent.includes('micromessenger') // WeChat
    );

    isInAppBrowserRef.current = isIAB;

    // Debug log
    if (isIAB) {
      console.log('🚨 In-App Browser detected:', userAgent);
    } else {
      console.log('✅ Regular Browser');
    }
  }, []); // Chỉ chạy 1 lần

  // ✅ FIX 3: Safe audio setup với proper cleanup
  useEffect(() => {
    const audio = audioRef.current;
    if (!audio || isInAppBrowserRef.current) return;

    const handlePlay = () => setIsPlaying(true);
    const handlePause = () => setIsPlaying(false);
    const handleEnded = () => setIsPlaying(false);
    const handleError = (e: Event) => {
      console.error('Audio error:', e);
      setIsPlaying(false);
      setIsAudioSupported(false);
    };

    // Passive listeners for better performance
    audio.addEventListener("play", handlePlay, { passive: true });
    audio.addEventListener("pause", handlePause, { passive: true });
    audio.addEventListener("ended", handleEnded, { passive: true });
    audio.addEventListener("error", handleError, { passive: true });

    return () => {
      // Safe cleanup
      audio.removeEventListener("play", handlePlay);
      audio.removeEventListener("pause", handlePause);
      audio.removeEventListener("ended", handleEnded);
      audio.removeEventListener("error", handleError);
    };
  }, []); // ✅ Empty deps - chỉ setup 1 lần

  // ✅ FIX 4: Optimized toggle với debounce
  const togglePlay = useCallback(async () => {
    // IAB = không phát nhạc
    if (isInAppBrowserRef.current) {
      setShowIABWarning(true);
      setTimeout(() => setShowIABWarning(false), 3000);
      return;
    }

    const audio = audioRef.current;
    if (!audio || !isAudioSupported) return;

    // Prevent rapid clicks
    if (audio.paused === isPlaying) return;

    try {
      if (isPlaying) {
        audio.pause();
        setIsPlaying(false);
      } else {
        // Set loop before playing
        if (!userInteracted) {
          audio.loop = true;
          setUserInteracted(true);
        }

        audio.currentTime = 0;
        const playPromise = audio.play();

        if (playPromise !== undefined) {
          await playPromise;
          setIsPlaying(true);
        }
      }
    } catch (error) {
      console.error('Play error:', error);
      setIsPlaying(false);
      setIsAudioSupported(false);
    }
  }, [isPlaying, isAudioSupported, userInteracted]);

  return (
    <>
      {/* ✅ FIX 5: Audio element render chỉ phụ thuộc vào isAudioSupported */}
      {isAudioSupported && (
        <audio
          ref={audioRef}
          preload="none"
          playsInline
          style={{ display: 'none' }}
        >
          <source src="/audio/my_love.mp3" type="audio/mpeg" />
        </audio>
      )}

      {/* ✅ FIX 6: Warning toast */}
      {showIABWarning && (
        <div
          className="fixed top-20 left-1/2 -translate-x-1/2 z-[10000] bg-black/90 text-white px-4 py-2 rounded-lg text-sm animate-fade-in"
          style={{
            animation: 'fadeIn 0.3s ease-in-out',
          }}
        >
          🎵 Vui lòng mở trong Safari/Chrome để nghe nhạc
        </div>
      )}

      {/* Audio button */}
      <button
        onClick={togglePlay}
        className="fixed top-[30px] right-4 z-[9999] w-[30px] h-[30px] cursor-pointer transition-all duration-300 hover:scale-110 active:scale-95"
        style={{
          position: "fixed",
          top: "30px",
          right: "16px",
          zIndex: 9999,
          width: "30px",
          height: "30px",
          border: "none",
          background: "transparent",
          padding: "0",
          touchAction: "manipulation",
          WebkitTapHighlightColor: "transparent",
        }}
        aria-label={isPlaying ? "Pause music" : "Play music"}
        type="button"
      >
        <div className="relative w-full h-full rounded-full overflow-hidden">
          <Image
            src="/images/webp/audio.png"
            alt="Audio control"
            width={30}
            height={30}
            className={`transition-transform duration-1000 bg-gold-950 ${isPlaying ? "animate-[spin_2s_linear_infinite]" : ""
              }`}
            loading="eager"
            priority
            unoptimized={false}
          />

          {/* Overlay icon */}
          {!isPlaying && (
            <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
              <div className="w-full h-[2px] bg-white rotate-45 origin-center" />
            </div>
          )}
        </div>
      </button>

      {/* Add fadeIn animation */}
      <style jsx global>{`
        @keyframes fadeIn {
          from {
            opacity: 0;
            transform: translate(-50%, -10px);
          }
          to {
            opacity: 1;
            transform: translate(-50%, 0);
          }
        }
      `}</style>
    </>
  );
}