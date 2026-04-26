/**
 * Design System — public surface.
 * Import everything UI-facing from `@/design-system` (or relative).
 */

export { Button, type ButtonProps } from './components/Button'
export { Card, type CardProps } from './components/Card'
export { Heading, type HeadingProps, type HeadingLevel } from './components/Heading'
export { Text, type TextProps } from './components/Text'
export { Container, type ContainerProps } from './components/Container'
export { Input, type InputProps } from './components/Input'
export { Textarea, type TextareaProps } from './components/Textarea'
export { EditorialLabel } from './components/EditorialLabel'
export { SectionNumber } from './components/SectionNumber'
export { Stack, type StackProps } from './components/Stack'
export { Grid, type GridProps } from './components/Grid'

export { cn } from './cn'

export {
  editorialTransition,
  smoothTransition,
  fadeIn,
  slideUp,
  slideInLeft,
  slideInRight,
  scaleIn,
} from './motion'

export { getMotionTokens, refreshMotionTokens } from './tokens'
