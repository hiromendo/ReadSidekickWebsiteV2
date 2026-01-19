import { motion } from 'framer-motion'
import { useScrollReveal } from '../hooks/useScrollReveal'
import { useLanguage } from '../i18n'

interface StatDisplayProps {
  value: string
  label: string
  description: string
  delay: number
}

function StatDisplay({ value, label, description, delay }: StatDisplayProps) {
  const { ref, isInView } = useScrollReveal<HTMLDivElement>({ threshold: 0.3 })

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 40 }}
      animate={{
        opacity: isInView ? 1 : 0,
        y: isInView ? 0 : 40,
      }}
      transition={{ duration: 0.8, delay, ease: [0.16, 1, 0.3, 1] }}
      className="text-center p-6 md:p-8"
    >
      <span className="block font-serif text-display-md md:text-display-lg text-coral-500 mb-2">
        {value}
      </span>
      <span className="block font-mono text-body-md text-ink-900 font-medium mb-1">
        {label}
      </span>
      <span className="block font-mono text-body-sm text-ink-700/60">
        {description}
      </span>
    </motion.div>
  )
}

export function SocialProof() {
  const { t } = useLanguage()

  const { ref: sectionRef, isInView: sectionInView } = useScrollReveal<HTMLElement>({
    threshold: 0.1,
  })

  const { ref: headerRef, isInView: headerInView } = useScrollReveal<HTMLDivElement>({
    threshold: 0.3,
  })

  const { ref: calloutRef, isInView: calloutInView } = useScrollReveal<HTMLDivElement>({
    threshold: 0.3,
  })

  const stats = [
    {
      value: t.socialProof.stats.uses.value,
      label: t.socialProof.stats.uses.label,
      description: t.socialProof.stats.uses.description,
    },
    {
      value: t.socialProof.stats.words.value,
      label: t.socialProof.stats.words.label,
      description: t.socialProof.stats.words.description,
    },
    {
      value: t.socialProof.stats.installs.value,
      label: t.socialProof.stats.installs.label,
      description: t.socialProof.stats.installs.description,
    },
    {
      value: t.socialProof.stats.engagement.value,
      label: t.socialProof.stats.engagement.label,
      description: t.socialProof.stats.engagement.description,
    },
  ]

  return (
    <section
      ref={sectionRef}
      className="relative py-editorial bg-ivory-200 overflow-hidden"
    >
      {/* Section number */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: sectionInView ? 1 : 0 }}
        transition={{ duration: 1, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
        className="absolute top-20 left-6 md:left-12 lg:left-20"
      >
        <span className="section-number">06</span>
      </motion.div>

      <div className="editorial-container relative z-10">
        {/* Section header */}
        <div ref={headerRef} className="mb-12 md:mb-16 text-center max-w-2xl mx-auto">
          <motion.span
            initial={{ opacity: 0, y: 20 }}
            animate={{
              opacity: headerInView ? 1 : 0,
              y: headerInView ? 0 : 20,
            }}
            transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
            className="editorial-label block mb-6"
          >
            {t.socialProof.sectionLabel}
          </motion.span>

          <motion.h2
            initial={{ opacity: 0, y: 40 }}
            animate={{
              opacity: headerInView ? 1 : 0,
              y: headerInView ? 0 : 40,
            }}
            transition={{ duration: 1.2, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
            className="font-serif text-display-md md:text-display-lg text-ink-900"
          >
            {t.socialProof.title}{' '}
            <span className="italic">{t.socialProof.titleItalic}</span>
          </motion.h2>
        </div>

        {/* Stats grid */}
        <div className="bg-white rounded-2xl shadow-lg border border-ink-800/10 overflow-hidden mb-12">
          <div className="grid grid-cols-2 md:grid-cols-4 divide-x divide-y md:divide-y-0 divide-ink-800/10">
            {stats.map((stat, index) => (
              <StatDisplay
                key={stat.label}
                {...stat}
                delay={0.1 + index * 0.1}
              />
            ))}
          </div>
        </div>

        {/* Engagement callout */}
        <motion.div
          ref={calloutRef}
          initial={{ opacity: 0, y: 40 }}
          animate={{
            opacity: calloutInView ? 1 : 0,
            y: calloutInView ? 0 : 40,
          }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="relative bg-ink-900 rounded-xl p-6 md:p-8 text-center overflow-hidden"
        >
          {/* Decorative accent */}
          <div className="absolute top-0 left-0 w-2 h-full bg-coral-500" />

          <p className="font-mono text-body-md md:text-body-lg text-ivory-100/90 leading-relaxed">
            {t.socialProof.callout}
          </p>
        </motion.div>
      </div>

      {/* Background decorative line */}
      <div className="absolute bottom-0 left-0 right-0 h-px bg-ink-800/10" />
    </section>
  )
}
