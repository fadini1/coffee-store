'use client';

import { TbShoppingCartPlus } from "react-icons/tb";

import { Product } from "@/types";

import Button from "@/components/ui/my-button";
import Currency from "@/components/ui/currency";

import useCart from "@/hooks/use-cart";

interface InfoProps {
  data: Product;
}

const Info: React.FC<InfoProps> = ({ data }) => {
  const cart = useCart();

  const onAddToCart = () => {
    cart.addItem(data);
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
            <h3 className="font-semibold dark:text-white">
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

      <Button 
        className="flex items-center gap-2 mt-2 rounded-sm"
        onClick={onAddToCart}
      >
        Add to Cart
        <TbShoppingCartPlus 
          size={22}
        />
      </Button>
    </div>
  )
}

export default Info;