'use client';

import { useEffect, useState } from 'react';

import { ShoppingBag } from 'lucide-react';

import { useRouter } from 'next/navigation';

import { ThemeToggle } from '@/components/toggle-theme';

import MyButton from "@/components/ui/my-button";

import useCart from '@/hooks/use-cart';
import Link from 'next/link';
import { Button } from './ui/button';

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
      <div
        className='flex items-center text-zinc-500 pr-4 gap-2
        dark:text-zinc-400'
      >
        <Button
          size='sm'
          variant='outline'
        >
          <Link
            href='#about-us'
          >
            About Us
          </Link>
        </Button>

        <Button
          size='sm'
          variant='outline'
        >
          <Link
            href='#testimonials'
          >
            Testimonials
          </Link>
        </Button>

        <Button
          size='sm'
          variant='outline'
        >
          <Link
            href='#contact'
          >
            Contact
          </Link>
        </Button>
      </div>

      <ThemeToggle />

      <MyButton 
        className='flex items-center rounded-lg bg-zinc-900 dark:bg-zinc-100 
        px-4 py-1.5'
        onClick={() => router.push('/cart')}
      >
        <ShoppingBag 
          size={19}
          className='text-white dark:text-black'
        />
        <span 
          className='ml-1 mt-0.5 font-semibold text-white 
          dark:text-zinc-900'
        >
          {cart.items.length}
        </span>
      </MyButton>
    </div>
  )
}

export default NavbarActions;