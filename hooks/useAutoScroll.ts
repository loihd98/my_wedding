import { useRef, useCallback, useEffect } from "react";

interface AutoScrollOptions {
  duration?: number;
  easing?: string;
  offset?: number;
}

export const useAutoScroll = (options: AutoScrollOptions = {}) => {
  const { duration = 8000, easing = "ease-in-out", offset = 0 } = options;
  const isScrollingRef = useRef(false);
  const animationFrameRef = useRef<number>();

  // Mobile optimization - prevent scroll blocking
  useEffect(() => {
    const preventScrollBlock = () => {
      if (typeof window !== "undefined") {
        document.body.style.overflow = "auto";
        document.body.style.position = "relative";
        document.documentElement.style.overflow = "auto";
      }
    };

    preventScrollBlock();

    return () => {
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }
    };
  }, []);

  const smoothScrollTo = useCallback((targetY: number, duration: number) => {
    return new Promise<void>((resolve) => {
      // Ensure scroll is not blocked
      document.body.style.overflow = "auto";
      document.documentElement.style.overflow = "auto";

      const startY =
        window.pageYOffset ||
        window.scrollY ||
        document.documentElement.scrollTop;
      const distance = targetY - startY;
      const startTime = performance.now();

      const easeInOutCubic = (t: number): number => {
        return t < 0.5
          ? 4 * t * t * t
          : (t - 1) * (2 * t - 2) * (2 * t - 2) + 1;
      };

      const animateScroll = (currentTime: number) => {
        const timeElapsed = currentTime - startTime;
        const progress = Math.min(timeElapsed / duration, 1);
        const easedProgress = easeInOutCubic(progress);

        const currentY = startY + distance * easedProgress;

        // Use multiple scroll methods for better mobile compatibility
        try {
          window.scrollTo({ top: currentY, behavior: "auto" });
        } catch (e) {
          // Fallback for older browsers
          window.scrollTo(0, currentY);
        }

        if (progress < 1) {
          animationFrameRef.current = requestAnimationFrame(animateScroll);
        } else {
          isScrollingRef.current = false;
          resolve();
        }
      };

      isScrollingRef.current = true;
      animationFrameRef.current = requestAnimationFrame(animateScroll);
    });
  }, []);

  const scrollToTop = useCallback(async () => {
    if (isScrollingRef.current) return;

    console.log("🔝 Quick scroll to top");
    await smoothScrollTo(0, 800); // Quick scroll to top
  }, [smoothScrollTo]);

  const scrollToBottom = useCallback(async () => {
    if (isScrollingRef.current) return;

    // Mobile-optimized scroll calculation
    const body = document.body;
    const html = document.documentElement;

    const maxScroll =
      Math.max(
        body.scrollHeight,
        body.offsetHeight,
        html.clientHeight,
        html.scrollHeight,
        html.offsetHeight
      ) - (window.innerHeight || html.clientHeight);

    console.log(`🔽 Scrolling to bottom: ${maxScroll}px`);
    await smoothScrollTo(maxScroll + offset, duration);
  }, [smoothScrollTo, duration, offset]);

  const autoScrollFullPage = useCallback(async () => {
    if (isScrollingRef.current) {
      console.log("⚠️ Auto-scroll already in progress");
      return;
    }

    console.log("🚀 Starting auto-scroll from top to bottom");

    try {
      // Ensure page can scroll
      document.body.style.overflow = "auto";
      document.body.style.position = "relative";
      document.body.style.height = "auto";

      // Quick scroll to top first
      await scrollToTop();

      // Small delay for mobile
      await new Promise((resolve) => setTimeout(resolve, 800));

      // Then scroll to bottom slowly
      await scrollToBottom();

      console.log("✅ Auto-scroll completed successfully");
    } catch (error) {
      console.error("❌ Auto-scroll failed:", error);
      isScrollingRef.current = false;

      // Reset scroll state on error
      document.body.style.overflow = "auto";
    }
  }, [scrollToTop, scrollToBottom]);

  const stopAutoScroll = useCallback(() => {
    if (animationFrameRef.current) {
      cancelAnimationFrame(animationFrameRef.current);
    }
    isScrollingRef.current = false;
  }, []);

  return {
    autoScrollFullPage,
    scrollToTop,
    scrollToBottom,
    stopAutoScroll,
    isScrolling: () => isScrollingRef.current,
  };
};

// Hook để detect wax_seal click - Mobile optimized
export const useWaxSealHandler = () => {
  const { autoScrollFullPage } = useAutoScroll({
    duration: 15000, // Chậm hơn cho mobile (15 giây)
    offset: 50,
  });

  const handleWaxSealClick = useCallback(
    async (event?: React.MouseEvent | React.TouchEvent) => {
      // Prevent default behavior
      if (event) {
        event.preventDefault();
        event.stopPropagation();
      }

      console.log("🔥 Wax seal clicked - preparing mobile auto-scroll");

      // Ensure scroll is enabled immediately
      document.body.style.overflow = "auto";
      document.body.style.position = "relative";
      document.body.style.touchAction = "auto";
      document.documentElement.style.overflow = "auto";

      // Mobile-specific delay for envelope animation
      setTimeout(() => {
        console.log("📱 Starting mobile-optimized auto-scroll");
        autoScrollFullPage();
      }, 1500); // Lâu hơn để đảm bảo animation hoàn thành
    },
    [autoScrollFullPage]
  );

  return {
    handleWaxSealClick,
    autoScrollFullPage,
  };
};
