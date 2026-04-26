# Design System

A token + primitive layer that lets the site's visual design be swapped without touching component code.

```
┌─────────────────────────────────────────┐
│ Pages & sections (src/components, ...)  │  ← consume primitives
├─────────────────────────────────────────┤
│ Primitives (Button, Card, Heading, …)   │  ← consume semantic tokens
├─────────────────────────────────────────┤
│ Tokens (CSS variables)                  │  ← the swappable surface
└─────────────────────────────────────────┘
```

---

## Token layers

Two tiers of CSS custom properties on `:root`:

- **Primitive tokens** (`tokens/primitives.css`) — raw palette, type scale, radii, shadows, motion. Never reference these from components.
- **Semantic tokens** (`tokens/semantic-light.css`, `tokens/semantic-dark.css`) — intent-named (`--color-surface`, `--color-text`, `--color-brand`). This is what components use, directly or via Tailwind utilities.

### Color value format

Colors are stored as **space-separated R G B triples** so Tailwind's `rgb(var(--color-x) / <alpha-value>)` substitution works for opacity utilities (`bg-brand/10`, `text-fg-muted/70`).

```css
/* ✅ correct */
--palette-blue-500: 66 89 168;

/* ❌ breaks Tailwind alpha syntax */
--palette-blue-500: rgb(66, 89, 168);
```

**Caveat:** `<alpha-value>` only resolves in Tailwind-generated utilities. Inline `style={{ color: 'var(--color-brand)' }}` won't get alpha — you'd need `rgb(var(--color-brand) / 0.4)` manually.

### What's tokenized

Via CSS vars: colors, font families, font sizes/weights, line-heights, letter-spacing, radii, shadows, motion durations, motion easings, Fraunces variation settings.

**Not tokenized** (kept as JS literals in `tailwind.config.js`):
- `screens` — CSS vars don't work in `@media` queries.
- `spacing` — using vars forces every consumer through arbitrary `[var(--…)]` syntax and breaks IDE autocomplete.

---

## Themes

Two themes ship: light (default) and dark. Wired via Tailwind's `darkMode: ['class', '[data-theme="dark"]']`.

Activate dark theme by setting the attribute on `<html>`:

```html
<html lang="en" data-theme="dark">
```

Inside CSS or components, both Tailwind's `dark:` variant and `[data-theme="dark"]` selectors work.

### Adding a new theme

1. Copy `tokens/semantic-light.css` to `tokens/semantic-<name>.css`.
2. Change the selector to `[data-theme='<name>']` and edit values.
3. Import the new file in `src/index.css` after the existing semantic files.
4. Set `<html data-theme="<name>">` to use it.

No component or Tailwind config change needed.

---

## Primitives

| Component        | Use for                                                     |
| ---------------- | ----------------------------------------------------------- |
| `Button`         | All buttons. Variants: `primary` / `secondary` / `ghost`.   |
| `Card`           | Content containers. Variants: `flat` / `raised` / `outlined`. |
| `Heading`        | h1–h4. `level` (semantics) and `size` (visual) decoupled.   |
| `Text`           | Body copy. Sizes `body-lg` → `caption`, tones, families.    |
| `Container`      | Page-level horizontal padding + max-width.                  |
| `Input` / `Textarea` | Form fields with default + error state.                 |
| `EditorialLabel` | Uppercase tracked-out caption above headings.               |
| `SectionNumber`  | Small numeric section index (e.g. "01").                    |
| `Stack` / `Grid` | Layout helpers.                                             |

All accept a `className` prop that is `tailwind-merge`'d on top of the variant defaults — consumer overrides win.

```tsx
<Button variant="primary" size="lg" className="w-full">
  Get started
</Button>
```

### Heading API (responsive sizes)

`Heading` keeps semantic level and visual size separate. For responsive sizes, layer Tailwind utilities via `className`:

```tsx
<Heading level="h2" size="display-md" className="md:text-display-lg">
  Section headline
</Heading>
```

---

## Motion

Easings and durations live in CSS vars (`--motion-ease-*`, `--motion-duration-*`) and are mirrored in `motion.ts` for Framer Motion (which can't read CSS vars directly).

```tsx
import { motion } from 'framer-motion'
import { slideUp, editorialTransition } from '@/design-system'

<motion.div
  variants={slideUp(40)}
  initial="hidden"
  animate="visible"
  transition={editorialTransition(1200, 200)}
>
  …
</motion.div>
```

Don't inline `[0.16, 1, 0.3, 1]` and `duration: 1.2` in components — use the presets so a future motion-token change propagates automatically.

---

## Adding a new primitive

1. Create `src/design-system/components/<Name>.tsx`.
2. Use `cva` for variant-driven classes; `cn(…)` for merging.
3. **Never reference** primitive tokens (`bg-coral-500`, `--palette-blue-500`) — only semantic tokens (`bg-brand`, `text-fg`).
4. `forwardRef` and accept `className` so callers can compose.
5. Re-export from `src/design-system/index.ts`.

---

## Migration status

**Migrated to primitives:** `Confidence.tsx` (proof-of-concept).

**Pending migration:** `Hero.tsx`, `Methodology.tsx`, `HowItWorks.tsx`, `Footer.tsx`, `Navigation.tsx`, `ASLTranslator.tsx`, `asl-translator/*`, all `pages/*`.

Until those migrate, the legacy palette aliases (`coral-*`, `ink-*`, `ivory-*`, `teal-*`, `ochre-*`, `crimson-*`, `electric-*`) remain in `tailwind.config.js` so existing class names keep working. They are **deprecated** and removed in the PR that completes the migration.
