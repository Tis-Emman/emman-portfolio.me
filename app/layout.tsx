import type { Metadata } from 'next'
import { JetBrains_Mono, Syne } from 'next/font/google'
import '../styles/globals.css'
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
  title: 'Emmanuel Dela Pena | BSIT Student & Full Stack Developer',
  description: 'Professional portfolio showcasing projects and expertise',
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
