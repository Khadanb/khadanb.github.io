import type { ReactNode } from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';
import { StarField } from '../background/StarField';
import { formatDate } from '../../utils/date';
import type { ProjectMeta } from '../../content/projects';

interface PostLayoutProps {
  meta: ProjectMeta;
  children: ReactNode;
}

/**
 * Clean reading layout for an individual project post: a light starfield
 * backdrop (no scroll-driven planets or collisions) and a measure-capped
 * article column optimized for long-form reading.
 */
export function PostLayout({ meta, children }: PostLayoutProps) {
  return (
    <div className="min-h-dvh text-text font-sans">
      {/* Low-density static starfield — keeps the brand without distraction. */}
      <StarField starCount={120} />

      <header className="fixed top-0 w-full z-50 py-4 glass-nav">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 flex items-center justify-between">
          <Link
            to="/#projects"
            className="inline-flex items-center gap-2 text-muted hover:text-text transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-primary rounded-md px-1"
          >
            <ArrowLeft className="w-4 h-4" />
            Projects
          </Link>
          <Link
            to="/"
            className="font-extrabold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent"
          >
            Brandon Khadan
          </Link>
        </div>
      </header>

      <main className="max-w-3xl mx-auto px-4 sm:px-6 pt-28 pb-24">
        <article>
          <header className="mb-8">
            <h1 className="text-3xl sm:text-4xl font-bold mb-3">{meta.title}</h1>
            <div className="flex flex-wrap items-center gap-3 text-sm text-muted">
              <time dateTime={meta.date}>{formatDate(meta.date)}</time>
              {meta.tags?.map((tag) => (
                <span
                  key={tag}
                  className="px-2 py-0.5 rounded-full bg-white/5 border border-glass-border"
                >
                  {tag}
                </span>
              ))}
            </div>
          </header>

          <div className="prose prose-invert max-w-none">{children}</div>
        </article>
      </main>
    </div>
  );
}
