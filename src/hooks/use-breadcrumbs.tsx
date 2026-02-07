import { usePathname } from 'next/navigation';
import { useMemo } from 'react';

export function useBreadcrumbs() {
  const pathname = usePathname(); // e.g., /en/dashboard/Warehouse
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
