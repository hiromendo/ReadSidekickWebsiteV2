import type { FlashcardSet } from './flashcard-types'

const API_URL = import.meta.env.VITE_FLASHCARD_API_URL

export async function generateFlashcards(idToken: string): Promise<FlashcardSet> {
  const res = await fetch(API_URL, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${idToken}`,
    },
  })

  if (!res.ok) {
    const body = await res.json().catch(() => ({}))
    throw new Error(body.error || `Request failed with status ${res.status}`)
  }

  const data = await res.json()
  return data.flashcardSet as FlashcardSet
}

export async function fetchMemoryData(idToken: string): Promise<{
  savedItemCount: number
  latestFlashcardSet: FlashcardSet | null
}> {
  const res = await fetch(API_URL, {
    method: 'GET',
    headers: {
      Authorization: `Bearer ${idToken}`,
    },
  })

  if (!res.ok) {
    const body = await res.json().catch(() => ({}))
    throw new Error(body.error || `Request failed with status ${res.status}`)
  }

  const data = await res.json()
  return {
    savedItemCount: data.savedItemCount ?? 0,
    latestFlashcardSet: data.latestFlashcardSet ?? null,
  }
}
