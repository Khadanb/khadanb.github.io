import { FolderGit2, BookOpen, FileText, Mail } from 'lucide-react';
import { Navbar } from './Navbar';
import { Footer } from './Footer';
import { Hero, ExperienceTree, PlaceholderSection } from '../sections';

export function SinglePageLayout() {
  return (
    <div className="min-h-screen bg-bg text-text font-sans flex flex-col overflow-x-hidden">
      {/* Background Effects */}
      <div className="fixed inset-0 bg-[radial-gradient(circle_at_50%_50%,#1e293b_0%,#0f172a_100%)] -z-10" />
      <div className="fixed w-[500px] h-[500px] bg-gradient-to-br from-primary to-secondary blur-[80px] rounded-full opacity-15 animate-blob -z-10" />

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
