"use client";

import React, { useEffect } from "react";
import Image from "next/image";
import Swiper from "swiper";
import { Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";

import { Fancybox } from "@fancyapps/ui";
import "@fancyapps/ui/dist/fancybox/fancybox.css";

import DrMeenakshiSKher from "@/assets/images/testimonial/Dr_MeenakshiSKher.jpg";
import DrMeenakshiSKherCC from "@/assets/images/testimonial/Dr_MeenakshiSKher_CC.jpg";
import DrChewLing from "@/assets/images/testimonial/Dr_Chew_Ling.jpg";
import DrChewLingCC from "@/assets/images/testimonial/Dr_Chew_Ling_CC.jpg";
import DrChanikaManmotri from "@/assets/images/testimonial/Dr_Chanika_Manmotri.jpg";
import DrChanikaManmotriCC from "@/assets/images/testimonial/Dr_Chanika_Manmotri_CC.jpg";
import DrShubhaniMehta from "@/assets/images/testimonial/Dr_Shubhani_Mehta.jpg";
import DrShubhaniMehtaCC from "@/assets/images/testimonial/Dr_Shubhani_Mehta_CC.jpg";
import DrGunelHasanli from "@/assets/images/testimonial/Dr_Gunel_Hasanli.jpg";
import DrGunelHasanliCC from "@/assets/images/testimonial/Dr_Gunel_Hasanli_CC.jpg";
import styles from "@/components/bioflx/bioflx-banner/BioflxBanner.module.css";

const testimonials = [
  {
    id: 1,
    review:
      "Bioflx Crowns are easy on both the pediatric patient and clinician, requiring minimal numbing and tooth preparation. The fact that they are tooth coloured makes them perfectly acceptable to families who do not want stainless steel crowns.",
    doctorImage: DrMeenakshiSKher,
    caseImage: DrMeenakshiSKherCC,
    name: "Dr. Meenakshi S. Kher",
    designation: "M.D.S, Happy Tooth Clinic For Kids",
    country: "India",
    countryCode: "in",
  },
  {
    id: 2,
    review:
      "The flexibility of Bioflx crowns allows less tissue preparation and faster, convenient placement for young children. So Bioflx crowns are suitable for unfavorable occlusion, cross bite, or confrontation of the anterior teeth. I am satisfied with the healing of the gum tissue after one week.",
    doctorImage: DrChewLing,
    caseImage: DrChewLingCC,
    name: "Dr. Chew Ling",
    designation: "Pediatric Dentistry",
    country: "Vietnam",
    countryCode: "vn",
  },
  {
    id: 3,
    review:
      "After testing the Bioflx prototype crowns, we found that they are very easy to use, and need little chair time (nearly the same as stainless steel crown). At the recall visits, gingival health at the crowns is healthy, and the parents are pleased with the aesthetics of the crowns.",
    doctorImage: DrChanikaManmotri,
    caseImage: DrChanikaManmotriCC,
    name: "Dr. Chanika Manmotri",
    designation: "DDS. MS Diplomat, American Board of Pediatric Dentistry",
    country: "Thailand",
    countryCode: "tl",
  },
  {
    id: 4,
    review:
      "Bioflx crown is certainly a revolution in Pediatric dentistry. These crowns are Super flexible with good handling properties. Highly recommended in an uncooperative child who desires high quality aesthetics.",
    doctorImage: DrShubhaniMehta,
    caseImage: DrShubhaniMehtaCC,
    name: "Dr. Shubhani Mehta",
    designation: "Pediatric Dentist",
    country: "India",
    countryCode: "in",
  },
  {
    id: 5,
    review:
      "Restoration of milk teeth with the help of Bioflx crowns allows you to save temporary teeth until they are completely replaced by permanent ones. Crowns Bio Flx are caps that exactly repeat the anatomy of the tooth. They are very thin, very comfortable and easy to use.",
    doctorImage: DrGunelHasanli,
    caseImage: DrGunelHasanliCC,
    name: "Dr. Gunel Hasanli",
    designation: "Pediatric Dentist",
    country: "India",
    countryCode: "in",
  },
];

const Testimonial = () => {
  useEffect(() => {
    const testimonialSwiper = new Swiper(".testimonialSwiper", {
      modules: [Pagination],
      slidesPerView: 1.05,
      spaceBetween: 20,
      speed: 700,
      slideToClickedSlide: true,

      pagination: {
        el: ".tsPagination",
        clickable: true,
      },

      breakpoints: {
        576: {
          slidesPerView: 1.2,
          spaceBetween: 30,
        },
        992: {
          slidesPerView: 1.3,
          spaceBetween: 30,
        },
        1200: {
          slidesPerView: 1.8,
          spaceBetween: 30,
        },
        1400: {
          slidesPerView: 2,
          spaceBetween: 60,
        },
      },
    });

    return () => {
      testimonialSwiper.destroy(true, true);
    };
  }, []);

  return (
    <section
      className={`${styles.testimSection} sitePadding py-5 overflow-hidden`}
      id="testimonialSection"
    >
      <div className="container-fluid">
        <div className="vstack align-items-center text-center staggerList mb-4">
          <h3 className="sectionHead_sm animateThis slideTop">Testimonials</h3>

          <h2 className="sectionHead fw-bold mb-3 animateThis slideTop">
            Trusted by Pediatric Dentists
          </h2>

          <p className="animateThis fadeIn" style={{ maxWidth: "700px" }}>
            Hear how clinicians are using BioFlx to deliver esthetic posterior
            restorations with a preparation and placement experience that feels
            familiar.
          </p>
        </div>

        <div className="swiper pb-5 testimonialSwiper overflow-visible animateThis slideLeft">
          <div className="swiper-wrapper">
            {testimonials.map((testimonial) => (
              <div className="swiper-slide h-auto" key={testimonial.id}>
                <div className={`${styles.testimWrap} rounded-4`}>
                  <div className="d-flex flex-wrap justify-content-md-between justify-content-center flex-grow-1">
                    <div
                      className={`${styles.testimDetail} col-12 col-md p-xxl-5 p-sm-4 p-3 rounded-4`}
                    >
                      <div className="testimContent mb-4">
                        <p>"{testimonial.review}"</p>
                      </div>

                      <div className="hstack gap-3">
                        <div className={`${styles.docImg} flex-shrink-0`}>
                          <Image
                            src={testimonial.doctorImage}
                            alt={testimonial.name}
                          />
                        </div>

                        <div className={styles.testimAuthor}>
                          <h3 className="taName mb-0">{testimonial.name}</h3>

                          <div className="taDesg">
                            {testimonial.designation}
                          </div>

                          <div className="taLoc">
                            {testimonial.country}{" "}
                            <span
                              className={`fi fi-${testimonial.countryCode}`}
                            ></span>
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className="col-md-5 col-12 p-2 d-flex align-items-center">
                      <div className="vstack justify-content-center align-items-center rounded-3 h-100 bg-white overflow-hidden p-2">
                        <a
                          href={testimonial.caseImage.src}
                          data-fancybox="testimonial-gallery"
                          data-caption={testimonial.name}
                        >
                          <Image
                            src={testimonial.caseImage}
                            alt={`${testimonial.name} BioFlx case`}
                            className={`${styles.csImg} mx-auto d-block`}
                          />
                        </a>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="tsPagination swiper-pagination"></div>
        </div>
      </div>
    </section>
  );
};

export default Testimonial;
