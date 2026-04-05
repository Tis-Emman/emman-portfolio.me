import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Certifications',
  description: 'Professional certifications and courses completed by Emmanuel Dela Pena in web development, data analytics, and software engineering.',
  openGraph: {
    title: 'Certifications | Emmanuel Dela Pena',
    description: 'Professional certifications and courses completed by Emmanuel Dela Pena.',
  },
}

export default function CertificationsLayout({ children }: { children: React.ReactNode }) {
  return children
}
