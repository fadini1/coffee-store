'use client';

import { ChangeEvent, useState } from "react";

import { TbShoppingCartPlus } from "react-icons/tb";

import { Product } from "@/types";

import { Input } from "@/components/ui/input";

import Button from "@/components/ui/my-button";
import Currency from "@/components/ui/currency";

import useCart from "@/hooks/use-cart";

import toast from "react-hot-toast";

import * as z from 'zod';

interface InfoProps {
  data: Product;
}

const Info: React.FC<InfoProps> = ({ data }) => {
  const cart = useCart();

  const [quantity, setQuantity] = useState(data?.quantity);

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

    if (e.target.value === "") {
      setQuantity(0);
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
      toast.error("We do not have that many items in Stock");
    } else {
      cart.addItem(order);
    }
  };
  
  // const onAddToCart = () => {
  //   if (itemsAvailable !== 0) {
  //     cart.addItem(data);  

  //     setItemsAvailable(itemsAvailable - 1);
  //   }

  //   if (itemsAvailable === 0) {
  //     toast.error('This Product is currently out of Stock!')
  //   }
  // }

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
              In Stock:
            </h3>

            <div>
              {data?.quantity}
            </div>
          </div>        
        </div>   
      </div>

      <div
        className="max-w-sm font-medium"
      >
        {data.description}
      </div>

      <div
        className="flex gap-2 items-center"
      >
        <Button 
          className="flex items-center gap-2 mt-2 rounded-sm"
          onClick={onAddToCart}
        >
          Add to Cart
          <TbShoppingCartPlus 
            size={22}
          />
        </Button>

        <div
          className="flex items-center gap-2"
        >
          <h2>
            Quantity:
          </h2>

          <Button>
            -
          </Button>
          
          <Input
            onChange={handleQuantity}
            value={quantity} 
            min={1}
            max={10000}
            type="number"
            placeholder="Set your desired Quantity..."
          />
        </div>
      </div>
    </div>
  )
}

export default Info;