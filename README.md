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
| Routing | React Router 7 |
| Content | MDX (markdown + JSX) |
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
- **Project Blog** - Projects link to individual posts authored in MDX, rendered on clean reading pages

## Project Structure

```
src/
├── components/
│   ├── background/    # Starfield, asteroids, planets
│   ├── layout/        # Navbar, footer, page + post layouts
│   ├── sections/      # Hero, Experience, Projects, etc.
│   ├── mdx/           # MDX element overrides (links, images)
│   └── ui/            # Reusable UI components (incl. ProjectCard)
├── pages/             # Routed pages (HomePage, ProjectPostPage)
├── content/projects/  # Project posts (*.mdx) + registry
├── hooks/             # Custom React hooks
├── context/           # React Context providers
├── config/            # App configuration constants
├── utils/             # Utility functions
├── data/              # Static data (experiences)
└── types/             # TypeScript definitions
```

## Routing

`react-router-dom` powers two routes:

- `/` — the full scroll-driven solar-system home page
- `/projects/:slug` — an individual project post on a clean reading layout

Because GitHub Pages is a static host, deep links/refreshes are handled by a
SPA fallback: `public/404.html` encodes the requested path and redirects to the
app root, where a snippet in `index.html` restores the real URL.

## Writing a project post

1. Add a file `src/content/projects/<slug>.mdx`. The filename becomes the URL slug
   (`/projects/<slug>`).
2. Start it with YAML frontmatter:

   ```mdx
   ---
   title: My Project
   date: 2026-06-01
   summary: One-line description shown on the Projects card.
   tags: [React, TypeScript]
   ---

   Write standard markdown here. Because this is MDX you can also embed React
   components and HTML — e.g. `<video src="/media/demo.mp4" controls />`.
   ```

3. That's it — the card appears on the Projects section (newest first) and the post
   page renders automatically. Set `draft: true` in frontmatter to hide a post.

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
