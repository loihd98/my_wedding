"use client";

import { useState, useRef, useEffect } from "react";
import Image from "next/image";
import { createPortal } from "react-dom";

export default function Audio() {
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMounted, setIsMounted] = useState(false);
  const audioRef = useRef<HTMLAudioElement>(null);

  useEffect(() => {
    setIsMounted(true);

    // Detect in-app browser
    const isInAppBrowser = typeof window !== 'undefined' && (
      navigator.userAgent.toLowerCase().includes('facebook') ||
      navigator.userAgent.toLowerCase().includes('instagram') ||
      navigator.userAgent.toLowerCase().includes('line') ||
      navigator.userAgent.toLowerCase().includes('messenger') ||
      navigator.userAgent.toLowerCase().includes('zalo')
    );

    const audio = audioRef.current;
    if (!audio) return;

    const handleEnded = () => setIsPlaying(false);
    audio.addEventListener("ended", handleEnded);

    // Auto-play audio when component mounts (skip for in-app browsers)
    if (!isInAppBrowser) {
      const playAudio = async () => {
        try {
          await audio.play();
          setIsPlaying(true);
        } catch (error) {
          // Auto-play might be blocked by browser policy
          console.log("Auto-play was prevented by browser policy");
        }
      };

      // Add delay for in-app browsers
      const timer = setTimeout(playAudio, 1000);

      return () => {
        clearTimeout(timer);
        audio.removeEventListener("ended", handleEnded);
      };
    } else {
      console.log('In-app browser detected, skipping auto-play');
    }

    return () => {
      audio.removeEventListener("ended", handleEnded);
    };
  }, []);

  const togglePlay = () => {
    const audio = audioRef.current;
    if (!audio) return;

    if (isPlaying) {
      audio.pause();
      setIsPlaying(false);
    } else {
      audio.play();
      setIsPlaying(true);
    }
  };

  const audioButton = (
    <button
      onClick={togglePlay}
      className="audio-button"
      style={{
        position: 'fixed',
        top: '30px',
        right: '16px',
        zIndex: 2147483647, // Maximum z-index value
        width: '30px',
        height: '30px',
        cursor: 'pointer',
        transition: 'all 0.3s ease',
        transform: 'none',
        border: 'none',
        background: 'transparent',
        padding: '0',
        margin: '0',
        isolation: 'isolate', // Create new stacking context
      }}
      aria-label={isPlaying ? "Pause music" : "Play music"}
      onMouseEnter={(e) => e.currentTarget.style.transform = 'scale(1.1)'}
      onMouseLeave={(e) => e.currentTarget.style.transform = 'scale(1)'}
    >
      <div className="relative w-full h-full rounded-full overflow-hidden">
        <Image
          src="/images/audio.png"
          alt="Audio control"
          width={30}
          height={30}
          className={`transition-transform duration-1000 bg-gold-950 ${isPlaying ? "animate-[spin_2s_linear_infinite]" : ""
            }`}
        />
        {!isPlaying && (
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="w-full h-[2px] bg-white rotate-45 origin-center" />
          </div>
        )}
      </div>
    </button>
  );

  return (
    <>
      <audio ref={audioRef} src="/audio/audio.mp3" loop />
      {isMounted && createPortal(audioButton, document.body)}
    </>
  );
}
