import { motion } from 'framer-motion'
import { useScrollReveal } from '../hooks/useScrollReveal'
import { useLanguage } from '../i18n'

interface PillarCardProps {
  number: string
  title: string
  description: string
  delay: number
}

function PillarCard({ number, title, description, delay }: PillarCardProps) {
  const { ref, isInView } = useScrollReveal<HTMLDivElement>({ threshold: 0.3 })

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 50 }}
      animate={{
        opacity: isInView ? 1 : 0,
        y: isInView ? 0 : 50,
      }}
      transition={{ duration: 0.8, delay, ease: [0.16, 1, 0.3, 1] }}
      className="relative"
    >
      {/* Connecting line for desktop */}
      <div className="hidden md:block absolute top-8 left-full w-full h-px bg-ink-800/10 -translate-y-1/2 last:hidden" />

      <div className="relative bg-white p-6 md:p-8 rounded-xl border border-ink-800/10 hover:shadow-lg transition-all duration-300">
        {/* Number badge */}
        <div className="absolute -top-3 -left-3 w-10 h-10 bg-coral-500 rounded-full flex items-center justify-center">
          <span className="font-mono text-sm text-white font-medium">{number}</span>
        </div>

        {/* Content */}
        <div className="pt-4">
          <h3 className="font-serif text-xl md:text-2xl text-ink-900 mb-3">
            {title}
          </h3>
          <p className="font-mono text-body-sm text-ink-700/70 leading-relaxed">
            {description}
          </p>
        </div>
      </div>
    </motion.div>
  )
}

export function Methodology() {
  const { t } = useLanguage()

  const { ref: sectionRef, isInView: sectionInView } = useScrollReveal<HTMLElement>({
    threshold: 0.1,
  })

  const { ref: headerRef, isInView: headerInView } = useScrollReveal<HTMLDivElement>({
    threshold: 0.3,
  })

  const { ref: creditsRef, isInView: creditsInView } = useScrollReveal<HTMLDivElement>({
    threshold: 0.3,
  })

  const pillars = [
    {
      number: '01',
      title: t.methodology.pillars.first.title,
      description: t.methodology.pillars.first.description,
    },
    {
      number: '02',
      title: t.methodology.pillars.second.title,
      description: t.methodology.pillars.second.description,
    },
    {
      number: '03',
      title: t.methodology.pillars.third.title,
      description: t.methodology.pillars.third.description,
    },
  ]

  return (
    <section
      id="methodology"
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
        <span className="section-number">04</span>
      </motion.div>

      <div className="editorial-container relative z-10">
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
            {t.methodology.sectionLabel}
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
            {t.methodology.title}{' '}
            <span className="italic">{t.methodology.titleItalic}</span>
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
            {t.methodology.subtitle}
          </motion.p>
        </div>

        {/* Three Pillars */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-6 lg:gap-8 mb-16 md:mb-24">
          {pillars.map((pillar, index) => (
            <PillarCard
              key={pillar.number}
              {...pillar}
              delay={0.1 + index * 0.15}
            />
          ))}
        </div>

        {/* Visual bridge metaphor */}
        <motion.div
          initial={{ opacity: 0, scaleX: 0 }}
          whileInView={{ opacity: 1, scaleX: 1 }}
          transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
          viewport={{ once: true }}
          className="hidden md:flex items-center justify-center gap-4 mb-16 origin-left"
        >
          <div className="w-20 h-1 bg-coral-500/30 rounded-full" />
          <div className="w-4 h-4 bg-coral-500 rounded-full" />
          <div className="flex-1 h-px bg-gradient-to-r from-coral-500 via-ochre-400 to-teal-500" />
          <div className="w-4 h-4 bg-teal-500 rounded-full" />
          <div className="w-20 h-1 bg-teal-500/30 rounded-full" />
        </motion.div>

        {/* Credibility Note */}
        <motion.div
          ref={creditsRef}
          initial={{ opacity: 0, y: 40 }}
          animate={{
            opacity: creditsInView ? 1 : 0,
            y: creditsInView ? 0 : 40,
          }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="bg-white rounded-xl p-6 md:p-8 border border-ink-800/10"
        >
          <div className="flex items-start gap-4">
            <div className="w-10 h-10 bg-teal-500/10 rounded-full flex items-center justify-center flex-shrink-0">
              <svg className="w-5 h-5 text-teal-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M4.26 10.147a60.436 60.436 0 00-.491 6.347A48.627 48.627 0 0112 20.904a48.627 48.627 0 018.232-4.41 60.46 60.46 0 00-.491-6.347m-15.482 0a50.57 50.57 0 00-2.658-.813A59.905 59.905 0 0112 3.493a59.902 59.902 0 0110.399 5.84c-.896.248-1.783.52-2.658.814m-15.482 0A50.697 50.697 0 0112 13.489a50.702 50.702 0 017.74-3.342M6.75 15a.75.75 0 100-1.5.75.75 0 000 1.5zm0 0v-3.675A55.378 55.378 0 0112 8.443m-7.007 11.55A5.981 5.981 0 006.75 15.75v-1.5" />
              </svg>
            </div>
            <div>
              <span className="editorial-label text-ink-700/50 block mb-2">{t.methodology.research.label}</span>
              <p className="font-mono text-body-md text-ink-700/80 leading-relaxed">
                {t.methodology.research.description}
              </p>
            </div>
          </div>
        </motion.div>
      </div>

      {/* Background decorative line */}
      <div className="absolute bottom-0 left-0 right-0 h-px bg-ink-800/10" />
    </section>
  )
}
