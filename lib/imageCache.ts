// Simple Image Cache System - không cần external dependencies
class ImageCacheManager {
  private loadedImages = new Set<string>();
  private loadingImages = new Set<string>();
  private imageElements = new Map<string, HTMLImageElement>();

  isImageLoaded(src: string): boolean {
    return this.loadedImages.has(src);
  }

  isImageLoading(src: string): boolean {
    return this.loadingImages.has(src);
  }

  setImageLoading(src: string): void {
    this.loadingImages.add(src);
  }

  setImageLoaded(src: string): void {
    this.loadedImages.add(src);
    this.loadingImages.delete(src);
  }

  getImageElement(src: string): HTMLImageElement | undefined {
    return this.imageElements.get(src);
  }

  preloadImage(src: string): Promise<HTMLImageElement> {
    return new Promise((resolve, reject) => {
      // Nếu đã load rồi, return cached element
      if (this.loadedImages.has(src)) {
        const cached = this.imageElements.get(src);
        if (cached) {
          resolve(cached);
          return;
        }
      }

      // Nếu đang load, chờ
      if (this.loadingImages.has(src)) {
        // Tạo polling để check khi load xong
        const checkLoaded = () => {
          if (this.loadedImages.has(src)) {
            const element = this.imageElements.get(src);
            if (element) resolve(element);
            else reject(new Error("Image loaded but element not found"));
          } else {
            setTimeout(checkLoaded, 50);
          }
        };
        checkLoaded();
        return;
      }

      // Bắt đầu load image mới
      this.setImageLoading(src);
      const img = new Image();

      img.onload = () => {
        this.imageElements.set(src, img);
        this.setImageLoaded(src);
        resolve(img);
      };

      img.onerror = () => {
        this.loadingImages.delete(src);
        reject(new Error(`Failed to load image: ${src}`));
      };

      img.src = src;
    });
  }

  async preloadImages(sources: string[]): Promise<void> {
    try {
      await Promise.all(sources.map((src) => this.preloadImage(src)));
      console.log("✅ All images preloaded successfully");
    } catch (error) {
      console.error("❌ Failed to preload some images:", error);
    }
  }

  clearCache(): void {
    this.loadedImages.clear();
    this.loadingImages.clear();
    this.imageElements.clear();
  }

  getCacheStats() {
    return {
      loaded: this.loadedImages.size,
      loading: this.loadingImages.size,
      total: this.loadedImages.size + this.loadingImages.size,
    };
  }
}

// Global singleton instance
export const imageCache = new ImageCacheManager();

// Hook để sử dụng trong React components
export const useImageCache = () => {
  const preloadImage = (src: string) => imageCache.preloadImage(src);
  const preloadImages = (sources: string[]) =>
    imageCache.preloadImages(sources);
  const isLoaded = (src: string) => imageCache.isImageLoaded(src);
  const isLoading = (src: string) => imageCache.isImageLoading(src);
  const clearCache = () => imageCache.clearCache();
  const getStats = () => imageCache.getCacheStats();

  return {
    preloadImage,
    preloadImages,
    isLoaded,
    isLoading,
    clearCache,
    getStats,
  };
};

// Danh sách tất cả ảnh cần preload
export const ALL_WEDDING_IMAGES = [
  // Critical images - load ngay
  "/images/webp/my_lover.webp",
  "/images/webp/groom.webp",
  "/images/webp/bridal.webp",

  // Secondary images - load sau
  "/images/webp/album_layout.webp",
  "/images/webp/picture_2.webp",
  "/images/webp/picture_6.webp",
  "/images/webp/picture_3.webp",
  "/images/webp/picture_1.webp",
  "/images/picture_8.jpg",
  "/images/webp/save_the_date.webp",
  "/images/webp/flower_1.webp",
  "/images/webp/flower_2.webp",
  "/images/webp/audio.png",
];
