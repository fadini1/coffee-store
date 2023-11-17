'use client';

import { MouseEventHandler } from 'react';

import { BiExpandAlt } from 'react-icons/bi';

import { useRouter } from "next/navigation";

import { CartOrder } from '@/hooks/use-cart';

import Image from "next/image";

import IconButton from "@/components/ui/icon-button";
import Currency from "@/components/ui/currency";

import usePreviewModal from '@/hooks/use-preview-modal';

interface ProductCardProps {
  data: CartOrder;
}

const ProductCard: React.FC<ProductCardProps> = ({ data }) => {
  const router = useRouter();
  const previewModal = usePreviewModal();

  const goToProduct = () => {
    router.push(`/product/${data?.id}`)
  }

  const onPreview: MouseEventHandler<HTMLButtonElement> = (event) => {
    event.stopPropagation();

    previewModal.onOpen(data);
  }

  return (
    <div 
    className="group rounded-xl border p-3 dark:bg-zinc-900 space-y-3
    bg-zinc-100 transition">
      {/* IMAGES AND ACTIONS */}

      <div className="aspect-square rounded-xl relative">
        <Image 
          fill
          alt="Image"
          className="aspect-square object-cover rounded-lg
          cursor-pointer"
          src={data?.images?.[0]?.url}
          onClick={goToProduct}
        />

        <div className="opacity-0 group-hover:opacity-100 transition
        absolute w-full px-6 bottom-5">
          <div className="flex justify-center gap-x-4">
            <IconButton 
              className='bg-zinc-200 hover:bg-white' 
              onClick={onPreview}
              icon={
                <BiExpandAlt 
                  className="text-zinc-900"
                  size={20}
                />
              }
            />
          </div>
        </div>
      </div>

      {/* DESCRIPTION */}

      <div
        className='flex items-center justify-center'
      >
        <p 
          className="font-semibold text-lg w-full bg-zinc-100
          dark:bg-zinc-900 rounded-sm dark:text-zinc-300
          dark:hover:text-zinc-100 transition cursor-pointer"
          onClick={goToProduct}
        >
          {data.name}               
        </p>  
      </div>

      <div
        className='flex items-center gap-1.5'
      >
        <p 
          className="text-sm text-zinc-100 dark:bg-zinc-800 
          py-1 px-3 rounded-full dark:text-zinc-400 font-semibold
          hover:dark:bg-zinc-200 transition border-[1px]
          dark:hover:text-zinc-900 text-center bg-zinc-900 w-full
          border-zinc-200 hover:bg-white hover:text-zinc-900
          hover:border-zinc-300"
        >
          {data.category?.name}
        </p> 

        <p 
          className="text-sm text-zinc-100 dark:bg-zinc-800 
          py-1 px-3 rounded-full dark:text-zinc-400 font-semibold
          hover:dark:bg-zinc-200 transition border-[1px]
          dark:hover:text-zinc-900 text-center bg-zinc-900 w-full
          border-zinc-200 hover:bg-white hover:text-zinc-900
          hover:border-zinc-300"
        >
          {data.color?.name}
        </p> 

        <div 
          className="text-sm text-zinc-100 dark:bg-zinc-800 
          py-1 px-3 rounded-full dark:text-zinc-400 font-semibold
          hover:dark:bg-zinc-200 transition border-[1px]
          dark:hover:text-zinc-900 text-center bg-zinc-900 w-full
          border-zinc-200 hover:bg-white hover:text-zinc-900
          hover:border-zinc-300"
        >
          <Currency 
            value={data?.price}
          />
        </div>
      </div>
    </div>
  )
}

export default ProductCard;