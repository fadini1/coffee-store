'use client';

import { MouseEventHandler } from 'react';

import { Expand, ShoppingCart } from "lucide-react";

import { useRouter } from "next/navigation";

import { Product } from "@/types";

import Image from "next/image";

import IconButton from "@/components/ui/icon-button";
import Currency from "@/components/ui/currency";

import usePreviewModal from '@/hooks/use-preview-modal';
import useCart from '@/hooks/use-cart';

interface ProductCardProps {
  data: Product;
}

const ProductCard: React.FC<ProductCardProps> = ({ data }) => {
  const router = useRouter();
  const cart = useCart();
  const previewModal = usePreviewModal();

  const handleClick = () => {
    router.push(`/product/${data?.id}`)
  }

  const onPreview: MouseEventHandler<HTMLButtonElement> = (event) => {
    event.stopPropagation();

    previewModal.onOpen(data);
  }

  const onAddToCart: MouseEventHandler<HTMLButtonElement> = (event) => {
    event.stopPropagation();

    cart.addItem(data);
  }

  return (
    <div 
    className="group cursor-pointer rounded-xl border p-3 space-y-4"
    onClick={handleClick}>
      {/* IMAGES AND ACTIONS */}

      <div className="aspect-square rounded-xl relative">
        <Image 
          fill
          alt="Image"
          className="aspect-square object-cover rounded-lg"
          src={data?.images?.[0]?.url}
        />

        <div className="opacity-0 group-hover:opacity-100 transition
        absolute w-full px-6 bottom-5">
          <div className="flex justify-center gap-x-4">
            <IconButton 
              onClick={onPreview}
              icon={
                <Expand 
                  className="text-zinc-400"
                  size={20}
                />
              }
            />

            <IconButton 
              onClick={onAddToCart}
              icon={
                <ShoppingCart 
                  className="text-zinc-400"
                  size={20}
                />
              }
            />
          </div>
        </div>
      </div>

      {/* DESCRIPTION */}

      <div>
        <p className="font-semibold text-lg">
          {data.name}               
        </p>

        <p className="text-sm text-zinc-400">
          {data.category?.name}
        </p>   
      </div>

      {/* PRICE */}

      <div className="flex items-center justify-between">
        <Currency 
          value={data?.price}
        />
      </div>
    </div>
  )
}

export default ProductCard;