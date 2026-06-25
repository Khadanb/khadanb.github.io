# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

Package manager is **pnpm** (Node 22+).

```bash
pnpm dev        # Vite dev server
pnpm build      # tsc -b (typecheck) then vite build → dist/
pnpm lint       # eslint . (flat config in eslint.config.js)
pnpm preview    # serve the production build
```

There is **no test runner** configured. `pnpm build` is the typecheck gate — it runs `tsc -b` before bundling, so a build failure usually means a type error, not a bundler error.

Deployment is automatic: pushing to `main` triggers `.github/workflows/static.yml`, which builds and publishes `dist/` to GitHub Pages (https://khadanb.github.io). There is no manual deploy step.

## What this is

A single-page personal portfolio (React 19 + TypeScript + Vite + Tailwind v4) whose entire background is an interactive, scroll-driven **journey through the solar system**. Content sections (Hero, Experience, and placeholder Projects/Publications/Resume/Contact) float as glass-morphism panels over an animated space background. The visual ambition lives in `src/components/background/`; the page content is comparatively small.

## Architecture

### The "journey" coordinate model

The whole solar system is laid out along the page's scroll height. Each celestial body in `src/components/background/svg/SpaceElements.tsx` (`CELESTIAL_BODIES`) has a `journeyPosition` in `[0, 1]`; its document Y is `journeyPosition * docHeight`. A per-body `parallaxSpeed` then offsets it against scroll (farther planets scroll faster so they come into view later). AU distance markers on the left edge are positioned the same way. Belts (`AsteroidBelt`, `KuiperBelt`) use `journeyRange`/`journeyMidpoint` from config to sit between the right planets. **To reposition anything in space, edit `journeyPosition`/`parallaxSpeed`, not pixel values.**

### Direct-DOM-manipulation performance pattern (most important convention)

Scroll- and animation-driven visuals **do not use React state for per-frame updates**. They keep data in refs and mutate `element.style.transform / opacity / display` directly inside a scroll subscription or a `requestAnimationFrame` loop. React re-renders are only triggered (via a `useReducer` "forceRender") when DOM *nodes* must be added or removed — e.g. `MovingObjects` spawning/despawning objects. `SpaceElements`, `AsteroidBelt`, `KuiperBelt`, and `ExperienceTree` all follow the no-re-render style. When touching these, preserve it: read scroll via the ref-based context, write styles imperatively, and cache `getBoundingClientRect` results (see `ExperienceTree`'s `cachedDimensionsRef`).

### Context providers (wrap the app in `App.tsx`)

- **`ScrollProvider`** (`context/ScrollContext.tsx`): one global scroll listener for the whole app. Consumers call `getScrollY()` (synchronous, no re-render) or `subscribe(cb)`. The context object and its consumer hooks (`useScrollContext`, `useScrollRef`) live in `context/scroll-store.ts` — import them from there, not the `.tsx` (the provider file exports only the component, to satisfy React Fast Refresh). Don't add standalone `window.addEventListener('scroll', …)` — subscribe here instead.
- **`CollisionProvider`** (`context/CollisionContext.tsx`): a registry of "panels" (the glass cards) plus a cached bounds map and ripple-effect spawner. The cache is invalidated on resize and ~150ms after scrolling stops. Its context object and `useCollisionContext` hook live in `context/collision-store.ts` (same provider-vs-store split as scroll).

### Collision system

Glass-card panels register themselves with `usePanelRegistration(id, ref)` (used in `Hero`, `PlaceholderSection`, `TreeLeaf`). Free-flying objects in `MovingObjects` that exceed `minColliderSize` become "colliders," rendered at `colliderZIndex` (15) — *above* panels (z-10) — while non-colliders render behind everything. `useCollisionDetection` runs throttled (every Nth frame) circle-vs-AABB checks (`utils/collision.ts` is pure geometry) against registered panel bounds; a hit triggers a ripple on the panel and an absorption/shrink animation on the object. All the timing/size/ratio knobs are in `APP_CONFIG.collision`.

### Configuration is centralized

`src/config/app.ts` (`APP_CONFIG`) holds **every tunable constant** — animation timing, parallax math, moving-object spawn rates and limits, both asteroid belts, and collision behavior. Prefer adding a constant here over inlining a magic number. `config/navigation.ts` defines `NAV_ITEMS` and the `SectionId` union (the section `id`s must match the `id` attributes rendered in `SinglePageLayout`); `config/starfield.ts` configures the canvas starfield.

### Hooks layer (`src/hooks`, re-exported from `hooks/index.ts`)

`useWindowEvent` is the foundation — it handles RAF-throttling (scroll) and debouncing (resize) and is what every other event hook is built on. Notable: `useThrottledScroll`, `useWindowDimensions` (returns `width`/`height`/`docHeight`), `useScrollSpy` (IntersectionObserver-driven active-nav + URL-hash sync), `useIntersectionObserver`, and the collision hooks above.

## Conventions & gotchas

- **Tailwind v4, CSS-first config.** There is no `tailwind.config.js`. Theme tokens are declared with `@theme` in `src/index.css`, which is what makes utilities like `text-text`, `text-muted` (de-emphasized copy), `bg-bg`, `bg-glass-bg`, `border-glass-border`, `shadow-glow`, and `bg-primary/secondary` work. Use the `text-muted` token for secondary text rather than hardcoding `text-slate-400`. Reusable component classes (`.glass-card`, `.glass-nav`) and the collision animations (`.collision-ripple`, `.asteroid-absorbing`) live in `@layer components` there too. A `prefers-reduced-motion` block at the top of the file tames CSS animations/transitions and smooth scroll (the JS parallax is not yet gated by it).
- **`verbatimModuleSyntax` is on.** Type-only imports must use `import type { … }` or the build fails. `noUnusedLocals`/`noUnusedParameters` are also enforced, so dead bindings break `pnpm build`.
- **Duplicated-but-extracted animation logic.** `hooks/useAnimatedObjects.ts` (`useAnimationLoop`/`useCleanupInterval`/`useSpawnTimers`) and `utils/parallax.ts` provide shared loop/parallax helpers, but the actual background components currently **re-implement their RAF loops, spawn timers, and parallax math inline** and don't import them. So: to change a component's runtime behavior, edit that component's inline code — not the shared helper. If you refactor, consolidating onto the shared helpers is the intended direction.

## Common edits

- **Add/edit work history:** edit `src/data/experiences.ts` (array of `Experience`, type in `types/index.ts`); the tree renders and lights up automatically.
- **Add a nav section:** add to `NAV_ITEMS` in `config/navigation.ts` *and* render a section with the matching `id` in `SinglePageLayout.tsx` (scroll-spy and smooth-scroll key off the `id`).
- **Add a planet/celestial body:** create the SVG in `background/svg/celestial/`, export it from that folder's `index.ts`, and add an entry to `CELESTIAL_BODIES` in `SpaceElements.tsx`.

## Git

Keep commit messages ≤70 characters and do not add Claude/Anthropic co-author trailers.

## On task completion

- Always update CLAUDE.md and READMD.md after completing a task to add important info and remove stale entries.
