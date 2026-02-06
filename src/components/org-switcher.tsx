'use client';

import { GalleryVerticalEnd } from 'lucide-react';
import * as React from 'react';

import {
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem
} from '@/components/ui/sidebar';

interface Tenant {
  id: string;
  name: string;
}

export function OrgSwitcher({ defaultTenant }: { defaultTenant: Tenant }) {
  if (!defaultTenant) return null;

  return (
    <SidebarMenu>
      <SidebarMenuItem>
        <SidebarMenuButton
          size='lg'
          className='h-14 rounded-none px-6 hover:bg-[rgba(0,0,0,0.04)] dark:hover:bg-white/5'
        >
          <div className='dark:bg-primary/20 text-primary flex aspect-square size-9 shrink-0 items-center justify-center rounded-md bg-[rgba(25,118,210,0.12)]'>
            <GalleryVerticalEnd className='size-5' />
          </div>
          <span className='text-sm font-semibold text-[#1e1e1e] dark:text-gray-100'>
            {defaultTenant.name}
          </span>
        </SidebarMenuButton>
      </SidebarMenuItem>
    </SidebarMenu>
  );
}
