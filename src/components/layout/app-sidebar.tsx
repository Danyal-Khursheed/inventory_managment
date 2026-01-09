'use client';

import { useParams, usePathname } from 'next/navigation';
import { useMediaQuery } from '@/hooks/use-media-query';
import { useUser } from '@clerk/nextjs';
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger
} from '@/components/ui/collapsible';
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarMenuSub,
  SidebarMenuSubButton,
  SidebarMenuSubItem,
  SidebarRail
} from '@/components/ui/sidebar';
import { UserAvatarProfile } from '@/components/user-avatar-profile';
import { navItems } from '@/constants/data';
import {
  IconLogout,
  IconChevronRight,
  IconChevronsDown,
  IconPhotoUp
} from '@tabler/icons-react';
import { SignOutButton } from '@clerk/nextjs';
import Link from 'next/link';
import { Icons } from '../icons';
import { OrgSwitcher } from '../org-switcher';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger
} from '@radix-ui/react-dropdown-menu';

export const company = {
  name: 'Inventory Managment',
  logo: IconPhotoUp
  // plan: 'Enterprise'
};

const tenants = [{ id: '1', name: 'Inventory Managment' }];

export default function AppSidebar() {
  const { locale } = useParams();
  const pathname = usePathname();
  const { isOpen } = useMediaQuery();
  const { user } = useUser();

  const activeTenant = tenants[0];

  return (
    <Sidebar side={locale === 'ar' ? 'right' : 'left'}>
      <SidebarHeader className='bg-primary/5'>
        <OrgSwitcher defaultTenant={activeTenant} />
      </SidebarHeader>

      <SidebarContent className='bg-primary/5 overflow-x-hidden'>
        <SidebarGroup>
          <SidebarGroupLabel>Navigation</SidebarGroupLabel>
          <SidebarMenu className=''>
            {navItems.map((item) => {
              const Icon = item.icon ? Icons[item.icon] : Icons.logo;
              const trimmedPathname = pathname.slice(3);
              const isActive = trimmedPathname === item.url;

              return item?.items && item?.items?.length > 0 ? (
                <Collapsible
                  key={item.title}
                  asChild
                  defaultOpen={item.isActive}
                  className='group/collapsible'
                >
                  <SidebarMenuItem>
                    <CollapsibleTrigger asChild>
                      <SidebarMenuButton
                        tooltip={item.title}
                        isActive={pathname === item.url}
                      >
                        {item.icon && <Icon />}
                        <span>{item.title}</span>
                        <IconChevronRight className='ml-auto transition-transform duration-200 group-data-[state=open]/collapsible:rotate-90' />
                      </SidebarMenuButton>
                    </CollapsibleTrigger>
                    <CollapsibleContent>
                      <SidebarMenuSub>
                        {item.items?.map((subItem) => (
                          <SidebarMenuSubItem key={subItem.title}>
                            <SidebarMenuSubButton
                              asChild
                              isActive={pathname === subItem.url}
                            >
                              <Link href={subItem.url}>
                                <span>{subItem.title}</span>
                              </Link>
                            </SidebarMenuSubButton>
                          </SidebarMenuSubItem>
                        ))}
                      </SidebarMenuSub>
                    </CollapsibleContent>
                  </SidebarMenuItem>
                </Collapsible>
              ) : (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton
                    asChild
                    tooltip={item.title}
                    className={`${isActive ? 'bg-primary/80 text-white' : 'bg-transparent'} hover:bg-primary/80 hover:text-white`}
                    isActive={pathname === item.url}
                  >
                    <Link href={item.url}>
                      <Icon size={20} />
                      <span className='text-[16px]'>{item.title}</span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              );
            })}
          </SidebarMenu>
        </SidebarGroup>
      </SidebarContent>

      <SidebarFooter className='bg-primary/5'>
        <SidebarMenu>
          <SidebarMenuItem>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <SidebarMenuButton
                  size='lg'
                  className='data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground flex items-center gap-2'
                >
                  {user && (
                    <UserAvatarProfile
                      className='h-8 w-8 rounded-lg'
                      showInfo
                      user={user}
                    />
                  )}
                  <IconChevronsDown className='ml-auto size-4' />
                </SidebarMenuButton>
              </DropdownMenuTrigger>

              <DropdownMenuContent
                className='border-border bg-background w-[--radix-dropdown-menu-trigger-width] min-w-56 rounded-lg border p-1 shadow-md'
                side='bottom'
                align='end'
                sideOffset={4}
              >
                <DropdownMenuItem className='hover:bg-sidebar-accent hover:text-sidebar-accent-foreground flex cursor-pointer items-center gap-2 rounded-md px-3 py-2 transition-colors duration-150'>
                  <IconLogout className='h-4 w-4' />
                  <SignOutButton
                  // redirectUrl='/auth/sign-in'
                  >
                    <span>Sign Out</span>
                  </SignOutButton>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarFooter>

      <SidebarRail />
    </Sidebar>
  );
}
