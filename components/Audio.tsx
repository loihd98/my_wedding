"use client";

import { useState, useRef, useEffect, useCallback } from "react";
import Image from "next/image";

export default function Audio() {
  const audioRef = useRef<HTMLAudioElement>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isInAppBrowser, setIsInAppBrowser] = useState(false);
  const [isAudioSupported, setIsAudioSupported] = useState(true);
  const [userInteracted, setUserInteracted] = useState(false);

  // FIXED: Correct in-app browser detection
  useEffect(() => {
    if (typeof window === 'undefined') return;
    
    const userAgent = navigator.userAgent.toLowerCase();
    
    // Check for specific in-app browser signatures
    const isIAB = (
      // Facebook apps
      userAgent.includes('fban') ||        // Facebook App
      userAgent.includes('fbav') ||        // Facebook App Version
      userAgent.includes('facebook') ||
      // Instagram
      userAgent.includes('instagram') ||
      // LINE
      userAgent.includes('line') ||
      // Messenger
      userAgent.includes('messenger') ||
      // Zalo
      userAgent.includes('zalo') ||
      // Twitter
      userAgent.includes('twitter') ||
      // TikTok
      userAgent.includes('tiktok') ||
      // WeChat
      userAgent.includes('micromessenger') ||
      // Telegram
      userAgent.includes('telegram') ||
      // LinkedIn
      userAgent.includes('linkedinapp') ||
      // Specific iOS in-app browser patterns (NOT regular Safari)
      (userAgent.includes('mobile') && 
       (userAgent.includes('fban') || userAgent.includes('fbav') || userAgent.includes('instagram')))
    );
    
    // Additional check: if it's regular Safari, it should NOT be detected as IAB
    const isRegularSafari = (
      userAgent.includes('safari') && 
      userAgent.includes('mobile') &&
      !userAgent.includes('chrome') &&
      !userAgent.includes('crios') &&
      !userAgent.includes('fban') &&
      !userAgent.includes('fbav') &&
      !userAgent.includes('instagram') &&
      !userAgent.includes('line') &&
      !userAgent.includes('messenger')
    );
    
    setIsInAppBrowser(isIAB && !isRegularSafari);
    
    // Debug logging
    console.log('🔍 Browser Detection:', {
      userAgent: userAgent,
      isIAB: isIAB,
      isRegularSafari: isRegularSafari,
      finalResult: isIAB && !isRegularSafari
    });
    
    if (isIAB && !isRegularSafari) {
      console.log('🚨 In-app browser detected - Audio features limited for stability');
    } else {
      console.log('✅ Regular browser detected - Audio features enabled');
    }
  }, []);

  // Safe audio setup for in-app browsers
  useEffect(() => {
    const audio = audioRef.current;
    if (!audio || isInAppBrowser) return;

    // Test audio support
    const testAudioSupport = () => {
      try {
        const canPlay = audio.canPlayType('audio/mpeg');
        if (canPlay === '') {
          setIsAudioSupported(false);
          console.warn('MP3 not supported');
        }
      } catch (error) {
        setIsAudioSupported(false);
        console.warn('Audio not supported:', error);
      }
    };

    testAudioSupport();

    // Passive event listeners only
    const handlePlay = () => {
      setIsPlaying(true);
    };

    const handlePause = () => {
      setIsPlaying(false);
    };

    const handleEnded = () => {
      setIsPlaying(false);
    };

    const handleError = (e: Event) => {
      console.error('Audio error:', e);
      setIsPlaying(false);
      setIsAudioSupported(false);
    };

    // Add passive listeners
    audio.addEventListener("play", handlePlay, { passive: true });
    audio.addEventListener("pause", handlePause, { passive: true });
    audio.addEventListener("ended", handleEnded, { passive: true });
    audio.addEventListener("error", handleError, { passive: true });

    return () => {
      // Safe cleanup
      try {
        audio.removeEventListener("play", handlePlay);
        audio.removeEventListener("pause", handlePause);
        audio.removeEventListener("ended", handleEnded);
        audio.removeEventListener("error", handleError);
      } catch (error) {
        console.warn('Audio cleanup error:', error);
      }
    };
  }, [isInAppBrowser]);

  const togglePlay = useCallback(async () => {
    if (isInAppBrowser) {
      // For in-app browsers, just show a message
      alert('🎵 Để nghe nhạc, vui lòng mở trong trình duyệt Safari hoặc Chrome');
      return;
    }

    const audio = audioRef.current;
    if (!audio || !isAudioSupported) {
      console.warn('Audio not available');
      return;
    }

    // Mark user interaction
    setUserInteracted(true);

    try {
      if (isPlaying) {
        audio.pause();
      } else {
        // Reset audio to beginning for better UX
        audio.currentTime = 0;
        await audio.play();
      }
    } catch (error) {
      console.error('Audio play/pause error:', error);
      
      // Fallback: try to reset audio element
      if (audio.src) {
        audio.load();
      }
      
      setIsPlaying(false);
      setIsAudioSupported(false);
    }
  }, [isPlaying, isInAppBrowser, isAudioSupported]);

  // Don't render audio element in problematic browsers
  const shouldRenderAudio = !isInAppBrowser && isAudioSupported;

  return (
    <>
      {/* Conditionally render audio element */}
      {shouldRenderAudio && (
        <audio
          ref={audioRef}
          preload="none"  // Don't preload in any browser
          playsInline
          loop={userInteracted}  // Only loop after user interaction
          muted={false}
          crossOrigin="anonymous"
          style={{ display: 'none' }}
        >
          <source src="/audio/my_love.mp3" type="audio/mpeg" />
          <source src="/audio/my_love.ogg" type="audio/ogg" />
          Your browser does not support audio.
        </audio>
      )}

      <button
        onClick={togglePlay}
        className={`fixed top-[30px] right-4 z-[9999] w-[30px] h-[30px] cursor-pointer transition-all duration-300 ${
          isPlaying
            ? "hover:scale-110 active:scale-95"
            : "hover:scale-110 active:scale-95"
        } ${isInAppBrowser ? "opacity-60" : ""}`}
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
        aria-label={
          isInAppBrowser 
            ? "Open in browser to play music"
            : (isPlaying ? "Pause music" : "Play music")
        }
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

          {/* Show appropriate overlay */}
          {(!isPlaying || isInAppBrowser) && (
            <div className="absolute inset-0 flex items-center justify-center">
              {isInAppBrowser ? (
                // Show warning icon for in-app browsers
                <div className="text-white text-[8px] font-bold">!</div>
              ) : (
                // Show pause line for regular browsers
                <div className="w-full h-[2px] bg-white rotate-45 origin-center" />
              )}
            </div>
          )}
        </div>
      </button>

      {/* Optional: Show toast message for in-app browser users */}
      {isInAppBrowser && userInteracted && (
        <div className="fixed bottom-4 left-4 right-4 bg-black/80 text-white p-3 rounded-lg text-sm z-[9998]">
          🎵 Để trải nghiệm âm thanh tốt nhất, vui lòng mở trang này trong Safari hoặc Chrome
        </div>
      )}
    </>
  );
}
