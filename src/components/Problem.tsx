import { motion } from 'framer-motion'
import { useScrollReveal } from '../hooks/useScrollReveal'
import { useLanguage } from '../i18n'

interface StatCardProps {
  stat: string
  description: string
  delay: number
}

function StatCard({ stat, description, delay }: StatCardProps) {
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
      className="relative bg-white p-6 md:p-8 rounded-xl border border-ink-800/10 hover:border-coral-500/30 transition-colors duration-300"
    >
      <span className="block font-serif text-display-md md:text-display-lg text-coral-500 mb-2">
        {stat}
      </span>
      <p className="font-mono text-body-sm text-ink-700/70 leading-relaxed">
        {description}
      </p>
    </motion.div>
  )
}

export function Problem() {
  const { t } = useLanguage()

  const { ref: sectionRef, isInView: sectionInView } = useScrollReveal<HTMLElement>({
    threshold: 0.1,
  })

  const { ref: headerRef, isInView: headerInView } = useScrollReveal<HTMLDivElement>({
    threshold: 0.3,
  })

  const { ref: impactRef, isInView: impactInView } = useScrollReveal<HTMLDivElement>({
    threshold: 0.3,
  })

  const stats = [
    {
      stat: t.problem.stats.adults.stat,
      description: t.problem.stats.adults.description,
    },
    {
      stat: t.problem.stats.deaf.stat,
      description: t.problem.stats.deaf.description,
    },
    {
      stat: t.problem.stats.inmates.stat,
      description: t.problem.stats.inmates.description,
    },
    {
      stat: t.problem.stats.immigrants.stat,
      description: t.problem.stats.immigrants.description,
    },
  ]

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

        {/* Stats grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-16 md:mb-24">
          {stats.map((stat, index) => (
            <StatCard
              key={stat.stat}
              {...stat}
              delay={0.1 + index * 0.1}
            />
          ))}
        </div>

        {/* Economic Impact Section */}
        <div ref={impactRef} className="relative">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{
              opacity: impactInView ? 1 : 0,
              y: impactInView ? 0 : 50,
            }}
            transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
            className="bg-ink-900 rounded-2xl p-8 md:p-12 lg:p-16 text-white overflow-hidden relative"
          >
            {/* Decorative accent */}
            <div className="absolute top-0 right-0 w-32 h-32 md:w-48 md:h-48 bg-coral-500/20 rounded-full -translate-y-1/2 translate-x-1/2" />

            <div className="relative z-10">
              <span className="editorial-label text-coral-400 block mb-4">
                {t.problem.economicImpact.label}
              </span>

              <h3 className="font-serif text-display-sm md:text-display-md text-white mb-6">
                <span className="text-coral-400">{t.problem.economicImpact.titleHighlight}</span> {t.problem.economicImpact.title}
              </h3>

              <p className="font-mono text-body-md text-ivory-100/70 leading-relaxed max-w-2xl mb-8">
                {t.problem.economicImpact.description}
              </p>

              {/* Income comparison */}
              <div className="bg-white/10 rounded-xl p-6 md:p-8">
                <p className="font-mono text-body-sm text-ivory-100/60 mb-6">
                  {t.problem.economicImpact.correlationLabel}
                </p>

                <div className="flex flex-col md:flex-row items-center gap-4 md:gap-8">
                  {/* Low literacy */}
                  <div className="flex-1 text-center md:text-left">
                    <span className="font-serif text-display-sm text-ivory-100/50">$34,127</span>
                    <p className="font-mono text-caption text-ivory-100/40 mt-1">
                      {t.problem.economicImpact.lowestLiteracy}
                    </p>
                  </div>

                  {/* Arrow */}
                  <div className="hidden md:block">
                    <svg className="w-16 h-8 text-coral-500" fill="none" viewBox="0 0 64 32">
                      <path
                        d="M0 16h56m0 0l-8-8m8 8l-8 8"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                  </div>
                  <div className="md:hidden text-coral-500 text-2xl">&#8595;</div>

                  {/* High literacy */}
                  <div className="flex-1 text-center md:text-right">
                    <span className="font-serif text-display-sm text-coral-400">$73,284</span>
                    <p className="font-mono text-caption text-ivory-100/40 mt-1">
                      {t.problem.economicImpact.highestLiteracy}
                    </p>
                  </div>
                </div>

                <p className="font-mono text-body-sm text-ivory-100/60 mt-6 text-center">
                  {t.problem.economicImpact.comparison} <span className="text-coral-400 font-medium">{t.problem.economicImpact.comparisonHighlight}</span> the annual income
                </p>
              </div>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Background decorative line */}
      <div className="absolute bottom-0 left-0 right-0 h-px bg-ink-800/10" />
    </section>
  )
}
