interface TranslationOutputProps {
  originalTranslation: string;
  editedTranslation: string;
  onChange: (value: string) => void;
  onReset: () => void;
  disabled?: boolean;
}

export default function TranslationOutput({
  originalTranslation,
  editedTranslation,
  onChange,
  onReset,
  disabled = false,
}: TranslationOutputProps) {
  const isModified = originalTranslation !== editedTranslation;
  const charCount = editedTranslation.length;

  return (
    <div className="flex flex-col gap-2 animate-slide-up">
      <div className="flex items-center justify-between">
        <label className="font-sans font-medium text-ink-800 text-sm">
          ASL Translation
          {isModified && (
            <span className="ml-2 text-xs text-ochre-400 font-normal">(modified)</span>
          )}
        </label>
        {isModified && (
          <button
            onClick={onReset}
            disabled={disabled}
            className="text-xs font-sans text-coral-500 hover:text-coral-600 transition-colors disabled:opacity-50"
          >
            Reset to original
          </button>
        )}
      </div>
      <div className="relative">
        <textarea
          value={editedTranslation}
          onChange={(e) => onChange(e.target.value)}
          disabled={disabled}
          className={`w-full h-40 p-4 rounded-lg border-2 bg-ivory-50 font-mono text-sm text-ink-700 focus:outline-none focus:border-coral-400 focus:ring-2 focus:ring-coral-400/20 transition-all duration-200 ease-editorial disabled:bg-ivory-100 disabled:cursor-not-allowed resize-none ${
            isModified ? 'border-ochre-400' : 'border-ivory-200'
          }`}
        />
        <div className="absolute bottom-3 right-3 text-xs font-mono text-ink-700/60">
          {charCount} characters
        </div>
      </div>
    </div>
  );
}
