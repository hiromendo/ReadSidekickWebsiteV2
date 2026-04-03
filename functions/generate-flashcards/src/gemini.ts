import { GoogleGenerativeAI } from '@google/generative-ai';

const apiKey = process.env.GEMINI_API_KEY;
if (!apiKey) {
  throw new Error('GEMINI_API_KEY environment variable is not set');
}

const client = new GoogleGenerativeAI(apiKey);

const model = client.getGenerativeModel({
  model: 'gemini-2.5-flash',
  generationConfig: {
    temperature: 0.3,
    responseMimeType: 'application/json',
  },
});

const PROMPT = `You are an expert language learning assistant. Analyze the following reading texts and generate flashcards for a learner.

Generate a JSON object with exactly this structure:
{
  "vocabulary": [
    {
      "word": "string — a notable vocabulary word from the text",
      "definition": "string — clear, concise definition",
      "exampleSentence": "string — the exact sentence from the text where this word appears",
      "difficulty": 1 | 2 | 3  // 1=beginner, 2=intermediate, 3=advanced
    }
  ],
  "phrases": [
    {
      "phrase": "string — an idiomatic phrase or notable expression from the text",
      "meaning": "string — what this phrase means",
      "context": "string — the surrounding text where this phrase appears"
    }
  ],
  "comprehension": [
    {
      "question": "string — a comprehension question about the text",
      "answer": "string — the correct answer",
      "textExcerpt": "string — the relevant excerpt from the text"
    }
  ]
}

Guidelines:
- Generate 8-15 vocabulary cards, focusing on words that are useful for language learners
- Generate 5-10 phrase cards, focusing on idiomatic or notable expressions
- Generate 5-8 comprehension questions that test understanding of the text
- Use exact quotes from the text for exampleSentence, context, and textExcerpt
- Vary difficulty levels across vocabulary cards
- Make comprehension questions range from factual recall to inferential understanding

TEXTS:
`;

export async function generateFlashcards(texts: string[]): Promise<unknown> {
  // Truncate each text to ~8000 chars, use up to 10 texts
  const truncated = texts.slice(0, 10).map((t) =>
    t.length > 8000 ? t.slice(0, 8000) + '...' : t
  );

  const fullPrompt = PROMPT + truncated.map((t, i) => `--- Text ${i + 1} ---\n${t}`).join('\n\n');

  // Retry up to 2 times on parse failure
  for (let attempt = 0; attempt < 3; attempt++) {
    const result = await model.generateContent(fullPrompt);
    const text = result.response.text();

    if (!text) {
      throw new Error('Gemini returned empty response');
    }

    try {
      const parsed = JSON.parse(text);
      // Basic validation
      if (parsed.vocabulary && parsed.phrases && parsed.comprehension) {
        return parsed;
      }
      console.warn(`Attempt ${attempt + 1}: Response missing required fields, retrying...`);
    } catch (e) {
      console.warn(`Attempt ${attempt + 1}: Failed to parse JSON, retrying...`, e);
    }
  }

  throw new Error('Failed to get valid JSON from Gemini after 3 attempts');
}
