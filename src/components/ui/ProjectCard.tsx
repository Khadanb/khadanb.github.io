import { useRef } from 'react';
import { Link } from 'react-router-dom';
import { ArrowUpRight } from 'lucide-react';
import { usePanelRegistration } from '../../hooks';
import { formatDate } from '../../utils/date';
import type { ProjectEntry } from '../../content/projects';

interface ProjectCardProps {
  entry: ProjectEntry;
}

export function ProjectCard({ entry }: ProjectCardProps) {
  const cardRef = useRef<HTMLAnchorElement>(null);
  // Keep cards in the collision system so asteroids still ripple off them.
  usePanelRegistration(`project-${entry.slug}`, cardRef);

  const { slug, meta } = entry;

  return (
    <Link
      ref={cardRef}
      to={`/projects/${slug}`}
      className="glass-card p-6 flex flex-col gap-3 group transition-transform duration-300 hover:-translate-y-1 focus-visible:-translate-y-1 focus:outline-none focus-visible:ring-2 focus-visible:ring-primary"
    >
      <div className="flex items-start justify-between gap-3">
        <h3 className="text-xl font-semibold group-hover:text-primary transition-colors">
          {meta.title}
        </h3>
        <ArrowUpRight className="w-5 h-5 text-muted shrink-0 transition-colors group-hover:text-primary" />
      </div>

      <time dateTime={meta.date} className="text-sm text-muted">
        {formatDate(meta.date)}
      </time>

      <p className="text-muted">{meta.summary}</p>

      {meta.tags && meta.tags.length > 0 && (
        <ul className="flex flex-wrap gap-2 mt-auto pt-2 list-none">
          {meta.tags.map((tag) => (
            <li
              key={tag}
              className="text-xs px-2 py-1 rounded-full bg-white/5 border border-glass-border text-muted"
            >
              {tag}
            </li>
          ))}
        </ul>
      )}
    </Link>
  );
}
