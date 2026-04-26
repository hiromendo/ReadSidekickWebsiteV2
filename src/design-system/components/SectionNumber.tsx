import { forwardRef, type HTMLAttributes } from 'react'
import { cn } from '../cn'

type SectionNumberProps = HTMLAttributes<HTMLSpanElement>

/**
 * Section number — small monospaced label used as a section index
 * (e.g. "01", "02"). Replaces the legacy `.section-number` CSS class.
 */
export const SectionNumber = forwardRef<HTMLSpanElement, SectionNumberProps>(
  function SectionNumber({ className, ...rest }, ref) {
    return (
      <span
        ref={ref}
        className={cn('font-body text-body-sm text-fg-muted/40', className)}
        {...rest}
      />
    )
  },
)
