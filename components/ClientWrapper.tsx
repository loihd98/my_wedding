"use client";

import { useEffect, useState } from "react";
import { preventHashReload, cleanupHashPrevention } from "@/lib/preventHashReload";
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
  const [isIOS, setIsIOS] = useState(false);

  useEffect(() => {
    const inApp = detectInAppBrowser();
    const ios = /iPad|iPhone|iPod/.test(navigator.userAgent) || 
                (navigator.platform === 'MacIntel' && navigator.maxTouchPoints > 1);
    
    setIsInAppBrowser(inApp);
    setIsIOS(ios);
    
    console.log(`Browser detection: iOS=${ios}, InApp=${inApp}`);
    
    // Apply hash reload prevention with delay for iOS
    if (inApp) {
      const delay = ios ? 1000 : 0; // Extra delay for iOS WebKit
      
      const timeoutId = setTimeout(() => {
        try {
          preventHashReload();
          console.log('[ClientWrapper] iOS-safe hash reload prevention applied');
        } catch (error) {
          console.log('[ClientWrapper] Hash reload prevention failed:', error);
        }
      }, delay);
      
      // Cleanup function
      return () => {
        clearTimeout(timeoutId);
        cleanupHashPrevention();
        console.log('[ClientWrapper] Hash prevention cleanup completed');
      };
    }
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