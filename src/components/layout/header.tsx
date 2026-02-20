'use client';

import React from 'react';
import { SidebarTrigger } from '../ui/sidebar';
import { Separator } from '../ui/separator';
import { Breadcrumbs } from '../breadcrumbs';
import { UserNav } from './user-nav';
import { ThemeSelector } from '../theme-selector';
import { ModeToggle } from './ThemeToggle/theme-toggle';

export default function Header() {
  return (
    <header className='flex h-16 min-w-0 shrink-0 items-center justify-between gap-2 overflow-hidden border-b border-[#e0e0e0] px-3 transition-[width,height] ease-linear group-has-data-[collapsible=icon]/sidebar-wrapper:h-12 sm:px-4 dark:border-white/10'>
      <div className='flex min-w-0 flex-1 items-center gap-2 overflow-hidden'>
        <SidebarTrigger className='-ml-1 shrink-0' />
        <Separator
          orientation='vertical'
          className='mr-2 hidden h-4 shrink-0 sm:block'
        />
        <div className='min-w-0 flex-1 overflow-hidden'>
          <Breadcrumbs />
        </div>
      </div>

      {/* Desktop: header actions; mobile: same actions live in sidebar */}
      <div className='hidden shrink-0 items-center gap-1 sm:gap-2 md:flex'>
        <UserNav />
        <ModeToggle />
        <ThemeSelector />
      </div>
    </header>
  );
}
