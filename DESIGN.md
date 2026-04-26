# Design Brief

## Direction

**Mohammad's Portfolio** — Premium showcase for a Full Stack Developer & UI/UX Designer blending technical credibility with creative brilliance.

## Tone

Bold Modern with Dark Editorial precision — confident tech aesthetics with clean structure, glassmorphism accents, and intentional interactivity.

## Differentiation

Animated gradient particles in hero, glassmorphic skill cards with backdrop blur, smooth entrance animations on scroll, custom cyan-accented scrollbar, live gradient CTAs.

## Color Palette

| Token      | OKLCH          | Role                              |
| ---------- | -------------- | --------------------------------- |
| background | 0.145 0.014 260 | Deep navy page background (dark)  |
| foreground | 0.95 0.01 260  | Bright text on dark               |
| card       | 0.18 0.014 260 | Elevated card surfaces            |
| primary    | 0.75 0.15 190  | Electric cyan for CTAs & accents  |
| accent     | 0.75 0.15 190  | Cyan companion to primary         |
| muted      | 0.22 0.02 260  | Subtle backgrounds & borders      |

## Typography

- Display: Space Grotesk — Modern, geometric, tech-forward for headings
- Body: Satoshi — Clean, approachable sans-serif for content
- Mono: JetBrains Mono — Code snippets and technical details
- Scale: Hero text 5xl/7xl bold tight, H2 3xl/5xl bold tight, body text-base/lg

## Elevation & Depth

Layered surfaces with subtle shadows and glassmorphism: elevated cards float above background via shadow-elevated (0 20px 25px), muted cards use shadow-subtle (0 4px 12px), glass surfaces reduce opacity to 0.8 with backdrop blur.

## Structural Zones

| Zone    | Background        | Border         | Notes                                          |
| ------- | ----------------- | -------------- | ---------------------------------------------- |
| Header  | card with blur    | muted / 0.3    | Fixed or sticky, glassmorphic navigation       |
| Hero    | gradient-hero     | —              | Particle background, large typography          |
| Content | background alt   | —              | Alternating card/muted sections for rhythm     |
| Skills  | glass-effect     | muted / 0.3    | Glassmorphic cards with hover elevation        |
| Projects| card elevated    | muted          | Grid of elevated cards with CTA accents        |
| Footer  | muted / 0.4      | border top     | Sticky bottom with contact CTAs                |

## Spacing & Rhythm

Spacious 4rem/6rem section gaps, 2rem card padding, 0.5rem tight tracking on display type; alternating card/muted backgrounds creates visual rhythm without monotony.

## Component Patterns

- Buttons: Cyan primary bg, black text, uppercase tracking-wider, 0.625rem radius, hover elevation via shadow-elevated
- Cards: 0.625rem radius, glass-effect or bg-card with subtle shadow, transition-smooth on all interactive states
- Badges: Small muted bg with cyan text, rounded-full pill shape, 0.25rem padding
- Links: Cyan text with underline on hover, smooth transition

## Motion

- Entrance: fade-in 0.6s ease-out on section reveals (scroll-triggered via Motion library)
- Hover: transition-smooth 0.3s on all cards/buttons, shadow elevation, subtle scale +1%
- Decorative: float 3s ease-in-out infinite on particle elements, pulse-glow 2s on accent accents

## Constraints

- No neon or garish gradients — maintain premium aesthetic
- Dark mode only (primary design direction per brief)
- Cyan primary only on interactive/CTA elements to focus attention
- Custom scrollbar styled to match — avatar curve CSS

## Signature Detail

Custom cyan scrollbar with dark background — small interactive detail that reinforces premium tech aesthetic.

