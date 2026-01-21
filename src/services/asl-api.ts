import type { TranslationResponse, SaveResponse } from './asl-types';

const TRANSLATION_API_URL = import.meta.env.VITE_TRANSLATION_API_URL ?? '';
const SHEETS_API_URL = import.meta.env.VITE_SHEETS_API_URL ?? '';
const USE_MOCK_API = import.meta.env.VITE_USE_MOCK_API === 'true' || !TRANSLATION_API_URL || !SHEETS_API_URL;

// Mock implementation for testing
async function mockTranslate(text: string): Promise<TranslationResponse> {
  await new Promise((resolve) => setTimeout(resolve, 1000));

  // Simple mock: convert to uppercase words as "ASL gloss"
  const words = text.trim().split(/\s+/);
  const glossWords = words.map((word) => word.toUpperCase().replace(/[.,!?;:'"]/g, ''));
  const translation = glossWords.join(' ');

  return {
    success: true,
    translation: `[ASL GLOSS] ${translation}`,
  };
}

async function mockSave(source: string, translation: string): Promise<SaveResponse> {
  await new Promise((resolve) => setTimeout(resolve, 800));

  console.log('Mock save to Google Sheets:', { source, translation });

  return {
    success: true,
    rowNumber: Math.floor(Math.random() * 1000) + 1,
  };
}

export async function translateText(text: string): Promise<TranslationResponse> {
  if (USE_MOCK_API) {
    return mockTranslate(text);
  }

  try {
    const response = await fetch(TRANSLATION_API_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ text }),
    });

    if (!response.ok) {
      throw new Error(`Translation failed: ${response.statusText}`);
    }

    return await response.json();
  } catch (error) {
    return {
      success: false,
      translation: '',
      error: error instanceof Error ? error.message : 'Translation failed',
    };
  }
}

export async function saveToGoogleSheets(
  source: string,
  translation: string
): Promise<SaveResponse> {
  if (USE_MOCK_API) {
    return mockSave(source, translation);
  }

  try {
    const response = await fetch(SHEETS_API_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ source, translation }),
    });

    if (!response.ok) {
      throw new Error(`Save failed: ${response.statusText}`);
    }

    return await response.json();
  } catch (error) {
    return {
      success: false,
      error: error instanceof Error ? error.message : 'Save failed',
    };
  }
}
