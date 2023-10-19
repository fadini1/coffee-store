'use client';

import Image, { StaticImageData } from "next/image";

import DummyTestImage from '@/public/images/shop/coffee-shop-01.png';
import { Star } from "lucide-react";
import { Image as image2 } from "@/types";

interface TestimonialCardProps {
  reviewerName: string;
  reviewerTitle: string;
  review: string;

  reviewerImage: StaticImageData;
}

const TestimonialCard: React.FC<TestimonialCardProps> = ({
  reviewerName,
  reviewerTitle,
  review,
  reviewerImage
}) => {
  return (
    <div
      className="dark:bg-zinc-900 bg-zinc-100 p-6 rounded-lg flex flex-col 
      items-center align-center dark:hover:bg-zinc-800 transition
      hover:bg-zinc-200 duration-300 group"
    >
      <div
        className="border-2 rounded-full dark:hover:border-zinc-100
        dark:border-zinc-400 transition shadow-md shadow-zinc-700
        hover:shadow-zinc-900 duration-200 dark:shadow-zinc-400
        dark:hover:shadow-zinc-100 border-zinc-700 ease-in
        hover:border-zinc-900"
      >
        <Image 
          alt="TestimonialPerson"
          className="h-28 w-28 rounded-full object-cover object-center
          transition dark:opacity-90 hover:dark:opacity-100 duration-200
          opacity-95 hover:opacity-100"
          src={reviewerImage}
        />
      </div>

      <h1
        className="pt-2 -mb-1 text-2xl font-semibold"
      >
        {reviewerName}
      </h1>
      
      <h3
        className="pb-1 dark:text-zinc-300 font-bold text-sm"
      >
        {reviewerTitle}
      </h3>

      <div
        className="flex gap-1 pb-4"
      >
        <Star 
          className="dark:fill-white fill-black"
          size={18}
        />
        <Star 
          className="dark:fill-white fill-black"
          size={18}
        />
        <Star 
          className="dark:fill-white fill-black"
          size={18}
        />
        <Star 
          className="dark:fill-white fill-black"
          size={18}
        />
        <Star 
          className="dark:fill-white fill-black"
          size={18}
        />
      </div>

      <p
        className="text-center px-6 font-medium"
      >
        &quot;{review}&quot;
      </p>    
    </div>
  )
}

export default TestimonialCard;