import { forwardRef, type HTMLAttributes } from 'react'
import { cva, type VariantProps } from 'class-variance-authority'
import { cn } from '../cn'

const container = cva(['mx-auto px-6 md:px-12 lg:px-20 xl:px-32'], {
  variants: {
    size: {
      narrow: 'max-w-3xl',
      default: 'max-w-[1600px]',
      wide: 'max-w-[1920px]',
      full: 'max-w-none',
    },
  },
  defaultVariants: { size: 'default' },
})

type ContainerProps = HTMLAttributes<HTMLDivElement> & VariantProps<typeof container>

export const Container = forwardRef<HTMLDivElement, ContainerProps>(function Container(
  { className, size, ...rest },
  ref,
) {
  return <div ref={ref} className={cn(container({ size }), className)} {...rest} />
})

export type { ContainerProps }
