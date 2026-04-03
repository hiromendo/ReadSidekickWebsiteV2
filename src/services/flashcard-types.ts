export interface VocabularyCard {
  word: string
  definition: string
  exampleSentence: string
  difficulty: 1 | 2 | 3
}

export interface PhraseCard {
  phrase: string
  meaning: string
  context: string
}

export interface FlashcardContent {
  vocabulary: VocabularyCard[]
  phrases: PhraseCard[]
}

export interface FlashcardSet {
  content: FlashcardContent
  createdAt: { toMillis: () => number } | { seconds: number; nanoseconds: number }
  sourceItemCount: number
  sourceItemIds: string[]
  totalCards: number
}

export interface SavedItem {
  id: string
  text: string
  sourceUrl: string
  sourceTitle: string
  timestamp: number
}
