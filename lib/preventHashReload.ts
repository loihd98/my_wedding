/**
 * iOS-Safe Hash Reload Prevention
 * Handles readonly property errors in iOS WebKit and prevents hash-triggered reloads
 */

let preventionActive = false;
let cleanupFunctions: (() => void)[] = [];

// Detect iOS (including iPad with desktop mode)
function isIOS() {
  if (typeof window === "undefined") return false;
  return (
    /iPad|iPhone|iPod/.test(navigator.userAgent) ||
    (navigator.platform === "MacIntel" && navigator.maxTouchPoints > 1)
  );
}

// Detect in-app browsers
function isInAppBrowser() {
  if (typeof window === "undefined") return false;

  const userAgent = navigator.userAgent.toLowerCase();
  return (
    userAgent.includes("facebook") ||
    userAgent.includes("instagram") ||
    userAgent.includes("line") ||
    userAgent.includes("messenger") ||
    userAgent.includes("zalo") ||
    userAgent.includes("wechat") ||
    userAgent.includes("whatsapp") ||
    userAgent.includes("tiktok") ||
    userAgent.includes("twitter") ||
    userAgent.includes("fban") ||
    userAgent.includes("fbav") ||
    (/Mobile.*Safari/i.test(userAgent) && !/Version.*Safari/i.test(userAgent))
  );
}

// iOS-safe method - focuses on event prevention rather than property override
function iosPreventHashReload() {
  console.log("[iOS] Applying iOS-safe hash reload prevention");

  try {
    // Method 1: Prevent hashchange events (safest for iOS)
    const handleHashChange = (e: HashChangeEvent) => {
      e.preventDefault();
      e.stopPropagation();
      e.stopImmediatePropagation();

      // Clean hash without triggering reload
      try {
        const newUrl = window.location.href.split("#")[0];
        if (newUrl !== window.location.href) {
          window.history.replaceState(null, "", newUrl);
        }
      } catch (err) {
        console.log("[iOS] Could not clean hash:", err);
      }

      console.log("[iOS] Prevented hash change event");
      return false;
    };

    // Use capture phase to intercept early
    window.addEventListener("hashchange", handleHashChange, true);
    cleanupFunctions.push(() => {
      window.removeEventListener("hashchange", handleHashChange, true);
    });

    // Method 2: Override reload function safely
    const originalReload = window.location.reload;
    if (typeof originalReload === "function") {
      try {
        (window.location as any).reload = function () {
          const stack = new Error().stack || "";
          const hasHash =
            window.location.hash || window.location.href.includes("#");

          if (hasHash) {
            console.log("[iOS] Blocked hash-triggered reload");
            // Clean hash instead of reloading
            try {
              const newUrl = window.location.href.split("#")[0];
              window.history.replaceState(null, "", newUrl);
            } catch (err) {
              console.log("[iOS] Could not clean URL in reload override");
            }
            return;
          }

          // Allow legitimate reloads
          return originalReload.call(window.location);
        };

        cleanupFunctions.push(() => {
          try {
            (window.location as any).reload = originalReload;
          } catch (e) {
            console.log("[iOS] Could not restore reload function");
          }
        });
      } catch (reloadError) {
        console.log("[iOS] Could not override reload function:", reloadError);
      }
    }

    // Method 3: Clean existing hash
    if (window.location.hash) {
      try {
        const newUrl = window.location.href.split("#")[0];
        window.history.replaceState(null, "", newUrl);
        console.log("[iOS] Cleaned existing hash");
      } catch (hashError) {
        console.log("[iOS] Could not clean existing hash:", hashError);
      }
    }

    // Method 4: Prevent hash additions via click events
    const handleClick = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      const anchor = target.closest("a");

      if (anchor && anchor.href && anchor.href.includes("#")) {
        e.preventDefault();
        e.stopPropagation();

        const urlWithoutHash = anchor.href.split("#")[0];
        if (urlWithoutHash !== window.location.href.split("#")[0]) {
          window.location.href = urlWithoutHash;
        }

        console.log("[iOS] Blocked hash anchor click");
      }
    };

    document.addEventListener("click", handleClick, true);
    cleanupFunctions.push(() => {
      document.removeEventListener("click", handleClick, true);
    });

    // Method 5: Monitor and clean hash periodically (fallback)
    const hashMonitor = setInterval(() => {
      if (window.location.hash) {
        try {
          const newUrl = window.location.href.split("#")[0];
          window.history.replaceState(null, "", newUrl);
        } catch (e) {
          // Silent fail
        }
      }
    }, 500);

    cleanupFunctions.push(() => {
      clearInterval(hashMonitor);
    });

    console.log("[iOS] Hash reload prevention activated successfully");
    return true;
  } catch (error) {
    console.log("[iOS] Error setting up prevention:", error);
    return false;
  }
}

// Standard method for non-iOS browsers (with better error handling)
function standardPreventHashReload() {
  console.log("[Standard] Applying standard hash reload prevention");

  try {
    // Override reload function
    const originalReload = window.location.reload;

    try {
      Object.defineProperty(window.location, "reload", {
        value: function () {
          const hasHash =
            window.location.hash || window.location.href.includes("#");

          if (hasHash) {
            console.log("[Standard] Blocked hash-triggered reload");
            try {
              const newUrl = window.location.href.split("#")[0];
              window.history.replaceState(null, "", newUrl);
            } catch (e) {
              console.log("[Standard] Could not clean URL");
            }
            return;
          }

          return originalReload.call(window.location);
        },
        writable: true,
        configurable: true,
      });
    } catch (reloadDefineError) {
      console.log("[Standard] Could not redefine reload:", reloadDefineError);
    }

    // Override history methods safely
    try {
      const originalPushState = window.history.pushState;
      const originalReplaceState = window.history.replaceState;

      Object.defineProperty(window.history, "pushState", {
        value: function (state: any, title: string, url?: string | URL | null) {
          if (url && url.toString().includes("#")) {
            const cleanUrl = url.toString().split("#")[0];
            return originalPushState.call(
              window.history,
              state,
              title,
              cleanUrl
            );
          }
          return originalPushState.call(window.history, state, title, url);
        },
        writable: true,
        configurable: true,
      });

      Object.defineProperty(window.history, "replaceState", {
        value: function (state: any, title: string, url?: string | URL | null) {
          if (url && url.toString().includes("#")) {
            const cleanUrl = url.toString().split("#")[0];
            return originalReplaceState.call(
              window.history,
              state,
              title,
              cleanUrl
            );
          }
          return originalReplaceState.call(window.history, state, title, url);
        },
        writable: true,
        configurable: true,
      });
    } catch (historyError) {
      console.log(
        "[Standard] Could not override history methods:",
        historyError
      );
    }

    // HashChange prevention
    const handleHashChange = (e: HashChangeEvent) => {
      e.preventDefault();
      e.stopPropagation();

      try {
        const newUrl = window.location.href.split("#")[0];
        window.history.replaceState(null, "", newUrl);
      } catch (e) {
        console.log("[Standard] Could not clean hash in hashchange");
      }

      console.log("[Standard] Prevented hash change");
    };

    window.addEventListener("hashchange", handleHashChange, true);
    cleanupFunctions.push(() => {
      window.removeEventListener("hashchange", handleHashChange, true);
    });

    console.log("[Standard] Hash reload prevention activated");
    return true;
  } catch (error) {
    console.log("[Standard] Error setting up prevention:", error);
    return false;
  }
}

export function preventHashReload() {
  if (preventionActive || typeof window === "undefined") return;

  try {
    const inApp = isInAppBrowser();
    const ios = isIOS();

    console.log(`[preventHashReload] Environment: iOS=${ios}, InApp=${inApp}`);

    if (!inApp) {
      console.log("[preventHashReload] Regular browser - no prevention needed");
      return;
    }

    let success = false;

    if (ios) {
      success = iosPreventHashReload();
    } else {
      success = standardPreventHashReload();
    }

    if (success) {
      preventionActive = true;
      console.log("[preventHashReload] Successfully activated");
    } else {
      console.log("[preventHashReload] Failed to activate");
    }
  } catch (error) {
    console.error("[preventHashReload] Fatal error:", error);
  }
}

export function cleanupHashPrevention() {
  if (!preventionActive) return;

  try {
    cleanupFunctions.forEach((cleanup) => {
      try {
        cleanup();
      } catch (e) {
        console.log("[cleanup] Error in cleanup function:", e);
      }
    });

    cleanupFunctions = [];
    preventionActive = false;

    console.log("[preventHashReload] Cleanup completed");
  } catch (error) {
    console.log("[preventHashReload] Error during cleanup:", error);
  }
}
