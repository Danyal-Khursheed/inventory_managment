'use client';

import { useThemeConfig } from '@/components/active-theme';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger
} from '@/components/ui/dropdown-menu';
import { IconPalette } from '@tabler/icons-react';
import * as React from 'react';

const THEMES = [
  { label: 'Default', value: 'default' },
  { label: 'Blue', value: 'blue' },
  { label: 'Green', value: 'green' },
  { label: 'Amber', value: 'amber' },
  { label: 'Default Scaled', value: 'default-scaled' },
  { label: 'Blue Scaled', value: 'blue-scaled' },
  { label: 'Mono', value: 'mono-scaled' }
];

export function ThemeSelector() {
  const { activeTheme, setActiveTheme } = useThemeConfig();
  const [open, setOpen] = React.useState(false);

  return (
    <DropdownMenu open={open} onOpenChange={setOpen}>
      <DropdownMenuTrigger
        asChild
        onMouseEnter={() => setOpen(true)}
        onMouseLeave={() => setOpen(false)}
      >
        <button className='hover:bg-sidebar-accent hover:text-sidebar-accent-foreground rounded-lg p-2 transition-colors'>
          <IconPalette className='h-6 w-6' />
        </button>
      </DropdownMenuTrigger>

      <DropdownMenuContent
        side='bottom'
        align='end'
        sideOffset={4}
        className='border-border bg-background rounded-lg border p-1 shadow-md'
        onMouseEnter={() => setOpen(true)}
        onMouseLeave={() => setOpen(false)}
      >
        {THEMES.map((theme) => (
          <DropdownMenuItem
            key={theme.value}
            className={`hover:bg-sidebar-accent hover:text-sidebar-accent-foreground cursor-pointer rounded-md px-3 py-2 transition-colors ${
              activeTheme === theme.value
                ? 'bg-sidebar-accent text-sidebar-accent-foreground'
                : ''
            }`}
            onClick={() => setActiveTheme(theme.value)}
          >
            {theme.label}
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
