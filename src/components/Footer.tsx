import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { useScrollReveal } from '../hooks/useScrollReveal'
import { useLanguage } from '../i18n'

export function Footer() {
  const { t } = useLanguage()

  const { ref: ctaRef, isInView: ctaInView } = useScrollReveal<HTMLDivElement>({
    threshold: 0.2,
  })

  const { ref: footerRef, isInView: footerInView } = useScrollReveal<HTMLElement>({
    threshold: 0.3,
  })

  const navItems = [
    { label: t.nav.problem, href: '/#problem' },
    { label: t.nav.howItWorks, href: '/#how-it-works' },
    { label: t.nav.methodology, href: '/#methodology' },
    { label: t.nav.about, href: '/#about' },
  ]

  return (
    <>
      {/* CTA Section */}
      <section
        ref={ctaRef}
        className="relative py-editorial bg-ivory-50 overflow-hidden"
      >
        {/* Literacy-themed decorative elements */}

        {/* Open Book Silhouette (top-right) */}
        <motion.svg
          initial={{ scale: 0, opacity: 0 }}
          animate={{ scale: ctaInView ? 1 : 0, opacity: ctaInView ? 1 : 0 }}
          transition={{ duration: 1, delay: 0.5, ease: [0.16, 1, 0.3, 1] }}
          className="absolute top-[8%] right-[3%] w-32 h-24 md:w-56 md:h-40 pointer-events-none"
          viewBox="0 0 120 80"
          fill="none"
        >
          {/* Left page */}
          <path
            d="M60 15 Q35 10, 10 20 L10 70 Q35 60, 60 65 Z"
            className="fill-coral-500/15 stroke-coral-500/20"
            strokeWidth="1"
          />
          {/* Right page */}
          <path
            d="M60 15 Q85 10, 110 20 L110 70 Q85 60, 60 65 Z"
            className="fill-coral-500/15 stroke-coral-500/20"
            strokeWidth="1"
          />
          {/* Spine */}
          <path
            d="M60 15 L60 65"
            className="stroke-coral-500/25"
            strokeWidth="1.5"
          />
          {/* Text lines on left page */}
          <path d="M20 30 L50 28" className="stroke-coral-500/10" strokeWidth="1" />
          <path d="M22 38 L48 36" className="stroke-coral-500/10" strokeWidth="1" />
          <path d="M24 46 L46 44" className="stroke-coral-500/10" strokeWidth="1" />
          {/* Text lines on right page */}
          <path d="M70 28 L100 30" className="stroke-coral-500/10" strokeWidth="1" />
          <path d="M72 36 L98 38" className="stroke-coral-500/10" strokeWidth="1" />
          <path d="M74 44 L96 46" className="stroke-coral-500/10" strokeWidth="1" />
        </motion.svg>

        {/* Warm Glow Accent (bottom-left) - softer radial gradient */}
        <motion.div
          initial={{ scale: 0, opacity: 0 }}
          animate={{ scale: ctaInView ? 1 : 0, opacity: ctaInView ? 0.7 : 0 }}
          transition={{ duration: 1, delay: 0.7, ease: [0.16, 1, 0.3, 1] }}
          className="absolute bottom-[12%] left-[8%] w-24 h-24 md:w-40 md:h-40 pointer-events-none"
        >
          {/* Outer soft glow */}
          <div className="absolute inset-0 rounded-full bg-gradient-radial from-ochre-400/30 via-ochre-400/10 to-transparent blur-xl" />
          {/* Inner warm core */}
          <div className="absolute inset-[30%] rounded-full bg-gradient-radial from-ochre-400/50 via-ochre-400/15 to-transparent blur-md" />
        </motion.div>

        <div className="editorial-container relative z-10">
          <div className="max-w-3xl mx-auto text-center">
            {/* Main heading */}
            <motion.h2
              initial={{ opacity: 0, y: 50 }}
              animate={{
                opacity: ctaInView ? 1 : 0,
                y: ctaInView ? 0 : 50,
              }}
              transition={{ duration: 1.2, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
              className="font-serif text-display-lg md:text-display-xl text-ink-900 mb-6"
            >
              {t.footer.cta.title}{' '}
              <span className="italic">{t.footer.cta.titleItalic}</span>
            </motion.h2>

            {/* Subheadline */}
            <motion.p
              initial={{ opacity: 0, y: 30 }}
              animate={{
                opacity: ctaInView ? 1 : 0,
                y: ctaInView ? 0 : 30,
              }}
              transition={{ duration: 1, delay: 0.4, ease: [0.16, 1, 0.3, 1] }}
              className="font-mono text-body-lg text-ink-700/80 leading-relaxed mb-10"
            >
              {t.footer.cta.subtitle}
            </motion.p>

            {/* CTA Buttons */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{
                opacity: ctaInView ? 1 : 0,
                y: ctaInView ? 0 : 20,
              }}
              transition={{ duration: 1, delay: 0.6, ease: [0.16, 1, 0.3, 1] }}
              className="flex flex-col sm:flex-row items-center justify-center gap-4"
            >
              <a
                href="https://chromewebstore.google.com/detail/read-sidekick/mdcekkbjfgpgobbgffmpjhpkpkgfmdpa"
                target="_blank"
                rel="noopener noreferrer"
                className="group inline-flex items-center gap-3 px-8 py-4 bg-coral-500 text-white font-mono text-body-md tracking-wide hover:bg-coral-600 transition-all duration-300 rounded-lg shadow-lg hover:shadow-xl"
              >
                <svg className="w-6 h-6" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M12 0C8.21 0 4.831 1.757 2.632 4.501l3.953 6.848A5.454 5.454 0 0 1 12 6.545h10.691A12 12 0 0 0 12 0zM1.931 5.47A11.943 11.943 0 0 0 0 12c0 6.012 4.42 10.991 10.189 11.864l3.953-6.847a5.45 5.45 0 0 1-6.865-2.29zm13.342 2.166a5.446 5.446 0 0 1 1.45 7.09l.002.001h-.002l-3.952 6.848a12.014 12.014 0 0 0 9.229-9.105zM12 16.364a4.364 4.364 0 1 1 0-8.728 4.364 4.364 0 0 1 0 8.728z"/>
                </svg>
                <span>{t.footer.cta.button}</span>
              </a>

              <a
                href="/#methodology"
                className="font-mono text-body-md text-ink-700 hover:text-coral-500 transition-colors duration-300 underline underline-offset-4"
              >
                {t.footer.cta.learnMore}
              </a>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer
        ref={footerRef}
        className="relative py-16 bg-ink-950 overflow-hidden"
      >
        <div className="editorial-container">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8">
            {/* Logo and tagline */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{
                opacity: footerInView ? 1 : 0,
                y: footerInView ? 0 : 20,
              }}
              transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
              className="lg:col-span-5"
            >
              <div className="flex items-center gap-3">
                <img
                  src="/logo.png"
                  alt="Read Sidekick"
                  className="w-10 h-10 rounded-lg"
                />
                <span className="font-serif text-3xl font-medium text-ivory-100">
                  Read Sidekick
                </span>
              </div>
              <p className="mt-4 font-mono text-body-sm text-ivory-100/50 leading-relaxed">
                {t.footer.tagline}
              </p>
              <p className="mt-2 font-mono text-body-sm text-ivory-100/40 leading-relaxed">
                {t.footer.description}
              </p>
            </motion.div>

            {/* Navigation */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{
                opacity: footerInView ? 1 : 0,
                y: footerInView ? 0 : 20,
              }}
              transition={{ duration: 1, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
              className="lg:col-span-2 lg:col-start-7"
            >
              <span className="editorial-label block mb-4 text-ivory-100/40">
                {t.footer.navigate}
              </span>
              <nav className="space-y-2">
                {navItems.map((item) => (
                  <a
                    key={item.href}
                    href={item.href}
                    className="block font-mono text-body-sm text-ivory-100/60 hover:text-ivory-100 transition-colors duration-300"
                  >
                    {item.label}
                  </a>
                ))}
                <Link
                  to="/feedback"
                  className="block font-mono text-body-sm text-ivory-100/60 hover:text-ivory-100 transition-colors duration-300"
                >
                  Contact Us
                </Link>
                <Link
                  to="/blog"
                  className="block font-mono text-body-sm text-ivory-100/60 hover:text-ivory-100 transition-colors duration-300"
                >
                  Blog
                </Link>
              </nav>
            </motion.div>

            {/* Connect */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{
                opacity: footerInView ? 1 : 0,
                y: footerInView ? 0 : 20,
              }}
              transition={{ duration: 1, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
              className="lg:col-span-2"
            >
              <span className="editorial-label block mb-4 text-ivory-100/40">
                {t.footer.connect}
              </span>
              <div className="space-y-2">
                <a
                  href="https://chromewebstore.google.com/detail/read-sidekick/mdcekkbjfgpgobbgffmpjhpkpkgfmdpa"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block font-mono text-body-sm text-ivory-100/60 hover:text-ivory-100 transition-colors duration-300"
                >
                  Chrome Web Store
                </a>
              </div>
            </motion.div>

            {/* Legal */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{
                opacity: footerInView ? 1 : 0,
                y: footerInView ? 0 : 20,
              }}
              transition={{ duration: 1, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
              className="lg:col-span-2"
            >
              <span className="editorial-label block mb-4 text-ivory-100/40">
                {t.footer.legal}
              </span>
              <div className="space-y-2">
                <Link
                  to="/privacy"
                  className="block font-mono text-body-sm text-ivory-100/60 hover:text-ivory-100 transition-colors duration-300"
                >
                  {t.footer.privacy}
                </Link>
                <Link
                  to="/terms"
                  className="block font-mono text-body-sm text-ivory-100/60 hover:text-ivory-100 transition-colors duration-300"
                >
                  {t.footer.terms}
                </Link>
              </div>
            </motion.div>
          </div>

          {/* Bottom bar */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: footerInView ? 1 : 0 }}
            transition={{ duration: 1, delay: 0.5, ease: [0.16, 1, 0.3, 1] }}
            className="mt-16 pt-8 border-t border-ivory-100/10"
          >
            <div className="flex flex-col md:flex-row items-center justify-between gap-4">
              <p className="font-mono text-caption text-ivory-100/30">
                {t.footer.copyright}
              </p>
              <p className="font-mono text-caption text-ivory-100/30">
                {t.footer.tagline}
              </p>
            </div>
          </motion.div>
        </div>

        {/* Decorative coral accent */}
        <motion.div
          initial={{ scaleX: 0 }}
          animate={{ scaleX: footerInView ? 1 : 0 }}
          transition={{ duration: 1.5, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
          className="absolute bottom-0 left-0 w-1/3 h-1 bg-coral-500 origin-left"
        />
      </footer>
    </>
  )
}
