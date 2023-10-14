'use client';

import { useState } from "react";

import Image from "next/image";

import StoreImage01 from '@/public/images/shop/coffee-shop-01.png';
import StoreImage02 from '@/public/images/shop/coffee-shop-02.png';
import StoreImage03 from '@/public/images/shop/coffee-shop-03.png';
import StoreImage04 from '@/public/images/shop/coffee-shop-04.png';
import { ArrowLeftCircle, ArrowRightCircle, Dot } from "lucide-react";

const AboutUs = () => {
  let [currentIndex, setCurrentIndex] = useState(0);

  const images = [
    StoreImage01,
    StoreImage02,
    StoreImage03,
    StoreImage04
  ];

  const isFirstImage = currentIndex === 0;
  const isSecondImage = currentIndex === 1;
  const isThirdImage = currentIndex === 2;
  const isLastImage = currentIndex === 3;

  const previousImage = () => {
    setCurrentIndex(currentIndex - 1);
  }

  const nextImage = () => {    
    setCurrentIndex(currentIndex + 1);
  }

  return (
    <div
      className="px-10"
    >
      <h1
        className="text-3xl font-bold"
      >
        About Us
      </h1>

      <p
        className="max-w-lg py-4"
      >
        Lorem ipsum dolor sit amet consectetur adipisicing elit. 
        Velit minus, dicta error dolor excepturi minima neque saepe
        ab laborum doloremque veniam consequuntur, fugiat perferendis
        et vitae quibusdam atque quam iure.
      </p>
      
      <div className="flex items-center justify-center relative
      w-72 h-[450px] rounded-lg">
        <Image 
          alt="about-us-company"  
          className='object-cover object-center rounded-lg
          cursor-pointer h-full w-full dark:border-zinc-300
          border-2 shadow-md dark:shadow-zinc-300
          dark:hover:shadow-zinc-100 transition duration-300
          dark:hover:border-zinc-100 dark:hover:opacity-80
          hover:opacity-95 border-zinc-900 hover:border-zinc-700
          shadow-zinc-700 hover:shadow-zinc-700'
          src={images[currentIndex]}
        />

        {!isFirstImage && (
          <ArrowLeftCircle 
            className={`absolute left-4 top-52 cursor-pointer 
            duration-300 rounded-full transition bg-zinc-900
            text-zinc-100 shadow-xl shadow-zinc-900
            ${isFirstImage ? 'opacity-0' : 'opacity-70'}
            ${isFirstImage ? 'hover:opacity-0' : 'hover:opacity-100'}`}
            size={40}
            onClick={previousImage}
          />
        )} 

        {!isLastImage && (
          <ArrowRightCircle 
            className={`absolute right-4 top-52 cursor-pointer 
            duration-300 rounded-full transition bg-zinc-900
            text-zinc-100 shadow-xl shadow-zinc-900
            ${isLastImage ? 'opacity-0 disabled:opacity-0' : 'opacity-70'}
            ${isLastImage ? 'hover:opacity-0' : 'hover:opacity-100'}`}
            size={40}
            onClick={nextImage}
          />
        )}

        <div
          className="absolute bottom-1 flex items-center -space-x-4"
        >
          <Dot 
            className={`
              transition duration-300
              ${isFirstImage ? 'text-white' : 'text-zinc-400'}
            `}
            size={40}
          />
          <Dot 
            className={`
              transition duration-300
              ${isSecondImage ? 'text-white' : 'text-zinc-400'}
            `}
            size={40}
          />
          <Dot 
            className={`
              transition duration-300
              ${isThirdImage ? 'text-white' : 'text-zinc-400'}
            `}
            size={40}
          />
          <Dot 
            className={`
              transition duration-300
              ${isLastImage ? 'text-white' : 'text-zinc-400'}
            `}
            size={40}
          />
        </div>

      </div>
      
      <hr className="my-6" />
    </div>
  )
}

export default AboutUs;