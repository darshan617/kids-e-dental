import React, { useEffect, useRef } from "react";
import Swiper from "swiper";
import "swiper/css";
import "swiper/css/navigation";
import styles from "@/components/home/why-choose/WhyChoose.module.css";
import Image from "next/image";
import wcu1 from "@/assets/images/wcu_1.jpg";

const wcuSlides = [
  {
    title: (
      <>
        Reliable Supply & <br /> Global Partnership
      </>
    ),
    text: "Scalable supply capabilities and a collaborative approach supporting dentists, distributors, and partners across international markets.",
    image: wcu1,
  },
  {
    title: (
      <>
        Pediatric <br /> Expertise
      </>
    ),
    text: "Products developed specifically for the unique needs of pediatric dentistry.",
    image: wcu1,
  },
  {
    title: (
      <>
        Comprehensive <br /> Product Portfolio
      </>
    ),
    text: "A growing range of solutions covering multiple pediatric dental procedures, helping professionals access more of what they need from one partner.",
    image: wcu1,
  },
  {
    title: (
      <>
        Innovation in <br /> Pediatric Dentistry
      </>
    ),
    text: "Continuously developing smarter, more effective solutions to address evolving needs in pediatric dental care.",
    image: wcu1,
  },
  {
    title: (
      <>
        Reliable Supply & <br /> Global Partnership
      </>
    ),
    text: "Scalable supply capabilities and a collaborative approach supporting dentists, distributors, and partners across international markets.",
    image: wcu1,
  },
  {
    title: (
      <>
        Pediatric <br /> Expertise
      </>
    ),
    text: "Products developed specifically for the unique needs of pediatric dentistry.",
    image: wcu1,
  },
  {
    title: (
      <>
        Comprehensive <br /> Product Portfolio
      </>
    ),
    text: "A growing range of solutions covering multiple pediatric dental procedures, helping professionals access more of what they need from one partner.",
    image: wcu1,
  },
  {
    title: (
      <>
        Innovation in <br /> Pediatric Dentistry
      </>
    ),
    text: "Continuously developing smarter, more effective solutions to address evolving needs in pediatric dental care.",
    image: wcu1,
  },
];

const WhyChoose = () => {
  const wcuSliderRef = useRef(null);
  const swiperInstance = useRef(null);

  useEffect(() => {
    if (!wcuSliderRef.current) return;

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
  }, []);

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
                {wcuSlides.map((slide, index) => (
                  <div className="swiper-slide h-auto" key={index}>
                    <div className={`${styles.wcuBox} p-2 h-100 rounded-4 vstack`}>
                      <div className="p-2 p-md-3">
                        <h3 className={styles.wcuTitle}>{slide.title}</h3>
                        <p className="wcu_txt mb-0 lh-base">{slide.text}</p>
                      </div>
                      <div className="ratio ratio-4x3 w-100 rounded-3 overflow-hidden mt-auto">
                        <Image
                          src={slide.image}
                          alt=""
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
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="16"
                  height="16"
                  fill="currentColor"
                  viewBox="0 0 16 16"
                >
                  <path d="M11.354 1.646a.5.5 0 0 1 0 .708L5.707 8l5.647 5.646a.5.5 0 0 1-.708.708l-6-6a.5.5 0 0 1 0-.708l6-6a.5.5 0 0 1 .708 0" />
                </svg>
              </div>
              <div className="swiperNaviBtn wcuNext">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="16"
                  height="16"
                  fill="currentColor"
                  viewBox="0 0 16 16"
                >
                  <path d="M4.646 1.646a.5.5 0 0 1 .708 0l6 6a.5.5 0 0 1 0 .708l-6 6a.5.5 0 0 1-.708-.708L10.293 8 4.646 2.354a.5.5 0 0 1 0-.708" />
                </svg>
              </div>
            </div>
          </div>
          <div className="col-12 col-md-auto order-md-2 align-self-center text-center animateThis fadeIn">
            <a href="" className="ctaBtn white arw">
              Explore More
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};

export default WhyChoose;