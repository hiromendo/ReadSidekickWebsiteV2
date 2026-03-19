import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Link } from 'react-router-dom'
import { Helmet } from 'react-helmet-async'
import { useScrollReveal } from '../hooks/useScrollReveal'
import { trackEvent } from '../utils/analytics'

const CHROME_STORE_URL =
  'https://chromewebstore.google.com/detail/read-sidekick/mdcekkbjfgpgobbgffmpjhpkpkgfmdpa'

const feedbackFaqItems = [
  {
    question: 'How do I submit feedback about Read Sidekick?',
    answer:
      'Use the feedback form on this page to share your thoughts directly with the Read Sidekick team. Simply fill out the form with your comments, suggestions, or concerns and hit submit — no account required.',
  },
  {
    question: 'What kind of feedback can I share with Read Sidekick?',
    answer:
      'We welcome all types of feedback — feature requests, bug reports, usability suggestions, and general comments about your experience using Read Sidekick to simplify text.',
  },
  {
    question: 'How does Read Sidekick use my feedback?',
    answer:
      'Every piece of feedback is reviewed by our team and helps shape future updates. User suggestions have directly influenced features like improved text simplification, better formatting, and expanded language support.',
  },
  {
    question: 'Can I request new features for Read Sidekick?',
    answer:
      'Absolutely! Feature requests are one of the most valuable types of feedback we receive. Let us know what would make Read Sidekick more useful for your reading workflow and we\'ll consider it for future releases.',
  },
  {
    question: 'Is my Read Sidekick feedback anonymous?',
    answer:
      'You can choose to submit feedback anonymously through the form. Providing your email is optional and only used if you\'d like us to follow up on your suggestion or report.',
  },
]

export function Feedback() {
  const [openFaqIndex, setOpenFaqIndex] = useState<number | null>(null)

  const { ref: sectionRef, isInView: sectionInView } = useScrollReveal<HTMLElement>({
    threshold: 0.1,
  })

  const { ref: faqRef, isInView: faqInView } = useScrollReveal<HTMLDivElement>({
    threshold: 0.1,
  })

  const webPageSchema = {
    '@context': 'https://schema.org',
    '@type': 'WebPage',
    name: 'Read Sidekick Feedback',
    description:
      'Share your feedback, feature requests, and suggestions to help improve Read Sidekick — the free Chrome extension that simplifies complex text.',
    url: 'https://www.readsidekick.com/feedback',
    publisher: {
      '@type': 'Organization',
      name: 'Read Sidekick',
      url: 'https://www.readsidekick.com',
      logo: 'https://www.readsidekick.com/logo.png',
    },
  }

  const faqSchema = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: feedbackFaqItems.map((item) => ({
      '@type': 'Question',
      name: item.question,
      acceptedAnswer: {
        '@type': 'Answer',
        text: item.answer,
      },
    })),
  }

  return (
    <section
      ref={sectionRef}
      className="relative py-editorial bg-ivory-100 overflow-hidden min-h-screen"
    >
      <Helmet>
        <title>Read Sidekick Feedback — Share Your Thoughts &amp; Feature Requests</title>
        <meta
          name="description"
          content="Submit feedback, report issues, and request features for Read Sidekick. Help us improve the free Chrome extension that simplifies complex text."
        />
      </Helmet>

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(webPageSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />

      <div className="editorial-container">
        <div className="max-w-5xl mx-auto">
          {/* Header */}
          <div className="text-center mb-12 md:mb-16">
            <motion.span
              initial={{ opacity: 0, y: 20 }}
              animate={{
                opacity: sectionInView ? 1 : 0,
                y: sectionInView ? 0 : 20,
              }}
              transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
              className="editorial-label block mb-6"
            >
              Your Voice Matters
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
              Read Sidekick <span className="italic">Feedback</span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 30 }}
              animate={{
                opacity: sectionInView ? 1 : 0,
                y: sectionInView ? 0 : 30,
              }}
              transition={{ duration: 1, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
              className="font-mono text-body-lg text-ink-700/80 max-w-2xl mx-auto"
            >
              Help shape the future of Read Sidekick. Share your experience, suggest features, or
              report issues — every piece of feedback makes our reading tool better.
            </motion.p>
          </div>

          {/* Intro Content */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{
              opacity: sectionInView ? 1 : 0,
              y: sectionInView ? 0 : 30,
            }}
            transition={{ duration: 1, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
            className="max-w-2xl mx-auto mb-12 md:mb-16"
          >
            <p className="font-mono text-body-md text-ink-700/70 leading-relaxed text-center">
              Read Sidekick is built for readers who want to understand complex text without the
              struggle. Whether you use it for articles, legal documents, or academic papers, your
              feedback helps us refine the simplification engine and add the features you need most.
              Looking for tips on getting the most out of Read Sidekick? Check out our{' '}
              <Link
                to="/blog"
                className="text-coral-500 hover:text-coral-600 underline underline-offset-2 transition-colors duration-200"
              >
                blog
              </Link>{' '}
              for reading guides and updates.
            </p>
          </motion.div>

          {/* Feedback Form */}
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{
              opacity: sectionInView ? 1 : 0,
              y: sectionInView ? 0 : 50,
            }}
            transition={{ duration: 1, delay: 0.4, ease: [0.16, 1, 0.3, 1] }}
            className="max-w-2xl mx-auto"
          >
            <div className="bg-white rounded-xl p-2 border border-ink-800/10 shadow-sm">
              <iframe
                src="https://docs.google.com/forms/d/e/1FAIpQLSdf1w2po3y1y2gNfH-ZWe8AB3jPRuO-I8azsx32e6lqY5iBCA/viewform?embedded=true"
                width="100%"
                height="800"
                className="border-0 rounded-lg"
                title="Read Sidekick Feedback Form"
              >
                Loading…
              </iframe>
            </div>
          </motion.div>

          {/* Branded CTA */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{
              opacity: sectionInView ? 1 : 0,
              y: sectionInView ? 0 : 40,
            }}
            transition={{ duration: 0.8, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
            className="mt-16 md:mt-20 text-center bg-white rounded-xl p-10 md:p-14 shadow-sm border border-ink-800/10"
          >
            <h2 className="font-serif text-display-sm md:text-display-md text-ink-900 mb-4">
              Get Read Sidekick <span className="italic">Free</span>
            </h2>
            <p className="font-mono text-body-md text-ink-700/70 max-w-xl mx-auto mb-8">
              Turn dense articles, legal jargon, and confusing content into clear, simple language —
              in one click.
            </p>
            <a
              href={CHROME_STORE_URL}
              target="_blank"
              rel="noopener noreferrer"
              onClick={() =>
                trackEvent('chrome_store_click', {
                  location: 'feedback_cta',
                })
              }
              className="inline-flex items-center gap-2 bg-coral-500 text-white font-mono text-body-md font-medium px-8 py-3 rounded-full hover:bg-coral-600 transition-colors duration-300"
            >
              Add to Chrome — It's Free
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M14 5l7 7m0 0l-7 7m7-7H3"
                />
              </svg>
            </a>
          </motion.div>

          {/* FAQ Section */}
          <div ref={faqRef} className="mt-16 md:mt-20">
            <motion.div
              initial={{ opacity: 0, y: 40 }}
              animate={{
                opacity: faqInView ? 1 : 0,
                y: faqInView ? 0 : 40,
              }}
              transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
              className="mb-10"
            >
              <span className="editorial-label block mb-4">Common Questions</span>
              <h2 className="font-serif text-display-sm md:text-display-md text-ink-900">
                Frequently Asked <span className="italic">Questions</span>
              </h2>
            </motion.div>

            <div className="max-w-3xl">
              {feedbackFaqItems.map((item, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 30 }}
                  animate={{
                    opacity: faqInView ? 1 : 0,
                    y: faqInView ? 0 : 30,
                  }}
                  transition={{
                    duration: 0.8,
                    delay: index * 0.1,
                    ease: [0.16, 1, 0.3, 1],
                  }}
                  className="border-b border-ink-800/10"
                >
                  <button
                    onClick={() => setOpenFaqIndex(openFaqIndex === index ? null : index)}
                    className="w-full flex items-center justify-between py-6 text-left group"
                  >
                    <span className="font-mono text-body-md md:text-body-lg text-ink-900 pr-8 group-hover:text-coral-500 transition-colors duration-200">
                      {item.question}
                    </span>
                    <motion.span
                      animate={{ rotate: openFaqIndex === index ? 45 : 0 }}
                      transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
                      className="flex-shrink-0 w-6 h-6 flex items-center justify-center text-ink-700/50 group-hover:text-coral-500 transition-colors duration-200"
                    >
                      <svg
                        width="16"
                        height="16"
                        viewBox="0 0 16 16"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="1.5"
                      >
                        <line x1="8" y1="2" x2="8" y2="14" />
                        <line x1="2" y1="8" x2="14" y2="8" />
                      </svg>
                    </motion.span>
                  </button>
                  <AnimatePresence>
                    {openFaqIndex === index && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: 'auto', opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
                        className="overflow-hidden"
                      >
                        <p className="font-mono text-body-sm md:text-body-md text-ink-700/70 leading-relaxed pb-6">
                          {item.answer}
                        </p>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </div>

      <div className="absolute bottom-0 left-0 right-0 h-px bg-ink-800/10" />
    </section>
  )
}
