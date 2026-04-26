import { forwardRef, type HTMLAttributes } from 'react'
import { cva, type VariantProps } from 'class-variance-authority'
import { cn } from '../cn'

const grid = cva(['grid'], {
  variants: {
    cols: {
      '1': 'grid-cols-1',
      '2': 'grid-cols-1 md:grid-cols-2',
      '3': 'grid-cols-1 md:grid-cols-3',
      '4': 'grid-cols-1 md:grid-cols-2 lg:grid-cols-4',
      '12': 'grid-cols-12',
    },
    gap: {
      none: 'gap-0',
      sm: 'gap-3',
      md: 'gap-4',
      lg: 'gap-6 md:gap-8',
      xl: 'gap-8 md:gap-12',
    },
  },
  defaultVariants: { cols: '3', gap: 'lg' },
})

type GridProps = HTMLAttributes<HTMLDivElement> & VariantProps<typeof grid>

export const Grid = forwardRef<HTMLDivElement, GridProps>(function Grid(
  { className, cols, gap, ...rest },
  ref,
) {
  return <div ref={ref} className={cn(grid({ cols, gap }), className)} {...rest} />
})

export type { GridProps }
