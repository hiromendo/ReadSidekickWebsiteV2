import { motion } from 'framer-motion'
import { useScrollReveal } from '../hooks/useScrollReveal'
import { useLanguage } from '../i18n'

interface PointCardProps {
  icon: React.ReactNode
  title: string
  description: string
  delay: number
}

function PointCard({ icon, title, description, delay }: PointCardProps) {
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
      className="group relative bg-white p-6 md:p-8 rounded-xl border border-ink-800/10 hover:border-teal-500/30 hover:shadow-lg transition-all duration-300"
    >
      {/* Icon */}
      <div className="w-12 h-12 mb-6 flex items-center justify-center bg-teal-500/10 rounded-xl text-teal-600 group-hover:bg-teal-500 group-hover:text-white transition-colors duration-300">
        {icon}
      </div>

      {/* Title */}
      <h3 className="font-serif text-xl md:text-2xl text-ink-900 mb-3">
        {title}
      </h3>

      {/* Description */}
      <p className="font-mono text-body-sm text-ink-700/70 leading-relaxed">
        {description}
      </p>
    </motion.div>
  )
}

export function WhyItMatters() {
  const { t } = useLanguage()

  const { ref: sectionRef, isInView: sectionInView } = useScrollReveal<HTMLElement>({
    threshold: 0.1,
  })

  const { ref: headerRef, isInView: headerInView } = useScrollReveal<HTMLDivElement>({
    threshold: 0.3,
  })

  const points = [
    {
      icon: (
        <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M8.625 12a.375.375 0 11-.75 0 .375.375 0 01.75 0zm0 0H8.25m4.125 0a.375.375 0 11-.75 0 .375.375 0 01.75 0zm0 0H12m4.125 0a.375.375 0 11-.75 0 .375.375 0 01.75 0zm0 0h-.375M21 12c0 4.556-4.03 8.25-9 8.25a9.764 9.764 0 01-2.555-.337A5.972 5.972 0 015.41 20.97a5.969 5.969 0 01-.474-.065 4.48 4.48 0 00.978-2.025c.09-.457-.133-.901-.467-1.226C3.93 16.178 3 14.189 3 12c0-4.556 4.03-8.25 9-8.25s9 3.694 9 8.25z" />
        </svg>
      ),
      title: t.whyItMatters.points.languageInterface.title,
      description: t.whyItMatters.points.languageInterface.description,
    },
    {
      icon: (
        <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v3.75m-9.303 3.376c-.866 1.5.217 3.374 1.948 3.374h14.71c1.73 0 2.813-1.874 1.948-3.374L13.949 3.378c-.866-1.5-3.032-1.5-3.898 0L2.697 16.126zM12 15.75h.007v.008H12v-.008z" />
        </svg>
      ),
      title: t.whyItMatters.points.costMisunderstanding.title,
      description: t.whyItMatters.points.costMisunderstanding.description,
    },
    {
      icon: (
        <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M9.813 15.904L9 18.75l-.813-2.846a4.5 4.5 0 00-3.09-3.09L2.25 12l2.846-.813a4.5 4.5 0 003.09-3.09L9 5.25l.813 2.846a4.5 4.5 0 003.09 3.09L15.75 12l-2.846.813a4.5 4.5 0 00-3.09 3.09zM18.259 8.715L18 9.75l-.259-1.035a3.375 3.375 0 00-2.455-2.456L14.25 6l1.036-.259a3.375 3.375 0 002.455-2.456L18 2.25l.259 1.035a3.375 3.375 0 002.456 2.456L21.75 6l-1.035.259a3.375 3.375 0 00-2.456 2.456zM16.894 20.567L16.5 21.75l-.394-1.183a2.25 2.25 0 00-1.423-1.423L13.5 18.75l1.183-.394a2.25 2.25 0 001.423-1.423l.394-1.183.394 1.183a2.25 2.25 0 001.423 1.423l1.183.394-1.183.394a2.25 2.25 0 00-1.423 1.423z" />
        </svg>
      ),
      title: t.whyItMatters.points.structuredThinking.title,
      description: t.whyItMatters.points.structuredThinking.description,
    },
    {
      icon: (
        <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 18L9 11.25l4.306 4.307a11.95 11.95 0 015.814-5.519l2.74-1.22m0 0l-5.94-2.28m5.94 2.28l-2.28 5.941" />
        </svg>
      ),
      title: t.whyItMatters.points.workforceUpskilling.title,
      description: t.whyItMatters.points.workforceUpskilling.description,
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
        <span className="section-number">02</span>
      </motion.div>

      {/* Large background text */}
      <div className="absolute top-1/2 -translate-y-1/2 -right-20 pointer-events-none select-none">
        <span className="font-serif text-[15vw] text-ink-800/[0.02] font-medium tracking-tight">
          AI
        </span>
      </div>

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
            {t.whyItMatters.sectionLabel}
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
            {t.whyItMatters.title}{' '}
            <span className="italic">{t.whyItMatters.titleItalic}</span>
          </motion.h2>
        </div>

        {/* Points grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8">
          {points.map((point, index) => (
            <PointCard
              key={point.title}
              {...point}
              delay={0.1 + index * 0.1}
            />
          ))}
        </div>
      </div>

      {/* Background decorative line */}
      <div className="absolute bottom-0 left-0 right-0 h-px bg-ink-800/10" />
    </section>
  )
}
