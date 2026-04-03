import { useState, useEffect, useCallback } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Helmet } from 'react-helmet-async'
import { collection, doc, getDoc, getDocs, Timestamp } from 'firebase/firestore'
import { db } from '../auth/firebase'
import { useAuth } from '../auth/AuthContext'
import { useScrollReveal } from '../hooks/useScrollReveal'

interface FirestoreData {
  [key: string]: unknown
}

interface CollectionResult {
  name: string
  docs: { id: string; data: FirestoreData }[]
}

function formatTimestamp(ts: Timestamp): string {
  return ts.toDate().toLocaleString()
}

function DataValue({ value }: { value: unknown }) {
  if (value === null || value === undefined) {
    return <span className="text-ink-700/40 italic">null</span>
  }

  if (value instanceof Timestamp) {
    return <span className="text-ink-700/70">{formatTimestamp(value)}</span>
  }

  if (typeof value === 'boolean') {
    return (
      <span className={value ? 'text-green-600' : 'text-red-500'}>
        {value.toString()}
      </span>
    )
  }

  if (typeof value === 'number') {
    return <span className="text-blue-600">{value}</span>
  }

  if (typeof value === 'string') {
    return <span className="text-ink-700/80">{value}</span>
  }

  if (Array.isArray(value)) {
    if (value.length === 0) {
      return <span className="text-ink-700/40 italic">[]</span>
    }
    return (
      <div className="ml-4 border-l-2 border-ink-800/10 pl-3 mt-1 space-y-1">
        {value.map((item, i) => (
          <div key={i} className="flex gap-2">
            <span className="text-ink-700/40 text-xs mt-0.5">{i}.</span>
            <DataValue value={item} />
          </div>
        ))}
      </div>
    )
  }

  if (typeof value === 'object') {
    const entries = Object.entries(value as Record<string, unknown>)
    if (entries.length === 0) {
      return <span className="text-ink-700/40 italic">{'{}'}</span>
    }
    return (
      <div className="ml-4 border-l-2 border-ink-800/10 pl-3 mt-1 space-y-1">
        {entries.map(([k, v]) => (
          <div key={k}>
            <span className="text-ink-900 font-medium text-sm">{k}: </span>
            <DataValue value={v} />
          </div>
        ))}
      </div>
    )
  }

  return <span className="text-ink-700/70">{String(value)}</span>
}

function DocumentCard({ id, data }: { id: string; data: FirestoreData }) {
  const [isOpen, setIsOpen] = useState(false)
  const entries = Object.entries(data)

  return (
    <div className="border border-ink-800/10 rounded-lg bg-white overflow-hidden">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-full flex items-center justify-between px-4 py-3 text-left group hover:bg-ivory-100/50 transition-colors duration-200"
      >
        <span className="font-mono text-body-sm text-ink-900 truncate pr-4">
          {id}
        </span>
        <motion.span
          animate={{ rotate: isOpen ? 45 : 0 }}
          transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
          className="flex-shrink-0 w-5 h-5 flex items-center justify-center text-ink-700/50 group-hover:text-coral-500 transition-colors duration-200"
        >
          <svg width="14" height="14" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.5">
            <line x1="8" y1="2" x2="8" y2="14" />
            <line x1="2" y1="8" x2="14" y2="8" />
          </svg>
        </motion.span>
      </button>
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
            className="overflow-hidden"
          >
            <div className="px-4 pb-4 space-y-2 border-t border-ink-800/10 pt-3">
              {entries.map(([key, value]) => (
                <div key={key} className="font-mono text-body-sm">
                  <span className="text-ink-900 font-medium">{key}: </span>
                  <DataValue value={value} />
                </div>
              ))}
              {entries.length === 0 && (
                <p className="font-mono text-body-sm text-ink-700/40 italic">Empty document</p>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

function CollectionCard({ result }: { result: CollectionResult }) {
  const [isOpen, setIsOpen] = useState(true)

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
      className="bg-white rounded-xl border border-ink-800/10 shadow-sm overflow-hidden"
    >
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-full flex items-center justify-between px-6 py-4 text-left group hover:bg-ivory-100/30 transition-colors duration-200"
      >
        <div className="flex items-center gap-3">
          <span className="font-serif text-lg text-ink-900">{result.name}</span>
          <span className="font-mono text-body-xs text-ink-700/50 bg-ivory-100 px-2 py-0.5 rounded-full">
            {result.docs.length} {result.docs.length === 1 ? 'doc' : 'docs'}
          </span>
        </div>
        <motion.span
          animate={{ rotate: isOpen ? 180 : 0 }}
          transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
          className="flex-shrink-0 text-ink-700/50 group-hover:text-coral-500 transition-colors duration-200"
        >
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <polyline points="6 9 12 15 18 9" />
          </svg>
        </motion.span>
      </button>
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
            className="overflow-hidden"
          >
            <div className="px-6 pb-4 space-y-2">
              {result.docs.map((d) => (
                <DocumentCard key={d.id} id={d.id} data={d.data} />
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  )
}

export function Memory() {
  const { user, isLoading: authLoading, signInWithGoogle, signOut } = useAuth()
  const [collections, setCollections] = useState<CollectionResult[]>([])
  const [fetching, setFetching] = useState(false)
  const [fetched, setFetched] = useState(false)

  const { ref: sectionRef, isInView: sectionInView } = useScrollReveal<HTMLElement>({
    threshold: 0.1,
  })

  const fetchData = useCallback(async (uid: string) => {
    setFetching(true)
    const results: CollectionResult[] = []

    // 1. Saved items from Chrome extension: users/{uid}/savedItems
    try {
      const snap = await getDocs(collection(db, 'users', uid, 'savedItems'))
      if (!snap.empty) {
        results.push({
          name: 'Saved Items',
          docs: snap.docs.map((d) => ({ id: d.id, data: d.data() as FirestoreData })),
        })
      }
    } catch {
      // permission-denied — skip
    }

    // 2. User profile doc: users/{uid}
    try {
      const snap = await getDoc(doc(db, 'users', uid))
      if (snap.exists()) {
        results.push({ name: 'Profile', docs: [{ id: snap.id, data: snap.data() as FirestoreData }] })
      }
    } catch {
      // permission-denied — skip
    }

    setCollections(results)
    setFetched(true)
    setFetching(false)
  }, [])

  useEffect(() => {
    if (user && !fetched && !fetching) {
      fetchData(user.uid)
    }
  }, [user, fetched, fetching, fetchData])

  // Reset when user signs out
  useEffect(() => {
    if (!user) {
      setCollections([])
      setFetched(false)
    }
  }, [user])

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
      ref={sectionRef}
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
            animate={{ opacity: sectionInView ? 1 : 0, y: sectionInView ? 0 : 20 }}
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
              animate={{ opacity: sectionInView ? 1 : 0, y: sectionInView ? 0 : 40 }}
              transition={{ duration: 1, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
              className="font-serif text-display-md md:text-display-lg text-ink-900 mb-4"
            >
              Your <span className="italic">Memory</span>
            </motion.h1>
            <motion.p
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: sectionInView ? 1 : 0, y: sectionInView ? 0 : 30 }}
              transition={{ duration: 1, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
              className="font-mono text-body-lg text-ink-700/80 max-w-2xl mx-auto"
            >
              Data saved by the Read Sidekick extension.
            </motion.p>
          </div>

          {/* Content */}
          {fetching && (
            <div className="flex items-center justify-center py-20">
              <div className="animate-spin w-8 h-8 border-2 border-coral-500 border-t-transparent rounded-full" />
            </div>
          )}

          {fetched && !fetching && collections.length === 0 && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
              className="text-center py-20"
            >
              <p className="font-mono text-body-lg text-ink-700/50">
                No saved data found for your account.
              </p>
              <p className="font-mono text-body-sm text-ink-700/40 mt-2">
                Use the Read Sidekick extension to save data, then come back here to view it.
              </p>
            </motion.div>
          )}

          {fetched && !fetching && collections.length > 0 && (
            <div className="space-y-4">
              {collections.map((result) => (
                <CollectionCard key={result.name} result={result} />
              ))}
            </div>
          )}
        </div>
      </div>

      <div className="absolute bottom-0 left-0 right-0 h-px bg-ink-800/10" />
    </section>
  )
}
