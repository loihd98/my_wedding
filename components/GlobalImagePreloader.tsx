'use client';

import { useEffect } from 'react';
import { useImageCache, ALL_WEDDING_IMAGES } from '@/lib/imageCache';

interface GlobalImagePreloaderProps {
  children: React.ReactNode;
}

const GlobalImagePreloader: React.FC<GlobalImagePreloaderProps> = ({ children }) => {
  const { preloadImages, getStats } = useImageCache();

  useEffect(() => {
    const startPreloading = async () => {
      console.log('🚀 Starting global image preloading...');

      try {
        // Preload critical images first (priority)
        const criticalImages = ALL_WEDDING_IMAGES.slice(0, 3);
        await preloadImages(criticalImages);
        console.log('✅ Critical images preloaded');

        // Then preload remaining images in background
        setTimeout(async () => {
          const remainingImages = ALL_WEDDING_IMAGES.slice(3);
          await preloadImages(remainingImages);
          console.log('✅ All images preloaded successfully');

          // Log stats
          const stats = getStats();
          console.log(`📊 Image cache stats: ${stats.loaded} loaded, ${stats.loading} loading`);
        }, 1000); // 1 second delay for remaining images

      } catch (error) {
        console.error('❌ Error during image preloading:', error);
      }
    };

    // Start preloading after component mount
    const timeoutId = setTimeout(startPreloading, 100);

    return () => clearTimeout(timeoutId);
  }, [preloadImages, getStats]);

  return <>{children}</>;
};

export default GlobalImagePreloader;