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
exports.getSavedItemsFull = getSavedItemsFull;
exports.getLatestFlashcardSet = getLatestFlashcardSet;
const admin = __importStar(require("firebase-admin"));
function extractLongText(data) {
    const texts = [];
    for (const [, value] of Object.entries(data)) {
        if (typeof value === 'string' && value.length > 50) {
            texts.push(value);
        }
    }
    return texts.join('\n\n');
}
function readTimestampMillis(ts) {
    if (!ts)
        return 0;
    if (typeof ts.toMillis === 'function') {
        return ts.toMillis();
    }
    const seconds = ts.seconds;
    return typeof seconds === 'number' ? seconds * 1000 : 0;
}
async function getSavedItems(uid) {
    const db = admin.firestore();
    const snap = await db.collection('users').doc(uid).collection('savedItems').get();
    const items = [];
    for (const doc of snap.docs) {
        const text = extractLongText(doc.data());
        if (text.length > 0) {
            items.push({ id: doc.id, text });
        }
    }
    return items;
}
async function saveFlashcardSet(uid, content, sourceItems) {
    const db = admin.firestore();
    const totalCards = content.vocabulary.length +
        content.phrases.length;
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
async function getSavedItemsFull(uid) {
    const db = admin.firestore();
    // No orderBy: Firestore silently excludes docs missing the sort field,
    // so older savedItems written without a `timestamp` would disappear.
    const snap = await db.collection('users').doc(uid).collection('savedItems').get();
    const items = [];
    for (const doc of snap.docs) {
        const data = doc.data();
        const text = (typeof data.text === 'string' && data.text.length > 0)
            ? data.text
            : extractLongText(data);
        if (!text)
            continue;
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
