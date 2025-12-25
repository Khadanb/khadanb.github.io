// StarField configuration constants

export const STARFIELD_CONFIG = {
  // Canvas
  CANVAS_HEIGHT_MULTIPLIER: 2,

  // Star layers
  LAYER_COUNT: 3,

  // Star radius by layer
  RADIUS: {
    FAR: { MIN: 0.5, RANGE: 0.5 },
    MID: { MIN: 0.8, RANGE: 0.7 },
    NEAR: { MIN: 1, RANGE: 1.5 },
  },

  // Opacity
  OPACITY: { MIN: 0.3, RANGE: 0.7 },

  // Twinkle animation
  TWINKLE: {
    SPEED: { MIN: 0.5, RANGE: 2 },
    BASE: 0.6,
    AMPLITUDE: 0.4,
  },

  // Gradient color stops
  GRADIENT: {
    COLORS: [
      { stop: 0, color: '#000000' },
      { stop: 0.3, color: '#05071a' },
      { stop: 0.6, color: '#0c1445' },
      { stop: 1, color: '#1a237e' },
    ],
  },

  // Parallax speeds by layer (0 = far, 1 = mid, 2 = near)
  PARALLAX_SPEEDS: [0.1, 0.2, 0.3] as const,

  // Glow effect
  GLOW: {
    THRESHOLD: 1.2,
    SIZE_MULTIPLIER: 2,
    OPACITY_MULTIPLIER: 0.3,
  },
} as const;
