'use client';

import { useEffect } from 'react';

import { toast } from 'react-hot-toast';

import { ArrowLeft, ArrowRightCircle } from 'lucide-react';

import { useRouter, useSearchParams } from 'next/navigation';

import { Button } from '@/components/ui/button';

import axios from 'axios';

import Currency from '@/components/ui/currency';

import useCart from '@/hooks/use-cart';

const Summary = () => {
  const searchParams = useSearchParams();
  const router = useRouter();

  const goHome = () => {
    router.push('/');
  }

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
        cartItems: items.map((item) => item)
      }
    );

    window.location = response.data.url;
  }

  return (
    <div
      className='mt-16 rounded-lg px-4 py-6
      sm:p-6 lg:p-5 lg:mt-0 lg:col-span-5'
    >
      <h2
        className='text-zinc-900 dark:text-white text-lg font-semibold'
      >
        Order Summary
      </h2>

      <hr />

      <div
        className='mt-1 space-y-4'
      >
        <div
          className='flex items-center justify-between pt-1'
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
        className='w-full mt-4 rounded-sm flex items-center gap-1
        justify-center font-semibold'
        disabled={items.length === 0}
        onClick={onCheckout}
      >
        Checkout

        <ArrowRightCircle 
          size={20}
        />
      </Button>

      <Button
        className='flex gap-0.5 items-center mt-2 cursor-pointer w-full
        dark:text-zinc-300'
        variant='outline'
        onClick={goHome}
      >
          <ArrowLeft 
            size={16}
          />

          <p
            className='mt-0.5'
          >
            Keep Shopping
          </p>
      </Button>
    </div>
  )
}

export default Summary;