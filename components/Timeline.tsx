'use client'

import { useEffect, useRef } from 'react'
import { motion } from 'framer-motion'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

interface TimelineEvent {
  date: string
  title: string
  description: string
  icon: string
}

const timelineEvents: TimelineEvent[] = [
  {
    date: 'Spring 2018',
    title: 'First Meeting',
    description: 'We met at a coffee shop on a rainy spring day. It was love at first sight.',
    icon: '☕',
  },
  {
    date: 'Summer 2019',
    title: 'First Date',
    description: 'Our first official date was at the beach, watching the sunset together.',
    icon: '🌅',
  },
  {
    date: 'Winter 2020',
    title: 'First Trip Together',
    description: 'We traveled to the mountains and created unforgettable memories in the snow.',
    icon: '⛰️',
  },
  {
    date: 'Spring 2023',
    title: 'The Proposal',
    description: 'Under the cherry blossoms, Loi asked Hang to be his forever.',
    icon: '💍',
  },
  {
    date: 'Summer 2026',
    title: 'Our Wedding',
    description: 'Join us as we celebrate our love and commitment to each other.',
    icon: '💒',
  },
]

export default function Timeline() {
  const sectionRef = useRef<HTMLElement>(null)
  const timelineRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!sectionRef.current || !timelineRef.current) return

    const items = timelineRef.current.querySelectorAll('.timeline-item')

    gsap.fromTo(
      items,
      {
        opacity: 0,
        y: 50,
      },
      {
        opacity: 1,
        y: 0,
        duration: 0.8,
        stagger: 0.2,
        ease: 'power2.out',
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top center+=100',
          end: 'bottom center',
          toggleActions: 'play none none reverse',
        },
      }
    )
  }, [])

  return (
    <section
      ref={sectionRef}
      className="py-20 md:py-32 px-4 bg-white"
      id="story"
    >
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h2 className="font-script text-4xl md:text-5xl text-primary-500 mb-4">
            Our Love Story
          </h2>
          <p className="text-gray-600 text-lg max-w-2xl mx-auto">
            Every love story is beautiful, but ours is our favorite. Here's how our journey began.
          </p>
        </motion.div>

        <div ref={timelineRef} className="relative">
          {/* Vertical Line */}
          <div className="absolute left-1/2 transform -translate-x-1/2 w-0.5 h-full bg-gradient-to-b from-primary-300 via-primary-400 to-primary-300" />

          {/* Timeline Items */}
          <div className="space-y-12 md:space-y-20">
            {timelineEvents.map((event, index) => (
              <div
                key={index}
                className={`timeline-item flex flex-col md:flex-row items-center gap-8 ${
                  index % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'
                }`}
              >
                {/* Content */}
                <div className={`flex-1 ${index % 2 === 0 ? 'md:text-right' : 'md:text-left'}`}>
                  <div className="bg-gradient-to-br from-pink-50 to-white p-6 rounded-2xl shadow-lg hover:shadow-xl transition-shadow duration-300">
                    <span className="text-primary-500 font-semibold text-sm uppercase tracking-wider">
                      {event.date}
                    </span>
                    <h3 className="text-2xl font-serif font-bold text-gray-800 mt-2 mb-3">
                      {event.title}
                    </h3>
                    <p className="text-gray-600 leading-relaxed">{event.description}</p>
                  </div>
                </div>

                {/* Icon */}
                <div className="relative z-10">
                  <div className="w-16 h-16 md:w-20 md:h-20 rounded-full bg-gradient-to-br from-primary-400 to-primary-600 shadow-lg flex items-center justify-center text-3xl md:text-4xl">
                    {event.icon}
                  </div>
                </div>

                {/* Spacer */}
                <div className="flex-1 hidden md:block" />
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
