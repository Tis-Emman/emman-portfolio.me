import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Community',
  description: "Join Emmanuel Dela Pena's developer community — connect, share, and grow together.",
  openGraph: {
    title: 'Community | Emmanuel Dela Pena',
    description: "Join Emmanuel Dela Pena's developer community — connect, share, and grow together.",
  },
}

export default function CommunityLayout({ children }: { children: React.ReactNode }) {
  return children
}
