interface TextInputProps {
  value: string;
  onChange: (value: string) => void;
  disabled?: boolean;
  placeholder?: string;
  label: string;
}

export default function TextInput({
  value,
  onChange,
  disabled = false,
  placeholder = 'Enter text here...',
  label,
}: TextInputProps) {
  const charCount = value.length;

  return (
    <div className="flex flex-col gap-2">
      <label className="font-sans font-medium text-ink-800 text-sm">{label}</label>
      <div className="relative">
        <textarea
          value={value}
          onChange={(e) => onChange(e.target.value)}
          disabled={disabled}
          placeholder={placeholder}
          className="w-full h-40 p-4 rounded-lg border-2 border-ivory-200 bg-ivory-50 font-mono text-sm text-ink-700 placeholder:text-ink-700/50 focus:outline-none focus:border-coral-400 focus:ring-2 focus:ring-coral-400/20 transition-all duration-200 ease-editorial disabled:bg-ivory-100 disabled:cursor-not-allowed resize-none"
        />
        <div className="absolute bottom-3 right-3 text-xs font-mono text-ink-700/60">
          {charCount} characters
        </div>
      </div>
    </div>
  );
}
