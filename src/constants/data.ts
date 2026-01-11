import { NavItem } from '@/types';

//Info: The following data is used for the sidebar navigation and Cmd K bar.
export const navItems: NavItem[] = [
  {
    title: 'Statistics',
    url: '/dashboard/Statistics',
    icon: 'dashboard',
    isActive: false,
    shortcut: ['s', 's'],
    items: []
  },
  {
    title: 'Warehouse',
    url: '/dashboard/Warehouse',
    icon: 'warehouse',
    isActive: false,
    shortcut: ['w', 'w'],
    items: []
  },
  {
    title: 'Warehouse Item',
    url: '/dashboard/WarehouseItem',
    icon: 'warehouse',
    isActive: false,
    shortcut: ['d', 'd'],
    items: []
  },
  {
    title: 'Countries Origin',
    url: '/dashboard/CountriesOrigin',
    icon: 'IconWorld',
    isActive: false,
    shortcut: ['e', 'e'],
    items: []
  },
  {
    title: 'Pickup Address',
    url: '/dashboard/PickupAddress',
    icon: 'IconMapPin',
    isActive: false,
    shortcut: ['e', 'e'],
    items: []
  },
  {
    title: 'Shipping Company',
    url: '/dashboard/ShippingCompany',
    icon: 'IconTruck',
    isActive: false,
    shortcut: ['e', 'e'],
    items: []
  },
  // {
  //   title: 'Order',
  //   url: '/dashboard/Order',
  //   icon: 'IconShoppingCart',
  //   isActive: false,
  //   shortcut: ['e', 'e'],
  //   items: []
  // },
  {
    title: 'Order',
    url: '/dashboard/OrderData',
    icon: 'IconClipboardList',
    isActive: false,
    shortcut: ['e', 'e'],
    items: []
  }
];
