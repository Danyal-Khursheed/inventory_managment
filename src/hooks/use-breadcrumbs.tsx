import { usePathname } from 'next/navigation';
import { useMemo } from 'react';

export function useBreadcrumbs() {
  const pathname = usePathname(); // e.g., /en/dashboard/Packages
  const segments = pathname.split('/').filter(Boolean); // ["en", "dashboard", "Packages"]

  return useMemo(() => {
    if (segments.length <= 1) return []; // nothing to show if only locale

    let path = '';
    // skip the first segment (locale)
    return segments.slice(1).map((segment) => {
      path += `/${segments[0]}/${segment}`; // include locale in link
      // Capitalize first letter
      const title = segment.charAt(0).toUpperCase() + segment.slice(1);
      return { title, link: path };
    });
  }, [segments]);
}

// 'use client';

// import { usePathname } from 'next/navigation';
// import { useMemo } from 'react';

// type BreadcrumbItem = {
//   title: string;
//   link: string;
// };

// // This allows to add custom title as well
// const routeMapping: Record<string, BreadcrumbItem[]> = {
//   '/dashboard': [{ title: 'Dashboard', link: '/dashboard' }],
//   '/dashboard/employee': [
//     { title: 'Dashboard', link: '/dashboard' },
//     { title: 'Employee', link: '/dashboard/employee' }
//   ]
//   // Add more custom mappings as needed
// };

// export function useBreadcrumbs() {
//   const pathname = usePathname();

//   const breadcrumbs = useMemo(() => {
//     // Check if we have a custom mapping for this exact path
//     if (routeMapping[pathname]) {
//       return routeMapping[pathname];
//     }

//     // If no exact match, fall back to generating breadcrumbs from the path
//     const segments = pathname.split('/').filter(Boolean);
//     return segments.map((segment, index) => {
//       const path = `/${segments.slice(0, index + 1).join('/')}`;
//       return {
//         title: segment.charAt(0).toUpperCase() + segment.slice(1),
//         link: path
//       };
//     });
//   }, [pathname]);

//   return breadcrumbs;
// }
