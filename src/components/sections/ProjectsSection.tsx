import { FolderGit2 } from 'lucide-react';
import { projects } from '../../content/projects';
import { ProjectCard } from '../ui/ProjectCard';

export function ProjectsSection() {
  return (
    <section id="projects" className="min-h-screen py-16 sm:py-32 flex items-center">
      <div className="max-w-7xl mx-auto px-4 sm:px-8 w-full">
        <div className="flex items-center gap-4 mb-10">
          <FolderGit2 className="w-10 h-10 text-primary" />
          <h2 className="text-3xl sm:text-4xl font-bold">Projects</h2>
        </div>

        {projects.length === 0 ? (
          <div className="glass-card p-8 sm:p-12">
            <p className="text-muted text-lg">
              No projects published yet. Check back soon for write-ups on what I'm building.
            </p>
          </div>
        ) : (
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {projects.map((entry) => (
              <ProjectCard key={entry.slug} entry={entry} />
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
