export const ATMOSPHERE_LAYERS = [
  {
    id: 'space',
    name: 'Outer Space',
    speed: 0.1,
    gradient: 'linear-gradient(180deg, #000000 0%, #0c1445 100%)',
  },
  {
    id: 'meo',
    name: 'Mid Earth Orbit',
    speed: 0.2,
    gradient: 'linear-gradient(180deg, #0c1445 0%, #1a237e 100%)',
  },
  {
    id: 'leo',
    name: 'Low Earth Orbit',
    speed: 0.3,
    gradient: 'linear-gradient(180deg, #1a237e 0%, #0288d1 100%)',
  },
  {
    id: 'upper-atm',
    name: 'Upper Atmosphere',
    speed: 0.5,
    gradient: 'linear-gradient(180deg, #0288d1 0%, #4fc3f7 100%)',
  },
  {
    id: 'mid-atm',
    name: 'Mid Atmosphere',
    speed: 0.7,
    gradient: 'linear-gradient(180deg, #4fc3f7 0%, #b3e5fc 100%)',
  },
  {
    id: 'ground',
    name: 'Ground Level',
    speed: 1.0,
    gradient: 'linear-gradient(180deg, #b3e5fc 0%, #e1f5fe 100%)',
  },
] as const;

export type AtmosphereLayerId = (typeof ATMOSPHERE_LAYERS)[number]['id'];
