import type { Metadata } from 'next'
import { JetBrains_Mono, Syne } from 'next/font/google'
import '@/styles/globals.css'
import ChatButton from '@/components/ChatButton'

const jetbrainsMono = JetBrains_Mono({
  subsets: ['latin'],
  variable: '--font-jetbrains-mono',
})

const syne = Syne({
  subsets: ['latin'],
  variable: '--font-syne',
  weight: ['400', '600', '700', '800'],
})

export const metadata: Metadata = {
  metadataBase: new URL('https://emman-portfolio.vercel.app'),
  title: {
    default: 'Emmanuel Dela Pena | Full Stack Developer',
    template: '%s | Emmanuel Dela Pena',
  },
  description: 'BSIT student & full stack developer from Baliuag, Bulacan. Specializing in Next.js, React, TypeScript, and Supabase.',
  keywords: ['Emmanuel Dela Pena', 'Full Stack Developer', 'Next.js', 'React', 'TypeScript', 'BSIT', 'Philippines', 'Web Developer'],
  authors: [{ name: 'Emmanuel Dela Pena' }],
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: 'https://emman-portfolio.vercel.app',
    siteName: 'Emmanuel Dela Pena Portfolio',
    title: 'Emmanuel Dela Pena | Full Stack Developer',
    description: 'BSIT student & full stack developer from Baliuag, Bulacan. Specializing in Next.js, React, TypeScript, and Supabase.',
    images: [{ url: '/images/profile_new.jpg', width: 800, height: 800, alt: 'Emmanuel Dela Pena' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Emmanuel Dela Pena | Full Stack Developer',
    description: 'BSIT student & full stack developer from Baliuag, Bulacan.',
    images: ['/images/profile_new.jpg'],
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className={`${jetbrainsMono.variable} ${syne.variable}`}>
      <body className={jetbrainsMono.className}>
        {children}
        <ChatButton />
      </body>
    </html>
  )
}
