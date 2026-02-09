import { motion } from 'framer-motion'
import { useScrollReveal } from '../hooks/useScrollReveal'

const samples = [
  { video: '/video1.mp4', sentence: 'The city was destroyed by the earthquake.' },
  { video: '/video2.mp4', sentence: 'They specifically need pens.' },
  { video: '/video3.mp4', sentence: 'He attributes his success to hard work.' },
  { video: '/video4.mp4', sentence: 'Stay consistent each day.' },
  { video: '/video5.mp4', sentence: 'He is my fellow colleague.' },
  { video: '/video6.mp4', sentence: 'They exchanged foreign currency.' },
  { video: '/video7.mp4', sentence: 'We found cheap accommodation.' },
  { video: '/video8.mp4', sentence: 'The forecast predicts rain.' },
  { video: '/video9.mp4', sentence: 'My expectation was high.' },
  { video: '/video10.mp4', sentence: 'His presence calmed everyone.' },
]

export function ASLSamples() {
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
            Video Demonstrations
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
            ASL Samples
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
            English sentences paired with their ASL translations
          </motion.p>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{
            opacity: sectionInView ? 1 : 0,
            y: sectionInView ? 0 : 30,
          }}
          transition={{ duration: 1, delay: 0.25, ease: [0.16, 1, 0.3, 1] }}
          className="max-w-3xl mx-auto mb-12"
        >
          <video controls className="w-full rounded-xl shadow-sm" src="/ReadSidekickIntro.mov">
            Your browser does not support the video tag.
          </video>
        </motion.div>

        <div className="max-w-5xl mx-auto flex flex-col gap-8">
          {samples.map((sample, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 50 }}
              animate={{
                opacity: sectionInView ? 1 : 0,
                y: sectionInView ? 0 : 50,
              }}
              transition={{ duration: 1, delay: 0.3 + index * 0.1, ease: [0.16, 1, 0.3, 1] }}
              className="grid grid-cols-1 md:grid-cols-2 gap-6 items-center bg-white rounded-xl p-6 border border-ink-800/10 shadow-sm"
            >
              <div className="flex items-center">
                <p className="font-mono text-body-lg text-ink-900">
                  <span className="text-ink-500 mr-2">{index + 1}.</span>
                  {sample.sentence}
                </p>
              </div>
              <div>
                <video
                  controls
                  className="w-full rounded-lg"
                  src={sample.video}
                >
                  Your browser does not support the video tag.
                </video>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      <div className="absolute bottom-0 left-0 right-0 h-px bg-ink-800/10" />
    </section>
  )
}
