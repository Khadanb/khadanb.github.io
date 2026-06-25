import { BookOpen } from 'lucide-react';
import { publications } from '../../data/publications';
import { PublicationCard } from '../ui/PublicationCard';

export function PublicationsSection() {
  return (
    <section id="publications" className="min-h-screen py-16 sm:py-32 flex items-center">
      <div className="max-w-7xl mx-auto px-4 sm:px-8 w-full">
        <div className="flex items-center gap-4 mb-10">
          <BookOpen className="w-10 h-10 text-primary" />
          <h2 className="text-3xl sm:text-4xl font-bold">Publications</h2>
        </div>

        {publications.length === 0 ? (
          <div className="glass-card p-8 sm:p-12">
            <p className="text-muted text-lg">No publications yet. Check back soon.</p>
          </div>
        ) : (
          <div className="grid gap-6 lg:grid-cols-2">
            {publications.map((publication, index) => (
              <PublicationCard key={publication.url} publication={publication} index={index} />
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
