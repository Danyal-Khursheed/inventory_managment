import { NavItem } from '@/types';

//Info: The following data is used for the sidebar navigation and Cmd K bar.
export const navItems: NavItem[] = [
  {
    title: 'Warehouse',
    url: '/dashboard/Warehouse',
    icon: 'warehouse',
    isActive: false,
    shortcut: ['w', 'w'],
    items: []
  },
  {
    title: 'WarehouseItem',
    url: '/dashboard/WarehouseItem',
    icon: 'warehouse',
    isActive: false,
    shortcut: ['d', 'd'],
    items: []
  },
  {
    title: 'CountriesOrigin',
    url: '/dashboard/CountriesOrigin',
    icon: 'IconWorld',
    isActive: false,
    shortcut: ['e', 'e'],
    items: []
  }
];
