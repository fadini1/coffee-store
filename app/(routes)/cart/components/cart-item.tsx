'use client';

import { toast } from 'react-hot-toast';

import { X } from 'lucide-react';

import { Product } from '@/types';

import Image from "next/image";

import IconButton from '@/components/ui/icon-button';
import Currency from '@/components/ui/currency';

import useCart from '@/hooks/use-cart';

interface CartItemProps {
  data: Product;
}

const CartItem: React.FC<CartItemProps> = ({ data }) => {
  const cart = useCart();

  const onRemove = () => {
    cart.removeItem(data.id);
  }

  return (
    <div>
      <li
        className='flex py-6 px-8 rounded-lg
        dark:hover:bg-zinc-900 transition duration-300'
      > 
        <div
          className='relative rounded-full h-24 w-24 sm:h-48 sm:w-48
          overflow-hidden'
        >
          <Image 
            fill
            alt=''
            className='object-cover object-center'
            src={data.images[0].url}
          />
        </div>

        <div
          className='flex flex-1 flex-col ml-4 sm:ml-6
          justify-between'
        >
          <div
            className='flex flex-col sm:gap-x-4'
          >
            <div
              className='flex justify-between'
            >
              <p
                className='text-black dark:text-white 
                text-xl font-semibold'
              >
                {data.name}
              </p>

              <IconButton
              className='text-black' 
              icon={
                <X 
                  size={15} 
                />
              }
              onClick={onRemove}
              />
            </div>

            <div
              className='flex text-sm gap-2 items-center'
            >
              <p
                className='text-zinc-100 bg-zinc-900 px-3 py-1 rounded-lg
                font-medium hover:bg-zinc-700 transition dark:bg-zinc-100
                dark:hover:bg-zinc-300 dark:text-zinc-900 dark:font-semibold'
              >
                {data.color.name}
              </p>

              <p
                className='text-zinc-100 bg-zinc-900 px-3 py-1 rounded-lg
                font-medium hover:bg-zinc-700 transition dark:bg-zinc-100
                dark:hover:bg-zinc-300 dark:text-zinc-900 dark:font-semibold'
              >
                {data.size.name}
              </p>

              <Currency 
                value={data.price}
              />
            </div>
          </div>
        </div>
      </li>

      <hr 
        className='mt-4'
      />
    </div>
  )
}

export default CartItem;