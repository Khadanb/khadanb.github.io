import { useRef, forwardRef } from 'react';
import type { Experience } from '../../types';
import { useIntersectionObserver, usePanelRegistration } from '../../hooks';

interface TreeLeafProps {
  experience: Experience;
  index: number;
}

export const TreeLeaf = forwardRef<HTMLDivElement, TreeLeafProps>(
  function TreeLeaf({ experience, index }, branchRef) {
    const leafRef = useRef<HTMLDivElement>(null);
    const cardRef = useRef<HTMLDivElement>(null);
    const isEven = index % 2 === 1;

    const isActive = useIntersectionObserver(leafRef, {
      threshold: 0.2,
      rootMargin: '0px 0px -50px 0px',
      triggerOnce: true,
    });

    // Register panel for collision detection
    usePanelRegistration(`treeleaf-${experience.company}-${index}`, cardRef);

    return (
      <div
        ref={leafRef}
        className={`relative isolate w-full mb-12 sm:mb-32 flex items-center transition-[opacity,transform] duration-700 ease-out ${
          isActive ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
        } justify-start sm:${isEven ? 'justify-end' : 'justify-start'}`}
      >
        {/* Content Card - rendered first, always on top */}
        <div
          ref={cardRef}
          className={`relative z-10 w-[calc(100%-3.5rem)] ml-14 sm:ml-0 sm:w-[42%] bg-glass-bg backdrop-blur-2xl border border-glass-border p-6 sm:p-12 rounded-2xl sm:rounded-3xl shadow-2xl ${
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
            {experience.highlights.map((highlight) => (
              <li
                key={`${experience.company}-${highlight}`}
                className="mb-2 sm:mb-4 text-sm sm:text-base opacity-80 leading-relaxed pl-5 sm:pl-6 relative before:content-['◈'] before:absolute before:left-0 before:text-primary before:text-xs"
              >
                {highlight}
              </li>
            ))}
          </ul>
        </div>

        {/* Branch - hidden on mobile, visible on desktop */}
        {/* Left cards (isEven=false) need 8% gap, right cards (isEven=true) need 5% gap */}
        <div
          ref={branchRef}
          className={`hidden sm:block absolute top-1/2 left-1/2 h-0.5 bg-primary/30 ${
            isEven ? 'origin-left' : 'origin-left rotate-180'
          } ${isActive ? 'opacity-100' : 'opacity-0'}`}
          style={{ width: isEven ? '5%' : '8%' }}
        >
          {/* Lit portion of branch */}
          <div
            data-branch-lit
            className="absolute inset-0 bg-primary shadow-glow origin-left"
            style={{ transform: 'scaleX(0)', willChange: 'transform' }}
          />
        </div>

        {/* Mobile branch */}
        <div
          data-mobile-branch
          className={`sm:hidden absolute top-1/2 left-2 h-0.5 bg-primary/30 ${
            isActive ? 'opacity-100' : 'opacity-0'
          }`}
          style={{ width: '3rem' }}
        >
          {/* Lit portion of mobile branch */}
          <div
            data-branch-lit-mobile
            className="absolute inset-0 bg-primary shadow-glow origin-left"
            style={{ transform: 'scaleX(0)', willChange: 'transform' }}
          />
        </div>
      </div>
    );
  }
);

TreeLeaf.displayName = 'TreeLeaf';
