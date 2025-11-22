'use client'

import { useState, useRef, useEffect } from 'react'
import { motion } from 'framer-motion'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

const formSchema = z.object({
  name: z.string().min(2, 'Name must be at least 2 characters'),
  email: z.string().email('Invalid email address'),
  attendance: z.enum(['yes', 'no']),
  guests: z.string().min(1, 'Please specify number of guests'),
  message: z.string().min(10, 'Message must be at least 10 characters'),
})

type FormData = z.infer<typeof formSchema>

export default function RSVP() {
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSuccess, setIsSuccess] = useState(false)
  const sectionRef = useRef<HTMLElement>(null)
  const formRef = useRef<HTMLFormElement>(null)

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<FormData>({
    resolver: zodResolver(formSchema),
  })

  useEffect(() => {
    if (!sectionRef.current || !formRef.current) return

    gsap.fromTo(
      formRef.current,
      {
        opacity: 0,
        y: 50,
      },
      {
        opacity: 1,
        y: 0,
        duration: 1,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top center+=200',
          toggleActions: 'play none none reverse',
        },
      }
    )
  }, [])

  const onSubmit = async (data: FormData) => {
    setIsSubmitting(true)

    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 2000))

    console.log('Form submitted:', data)

    setIsSubmitting(false)
    setIsSuccess(true)
    reset()

    // Hide success message after 5 seconds
    setTimeout(() => {
      setIsSuccess(false)
    }, 5000)
  }

  return (
    <section
      ref={sectionRef}
      className="py-20 md:py-32 px-4 bg-gradient-to-b from-pink-50 via-white to-pink-50"
      id="rsvp"
    >
      <div className="max-w-3xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center mb-12"
        >
          <h2 className="font-script text-4xl md:text-5xl text-primary-500 mb-4">
            RSVP & Guestbook
          </h2>
          <p className="text-gray-600 text-lg">
            We would love to hear from you! Please let us know if you can make it.
          </p>
        </motion.div>

        <form
          ref={formRef}
          onSubmit={handleSubmit(onSubmit)}
          className="bg-white rounded-2xl shadow-xl p-8 md:p-12"
        >
          <div className="grid md:grid-cols-2 gap-6 mb-6">
            {/* Name */}
            <div>
              <label htmlFor="name" className="block text-gray-700 font-semibold mb-2">
                Full Name <span className="text-red-500">*</span>
              </label>
              <input
                {...register('name')}
                type="text"
                id="name"
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all outline-none"
                placeholder="John Doe"
              />
              {errors.name && (
                <p className="text-red-500 text-sm mt-1">{errors.name.message}</p>
              )}
            </div>

            {/* Email */}
            <div>
              <label htmlFor="email" className="block text-gray-700 font-semibold mb-2">
                Email <span className="text-red-500">*</span>
              </label>
              <input
                {...register('email')}
                type="email"
                id="email"
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all outline-none"
                placeholder="john@example.com"
              />
              {errors.email && (
                <p className="text-red-500 text-sm mt-1">{errors.email.message}</p>
              )}
            </div>
          </div>

          <div className="grid md:grid-cols-2 gap-6 mb-6">
            {/* Attendance */}
            <div>
              <label className="block text-gray-700 font-semibold mb-2">
                Will you attend? <span className="text-red-500">*</span>
              </label>
              <div className="flex gap-4">
                <label className="flex items-center cursor-pointer">
                  <input
                    {...register('attendance')}
                    type="radio"
                    value="yes"
                    className="w-5 h-5 text-primary-500 focus:ring-primary-500"
                  />
                  <span className="ml-2 text-gray-700">Yes, I'll be there</span>
                </label>
                <label className="flex items-center cursor-pointer">
                  <input
                    {...register('attendance')}
                    type="radio"
                    value="no"
                    className="w-5 h-5 text-primary-500 focus:ring-primary-500"
                  />
                  <span className="ml-2 text-gray-700">Sorry, can't make it</span>
                </label>
              </div>
              {errors.attendance && (
                <p className="text-red-500 text-sm mt-1">{errors.attendance.message}</p>
              )}
            </div>

            {/* Number of Guests */}
            <div>
              <label htmlFor="guests" className="block text-gray-700 font-semibold mb-2">
                Number of Guests <span className="text-red-500">*</span>
              </label>
              <input
                {...register('guests')}
                type="number"
                id="guests"
                min="1"
                max="10"
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all outline-none"
                placeholder="1"
              />
              {errors.guests && (
                <p className="text-red-500 text-sm mt-1">{errors.guests.message}</p>
              )}
            </div>
          </div>

          {/* Message */}
          <div className="mb-6">
            <label htmlFor="message" className="block text-gray-700 font-semibold mb-2">
              Your Message <span className="text-red-500">*</span>
            </label>
            <textarea
              {...register('message')}
              id="message"
              rows={5}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all outline-none resize-none"
              placeholder="Share your wishes for the couple..."
            />
            {errors.message && (
              <p className="text-red-500 text-sm mt-1">{errors.message.message}</p>
            )}
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full bg-gradient-to-r from-primary-500 to-primary-600 text-white font-bold py-4 px-8 rounded-full hover:from-primary-600 hover:to-primary-700 transition-all duration-300 shadow-lg hover:shadow-xl disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isSubmitting ? (
              <span className="flex items-center justify-center gap-2">
                <svg
                  className="animate-spin h-5 w-5"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                >
                  <circle
                    className="opacity-25"
                    cx="12"
                    cy="12"
                    r="10"
                    stroke="currentColor"
                    strokeWidth="4"
                  />
                  <path
                    className="opacity-75"
                    fill="currentColor"
                    d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                  />
                </svg>
                Submitting...
              </span>
            ) : (
              'Send RSVP'
            )}
          </button>

          {/* Success Message */}
          {isSuccess && (
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              className="mt-6 p-4 bg-green-50 border border-green-200 rounded-lg text-green-800 text-center"
            >
              <span className="text-2xl mb-2 block">✓</span>
              Thank you! Your RSVP has been received successfully.
            </motion.div>
          )}
        </form>
      </div>
    </section>
  )
}
