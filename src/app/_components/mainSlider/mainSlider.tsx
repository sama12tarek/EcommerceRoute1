'use client';

import React from 'react';
import Image from 'next/image';
import img1 from '../../../../public/images/slider-image-1.jpeg';
import img2 from '../../../../public/images/slider-image-2.jpeg';
import img3 from '../../../../public/images/slider-image-3.jpeg';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import { Autoplay } from 'swiper/modules';

const MainSlider = () => {
  return (
    <div className="w-[90%] mx-auto my-4 p-4 flex flex-row md:flex-column gap-3">
      <div className="w-full md:w-3/4 ">
        <Swiper
          spaceBetween={0}
          slidesPerView={1}
          modules={[Autoplay]}
          autoplay={{ delay: 2000 }}
          loop
        >
          <SwiperSlide>
            <Image
              src={img1}
              alt="Slider Image 1"
              className="w-full h-[200px] md:h-[400px] object-cover object-center"
            />
          </SwiperSlide>
          <SwiperSlide>
            <Image
              src={img2}
              alt="Slider Image 2"
              className="w-full h-[200px] md:h-[400px] object-cover object-center"
            />
          </SwiperSlide>
          <SwiperSlide>
            <Image
              src={img3}
              alt="Slider Image 3"
              className="w-full h-[200px] md:h-[400px] object-cover object-center"
            />
          </SwiperSlide>
        </Swiper>
      </div>
      <div className="w-1/4">
        <Image
          src={img2}
          alt="Sidebar Image 1"
          className="w-full h-[200px] md:h-[400px] object-cover object-center"
        />
        <Image
          src={img3}
          alt="Sidebar Image 2"
          className="w-full h-[200px] md:h-[400px] object-cover object-center"
        />
      </div>
    </div>
  );
};

export default MainSlider;
