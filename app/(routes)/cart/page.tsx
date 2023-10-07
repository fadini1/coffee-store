'use client';

import { useEffect, useState } from "react";

import Container from "@/components/ui/container";

import useCart from "@/hooks/use-cart";

import CartItem from "./components/cart-item";
import Summary from "./components/summary";

const CartPage = () => {
  const [isMounted, setIsMounted] = useState(false);

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
          className="px-4 py-16 sm:px-6 lg:px-8"
        >
          <h1
            className="text-3xl text-black dark:text-white font-bold"
          >
            Shopping Cart
          </h1>

          <div
            className="mt-12 gap-x-12 lg:grid lg:grid-cols-12 lg:items-start"
          >
            <div
              className="lg:col-span-7"
            >
              {
                cart.items.length === 0 && 
                <p
                  className="text-zinc-500"
                >
                  No Products have been added yet
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

            <Summary />
          </div>
        </div>
      </Container>
    </div>
  )
}

export default CartPage;