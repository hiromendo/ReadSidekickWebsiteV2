/**
 * Design System — Token TS exports
 *
 * The source of truth for tokens is the CSS files in this folder.
 * This module re-exports a subset that JS consumers (mainly Framer
 * Motion `transition` props) need as actual numbers / arrays, since
 * Framer Motion can't read CSS variables directly.
 *
 * Values are read from the live `:root` once at module load and cached.
 * If the theme is swapped at runtime (data-theme flip), call
 * `refreshMotionTokens()` to reread.
 */

type CubicBezier = [number, number, number]
type CubicBezierFull = [number, number, number, number]

const isBrowser = typeof window !== 'undefined' && typeof document !== 'undefined'

function readVar(name: string, fallback: string): string {
  if (!isBrowser) return fallback
  const value = getComputedStyle(document.documentElement)
    .getPropertyValue(name)
    .trim()
  return value || fallback
}

function parseCubicBezier(input: string, fallback: CubicBezierFull): CubicBezierFull {
  const match = input.match(/cubic-bezier\(([^)]+)\)/)
  if (!match) return fallback
  const parts = match[1].split(',').map((n) => parseFloat(n.trim()))
  if (parts.length !== 4 || parts.some(Number.isNaN)) return fallback
  return parts as CubicBezierFull
}

function parseDurationMs(input: string, fallbackMs: number): number {
  const trimmed = input.trim()
  if (trimmed.endsWith('ms')) return parseFloat(trimmed) || fallbackMs
  if (trimmed.endsWith('s')) return (parseFloat(trimmed) || fallbackMs / 1000) * 1000
  return fallbackMs
}

const FALLBACK_EASE_EDITORIAL: CubicBezierFull = [0.16, 1, 0.3, 1]
const FALLBACK_EASE_SMOOTH: CubicBezierFull = [0.4, 0, 0.2, 1]

let cache: {
  easeEditorial: CubicBezierFull
  easeSmooth: CubicBezierFull
  durationFastMs: number
  durationBaseMs: number
  durationSlowMs: number
  durationSlowerMs: number
  durationSlowestMs: number
} | null = null

function compute() {
  return {
    easeEditorial: parseCubicBezier(
      readVar('--motion-ease-editorial', 'cubic-bezier(0.16, 1, 0.3, 1)'),
      FALLBACK_EASE_EDITORIAL,
    ),
    easeSmooth: parseCubicBezier(
      readVar('--motion-ease-smooth', 'cubic-bezier(0.4, 0, 0.2, 1)'),
      FALLBACK_EASE_SMOOTH,
    ),
    durationFastMs: parseDurationMs(readVar('--motion-duration-fast', '200ms'), 200),
    durationBaseMs: parseDurationMs(readVar('--motion-duration-base', '300ms'), 300),
    durationSlowMs: parseDurationMs(readVar('--motion-duration-slow', '800ms'), 800),
    durationSlowerMs: parseDurationMs(readVar('--motion-duration-slower', '1200ms'), 1200),
    durationSlowestMs: parseDurationMs(readVar('--motion-duration-slowest', '2000ms'), 2000),
  }
}

export function getMotionTokens() {
  if (!cache) cache = compute()
  return cache
}

export function refreshMotionTokens() {
  cache = compute()
  return cache
}

export type { CubicBezier, CubicBezierFull }
