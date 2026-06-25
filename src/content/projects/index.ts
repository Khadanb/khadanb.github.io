import type { ComponentType } from 'react';

/**
 * Shape of the YAML frontmatter at the top of each project `.mdx` post.
 * `slug` is derived from the filename, not the frontmatter.
 */
export interface ProjectMeta {
  title: string;
  date: string; // ISO date, e.g. "2026-06-01"
  summary: string;
  tags?: string[];
  cover?: string;
  draft?: boolean;
}

export interface ProjectEntry {
  slug: string;
  meta: ProjectMeta;
  /** The compiled MDX post component. */
  Component: ComponentType;
}

// Eagerly pull in every post. At portfolio scale the bodies are tiny, so they
// ride in the main bundle. If this blog grows large, switch to a metadata-only
// TS registry plus `() => import(...)` loaders to code-split each post.
const modules = import.meta.glob<{ default: ComponentType; frontmatter: ProjectMeta }>(
  './*.mdx',
  { eager: true }
);

function slugFromPath(path: string): string {
  return path.split('/').pop()!.replace(/\.mdx$/, '');
}

/** All published projects, newest first, with drafts filtered out. */
export const projects: ProjectEntry[] = Object.entries(modules)
  .map(([path, mod]) => ({
    slug: slugFromPath(path),
    meta: mod.frontmatter,
    Component: mod.default,
  }))
  .filter((entry) => entry.meta && !entry.meta.draft)
  .sort((a, b) => (a.meta.date < b.meta.date ? 1 : -1));

export function getProject(slug: string): ProjectEntry | undefined {
  return projects.find((entry) => entry.slug === slug);
}
