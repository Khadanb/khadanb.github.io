import { useRef } from 'react';
import { Mail, Linkedin } from 'lucide-react';
import { usePanelRegistration } from '../../hooks';

export function ContactSection() {
  const cardRef = useRef<HTMLDivElement>(null);
  usePanelRegistration('contact', cardRef);

  return (
    <section id="contact" className="min-h-dvh py-16 sm:py-32 flex items-center">
      <div className="max-w-7xl mx-auto px-4 sm:px-8 w-full">
        <div ref={cardRef} className="glass-card p-8 sm:p-12">
          <div className="flex items-center gap-4 mb-8">
            <Mail className="w-10 h-10 text-primary" />
            <h2 className="text-3xl sm:text-4xl font-bold">Contact</h2>
          </div>
          <p className="text-muted text-lg mb-8">Let&apos;s connect.</p>
          <div className="flex flex-wrap gap-4">
            <a
              href="https://www.linkedin.com/in/brandon-khadan/"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Connect with Brandon Khadan on LinkedIn"
              className="inline-flex items-center gap-2 min-h-11 px-5 py-2.5 rounded-lg border border-glass-border text-text hover:text-primary hover:border-primary transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-primary"
            >
              <Linkedin className="w-5 h-5" aria-hidden="true" />
              <span>LinkedIn</span>
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
