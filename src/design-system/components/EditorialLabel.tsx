import { forwardRef, type HTMLAttributes } from 'react'
import { cn } from '../cn'

type EditorialLabelProps = HTMLAttributes<HTMLSpanElement>

/**
 * Editorial label — uppercase tracked-out caption used as a section
 * tagline above headings. Replaces the legacy `.editorial-label` CSS
 * class so motion-wrapped usages can co-locate `aria-*`.
 */
export const EditorialLabel = forwardRef<HTMLSpanElement, EditorialLabelProps>(
  function EditorialLabel({ className, ...rest }, ref) {
    return (
      <span
        ref={ref}
        className={cn(
          'font-body text-caption uppercase tracking-widest text-fg-muted/60',
          className,
        )}
        {...rest}
      />
    )
  },
)
