import { Menu, Monitor, Moon, Sun, X } from 'lucide-react';
import { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';

import { AnchorButton } from '@/components/common/AnchorButton';
import { ExternalLink } from '@/components/common/ExternalLink';
import { RouterLinkButton } from '@/components/common/RouterLinkButton';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { useTheme } from '@/context/ThemeContext';
import { useRequiredSiteData } from '@/hooks/useRequiredSiteData';
import { pageContainerClass } from '@/lib/pageContainer';
import { resolveAssetPath } from '@/lib/resolveAssetPath';
import { getThemeToggleLabel } from '@/lib/themeToggleLabel';
import { cn } from '@/lib/utils';

const RESUME_SECTIONS = [
  { label: 'About', hash: 'about' },
  { label: 'Experience', hash: 'experience' },
  { label: 'Education', hash: 'education' },
  { label: 'Skills', hash: 'skills' },
  { label: 'Leadership', hash: 'leadership' },
  { label: 'Projects', hash: 'projects' },
  { label: 'Contact', hash: 'contact' },
];

const navButtonClass = 'h-auto rounded-md px-2.5 py-1.5 text-[13.5px] font-medium text-slate-400 hover:bg-white/10 hover:text-white';

export function SiteNav() {
  const { pathname } = useLocation();
  const [menuOpen, setMenuOpen] = useState(false);
  const onResume = pathname === '/resume';
  const { mode, theme, toggleTheme } = useTheme();
  const { resume } = useRequiredSiteData();
  const closeMenu = () => setMenuOpen(false);
  const themeLabel = getThemeToggleLabel(mode);

  return (
    <nav aria-label="Main navigation" className="sticky top-0 z-50 border-b border-white/10 bg-slate-900/95 backdrop-blur-md">
      <div className={cn(pageContainerClass, 'relative flex h-15 items-center justify-between')}>
        <Button
          variant="ghost"
          className="h-auto gap-2.5 px-0 text-white hover:bg-transparent hover:text-slate-200"
          render={<Link to="/" />}
        >
          <img
            className="size-8 object-contain"
            src={resolveAssetPath('favicon-dark.svg')}
            alt=""
            aria-hidden="true"
          />
          <span className="text-[15px] font-semibold tracking-tight">{resume.name}</span>
        </Button>

        <Button
          type="button"
          variant="outline"
          size="icon"
          className="ml-auto border-white/20 bg-white/5 text-slate-100 hover:bg-white/10 hover:text-white"
          onClick={toggleTheme}
          aria-label={themeLabel}
          title={themeLabel}
        >
          {mode === 'system' ? (
            <Monitor className="size-4" />
          ) : theme === 'dark' ? (
            <Sun className="size-4" />
          ) : (
            <Moon className="size-4" />
          )}
        </Button>

        <Button
          type="button"
          variant="outline"
          size="icon"
          className="ml-2 hidden border-white/20 bg-transparent text-slate-100 hover:bg-white/10 max-[660px]:inline-flex"
          onClick={() => setMenuOpen((open) => !open)}
          aria-expanded={menuOpen}
          aria-controls="site-nav-links"
          aria-label={menuOpen ? 'Close menu' : 'Open menu'}
        >
          {menuOpen ? <X className="size-4" /> : <Menu className="size-4" />}
        </Button>

        <ul
          id="site-nav-links"
          className={cn(
            'm-0 flex list-none gap-0.5 p-0 max-[660px]:absolute max-[660px]:top-15 max-[660px]:right-0 max-[660px]:left-0 max-[660px]:hidden max-[660px]:flex-col max-[660px]:gap-1.5 max-[660px]:border-t max-[660px]:border-b max-[660px]:border-white/10 max-[660px]:bg-slate-900/98 max-[660px]:px-0 max-[660px]:py-2.5 max-[660px]:shadow-xl',
            menuOpen && 'max-[660px]:flex',
            !onResume && 'ml-3.5',
          )}
        >
          {onResume ? (
            <>
              {RESUME_SECTIONS.map(({ label, hash }) => (
                <li key={hash}>
                  <AnchorButton
                    href={`#${hash}`}
                    variant="ghost"
                    size="sm"
                    className={cn(navButtonClass, 'max-[660px]:block max-[660px]:w-full max-[660px]:px-3 max-[660px]:py-2.5 max-[660px]:text-sm')}
                    onClick={closeMenu}
                  >
                    {label}
                  </AnchorButton>
                </li>
              ))}
              <li className="flex items-center max-[660px]:hidden" aria-hidden="true">
                <Separator orientation="vertical" className="mx-0.5 h-4 bg-white/15" />
              </li>
              <li>
                <RouterLinkButton
                  to="/projects"
                  variant="outline"
                  size="sm"
                  className="rounded-full border-blue-500/30 bg-blue-500/20 text-blue-200 hover:bg-blue-500/30 hover:text-blue-100 max-[660px]:mx-3"
                  onClick={closeMenu}
                >
                  Projects ↗
                </RouterLinkButton>
              </li>
            </>
          ) : (
            <>
              <li>
                <RouterLinkButton to="/resume" variant="ghost" size="sm" className={navButtonClass} onClick={closeMenu}>
                  Resume
                </RouterLinkButton>
              </li>

              <li>
                <RouterLinkButton to="/projects" variant="ghost" size="sm" className={navButtonClass} onClick={closeMenu}>
                  Projects
                </RouterLinkButton>
              </li>

              <li>
                <ExternalLink href={resume.github} className={navButtonClass} onClick={closeMenu}>
                  GitHub
                </ExternalLink>
              </li>

              <li>
                <ExternalLink href={resume.linkedin} className={navButtonClass} onClick={closeMenu}>
                  LinkedIn
                </ExternalLink>
              </li>
            </>
          )}
        </ul>
      </div>
    </nav>
  );
}
