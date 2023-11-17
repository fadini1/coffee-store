'use client';

import { ChangeEvent, useState } from "react";

import { TbShoppingCartPlus, TbShoppingCartMinus } from "react-icons/tb";

import { Input } from "@/components/ui/input";

import useCart, { CartOrder } from "@/hooks/use-cart";

import * as z from 'zod';

import toast from "react-hot-toast";

import Button from "@/components/ui/my-button";
import Currency from "@/components/ui/currency";

interface InfoProps {
  data: CartOrder;
}

const Info: React.FC<InfoProps> = ({ data }) => {
  const cart = useCart();

  const [quantity, setQuantity] = useState(1);
  const [isOutOfStock, setIsOutOfStock] = useState(false);

  const quantitySchema = z.object({
    quantity: z.number().int({
      message: "Decimals are not allowed"
    }).min(1, {
      message: "Quantity must be at least 1"
    }).max(10000, {
      message: "Quantity cannot be higher than 10000"
    })
  });

  const handleQuantity = (e: ChangeEvent<HTMLInputElement>) => {
    let error = null;

    if (quantity === 0) {
      setQuantity(1);
      error = "Please select how many items you wish to buy";
      toast.error(error);
    } else {
      setQuantity(parseFloat(e.target.value));
    }
  };

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

  return (
    <div>
      <h1 className="text-3xl font-bold text-zinc-900 dark:text-white">
        {data.name}
      </h1>

      <hr className="mb-3 mt-1" />

      <div className="flex flex-col gap-y-2">
        <div className="flex items-center gap-x-2 mb-3">
          <div 
            className="text-zinc-900 flex items-center
            bg-zinc-100 py-2 px-4 rounded-md shadow-md 
            shadow-zinc-300 gap-1 dark:hover:bg-zinc-700
            transition dark:bg-zinc-900 dark:text-zinc-400
            dark:shadow-zinc-700 dark:hover:text-zinc-200
            hover:bg-zinc-300 hover:shadow-zinc-500
            hover:dark:shadow-zinc-300"
          >
            <p
              className="font-semibold"
            >
              Price:
            </p>
            <Currency 
              value={data?.price}
            />
          </div>

          <div
            className="text-zinc-900 flex items-center
            bg-zinc-100 py-2 px-4 rounded-md shadow-md 
            shadow-zinc-300 gap-1 dark:hover:bg-zinc-700
            transition dark:bg-zinc-900 dark:text-zinc-400
            dark:shadow-zinc-700 dark:hover:text-zinc-200
            hover:bg-zinc-300 hover:shadow-zinc-500
            hover:dark:shadow-zinc-300"
          >
            <h3 className="font-semibold">
              Size:
            </h3>

            <div>
              {data?.size?.value}
            </div>
          </div>

          <div
            className="text-zinc-900 flex items-center
            bg-zinc-100 py-2 px-4 rounded-md shadow-md 
            shadow-zinc-300 gap-1 dark:hover:bg-zinc-700
            transition dark:bg-zinc-900 dark:text-zinc-400
            dark:shadow-zinc-700 dark:hover:text-zinc-200
            hover:bg-zinc-300 hover:shadow-zinc-500
            hover:dark:shadow-zinc-300"
          >
            <h3 className="font-semibold">
              Color:
            </h3>

            <div 
              className="h-6 w-6 rounded-full border border-zinc-500"
              style={{ backgroundColor: data?.color?.value }}
            />
          </div>        
        </div>   
      </div>

      <div
        className="max-w-sm font-medium"
      >
        {data.description}
      </div>

      <div
        className='my-4 rounded-sm flex gap-2 max-w-md'
      >
        <Button
          className='dark:bg-zinc-900 dark:hover:bg-zinc-300
          dark:text-zinc-500 dark:hover:text-zinc-900 rounded-sm
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
          dark:text-zinc-500 dark:hover:text-zinc-900 rounded-sm
          transition bg-zinc-100 text-zinc-900 border-[1px]
          dark:border-none hover:bg-zinc-900 hover:text-zinc-100'
          disabled={quantity >= data.quantity || !quantity}
          onClick={increaseQuantity}
        >
          +
        </Button>
      </div>

      <div
        className='flex gap-2 items-center max-w-md'
      >
        <Button
          className='rounded-sm font-bold transition w-full
          dark:bg-zinc-900 dark:hover:bg-zinc-100
          dark:text-zinc-500 dark:hover:text-zinc-900
          bg-zinc-100 text-zinc-600 hover:bg-zinc-900
          hover:text-zinc-100 flex gap-1 border-[1px]
          dark:border-none items-center justify-center'
          disabled={quantity > data.quantity || !quantity}
          onClick={onAddToCart}
        >
          Add to Cart
          <TbShoppingCartPlus 
            size={16}
          />
        </Button>

        <Button
          className='rounded-sm font-bold transition w-full
          dark:bg-zinc-900 dark:hover:bg-zinc-100
          dark:text-zinc-500 dark:hover:text-zinc-900
          bg-zinc-100 text-zinc-600 hover:bg-zinc-900
          hover:text-zinc-100 flex gap-1 border-[1px]
          dark:border-none items-center justify-center'
          disabled={!quantity || data.orderQty === 0}
          onClick={onRemoveFromCart}
        >
          Remove
          <TbShoppingCartMinus 
            size={16}
          />
        </Button>
      </div>
    </div>
  )
}

export default Info;