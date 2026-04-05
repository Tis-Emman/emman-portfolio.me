import Link from 'next/link'
import { ArrowLeft } from 'lucide-react'

export default function NotFound() {
  return (
    <div className="not-found-page">
      <div className="not-found-content">
        <p className="not-found-code">404</p>
        <h1 className="not-found-title">Page not found</h1>
        <p className="not-found-desc">
          The page you're looking for doesn't exist or may have been moved.
        </p>
        <Link href="/" className="not-found-btn">
          <ArrowLeft size={16} />
          Back to Home
        </Link>
      </div>
    </div>
  )
}
