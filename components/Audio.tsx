"use client";

import { useState, useRef, useEffect, useCallback } from "react";
import Image from "next/image";

export default function Audio() {
  const audioRef = useRef<HTMLAudioElement>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isInAppBrowser, setIsInAppBrowser] = useState(false);
  const [isAudioSupported, setIsAudioSupported] = useState(true);
  const [userInteracted, setUserInteracted] = useState(false);

  // SIMPLIFIED: Single condition IAB detection
  useEffect(() => {
    if (typeof window === 'undefined') return;
    
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
    
    setIsInAppBrowser(isIAB);
    
    // Simple debug
    console.log('Browser:', isIAB ? '🚨 In-App Browser' : '✅ Regular Browser');
  }, []);

  // Safe audio setup
  useEffect(() => {
    const audio = audioRef.current;
    if (!audio || isInAppBrowser) return;

    const handlePlay = () => setIsPlaying(true);
    const handlePause = () => setIsPlaying(false);
    const handleEnded = () => setIsPlaying(false);
    const handleError = () => {
      console.error('Audio error');
      setIsPlaying(false);
      setIsAudioSupported(false);
    };

    audio.addEventListener("play", handlePlay, { passive: true });
    audio.addEventListener("pause", handlePause, { passive: true });
    audio.addEventListener("ended", handleEnded, { passive: true });
    audio.addEventListener("error", handleError, { passive: true });

    return () => {
      try {
        audio.removeEventListener("play", handlePlay);
        audio.removeEventListener("pause", handlePause);
        audio.removeEventListener("ended", handleEnded);
        audio.removeEventListener("error", handleError);
      } catch (error) {
        console.warn('Cleanup error:', error);
      }
    };
  }, [isInAppBrowser]);

  const togglePlay = useCallback(async () => {
    // IAB = không phát nhạc
    if (isInAppBrowser) {
      alert('🎵 Vui lòng mở trong Safari/Chrome để nghe nhạc');
      return;
    }

    const audio = audioRef.current;
    if (!audio || !isAudioSupported) return;

    setUserInteracted(true);

    try {
      if (isPlaying) {
        audio.pause();
      } else {
        audio.currentTime = 0;
        await audio.play();
      }
    } catch (error) {
      console.error('Play error:', error);
      setIsPlaying(false);
    }
  }, [isPlaying, isInAppBrowser, isAudioSupported]);

  return (
    <>
      {/* Audio element - chỉ render nếu không phải IAB */}
      {!isInAppBrowser && isAudioSupported && (
        <audio
          ref={audioRef}
          preload="none"
          playsInline
          loop={userInteracted}
          style={{ display: 'none' }}
        >
          <source src="/audio/my_love.mp3" type="audio/mpeg" />
        </audio>
      )}

      {/* Audio button */}
      <button
        onClick={togglePlay}
        className={`fixed top-[30px] right-4 z-[9999] w-[30px] h-[30px] cursor-pointer transition-all duration-300 hover:scale-110 active:scale-95 ${
          isInAppBrowser ? "opacity-60" : ""
        }`}
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
      >
        <div className="relative w-full h-full rounded-full overflow-hidden">
          <Image
            src="/images/webp/audio.png"
            alt="Audio control"
            width={30}
            height={30}
            className={`transition-transform duration-1000 bg-gold-950 ${
              isPlaying && !isInAppBrowser ? "animate-[spin_2s_linear_infinite]" : ""
            }`}
            loading="eager"
            priority
          />

          {/* Overlay icon */}
          {(!isPlaying || isInAppBrowser) && (
            <div className="absolute inset-0 flex items-center justify-center">
              {isInAppBrowser ? (
                <div className="text-white text-[8px] font-bold">!</div>
              ) : (
                <div className="w-full h-[2px] bg-white rotate-45 origin-center" />
              )}
            </div>
          )}
        </div>
      </button>
    </>
  );
}
