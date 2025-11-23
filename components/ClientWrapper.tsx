"use client";

import { useEffect, useState } from "react";
// import { initSmoothScroll } from "@/lib/animations"; // Disabled to prevent reload

interface ClientWrapperProps {
  children: React.ReactNode;
}

// Detect in-app browsers that might cause issues
const detectInAppBrowser = () => {
  if (typeof window === 'undefined') return false;
  
  const userAgent = navigator.userAgent.toLowerCase();
  return (
    userAgent.includes('facebook') ||
    userAgent.includes('instagram') ||
    userAgent.includes('line') ||
    userAgent.includes('messenger') ||
    userAgent.includes('zalo') ||
    userAgent.includes('wechat') ||
    userAgent.includes('whatsapp') ||
    userAgent.includes('tiktok') ||
    userAgent.includes('twitter')
  );
};

export default function ClientWrapper({ children }: ClientWrapperProps) {
  const [isInAppBrowser, setIsInAppBrowser] = useState(false);
  
  useEffect(() => {
    setIsInAppBrowser(detectInAppBrowser());
    console.log('Browser type:', isInAppBrowser ? 'In-app browser' : 'Regular browser');
  }, []);

  // Disable all scroll effects to prevent reload issues
  // useEffect(() => {
  //   // Skip smooth scroll for in-app browsers to prevent reload issues
  //   if (isInAppBrowser) {
  //     console.log('In-app browser detected, skipping smooth scroll');
  //     return;
  //   }

  //   // Initialize Lenis smooth scroll only for regular browsers
  //   const cleanup = initSmoothScroll();
  //   return cleanup;
  // }, [isInAppBrowser]);

  return <>{children}</>;
}