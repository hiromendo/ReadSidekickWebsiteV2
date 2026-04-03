import * as admin from 'firebase-admin';
import { FlashcardContent, FlashcardSet } from './types';

export interface SavedItemText {
  id: string;
  text: string;
}

export async function getSavedItems(uid: string): Promise<SavedItemText[]> {
  const db = admin.firestore();
  const snap = await db.collection('users').doc(uid).collection('savedItems').get();

  const items: SavedItemText[] = [];
  for (const doc of snap.docs) {
    const data = doc.data();
    // Scan all string fields > 50 chars to extract text content
    const texts: string[] = [];
    for (const [, value] of Object.entries(data)) {
      if (typeof value === 'string' && value.length > 50) {
        texts.push(value);
      }
    }
    if (texts.length > 0) {
      items.push({ id: doc.id, text: texts.join('\n\n') });
    }
  }

  return items;
}

export async function saveFlashcardSet(
  uid: string,
  content: FlashcardContent,
  sourceItems: SavedItemText[]
): Promise<FlashcardSet> {
  const db = admin.firestore();
  const totalCards =
    content.vocabulary.length +
    content.phrases.length;

  const set: FlashcardSet = {
    content,
    createdAt: admin.firestore.Timestamp.now(),
    sourceItemCount: sourceItems.length,
    sourceItemIds: sourceItems.map((s) => s.id),
    totalCards,
  };

  await db.collection('users').doc(uid).collection('flashcards').add(set);
  return set;
}

export async function getLatestFlashcardSet(uid: string): Promise<FlashcardSet | null> {
  const db = admin.firestore();
  const snap = await db
    .collection('users')
    .doc(uid)
    .collection('flashcards')
    .orderBy('createdAt', 'desc')
    .limit(1)
    .get();

  if (snap.empty) return null;
  return snap.docs[0].data() as FlashcardSet;
}
