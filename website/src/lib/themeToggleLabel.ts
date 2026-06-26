type ThemeMode = 'light' | 'dark' | 'system';

export function getThemeToggleLabel(mode: ThemeMode): string {
  if (mode === 'system') {
    return 'Switch to light mode';
  }

  if (mode === 'light') {
    return 'Switch to dark mode';
  }

  return 'Switch to system theme';
}
