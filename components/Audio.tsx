"use client";

import { useState, useRef, useEffect } from "react";
import Image from "next/image";

export default function Audio() {
  const [isPlaying, setIsPlaying] = useState(false);
  const audioRef = useRef<HTMLAudioElement>(null);

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    const handleEnded = () => setIsPlaying(false);
    audio.addEventListener("ended", handleEnded);

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

  return (
    <>
      <audio ref={audioRef} src="/audio/audio.mp3" loop />

      <button
        onClick={togglePlay}
        className="fixed top-4 right-4 z-50 w-[30px] h-[30px] cursor-pointer transition-all duration-300 hover:scale-110"
        aria-label={isPlaying ? "Pause music" : "Play music"}
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
              <div className="w-full h-[2px] bg-red-500 rotate-45 origin-center" />
            </div>
          )}
        </div>
      </button>
    </>
  );
}
