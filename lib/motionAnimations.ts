"use client";

import { useEffect, useRef } from "react";
import { motion, useInView, useAnimation } from "framer-motion";

// Optimized hook - reduced complexity và tăng performance
export const useScrollAnimation = (
  direction: "left" | "right" | "up" | "down" = "up",
  delay = 0
) => {
  const controls = useAnimation();
  const ref = useRef(null);
  const inView = useInView(ref, {
    once: true,
    margin: "-20%", // Optimized margin
    amount: 0.2, // Reduced threshold
  });

  useEffect(() => {
    if (inView) {
      controls.start("visible");
    }
  }, [controls, inView]);

  const variants = {
    hidden: {
      opacity: 0,
      x: direction === "left" ? -30 : direction === "right" ? 30 : 0, // Reduced movement
      y: direction === "up" ? 30 : direction === "down" ? -30 : 0, // Reduced movement
    },
    visible: {
      opacity: 1,
      x: 0,
      y: 0,
      transition: {
        duration: 0.4, // Faster animation
        delay: delay,
        ease: "easeOut",
      },
    },
  };

  return { ref, controls, variants };
};

// Optimized animation variants - faster và smoother
export const fadeInLeft = {
  hidden: { opacity: 0, x: -20 }, // Reduced movement
  visible: {
    opacity: 1,
    x: 0,
    transition: {
      duration: 0.4, // Faster animation
      ease: "easeOut",
    },
  },
};

export const fadeInRight = {
  hidden: { opacity: 0, x: 20 }, // Reduced movement
  visible: {
    opacity: 1,
    x: 0,
    transition: {
      duration: 0.4, // Faster animation
      ease: "easeOut",
    },
  },
};

export const fadeInUp = {
  hidden: { opacity: 0, y: 20 }, // Reduced movement
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.4,
      ease: "easeOut",
    },
  },
};

export const fadeInDown = {
  hidden: { opacity: 0, y: -20 }, // Reduced movement
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.4,
      ease: "easeOut",
    },
  },
};

// Simplified image animation - no scale to improve performance
export const imageAnimation = {
  hidden: { opacity: 0, y: 30 }, // Removed scale
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.5, // Faster animation
      ease: "easeOut",
    },
  },
};

// Simplified container animation
export const containerAnimation = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1, // Reduced stagger
    },
  },
};

// Simplified text animation
export const textAnimation = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      duration: 0.3, // Faster animation
      ease: "easeInOut",
    },
  },
};
