import { useState } from 'react';
import { useAuth } from '../auth/AuthContext';
import TextInput from '../components/asl-translator/TextInput';
import TranslationOutput from '../components/asl-translator/TranslationOutput';
import ActionButton from '../components/asl-translator/ActionButton';
import StatusMessage from '../components/asl-translator/StatusMessage';
import { translateText, saveToGoogleSheets } from '../services/asl-api';
import { trackEvent } from '../utils/analytics';

export function ASLTranslator() {
  const { user, signOut } = useAuth();
  const [sourceText, setSourceText] = useState('');
  const [translatedText, setTranslatedText] = useState('');
  const [editedTranslation, setEditedTranslation] = useState('');
  const [isTranslating, setIsTranslating] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);

  const handleTranslate = async () => {
    if (!sourceText.trim()) return;

    setError(null);
    setSuccessMessage(null);
    setIsTranslating(true);
    trackEvent('translate_click', { text_length: String(sourceText.length) });

    const result = await translateText(sourceText);

    setIsTranslating(false);

    if (result.success) {
      setTranslatedText(result.translation);
      setEditedTranslation(result.translation);
    } else {
      setError(result.error || 'Translation failed. Please try again.');
    }
  };

  const handleSave = async () => {
    if (!sourceText.trim() || !editedTranslation.trim()) return;

    setError(null);
    setSuccessMessage(null);
    setIsSaving(true);
    trackEvent('save_sheets_click');

    const result = await saveToGoogleSheets(sourceText, editedTranslation);

    setIsSaving(false);

    if (result.success) {
      setSuccessMessage(
        `Saved successfully${result.rowNumber ? ` (row ${result.rowNumber})` : ''}`
      );
      // Clear all fields after successful save
      setSourceText('');
      setTranslatedText('');
      setEditedTranslation('');
    } else {
      setError(result.error || 'Save failed. Please try again.');
    }
  };

  const handleResetTranslation = () => {
    setEditedTranslation(translatedText);
  };

  const handleSignOut = async () => {
    try {
      await signOut();
    } catch (err) {
      console.error('Error signing out:', err);
    }
  };

  const canTranslate = sourceText.trim().length > 0 && !isTranslating;
  const canSave = editedTranslation.trim().length > 0 && !isSaving && !isTranslating;
  const hasTranslation = translatedText.length > 0;

  return (
    <div className="min-h-screen bg-ivory-100 py-8 px-4">
      <div className="max-w-2xl mx-auto">
        <header className="mb-8 animate-slide-up">
          <div className="flex items-center justify-between mb-4">
            <div></div>
            <div className="flex items-center gap-4">
              <span className="text-xs font-mono text-ink-700/70">
                {user?.email}
              </span>
              <button
                onClick={handleSignOut}
                className="text-xs font-sans text-coral-500 hover:text-coral-600 transition-colors"
              >
                Sign out
              </button>
            </div>
          </div>
          <div className="text-center">
            <h1 className="text-3xl font-serif font-bold text-ink-800 mb-2">
              English to ASL Translation
            </h1>
            <p className="text-sm font-mono text-ink-700/70">
              Translate English text to ASL gloss notation
            </p>
          </div>
        </header>

        <div className="space-y-6">
          {(error || successMessage) && (
            <StatusMessage
              type={error ? 'error' : 'success'}
              message={error || successMessage || ''}
              onDismiss={() => {
                setError(null);
                setSuccessMessage(null);
              }}
            />
          )}

          <div className="bg-ivory-50 rounded-xl p-6 shadow-sm animate-slide-up">
            <TextInput
              label="Source Text (English)"
              value={sourceText}
              onChange={setSourceText}
              disabled={isTranslating}
              placeholder="Paste or type your English text here..."
            />

            <div className="mt-4 flex justify-end">
              <ActionButton
                onClick={handleTranslate}
                disabled={!canTranslate}
                loading={isTranslating}
                variant="primary"
              >
                {isTranslating ? 'Translating...' : 'Translate'}
              </ActionButton>
            </div>
          </div>

          {hasTranslation && (
            <div className="bg-ivory-50 rounded-xl p-6 shadow-sm">
              <TranslationOutput
                originalTranslation={translatedText}
                editedTranslation={editedTranslation}
                onChange={setEditedTranslation}
                onReset={handleResetTranslation}
                disabled={isSaving}
              />

              <div className="mt-4 flex justify-end">
                <ActionButton
                  onClick={handleSave}
                  disabled={!canSave}
                  loading={isSaving}
                  variant="secondary"
                >
                  {isSaving ? 'Saving...' : 'Save to Google Sheets'}
                </ActionButton>
              </div>
            </div>
          )}
        </div>

        <footer className="mt-12 text-center text-xs font-mono text-ink-700/50">
          <p>Internal translation tool</p>
        </footer>
      </div>
    </div>
  );
}
