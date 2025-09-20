'use client';

import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import { Autoplay } from 'swiper/modules';
import Image from 'next/image';


export type CategoryType = {
  _id: string;
  name: string;
  image: string;

};

interface CategorySwiperProps {
  data: CategoryType[];
}

export default function CategorySwiper({ data }: CategorySwiperProps) {


  return (
    <div className="mx-auto w-[80%] md:w-[80%] sm:w-[50%]">
      <h1 className='text-2xl font-bold text-sky-500 my-4'> category slider</h1>
      <Swiper
        spaceBetween={0}
        slidesPerView={7}
        modules={[Autoplay]}
        autoplay={{ delay: 2000 }}
        loop
        breakpoints={{
          640: {
            slidesPerView: 3,
          },
          768: {
            slidesPerView: 4,
          },
          1024: {
            slidesPerView: 6,
          },
          1280: {
            slidesPerView: 7,
          },
        }}
      >

        {data.map((category: CategoryType) => (
          <SwiperSlide key={category._id}>
            <Image
              src={category.image}
              alt={category.name}
              width={200}
              height={200}
              className="object-cover w-full h-[150px]"
            />
            <p className="mt-2 text-center text-sm font-medium">{category.name}</p>

            
          
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
}
