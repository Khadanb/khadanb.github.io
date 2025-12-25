import { FolderGit2, BookOpen, FileText, Mail } from 'lucide-react';
import { Navbar } from './Navbar';
import { Footer } from './Footer';
import { Hero, ExperienceTree, PlaceholderSection } from '../sections';
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
        <PlaceholderSection
          id="projects"
          icon={FolderGit2}
          title="Projects"
          description="Coming soon. Check back for updates on my latest projects and open source contributions."
        />
        <PlaceholderSection
          id="publications"
          icon={BookOpen}
          title="Publications"
          description="Coming soon. Research papers and publications will be listed here."
        />
        <PlaceholderSection
          id="resume"
          icon={FileText}
          title="Resume"
          description="Coming soon. A detailed resume and downloadable CV will be available here."
        />
        <PlaceholderSection
          id="contact"
          icon={Mail}
          title="Contact"
          description="Coming soon. Contact information and a form to reach out will be available here."
        />
      </main>

      <Footer />
    </div>
  );
}
