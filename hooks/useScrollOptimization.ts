import { useEffect } from "react";

export const useScrollOptimization = () => {
  useEffect(() => {
    // Detect environment
    const isInAppBrowser =
      /Instagram|FBAN|FBAV|Twitter|Line|Snapchat|LinkedIn|WeChat|QQ|MicroMessenger|WhatsApp|Telegram|TikTok|ByteDance|Musical\.ly|Zalo/i.test(
        navigator.userAgent
      );
    const isMobile =
      /Android|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(
        navigator.userAgent
      );

    if (!isInAppBrowser && !isMobile) return;

    console.log("📱 Mobile scroll optimization active");

    // Add CSS để tối ưu scroll
    const style = document.createElement("style");
    style.textContent = `
      html {
        overflow: auto !important;
        overflow-x: hidden;
        -webkit-overflow-scrolling: touch;
        scroll-behavior: auto;
        height: auto;
      }
      
      body {
        overflow: auto !important;
        overflow-x: hidden;
        -webkit-overflow-scrolling: touch;
        position: relative !important;
        min-height: 100vh;
        min-height: 100dvh;
        height: auto;
        touch-action: pan-y;
      }
      
      * {
        -webkit-overflow-scrolling: touch;
        -webkit-transform: translate3d(0,0,0);
      }
      
      /* Mobile-specific optimizations */
      @media screen and (max-width: 768px) {
        html, body {
          position: relative;
          overflow-x: hidden;
          overflow-y: auto !important;
          -webkit-overflow-scrolling: touch;
          touch-action: pan-y;
        }
        
        /* Ngăn pull-to-refresh nhưng cho phép scroll */
        body {
          overscroll-behavior-y: contain;
          overscroll-behavior-x: none;
        }
      }
    `;

    document.head.appendChild(style);

    // Ensure scroll properties are set correctly
    const ensureScrollEnabled = () => {
      document.body.style.overflow = "auto";
      document.body.style.position = "relative";
      document.body.style.height = "auto";
      document.body.style.touchAction = "pan-y";
      document.documentElement.style.overflow = "auto";
      document.documentElement.style.height = "auto";
    };

    // Set initially and on any focus change
    ensureScrollEnabled();
    document.addEventListener("focusin", ensureScrollEnabled);
    document.addEventListener("focusout", ensureScrollEnabled);

    return () => {
      // Cleanup
      if (document.head.contains(style)) {
        document.head.removeChild(style);
      }
      document.removeEventListener("focusin", ensureScrollEnabled);
      document.removeEventListener("focusout", ensureScrollEnabled);
    };
  }, []);
};

export default useScrollOptimization;
