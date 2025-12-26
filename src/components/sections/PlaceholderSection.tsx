import { useRef } from 'react';
import type { SectionId } from '../../config/navigation';
import { usePanelRegistration } from '../../hooks';

interface PlaceholderSectionProps {
  id: SectionId;
  icon: React.ComponentType<{ className?: string }>;
  title: string;
  description: string;
}

export function PlaceholderSection({ id, icon: Icon, title, description }: PlaceholderSectionProps) {
  const cardRef = useRef<HTMLDivElement>(null);
  usePanelRegistration(`placeholder-${id}`, cardRef);

  return (
    <section id={id} className="min-h-screen py-16 sm:py-32 flex items-center">
      <div className="max-w-7xl mx-auto px-4 sm:px-8 w-full">
        <div ref={cardRef} className="glass-card p-8 sm:p-12">
          <div className="flex items-center gap-4 mb-8">
            <Icon className="w-10 h-10 text-primary" />
            <h2 className="text-3xl sm:text-4xl font-bold">{title}</h2>
          </div>
          <p className="text-slate-400 text-lg">{description}</p>
        </div>
      </div>
    </section>
  );
}
