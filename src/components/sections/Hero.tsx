import { useRef } from 'react';
import { ScrollIndicator } from '../ui/ScrollIndicator';
import { usePanelRegistration } from '../../hooks';

export function Hero() {
  const cardRef = useRef<HTMLDivElement>(null);
  usePanelRegistration('hero-card', cardRef);

  return (
    <section id="home" className="h-screen flex items-center justify-center text-center relative px-4">
      <div className="container max-w-2xl mx-auto">
        <div
          ref={cardRef}
          className="bg-glass-bg backdrop-blur-xl border border-glass-border p-8 sm:p-12 rounded-3xl shadow-2xl"
        >
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold mb-4 bg-gradient-to-r from-white to-slate-400 bg-clip-text text-transparent">
            Brandon Khadan
          </h1>
          <p className="text-lg sm:text-xl text-slate-400">
            Explore our solar system with my interactive CV!
          </p>
        </div>
      </div>
      <ScrollIndicator targetId="experience" />
    </section>
  );
}
