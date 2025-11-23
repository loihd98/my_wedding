import { useEffect } from 'react';

interface PreloadImagesProps {
  images: string[];
}

const PreloadImages: React.FC<PreloadImagesProps> = ({ images }) => {
  useEffect(() => {
    // Preload chỉ các ảnh quan trọng
    const preloadImage = (src: string) => {
      const img = new window.Image();
      img.src = src;
    };

    // Preload với delay để không block initial render
    const timeoutId = setTimeout(() => {
      images.forEach(preloadImage);
    }, 100);

    return () => clearTimeout(timeoutId);
  }, [images]);

  return null;
};

// Danh sách ảnh cần preload (chỉ ảnh quan trọng)
export const CRITICAL_IMAGES = [
  '/images/webp/my_lover.webp',
  '/images/webp/groom.webp', 
  '/images/webp/bridal.webp'
];

export default PreloadImages;