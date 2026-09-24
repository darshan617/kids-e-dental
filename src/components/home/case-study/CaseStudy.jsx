"use client";

import Image from "next/image";
import React, { useEffect, useRef } from "react";
import Swiper from "swiper/bundle";
import "swiper/css/bundle";
import csImg from "@/assets/images/csImg.jpg";
import distributorImg from "@/assets/images/distributorImg.png";
import styles from "@/components/home/case-study/CaseStudy.module.css";

const slides = [
  {
    title: "Kids-e-Crown®",
    subtitle: "Reliable Pediatric Crown Solutions",
    product: "Kids-e-Crown®",
    application: "Pediatric Crown Restoration",
    benefit: "Durable & child-friendly solution",
    img: csImg,
  },
  {
    title: "Kids-e-Crown®",
    subtitle: "Reliable Pediatric Crown Solutions",
    product: "Kids-e-Crown®",
    application: "Pediatric Crown Restoration",
    benefit: "Durable & child-friendly solution",
    img: csImg,
  },
  {
    title: "Kids-e-Crown®",
    subtitle: "Reliable Pediatric Crown Solutions",
    product: "Kids-e-Crown®",
    application: "Pediatric Crown Restoration",
    benefit: "Durable & child-friendly solution",
    img: csImg,
  },
  {
    title: "Kids-e-Crown®",
    subtitle: "Reliable Pediatric Crown Solutions",
    product: "Kids-e-Crown®",
    application: "Pediatric Crown Restoration",
    benefit: "Durable & child-friendly solution",
    img: csImg,
  },
];

const CaseStudy = () => {
  useEffect(() => {
    const csSlider = new Swiper(".csSlider", {
      slidesPerView: 1.1,
      spaceBetween: 20,
      speed: 1000,
      slideToClickedSlide: true,
      pagination: { el: ".csPagination", clickable: true },
      breakpoints: {
        576: { slidesPerView: 1.2, spaceBetween: 30 },
        768: { slidesPerView: 1.5, spaceBetween: 30 },
        992: { slidesPerView: 2, spaceBetween: 30 },
        1400: { slidesPerView: 2.4, spaceBetween: 30 },
      },
    });

    return () => {
      csSlider.destroy(true, true);
    };
  }, []);

  const distributorRef = useRef(null);
  const distributorGradRef = useRef(null);

  const handleMouseMove = (e) => {
    const distributor = distributorRef.current;
    const distributorGrad = distributorGradRef.current;

    if (!distributor || !distributorGrad) return;

    const rect = distributor.getBoundingClientRect();

    const x = Math.floor(e.clientX - rect.left);
    const y = Math.floor(e.clientY - rect.top);

    distributorGrad.style.setProperty("--x", `${x}px`);
    distributorGrad.style.setProperty("--y", `${y}px`);
  };

  return (
    <>
      <section className="sitePadding py-5">
        <div className="container-fluid">
          <div className="row g-sm-4 g-3 justify-content-between">
            <div className="col-md-auto order-md-1 animateThis slideRight">
              <h3 className="sectionHead_sm">Case Study</h3>
              <h2 className="sectionHead fw-bold">Products in Practice</h2>
              <p>
                Discover how our pediatric dental solutions support better
                clinical care
              </p>
            </div>
            <div className="col-12 order-md-3 position-relative animateThis slideLeft">
              <div className="swiper csSlider overflow-visible pb-sm-5 pb-4">
                <div className="swiper-wrapper">
                  {slides.map((slide, index) => (
                    <div className="swiper-slide" key={index}>
                      <div
                        className={`${styles.csItem} d-flex flex-wrap align-items-center p-lg-4 p-sm-3 p-2 gap-3 gap-sm-0 rounded-4 order-sm-last`}
                      >
                        <div className="csImgbox col-sm-4 col-12 rounded-3 overflow-hidden d-sm-flex">
                          <Image
                            src={slide.img}
                            alt=""
                            className={styles.csImg}
                          />
                        </div>
                        <div className="csContent col-sm-8 order-sm-first">
                          <h3 className={`${styles.csTitle} fw-semibold`}>
                            {slide.title}
                          </h3>
                          <h4 className={styles.csSubtitle}>
                            {slide.subtitle}
                          </h4>
                          <ul className="csList my-sm-4 my-3">
                            <li>
                              <strong>Product :</strong> {slide.product}
                            </li>
                            <li>
                              <strong>Application :</strong> {slide.application}
                            </li>
                            <li>
                              <strong>Key Benefit :</strong> {slide.benefit}
                            </li>
                          </ul>
                          <a href="" className={styles.csBtn}>
                            Read More
                          </a>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>

                <div className="swiper-pagination csPagination d-none d-sm-block"></div>
              </div>
            </div>
            <div className="col-12 col-md-auto order-md-2 align-self-center text-center animateThis fadeIn">
              <a href="" className="ctaBtn arw">
                Explore More
              </a>
            </div>
          </div>
        </div>
      </section>
      <section
        ref={distributorRef}
        onMouseMove={handleMouseMove}
        className="sitePadding py-md-5 py-4 bgPrimary position-relative distributor"
      >
        <div ref={distributorGradRef} className={styles.distributorGrad}>
          <span></span>
          <span></span>
        </div>

        <div className="container-fluid position-relative z-2">
          <div className="row align-items-center justify-content-between">
            <div className="col">
              <div className="vstack gap-md-4 gap-3">
                <h2 className="sectionHead fw-bold">
                  Become A
                  <br />
                  <span style={{ zoom: 1.2 }}>Distributor</span>
                </h2>

                <h3 className="sectionHead_sm fw-normal">
                  <strong>Partner with Kids-e-Dental.</strong>
                  <br />
                  Grow a brand trusted by dentists worldwide.
                </h3>

                <div>
                  <a href="" className="ctaBtn white arw">
                    Join our Network
                  </a>
                </div>
              </div>
            </div>

            <div className="col-md col-lg-7 px-0 align-self-end">
              <Image src={distributorImg} alt="" className="w-100 h-auto" />
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default CaseStudy;
