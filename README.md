# Brandon Khadan - Personal Portfolio

An immersive personal portfolio website featuring a parallax solar system background, animated starfield, and interactive experience tree visualization.

**Live Demo:** [khadanb.github.io](https://khadanb.github.io)

---

## Tech Stack

| Technology | Version | Purpose |
|------------|---------|---------|
| React | 19.2.0 | UI Framework |
| TypeScript | 5.9.3 | Type Safety |
| Vite | 7.2.4 | Build Tool & Dev Server |
| Tailwind CSS | 4.1.18 | Utility-First Styling (v4 with CSS Variables) |
| lucide-react | 0.562.0 | Icon Library |

---

## Getting Started

### Prerequisites
- Node.js 18+
- pnpm (recommended) or npm

### Installation

```bash
# Clone the repository
git clone https://github.com/khadanb/khadanb.github.io.git
cd khadanb.github.io

# Install dependencies
pnpm install

# Start development server
pnpm dev

# Build for production
pnpm build

# Preview production build
pnpm preview
```

The development server runs at `http://localhost:5173` with hot module replacement.

---

## Project Structure

```
src/
├── components/
│   ├── background/           # Parallax background system
│   │   ├── AtmosphereBackground.tsx
│   │   ├── StarField.tsx     # Canvas-based star animation
│   │   └── svg/
│   │       ├── SpaceElements.tsx    # Solar system planets
│   │       ├── celestial/           # Individual planet SVGs
│   │       └── ...                  # Other layer elements
│   ├── layout/               # Page structure
│   │   ├── SinglePageLayout.tsx
│   │   ├── Navbar.tsx
│   │   └── Footer.tsx
│   ├── sections/             # Content sections
│   │   ├── Hero.tsx
│   │   ├── ExperienceTree.tsx
│   │   └── PlaceholderSection.tsx
│   └── ui/                   # Reusable components
│       ├── TreeLeaf.tsx
│       └── ScrollIndicator.tsx
├── hooks/                    # Custom React hooks
│   ├── useParallaxScroll.ts
│   └── useScrollSpy.ts
├── config/                   # Configuration
│   ├── atmosphere.ts
│   └── navigation.ts
├── data/                     # Static content
│   └── experiences.ts
└── types/                    # TypeScript definitions
    └── index.ts
```

---

## Architecture

### Parallax Background System

The background creates depth through 6 atmospheric layers moving at different speeds:

```
Layer          Speed    Elements
─────────────────────────────────────
Space          0.1      Planets, Stars
MEO            0.2      GPS Satellites
LEO            0.35     ISS, Starlink
Upper Atm      0.5      Weather Balloons
Mid Atm        0.7      Clouds, Aircraft
Ground         0.9      Mountains, Trees
```

Each layer's position is calculated using GPU-accelerated transforms:

```typescript
// Parallax offset calculation
const parallaxOffset = scrollY * (1 - layer.speed);

// Applied via CSS transform for performance
style={{ transform: `translate3d(0, ${parallaxOffset}px, 0)` }}
```

**StarField** renders 300 procedurally-generated stars on HTML5 Canvas with:
- 3 depth layers (far/mid/near) for parallax effect
- Twinkling animation via opacity oscillation
- Glow effects on larger stars

---

### Solar System Journey

Custom SVG planets travel through the page based on scaled astronomical distances:

```typescript
// Planet configuration
{
  id: 'earth',
  journeyPosition: 0.10,  // 1 AU / 30 AU baseline
  parallaxSpeed: 0.26,
  x: '11%',               // Side margin position
}

// Position calculation
const documentY = body.journeyPosition * docHeight;
const baseY = documentY - scrollY * body.parallaxSpeed * 2;
```

**Distance Scaling:** Neptune's orbit (30 AU) serves as the baseline. Earth at 1 AU appears at ~10% of page height.

**Margin Positioning:** Planets render in side margins (8-15% left, 85-92% right) to avoid overlapping content.

---

### Experience Tree Visualization

An organic tree metaphor where a vertical stem "grows" as the user scrolls:

```
Data Flow:
┌──────────────┐
│ Scroll Event │
└──────┬───────┘
       ▼
┌──────────────┐
│ Calculate    │
│ Progress %   │
└──────┬───────┘
       ▼
┌──────────────┐
│ Update Stem  │
│ Height       │
└──────┬───────┘
       ▼
┌──────────────┐
│ Light Up     │
│ Branches     │
└──────────────┘
```

- **Responsive Layout:** Centered stem on desktop, left-aligned on mobile
- **IntersectionObserver:** Efficient visibility detection for card animations
- **Sequential Illumination:** Branches light up as the stem reaches them

---

### Glass Morphism Design System

Custom Tailwind v4 theme with CSS variables:

```css
/* Theme variables in index.css */
--color-glass-bg: rgba(255, 255, 255, 0.03);
--color-glass-border: rgba(255, 255, 255, 0.1);
```

Glass card recipe:
```jsx
<div className="bg-glass-bg backdrop-blur-xl border border-glass-border rounded-3xl shadow-2xl">
  {content}
</div>
```

---

## Key Dependencies

| Package | Purpose |
|---------|---------|
| `react` | Component-based UI framework |
| `tailwindcss` | Utility-first CSS with v4 features |
| `vite` | Fast build tool with HMR |
| `lucide-react` | Clean, consistent icon set |
| `typescript` | Static type checking |

---

## Deployment

The site automatically deploys to GitHub Pages via GitHub Actions:

1. Push to `main` branch triggers the workflow
2. `pnpm build` creates optimized production bundle
3. Static files deploy to GitHub Pages

Workflow file: `.github/workflows/static.yml`

---

## License

> **Under Construction**
>
> License information coming soon.

---

## Author

**Brandon Khadan**
- GitHub: [@khadanb](https://github.com/khadanb)
