export const NAV_ITEMS = [
  { id: 'home', label: 'Home' },
  { id: 'experience', label: 'Experience' },
  { id: 'projects', label: 'Projects' },
  { id: 'publications', label: 'Publications' },
  { id: 'resume', label: 'Resume' },
  { id: 'contact', label: 'Contact' },
] as const;

export type SectionId = (typeof NAV_ITEMS)[number]['id'];
