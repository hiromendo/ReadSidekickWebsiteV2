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
exports.generateFlashcardsHandler = generateFlashcardsHandler;
const admin = __importStar(require("firebase-admin"));
const firestore_1 = require("./firestore");
const gemini_1 = require("./gemini");
admin.initializeApp();
async function generateFlashcardsHandler(req, res) {
    // CORS
    res.set('Access-Control-Allow-Origin', '*');
    res.set('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
    res.set('Access-Control-Allow-Headers', 'Content-Type, Authorization');
    if (req.method === 'OPTIONS') {
        res.status(204).send('');
        return;
    }
    if (req.method !== 'GET' && req.method !== 'POST') {
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
    let uid;
    try {
        const decoded = await admin.auth().verifyIdToken(token);
        uid = decoded.uid;
    }
    catch {
        res.status(401).json({ success: false, error: 'Invalid or expired token' });
        return;
    }
    // GET — return saved item count + latest flashcard set
    if (req.method === 'GET') {
        try {
            const [latestFlashcardSet, savedItemsFull] = await Promise.all([
                (0, firestore_1.getLatestFlashcardSet)(uid),
                (0, firestore_1.getSavedItemsFull)(uid),
            ]);
            res.json({
                success: true,
                savedItemCount: savedItemsFull.length,
                latestFlashcardSet,
                savedItems: savedItemsFull.map((item) => {
                    const ts = item.timestamp;
                    let millis = 0;
                    if (ts && typeof ts.toMillis === 'function')
                        millis = ts.toMillis();
                    else if (ts && typeof ts.seconds === 'number')
                        millis = ts.seconds * 1000;
                    return {
                        id: item.id,
                        text: item.text,
                        sourceUrl: item.sourceUrl,
                        sourceTitle: item.sourceTitle,
                        timestamp: millis,
                    };
                }),
            });
        }
        catch (error) {
            console.error('Fetch memory data error:', error);
            res.status(500).json({ success: false, error: 'Failed to fetch memory data' });
        }
        return;
    }
    try {
        // Rate limit: reject if last set was generated < 5 min ago
        const latest = await (0, firestore_1.getLatestFlashcardSet)(uid);
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
        const items = await (0, firestore_1.getSavedItems)(uid);
        if (items.length === 0) {
            res.status(400).json({ success: false, error: 'No saved items found' });
            return;
        }
        // Generate flashcards
        const texts = items.map((i) => i.text);
        const content = (await (0, gemini_1.generateFlashcards)(texts));
        // Save to Firestore
        const flashcardSet = await (0, firestore_1.saveFlashcardSet)(uid, content, items);
        res.json({ success: true, flashcardSet });
    }
    catch (error) {
        console.error('Flashcard generation error:', error);
        res.status(500).json({ success: false, error: 'Failed to generate flashcards' });
    }
}
// Cloud Functions entry point
exports.generateFlashcards = generateFlashcardsHandler;
