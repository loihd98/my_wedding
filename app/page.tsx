import { notFound } from 'next/navigation'

export default function HomePage() {
  // Only allow /groom and /bridal, return not found for root
  notFound()
}
