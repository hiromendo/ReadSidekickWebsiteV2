import { ReactNode } from 'react'
import { Navigation } from './Navigation'
import { Footer } from './Footer'

interface LayoutProps {
  children: ReactNode
}

export function Layout({ children }: LayoutProps) {
  return (
    <div className="relative">
      <Navigation />
      <main>
        {children}
        <Footer />
      </main>
    </div>
  )
}
