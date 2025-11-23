"use client";

import { useState, useRef, useEffect } from "react";
import Image from "next/image";

export default function Audio() {
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMounted, setIsMounted] = useState(false);
  const audioRef = useRef<HTMLAudioElement>(null);

  // Detect iOS
  const isIOS = typeof window !== 'undefined' && 
    (/iPad|iPhone|iPod/.test(navigator.userAgent) ||
     (navigator.platform === 'MacIntel' && navigator.maxTouchPoints > 1));

  const isInAppBrowser = typeof window !== 'undefined' &&
    /Instagram|FBAN|FBAV|Twitter|Line|Snapchat|LinkedIn|WeChat|QQ|MicroMessenger|WhatsApp|Telegram|TikTok|ByteDance|Musical\.ly/i.test(navigator.userAgent);

  useEffect(() => {
    setIsMounted(true);

    // Skip audio setup on iOS
    if (isIOS) {
      console.log("Audio disabled on iOS to prevent reload");
      return;
    }

    const audio = audioRef.current;
    if (!audio) return;

    const handleEnded = () => setIsPlaying(false);
    audio.addEventListener("ended", handleEnded);

    // NO AUTO-PLAY - User must click to play
    console.log("Audio ready - user must click to play");

    return () => {
      audio.removeEventListener("ended", handleEnded);
    };
  }, []);

  const togglePlay = () => {
    // Disable audio functionality on iOS
    if (isIOS) {
      console.log("Audio disabled on iOS");
      return;
    }

    const audio = audioRef.current;
    if (!audio) return;

    if (isPlaying) {
      audio.pause();
      setIsPlaying(false);
    } else {
      audio.play().catch((error) => {
        console.log("Audio play failed:", error);
      });
      setIsPlaying(true);
    }
  };

  if (!isMounted) return null;

  // Don't render on in-app browsers except iOS (iOS shows disabled state)
  if (isInAppBrowser && !isIOS) {
    return null;
  }

  return (
    <>
      {/* Only render audio element on non-iOS devices */}
      {!isIOS && <audio ref={audioRef} src="/audio/my_love.mp3" loop />}

      <button
        onClick={isIOS ? undefined : togglePlay}
        disabled={isIOS}
        className={`fixed top-[30px] right-4 z-[9999] w-[30px] h-[30px] cursor-pointer transition-all duration-300 ${
          isIOS ? 'opacity-50 cursor-not-allowed' : 'hover:scale-110'
        }`}
        style={{
          position: 'fixed',
          top: '30px',
          right: '16px',
          zIndex: 9999,
          width: '30px',
          height: '30px',
          border: 'none',
          background: 'transparent',
          padding: '0',
        }}
        aria-label={isIOS ? "Audio disabled on iOS" : (isPlaying ? "Pause music" : "Play music")}
      >
        <div className="relative w-full h-full rounded-full overflow-hidden">
          <Image
            src="/images/webp/audio.png"
            alt="Audio control"
            width={30}
            height={30}
            className={`transition-transform duration-1000 bg-gold-950 ${
              !isIOS && isPlaying ? "animate-[spin_2s_linear_infinite]" : ""
            }`}
          />
          {(isIOS || !isPlaying) && (
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="w-full h-[2px] bg-white rotate-45 origin-center" />
            </div>
          )}
        </div>
      </button>
    </>
  );
}