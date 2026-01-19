import { motion } from 'framer-motion'
import { useScrollReveal } from '../hooks/useScrollReveal'
import { useLanguage } from '../i18n'

export function Problem() {
  const { t } = useLanguage()

  const { ref: sectionRef, isInView: sectionInView } = useScrollReveal<HTMLElement>({
    threshold: 0.1,
  })

  const { ref: headerRef, isInView: headerInView } = useScrollReveal<HTMLDivElement>({
    threshold: 0.3,
  })

  const { ref: comparisonRef, isInView: comparisonInView } = useScrollReveal<HTMLDivElement>({
    threshold: 0.3,
  })

  return (
    <section
      id="problem"
      ref={sectionRef}
      className="relative py-editorial bg-ivory-50 overflow-hidden"
    >
      {/* Section number */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: sectionInView ? 1 : 0 }}
        transition={{ duration: 1, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
        className="absolute top-20 left-6 md:left-12 lg:left-20"
      >
        <span className="section-number">01</span>
      </motion.div>

      <div className="editorial-container">
        {/* Section header */}
        <div ref={headerRef} className="mb-16 md:mb-24 max-w-3xl">
          <motion.span
            initial={{ opacity: 0, y: 20 }}
            animate={{
              opacity: headerInView ? 1 : 0,
              y: headerInView ? 0 : 20,
            }}
            transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
            className="editorial-label block mb-6"
          >
            {t.problem.sectionLabel}
          </motion.span>

          <motion.h2
            initial={{ opacity: 0, y: 40 }}
            animate={{
              opacity: headerInView ? 1 : 0,
              y: headerInView ? 0 : 40,
            }}
            transition={{ duration: 1.2, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
            className="font-serif text-display-md md:text-display-lg text-ink-900 mb-6"
          >
            {t.problem.title}
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={{
              opacity: headerInView ? 1 : 0,
              y: headerInView ? 0 : 30,
            }}
            transition={{ duration: 1, delay: 0.4, ease: [0.16, 1, 0.3, 1] }}
            className="font-mono text-body-lg text-ink-700/80 leading-relaxed"
          >
            {t.problem.subtitle}
          </motion.p>
        </div>

        {/* Before/After comparison */}
        <div ref={comparisonRef} className="relative">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-8 items-stretch">
            {/* Before card */}
            <motion.div
              initial={{ opacity: 0, x: -40 }}
              animate={{
                opacity: comparisonInView ? 1 : 0,
                x: comparisonInView ? 0 : -40,
              }}
              transition={{ duration: 0.8, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
              className="bg-white rounded-xl p-6 md:p-8 border-l-4 border-coral-500 shadow-sm"
            >
              <span className="inline-block font-mono text-caption uppercase tracking-wider text-coral-500 bg-coral-50 px-3 py-1 rounded-full mb-4">
                {t.problem.beforeAfter.beforeLabel}
              </span>
              <p className="font-mono text-body-sm text-ink-700/70 leading-relaxed">
                {t.problem.beforeAfter.beforeText}
              </p>
            </motion.div>

            {/* Arrow - visible on desktop between cards */}
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{
                opacity: comparisonInView ? 1 : 0,
                scale: comparisonInView ? 1 : 0.8,
              }}
              transition={{ duration: 0.6, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
              className="hidden lg:flex absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 z-10"
            >
              <div className="bg-teal-500 rounded-full p-3 shadow-lg">
                <svg className="w-6 h-6 text-white" fill="none" viewBox="0 0 24 24">
                  <path
                    d="M5 12h14m0 0l-6-6m6 6l-6 6"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </div>
            </motion.div>

            {/* Arrow - visible on mobile between cards */}
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{
                opacity: comparisonInView ? 1 : 0,
                scale: comparisonInView ? 1 : 0.8,
              }}
              transition={{ duration: 0.6, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
              className="flex lg:hidden justify-center -my-2"
            >
              <div className="bg-teal-500 rounded-full p-2">
                <svg className="w-5 h-5 text-white" fill="none" viewBox="0 0 24 24">
                  <path
                    d="M12 5v14m0 0l-6-6m6 6l6-6"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </div>
            </motion.div>

            {/* After card */}
            <motion.div
              initial={{ opacity: 0, x: 40 }}
              animate={{
                opacity: comparisonInView ? 1 : 0,
                x: comparisonInView ? 0 : 40,
              }}
              transition={{ duration: 0.8, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
              className="bg-white rounded-xl p-6 md:p-8 border-l-4 border-teal-500 shadow-sm"
            >
              <span className="inline-block font-mono text-caption uppercase tracking-wider text-teal-600 bg-teal-50 px-3 py-1 rounded-full mb-4">
                {t.problem.beforeAfter.afterLabel}
              </span>
              <p className="font-mono text-body-md text-ink-900 leading-relaxed font-medium">
                {t.problem.beforeAfter.afterText}
              </p>
            </motion.div>
          </div>

          {/* Caption */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{
              opacity: comparisonInView ? 1 : 0,
              y: comparisonInView ? 0 : 20,
            }}
            transition={{ duration: 0.8, delay: 0.5, ease: [0.16, 1, 0.3, 1] }}
            className="text-center font-serif text-body-lg text-ink-700/60 italic mt-8 md:mt-12"
          >
            "{t.problem.beforeAfter.caption}"
          </motion.p>
        </div>
      </div>

      {/* Background decorative line */}
      <div className="absolute bottom-0 left-0 right-0 h-px bg-ink-800/10" />
    </section>
  )
}
