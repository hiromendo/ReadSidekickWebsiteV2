/**
 * Design System — Motion presets for Framer Motion
 *
 * Easings and durations come from the CSS variable layer
 * (`--motion-ease-*`, `--motion-duration-*`). One source of truth
 * shared with Tailwind's `transition-*` / `animate-*` utilities.
 *
 * Use these presets in components instead of inlining
 * `[0.16, 1, 0.3, 1]` and `duration: 1.2`.
 */

import type { Transition, Variants } from 'framer-motion'
import { getMotionTokens } from './tokens'

const t = () => getMotionTokens()

/** Editorial transition — slow, decelerating, our brand motion. */
export const editorialTransition = (
  durationMs: number = 1000,
  delayMs: number = 0,
): Transition => ({
  duration: durationMs / 1000,
  delay: delayMs / 1000,
  ease: t().easeEditorial,
})

/** Smooth transition — for hover/state changes. */
export const smoothTransition = (
  durationMs: number = 300,
  delayMs: number = 0,
): Transition => ({
  duration: durationMs / 1000,
  delay: delayMs / 1000,
  ease: t().easeSmooth,
})

/** Fade in. */
export const fadeIn: Variants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1 },
}

/** Slide up + fade in. */
export const slideUp = (distance = 50): Variants => ({
  hidden: { opacity: 0, y: distance },
  visible: { opacity: 1, y: 0 },
})

/** Slide in from left + fade in. */
export const slideInLeft = (distance = 60): Variants => ({
  hidden: { opacity: 0, x: -distance },
  visible: { opacity: 1, x: 0 },
})

/** Slide in from right + fade in. */
export const slideInRight = (distance = 60): Variants => ({
  hidden: { opacity: 0, x: distance },
  visible: { opacity: 1, x: 0 },
})

/** Scale in + fade in. */
export const scaleIn: Variants = {
  hidden: { opacity: 0, scale: 0.95 },
  visible: { opacity: 1, scale: 1 },
}
