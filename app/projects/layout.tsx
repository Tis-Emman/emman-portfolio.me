import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Projects',
  description: 'A collection of full-stack web apps, desktop systems, and developer tools built by Emmanuel Dela Pena.',
  openGraph: {
    title: 'Projects | Emmanuel Dela Pena',
    description: 'A collection of full-stack web apps, desktop systems, and developer tools built by Emmanuel Dela Pena.',
  },
}

export default function ProjectsLayout({ children }: { children: React.ReactNode }) {
  return children
}
