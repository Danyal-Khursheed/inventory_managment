'use client';

import { usePathname } from 'next/navigation';
import { useEffect, useRef } from 'react';
import { useSidebar } from '@/components/ui/sidebar';

/** Closes the mobile sidebar when the route changes (e.g. after clicking a nav link). */
export function CloseSidebarOnNavigate() {
  const pathname = usePathname();
  const { setOpenMobile, isMobile } = useSidebar();
  const prevPathname = useRef(pathname);

  useEffect(() => {
    if (pathname !== prevPathname.current && isMobile) {
      setOpenMobile(false);
      prevPathname.current = pathname;
    } else {
      prevPathname.current = pathname;
    }
  }, [pathname, isMobile, setOpenMobile]);

  return null;
}
