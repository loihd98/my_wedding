"use client";

import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import React from "react";

gsap.registerPlugin(ScrollTrigger);

export default function Hero() {
  const heroRef = useRef<HTMLDivElement>(null);
  const parallaxRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const audioRef = useRef<HTMLAudioElement>(null);
  const [isAudioPlaying, setIsAudioPlaying] = useState(false);
  const [isVideoMuted, setIsVideoMuted] = useState(true);

  useEffect(() => {
    if (!heroRef.current || !parallaxRef.current) return;

    // Parallax effect
    gsap.to(parallaxRef.current, {
      yPercent: 50,
      ease: "none",
      scrollTrigger: {
        trigger: heroRef.current,
        start: "top top",
        end: "bottom top",
        scrub: true,
      },
    });
  }, []);

  // Countdown to wedding date (June 15, 2026)
  const getTimeUntilWedding = () => {
    const weddingDate = new Date("2026-06-15T14:00:00+07:00").getTime();
    const now = new Date().getTime();
    const distance = weddingDate - now;

    const days = Math.floor(distance / (1000 * 60 * 60 * 24));
    const hours = Math.floor(
      (distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
    );
    const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((distance % (1000 * 60)) / 1000);

    return { days, hours, minutes, seconds };
  };

  const [countdown, setCountdown] = React.useState(getTimeUntilWedding());

  useEffect(() => {
    const interval = setInterval(() => {
      setCountdown(getTimeUntilWedding());
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  // Toggle audio playback
  const toggleAudio = () => {
    if (audioRef.current) {
      if (isAudioPlaying) {
        audioRef.current.pause();
      } else {
        audioRef.current.play();
      }
      setIsAudioPlaying(!isAudioPlaying);
    }
  };

  // Toggle video mute
  const toggleVideoMute = () => {
    if (videoRef.current) {
      videoRef.current.muted = !isVideoMuted;
      setIsVideoMuted(!isVideoMuted);
    }
  };

  return (
    <section
      ref={heroRef}
      className="relative h-screen w-full overflow-hidden flex items-center justify-center"
      id="home"
    >
      {/* Background Video */}
      <div
        ref={parallaxRef}
        className="absolute inset-0 -z-10"
        style={{ willChange: "transform" }}
      >
        <video
          ref={videoRef}
          autoPlay
          loop
          muted={isVideoMuted}
          playsInline
          className="absolute inset-0 w-full h-full object-cover"
        >
          <source src="/videos/wedding-bg.mp4" type="video/mp4" />
          <source src="/videos/wedding-bg.webm" type="video/webm" />
        </video>
        
        {/* Fallback background image */}
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{
            backgroundImage: "url(/images/hero-bg.jpg)",
          }}
        />
        
        <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-black/20 to-black/50" />
      </div>

      {/* Background Audio */}
      <audio ref={audioRef} loop>
        <source src="/audio/wedding-song.mp3" type="audio/mpeg" />
        <source src="/audio/wedding-song.ogg" type="audio/ogg" />
      </audio>

      {/* Audio Control Button */}
      <motion.button
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5 }}
        onClick={toggleAudio}
        className="fixed top-6 right-6 z-50 bg-white/10 backdrop-blur-md hover:bg-white/20 p-3 rounded-full transition-all duration-300 group"
        aria-label={isAudioPlaying ? "Pause music" : "Play music"}
      >
        {isAudioPlaying ? (
          <svg className="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 24 24">
            <path d="M6 4h4v16H6V4zm8 0h4v16h-4V4z" />
          </svg>
        ) : (
          <svg className="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 24 24">
            <path d="M8 5v14l11-7z" />
          </svg>
        )}
      </motion.button>

      {/* Video Mute Toggle Button */}
      <motion.button
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5 }}
        onClick={toggleVideoMute}
        className="fixed top-6 right-20 z-50 bg-white/10 backdrop-blur-md hover:bg-white/20 p-3 rounded-full transition-all duration-300"
        aria-label={isVideoMuted ? "Unmute video" : "Mute video"}
      >
        {isVideoMuted ? (
          <svg className="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 24 24">
            <path d="M16.5 12c0-1.77-1.02-3.29-2.5-4.03v2.21l2.45 2.45c.03-.2.05-.41.05-.63zm2.5 0c0 .94-.2 1.82-.54 2.64l1.51 1.51C20.63 14.91 21 13.5 21 12c0-4.28-2.99-7.86-7-8.77v2.06c2.89.86 5 3.54 5 6.71zM4.27 3L3 4.27 7.73 9H3v6h4l5 5v-6.73l4.25 4.25c-.67.52-1.42.93-2.25 1.18v2.06c1.38-.31 2.63-.95 3.69-1.81L19.73 21 21 19.73l-9-9L4.27 3zM12 4L9.91 6.09 12 8.18V4z"/>
          </svg>
        ) : (
          <svg className="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 24 24">
            <path d="M3 9v6h4l5 5V4L7 9H3zm13.5 3c0-1.77-1.02-3.29-2.5-4.03v8.05c1.48-.73 2.5-2.25 2.5-4.02zM14 3.23v2.06c2.89.86 5 3.54 5 6.71s-2.11 5.85-5 6.71v2.06c4.01-.91 7-4.49 7-8.77s-2.99-7.86-7-8.77z"/>
          </svg>
        )}
      </motion.button>

      {/* Content */}
      <div className="relative z-10 text-center text-white px-4">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.3 }}
        >
          <h2 className="font-belinda text-3xl md:text-5xl mb-4 text-gold-300">
            We&apos;re Getting Married
          </h2>
          <h1 className="font-madam-ghea text-5xl md:text-7xl lg:text-8xl font-bold mb-6">
            Loi <span className="text-gold-300">&</span> Hang
          </h1>
          <p className="font-quicksand text-xl md:text-2xl mb-8 font-light">June 15, 2026</p>
        </motion.div>

        {/* Countdown */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="flex justify-center gap-4 md:gap-8 mb-12"
        >
          {[
            { value: countdown.days, label: "Days" },
            { value: countdown.hours, label: "Hours" },
            { value: countdown.minutes, label: "Minutes" },
            { value: countdown.seconds, label: "Seconds" },
          ].map((item, index) => (
            <div
              key={index}
              className="bg-white/10 backdrop-blur-md rounded-lg p-4 md:p-6 min-w-[70px] md:min-w-[100px]"
            >
              <div className="text-3xl md:text-4xl font-bold text-gold-300">
                {item.value.toString().padStart(2, "0")}
              </div>
              <div className="text-xs md:text-sm uppercase tracking-wider mt-1">
                {item.label}
              </div>
            </div>
          ))}
        </motion.div>

        {/* Scroll Indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 1.2 }}
          className="animate-float"
        >
          <div className="flex flex-col items-center">
            <span className="text-sm uppercase tracking-widest mb-2">
              Scroll Down
            </span>
            <svg
              className="w-6 h-6"
              fill="none"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path d="M19 14l-7 7m0 0l-7-7m7 7V3"></path>
            </svg>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
