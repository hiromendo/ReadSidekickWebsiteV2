import type { FlashcardSet, SavedItem } from './flashcard-types'

const API_URL = import.meta.env.VITE_FLASHCARD_API_URL

function requireApiUrl(): string {
  if (!API_URL) {
    throw new Error('Memory service is not configured. Please try again later.')
  }
  return API_URL
}

export async function generateFlashcards(idToken: string): Promise<FlashcardSet> {
  const res = await fetch(requireApiUrl(), {
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

export async function deleteSavedItem(idToken: string, itemId: string): Promise<void> {
  const url = `${requireApiUrl()}?itemId=${encodeURIComponent(itemId)}`
  const res = await fetch(url, {
    method: 'DELETE',
    headers: {
      Authorization: `Bearer ${idToken}`,
    },
  })

  if (!res.ok) {
    const body = await res.json().catch(() => ({}))
    throw new Error(body.error || `Request failed with status ${res.status}`)
  }
}

export async function fetchMemoryData(idToken: string): Promise<{
  savedItemCount: number
  latestFlashcardSet: FlashcardSet | null
  savedItems: SavedItem[]
}> {
  const res = await fetch(requireApiUrl(), {
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
    savedItems: data.savedItems ?? [],
  }
}
