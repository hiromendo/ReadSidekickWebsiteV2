import { motion } from 'framer-motion'
import { Helmet } from 'react-helmet-async'
import { trackEvent } from '../utils/analytics'

const CHROME_STORE_URL =
  'https://chromewebstore.google.com/detail/read-sidekick/mdcekkbjfgpgobbgffmpjhpkpkgfmdpa'

const PLAN_FEATURES = [
  {
    title: 'Memory',
    description:
      'Save highlights from any article and auto-generate vocabulary and phrase flashcards to reinforce what you read.',
  },
  {
    title: 'One-click simplification',
    description:
      'Rewrite dense paragraphs, legal jargon, and academic prose into clear, simple language.',
  },
  {
    title: 'Works on any webpage',
    description:
      'Articles, PDFs, documentation, emails — if you can read it in Chrome, Read Sidekick can help.',
  },
]

const FAQ_ITEMS = [
  {
    question: 'Can I cancel anytime?',
    answer:
      'Yes. You can cancel your subscription at any time from inside the extension. You\'ll keep access through the end of the current billing period.',
  },
  {
    question: 'What\'s the difference between the free extension and the paid plans?',
    answer:
      'The Read Sidekick extension itself is free to install. The paid plans unlock Memory (saved highlights and flashcards) and one-click simplification for dense text.',
  },
  {
    question: 'Why is the yearly plan cheaper?',
    answer:
      'Paying yearly works out to about $2.50/month — roughly two months free compared to paying monthly. If you read regularly, it\'s the better deal.',
  },
]

export function Pricing() {
  return (
    <section className="relative py-editorial bg-ivory-100 overflow-hidden min-h-screen">
      <Helmet>
        <title>Pricing — Read Sidekick</title>
        <meta
          name="description"
          content="Simple pricing for Read Sidekick. $2.99/month or $29.99/year — both plans include Memory (saved highlights and flashcards) and one-click simplification."
        />
        <link rel="canonical" href="https://www.readsidekick.com/pricing" />
        <meta property="og:title" content="Pricing — Read Sidekick" />
        <meta
          property="og:description"
          content="Simple pricing for Read Sidekick. $2.99/month or $29.99/year — both plans include Memory and one-click simplification."
        />
        <meta property="og:url" content="https://www.readsidekick.com/pricing" />
      </Helmet>

      <div className="editorial-container">
        <div className="max-w-5xl mx-auto">
          {/* Header */}
          <div className="text-center mb-16 md:mb-20">
            <motion.span
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
              className="editorial-label block mb-6"
            >
              Pricing
            </motion.span>
            <motion.h1
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
              className="font-serif text-display-md md:text-display-lg text-ink-900 mb-6"
            >
              Simple, transparent <span className="italic">pricing</span>
            </motion.h1>
            <motion.p
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
              className="font-mono text-body-lg text-ink-700/80 max-w-2xl mx-auto"
            >
              One plan, two ways to pay. Both include Memory and one-click
              simplification for anything you read.
            </motion.p>
          </div>

          {/* Plan cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8 mb-20 md:mb-24">
            {/* Monthly */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
              className="bg-white rounded-2xl p-8 md:p-10 border border-ink-800/10 shadow-sm flex flex-col"
            >
              <div className="mb-8">
                <h2 className="font-serif text-display-sm text-ink-900 mb-2">
                  Monthly
                </h2>
                <p className="font-mono text-body-sm text-ink-700/60">
                  Flexible, cancel anytime
                </p>
              </div>
              <div className="mb-8">
                <div className="flex items-baseline gap-2">
                  <span className="font-serif text-display-lg text-ink-900">
                    $2.99
                  </span>
                  <span className="font-mono text-body-md text-ink-700/60">
                    / month
                  </span>
                </div>
                <p className="font-mono text-body-sm text-ink-700/50 mt-2">
                  Billed monthly. Cancel anytime.
                </p>
              </div>
              <PlanFeatureList />
              <a
                href={CHROME_STORE_URL}
                target="_blank"
                rel="noopener noreferrer"
                onClick={() =>
                  trackEvent('pricing_cta_click', { plan: 'monthly' })
                }
                className="inline-flex items-center justify-center gap-2 bg-white text-ink-900 font-mono text-body-md font-medium px-8 py-3 rounded-full border border-ink-800/20 hover:border-coral-500 hover:text-coral-500 transition-colors duration-300 mt-auto"
              >
                Install to get started
              </a>
            </motion.div>

            {/* Yearly (featured) */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4, ease: [0.16, 1, 0.3, 1] }}
              className="relative bg-white rounded-2xl p-8 md:p-10 border border-coral-500/30 shadow-xl flex flex-col"
            >
              <span className="absolute -top-3 left-8 md:left-10 font-mono text-caption uppercase tracking-wider text-white bg-coral-500 px-3 py-1 rounded-full">
                Save ~16%
              </span>
              <div className="mb-8">
                <h2 className="font-serif text-display-sm text-ink-900 mb-2">
                  Yearly
                </h2>
                <p className="font-mono text-body-sm text-ink-700/60">
                  Best value for regular readers
                </p>
              </div>
              <div className="mb-8">
                <div className="flex items-baseline gap-2">
                  <span className="font-serif text-display-lg text-ink-900">
                    $29.99
                  </span>
                  <span className="font-mono text-body-md text-ink-700/60">
                    / year
                  </span>
                </div>
                <p className="font-mono text-body-sm text-ink-700/50 mt-2">
                  Just $2.50/month, billed annually. Roughly two months free.
                </p>
              </div>
              <PlanFeatureList />
              <a
                href={CHROME_STORE_URL}
                target="_blank"
                rel="noopener noreferrer"
                onClick={() =>
                  trackEvent('pricing_cta_click', { plan: 'yearly' })
                }
                className="inline-flex items-center justify-center gap-2 bg-coral-500 text-white font-mono text-body-md font-medium px-8 py-3 rounded-full hover:bg-coral-600 transition-colors duration-300 shadow-lg mt-auto"
              >
                Install to get started
              </a>
            </motion.div>
          </div>

          {/* Subscription note */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.5, ease: [0.16, 1, 0.3, 1] }}
            className="text-center font-mono text-body-sm text-ink-700/60 mb-20 md:mb-24 max-w-xl mx-auto"
          >
            Install the free extension to get started — you can choose and manage
            your plan from inside Read Sidekick.
          </motion.p>

          {/* FAQ */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-80px' }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          >
            <div className="mb-10">
              <span className="editorial-label block mb-4">Common Questions</span>
              <h2 className="font-serif text-display-sm md:text-display-md text-ink-900">
                Frequently Asked <span className="italic">Questions</span>
              </h2>
            </div>
            <div className="max-w-3xl">
              {FAQ_ITEMS.map((item) => (
                <div key={item.question} className="border-b border-ink-800/10">
                  <div className="py-6">
                    <span className="font-mono text-body-md md:text-body-lg text-ink-900 block mb-3">
                      {item.question}
                    </span>
                    <p className="font-mono text-body-sm md:text-body-md text-ink-700/70 leading-relaxed">
                      {item.answer}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>

      <div className="absolute bottom-0 left-0 right-0 h-px bg-ink-800/10" />
    </section>
  )
}

function PlanFeatureList() {
  return (
    <ul className="space-y-4 mb-8">
      {PLAN_FEATURES.map((feature) => (
        <li key={feature.title} className="flex gap-3">
          <svg
            className="w-5 h-5 text-coral-500 flex-shrink-0 mt-0.5"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            aria-hidden="true"
          >
            <polyline points="20 6 9 17 4 12" />
          </svg>
          <div>
            <p className="font-mono text-body-sm text-ink-900 font-medium">
              {feature.title}
            </p>
            <p className="font-mono text-body-sm text-ink-700/60 leading-relaxed">
              {feature.description}
            </p>
          </div>
        </li>
      ))}
    </ul>
  )
}
