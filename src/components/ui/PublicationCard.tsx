import { useRef } from 'react';
import { ExternalLink } from 'lucide-react';
import { usePanelRegistration } from '../../hooks';
import { SELF_AUTHOR } from '../../data/publications';
import type { Publication } from '../../types';

interface PublicationCardProps {
  publication: Publication;
  index: number;
}

export function PublicationCard({ publication, index }: PublicationCardProps) {
  const cardRef = useRef<HTMLDivElement>(null);
  // Keep cards in the collision system so asteroids ripple off them.
  usePanelRegistration(`publication-${index}`, cardRef);

  const { title, authors, venue, year, url, doi, abstract } = publication;

  return (
    <article ref={cardRef} className="glass-card p-6 sm:p-8 flex flex-col gap-3">
      <h3 className="text-xl font-semibold">
        <a
          href={url}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-start gap-2 hover:text-primary transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-primary rounded"
        >
          <span>{title}</span>
          <ExternalLink className="w-4 h-4 mt-1 shrink-0 text-muted" aria-hidden="true" />
        </a>
      </h3>

      <p className="text-sm text-muted">
        {authors.map((author, i) => (
          <span key={author}>
            <span className={author === SELF_AUTHOR ? 'text-text font-medium' : undefined}>
              {author}
            </span>
            {i < authors.length - 1 ? ', ' : ''}
          </span>
        ))}
      </p>

      <p className="text-sm text-muted">
        {venue} · {year}
      </p>

      {abstract && (
        <details className="mt-1">
          <summary className="cursor-pointer text-sm text-primary hover:underline list-none [&::-webkit-details-marker]:hidden focus:outline-none focus-visible:ring-2 focus-visible:ring-primary rounded">
            Abstract
          </summary>
          <p className="text-muted mt-2 text-sm leading-relaxed">{abstract}</p>
        </details>
      )}

      <div className="flex flex-wrap gap-4 mt-auto pt-2 text-sm">
        <a
          href={url}
          target="_blank"
          rel="noopener noreferrer"
          className="text-primary hover:underline"
        >
          IEEE Xplore
        </a>
        {doi && (
          <a
            href={`https://doi.org/${doi}`}
            target="_blank"
            rel="noopener noreferrer"
            className="text-primary hover:underline"
          >
            DOI
          </a>
        )}
      </div>
    </article>
  );
}
