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
    <li
      className='flex py-6 border-b'
    > 
      <div
        className='relative rounded-md h-24 w-24 sm:h-48 sm:w-48
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
        className='relative flex flex-1 flex-col ml-4 sm:ml-6
        justify-between'
      >
        <div
          className='absolute z-10 right-0 top-0'
        >
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
          className='relative pr-9 sm:pr-0 sm:grid sm:grid-cols-2 sm:gap-x-4'
        >
          <div
            className='flex justify-between'
          >
            <p
              className='text-black dark:text-white text-lg font-semibold'
            >
              {data.name}
            </p>
          </div>

          <div
            className='mt-0.5 flex text-sm'
          >
            <p
              className='text-zinc-500'
            >
              {data.color.name}
            </p>

            <p
              className='text-zinc-500 ml-4 pl-4 border-l border-zinc-200'
            >
              {data.size.name}
            </p>
          </div>

          <Currency 
            value={data.price}
          />
        </div>
      </div>
    </li>
  )
}

export default CartItem;