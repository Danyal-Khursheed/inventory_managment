'use client';

import { useParams, usePathname } from 'next/navigation';
import { useMediaQuery } from '@/hooks/use-media-query';
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
import Link from 'next/link';
import { Icons } from '../icons';
import { OrgSwitcher } from '../org-switcher';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger
} from '@radix-ui/react-dropdown-menu';
import { useTranslations } from 'next-intl';
import useAuth from '@/auth/hooks/useAuth';

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
  const { user, logout } = useAuth();
  const t = useTranslations('sidebar');
  const isRTL = locale === 'ar';

  // Convert custom user to format expected by UserAvatarProfile
  const userForAvatar = user
    ? {
        imageUrl: undefined,
        fullName: user.name || user.email?.split('@')[0] || 'User',
        emailAddresses: [{ emailAddress: user.email || '' }]
      }
    : null;

  const activeTenant = tenants[0];

  // Get translated title for navigation items
  const getTranslatedTitle = (title: string) => {
    const translationMap: Record<string, string> = {
      Statistics: 'statistics',
      Warehouse: 'warehouse',
      'Warehouse Item': 'warehouseitem',
      'Countries Origin': 'countriesorigin',
      'Pickup Address': 'pickupaddress',
      'Shipping Company': 'shippingcompany',
      Order: 'order'
    };
    const key =
      translationMap[title] || title.toLowerCase().replace(/\s+/g, '');
    return t(key) || title;
  };

  return (
    <Sidebar
      collapsible='icon'
      variant='sidebar'
      side={isRTL ? 'right' : 'left'}
    >
      <div className='flex h-full min-h-0 w-full flex-col bg-[#fafafa] dark:bg-[#1e1e1e]'>
        <SidebarHeader className='border-b border-[#e0e0e0] bg-transparent px-0 dark:border-white/10'>
          <OrgSwitcher defaultTenant={activeTenant} />
        </SidebarHeader>

        <SidebarContent className='overflow-x-hidden bg-transparent'>
          <SidebarGroup className='p-0'>
            <SidebarGroupLabel className='px-6 py-2 text-xs font-medium tracking-normal text-[#757575] uppercase dark:text-gray-400'>
              {t('navigation')}
            </SidebarGroupLabel>
            <SidebarMenu className='gap-0 px-3'>
              {navItems.map((item) => {
                const Icon = item.icon ? Icons[item.icon] : Icons.logo;
                const trimmedPathname = pathname?.slice(3) || '';
                const isActive = trimmedPathname === item.url;
                const translatedTitle = getTranslatedTitle(item.title);

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
                          tooltip={translatedTitle}
                          isActive={isActive}
                          className={`group rounded-0 relative h-12 px-6 transition-colors ${
                            isActive
                              ? 'dark:bg-primary/20 text-primary dark:text-primary bg-[rgba(25,118,210,0.08)]'
                              : 'text-[#1e1e1e] hover:bg-[rgba(0,0,0,0.04)] dark:text-gray-200 dark:hover:bg-white/5'
                          }`}
                        >
                          {item.icon && <Icon className='h-5 w-5 shrink-0' />}
                          <span className='ml-4 text-sm font-medium'>
                            {translatedTitle}
                          </span>
                          <IconChevronRight
                            className={`ml-auto h-4 w-4 transition-transform ${
                              isRTL ? 'rotate-180' : ''
                            } group-data-[state=open]/collapsible:rotate-90`}
                          />
                        </SidebarMenuButton>
                      </CollapsibleTrigger>
                      <CollapsibleContent>
                        <SidebarMenuSub className='ml-6 border-l border-[#e0e0e0] pl-2 dark:border-white/10'>
                          {item.items?.map((subItem) => (
                            <SidebarMenuSubItem key={subItem.title}>
                              <SidebarMenuSubButton
                                asChild
                                isActive={pathname === subItem.url}
                                className='rounded-0 data-[active=true]:text-primary dark:data-[active=true]:bg-primary/20 dark:data-[active=true]:text-primary h-10 px-4 text-sm data-[active=true]:bg-[rgba(25,118,210,0.08)]'
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
                      tooltip={translatedTitle}
                      isActive={isActive}
                      className={`group rounded-0 relative h-12 px-6 transition-colors ${
                        isActive
                          ? 'dark:bg-primary/20 text-primary dark:text-primary bg-[rgba(25,118,210,0.08)]'
                          : 'text-[#1e1e1e] hover:bg-[rgba(0,0,0,0.04)] dark:text-gray-200 dark:hover:bg-white/5'
                      }`}
                    >
                      <Link
                        href={item.url}
                        className='flex w-full items-center'
                      >
                        {item.icon && <Icon className='h-5 w-5 shrink-0' />}
                        <span className='ml-4 text-sm font-medium'>
                          {translatedTitle}
                        </span>
                      </Link>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                );
              })}
            </SidebarMenu>
          </SidebarGroup>
        </SidebarContent>

        <SidebarFooter className='border-t border-[#e0e0e0] bg-transparent px-0 dark:border-white/10'>
          <SidebarMenu>
            <SidebarMenuItem>
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <SidebarMenuButton
                    size='lg'
                    className='rounded-0 flex h-14 items-center gap-3 px-6 hover:bg-[rgba(0,0,0,0.04)] data-[state=open]:bg-[rgba(0,0,0,0.04)] dark:hover:bg-white/5 dark:data-[state=open]:bg-white/5'
                  >
                    {userForAvatar && (
                      <UserAvatarProfile
                        className='ring-primary/20 h-9 w-9 rounded-lg ring-2'
                        showInfo
                        user={userForAvatar}
                      />
                    )}
                    <IconChevronsDown
                      className={`ml-auto h-4 w-4 transition-transform duration-200 ${
                        isRTL ? 'rotate-180' : ''
                      }`}
                    />
                  </SidebarMenuButton>
                </DropdownMenuTrigger>

                <DropdownMenuContent
                  className='bg-background w-[--radix-dropdown-menu-trigger-width] min-w-56 rounded-md border border-[#e0e0e0] p-1 shadow-lg dark:border-white/10'
                  side='bottom'
                  align='end'
                  sideOffset={4}
                >
                  <DropdownMenuItem
                    onClick={logout}
                    className='flex cursor-pointer items-center gap-2 rounded-none px-4 py-2.5 hover:bg-[rgba(0,0,0,0.04)] dark:hover:bg-white/5'
                  >
                    <IconLogout className='h-4 w-4' />
                    <span className='font-medium'>{t('signOut')}</span>
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </SidebarMenuItem>
          </SidebarMenu>
        </SidebarFooter>
      </div>
      <SidebarRail />
    </Sidebar>
  );
}
