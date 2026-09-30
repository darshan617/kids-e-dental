import React, { useEffect, useRef } from "react";
import Swiper from "swiper";
import "swiper/css";
import "swiper/css/navigation";
import styles from "@/components/home/why-choose/WhyChoose.module.css";
import Image from "next/image";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";
import {useGetHomeDataQuery } from "@/redux/apis/homeApi";


const WhyChoose = () => {
  const { data, isLoading } = useGetHomeDataQuery();
  const whyChooseUsData = data?.data?.why_choose_us || [];
  
  const wcuSliderRef = useRef(null);
  const swiperInstance = useRef(null);

  useEffect(() => {
    if (!wcuSliderRef.current || whyChooseUsData.length === 0) return;

    if (swiperInstance.current) {
      swiperInstance.current.destroy(true, true);
    }

    swiperInstance.current = new Swiper(wcuSliderRef.current, {
      slidesPerView: 1.3,
      spaceBetween: 5,
      speed: 1000,
      navigation: {
        nextEl: ".wcuNext",
        prevEl: ".wcuPrev",
      },
      breakpoints: {
        500: { slidesPerView: 2, spaceBetween: 15 },
        992: { slidesPerView: 3, spaceBetween: 20 },
        1400: { slidesPerView: 4, spaceBetween: 30 },
      },
    });

    return () => {
      if (swiperInstance.current) {
        swiperInstance.current.destroy(true, true);
        swiperInstance.current = null;
      }
    };
  }, [whyChooseUsData]);

  if (isLoading) {
    return <div className="text-center py-5">Loading...</div>;
  }

  return (
    <section className="sitePadding py-sm-5 py-4 bgPrimary">
      <div className="container-fluid py-4">
        <div className="row g-sm-4 g-3 justify-content-between">
          <div className="col-md-auto order-md-1 animateThis slideRight">
            <h3 className="sectionHead_sm">Why Choose Us</h3>
            <h2 className="sectionHead fw-bold">Why Partner With Kids-e-Dental?</h2>
          </div>
          
          <div className="col-12 order-md-3 position-relative animateThis slideLeft">
            <div className={`${styles.wcuSlider} swiper`} ref={wcuSliderRef}>
              <div className="swiper-wrapper align-content-stretch">
                {whyChooseUsData?.map((slide) => (
                  <div className="swiper-slide h-auto" key={slide?.id}>
                    <div className={`${styles.wcuBox} p-2 h-100 rounded-4 vstack`}>
                      <div className="p-2 p-md-3">
                        <h3 className={styles.wcuTitle}>{slide?.title}</h3>
                        <p className="wcu_txt mb-0 lh-base">{slide?.description}</p>
                      </div>
                      <div className="ratio ratio-4x3 w-100 rounded-3 overflow-hidden mt-auto">
                        <Image
                          src={slide?.image}
                          alt={slide?.title || "Why Choose Us Image"}
                          fill
                          sizes="(max-width: 768px) 100vw, 33vw"
                          className="wcu_img object-fit-cover"
                        />
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="swiperNaviBtns d-none d-md-flex justify-content-between gap-3">
              <div className="swiperNaviBtn wcuPrev">
                <FaChevronLeft />
              </div>
              <div className="swiperNaviBtn wcuNext">
                <FaChevronRight />
              </div>
            </div>
          </div>

          <div className="col-12 col-md-auto order-md-2 align-self-center text-center animateThis fadeIn">
            <a href="#" className="ctaBtn white arw">
              Explore More
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};

export default WhyChoose;