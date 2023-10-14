'use client';

import TestimonialCard from "@/components/testimonial-card";

import person01 from '@/public/images/testimonials/person01.png';
import person02 from '@/public/images/testimonials/person02.png';
import person03 from '@/public/images/testimonials/person03.png';
import person04 from '@/public/images/testimonials/person04.png';

const Testimonials = () => {
  return (
    <div
      className="px-10"
    >
      <h1
        className="text-3xl font-bold pb-6"
      >
        Testimonials
      </h1>

      <div
        className="grid gap-4 grid-cols-1 sm:grid-cols-2 md:grid-cols-3
        lg:grid-cols-4"
      >
        <TestimonialCard 
          reviewerName="John Walker"
          reviewerTitle="CEO of Hook"
          review="Hands down the best Coffee in Town! 
          I always recommend it to my clients."

          reviewerImage={person01}
        />

        <TestimonialCard 
          reviewerName="Olivia Goldberg"
          reviewerTitle="Professional Actress"
          review="Sunset is my favorite place to relax after a
          shooting session. Enjoying the beautiful views of the Sea
          and the peaceful sound of the waves with a hot cup of
          Coffee... there's just nothing like it."

          reviewerImage={person02}
        />

        <TestimonialCard 
          reviewerName="Richard Moore"
          reviewerTitle="Renowned Chef"
          review="With its delicate yet complex cuisine and its
          unique colorful array of vastly diverse Coffee from 
          around the world, Sunset never fails to deliver! It is
          a magnificent display of passion and talent."

          reviewerImage={person03}
        />

        <TestimonialCard 
          reviewerName="Amelia Amber"
          reviewerTitle="Model"
          review="Not a single day goes by in which I don't long for
          the comforting warmness and captivating aroma of Sunset.
          It has been ever since my little hidden treasure which I'll
          never let go of."

          reviewerImage={person04}
        />
      </div>

      <hr 
        className="mt-4"
      />
    </div>
  )
}

export default Testimonials;