import { useRef } from 'react';
import { ScrollIndicator } from '../ui/ScrollIndicator';
import { usePanelRegistration } from '../../hooks';

export function Hero() {
  const cardRef = useRef<HTMLDivElement>(null);
  usePanelRegistration('hero-card', cardRef);

  return (
    <section id="home" className="min-h-dvh flex items-center justify-center text-center relative px-4 py-24">
      <div className="container max-w-2xl mx-auto">
        <div
          ref={cardRef}
          className="glass-card p-8 sm:p-12"
        >
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold mb-4 bg-gradient-to-r from-white to-muted bg-clip-text text-transparent">
            Brandon Khadan
          </h1>
          <p className="text-lg sm:text-xl text-muted">
            Explore our solar system with my interactive CV!
          </p>
        </div>
      </div>
      <ScrollIndicator targetId="experience" />
    </section>
  );
}
