import { forwardRef, type InputHTMLAttributes } from 'react'
import { cva, type VariantProps } from 'class-variance-authority'
import { cn } from '../cn'

const input = cva(
  [
    'block w-full',
    'bg-surface-raised text-fg',
    'rounded-lg border',
    'px-4 py-3 text-body-md font-body',
    'transition-colors ease-editorial duration-base',
    'placeholder:text-fg-muted/50',
    'focus:outline-none focus:ring-2 focus:ring-focus focus:ring-offset-1 focus:ring-offset-surface',
    'disabled:opacity-50 disabled:cursor-not-allowed',
  ],
  {
    variants: {
      state: {
        default: 'border-border/20 focus:border-brand',
        error: 'border-danger focus:border-danger focus:ring-danger',
      },
    },
    defaultVariants: { state: 'default' },
  },
)

type InputProps = InputHTMLAttributes<HTMLInputElement> & VariantProps<typeof input>

export const Input = forwardRef<HTMLInputElement, InputProps>(function Input(
  { className, state, ...rest },
  ref,
) {
  return <input ref={ref} className={cn(input({ state }), className)} {...rest} />
})

export type { InputProps }
