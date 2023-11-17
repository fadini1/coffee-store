'use client';

import { ChangeEvent, useState } from 'react';

import { useRouter } from 'next/navigation';

import { ArrowLeft, MinusCircle, PlusCircle, X } from 'lucide-react';

import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';

import useCart, { CartOrder } from '@/hooks/use-cart';

import * as z from 'zod';

import toast from 'react-hot-toast';

import Image from "next/image";

import IconButton from '@/components/ui/icon-button';
import Currency from '@/components/ui/currency';

interface CartItemProps {
  data: CartOrder;
}

const CartItem: React.FC<CartItemProps> = ({ data }) => {
  const cart = useCart();
  const router = useRouter();

  const [quantity, setQuantity] = useState(data.orderQty);
  const [isOutOfStock, setIsOutOfStock] = useState(false);
  
  const goToProduct = () => {
    router.push(`/product/${data?.id}`)
  }

  const quantitySchema = z.object({
    quantity: z.number().int({
      message: "Decimals are not allowed"
    }).min(1, {
      message: `You cannot Add/Remove 0 Items. 
      Please select a number higher than 1.`
    }).max(10000, {
      message: "Quantity cannot be higher than 10000"
    })
  });

  const onAddToCart = () => {
    const res = quantitySchema.safeParse({ quantity: quantity });

    let order = {
      ...data,
      orderQty: quantity
    };

    if (!res.success) {
      toast.error(res.error.issues[0].message);
    } else if (quantity > data.quantity) {
      toast.error(`Please select a number between 1 and ${data.quantity}`);
      setQuantity(data.quantity);
    } else {
      cart.addItem(order);

      if (data.orderQty === data.quantity) {
        setIsOutOfStock(true);
      }
    }
  };

  const onRemoveFromCart = () => {
    const res = quantitySchema.safeParse({ quantity: quantity });

    let order = {
      ...data,
      orderQty: quantity
    };

    if (!res.success) {
      toast.error(res.error.issues[0].message);
    } else if (quantity > data.quantity || quantity === data.orderQty) {
      cart.removeItem(data.id);
    } else {
      cart.removeSpecificNumber(order);

      if (data.orderQty < data.quantity) {
        setIsOutOfStock(false);
      }
    }
  };

  const handleQuantity = (e: ChangeEvent<HTMLInputElement>) => {
    setQuantity(parseFloat(e.target.value));
  };

  const increaseQuantity = () => {
    if (!quantity) {
      toast.error('Type how many items you wish to Add/Remove');
    }

    if (quantity > data.quantity) {
      toast.error(`Please select a number between 1 and ${data.quantity}`);
      setQuantity(data.quantity);
    } else if (quantity === data.quantity) {
      toast.error(`You can't select a number higher than ${data.quantity}`);
    } else {
      setQuantity((prevQuantity) => prevQuantity + 1);
    }
  }

  const decreaseQuantity = () => {
    if (!quantity) {
      toast.error('Type how many items you wish to Add/Remove');
    }
    if (quantity === 1) {
      toast.error('Number must be at least 1');
    } else {
      setQuantity((prevQuantity) => prevQuantity - 1);
    }
  }

  const onRemove = () => {
    cart.removeItem(data.id);
  }

  return (
    <div>
      <li
        className='flex py-6 px-8 rounded-lg dark:hover:bg-black/40'
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
              className='flex justify-between pb-1'
            >
              <p
                className='text-black dark:text-zinc-200
                text-xl font-semibold mt-1'
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

            <hr />

            <div
              className='flex text-sm gap-2 items-center pt-2'
            >
              <p
                className='text-zinc-900 bg-zinc-100 px-3 py-1 rounded-sm
                font-bold hover:bg-zinc-900 transition dark:bg-zinc-900
                dark:hover:bg-zinc-100 dark:text-zinc-500 dark:font-bold
                dark:hover:text-zinc-900 border-[1px] hover:text-zinc-100'
              >
                {data.color.name}
              </p>

              <p
                className='text-zinc-900 bg-zinc-100 px-3 py-1 rounded-sm
                font-bold hover:bg-zinc-900 transition dark:bg-zinc-900
                dark:hover:bg-zinc-100 dark:text-zinc-500 dark:font-bold
                dark:hover:text-zinc-900 border-[1px] hover:text-zinc-100'
              >
                {data.size.name}
              </p>

              <div
                className='text-zinc-900 bg-zinc-100 px-3 py-1 rounded-sm
                font-bold hover:bg-zinc-900 transition dark:bg-zinc-900
                dark:hover:bg-zinc-100 dark:text-zinc-500 dark:font-bold
                dark:hover:text-zinc-900 border-[1px] hover:text-zinc-100'
              >              
                <Currency 
                  value={data.price}
                />
              </div>

              <p
                className='text-zinc-900 bg-zinc-100 px-3 py-1 rounded-sm
                font-bold hover:bg-zinc-900 transition dark:bg-zinc-900
                dark:hover:bg-zinc-100 dark:text-zinc-500 dark:font-bold
                dark:hover:text-zinc-900 border-[1px] hover:text-zinc-100'
              >
                In Cart: {data.orderQty}
              </p>
            </div>

            <div
              className='my-4 rounded-sm flex gap-2'
            >
              <Button
                className='dark:bg-zinc-900 dark:hover:bg-zinc-300
                dark:text-zinc-500 dark:hover:text-zinc-900
                transition bg-zinc-100 text-zinc-900 border-[1px]
                dark:border-none hover:bg-zinc-900 hover:text-zinc-100'
                disabled={quantity <= 1 || !quantity}
                onClick={decreaseQuantity}
              >
                -
              </Button>

              <Input
                onChange={handleQuantity}
                value={quantity} 
                min={1}
                max={data.quantity}
                type="number"
                placeholder="Add/Remove items from your Cart"
              />
              
              <Button
                className='dark:bg-zinc-900 dark:hover:bg-zinc-300
                dark:text-zinc-500 dark:hover:text-zinc-900
                transition bg-zinc-100 text-zinc-900 border-[1px]
                dark:border-none hover:bg-zinc-900 hover:text-zinc-100'
                disabled={quantity >= data.quantity || !quantity}
                onClick={increaseQuantity}
              >
                +
              </Button>
            </div>

            <div
              className='flex gap-2 items-center'
            >
              <Button
                className='rounded-sm font-bold transition w-full
                dark:bg-zinc-900 dark:hover:bg-zinc-100
                dark:text-zinc-500 dark:hover:text-zinc-900
                bg-zinc-100 text-zinc-600 hover:bg-zinc-900
                hover:text-zinc-100 flex gap-1 border-[1px]
                dark:border-none'
                disabled={quantity > data.quantity || !quantity}
                onClick={onAddToCart}
              >
                Add
                <PlusCircle 
                  size={16}
                />
              </Button>

              <Button
                className='rounded-sm font-bold transition w-full
                dark:bg-zinc-900 dark:hover:bg-zinc-100
                dark:text-zinc-500 dark:hover:text-zinc-900
                bg-zinc-100 text-zinc-600 hover:bg-zinc-900
                hover:text-zinc-100 flex gap-1 border-[1px]
                dark:border-none'
                disabled={!quantity}
                onClick={onRemoveFromCart}
              >
                Remove
                <MinusCircle 
                  size={16}
                />
              </Button>
            </div>

            <div
              className='flex gap-0.5 items-center mt-2'
            >
              <p
                className='text-sm dark:text-zinc-500 font-bold 
                dark:hover:text-zinc-300 transition flex items-center
                gap-0.5 border-b-[1.5px] dark:border-zinc-900 cursor-pointer 
                dark:hover:border-zinc-500 border-zinc-100
                hover:border-zinc-900 text-zinc-500 hover:text-zinc-900'
                onClick={goToProduct}
              >
                <ArrowLeft 
                  size={16}
                />

                <p
                  className='mt-0.5'
                >
                  Go to Product
                </p>
              </p>
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