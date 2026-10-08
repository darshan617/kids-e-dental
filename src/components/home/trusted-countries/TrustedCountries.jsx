import React, { useEffect, useRef } from "react";
import Swiper from "swiper";
import "swiper/css";
import { Autoplay } from "swiper/modules";
import bgWorldMap from "@/assets/images/bgWorldMap.jpg";
import styles from "@/components/home/trusted-countries/TrustedCountries.module.css";

const COUNTRY_ROWS = [
  {
    id: "row1",
    dir: "rtl",
    countries: [
      { code: "in", name: "India" },
      { code: "na", name: "Namibia" },
      { code: "tw", name: "Taiwan" },
      { code: "kw", name: "Kuwait" },
      { code: "ly", name: "Libya" },
      { code: "iq", name: "Iraq" },
      { code: "az", name: "Azerbaijan" },
      { code: "bd", name: "Bangladesh" },
      { code: "za", name: "South Africa" },
      { code: "ph", name: "Philippines" },
      { code: "id", name: "Indonesia" },
      { code: "hk", name: "Hong Kong" },
    ],
  },
  {
    id: "row2",
    dir: "ltr",
    countries: [
      { code: "eg", name: "Egypt" },
      { code: "ke", name: "Kenya" },
      { code: "th", name: "Thailand" },
      { code: "np", name: "Nepal" },
      { code: "vn", name: "Vietnam" },
      { code: "ae", name: "United Arab Emirates" },
      { code: "pe", name: "Peru" },
      { code: "mr", name: "Mauritania" },
      { code: "ye", name: "Yemen" },
      { code: "zw", name: "Zimbabwe" },
      { code: "jo", name: "Jordan" },
      { code: "pa", name: "Panama" },
    ],
  },
  {
    id: "row3",
    dir: "rtl",
    countries: [
      { code: "lb", name: "Lebanon" },
      { code: "om", name: "Oman" },
      { code: "tn", name: "Tunisia" },
      { code: "ma", name: "Morocco" },
      { code: "qa", name: "Qatar" },
      { code: "sy", name: "Syria" },
      { code: "md", name: "Moldova" },
      { code: "sa", name: "Saudi Arabia" },
      { code: "kz", name: "Kazakhstan" },
      { code: "gt", name: "Guatemala" },
      { code: "sg", name: "Singapore" },
      { code: "al", name: "Albania" },
    ],
  },
];

const CountrySlide = ({ code, name }) => (
  <div className="swiper-slide">
    <div className={styles.countryItem}>
      <span className={`fi fis fi-${code}`}></span> {name}
    </div>
  </div>
);

const TrustedCountries = () => {
  const sliderRefs = useRef([]);

  useEffect(() => {
    const instances = sliderRefs.current.filter(Boolean).map(
      (el) =>
        new Swiper(el, {
          modules: [Autoplay],
          slidesPerView: "auto",
          spaceBetween: 10,
          speed: 6000,
          loop: true,
          grabCursor: false,
          allowTouchMove: false,
          autoplay: { delay: 0, disableOnInteraction: false },
          breakpoints: {
            576: { spaceBetween: 30 },
            768: { spaceBetween: 50 },
          },
        })
    );

    return () => {
      instances.forEach((instance) => instance.destroy(true, true));
    };
  }, []);

  return (
    <section className="py-4 worldSection">
      <div
        className="w-100 py-sm-5 py-4"
        style={{
          background: `url(${bgWorldMap.src}) no-repeat center / auto 90%`,
        }}
      >
        <div className="text-center mb-5">
          <h3 className="sectionHead_sm animateThis slideTop">
            Supply worldwide
          </h3>
          <h2 className="sectionHead fw-bold animateThis slideTop">
            Trusted Across 40+ Countries
          </h2>
        </div>

        <div className="vstack w-100 gap-4 animateThis fadeIn">
          {COUNTRY_ROWS.map((row, index) => (
            <div
              key={row.id}
              className={`${styles.countrySlider} swiper w-100 position-relative`}
              dir={row.dir}
              ref={(el) => (sliderRefs.current[index] = el)}
            >
              <div className="swiper-wrapper">
                {row.countries.map((country) => (
                  <CountrySlide key={country.code} {...country} />
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default TrustedCountries;