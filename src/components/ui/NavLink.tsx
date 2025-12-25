import type { SectionId } from '../../hooks';

export interface NavItem {
  id: SectionId;
  label: string;
}

interface NavLinkProps {
  link: NavItem;
  activeSection: SectionId;
  variant: 'desktop' | 'mobile';
  onClick?: () => void;
}

export function NavLink({ link, activeSection, variant, onClick }: NavLinkProps) {
  const isActive = activeSection === link.id;

  const baseStyles = 'font-medium transition-colors duration-300 hover:text-white';
  const activeColor = isActive ? 'text-white' : 'text-slate-400';

  const variantStyles = variant === 'desktop'
    ? baseStyles
    : `block px-4 py-3 ${baseStyles} hover:bg-white/5`;

  return (
    <li>
      <a
        href={`#${link.id}`}
        className={`${variantStyles} ${activeColor}`}
        onClick={onClick}
      >
        {link.label}
      </a>
    </li>
  );
}
