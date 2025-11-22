import Link from 'next/link'

interface NavigationProps {
  currentSlug?: string
}

export default function Navigation({ currentSlug }: NavigationProps) {
  return (
    <nav className="fixed top-4 left-4 right-4 z-50">
      <div className="max-w-4xl mx-auto">
        <div className="bg-white/80 backdrop-blur-sm rounded-full px-6 py-3 shadow-lg border border-white/20">
          <div className="flex items-center justify-between">
            <span className="font-semibold text-gray-700">
              Wedding Card
            </span>

            <div className="flex gap-2">
              <Link
                href="/groom"
                className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${currentSlug === 'groom'
                    ? 'bg-blue-100 text-blue-700'
                    : 'text-gray-600 hover:text-blue-600 hover:bg-blue-50'
                  }`}
              >
                Chú rể
              </Link>
              <Link
                href="/bridal"
                className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${currentSlug === 'bridal'
                    ? 'bg-pink-100 text-pink-700'
                    : 'text-gray-600 hover:text-pink-600 hover:bg-pink-50'
                  }`}
              >
                Cô dâu
              </Link>
            </div>
          </div>
        </div>
      </div>
    </nav>
  )
}