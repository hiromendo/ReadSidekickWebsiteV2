import { forwardRef, type HTMLAttributes } from 'react'
import { cva, type VariantProps } from 'class-variance-authority'
import { cn } from '../cn'

const card = cva(['bg-surface-raised'], {
  variants: {
    variant: {
      flat: '',
      raised: 'shadow-md',
      outlined: 'border border-border/10',
    },
    radius: {
      md: 'rounded-md',
      lg: 'rounded-lg',
      xl: 'rounded-xl',
      '2xl': 'rounded-2xl',
    },
    padding: {
      none: '',
      sm: 'p-4',
      md: 'p-6',
      lg: 'p-6 md:p-8',
      xl: 'p-8 md:p-10',
    },
  },
  defaultVariants: { variant: 'outlined', radius: 'xl', padding: 'lg' },
})

type CardProps = HTMLAttributes<HTMLDivElement> & VariantProps<typeof card>

export const Card = forwardRef<HTMLDivElement, CardProps>(function Card(
  { className, variant, radius, padding, ...rest },
  ref,
) {
  return (
    <div
      ref={ref}
      className={cn(card({ variant, radius, padding }), className)}
      {...rest}
    />
  )
})

export type { CardProps }
