"use client";

import { useEffect, useRef } from "react";
import { motion, useInView, useAnimation } from "framer-motion";

// Hook để tạo animation khi element vào viewport
export const useScrollAnimation = (
  direction: "left" | "right" | "up" | "down" = "up",
  delay = 0
) => {
  const controls = useAnimation();
  const ref = useRef(null);
  const inView = useInView(ref, {
    once: true,
    margin: "-30%", // Increased margin to reduce early triggers
    amount: 0.3, // Only trigger when 30% visible
  });

  useEffect(() => {
    if (inView) {
      controls.start("visible");
    }
  }, [controls, inView]);

  const variants = {
    hidden: {
      opacity: 0,
      x: direction === "left" ? -100 : direction === "right" ? 100 : 0,
      y: direction === "up" ? 50 : direction === "down" ? -50 : 0,
    },
    visible: {
      opacity: 1,
      x: 0,
      y: 0,
      transition: {
        duration: 0.3,
        delay: delay,
        ease: "easeOut",
      },
    },
  };

  return { ref, controls, variants };
};

// Animation variants cho các loại khác nhau
export const fadeInLeft = {
  hidden: { opacity: 0, x: -50 }, // Reduced movement
  visible: {
    opacity: 1,
    x: 0,
    transition: {
      duration: 0.3, // Faster animation
      ease: "easeOut",
    },
  },
};

export const fadeInRight = {
  hidden: { opacity: 0, x: 50 }, // Reduced movement
  visible: {
    opacity: 1,
    x: 0,
    transition: {
      duration: 0.8,
      ease: "easeOut",
    },
  },
};

export const fadeInUp = {
  hidden: { opacity: 0, y: 50 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.8,
      ease: "easeOut",
    },
  },
};

export const fadeInDown = {
  hidden: { opacity: 0, y: -50 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.8,
      ease: "easeOut",
    },
  },
};

// Animation cho ảnh (từ dưới lên)
export const imageAnimation = {
  hidden: { opacity: 0, y: 80, scale: 0.9 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: {
      duration: 1,
      ease: "easeOut",
    },
  },
};

// Animation cho container với stagger children
export const containerAnimation = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.2,
    },
  },
};

// Animation cho text với typewriter effect
export const textAnimation = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      duration: 0.6,
      ease: "easeInOut",
    },
  },
};
