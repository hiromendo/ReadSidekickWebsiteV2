import { motion } from 'framer-motion'
import { useScrollReveal } from '../hooks/useScrollReveal'
import { useLanguage } from '../i18n'

export function Founder() {
  const { t } = useLanguage()

  const { ref: sectionRef, isInView: sectionInView } = useScrollReveal<HTMLElement>({
    threshold: 0.1,
  })

  const { ref: contentRef, isInView: contentInView } = useScrollReveal<HTMLDivElement>({
    threshold: 0.3,
  })

  return (
    <section
      id="about"
      ref={sectionRef}
      className="relative py-editorial bg-ivory-100 overflow-hidden"
    >
      {/* Section number */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: sectionInView ? 1 : 0 }}
        transition={{ duration: 1, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
        className="absolute top-20 left-6 md:left-12 lg:left-20"
      >
        <span className="section-number">07</span>
      </motion.div>

      <div className="editorial-container relative z-10">
        <div ref={contentRef} className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          {/* Photo placeholder */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{
              opacity: contentInView ? 1 : 0,
              x: contentInView ? 0 : -50,
            }}
            transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
            className="lg:col-span-4"
          >
            <div className="relative max-w-xs mx-auto lg:mx-0">
              {/* Photo frame */}
              <div className="aspect-square bg-ink-800/5 rounded-2xl overflow-hidden relative">
                <img
                  src="/founder.jpg"
                  alt="Hiroshi Miyamoto"
                  className="absolute inset-0 w-full h-full object-cover"
                />

                {/* Decorative corner accent */}
                <div className="absolute bottom-0 right-0 w-16 h-16 bg-coral-500" />
              </div>

              {/* Decorative frame offset */}
              <div className="absolute -bottom-4 -right-4 w-full h-full border-2 border-ink-800/10 rounded-2xl -z-10" />
            </div>
          </motion.div>

          {/* Bio content */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={{
              opacity: contentInView ? 1 : 0,
              x: contentInView ? 0 : 50,
            }}
            transition={{ duration: 1, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
            className="lg:col-span-8"
          >
            <span className="editorial-label block mb-6">{t.founder.sectionLabel}</span>

            <h2 className="font-serif text-display-md md:text-display-lg text-ink-900 mb-4">
              {t.founder.title}{' '}
              <span className="italic">{t.founder.titleItalic}</span>
            </h2>

            <h3 className="font-serif text-2xl md:text-3xl text-coral-500 mb-6">
              {t.founder.name}
            </h3>

            <div className="space-y-4 mb-8">
              {t.founder.bio.map((paragraph, index) => (
                <p key={index} className="font-mono text-body-md text-ink-700/80 leading-relaxed">
                  {paragraph}
                </p>
              ))}
            </div>

            {/* Credentials */}
            <div className="bg-ivory-50 rounded-xl p-6 border border-ink-800/10">
              <span className="editorial-label text-ink-700/50 block mb-3">{t.founder.credentials.label}</span>
              <div className="flex flex-wrap gap-x-6 gap-y-2">
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 bg-coral-500 rounded-full" />
                  <span className="font-mono text-body-sm text-ink-700">
                    {t.founder.credentials.mit}
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 bg-teal-500 rounded-full" />
                  <span className="font-mono text-body-sm text-ink-700">
                    {t.founder.credentials.stanford}
                  </span>
                </div>
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
