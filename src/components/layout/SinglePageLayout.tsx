import { FileText } from 'lucide-react';
import { Navbar } from './Navbar';
import { Footer } from './Footer';
import { Hero, ExperienceTree, ProjectsSection, PublicationsSection, ContactSection, PlaceholderSection } from '../sections';
import { AtmosphereBackground } from '../background/AtmosphereBackground';

export function SinglePageLayout() {
  return (
    <div className="min-h-screen text-text font-sans flex flex-col overflow-x-hidden">
      {/* Atmospheric Parallax Background */}
      <AtmosphereBackground />

      <Navbar />

      <main className="flex-1">
        <Hero />
        <ExperienceTree />
        <ProjectsSection />
        <PublicationsSection />
        <PlaceholderSection
          id="resume"
          icon={FileText}
          title="Resume"
          description="Coming soon. A detailed resume and downloadable CV will be available here."
        />
        <ContactSection />
      </main>

      <Footer />
    </div>
  );
}
