'use client';

import { useEffect, useState } from "react";

import { ArrowRightCircle } from "lucide-react";

import { useRouter } from "next/navigation";

import { Button } from "@/components/ui/button";

import Container from "@/components/ui/container";

import useCart from "@/hooks/use-cart";

import Summary from "./components/summary";
import CartItem from "./components/cart-item";

const CartPage = () => {
  const [isMounted, setIsMounted] = useState(false);

  const router = useRouter();

  const cart = useCart();
  
  useEffect(() => {
    setIsMounted(true);
  }, []);
  
  if (!isMounted) {
    return null;
  }

  return (
    <div>
      <Container>
        <div
          className="px-4 py-10 sm:px-6 lg:px-10"
        >
          <h1
            className="text-3xl text-black dark:text-white font-bold"
          >
            Shopping Cart
          </h1>

          <div
            className="mt-6 gap-x-12 lg:grid lg:grid-cols-12 lg:items-start"
          >
            <div
              className={
                `${cart.items.length === 0 ? 'lg:col-span-12' : 'lg:col-span-7'}
              `}
            >
              {
                cart.items.length === 0 && 
                <p
                  className="dark:text-zinc-400 p-40 align-center
                  flex flex-col items-center justify-center rounded-lg
                  dark:bg-zinc-900/50 bg-zinc-50 font-medium"
                >
                  <p 
                    className="text-lg mb-2"
                  >
                    Looks like your Cart is empty...
                  </p>
                  <Button 
                    variant='outline'
                    className="dark:bg-zinc-100 dark:text-zinc-900
                    dark:font-semibold dark:hover:bg-zinc-900 transition
                    bg-zinc-900 text-zinc-100 font-medium flex gap-1
                    hover:bg-zinc-200 hover:font-semibold 
                    dark:hover:font-medium dark:hover:text-zinc-100"
                    onClick={() => router.push('/')}
                  >
                    Go Shopping!
                    <ArrowRightCircle 
                      size={18}
                    />
                  </Button>
                </p>
              }

              <ul>
                {cart.items.map((item) => (
                  <CartItem
                    data={item} 
                    key={item.id}
                  />
                ))}
              </ul>
            </div>

            {
              cart.items.length !== 0 && <Summary />
            }
          </div>
        </div>
      </Container>
    </div>
  )
}

export default CartPage;