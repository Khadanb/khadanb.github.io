/**
 * Ambient types for MDX modules.
 *
 * Each `*.mdx` file (compiled by @mdx-js/rollup) exports a default React
 * component plus a `frontmatter` object produced by remark-mdx-frontmatter.
 * The registry in `content/projects/index.ts` re-types `frontmatter` as
 * `ProjectMeta` via the `import.meta.glob` generic.
 */
declare module '*.mdx' {
  import type { ComponentType } from 'react';

  export const frontmatter: Record<string, unknown>;

  const MDXComponent: ComponentType;
  export default MDXComponent;
}
