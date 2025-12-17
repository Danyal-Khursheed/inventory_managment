'use client';

import { IconBrightness } from '@tabler/icons-react';
import { useTheme } from 'next-themes';
import { useRouter, useParams, usePathname } from 'next/navigation';
import * as React from 'react';
import { Button } from '@/components/ui/button';
import { Spinner } from '@/components/ui/Spinner';

export function ModeToggle() {
  const { setTheme, resolvedTheme } = useTheme();
  const router = useRouter();
  const { locale } = useParams();
  const pathname = usePathname();
  const [currentLocale, setCurrentLocale] = React.useState(locale || 'en');
  const [loading, setLoading] = React.useState(false);

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

  const handleLanguageSwitch = () => {
    const newLocale = currentLocale === 'en' ? 'ar' : 'en';
    setCurrentLocale(newLocale);
    setLoading(true);
    router.push(`/${newLocale}${pathname.substring(3)}`);
  };

  React.useEffect(() => {
    setLoading(false);
  }, [locale]);

  return (
    <div className='flex items-center gap-3'>
      <Button
        onClick={handleLanguageSwitch}
        variant='secondary'
        size='icon'
        className='hover:bg-accent-light dark:hover:bg-accent-dark hover:text-accent-foreground flex transform items-center justify-center rounded-lg p-3 transition-colors duration-200 ease-in-out'
        disabled={loading}
      >
        {loading ? (
          <Spinner className='h-4 w-4' />
        ) : (
          <span className='text-md'>
            {currentLocale === 'en' ? 'Ar' : 'En'}
          </span>
        )}
      </Button>

      <Button
        variant='secondary'
        size='icon'
        className='group/toggle hover:bg-accent-light dark:hover:bg-accent-dark hover:text-accent-foreground relative flex size-9 transform items-center justify-center rounded-lg p-3 transition-colors duration-200 ease-in-out'
        onClick={handleThemeToggle}
      >
        <IconBrightness className='transition-colors duration-200' />
        <span className='sr-only'>Toggle theme</span>
      </Button>
    </div>
  );
}
