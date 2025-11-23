"use client";

import { useState, useRef, useEffect } from "react";
import Image from "next/image";

export default function Audio() {
  const audioRef = useRef<HTMLAudioElement>(null);
  const [isPlaying, setIsPlaying] = useState(false);

  // Always render audio element to avoid mount/unmount reload
  // Không preload metadata, tránh IAB crash
  // Không loop ngay khi mount
  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    const onPlay = () => setIsPlaying(true);
    const onPause = () => setIsPlaying(false);
    const onEnded = () => setIsPlaying(false);

    audio.addEventListener("play", onPlay);
    audio.addEventListener("pause", onPause);
    audio.addEventListener("ended", onEnded);

    return () => {
      audio.removeEventListener("play", onPlay);
      audio.removeEventListener("pause", onPause);
      audio.removeEventListener("ended", onEnded);
    };
  }, []);

  const togglePlay = () => {
    const audio = audioRef.current;
    if (!audio) return;

    if (isPlaying) {
      audio.pause();
    } else {
      // Chỉ play khi user click → IAB không crash
      audio.play().catch((err) => {
        console.warn("Play failed:", err);
      });
    }
  };

  return (
    <>
      {/* Always rendered audio (no conditional, no preload) */}
      <audio
        ref={audioRef}
        src="/audio/my_love.mp3"
        playsInline
        loop
      />

      <button
        onClick={togglePlay}
        className={`fixed top-[30px] right-4 z-[9999] w-[30px] h-[30px] cursor-pointer transition-all duration-300 ${isPlaying
            ? "hover:scale-110 active:scale-95"
            : "hover:scale-110 active:scale-95"
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
            className={`transition-transform duration-1000 bg-gold-950 ${isPlaying ? "animate-[spin_2s_linear_infinite]" : ""
              }`}
            loading="eager"
            priority
          />

          {!isPlaying && (
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="w-full h-[2px] bg-white rotate-45 origin-center" />
            </div>
          )}
        </div>
      </button>
    </>
  );
}
