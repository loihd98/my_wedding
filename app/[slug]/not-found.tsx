import Link from 'next/link'

export default function NotFound() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-50 to-pink-100 flex items-center justify-center">
      <div className="text-center max-w-md mx-auto px-4">
        <h1 className="text-6xl font-bold text-pink-900 mb-4">404</h1>
        <h2 className="text-2xl font-semibold text-pink-800 mb-6">
          Trang không tồn tại
        </h2>
        <p className="text-pink-700 mb-8">
          Rất tiếc, trang bạn đang tìm kiếm không tồn tại hoặc đã bị xóa.
        </p>
        <div className="space-y-4">
          <Link
            href="/groom"
            className="inline-block px-6 py-3 bg-pink-600 text-white rounded-lg font-medium hover:bg-pink-700 transition-colors"
          >
            ← Về trang chủ (Chú rể)
          </Link>
          <div className="flex gap-2 justify-center">
            <Link
              href="/groom"
              className="inline-block px-4 py-2 border border-pink-600 text-pink-600 rounded-lg font-medium hover:bg-pink-600 hover:text-white transition-colors"
            >
              Chú rể
            </Link>
            <Link
              href="/bridal"
              className="inline-block px-4 py-2 border border-pink-600 text-pink-600 rounded-lg font-medium hover:bg-pink-600 hover:text-white transition-colors"
            >
              Cô dâu
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}