# Brandon Khadan - Personal Portfolio

A modern, interactive personal portfolio website featuring animated space-themed backgrounds, collision physics, and glass morphism UI design.

**Live Site:** https://khadanb.github.io

## Tech Stack

| Category | Technology |
|----------|------------|
| Framework | React 19 |
| Language | TypeScript 5.9 |
| Build Tool | Vite 7 |
| Styling | Tailwind CSS 4 |
| Icons | Lucide React |
| Linting | ESLint 9 |
| Package Manager | pnpm |

## Features

- **Animated Starfield** - Multi-layer parallax star background with twinkling effects
- **Asteroid Belt** - 40+ procedurally generated asteroids with collision detection
- **Glass Morphism Design** - Modern backdrop blur effects with gradient accents
- **Scroll-Driven Animations** - Experience tree that animates on scroll
- **Responsive Design** - Mobile-first approach with adaptive layouts
- **Moving Celestial Objects** - Comets, satellites, and asteroids crossing the viewport

## Project Structure

```
src/
├── components/
│   ├── background/    # Starfield, asteroids, planets
│   ├── layout/        # Navbar, footer, page layout
│   ├── sections/      # Hero, Experience, Projects, etc.
│   └── ui/            # Reusable UI components
├── hooks/             # Custom React hooks
├── context/           # React Context providers
├── config/            # App configuration constants
├── utils/             # Utility functions
├── data/              # Static data (experiences)
└── types/             # TypeScript definitions
```

## Getting Started

### Prerequisites

- Node.js 22+
- pnpm 10+

### Installation

```bash
# Clone the repository
git clone https://github.com/khadanb/khadanb.github.io.git
cd khadanb.github.io

# Install dependencies
pnpm install
```

### Development

```bash
# Start development server
pnpm dev

# Run linting
pnpm lint
```

### Build

```bash
# Build for production
pnpm build

# Preview production build
pnpm preview
```

## Deployment

The site automatically deploys to GitHub Pages via GitHub Actions when changes are pushed to the `main` branch.

Workflow: `.github/workflows/static.yml`

## Configuration

Animation parameters, collision settings, and visual constants can be customized in:

```
src/config/app.ts
```

## License

🚧 **Under Construction** 🚧
