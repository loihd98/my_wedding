"use client";

import { useState, useRef, useEffect, useCallback } from "react";
import Image from "next/image";

export default function Audio() {
  const audioRef = useRef<HTMLAudioElement>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isAudioSupported, setIsAudioSupported] = useState(true);
  const [userInteracted, setUserInteracted] = useState(false);
  const isInAppBrowserRef = useRef(false);
  const detectionDoneRef = useRef(false);

  // Detect IAB
  useEffect(() => {
    if (typeof window === 'undefined' || detectionDoneRef.current) return;
    detectionDoneRef.current = true;

    const userAgent = navigator.userAgent.toLowerCase();
    const isIAB = (
      userAgent.includes('fban') ||
      userAgent.includes('fbav') ||
      userAgent.includes('instagram') ||
      userAgent.includes('line') ||
      userAgent.includes('messenger') ||
      userAgent.includes('zalo') ||
      userAgent.includes('tiktok') ||
      userAgent.includes('micromessenger')
    );

    isInAppBrowserRef.current = isIAB;
    console.log(isIAB ? '🚨 IAB detected' : '✅ Regular browser');
  }, []);

  // Audio setup
  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    const handlePlay = () => setIsPlaying(true);
    const handlePause = () => setIsPlaying(false);
    const handleEnded = () => setIsPlaying(false);
    const handleError = (e: Event) => {
      console.error('Audio error:', e);
      setIsPlaying(false);
      // Don't set unsupported immediately in IAB
      if (!isInAppBrowserRef.current) {
        setIsAudioSupported(false);
      }
    };

    audio.addEventListener("play", handlePlay, { passive: true });
    audio.addEventListener("pause", handlePause, { passive: true });
    audio.addEventListener("ended", handleEnded, { passive: true });
    audio.addEventListener("error", handleError, { passive: true });

    return () => {
      audio.removeEventListener("play", handlePlay);
      audio.removeEventListener("pause", handlePause);
      audio.removeEventListener("ended", handleEnded);
      audio.removeEventListener("error", handleError);
    };
  }, []);

  // Toggle play with IAB support
  const togglePlay = useCallback(async () => {
    const audio = audioRef.current;
    if (!audio || !isAudioSupported) return;

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

        // ✅ IAB workaround: load audio first
        if (isInAppBrowserRef.current) {
          audio.load(); // Force reload in IAB

          // Wait a bit for IAB to prepare
          await new Promise(resolve => setTimeout(resolve, 100));
        }

        audio.currentTime = 0;

        // Try to play
        const playPromise = audio.play();

        if (playPromise !== undefined) {
          await playPromise;
          setIsPlaying(true);
        } else {
          // Fallback for old browsers
          setIsPlaying(true);
        }
      }
    } catch (error: any) {
      console.error('Play error:', error);

      // ✅ IAB retry strategy
      if (isInAppBrowserRef.current && error.name === 'NotAllowedError') {
        console.log('IAB autoplay blocked, will play on next interaction');
        // Don't set playing to false, let user try again
      } else {
        setIsPlaying(false);
      }
    }
  }, [isPlaying, isAudioSupported, userInteracted]);

  // ✅ Auto-play attempt for IAB (some IABs allow after user interaction)
  useEffect(() => {
    if (!userInteracted || !isInAppBrowserRef.current) return;

    const audio = audioRef.current;
    if (!audio || isPlaying) return;

    // Try silent play first (some IABs allow this)
    const attemptPlay = async () => {
      try {
        audio.muted = true;
        await audio.play();
        audio.muted = false;
        setIsPlaying(true);
      } catch (err) {
        console.log('Silent play failed, user must click play button');
      }
    };

    const timer = setTimeout(attemptPlay, 500);
    return () => clearTimeout(timer);
  }, [userInteracted, isPlaying]);

  return (
    <>
      {/* Audio element - always render */}
      {isAudioSupported && (
        <audio
          ref={audioRef}
          preload="auto"
          playsInline
          webkit-playsinline="true"
          x-webkit-airplay="allow"
          style={{ display: 'none' }}
        >
          <source src="/audio/my_love.mp3" type="audio/mpeg" />
          <source src="/audio/my_love.mp3" type="audio/mp3" />
        </audio>
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
    </>
  );
}