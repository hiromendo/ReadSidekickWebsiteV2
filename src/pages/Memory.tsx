import { useState, useEffect, useCallback } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Helmet } from 'react-helmet-async'
import { useAuth } from '../auth/AuthContext'
import {
  generateFlashcards,
  fetchMemoryData,
} from '../services/flashcard-api'
import type {
  FlashcardSet,
  VocabularyCard,
  PhraseCard,
  SavedItem,
} from '../services/flashcard-types'

type Category = 'vocabulary' | 'phrases'
type AnyCard = VocabularyCard | PhraseCard

const LOADING_MESSAGES = [
  'Reading your saved texts...',
  'Identifying key vocabulary...',
  'Finding notable phrases...',
  'Building your flashcard deck...',
]

export function Memory() {
  const { user, isLoading: authLoading, signInWithGoogle, signOut } = useAuth()

  const [savedItemCount, setSavedItemCount] = useState(0)
  const [savedItems, setSavedItems] = useState<SavedItem[]>([])
  const [expandedItems, setExpandedItems] = useState<Set<string>>(new Set())
  const [flashcardSet, setFlashcardSet] = useState<FlashcardSet | null>(null)
  const [loading, setLoading] = useState(false)
  const [loadingMsg, setLoadingMsg] = useState(0)
  const [error, setError] = useState<string | null>(null)
  const [initialFetch, setInitialFetch] = useState(false)

  // Flashcard navigation state
  const [category, setCategory] = useState<Category>('vocabulary')
  const [cardIndex, setCardIndex] = useState(0)
  const [flipped, setFlipped] = useState(false)

  // Fetch saved item count + latest flashcard set on mount
  const fetchInitialData = useCallback(async (user: { uid: string; getIdToken: () => Promise<string> }) => {
    try {
      const token = await user.getIdToken()
      const { savedItemCount, latestFlashcardSet, savedItems } = await fetchMemoryData(token)
      setSavedItemCount(savedItemCount)
      setSavedItems(savedItems)
      if (latestFlashcardSet) setFlashcardSet(latestFlashcardSet)
    } catch (err) {
      console.error('Failed to fetch memory data:', err)
    }
    setInitialFetch(true)
  }, [])

  useEffect(() => {
    if (user && !initialFetch) fetchInitialData(user)
  }, [user, initialFetch, fetchInitialData])

  useEffect(() => {
    if (!user) {
      setSavedItemCount(0)
      setSavedItems([])
      setExpandedItems(new Set())
      setFlashcardSet(null)
      setInitialFetch(false)
    }
  }, [user])

  // Cycle loading messages
  useEffect(() => {
    if (!loading) return
    setLoadingMsg(0)
    const id = setInterval(() => {
      setLoadingMsg((i) => (i + 1) % LOADING_MESSAGES.length)
    }, 3000)
    return () => clearInterval(id)
  }, [loading])

  // Reset card index & flip when category changes
  useEffect(() => {
    setCardIndex(0)
    setFlipped(false)
  }, [category])

  // Keyboard navigation
  useEffect(() => {
    if (!flashcardSet) return
    const handler = (e: KeyboardEvent) => {
      const cards = flashcardSet.content[category]
      if (e.key === 'ArrowRight' || e.key === 'ArrowDown') {
        e.preventDefault()
        setFlipped(false)
        setCardIndex((i) => Math.min(i + 1, cards.length - 1))
      } else if (e.key === 'ArrowLeft' || e.key === 'ArrowUp') {
        e.preventDefault()
        setFlipped(false)
        setCardIndex((i) => Math.max(i - 1, 0))
      } else if (e.key === ' ') {
        e.preventDefault()
        setFlipped((f) => !f)
      }
    }
    window.addEventListener('keydown', handler)
    return () => window.removeEventListener('keydown', handler)
  }, [flashcardSet, category])

  const handleGenerate = async () => {
    if (!user) return
    setLoading(true)
    setError(null)
    try {
      const token = await user.getIdToken()
      const set = await generateFlashcards(token)
      setFlashcardSet(set)
      setCategory('vocabulary')
      setCardIndex(0)
      setFlipped(false)
    } catch (e) {
      setError(e instanceof Error ? e.message : 'Something went wrong')
    } finally {
      setLoading(false)
    }
  }

  const currentCards: AnyCard[] = flashcardSet ? flashcardSet.content[category] : []
  const currentCard: AnyCard | undefined = currentCards[cardIndex]

  function renderFront(card: AnyCard) {
    if (category === 'vocabulary') {
      const c = card as VocabularyCard
      return (
        <>
          <DifficultyBadge level={c.difficulty} />
          <p className="font-serif text-display-sm md:text-display-md text-ink-900 mb-3">
            {c.word}
          </p>
          <p className="font-mono text-body-sm text-ink-700/50">Tap to see definition</p>
        </>
      )
    }
    const c = card as PhraseCard
    return (
      <>
        <p className="font-serif text-xl md:text-2xl text-ink-900 mb-3 italic">
          "{c.phrase}"
        </p>
        <p className="font-mono text-body-sm text-ink-700/50">Tap to see meaning</p>
      </>
    )
  }

  function renderBack(card: AnyCard) {
    if (category === 'vocabulary') {
      const c = card as VocabularyCard
      return (
        <>
          <p className="font-mono text-body-md text-ink-900 font-medium mb-4">
            {c.definition}
          </p>
          <div className="bg-ivory-100 rounded-lg p-4">
            <p className="font-mono text-body-xs text-ink-700/50 uppercase tracking-wider mb-1">
              Example
            </p>
            <p className="font-mono text-body-sm text-ink-700/80 italic">
              "{c.exampleSentence}"
            </p>
          </div>
        </>
      )
    }
    const c = card as PhraseCard
    return (
      <>
        <p className="font-mono text-body-md text-ink-900 font-medium mb-4">
          {c.meaning}
        </p>
        <div className="bg-ivory-100 rounded-lg p-4">
          <p className="font-mono text-body-xs text-ink-700/50 uppercase tracking-wider mb-1">
            Context
          </p>
          <p className="font-mono text-body-sm text-ink-700/80 italic">
            "{c.context}"
          </p>
        </div>
      </>
    )
  }

  // Auth loading
  if (authLoading) {
    return (
      <section className="relative py-editorial bg-ivory-100 overflow-hidden min-h-screen flex items-center justify-center">
        <Helmet>
          <title>Your Memory — Read Sidekick</title>
          <meta name="robots" content="noindex, nofollow" />
        </Helmet>
        <div className="animate-spin w-8 h-8 border-2 border-coral-500 border-t-transparent rounded-full" />
      </section>
    )
  }

  // Unauthenticated
  if (!user) {
    return (
      <section className="relative py-editorial bg-ivory-100 overflow-hidden min-h-screen flex items-center justify-center">
        <Helmet>
          <title>Your Memory — Read Sidekick</title>
          <meta name="robots" content="noindex, nofollow" />
        </Helmet>
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="bg-white rounded-xl p-10 md:p-14 shadow-sm border border-ink-800/10 text-center max-w-md mx-4"
        >
          <h1 className="font-serif text-display-sm text-ink-900 mb-4">
            Your <span className="italic">Memory</span>
          </h1>
          <p className="font-mono text-body-md text-ink-700/70 mb-8">
            Sign in to view your saved data from the Read Sidekick extension.
          </p>
          <button
            onClick={signInWithGoogle}
            className="inline-flex items-center gap-2 bg-coral-500 text-white font-mono text-body-md font-medium px-8 py-3 rounded-full hover:bg-coral-600 transition-colors duration-300"
          >
            <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
              <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92a5.06 5.06 0 01-2.2 3.32v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.1z" fill="#fff" />
              <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#fff" />
              <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18A10.96 10.96 0 001 12c0 1.78.43 3.46 1.18 4.93l3.66-2.84z" fill="#fff" />
              <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#fff" />
            </svg>
            Sign in with Google
          </button>
        </motion.div>
      </section>
    )
  }

  // Authenticated
  return (
    <section
      className="relative py-editorial bg-ivory-100 overflow-hidden min-h-screen"
    >
      <Helmet>
        <title>Your Memory — Read Sidekick</title>
        <meta name="robots" content="noindex, nofollow" />
      </Helmet>

      <div className="editorial-container">
        <div className="max-w-5xl mx-auto">
          {/* User info bar */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            className="flex items-center justify-between bg-white rounded-xl px-6 py-4 mb-8 border border-ink-800/10 shadow-sm"
          >
            <div className="flex items-center gap-3">
              {user.photoURL && (
                <img
                  src={user.photoURL}
                  alt=""
                  className="w-10 h-10 rounded-full"
                  referrerPolicy="no-referrer"
                />
              )}
              <div>
                <p className="font-mono text-body-sm text-ink-900 font-medium">
                  {user.displayName || 'User'}
                </p>
                <p className="font-mono text-body-xs text-ink-700/50">{user.email}</p>
              </div>
            </div>
            <button
              onClick={signOut}
              className="font-mono text-body-sm text-ink-700/60 hover:text-coral-500 transition-colors duration-200"
            >
              Sign out
            </button>
          </motion.div>

          {/* Header */}
          <div className="text-center mb-12 md:mb-16">
            <motion.h1
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
              className="font-serif text-display-md md:text-display-lg text-ink-900 mb-4"
            >
              Your <span className="italic">Memory</span>
            </motion.h1>
            <motion.p
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
              className="font-mono text-body-lg text-ink-700/80 max-w-2xl mx-auto"
            >
              {flashcardSet
                ? 'Review your flashcards to reinforce what you\'ve read.'
                : 'Turn your saved readings into interactive flashcards.'}
            </motion.p>
          </div>

          {/* Content area */}
          {!initialFetch && (
            <div className="flex items-center justify-center py-20">
              <div className="animate-spin w-8 h-8 border-2 border-coral-500 border-t-transparent rounded-full" />
            </div>
          )}

          {/* Loading state during generation */}
          {loading && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-center py-20"
            >
              <div className="animate-spin w-10 h-10 border-2 border-coral-500 border-t-transparent rounded-full mx-auto mb-6" />
              <AnimatePresence mode="wait">
                <motion.p
                  key={loadingMsg}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: 0.4 }}
                  className="font-mono text-body-md text-ink-700/70"
                >
                  {LOADING_MESSAGES[loadingMsg]}
                </motion.p>
              </AnimatePresence>
            </motion.div>
          )}

          {/* Error state */}
          {error && !loading && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-red-50 border border-red-200 rounded-xl p-6 text-center mb-8"
            >
              <p className="font-mono text-body-md text-red-700 mb-3">{error}</p>
              <button
                onClick={handleGenerate}
                className="font-mono text-body-sm text-red-600 underline hover:text-red-800 transition-colors"
              >
                Try again
              </button>
            </motion.div>
          )}

          {/* Empty state — no flashcards yet */}
          {initialFetch && !loading && !flashcardSet && !error && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
              className="text-center py-16"
            >
              {savedItemCount > 0 ? (
                <>
                  <p className="font-mono text-body-lg text-ink-700/70 mb-2">
                    You have {savedItemCount} saved reading{savedItemCount !== 1 ? 's' : ''}.
                  </p>
                  <p className="font-mono text-body-md text-ink-700/50 mb-8">
                    Generate flashcards to start learning.
                  </p>
                  <button
                    onClick={handleGenerate}
                    className="inline-flex items-center gap-2 bg-coral-500 text-white font-mono text-body-md font-medium px-8 py-3 rounded-full hover:bg-coral-600 transition-colors duration-300 shadow-sm"
                  >
                    <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2" />
                    </svg>
                    Generate Flashcards
                  </button>
                </>
              ) : (
                <>
                  <p className="font-mono text-body-lg text-ink-700/50">
                    No saved readings found.
                  </p>
                  <p className="font-mono text-body-sm text-ink-700/40 mt-2">
                    Use the Read Sidekick extension to save texts, then come back to generate flashcards.
                  </p>
                </>
              )}
            </motion.div>
          )}

          {/* Flashcard deck */}
          {flashcardSet && !loading && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
            >
              {/* Category tabs */}
              <div className="flex justify-center gap-2 mb-8">
                {(['vocabulary', 'phrases'] as Category[]).map((cat) => {
                  const count = flashcardSet.content[cat].length
                  const isActive = category === cat
                  return (
                    <button
                      key={cat}
                      onClick={() => setCategory(cat)}
                      className={`font-mono text-body-sm font-medium px-4 py-2 rounded-full transition-all duration-300 flex items-center gap-2 ${
                        isActive
                          ? 'bg-ink-900 text-white shadow-sm'
                          : 'bg-white text-ink-700/70 hover:text-ink-900 border border-ink-800/10'
                      }`}
                    >
                      {cat.charAt(0).toUpperCase() + cat.slice(1)}
                      <span
                        className={`text-body-xs px-1.5 py-0.5 rounded-full ${
                          isActive ? 'bg-white/20' : 'bg-ivory-100'
                        }`}
                      >
                        {count}
                      </span>
                    </button>
                  )
                })}
              </div>

              {/* Card area */}
              {currentCards.length === 0 ? (
                <p className="text-center font-mono text-body-md text-ink-700/50 py-12">
                  No {category} cards in this set.
                </p>
              ) : (
                <>
                  {/* Progress */}
                  <p className="text-center font-mono text-body-xs text-ink-700/50 mb-4">
                    Card {cardIndex + 1} of {currentCards.length}
                  </p>

                  {/* Flip card */}
                  <div className="flex items-center justify-center gap-4 mb-8">
                    {/* Prev arrow */}
                    <button
                      onClick={() => {
                        setFlipped(false)
                        setCardIndex((i) => Math.max(i - 1, 0))
                      }}
                      disabled={cardIndex === 0}
                      className="w-10 h-10 flex items-center justify-center rounded-full bg-white border border-ink-800/10 text-ink-700/60 hover:text-coral-500 disabled:opacity-30 disabled:cursor-not-allowed transition-all duration-200 shadow-sm flex-shrink-0"
                    >
                      <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <polyline points="15 18 9 12 15 6" />
                      </svg>
                    </button>

                    {/* Card */}
                    <div
                      className="w-full max-w-lg cursor-pointer"
                      style={{ perspective: '1000px' }}
                      onClick={() => setFlipped((f) => !f)}
                    >
                      <AnimatePresence mode="wait">
                        <motion.div
                          key={`${category}-${cardIndex}`}
                          initial={{ opacity: 0, scale: 0.95 }}
                          animate={{ opacity: 1, scale: 1 }}
                          exit={{ opacity: 0, scale: 0.95 }}
                          transition={{ duration: 0.3 }}
                        >
                          <motion.div
                            animate={{ rotateY: flipped ? 180 : 0 }}
                            transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
                            style={{ transformStyle: 'preserve-3d' }}
                            className="relative"
                          >
                            {/* Front */}
                            <div
                              className="bg-white rounded-2xl p-8 md:p-12 border border-ink-800/10 shadow-sm min-h-[280px] flex flex-col items-center justify-center text-center"
                              style={{ backfaceVisibility: 'hidden' }}
                            >
                              {currentCard && renderFront(currentCard)}
                            </div>

                            {/* Back */}
                            <div
                              className="bg-white rounded-2xl p-8 md:p-12 border border-ink-800/10 shadow-sm min-h-[280px] flex flex-col justify-center absolute inset-0"
                              style={{
                                backfaceVisibility: 'hidden',
                                transform: 'rotateY(180deg)',
                              }}
                            >
                              {currentCard && renderBack(currentCard)}
                            </div>
                          </motion.div>
                        </motion.div>
                      </AnimatePresence>
                    </div>

                    {/* Next arrow */}
                    <button
                      onClick={() => {
                        setFlipped(false)
                        setCardIndex((i) => Math.min(i + 1, currentCards.length - 1))
                      }}
                      disabled={cardIndex === currentCards.length - 1}
                      className="w-10 h-10 flex items-center justify-center rounded-full bg-white border border-ink-800/10 text-ink-700/60 hover:text-coral-500 disabled:opacity-30 disabled:cursor-not-allowed transition-all duration-200 shadow-sm flex-shrink-0"
                    >
                      <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <polyline points="9 18 15 12 9 6" />
                      </svg>
                    </button>
                  </div>

                  {/* Progress dots */}
                  <div className="flex justify-center gap-1.5 mb-8">
                    {currentCards.map((_, i) => (
                      <button
                        key={i}
                        onClick={() => {
                          setFlipped(false)
                          setCardIndex(i)
                        }}
                        className={`w-2 h-2 rounded-full transition-all duration-300 ${
                          i === cardIndex
                            ? 'bg-coral-500 w-6'
                            : 'bg-ink-800/15 hover:bg-ink-800/30'
                        }`}
                      />
                    ))}
                  </div>

                  {/* Keyboard hint */}
                  <p className="text-center font-mono text-body-xs text-ink-700/40 mb-8">
                    Use arrow keys to navigate, space to flip
                  </p>
                </>
              )}

              {/* Regenerate button */}
              <div className="text-center pt-4 border-t border-ink-800/10">
                <button
                  onClick={handleGenerate}
                  className="inline-flex items-center gap-2 font-mono text-body-sm text-ink-700/60 hover:text-coral-500 transition-colors duration-200 mt-4"
                >
                  <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <polyline points="23 4 23 10 17 10" />
                    <polyline points="1 20 1 14 7 14" />
                    <path d="M3.51 9a9 9 0 0114.85-3.36L23 10M1 14l4.64 4.36A9 9 0 0020.49 15" />
                  </svg>
                  Regenerate with latest readings
                </button>
              </div>
            </motion.div>
          )}
          {/* Saved Highlights */}
          {initialFetch && !loading && savedItems.length > 0 && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
              className="mt-16"
            >
              <h2 className="font-serif text-display-sm text-ink-900 mb-6">
                Saved <span className="italic">Highlights</span>
              </h2>
              <div className="space-y-4">
                {savedItems.map((item) => {
                  const isExpanded = expandedItems.has(item.id)
                  const needsTruncation = item.text.length > 200
                  const displayText = needsTruncation && !isExpanded
                    ? item.text.slice(0, 200) + '...'
                    : item.text
                  return (
                    <div
                      key={item.id}
                      className="bg-white rounded-xl p-6 border border-ink-800/10 shadow-sm"
                    >
                      <p className="font-mono text-body-md text-ink-900/80 leading-relaxed whitespace-pre-line">
                        {displayText}
                      </p>
                      {needsTruncation && (
                        <button
                          onClick={() => setExpandedItems((prev) => {
                            const next = new Set(prev)
                            if (next.has(item.id)) next.delete(item.id)
                            else next.add(item.id)
                            return next
                          })}
                          className="font-mono text-body-sm text-coral-500 hover:text-coral-600 transition-colors duration-200 mt-2"
                        >
                          {isExpanded ? 'Show less' : 'Show more'}
                        </button>
                      )}
                      {item.sourceUrl && (
                        <div className="mt-3 pt-3 border-t border-ink-800/5">
                          <a
                            href={item.sourceUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center gap-1.5 font-mono text-body-sm text-coral-500 hover:text-coral-600 transition-colors duration-200"
                          >
                            {item.sourceTitle || item.sourceUrl}
                            <svg className="w-3.5 h-3.5 flex-shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                              <path d="M18 13v6a2 2 0 01-2 2H5a2 2 0 01-2-2V8a2 2 0 012-2h6" />
                              <polyline points="15 3 21 3 21 9" />
                              <line x1="10" y1="14" x2="21" y2="3" />
                            </svg>
                          </a>
                        </div>
                      )}
                    </div>
                  )
                })}
              </div>
            </motion.div>
          )}
        </div>
      </div>

      <div className="absolute bottom-0 left-0 right-0 h-px bg-ink-800/10" />
    </section>
  )
}

function DifficultyBadge({ level }: { level: 1 | 2 | 3 }) {
  const config = {
    1: { label: 'Beginner', cls: 'bg-teal-100 text-teal-700' },
    2: { label: 'Intermediate', cls: 'bg-amber-100 text-amber-700' },
    3: { label: 'Advanced', cls: 'bg-orange-100 text-orange-700' },
  }
  const { label, cls } = config[level]
  return (
    <span className={`font-mono text-body-xs font-medium px-2.5 py-0.5 rounded-full mb-4 inline-block ${cls}`}>
      {label}
    </span>
  )
}
