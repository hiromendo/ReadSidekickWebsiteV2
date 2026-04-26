import { forwardRef, createElement, type HTMLAttributes } from 'react'
import { cva, type VariantProps } from 'class-variance-authority'
import { cn } from '../cn'

/**
 * Heading — semantic level (h1–h4) is decoupled from visual size.
 * `<Heading level="h2" size="display-lg">…</Heading>` lets you keep
 * an accurate document outline while reaching for the typographic
 * scale you need. For responsive sizing, layer Tailwind utilities
 * via `className` (e.g. `className="md:text-display-lg"`).
 */
const heading = cva(
  [
    'font-display font-medium text-fg',
    'text-balance',
    '[font-variation-settings:var(--font-display-variation-settings)]',
  ],
  {
    variants: {
      size: {
        'display-2xl': 'text-display-2xl',
        'display-xl': 'text-display-xl',
        'display-lg': 'text-display-lg',
        'display-md': 'text-display-md',
        'display-sm': 'text-display-sm',
        h1: 'text-display-md',
        h2: 'text-display-sm',
        h3: 'text-2xl',
        h4: 'text-xl',
      },
    },
    defaultVariants: { size: 'h2' },
  },
)

type HeadingLevel = 'h1' | 'h2' | 'h3' | 'h4'

type HeadingProps = HTMLAttributes<HTMLHeadingElement> &
  VariantProps<typeof heading> & {
    level?: HeadingLevel
    /** Render as a different element (e.g. `as="div"` inside motion contexts). */
    as?: HeadingLevel | 'div' | 'span'
  }

export const Heading = forwardRef<HTMLHeadingElement, HeadingProps>(function Heading(
  { className, size, level = 'h2', as, children, ...rest },
  ref,
) {
  const Tag = as ?? level
  return createElement(
    Tag,
    { ref, className: cn(heading({ size }), className), ...rest },
    children,
  )
})

export type { HeadingProps, HeadingLevel }
