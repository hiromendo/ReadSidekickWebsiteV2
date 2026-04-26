import { forwardRef, type ButtonHTMLAttributes } from 'react'
import { cva, type VariantProps } from 'class-variance-authority'
import { cn } from '../cn'

const button = cva(
  [
    'inline-flex items-center justify-center gap-2',
    'font-ui font-semibold',
    'rounded-lg',
    'transition-all ease-editorial duration-base',
    'disabled:opacity-50 disabled:cursor-not-allowed',
    'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-focus focus-visible:ring-offset-2 focus-visible:ring-offset-surface',
  ],
  {
    variants: {
      variant: {
        primary:
          'bg-brand text-fg-on-brand hover:bg-brand-hover active:bg-brand-hover shadow-md hover:shadow-lg',
        secondary:
          'bg-accent text-fg-inverse hover:bg-accent-hover active:bg-accent-hover shadow-md hover:shadow-lg',
        ghost: 'bg-transparent text-fg hover:bg-surface-sunken',
      },
      size: {
        sm: 'px-4 py-2 text-body-sm',
        md: 'px-6 py-3 text-body-md',
        lg: 'px-8 py-4 text-body-lg',
      },
    },
    defaultVariants: { variant: 'primary', size: 'md' },
  },
)

type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> &
  VariantProps<typeof button> & {
    loading?: boolean
  }

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(function Button(
  { className, variant, size, loading, disabled, children, ...rest },
  ref,
) {
  return (
    <button
      ref={ref}
      disabled={disabled || loading}
      className={cn(button({ variant, size }), className)}
      {...rest}
    >
      {loading && (
        <svg
          className="animate-spin h-5 w-5"
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          aria-hidden="true"
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
  )
})

export type { ButtonProps }
