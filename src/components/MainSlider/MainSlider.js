"use client";
import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Navigation, Pagination } from "swiper/modules";

import "./MainSlider.css";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

const MainSlider = () => {
  return (
    <div className="container">
      <Swiper
        navigation={true}
        autoplay={{
          delay: 2500,
          disableOnInteraction: false,
        }}
        pagination={{
          clickable: true,
        }}
        modules={[Autoplay, Navigation, Pagination]}
        className="SwiperSlider"
      >
        <SwiperSlide>
          <img src="assets/imgs/slider/slider-3.png" />
        </SwiperSlide>
        <SwiperSlide>
          <img src="assets/imgs/slider/slider-4.png" />
        </SwiperSlide>
        <SwiperSlide>
          <img src="assets/imgs/slider/slider-1.png" />
        </SwiperSlide>
        <SwiperSlide>
          <img src="assets/imgs/slider/slider-2.png" />
        </SwiperSlide>
      </Swiper>
    </div>
  );
};

export default MainSlider;
