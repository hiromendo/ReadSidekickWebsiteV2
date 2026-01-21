interface StatusMessageProps {
  type: 'error' | 'success';
  message: string;
  onDismiss: () => void;
}

export default function StatusMessage({ type, message, onDismiss }: StatusMessageProps) {
  const styles = {
    error: 'bg-ochre-300 border-ochre-400 text-ink-800',
    success: 'bg-teal-300 border-teal-400 text-ink-800',
  };

  return (
    <div
      className={`animate-fade-in rounded-lg border-2 p-4 flex items-center justify-between ${styles[type]}`}
      role="alert"
    >
      <div className="flex items-center gap-3">
        {type === 'error' ? (
          <svg
            className="h-5 w-5 text-ochre-500"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 20 20"
            fill="currentColor"
          >
            <path
              fillRule="evenodd"
              d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z"
              clipRule="evenodd"
            />
          </svg>
        ) : (
          <svg
            className="h-5 w-5 text-teal-500"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 20 20"
            fill="currentColor"
          >
            <path
              fillRule="evenodd"
              d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
              clipRule="evenodd"
            />
          </svg>
        )}
        <span className="font-mono text-sm">{message}</span>
      </div>
      <button
        onClick={onDismiss}
        className="text-ink-700 hover:text-ink-800 transition-colors"
        aria-label="Dismiss"
      >
        <svg
          className="h-5 w-5"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 20 20"
          fill="currentColor"
        >
          <path
            fillRule="evenodd"
            d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
            clipRule="evenodd"
          />
        </svg>
      </button>
    </div>
  );
}
