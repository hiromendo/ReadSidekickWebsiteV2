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
export declare function getSavedItems(uid: string): Promise<SavedItemText[]>;
export declare function saveFlashcardSet(uid: string, content: FlashcardContent, sourceItems: SavedItemText[]): Promise<FlashcardSet>;
export declare function getSavedItemsFull(uid: string): Promise<SavedItemFull[]>;
export declare function deleteSavedItem(uid: string, itemId: string): Promise<void>;
export declare function getLatestFlashcardSet(uid: string): Promise<FlashcardSet | null>;
