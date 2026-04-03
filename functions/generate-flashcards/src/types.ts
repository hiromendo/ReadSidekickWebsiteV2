import { Timestamp } from 'firebase-admin/firestore';

export interface VocabularyCard {
  word: string;
  definition: string;
  exampleSentence: string;
  difficulty: 1 | 2 | 3;
}

export interface PhraseCard {
  phrase: string;
  meaning: string;
  context: string;
}

export interface FlashcardContent {
  vocabulary: VocabularyCard[];
  phrases: PhraseCard[];
}

export interface FlashcardSet {
  content: FlashcardContent;
  createdAt: Timestamp;
  sourceItemCount: number;
  sourceItemIds: string[];
  totalCards: number;
}
