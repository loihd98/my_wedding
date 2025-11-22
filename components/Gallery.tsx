'use client'

import { useState, useEffect, useRef } from 'react'
import { motion } from 'framer-motion'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import Lightbox from 'yet-another-react-lightbox'
import 'yet-another-react-lightbox/styles.css'

gsap.registerPlugin(ScrollTrigger)

interface Photo {
  src: string
  width: number
  height: number
  alt: string
  tall?: boolean
}

// Sample photos - replace with actual wedding photos
const photos: Photo[] = [
  { src: '/images/gallery/1.jpg', width: 4, height: 3, alt: 'Wedding photo 1', tall: false },
  { src: '/images/gallery/2.jpg', width: 3, height: 4, alt: 'Wedding photo 2', tall: true },
  { src: '/images/gallery/3.jpg', width: 4, height: 3, alt: 'Wedding photo 3', tall: false },
  { src: '/images/gallery/4.jpg', width: 3, height: 4, alt: 'Wedding photo 4', tall: true },
  { src: '/images/gallery/5.jpg', width: 4, height: 3, alt: 'Wedding photo 5', tall: false },
  { src: '/images/gallery/6.jpg', width: 3, height: 4, alt: 'Wedding photo 6', tall: true },
  { src: '/images/gallery/7.jpg', width: 4, height: 3, alt: 'Wedding photo 7', tall: false },
  { src: '/images/gallery/8.jpg', width: 3, height: 4, alt: 'Wedding photo 8', tall: true },
  { src: '/images/gallery/9.jpg', width: 4, height: 3, alt: 'Wedding photo 9', tall: false },
]

export default function Gallery() {
  const [lightboxOpen, setLightboxOpen] = useState(false)
  const [photoIndex, setPhotoIndex] = useState(0)
  const sectionRef = useRef<HTMLElement>(null)
  const gridRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!sectionRef.current || !gridRef.current) return

    const items = gridRef.current.querySelectorAll('.gallery-item')

    gsap.fromTo(
      items,
      {
        opacity: 0,
        scale: 0.8,
      },
      {
        opacity: 1,
        scale: 1,
        duration: 0.6,
        stagger: 0.1,
        ease: 'power2.out',
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top center+=100',
          toggleActions: 'play none none reverse',
        },
      }
    )
  }, [])

  const openLightbox = (index: number) => {
    setPhotoIndex(index)
    setLightboxOpen(true)
  }

  return (
    <section
      ref={sectionRef}
      className="py-20 md:py-32 px-4 bg-white"
      id="gallery"
    >
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h2 className="font-script text-4xl md:text-5xl text-primary-500 mb-4">
            Our Memories
          </h2>
          <p className="text-gray-600 text-lg max-w-2xl mx-auto">
            A glimpse into our beautiful journey together through photographs.
          </p>
        </motion.div>

        {/* Masonry Grid */}
        <div
          ref={gridRef}
          className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4"
        >
          {photos.map((photo, index) => (
            <div
              key={index}
              className={`gallery-item cursor-pointer overflow-hidden rounded-lg shadow-lg hover:shadow-2xl transition-all duration-300 group ${
                photo.tall ? 'row-span-2' : ''
              }`}
              onClick={() => openLightbox(index)}
            >
              <div className="relative overflow-hidden">
                <img
                  src={photo.src}
                  alt={photo.alt}
                  className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-500"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <svg
                    className="w-12 h-12 text-white"
                    fill="none"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0zM10 7v6m3-3H7"></path>
                  </svg>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Lightbox */}
      <Lightbox
        open={lightboxOpen}
        close={() => setLightboxOpen(false)}
        index={photoIndex}
        slides={photos.map(photo => ({ src: photo.src, alt: photo.alt }))}
        styles={{
          container: { backgroundColor: 'rgba(0, 0, 0, 0.95)' },
        }}
      />
    </section>
  )
}
