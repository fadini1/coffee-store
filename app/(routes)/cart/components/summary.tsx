'use client';

import { useEffect } from 'react';

import { toast } from 'react-hot-toast';

import { useSearchParams } from 'next/navigation';

import axios from 'axios';

import Button from '@/components/ui/my-button';
import Currency from '@/components/ui/currency';

import useCart from '@/hooks/use-cart';

const Summary = () => {
  const searchParams = useSearchParams();

  const items = useCart((state) => state.items);
  const removeAll = useCart((state) => state.removeAll);

  useEffect(() => {
    if (searchParams.get('success')) {
      toast.success('Payment Completed!');
      removeAll();
    }

    if (searchParams.get('canceled')) {
      toast.error('Something Went Wrong!');
    }
  }, [searchParams, removeAll]);

  const totalPrice = items.reduce((total, item) => {
    return total + Number(item.price);
  }, 0);

  const onCheckout = async () => {
    const response = await axios.post(
      `${process.env.NEXT_PUBLIC_API_URL}/checkout`,
      {
        productIds: items.map((item) => item.id)
      }
    );

    window.location = response.data.url;
  }

  return (
    <div
      className='mt-16 rounded-lg px-4 py-6
      sm:p-6 lg:p-8 lg:mt-0 lg:col-span-5'
    >
      <h2
        className='text-zinc-900 dark:text-white text-lg font-medium'
      >
        Order Summary
      </h2>

      <div
        className='mt-6 space-y-4'
      >
        <div
          className='flex items-center justify-between border-t
          border-zinc-200 pt-4'
        >
          <div
            className='font-medium text-zinc-900 dark:text-white'
          >
            Order Total
          </div>

          <Currency 
            value={totalPrice}
          />
        </div>
      </div>

      <Button
        className='w-full mt-4'
        disabled={items.length === 0}
        onClick={onCheckout}
      >
        Checkout
      </Button>
    </div>
  )
}

export default Summary;