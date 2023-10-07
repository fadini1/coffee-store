'use client';

import { useEffect, useState } from 'react';

import { ShoppingBag } from 'lucide-react';

import { useRouter } from 'next/navigation';

import { ThemeToggle } from '@/components/toggle-theme';

import Button from "@/components/ui/my-button";

import useCart from '@/hooks/use-cart';

const NavbarActions = () => {
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  const router = useRouter();
  const cart = useCart();

  if (!isMounted) {
    return null;
  }

  return (
    <div 
      className="ml-auto flex items-center space-x-2"
    >
      <ThemeToggle />

      <Button 
        className='flex items-center rounded-full bg-black dark:bg-white 
        px-4 py-2'
        onClick={() => router.push('/cart')}
      >
        <ShoppingBag 
          size={20}
          className='text-white dark:text-zinc-900'
        />
        <span 
          className='ml-2 text-sm font-semibold text-white 
          dark:text-zinc-900'
        >
          {cart.items.length}
        </span>
      </Button>
    </div>
  )
}

export default NavbarActions;