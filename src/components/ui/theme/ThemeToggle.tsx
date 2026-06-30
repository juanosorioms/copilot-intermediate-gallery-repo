'use client';

import { useTheme } from 'next-themes';
import { Sun, Moon, Monitor } from 'lucide-react';
import { useEffect, useState } from 'react';

const themeOptions = [
  { value: 'light', icon: Sun, label: 'Light mode' },
  { value: 'dark', icon: Moon, label: 'Dark mode' },
  { value: 'system', icon: Monitor, label: 'System theme' },
] as const;

export function ThemeToggle() {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  // Render a placeholder with same dimensions to avoid layout shift
  if (!mounted) {
    return <div className="h-9 w-9" aria-hidden="true" />;
  }

  const currentIndex = themeOptions.findIndex((o) => o.value === theme);
  const safeIndex = currentIndex === -1 ? 2 : currentIndex;
  const nextOption = themeOptions[(safeIndex + 1) % themeOptions.length];
  const { icon: CurrentIcon, label: currentLabel } = themeOptions[safeIndex];

  return (
    <button
      onClick={() => setTheme(nextOption.value)}
      className="btn-icon rounded-md p-2"
      aria-label={`Current theme: ${currentLabel}. Switch to ${nextOption.label}`}
      title={`Switch to ${nextOption.label}`}
    >
      <CurrentIcon className="h-5 w-5" aria-hidden="true" />
    </button>
  );
}
