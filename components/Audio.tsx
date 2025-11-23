"use client";

import { useEffect, useRef, useState } from 'react';
import Image from 'next/image';

export default function Audio() {
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isLoaded, setIsLoaded] = useState(false);
  const [userInteracted, setUserInteracted] = useState(false);

  // Detect iOS and in-app browsers
  const isIOS = typeof window !== 'undefined' &&
    (/iPad|iPhone|iPod/.test(navigator.userAgent) ||
      (navigator.platform === 'MacIntel' && navigator.maxTouchPoints > 1));

  const isInAppBrowser = typeof window !== 'undefined' &&
    /Instagram|FBAN|FBAV|Twitter|Line|Snapchat|LinkedIn|WeChat|QQ|MicroMessenger|WhatsApp|Telegram|TikTok|ByteDance|Musical\.ly/i.test(navigator.userAgent);

  useEffect(() => {
    // Only initialize audio if not in problematic environments
    if (isIOS || isInAppBrowser) {
      console.log("[Audio] Skipping audio initialization on iOS/InApp browser");
      return;
    }

    // Create audio element safely
    try {
      const audio = document.createElement('audio');
      audio.src = '/audio/my_love.mp3';
      audio.loop = true;
      audio.volume = 0.3;
      audio.preload = 'metadata'; // Don't preload on iOS

      // Safe event listeners
      const handleCanPlay = () => {
        setIsLoaded(true);
        console.log("[Audio] Audio loaded and ready");
      };

      const handleError = (e: any) => {
        console.log("[Audio] Load error:", e);
        setIsLoaded(false);
      };

      const handlePlay = () => setIsPlaying(true);
      const handlePause = () => setIsPlaying(false);

      audio.addEventListener('canplaythrough', handleCanPlay);
      audio.addEventListener('error', handleError);
      audio.addEventListener('play', handlePlay);
      audio.addEventListener('pause', handlePause);

      audioRef.current = audio;

      return () => {
        if (audioRef.current) {
          audioRef.current.pause();
          audioRef.current.removeEventListener('canplaythrough', handleCanPlay);
          audioRef.current.removeEventListener('error', handleError);
          audioRef.current.removeEventListener('play', handlePlay);
          audioRef.current.removeEventListener('pause', handlePause);
          audioRef.current = null;
        }
      };
    } catch (error) {
      console.log("[Audio] Initialization failed:", error);
    }
  }, []);

  // Handle user interaction requirement
  useEffect(() => {
    const handleFirstInteraction = () => {
      setUserInteracted(true);
      // Try to play audio after first user interaction
      if (audioRef.current && isLoaded && !isIOS && !isInAppBrowser) {
        const playPromise = audioRef.current.play();
        if (playPromise !== undefined) {
          playPromise
            .then(() => {
              console.log("[Audio] Auto-play started after user interaction");
            })
            .catch((error) => {
              console.log("[Audio] Auto-play failed:", error);
            });
        }
      }

      // Remove listeners after first interaction
      document.removeEventListener('click', handleFirstInteraction);
      document.removeEventListener('touchstart', handleFirstInteraction);
    };

    document.addEventListener('click', handleFirstInteraction, { once: true });
    document.addEventListener('touchstart', handleFirstInteraction, { once: true });

    return () => {
      document.removeEventListener('click', handleFirstInteraction);
      document.removeEventListener('touchstart', handleFirstInteraction);
    };
  }, [isLoaded]);

  const toggleAudio = () => {
    if (!audioRef.current || isIOS || isInAppBrowser) return;

    try {
      if (isPlaying) {
        audioRef.current.pause();
      } else {
        const playPromise = audioRef.current.play();
        if (playPromise !== undefined) {
          playPromise.catch((error) => {
            console.log("[Audio] Manual play failed:", error);
          });
        }
      }
    } catch (error) {
      console.log("[Audio] Toggle failed:", error);
    }
  };

  // Don't render anything on iOS or in-app browsers
  if (isIOS || isInAppBrowser) {
    return null;
  }

  // Don't render control until loaded and user has interacted
  if (!isLoaded || !userInteracted) {
    return null;
  }

  return (
    <button
      onClick={toggleAudio}
      className="fixed top-[30px] right-4 z-[9999] w-[30px] h-[30px] cursor-pointer transition-all duration-300 hover:scale-110"
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
      aria-label={isPlaying ? "Pause music" : "Play music"}
    >
      <div className="relative w-full h-full rounded-full overflow-hidden">
        <Image
          src="/images/webp/audio.png"
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
}