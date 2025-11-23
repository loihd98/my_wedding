import { useEffect, useRef } from "react";

export const usePreventReload = () => {
  const scrollPositionRef = useRef(0);
  const isScrollingRef = useRef(false);

  useEffect(() => {
    // Detect in-app browsers và mobile
    const isInAppBrowser =
      /Instagram|FBAN|FBAV|Twitter|Line|Snapchat|LinkedIn|WeChat|QQ|MicroMessenger|WhatsApp|Telegram|TikTok|ByteDance|Musical\.ly|Zalo/i.test(
        navigator.userAgent
      );
    const isMobile =
      /Android|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(
        navigator.userAgent
      );

    if (!isInAppBrowser && !isMobile) return;

    console.log("🛡️ Prevent reload system active for mobile/in-app browser");

    // ONLY prevent pull-to-refresh, không chặn normal scroll
    const preventPullToRefresh = (e: TouchEvent) => {
      const scrollTop =
        document.documentElement.scrollTop || document.body.scrollTop;
      const firstTouch = e.touches[0];

      // Chỉ prevent khi ở top page và đang pull down
      if (scrollTop === 0 && firstTouch && firstTouch.clientY > 50) {
        e.preventDefault();
        console.log("🚫 Pull-to-refresh prevented");
      }
    };

    // Handle scroll - chỉ track, không prevent
    const handleScroll = () => {
      const currentPosition = window.pageYOffset || window.scrollY;

      // Mark đang scroll
      isScrollingRef.current = true;

      // Clear scroll timeout
      clearTimeout(window.scrollTimeout);

      // Set timeout để detect kết thúc scroll
      window.scrollTimeout = setTimeout(() => {
        isScrollingRef.current = false;
      }, 150);

      scrollPositionRef.current = currentPosition;
    };

    // Prevent bounce scrolling - CHỈ ở boundaries
    const preventBounceScroll = (e: TouchEvent) => {
      const scrollTop =
        document.documentElement.scrollTop || document.body.scrollTop;
      const scrollHeight = document.documentElement.scrollHeight;
      const clientHeight = document.documentElement.clientHeight;

      // CHỈ prevent overscroll ở top và bottom boundaries
      if (scrollTop <= 0 && e.touches[0] && e.touches[0].clientY > 0) {
        e.preventDefault(); // Prevent overscroll at top
      } else if (
        scrollTop + clientHeight >= scrollHeight - 1 &&
        e.touches[0] &&
        e.touches[0].clientY < 0
      ) {
        e.preventDefault(); // Prevent overscroll at bottom
      }
    };

    // Disable zoom - CHỈ multi-touch zoom
    const preventZoom = (e: TouchEvent) => {
      if (e.touches.length > 1) {
        e.preventDefault();
      }
    };

    // Add event listeners với passive=false chỉ khi cần thiết
    document.addEventListener("touchstart", preventPullToRefresh, {
      passive: false,
    });
    document.addEventListener("touchmove", preventBounceScroll, {
      passive: false,
    });
    document.addEventListener("touchstart", preventZoom, { passive: false });
    window.addEventListener("scroll", handleScroll, { passive: true }); // PASSIVE cho scroll

    // Prevent context menu - chỉ long press
    const preventContextMenu = (e: Event) => {
      if (e.type === "contextmenu") {
        e.preventDefault();
      }
    };
    document.addEventListener("contextmenu", preventContextMenu);

    // Ensure scroll is always enabled
    document.body.style.overflow = "auto";
    document.body.style.overscrollBehavior = "contain";
    document.documentElement.style.overflow = "auto";

    return () => {
      document.removeEventListener("touchstart", preventPullToRefresh);
      document.removeEventListener("touchmove", preventBounceScroll);
      document.removeEventListener("touchstart", preventZoom);
      window.removeEventListener("scroll", handleScroll);
      document.removeEventListener("contextmenu", preventContextMenu);

      if (window.scrollTimeout) {
        clearTimeout(window.scrollTimeout);
      }
    };
  }, []);

  return {
    scrollPosition: scrollPositionRef.current,
    isScrolling: isScrollingRef.current,
  };
};

// Extend window interface
declare global {
  interface Window {
    scrollTimeout: NodeJS.Timeout;
  }
}
