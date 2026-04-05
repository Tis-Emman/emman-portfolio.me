import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Tech Stack',
  description: "Emmanuel Dela Pena's full technology stack — frameworks, languages, databases, and tools used across projects.",
  openGraph: {
    title: 'Tech Stack | Emmanuel Dela Pena',
    description: "Emmanuel Dela Pena's full technology stack — frameworks, languages, databases, and tools.",
  },
}

export default function TechStackLayout({ children }: { children: React.ReactNode }) {
  return children
}
