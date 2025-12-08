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
        <SidebarMenuButton size='lg' className='flex items-center gap-2'>
          {/* Icon */}
          <div className='bg-primary text-sidebar-primary-foreground flex aspect-square size-8 items-center justify-center rounded-lg'>
            <GalleryVerticalEnd className='size-4' />
          </div>

          {/* Tenant Name */}
          <div className='flex flex-col gap-0.5 leading-none'>
            <span className='font-semibold'>Next Starter</span>
            <span>{defaultTenant.name}</span>
          </div>
        </SidebarMenuButton>
      </SidebarMenuItem>
    </SidebarMenu>
  );
}
