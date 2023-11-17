'use client';

import { useCallback, useEffect, useState } from 'react';

import { RiMenuFoldFill, RiMenuUnfoldFill } from 'react-icons/ri';
import { GiShoppingBag } from 'react-icons/gi';

import { ArrowRightCircle, ArrowLeftCircle } from 'lucide-react';

import { usePathname, useRouter } from 'next/navigation';

import { ThemeToggle } from '@/components/toggle-theme';
import { Button } from '@/components/ui/button';

import Link from 'next/link';

import useCart from '@/hooks/use-cart';

const NavbarActions = () => {
  const [isMounted, setIsMounted] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  
  const router = useRouter();
  const cart = useCart();
  const pathname = usePathname();

  const toggleMenu = useCallback(() => {
    setIsOpen((value) => !value);
  }, []);

  const toggleHover = useCallback(() => {
    setIsHovered((value) => !value);
  }, []);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) {
    return null;
  }

  return (
    <div 
      className="ml-auto flex items-center justify-center space-x-2 relative"
    >
      <div
        className='lg:flex items-center text-zinc-500 pr-4 gap-x-2
        dark:text-zinc-400 hidden border-r dark:border-zinc-800'
      >

        <Link
          href='/#about-us'
        >
          <Button
            size='sm'
            variant='outline'
            className='rounded-full'
          >
            About Us
          </Button>
        </Link>

        <Link
          href='/#testimonials'
        >
          <Button
            size='sm'
            variant='outline'
            className='rounded-full'
          >
            Testimonials
          </Button>
        </Link>

        <Link
          href='/#contact'
        >
          <Button
            size='sm'
            variant='outline'
            className='rounded-full'
          >
            Contact
          </Button>
        </Link>

      </div>

      <div
        className='block lg:hidden cursor-pointer'
        onClick={toggleMenu}
      >
        {!isOpen && (
          <RiMenuUnfoldFill
            className='dark:text-zinc-300 dark:hover:text-zinc-100
            transition text-zinc-700 hover:text-black h-6 w-6'
          />
        )}
        {isOpen && (
          <RiMenuFoldFill 
            className='dark:text-zinc-300 dark:hover:text-zinc-100
            transition text-zinc-700 hover:text-black h-6 w-6'
          />
        )}
      </div>

      {isOpen && (
        <div
          className='absolute shadow-md max-w-xl h-fit bg-zinc-100
          overflow-hidden right-0 top-12 [text-sm flex rounded-md
          items-center flex-col cursor-pointer lg:hidden z-50 w-full
          sm:max-w-3xl'
        >
          <Link
            href='/#about-us'
            className='w-full'
          >
            <Button
              size='sm'
              variant='outline'
              className='w-full rounded-none'
            >
              About Us
            </Button>
          </Link>

          <Link
            href='/#testimonials'
            className='w-full'
          >
            <Button
              size='sm'
              variant='outline'
              className='w-full rounded-none'
            >
              Testimonials
            </Button>
          </Link>

          <Link
            href='/#contact'
            className='w-full'
          >
            <Button
              size='sm'
              variant='outline'
              className='w-full rounded-none'
            >
              Contact
            </Button>
          </Link>      
        </div>
      )}

      <div
        className='flex items-center gap-2'
      >
        <div
          className='ml-auto overflow-hidden'
        >
          <ThemeToggle />
        </div>

        <Button 
          onMouseEnter={toggleHover}
          onMouseLeave={toggleHover}
          variant='outline'
          className={`flex items-center rounded-md bg-zinc-900 
          dark:bg-zinc-100 md:px-4 md:py-2 px-4 py-2 gap-1
          dark:hover:bg-zinc-900 dark:hover:text-zinc-100
          group dark:text-zinc-900 hover:font-semibold hover:bg-zinc-100
          hover:text-zinc-900 text-sm font-medium transition
          dark:hover:font-medium dark:font-semibold duration-200
          text-zinc-100`}
          onClick={() => {
            if (pathname !== '/cart') {
              router.push('/cart');
            }

            if (pathname === '/cart') {
              router.back();
            }
          }}
        >
          {!isHovered && (
            <div
              className='flex items-center gap-1'
            >
              <div
                className='mb-0.5'
              >
                <GiShoppingBag 
                  size={18}
                />
              </div>
              
              <span 
                className='mt-1 md:mt-0.5'
              >
                {cart.items.length}
              </span>
            </div>
          )}
          
          {isHovered && pathname !== `/cart` && (
            <div
              className='flex gap-2 items-center'
            >
              Go to Cart
              <ArrowRightCircle />
            </div>
          )}
          
          {isHovered && pathname === '/cart' && (
            <div
              className='flex gap-2 items-center'
            >
              <ArrowLeftCircle />
              Go Back
            </div>
          )}
        </Button>
      </div>
    </div>
  )
}

export default NavbarActions;