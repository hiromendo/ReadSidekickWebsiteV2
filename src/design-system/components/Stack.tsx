import { forwardRef, type HTMLAttributes } from 'react'
import { cva, type VariantProps } from 'class-variance-authority'
import { cn } from '../cn'

const stack = cva(['flex'], {
  variants: {
    direction: {
      row: 'flex-row',
      column: 'flex-col',
    },
    gap: {
      none: 'gap-0',
      xs: 'gap-2',
      sm: 'gap-3',
      md: 'gap-4',
      lg: 'gap-6',
      xl: 'gap-8',
      '2xl': 'gap-12',
    },
    align: {
      start: 'items-start',
      center: 'items-center',
      end: 'items-end',
      stretch: 'items-stretch',
    },
    justify: {
      start: 'justify-start',
      center: 'justify-center',
      end: 'justify-end',
      between: 'justify-between',
    },
  },
  defaultVariants: { direction: 'column', gap: 'md', align: 'stretch', justify: 'start' },
})

type StackProps = HTMLAttributes<HTMLDivElement> & VariantProps<typeof stack>

export const Stack = forwardRef<HTMLDivElement, StackProps>(function Stack(
  { className, direction, gap, align, justify, ...rest },
  ref,
) {
  return (
    <div
      ref={ref}
      className={cn(stack({ direction, gap, align, justify }), className)}
      {...rest}
    />
  )
})

export type { StackProps }
