interface ActionButtonProps {
  onClick: () => void;
  disabled?: boolean;
  loading?: boolean;
  variant?: 'primary' | 'secondary';
  children: React.ReactNode;
}

export default function ActionButton({
  onClick,
  disabled = false,
  loading = false,
  variant = 'primary',
  children,
}: ActionButtonProps) {
  const baseStyles =
    'px-6 py-3 rounded-lg font-sans font-semibold text-base transition-all duration-300 ease-editorial disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2';

  const variantStyles = {
    primary:
      'bg-coral-500 text-white hover:bg-coral-600 active:bg-coral-600 shadow-md hover:shadow-lg',
    secondary:
      'bg-teal-400 text-ink-800 hover:bg-teal-500 active:bg-teal-500 shadow-md hover:shadow-lg',
  };

  return (
    <button
      onClick={onClick}
      disabled={disabled || loading}
      className={`${baseStyles} ${variantStyles[variant]}`}
    >
      {loading && (
        <svg
          className="animate-spin h-5 w-5"
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
        >
          <circle
            className="opacity-25"
            cx="12"
            cy="12"
            r="10"
            stroke="currentColor"
            strokeWidth="4"
          />
          <path
            className="opacity-75"
            fill="currentColor"
            d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
          />
        </svg>
      )}
      {children}
    </button>
  );
}
