'use client';

import { usePathname } from 'next/navigation';

import { Category } from '@/types';
import { cn } from '@/lib/utils';

import Link from 'next/link';

interface MainNavProps {
  data: Category[];
};

const MainNav: React.FC<MainNavProps> = ({ data }) => {
  const pathname = usePathname();

  const routes = data.map((route) => ({
    href: `/category/${route.id}`,
    label: route.name,
    active: pathname === `/category/${route.id}`
  }));

  return (
    <nav className='mx-6 mt-0.5 flex items-center space-x-4 lg:space-x-3'>
      {routes.map((route) => (
        <Link 
        href={route.href}
        key={route.href}
        className={cn(
          `font-medium transition-colors hover:text-zinc-900 
          dark:hover:text-zinc-100`,
          route.active ? 'text-zinc-900 dark:text-white' : 'text-zinc-500'
        )}>
          {route.label}
        </Link>
      ))}
    </nav>
  )
}

export default MainNav;