export interface Experience {
  company: string;
  title: string;
  date: string;
  highlights: string[];
}

export interface Publication {
  title: string;
  /** Author names in citation order. The site author is emphasized when rendered. */
  authors: string[];
  /** Conference or journal name. */
  venue: string;
  year: number;
  /** Canonical link (e.g. IEEE Xplore page). */
  url: string;
  doi?: string;
  abstract?: string;
}
