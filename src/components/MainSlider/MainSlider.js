"use client";
import React, { useState, useEffect } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Navigation, Pagination } from "swiper/modules";
import Image from "next/image";
import axios from "../../axios";
import { useErrorBoundary, ErrorBoundary } from "react-error-boundary";

import "./MainSlider.css";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

const Slides = () => {
  const [slides, setSlides] = useState([]);

  const { showBoundary } = useErrorBoundary();

  useEffect(() => {
    const fetchData = async () => {
      await axios
        .get("/slides")
        .then((response) => {
          setSlides(response.data);
        })
        .catch(() => {
          showBoundary("Failed to fetch slides");
        });
    };

    fetchData();
  }, []);

  return (
    <div>
      {slides.length ? (
        <Swiper
          navigation={true}
          centeredSlides={true}
          centerInsufficientSlides={true}
          autoplay={{
            delay: 5000,
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
                <img src={item.image} alt={item.title} loading="lazy" />
              </SwiperSlide>
            );
          })}
        </Swiper>
      ) : null}
    </div>
  );
};

const MainSlider = () => {
  return (
    <ErrorBoundary>
      <Slides />
    </ErrorBoundary>
  );
};

export default MainSlider;
