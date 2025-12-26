/**
 * Centralized application configuration.
 * All magic numbers and constants should be defined here.
 */

export const APP_CONFIG = {
  // Animation timing
  animation: {
    /** Default debounce delay for resize events (ms) */
    RESIZE_DEBOUNCE_MS: 100,
    /** Duration for experience tree animations (ms) */
    TREE_ANIMATION_DURATION_MS: 700,
  },

  // Scroll behavior
  scroll: {
    /** Scroll threshold before hiding scroll indicator (px) */
    SCROLL_INDICATOR_THRESHOLD: 100,
    /** Divisor for experience tree branch overshoot animation */
    TREE_OVERSHOOT_DIVISOR: 50,
  },

  // Parallax settings
  parallax: {
    /** Multiplier for space elements parallax effect */
    SPACE_ELEMENTS_MULTIPLIER: 2,
    /** Opacity threshold for rendering space elements */
    SPACE_OPACITY_THRESHOLD: 0.01,
    /** Viewport center ratio for parallax calculations */
    VIEWPORT_CENTER_RATIO: 0.5,
    /** Max distance ratio for opacity fade */
    MAX_DISTANCE_RATIO: 0.8,
  },

  // Moving objects (comets, asteroids, satellites)
  movingObjects: {
    comet: {
      spawnInterval: [8000, 15000] as [number, number],
      speed: [0.15, 0.25] as [number, number],
      sizeRange: [50, 90] as [number, number],
      maxActive: 2,
      angleRange: [20, 70] as [number, number],
    },
    asteroid: {
      spawnInterval: [5000, 10000] as [number, number],
      speed: [0.08, 0.15] as [number, number],
      sizeRange: [18, 35] as [number, number],
      maxActive: 5,
      angleRange: [15, 75] as [number, number],
    },
    satellite: {
      spawnInterval: [15000, 25000] as [number, number],
      speed: [0.03, 0.06] as [number, number],
      sizeRange: [30, 50] as [number, number],
      maxActive: 2,
      angleRange: [0, 20] as [number, number],
    },
    /** Maximum lifetime for any moving object (ms) */
    MAX_LIFETIME_MS: 60000,
    /** Initial spawn delays (ms) */
    initialSpawnDelays: {
      asteroid: 1000,
      comet: 3000,
      satellite: 5000,
    },
  },

  // Intersection observer defaults
  intersection: {
    /** Default threshold for visibility detection */
    DEFAULT_THRESHOLD: 0.1,
    /** Tree leaf visibility threshold */
    TREE_LEAF_THRESHOLD: 0.2,
    /** Tree leaf root margin */
    TREE_LEAF_ROOT_MARGIN: '0px 0px -50px 0px',
  },
} as const;

// Type exports for better TypeScript support
export type MovingObjectType = keyof typeof APP_CONFIG.movingObjects & ('comet' | 'asteroid' | 'satellite');
