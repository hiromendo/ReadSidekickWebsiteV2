import { motion } from 'framer-motion'
import { useScrollReveal } from '../hooks/useScrollReveal'

export function Feedback() {
  const { ref: sectionRef, isInView: sectionInView } = useScrollReveal<HTMLElement>({
    threshold: 0.1,
  })

  return (
    <section
      ref={sectionRef}
      className="relative py-editorial bg-ivory-100 overflow-hidden min-h-screen"
    >
      <div className="editorial-container">
        <div className="max-w-3xl mx-auto text-center mb-12 md:mb-16">
          <motion.span
            initial={{ opacity: 0, y: 20 }}
            animate={{
              opacity: sectionInView ? 1 : 0,
              y: sectionInView ? 0 : 20,
            }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            className="editorial-label block mb-6"
          >
            Share Your Thoughts
          </motion.span>

          <motion.h1
            initial={{ opacity: 0, y: 40 }}
            animate={{
              opacity: sectionInView ? 1 : 0,
              y: sectionInView ? 0 : 40,
            }}
            transition={{ duration: 1, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
            className="font-serif text-display-md md:text-display-lg text-ink-900 mb-6"
          >
            Feedback
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={{
              opacity: sectionInView ? 1 : 0,
              y: sectionInView ? 0 : 30,
            }}
            transition={{ duration: 1, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
            className="font-mono text-body-lg text-ink-700/80"
          >
            We'd love to hear from you
          </motion.p>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{
            opacity: sectionInView ? 1 : 0,
            y: sectionInView ? 0 : 50,
          }}
          transition={{ duration: 1, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
          className="max-w-2xl mx-auto"
        >
          <div className="bg-white rounded-xl p-2 border border-ink-800/10 shadow-sm">
            <iframe
              src="https://docs.google.com/forms/d/e/1FAIpQLSdf1w2po3y1y2gNfH-ZWe8AB3jPRuO-I8azsx32e6lqY5iBCA/viewform?embedded=true"
              width="100%"
              height="800"
              className="border-0 rounded-lg"
              title="Feedback Form"
            >
              Loading…
            </iframe>
          </div>
        </motion.div>
      </div>

      <div className="absolute bottom-0 left-0 right-0 h-px bg-ink-800/10" />
    </section>
  )
}
