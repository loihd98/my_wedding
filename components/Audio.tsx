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

    // Auto-play audio when component mounts
    const playAudio = async () => {
      try {
        await audio.play();
        setIsPlaying(true);
      } catch (error) {
        // Auto-play might be blocked by browser policy
        console.log("Auto-play was prevented by browser policy");
      }
    };

    playAudio();

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
        className="audio-button"
        style={{ 
          position: 'fixed', 
          top: '30px', 
          right: '16px', 
          zIndex: 99999,
          width: '30px',
          height: '30px',
          cursor: 'pointer',
          transition: 'all 0.3s ease',
          transform: 'none'
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
    </>
  );
}
