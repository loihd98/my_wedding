'use client'

import { motion } from 'framer-motion'
import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

const events = [
  {
    title: 'Wedding Ceremony',
    time: '2:00 PM',
    date: 'June 15, 2026',
    location: 'Grand Palace Wedding Hall',
    address: '123 Wedding Street, District 1, Ho Chi Minh City',
    description: 'Join us for our wedding ceremony where we exchange our vows.',
    mapUrl: 'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3919.3249862542555!2d106.69746631533456!3d10.78231439230089!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x31752f38f9ed887b%3A0x14aded5b56f672!2sHo%20Chi%20Minh%20City%2C%20Vietnam!5e0!3m2!1sen!2s!4v1234567890',
    icon: '💒',
  },
  {
    title: 'Reception',
    time: '5:00 PM',
    date: 'June 15, 2026',
    location: 'Grand Palace Wedding Hall',
    address: '123 Wedding Street, District 1, Ho Chi Minh City',
    description: 'Celebrate with us at our reception with dinner, drinks, and dancing.',
    mapUrl: 'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3919.3249862542555!2d106.69746631533456!3d10.78231439230089!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x31752f38f9ed887b%3A0x14aded5b56f672!2sHo%20Chi%20Minh%20City%2C%20Vietnam!5e0!3m2!1sen!2s!4v1234567890',
    icon: '🎉',
  },
]

export default function EventDetails() {
  const sectionRef = useRef<HTMLElement>(null)

  useEffect(() => {
    if (!sectionRef.current) return

    const cards = sectionRef.current.querySelectorAll('.event-card')

    gsap.fromTo(
      cards,
      {
        opacity: 0,
        y: 60,
      },
      {
        opacity: 1,
        y: 0,
        duration: 1,
        stagger: 0.3,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top center+=200',
          toggleActions: 'play none none reverse',
        },
      }
    )
  }, [])

  return (
    <section
      ref={sectionRef}
      className="py-20 md:py-32 px-4 bg-gradient-to-b from-pink-50 via-white to-pink-50"
      id="event"
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
            Wedding Events
          </h2>
          <p className="text-gray-600 text-lg max-w-2xl mx-auto">
            We would be honored to have you join us on our special day.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-8 lg:gap-12">
          {events.map((event, index) => (
            <div
              key={index}
              className="event-card bg-white rounded-2xl shadow-xl overflow-hidden hover:shadow-2xl transition-shadow duration-300"
            >
              {/* Map */}
              <div className="relative h-64 bg-gray-200">
                <iframe
                  src={event.mapUrl}
                  width="100%"
                  height="100%"
                  style={{ border: 0 }}
                  allowFullScreen
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  title={`Map for ${event.title}`}
                  className="grayscale hover:grayscale-0 transition-all duration-300"
                />
                <div className="absolute top-4 right-4 w-16 h-16 bg-white rounded-full shadow-lg flex items-center justify-center text-3xl">
                  {event.icon}
                </div>
              </div>

              {/* Content */}
              <div className="p-8">
                <h3 className="text-3xl font-serif font-bold text-gray-800 mb-4">
                  {event.title}
                </h3>
                
                <div className="space-y-3 mb-6">
                  <div className="flex items-start gap-3">
                    <span className="text-primary-500 text-xl">📅</span>
                    <div>
                      <p className="font-semibold text-gray-700">{event.date}</p>
                      <p className="text-gray-600">{event.time}</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start gap-3">
                    <span className="text-primary-500 text-xl">📍</span>
                    <div>
                      <p className="font-semibold text-gray-700">{event.location}</p>
                      <p className="text-gray-600 text-sm">{event.address}</p>
                    </div>
                  </div>
                </div>

                <p className="text-gray-600 leading-relaxed mb-6">
                  {event.description}
                </p>

                <a
                  href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(event.address)}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 bg-primary-500 text-white px-6 py-3 rounded-full hover:bg-primary-600 transition-colors duration-300 font-semibold"
                >
                  <span>Get Directions</span>
                  <svg
                    className="w-5 h-5"
                    fill="none"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path d="M9 5l7 7-7 7"></path>
                  </svg>
                </a>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
