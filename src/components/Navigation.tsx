import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { useLanguage } from '../i18n'
import { LanguageSwitcher } from './LanguageSwitcher'

export function Navigation() {
  const [isScrolled, setIsScrolled] = useState(false)
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const { t } = useLanguage()

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 100)
    }

    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const navItems = [
    { label: t.nav.problem, href: '/#problem' },
    { label: t.nav.howItWorks, href: '/#how-it-works' },
    { label: t.nav.methodology, href: '/#methodology' },
    { label: t.nav.about, href: '/#about' },
  ]

  return (
    <>
      <motion.header
        initial={{ y: -100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-700 ease-editorial ${
          isScrolled ? 'bg-ivory-100/95 backdrop-blur-sm' : 'bg-transparent'
        }`}
      >
        <nav className="editorial-container">
          <div className="flex items-center justify-between py-6 md:py-8">
            {/* Logo */}
            <Link to="/" className="flex items-center gap-2 group">
              <img
                src="/logo.png"
                alt="Read Sidekick"
                className="w-8 h-8 md:w-10 md:h-10 rounded-lg"
              />
              <span className="font-serif text-xl md:text-2xl font-medium tracking-tight text-ink-900 group-hover:text-coral-500 transition-colors">
                Read Sidekick
              </span>
            </Link>

            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center gap-8">
              {navItems.map((item) => (
                <a
                  key={item.href}
                  href={item.href}
                  className="editorial-label editorial-link text-ink-700 hover:text-ink-900 transition-colors duration-500"
                >
                  {item.label}
                </a>
              ))}
              <Link
                to="/blog"
                className="editorial-label editorial-link text-ink-700 hover:text-ink-900 transition-colors duration-500"
              >
                Blog
              </Link>
              <Link
                to="/feedback"
                className="editorial-label editorial-link text-ink-700 hover:text-ink-900 transition-colors duration-500"
              >
                Contact Us
              </Link>
              <LanguageSwitcher variant="desktop" />
              <a
                href="https://chromewebstore.google.com/detail/read-sidekick/mdcekkbjfgpgobbgffmpjhpkpkgfmdpa"
                target="_blank"
                rel="noopener noreferrer"
                className="px-6 py-2.5 bg-coral-500 text-white font-mono text-body-sm tracking-wide hover:bg-coral-600 transition-colors duration-300 rounded-lg"
              >
                {t.nav.addToChrome}
              </a>
            </div>

            {/* Mobile Menu Toggle */}
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="md:hidden relative w-8 h-8 flex flex-col items-center justify-center gap-1.5"
              aria-label="Toggle menu"
            >
              <motion.span
                animate={{
                  rotate: isMenuOpen ? 45 : 0,
                  y: isMenuOpen ? 6 : 0,
                }}
                transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
                className="w-6 h-px bg-ink-900 origin-center"
              />
              <motion.span
                animate={{ opacity: isMenuOpen ? 0 : 1 }}
                transition={{ duration: 0.2 }}
                className="w-6 h-px bg-ink-900"
              />
              <motion.span
                animate={{
                  rotate: isMenuOpen ? -45 : 0,
                  y: isMenuOpen ? -6 : 0,
                }}
                transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
                className="w-6 h-px bg-ink-900 origin-center"
              />
            </button>
          </div>
        </nav>

        {/* Decorative line */}
        <motion.div
          initial={{ scaleX: 0 }}
          animate={{ scaleX: isScrolled ? 1 : 0 }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="h-px bg-ink-800/10 origin-left"
        />
      </motion.header>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
            className="fixed inset-0 z-40 bg-ivory-100"
          >
            <div className="flex flex-col items-center justify-center h-full gap-8">
              {navItems.map((item, index) => (
                <motion.a
                  key={item.href}
                  href={item.href}
                  onClick={() => setIsMenuOpen(false)}
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -30 }}
                  transition={{
                    duration: 0.6,
                    delay: index * 0.1,
                    ease: [0.16, 1, 0.3, 1],
                  }}
                  className="font-serif text-display-sm text-ink-900 hover:text-coral-500 transition-colors duration-500"
                >
                  {item.label}
                </motion.a>
              ))}
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -30 }}
                transition={{
                  duration: 0.6,
                  delay: navItems.length * 0.1,
                  ease: [0.16, 1, 0.3, 1],
                }}
              >
                <Link
                  to="/blog"
                  onClick={() => setIsMenuOpen(false)}
                  className="font-serif text-display-sm text-ink-900 hover:text-coral-500 transition-colors duration-500"
                >
                  Blog
                </Link>
              </motion.div>
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -30 }}
                transition={{
                  duration: 0.6,
                  delay: (navItems.length + 1) * 0.1,
                  ease: [0.16, 1, 0.3, 1],
                }}
              >
                <Link
                  to="/feedback"
                  onClick={() => setIsMenuOpen(false)}
                  className="font-serif text-display-sm text-ink-900 hover:text-coral-500 transition-colors duration-500"
                >
                  Contact Us
                </Link>
              </motion.div>
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -30 }}
                transition={{
                  duration: 0.6,
                  delay: (navItems.length + 2) * 0.1,
                  ease: [0.16, 1, 0.3, 1],
                }}
                className="mt-4"
              >
                <LanguageSwitcher variant="mobile" />
              </motion.div>
              <motion.a
                href="https://chromewebstore.google.com/detail/read-sidekick/mdcekkbjfgpgobbgffmpjhpkpkgfmdpa"
                target="_blank"
                rel="noopener noreferrer"
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -30 }}
                transition={{
                  duration: 0.6,
                  delay: (navItems.length + 3) * 0.1,
                  ease: [0.16, 1, 0.3, 1],
                }}
                className="mt-4 px-8 py-3 bg-coral-500 text-white font-mono text-body-md tracking-wide rounded-lg"
              >
                {t.nav.addToChromeFree}
              </motion.a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
