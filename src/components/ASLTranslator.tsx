import { motion } from 'framer-motion'
import { useScrollReveal } from '../hooks/useScrollReveal'
import { useLanguage } from '../i18n'

export function ASLTranslator() {
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
      ref={sectionRef}
      className="relative py-editorial bg-ink-900 overflow-hidden"
    >
      {/* Section number */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: sectionInView ? 1 : 0 }}
        transition={{ duration: 1, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
        className="absolute top-20 left-6 md:left-12 lg:left-20"
      >
        <span className="section-number text-ivory-100/30">05</span>
      </motion.div>

      {/* Decorative accent blocks */}
      <motion.div
        initial={{ scale: 0, opacity: 0 }}
        animate={{ scale: sectionInView ? 1 : 0, opacity: sectionInView ? 0.6 : 0 }}
        transition={{ duration: 1, delay: 0.5, ease: [0.16, 1, 0.3, 1] }}
        className="absolute top-[15%] right-[8%] w-32 h-32 bg-teal-500 rounded-2xl"
      />

      <motion.div
        initial={{ scale: 0, opacity: 0 }}
        animate={{ scale: sectionInView ? 1 : 0, opacity: sectionInView ? 0.4 : 0 }}
        transition={{ duration: 1, delay: 0.7, ease: [0.16, 1, 0.3, 1] }}
        className="absolute bottom-[20%] left-[5%] w-20 h-40 bg-coral-500 rounded-xl"
      />

      <div className="editorial-container relative z-10">
        {/* Section header */}
        <div ref={headerRef} className="mb-16 md:mb-20 max-w-3xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{
              opacity: headerInView ? 1 : 0,
              y: headerInView ? 0 : 20,
            }}
            transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
            className="flex items-center gap-3 mb-6"
          >
            <span className="editorial-label text-ivory-100/60">{t.aslTranslator.comingSoon}</span>
            <span className="px-3 py-1 bg-teal-500/20 text-teal-400 text-xs font-mono rounded-full">
              {t.aslTranslator.inDevelopment}
            </span>
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 40 }}
            animate={{
              opacity: headerInView ? 1 : 0,
              y: headerInView ? 0 : 40,
            }}
            transition={{ duration: 1.2, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
            className="font-serif text-display-md md:text-display-lg text-ivory-100 mb-6"
          >
            {t.aslTranslator.title}
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={{
              opacity: headerInView ? 1 : 0,
              y: headerInView ? 0 : 30,
            }}
            transition={{ duration: 1, delay: 0.4, ease: [0.16, 1, 0.3, 1] }}
            className="font-mono text-body-lg text-ivory-100/70 leading-relaxed"
          >
            {t.aslTranslator.subtitle}
          </motion.p>
        </div>

        {/* How It Works comparison */}
        <motion.div
          ref={comparisonRef}
          initial={{ opacity: 0, y: 50 }}
          animate={{
            opacity: comparisonInView ? 1 : 0,
            y: comparisonInView ? 0 : 50,
          }}
          transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
          className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 md:p-10 mb-12"
        >
          <h3 className="font-serif text-xl md:text-2xl text-ivory-100 mb-8">
            {t.aslTranslator.howItWorks}
          </h3>

          <div className="space-y-6">
            {/* Traditional Phonics */}
            <div className="flex flex-col md:flex-row items-start md:items-center gap-4 pb-6 border-b border-ivory-100/10">
              <div className="flex-shrink-0 w-full md:w-40">
                <span className="font-mono text-caption text-ivory-100/50">{t.aslTranslator.traditionalPhonics}</span>
              </div>
              <div className="flex flex-wrap items-center gap-3">
                <span className="px-4 py-2 bg-ivory-100/10 rounded-lg font-mono text-ivory-100">
                  {t.aslTranslator.seeCat}
                </span>
                <svg className="w-6 h-6 text-ivory-100/40" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
                <span className="px-4 py-2 bg-ivory-100/10 rounded-lg font-mono text-ivory-100">
                  {t.aslTranslator.decodeSounds}
                </span>
                <svg className="w-6 h-6 text-ivory-100/40" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
                <span className="px-4 py-2 bg-ivory-100/10 rounded-lg font-mono text-ivory-100">
                  {t.aslTranslator.recognizeMeaning}
                </span>
              </div>
            </div>

            {/* ASL Approach */}
            <div className="flex flex-col md:flex-row items-start md:items-center gap-4 pb-6 border-b border-ivory-100/10">
              <div className="flex-shrink-0 w-full md:w-40">
                <span className="font-mono text-caption text-teal-400">{t.aslTranslator.aslApproach}</span>
              </div>
              <div className="flex flex-wrap items-center gap-3">
                <span className="px-4 py-2 bg-teal-500/20 border border-teal-500/30 rounded-lg font-mono text-teal-300">
                  {t.aslTranslator.seeCat}
                </span>
                <svg className="w-6 h-6 text-teal-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
                <span className="px-4 py-2 bg-teal-500/20 border border-teal-500/30 rounded-lg font-mono text-teal-300">
                  {t.aslTranslator.mapToASL}
                </span>
              </div>
            </div>

            {/* Like Kanji */}
            <div className="flex flex-col md:flex-row items-start md:items-center gap-4">
              <div className="flex-shrink-0 w-full md:w-40">
                <span className="font-mono text-caption text-coral-400">{t.aslTranslator.likeKanji}</span>
              </div>
              <div className="flex flex-wrap items-center gap-3">
                <span className="px-4 py-2 bg-coral-500/20 border border-coral-500/30 rounded-lg font-serif text-2xl text-coral-300">
                  猫
                </span>
                <svg className="w-6 h-6 text-coral-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
                <span className="px-4 py-2 bg-coral-500/20 border border-coral-500/30 rounded-lg font-mono text-coral-300">
                  {t.aslTranslator.visualMeaning}
                </span>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Why AI Makes This Possible */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          viewport={{ once: true }}
          className="flex flex-col md:flex-row items-start gap-6 p-6 md:p-8 bg-teal-500/10 rounded-xl border border-teal-500/20"
        >
          <div className="w-12 h-12 bg-teal-500/20 rounded-xl flex items-center justify-center flex-shrink-0">
            <svg className="w-6 h-6 text-teal-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M9.813 15.904L9 18.75l-.813-2.846a4.5 4.5 0 00-3.09-3.09L2.25 12l2.846-.813a4.5 4.5 0 003.09-3.09L9 5.25l.813 2.846a4.5 4.5 0 003.09 3.09L15.75 12l-2.846.813a4.5 4.5 0 00-3.09 3.09zM18.259 8.715L18 9.75l-.259-1.035a3.375 3.375 0 00-2.455-2.456L14.25 6l1.036-.259a3.375 3.375 0 002.455-2.456L18 2.25l.259 1.035a3.375 3.375 0 002.456 2.456L21.75 6l-1.035.259a3.375 3.375 0 00-2.456 2.456z" />
            </svg>
          </div>
          <div>
            <h3 className="font-serif text-xl text-ivory-100 mb-3">
              {t.aslTranslator.whyAI.title}
            </h3>
            <p className="font-mono text-body-md text-ivory-100/70 leading-relaxed">
              {t.aslTranslator.whyAI.description}
            </p>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
