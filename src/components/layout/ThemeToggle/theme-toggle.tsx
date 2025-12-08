'use client';

import { IconBrightness } from '@tabler/icons-react';
import { useTheme } from 'next-themes';
import * as React from 'react';

import { Button } from '@/components/ui/button';

export function ModeToggle() {
  const { setTheme, resolvedTheme } = useTheme();

  const handleThemeToggle = React.useCallback(
    (e?: React.MouseEvent) => {
      const newMode = resolvedTheme === 'dark' ? 'light' : 'dark';
      const root = document.documentElement;

      if (!document.startViewTransition) {
        setTheme(newMode);
        return;
      }

      if (e) {
        root.style.setProperty('--x', `${e.clientX}px`);
        root.style.setProperty('--y', `${e.clientY}px`);
      }

      document.startViewTransition(() => {
        setTheme(newMode);
      });
    },
    [resolvedTheme, setTheme]
  );

  return (
    <Button
      variant='secondary'
      size='icon'
      className='group/toggle relative size-8'
      onClick={handleThemeToggle}
    >
      <IconBrightness className='transition-colors duration-200' />

      {/* Tooltip below the button */}
      <span className='bg-sidebar-accent text-sidebar-accent-foreground absolute top-full left-1/2 z-50 mt-2 -translate-x-1/2 scale-0 rounded-md px-2 py-1 text-xs font-medium whitespace-nowrap transition-all group-hover/toggle:scale-100'>
        {resolvedTheme === 'dark' ? 'Dark Mode' : 'Light Mode'}
      </span>

      <span className='sr-only'>Toggle theme</span>
    </Button>
  );
}
