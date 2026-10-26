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

const PAGE_LINKS = [
  { label: 'Resume', to: '/resume' },
  { label: 'Projects', to: '/projects' },
  { label: 'Wiki', to: '/wiki' },
];

const navButtonClass = 'relative h-auto rounded-lg px-3.5 py-2 text-sm font-medium text-muted-foreground hover:bg-primary/10 hover:text-foreground max-[900px]:w-full max-[900px]:justify-start';
const activeNavButtonClass = 'bg-primary/15 text-foreground after:absolute after:inset-x-3 after:-bottom-px after:h-0.5 after:rounded-full after:bg-primary max-[900px]:after:hidden';

export function SiteNav() {
  const { pathname } = useLocation();
  const [menuOpen, setMenuOpen] = useState(false);
  const onResume = pathname === '/resume';
  const { mode, theme, toggleTheme } = useTheme();
  const { resume } = useRequiredSiteData();
  const closeMenu = () => setMenuOpen(false);
  const themeLabel = getThemeToggleLabel(mode);

  return (
    <nav aria-label="Main navigation" className="sticky top-0 z-50 pt-3">
      <div className={pageContainerClass}>
        <div className="relative flex h-16 items-center justify-between rounded-2xl border bg-background/70 px-4 shadow-[0_10px_40px_-12px_oklch(0.3_0.15_277/0.35)] backdrop-blur-xl">
          <Button
            variant="ghost"
            className="h-auto gap-3 px-1 text-foreground hover:bg-transparent hover:text-foreground"
            render={<Link to="/" />}
          >
            <img
              className="size-9 object-contain"
              src={resolveAssetPath(theme === 'dark' ? 'favicon-dark.svg' : 'favicon.svg')}
              alt=""
              aria-hidden="true"
            />
            <span className="text-base font-semibold tracking-tight">{resume.name}</span>
          </Button>

          <ul
            id="site-nav-links"
            className={cn(
              'm-0 ml-auto flex list-none items-center gap-1 p-0 max-[900px]:absolute max-[900px]:top-[calc(100%+0.5rem)] max-[900px]:right-0 max-[900px]:left-0 max-[900px]:hidden max-[900px]:flex-col max-[900px]:items-stretch max-[900px]:rounded-2xl max-[900px]:border max-[900px]:bg-popover max-[900px]:p-2 max-[900px]:shadow-xl',
              menuOpen && 'max-[900px]:flex',
              !onResume && 'xl:absolute xl:left-1/2 xl:ml-0 xl:-translate-x-1/2',
            )}
          >
            {onResume ? (
              <>
                {RESUME_SECTIONS.map(({ label, hash }) => (
                  <li key={hash}>
                    <AnchorButton href={`#${hash}`} variant="ghost" size="sm" className={navButtonClass} onClick={closeMenu}>
                      {label}
                    </AnchorButton>
                  </li>
                ))}
                <li className="flex items-center max-[900px]:hidden" aria-hidden="true">
                  <Separator orientation="vertical" className="mx-1 h-4" />
                </li>
                <li>
                  <RouterLinkButton to="/projects" variant="ghost" size="sm" className={navButtonClass} onClick={closeMenu}>
                    Projects
                  </RouterLinkButton>
                </li>
                <li>
                  <RouterLinkButton to="/wiki" variant="ghost" size="sm" className={navButtonClass} onClick={closeMenu}>
                    Wiki
                  </RouterLinkButton>
                </li>
              </>
            ) : (
              <>
                {PAGE_LINKS.map(({ label, to }) => {
                  const active = pathname === to || pathname.startsWith(`${to}/`);

                  return (
                    <li key={to}>
                      <RouterLinkButton
                        to={to}
                        variant="ghost"
                        size="sm"
                        className={cn(navButtonClass, active && activeNavButtonClass)}
                        onClick={closeMenu}
                      >
                        {label}
                      </RouterLinkButton>
                    </li>
                  );
                })}

                <li>
                  <ExternalLink href={resume.github} className={cn(navButtonClass, 'no-underline hover:no-underline')} onClick={closeMenu}>
                    GitHub
                  </ExternalLink>
                </li>

                <li>
                  <ExternalLink href={resume.linkedin} className={cn(navButtonClass, 'no-underline hover:no-underline')} onClick={closeMenu}>
                    LinkedIn
                  </ExternalLink>
                </li>
              </>
            )}
          </ul>

          <Button
            type="button"
            variant="outline"
            size="icon"
            className={cn('ml-3 rounded-xl bg-transparent max-[900px]:ml-auto', !onResume && 'xl:ml-auto')}
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
            className="ml-2 hidden rounded-xl bg-transparent max-[900px]:inline-flex"
            onClick={() => setMenuOpen((open) => !open)}
            aria-expanded={menuOpen}
            aria-controls="site-nav-links"
            aria-label={menuOpen ? 'Close menu' : 'Open menu'}
          >
            {menuOpen ? <X className="size-4" /> : <Menu className="size-4" />}
          </Button>
        </div>
      </div>
    </nav>
  );
}
