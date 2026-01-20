import { motion } from 'framer-motion'
import { Globe, TrendingUp, CheckCircle } from 'lucide-react'
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

export function Confidence() {
  const { t } = useLanguage()

  const { ref: sectionRef, isInView: sectionInView } = useScrollReveal<HTMLElement>({
    threshold: 0.1,
  })

  const { ref: headerRef, isInView: headerInView } = useScrollReveal<HTMLDivElement>({
    threshold: 0.3,
  })

  const points = [
    {
      icon: <Globe className="w-6 h-6" strokeWidth={1.5} />,
      title: t.confidence.points.masterMessage.title,
      description: t.confidence.points.masterMessage.description,
    },
    {
      icon: <TrendingUp className="w-6 h-6" strokeWidth={1.5} />,
      title: t.confidence.points.boostCareer.title,
      description: t.confidence.points.boostCareer.description,
    },
    {
      icon: <CheckCircle className="w-6 h-6" strokeWidth={1.5} />,
      title: t.confidence.points.readConfidence.title,
      description: t.confidence.points.readConfidence.description,
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
          READ
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
            {t.confidence.sectionLabel}
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
            {t.confidence.headline}
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
            {t.confidence.subheadline}
          </motion.p>
        </div>

        {/* Points grid - 3 columns on desktop */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8">
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
