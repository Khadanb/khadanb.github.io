import { useState } from 'react';
import { Menu, X } from 'lucide-react';
import { useScrollSpy } from '../../hooks';
import { NAV_ITEMS } from '../../config/navigation';

export function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const activeSection = useScrollSpy();

  return (
    <nav className="fixed top-0 w-full z-50 py-4 sm:py-6 bg-bg/80 backdrop-blur-md border-b border-glass-border">
      <div className="max-w-7xl mx-auto px-4 sm:px-8 flex justify-between items-center">
        <a
          href="#home"
          className="font-extrabold text-xl sm:text-2xl bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent"
        >
          Brandon Khadan
        </a>

        {/* Desktop Navigation */}
        <ul className="hidden md:flex gap-8 list-none">
          {NAV_ITEMS.map((link) => (
            <li key={link.id}>
              <a
                href={`#${link.id}`}
                className={`font-medium transition-colors duration-300 hover:text-white ${
                  activeSection === link.id ? 'text-white' : 'text-slate-400'
                }`}
              >
                {link.label}
              </a>
            </li>
          ))}
        </ul>

        {/* Mobile Menu Button */}
        <button
          className="md:hidden text-white p-2"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          aria-label="Toggle menu"
        >
          {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </div>

      {/* Mobile Navigation */}
      {isMenuOpen && (
        <div className="md:hidden absolute top-full left-0 w-full bg-bg/95 backdrop-blur-md border-b border-glass-border">
          <ul className="flex flex-col py-4">
            {NAV_ITEMS.map((link) => (
              <li key={link.id}>
                <a
                  href={`#${link.id}`}
                  className={`block px-4 py-3 font-medium transition-colors duration-300 hover:text-white hover:bg-white/5 ${
                    activeSection === link.id ? 'text-white' : 'text-slate-400'
                  }`}
                  onClick={() => setIsMenuOpen(false)}
                >
                  {link.label}
                </a>
              </li>
            ))}
          </ul>
        </div>
      )}
    </nav>
  );
}
