import { useEffect, useRef, useState } from 'react';
import type { Experience } from '../../types';

interface TreeLeafProps {
  experience: Experience;
  index: number;
}

export function TreeLeaf({ experience, index }: TreeLeafProps) {
  const [isActive, setIsActive] = useState(false);
  const leafRef = useRef<HTMLDivElement>(null);
  const isEven = index % 2 === 1;

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setIsActive(true);
          }
        });
      },
      { threshold: 0.2, rootMargin: '0px 0px -50px 0px' }
    );

    if (leafRef.current) {
      observer.observe(leafRef.current);
    }

    return () => observer.disconnect();
  }, []);

  return (
    <div
      ref={leafRef}
      className={`relative w-full mb-12 sm:mb-32 flex items-center transition-all duration-700 ease-out ${
        isActive ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
      } justify-start sm:${isEven ? 'justify-end' : 'justify-start'}`}
    >
      {/* Branch - hidden on mobile, visible on desktop */}
      <div
        className={`hidden sm:block absolute top-1/2 left-1/2 h-0.5 bg-primary shadow-glow transition-all duration-600 delay-300 ${
          isActive ? 'w-[10%]' : 'w-0'
        } ${isEven ? 'origin-left' : 'origin-left rotate-180'}`}
      />

      {/* Mobile branch */}
      <div
        className={`sm:hidden absolute top-1/2 left-6 h-0.5 bg-primary shadow-glow transition-all duration-600 delay-300 ${
          isActive ? 'w-8' : 'w-0'
        }`}
      />

      {/* Content Card - full width on mobile with left margin, alternating on desktop */}
      <div
        className={`w-[calc(100%-3.5rem)] ml-14 sm:ml-0 sm:w-[42%] bg-glass-bg backdrop-blur-2xl border border-glass-border p-6 sm:p-12 rounded-2xl sm:rounded-3xl shadow-2xl ${
          isEven ? 'sm:ml-[55%] sm:mr-0' : 'sm:mr-[55%] sm:ml-0'
        }`}
      >
        <span className="block text-primary font-bold text-xs sm:text-sm mb-1 sm:mb-2 uppercase tracking-wider">
          {experience.company}
        </span>
        <h3 className="text-lg sm:text-2xl font-semibold mb-1 sm:mb-2 text-text">
          {experience.title}
        </h3>
        <span className="block text-xs sm:text-sm opacity-60 mb-4 sm:mb-8">{experience.date}</span>
        <ul className="list-none">
          {experience.highlights.map((highlight, i) => (
            <li
              key={i}
              className="mb-2 sm:mb-4 text-sm sm:text-base opacity-80 leading-relaxed pl-5 sm:pl-6 relative before:content-['◈'] before:absolute before:left-0 before:text-primary before:text-xs"
            >
              {highlight}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
