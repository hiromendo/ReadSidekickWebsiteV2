import { FlashcardContent, FlashcardSet } from './types';
export interface SavedItemText {
    id: string;
    text: string;
}
export declare function getSavedItems(uid: string): Promise<SavedItemText[]>;
export declare function saveFlashcardSet(uid: string, content: FlashcardContent, sourceItems: SavedItemText[]): Promise<FlashcardSet>;
export declare function getLatestFlashcardSet(uid: string): Promise<FlashcardSet | null>;
