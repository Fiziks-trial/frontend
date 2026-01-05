# Fiziks Design System

A comprehensive design system for the Fiziks competitive physics quiz battle game.

## Brand Identity

### Vision
Fiziks combines competitive gaming energy with physics education, creating an engaging platform where learning feels like playing.

### Design Principles

1. **Energy & Motion** - UI elements feel alive with subtle physics-based animations
2. **Dark & Focused** - Dark theme reduces eye strain and creates gaming atmosphere
3. **Neon Accents** - Vibrant colors guide attention and create excitement
4. **Clarity First** - Despite visual flair, information is always clear and readable
5. **Performance** - Animations are subtle and purposeful, never hindering speed

---

## Color System

### Primary Palette

| Token | Hex | Usage |
|-------|-----|-------|
| `--color-primary-400` | `#A78BFA` | Primary light (hover states) |
| `--color-primary-500` | `#8B5CF6` | Primary (buttons, links, accents) |
| `--color-primary-600` | `#7C3AED` | Primary dark (active states) |

### Secondary Palette (Cyan - Science/Tech)

| Token | Hex | Usage |
|-------|-----|-------|
| `--color-secondary-400` | `#22D3EE` | Secondary light |
| `--color-secondary-500` | `#06B6D4` | Secondary (info, highlights) |
| `--color-secondary-600` | `#0891B2` | Secondary dark |

### Accent Palette (Amber - Achievement/Energy)

| Token | Hex | Usage |
|-------|-----|-------|
| `--color-accent-400` | `#FBBF24` | Accent light |
| `--color-accent-500` | `#F59E0B` | Accent (XP, rewards, streaks) |
| `--color-accent-600` | `#D97706` | Accent dark |

### Semantic Colors

| Token | Hex | Usage |
|-------|-----|-------|
| `--color-success-500` | `#10B981` | Correct answers, wins, online |
| `--color-warning-500` | `#F59E0B` | Caution, pending |
| `--color-error-500` | `#EF4444` | Wrong answers, losses, errors |
| `--color-info-500` | `#06B6D4` | Information, hints |

### Background Colors

| Token | Hex | Usage |
|-------|-----|-------|
| `--color-bg-primary` | `#0A0A0F` | Main background (deep space) |
| `--color-bg-secondary` | `#111118` | Elevated surfaces |
| `--color-bg-card` | `#16161D` | Cards, modals |
| `--color-bg-hover` | `#1E1E28` | Hover states |
| `--color-bg-active` | `#252530` | Active/pressed states |

### Border Colors

| Token | Hex | Usage |
|-------|-----|-------|
| `--color-border-default` | `#2A2A35` | Default borders |
| `--color-border-hover` | `#3A3A48` | Hover borders |
| `--color-border-focus` | `#8B5CF6` | Focus rings (primary) |

### Text Colors

| Token | Hex | Usage |
|-------|-----|-------|
| `--color-text-primary` | `#FAFAFA` | Primary text |
| `--color-text-secondary` | `#A1A1AA` | Secondary text |
| `--color-text-muted` | `#71717A` | Muted/disabled text |
| `--color-text-inverse` | `#0A0A0F` | Text on light backgrounds |

### Neon Glow Effects

| Token | Value | Usage |
|-------|-------|-------|
| `--glow-primary` | `0 0 20px rgba(139, 92, 246, 0.3)` | Primary button glow |
| `--glow-secondary` | `0 0 20px rgba(6, 182, 212, 0.3)` | Secondary glow |
| `--glow-accent` | `0 0 20px rgba(245, 158, 11, 0.3)` | Achievement glow |
| `--glow-success` | `0 0 20px rgba(16, 185, 129, 0.3)` | Win/correct glow |
| `--glow-error` | `0 0 20px rgba(239, 68, 68, 0.3)` | Loss/wrong glow |

---

## Typography

### Font Stack

```css
--font-sans: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
--font-mono: 'JetBrains Mono', 'Fira Code', monospace;
```

### Type Scale

| Variant | Size | Weight | Line Height | Usage |
|---------|------|--------|-------------|-------|
| `h1` | 2.5rem (40px) | 700 | 1.2 | Page titles |
| `h2` | 2rem (32px) | 600 | 1.25 | Section headers |
| `h3` | 1.5rem (24px) | 600 | 1.3 | Card titles |
| `h4` | 1.25rem (20px) | 600 | 1.4 | Subsections |
| `body` | 1rem (16px) | 400 | 1.5 | Body text |
| `body-sm` | 0.875rem (14px) | 400 | 1.5 | Secondary text |
| `caption` | 0.75rem (12px) | 500 | 1.4 | Labels, captions |

---

## Spacing

Based on 4px grid:

| Token | Value | Usage |
|-------|-------|-------|
| `--space-1` | 4px | Tight spacing |
| `--space-2` | 8px | Compact elements |
| `--space-3` | 12px | Default gap |
| `--space-4` | 16px | Section spacing |
| `--space-6` | 24px | Card padding |
| `--space-8` | 32px | Large sections |
| `--space-12` | 48px | Page sections |

---

## Border Radius

| Token | Value | Usage |
|-------|-------|-------|
| `--radius-sm` | 4px | Small elements (badges) |
| `--radius-md` | 8px | Buttons, inputs |
| `--radius-lg` | 12px | Cards |
| `--radius-xl` | 16px | Modals |
| `--radius-full` | 9999px | Pills, avatars |

---

## Shadows

| Token | Value | Usage |
|-------|-------|-------|
| `--shadow-sm` | `0 1px 2px rgba(0,0,0,0.3)` | Subtle elevation |
| `--shadow-md` | `0 4px 6px rgba(0,0,0,0.4)` | Cards |
| `--shadow-lg` | `0 10px 15px rgba(0,0,0,0.5)` | Modals, dropdowns |
| `--shadow-glow` | `var(--glow-primary)` | Neon glow effect |

---

## Animation

### Timing Functions

| Token | Value | Usage |
|-------|-------|-------|
| `--ease-default` | `cubic-bezier(0.4, 0, 0.2, 1)` | General transitions |
| `--ease-in` | `cubic-bezier(0.4, 0, 1, 1)` | Elements entering |
| `--ease-out` | `cubic-bezier(0, 0, 0.2, 1)` | Elements leaving |
| `--ease-bounce` | `cubic-bezier(0.34, 1.56, 0.64, 1)` | Playful emphasis |

### Duration

| Token | Value | Usage |
|-------|-------|-------|
| `--duration-fast` | `100ms` | Hover states |
| `--duration-normal` | `200ms` | Standard transitions |
| `--duration-slow` | `300ms` | Complex animations |

### Animation Principles

1. **Subtle by default** - Most animations are micro-interactions
2. **Physics-based** - Slight bounce/spring for playfulness
3. **Purposeful** - Every animation conveys meaning
4. **Performant** - Use `transform` and `opacity` only

---

## Mascot: Fizzy

### Character Description

Fizzy is an energy spark being - a small, glowing entity made of pure physics energy.

**Visual Characteristics:**
- Soft, glowing core (primary purple)
- Subtle particle trail when moving
- Expressive "eyes" (two brighter spots)
- Slight pulsing animation when idle
- Color shifts based on context (cyan for hints, green for correct, etc.)

**Personality:**
- Enthusiastic but not overwhelming
- Celebrates wins genuinely
- Encouraging during losses
- Curious and helpful during learning moments

### States & Animations

| State | Animation | When |
|-------|-----------|------|
| `idle` | Gentle pulse, slight float | Default state |
| `thinking` | Faster pulse, particles swirl | User is answering |
| `correct` | Burst into green, sparkle | Correct answer |
| `wrong` | Dim slightly, gentle shake | Wrong answer |
| `celebrate` | Spin, burst particles | Win match |
| `encourage` | Warm glow, nod | After loss |
| `hint` | Glow cyan, bounce | Offering help |
| `excited` | Rapid pulse, orbit particles | Match found |

### Implementation Notes

- SVG-based for scalability
- CSS animations for performance
- Framer Motion for complex sequences
- Positioned fixed in bottom-right (can be minimized)

---

## Component Patterns

### Buttons

**Primary** - Main CTAs, neon glow on hover
**Secondary** - Alternative actions, bordered
**Ghost** - Subtle actions, transparent
**Danger** - Destructive actions

### Cards

- Dark background (`--color-bg-card`)
- Subtle border (`--color-border-default`)
- Optional glow on hover for interactive cards
- Physics-themed: slight "float" effect on hover

### Battle UI

- Split screen with VS divider
- Live status indicators (typing, thinking)
- Dramatic countdown with pulse animation
- Score updates with number ticker animation

### Question Display

- Question text prominent and clear
- Physics simulation/animation below
- Answer options as selectable cards
- Timer as progress bar with color shift

---

## Responsive Breakpoints

| Breakpoint | Width | Usage |
|------------|-------|-------|
| `sm` | 640px | Mobile landscape |
| `md` | 768px | Tablets |
| `lg` | 1024px | Desktop |
| `xl` | 1280px | Large desktop |
| `2xl` | 1536px | Extra large |

---

## Accessibility

- All colors meet WCAG 2.1 AA contrast requirements
- Focus states are always visible (primary ring)
- Animations respect `prefers-reduced-motion`
- Interactive elements have proper aria labels
- Fizzy's expressions are supplemented with text for screen readers
