/**
 * Prevent hash-triggered reload loops in in-app browsers
 * Overrides Next.js framework behavior that causes S.includes("#") && window.location.reload()
 */

export function preventHashReload() {
  if (typeof window === 'undefined') return;

  // Detect in-app browsers
  const userAgent = window.navigator?.userAgent || '';
  const isInAppBrowser = /Instagram|FBAN|FBAV|Twitter|Line|Snapchat|LinkedIn|WeChat|QQ|MicroMessenger|WhatsApp|Telegram|TikTok|ByteDance|Musical\.ly/i.test(userAgent) ||
    /Mobile.*Safari/i.test(userAgent) && !/Version.*Safari/i.test(userAgent);

  if (!isInAppBrowser) return;

  console.log('[preventHashReload] In-app browser detected, applying hash reload prevention');

  // Store original reload function
  const originalReload = window.location.reload.bind(window.location);
  
  // Override reload function to check for hash-related calls
  window.location.reload = function() {
    // Get stack trace to identify if this is a hash-triggered reload
    const stack = new Error().stack || '';
    const isHashRelated = stack.includes('includes("#")') || 
                         window.location.hash || 
                         document.referrer.includes('#');
    
    if (isHashRelated) {
      console.warn('[preventHashReload] Blocked hash-triggered reload to prevent loop');
      
      // Instead of reloading, just remove hash from current URL
      if (window.location.hash) {
        const urlWithoutHash = window.location.href.split('#')[0];
        window.history.replaceState(null, '', urlWithoutHash);
      }
      return;
    }
    
    // Allow normal reloads (user-triggered, legitimate ones)
    originalReload();
  };

  // Prevent hash changes from triggering reloads
  window.addEventListener('hashchange', function(e) {
    e.preventDefault();
    e.stopPropagation();
    
    // Remove hash from URL without reload
    const urlWithoutHash = window.location.href.split('#')[0];
    window.history.replaceState(null, '', urlWithoutHash);
    
    console.warn('[preventHashReload] Hash change blocked and cleaned up');
  }, true);

  // Override history methods that might add hash
  const originalPushState = window.history.pushState.bind(window.history);
  const originalReplaceState = window.history.replaceState.bind(window.history);

  window.history.pushState = function(state, title, url) {
    if (typeof url === 'string' && url.includes('#')) {
      url = url.split('#')[0];
      console.warn('[preventHashReload] Removed hash from pushState URL');
    }
    return originalPushState(state, title, url);
  };

  window.history.replaceState = function(state, title, url) {
    if (typeof url === 'string' && url.includes('#')) {
      url = url.split('#')[0];
      console.warn('[preventHashReload] Removed hash from replaceState URL');
    }
    return originalReplaceState(state, title, url);
  };

  // Clean up any existing hash on page load
  if (window.location.hash) {
    const cleanUrl = window.location.href.split('#')[0];
    window.history.replaceState(null, '', cleanUrl);
    console.warn('[preventHashReload] Cleaned existing hash on page load');
  }

  // Additional protection: intercept anchor clicks that might have hash
  document.addEventListener('click', function(e) {
    const target = e.target as HTMLElement;
    const anchor = target.closest('a');
    
    if (anchor && anchor.href && anchor.href.includes('#')) {
      e.preventDefault();
      e.stopPropagation();
      
      // Navigate to URL without hash
      const urlWithoutHash = anchor.href.split('#')[0];
      if (urlWithoutHash !== window.location.href.split('#')[0]) {
        window.location.href = urlWithoutHash;
      }
      
      console.warn('[preventHashReload] Blocked hash anchor click');
    }
  }, true);

  console.log('[preventHashReload] Hash reload prevention initialized');
}