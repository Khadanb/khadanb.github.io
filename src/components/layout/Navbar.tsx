import { useState } from 'react';
import { Menu, X } from 'lucide-react';
import { useScrollSpy } from '../../hooks';
import { NAV_ITEMS } from '../../config/navigation';
import { NavLink } from '../ui/NavLink';

export function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const activeSection = useScrollSpy();

  return (
    <nav className="fixed top-0 w-full z-50 py-4 sm:py-6 glass-nav">
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
            <NavLink
              key={link.id}
              link={link}
              activeSection={activeSection}
              variant="desktop"
            />
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
        <div className="md:hidden absolute top-full left-0 w-full glass-nav-mobile">
          <ul className="flex flex-col py-4">
            {NAV_ITEMS.map((link) => (
              <NavLink
                key={link.id}
                link={link}
                activeSection={activeSection}
                variant="mobile"
                onClick={() => setIsMenuOpen(false)}
              />
            ))}
          </ul>
        </div>
      )}
    </nav>
  );
}
