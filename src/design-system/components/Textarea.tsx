import { forwardRef, type TextareaHTMLAttributes } from 'react'
import { cva, type VariantProps } from 'class-variance-authority'
import { cn } from '../cn'

const textarea = cva(
  [
    'block w-full',
    'bg-surface-raised text-fg',
    'rounded-lg border',
    'px-4 py-3 text-body-md font-body',
    'transition-colors ease-editorial duration-base',
    'placeholder:text-fg-muted/50',
    'focus:outline-none focus:ring-2 focus:ring-focus focus:ring-offset-1 focus:ring-offset-surface',
    'disabled:opacity-50 disabled:cursor-not-allowed',
    'resize-y',
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

type TextareaProps = TextareaHTMLAttributes<HTMLTextAreaElement> &
  VariantProps<typeof textarea>

export const Textarea = forwardRef<HTMLTextAreaElement, TextareaProps>(function Textarea(
  { className, state, ...rest },
  ref,
) {
  return <textarea ref={ref} className={cn(textarea({ state }), className)} {...rest} />
})

export type { TextareaProps }
