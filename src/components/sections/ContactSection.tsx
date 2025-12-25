import { Mail } from 'lucide-react';

export function ContactSection() {
  return (
    <section id="contact" className="min-h-screen py-16 sm:py-32 flex items-center">
      <div className="max-w-7xl mx-auto px-4 sm:px-8 w-full">
        <div className="bg-glass-bg backdrop-blur-xl border border-glass-border p-8 sm:p-12 rounded-3xl">
          <div className="flex items-center gap-4 mb-8">
            <Mail className="w-10 h-10 text-primary" />
            <h2 className="text-3xl sm:text-4xl font-bold">Contact</h2>
          </div>
          <p className="text-slate-400 text-lg">
            Coming soon. Contact information and a form to reach out will be available here.
          </p>
        </div>
      </div>
    </section>
  );
}
