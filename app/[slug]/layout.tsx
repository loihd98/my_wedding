import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: {
    template: '%s | Wedding Card',
    default: 'Wedding Card',
  },
  description: 'Wedding invitation card - Groom & Bridal information',
}

export default function SlugLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className="min-h-screen bg-gradient-to-b from-pink-50 via-white to-pink-50">
      {children}
    </div>
  )
}