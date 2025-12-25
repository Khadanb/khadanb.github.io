import { ScrollIndicator } from '../ui/ScrollIndicator';

export function Hero() {
  return (
    <section id="home" className="h-screen flex items-center justify-center text-center relative px-4">
      <div className="container max-w-7xl mx-auto">
        <div className="bg-glass-bg backdrop-blur-xl border border-glass-border p-8 sm:p-16 rounded-3xl shadow-2xl">
          <h1 className="text-4xl sm:text-5xl md:text-7xl font-extrabold mb-4 bg-gradient-to-r from-white to-slate-400 bg-clip-text text-transparent">
            Brandon Khadan
          </h1>
          <p className="text-lg sm:text-xl text-slate-400 mb-8">
            Building something amazing on GitHub Pages.
          </p>
          <a
            href="#projects"
            className="inline-block px-8 sm:px-10 py-3 sm:py-4 bg-gradient-to-br from-primary to-secondary text-white rounded-full font-semibold transition-all duration-300 shadow-lg shadow-primary/30 hover:scale-105 hover:shadow-xl hover:shadow-primary/40"
          >
            Explore Projects
          </a>
        </div>
      </div>
      <ScrollIndicator targetId="experience" />
    </section>
  );
}
