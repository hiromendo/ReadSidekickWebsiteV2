import { forwardRef, createElement, type HTMLAttributes } from 'react'
import { cva, type VariantProps } from 'class-variance-authority'
import { cn } from '../cn'

const text = cva(['text-pretty'], {
  variants: {
    size: {
      'body-lg': 'text-body-lg',
      'body-md': 'text-body-md',
      'body-sm': 'text-body-sm',
      caption: 'text-caption',
    },
    family: {
      body: 'font-body font-light',
      ui: 'font-ui',
      display: 'font-display',
    },
    tone: {
      default: 'text-fg-body',
      muted: 'text-fg-muted/70',
      strong: 'text-fg',
      inverse: 'text-fg-inverse',
      'on-brand': 'text-fg-on-brand',
    },
  },
  defaultVariants: { size: 'body-md', family: 'body', tone: 'default' },
})

type TextElement = 'p' | 'span' | 'div'
type TextProps = HTMLAttributes<HTMLElement> &
  VariantProps<typeof text> & {
    as?: TextElement
  }

export const Text = forwardRef<HTMLElement, TextProps>(function Text(
  { className, size, family, tone, as = 'p', children, ...rest },
  ref,
) {
  return createElement(
    as,
    { ref, className: cn(text({ size, family, tone }), className), ...rest },
    children,
  )
})

export type { TextProps }
