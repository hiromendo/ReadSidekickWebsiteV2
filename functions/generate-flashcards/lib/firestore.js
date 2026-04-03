"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
exports.getSavedItems = getSavedItems;
exports.saveFlashcardSet = saveFlashcardSet;
exports.getLatestFlashcardSet = getLatestFlashcardSet;
const admin = __importStar(require("firebase-admin"));
async function getSavedItems(uid) {
    const db = admin.firestore();
    const snap = await db.collection('users').doc(uid).collection('savedItems').get();
    const items = [];
    for (const doc of snap.docs) {
        const data = doc.data();
        // Scan all string fields > 50 chars to extract text content
        const texts = [];
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
async function saveFlashcardSet(uid, content, sourceItems) {
    const db = admin.firestore();
    const totalCards = content.vocabulary.length +
        content.phrases.length +
        content.comprehension.length;
    const set = {
        content,
        createdAt: admin.firestore.Timestamp.now(),
        sourceItemCount: sourceItems.length,
        sourceItemIds: sourceItems.map((s) => s.id),
        totalCards,
    };
    await db.collection('users').doc(uid).collection('flashcards').add(set);
    return set;
}
async function getLatestFlashcardSet(uid) {
    const db = admin.firestore();
    const snap = await db
        .collection('users')
        .doc(uid)
        .collection('flashcards')
        .orderBy('createdAt', 'desc')
        .limit(1)
        .get();
    if (snap.empty)
        return null;
    return snap.docs[0].data();
}
