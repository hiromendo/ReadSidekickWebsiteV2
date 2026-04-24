import * as admin from 'firebase-admin';
import { FlashcardContent, FlashcardSet } from './types';

export interface SavedItemText {
  id: string;
  text: string;
}

export interface SavedItemFull {
  id: string;
  text: string;
  sourceUrl: string;
  sourceTitle: string;
  timestamp: admin.firestore.Timestamp | null;
}

function extractLongText(data: Record<string, unknown>): string {
  const texts: string[] = [];
  for (const [, value] of Object.entries(data)) {
    if (typeof value === 'string' && value.length > 50) {
      texts.push(value);
    }
  }
  return texts.join('\n\n');
}

function readTimestampMillis(
  ts: admin.firestore.Timestamp | { seconds?: number; nanoseconds?: number } | null | undefined
): number {
  if (!ts) return 0;
  if (typeof (ts as admin.firestore.Timestamp).toMillis === 'function') {
    return (ts as admin.firestore.Timestamp).toMillis();
  }
  const seconds = (ts as { seconds?: number }).seconds;
  return typeof seconds === 'number' ? seconds * 1000 : 0;
}

export async function getSavedItems(uid: string): Promise<SavedItemText[]> {
  const db = admin.firestore();
  const snap = await db.collection('users').doc(uid).collection('savedItems').get();

  const items: SavedItemText[] = [];
  for (const doc of snap.docs) {
    const text = extractLongText(doc.data());
    if (text.length > 0) {
      items.push({ id: doc.id, text });
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

export async function getSavedItemsFull(uid: string): Promise<SavedItemFull[]> {
  const db = admin.firestore();
  // No orderBy: Firestore silently excludes docs missing the sort field,
  // so older savedItems written without a `timestamp` would disappear.
  const snap = await db.collection('users').doc(uid).collection('savedItems').get();

  const items: SavedItemFull[] = [];
  for (const doc of snap.docs) {
    const data = doc.data();
    const text =
      (typeof data.text === 'string' && data.text.length > 0)
        ? data.text
        : extractLongText(data);
    if (!text) continue;
    items.push({
      id: doc.id,
      text,
      sourceUrl: typeof data.sourceUrl === 'string' ? data.sourceUrl : '',
      sourceTitle: typeof data.sourceTitle === 'string' ? data.sourceTitle : '',
      timestamp: data.timestamp ?? null,
    });
  }

  items.sort((a, b) => readTimestampMillis(b.timestamp) - readTimestampMillis(a.timestamp));
  return items;
}

export async function deleteSavedItem(uid: string, itemId: string): Promise<void> {
  const db = admin.firestore();
  await db.collection('users').doc(uid).collection('savedItems').doc(itemId).delete();
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
