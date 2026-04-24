import * as admin from 'firebase-admin';
import { getSavedItems, getSavedItemsFull, saveFlashcardSet, getLatestFlashcardSet, deleteSavedItem } from './firestore';
import { generateFlashcards } from './gemini';
import { FlashcardContent } from './types';

admin.initializeApp();

interface HttpRequest {
  method: string;
  headers: Record<string, string | undefined>;
  body?: unknown;
  query?: Record<string, string | string[] | undefined>;
}

interface HttpResponse {
  set(key: string, value: string): void;
  status(code: number): HttpResponse;
  send(body: string): void;
  json(body: unknown): void;
}

export async function generateFlashcardsHandler(req: HttpRequest, res: HttpResponse) {
  // CORS
  res.set('Access-Control-Allow-Origin', '*');
  res.set('Access-Control-Allow-Methods', 'GET, POST, DELETE, OPTIONS');
  res.set('Access-Control-Allow-Headers', 'Content-Type, Authorization');

  if (req.method === 'OPTIONS') {
    res.status(204).send('');
    return;
  }

  if (req.method !== 'GET' && req.method !== 'POST' && req.method !== 'DELETE') {
    res.status(405).json({ success: false, error: 'Method not allowed' });
    return;
  }

  // Auth
  const authHeader = req.headers.authorization;
  if (!authHeader?.startsWith('Bearer ')) {
    res.status(401).json({ success: false, error: 'Missing or invalid Authorization header' });
    return;
  }

  const token = authHeader.split('Bearer ')[1];
  let uid: string;
  try {
    const decoded = await admin.auth().verifyIdToken(token);
    uid = decoded.uid;
  } catch {
    res.status(401).json({ success: false, error: 'Invalid or expired token' });
    return;
  }

  // GET — return saved item count + latest flashcard set
  if (req.method === 'GET') {
    try {
      const [latestFlashcardSet, savedItemsFull] = await Promise.all([
        getLatestFlashcardSet(uid),
        getSavedItemsFull(uid),
      ]);
      res.json({
        success: true,
        savedItemCount: savedItemsFull.length,
        latestFlashcardSet,
        savedItems: savedItemsFull.map((item) => {
          const ts = item.timestamp as
            | { toMillis?: () => number; seconds?: number }
            | null;
          let millis = 0;
          if (ts && typeof ts.toMillis === 'function') millis = ts.toMillis();
          else if (ts && typeof ts.seconds === 'number') millis = ts.seconds * 1000;
          return {
            id: item.id,
            text: item.text,
            sourceUrl: item.sourceUrl,
            sourceTitle: item.sourceTitle,
            timestamp: millis,
          };
        }),
      });
    } catch (error) {
      console.error('Fetch memory data error:', error);
      res.status(500).json({ success: false, error: 'Failed to fetch memory data' });
    }
    return;
  }

  // DELETE — remove a single saved item
  if (req.method === 'DELETE') {
    const itemIdRaw = req.query?.itemId;
    const itemId = typeof itemIdRaw === 'string' ? itemIdRaw : undefined;
    if (!itemId) {
      res.status(400).json({ success: false, error: 'Missing itemId' });
      return;
    }
    try {
      await deleteSavedItem(uid, itemId);
      res.json({ success: true });
    } catch (error) {
      console.error('Delete saved item error:', error);
      res.status(500).json({ success: false, error: 'Failed to delete saved item' });
    }
    return;
  }

  try {
    // Rate limit: reject if last set was generated < 5 min ago
    const latest = await getLatestFlashcardSet(uid);
    if (latest) {
      const ageMs = Date.now() - latest.createdAt.toMillis();
      if (ageMs < 5 * 60 * 1000) {
        res.status(429).json({
          success: false,
          error: 'Please wait at least 5 minutes between generations',
          flashcardSet: latest,
        });
        return;
      }
    }

    // Get saved items
    const items = await getSavedItems(uid);
    if (items.length === 0) {
      res.status(400).json({ success: false, error: 'No saved items found' });
      return;
    }

    // Generate flashcards
    const texts = items.map((i) => i.text);
    const content = (await generateFlashcards(texts)) as FlashcardContent;

    // Save to Firestore
    const flashcardSet = await saveFlashcardSet(uid, content, items);

    res.json({ success: true, flashcardSet });
  } catch (error) {
    console.error('Flashcard generation error:', error);
    res.status(500).json({ success: false, error: 'Failed to generate flashcards' });
  }
}

// Cloud Functions entry point
exports.generateFlashcards = generateFlashcardsHandler;
