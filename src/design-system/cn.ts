import { cx, type CxOptions } from 'class-variance-authority'
import { twMerge } from 'tailwind-merge'

/**
 * `cn` — concat class names then merge Tailwind conflicts.
 * Use in primitive components so consumer `className` overrides
 * always win against variant defaults (e.g. `px-8` overrides `px-4`).
 */
export function cn(...inputs: CxOptions) {
  return twMerge(cx(inputs))
}
