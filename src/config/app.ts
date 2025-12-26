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

  // Asteroid belt configuration (between Mars and Jupiter)
  asteroidBelt: {
    /** Journey position range for the belt (2.2-3.2 AU) */
    journeyRange: [0.14, 0.17] as [number, number],
    /** Midpoint of the belt (2.7 AU) - density peaks here */
    journeyMidpoint: 0.155,
    /** Number of asteroids in the belt */
    asteroidCount: 40,
    /** Size range for belt asteroids (px) */
    sizeRange: [12, 28] as [number, number],
    /** Horizontal speed range (px per ms) */
    speedRange: [0.02, 0.06] as [number, number],
    /** Rotation speed range (degrees per second) */
    rotationSpeedRange: [10, 45] as [number, number],
    /** Parallax speed (between Mars 0.30 and Jupiter 0.40) */
    parallaxSpeed: 0.35,
    /** Trajectory angle range (degrees from horizontal) - kept small to stay in band */
    angleRange: [2, 8] as [number, number],
    /** Vertical oscillation amplitude (px) - asteroids wobble within this range */
    oscillationAmplitude: [15, 40] as [number, number],
    /** Oscillation period range (ms) - how long for one full wobble cycle */
    oscillationPeriod: [4000, 10000] as [number, number],
    /** Opacity for belt asteroids */
    maxOpacity: 0.7,
  },

  // Collision detection settings
  collision: {
    /** Ratio of asteroids that become colliders (0-1) */
    colliderRatio: 0.1,
    /** Z-index for collider asteroids (must be > panel z-index of 10) */
    colliderZIndex: 15,
    /** Collision check interval (frames to skip between checks) */
    checkIntervalFrames: 3,
    /** Absorption animation duration (ms) */
    absorptionDuration: 800,
    /** Ripple animation duration (ms) */
    rippleDuration: 800,
    /** Minimum asteroid size for collision (px) - smaller ones pass through */
    minColliderSize: 18,
    /** Panel bounds cache invalidation delay after scroll stops (ms) */
    boundsCacheInvalidationDelay: 150,
    /** Speed multiplier for collider asteroids (slower = more visible) */
    colliderSpeedMultiplier: 0.4,
    /** Size multiplier for collider asteroids (larger = appears closer) */
    colliderSizeMultiplier: 1.5,
  },
} as const;

// Type exports for better TypeScript support
export type MovingObjectType = keyof typeof APP_CONFIG.movingObjects & ('comet' | 'asteroid' | 'satellite');
