"use client";

import { motion } from "framer-motion";
import React from "react";

interface MotionWrapperProps {
  children: React.ReactNode;
  className?: string;
  variants?: any;
  initial?: string;
  whileInView?: string;
  viewport?: any;
  [key: string]: any;
}

export function MotionDiv({ children, ...props }: MotionWrapperProps) {
  return <motion.div {...props}>{children}</motion.div>;
}

export function MotionSpan({ children, ...props }: MotionWrapperProps) {
  return <motion.span {...props}>{children}</motion.span>;
}

export default MotionDiv;