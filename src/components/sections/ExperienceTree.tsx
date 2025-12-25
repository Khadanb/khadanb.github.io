import { useEffect, useRef, useState } from 'react';
import { TreeLeaf } from '../ui/TreeLeaf';
import { experiences } from '../../data/experiences';

export function ExperienceTree() {
  const [stemProgress, setStemProgress] = useState(0);
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const handleScroll = () => {
      if (!sectionRef.current) return;

      const rect = sectionRef.current.getBoundingClientRect();
      const windowHeight = window.innerHeight;

      let progress = (windowHeight - rect.top) / (rect.height + windowHeight / 2);
      progress = Math.max(0, Math.min(1, progress));

      setStemProgress(progress * 100);
    };

    window.addEventListener('scroll', handleScroll);
    handleScroll();

    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <section
      id="experience"
      ref={sectionRef}
      className="py-16 sm:py-32 bg-bg relative overflow-hidden"
    >
      <div className="max-w-7xl mx-auto relative px-4 sm:px-8">
        <h2 className="text-3xl sm:text-5xl font-bold text-center mb-12 sm:mb-24">Experience</h2>

        {/* Stem - left on mobile, center on desktop */}
        <div className="absolute left-6 sm:left-1/2 top-32 sm:top-48 sm:-translate-x-1/2 w-1 h-[calc(100%-8rem)] sm:h-[calc(100%-12rem)] bg-gradient-to-b from-primary/50 via-secondary/50 to-primary/10 rounded-sm">
          <div
            className="absolute left-0 top-0 w-full bg-gradient-to-b from-primary to-secondary shadow-glow rounded-sm transition-all duration-600"
            style={{ height: `${stemProgress}%` }}
          />
        </div>

        {/* Leaves */}
        {experiences.map((exp, index) => (
          <TreeLeaf key={index} experience={exp} index={index} />
        ))}
      </div>
    </section>
  );
}
