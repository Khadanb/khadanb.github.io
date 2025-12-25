import { FolderGit2 } from 'lucide-react';

export function ProjectsPage() {
  return (
    <main className="pt-32 pb-16 flex-1">
      <div className="max-w-7xl mx-auto px-4 sm:px-8">
        <div className="bg-glass-bg backdrop-blur-xl border border-glass-border p-8 sm:p-12 rounded-3xl">
          <div className="flex items-center gap-4 mb-8">
            <FolderGit2 className="w-10 h-10 text-primary" />
            <h1 className="text-3xl sm:text-4xl font-bold">Projects</h1>
          </div>
          <p className="text-slate-400 text-lg">
            Coming soon. Check back for updates on my latest projects and open source contributions.
          </p>
        </div>
      </div>
    </main>
  );
}
