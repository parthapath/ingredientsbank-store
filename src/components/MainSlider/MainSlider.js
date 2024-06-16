"use client";
import React, { useState, useEffect } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Navigation, Pagination } from "swiper/modules";
import Image from "next/image";

import { api_server } from "@/config";

import "./MainSlider.css";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

const MainSlider = () => {
  const [slides, setSlides] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(`${api_server}/slides`);
        const data = await response.json();
        setSlides(data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  return (
    <div className="container">
      {slides ? (
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
          {slides.map((item, i) => {
            return (
              <SwiperSlide key={i}>
                <Image
                  src={item.image}
                  width={1460}
                  height={440}
                  alt={item.title}
                  loading="lazy"
                />
              </SwiperSlide>
            );
          })}
        </Swiper>
      ) : null}
    </div>
  );
};

export default MainSlider;
