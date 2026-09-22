import React, { useEffect, useRef } from "react";
import Swiper from "swiper";
import "swiper/css";
import { Autoplay } from "swiper/modules";
import styles from "@/components/home/trusted-countries/TrustedCountries.module.css";

const countries = [
  { code: "af", name: "Afghanistan" },
  { code: "ax", name: "Åland Islands" },
  { code: "al", name: "Albania" },
  { code: "dz", name: "Algeria" },
  { code: "as", name: "American Samoa" },
  { code: "ad", name: "Andorra" },
  { code: "ao", name: "Angola" },
  { code: "ai", name: "Anguilla" },
  { code: "aq", name: "Antarctica" },
  { code: "ag", name: "Antigua and Barbuda" },
  { code: "ar", name: "Argentina" },
  { code: "am", name: "Armenia" },
  { code: "aw", name: "Aruba" },
  { code: "au", name: "Australia" },
  { code: "at", name: "Austria" },
  { code: "az", name: "Azerbaijan" },
  { code: "bs", name: "Bahamas" },
  { code: "bh", name: "Bahrain" },
  { code: "bd", name: "Bangladesh" },
  { code: "bb", name: "Barbados" },
  { code: "by", name: "Belarus" },
  { code: "be", name: "Belgium" },
  { code: "bz", name: "Belize" },
  { code: "bj", name: "Benin" },
  { code: "bm", name: "Bermuda" },
  { code: "bt", name: "Bhutan" },
  { code: "bo", name: "Bolivia" },
  { code: "bq", name: "Bonaire, Sint Eustatius and Saba" },
  { code: "ba", name: "Bosnia and Herzegovina" },
  { code: "bw", name: "Botswana" },
  { code: "bv", name: "Bouvet Island" },
  { code: "br", name: "Brazil" },
  { code: "io", name: "British Indian Ocean Territory" },
  { code: "bn", name: "Brunei Darussalam" },
  { code: "bg", name: "Bulgaria" },
  { code: "bf", name: "Burkina Faso" },
  { code: "bi", name: "Burundi" },
  { code: "cv", name: "Cabo Verde" },
  { code: "kh", name: "Cambodia" },
  { code: "cm", name: "Cameroon" },
  { code: "ca", name: "Canada" },
  { code: "ky", name: "Cayman Islands" },
  { code: "cf", name: "Central African Republic" },
  { code: "td", name: "Chad" },
  { code: "cl", name: "Chile" },
  { code: "cn", name: "China" },
  { code: "cx", name: "Christmas Island" },
  { code: "cc", name: "Cocos (Keeling) Islands" },
  { code: "co", name: "Colombia" },
  { code: "km", name: "Comoros" },
  { code: "cd", name: "Congo (Democratic Republic)" },
  { code: "cg", name: "Congo (Republic)" },
  { code: "ck", name: "Cook Islands" },
  { code: "cr", name: "Costa Rica" },
  { code: "ci", name: "Côte d'Ivoire" },
  { code: "hr", name: "Croatia" },
  { code: "cu", name: "Cuba" },
  { code: "cw", name: "Curaçao" },
  { code: "cy", name: "Cyprus" },
  { code: "cz", name: "Czechia" },
  { code: "dk", name: "Denmark" },
  { code: "dj", name: "Djibouti" },
  { code: "dm", name: "Dominica" },
  { code: "do", name: "Dominican Republic" },
  { code: "ec", name: "Ecuador" },
  { code: "eg", name: "Egypt" },
  { code: "sv", name: "El Salvador" },
  { code: "gq", name: "Equatorial Guinea" },
  { code: "er", name: "Eritrea" },
  { code: "ee", name: "Estonia" },
  { code: "sz", name: "Eswatini" },
  { code: "et", name: "Ethiopia" },
  { code: "fk", name: "Falkland Islands" },
  { code: "fo", name: "Faroe Islands" },
  { code: "fj", name: "Fiji" },
  { code: "fi", name: "Finland" },
  { code: "fr", name: "France" },
  { code: "gf", name: "French Guiana" },
  { code: "pf", name: "French Polynesia" },
  { code: "tf", name: "French Southern Territories" },
  { code: "ga", name: "Gabon" },
  { code: "gm", name: "Gambia" },
  { code: "ge", name: "Georgia" },
  { code: "de", name: "Germany" },
  { code: "gh", name: "Ghana" },
  { code: "gi", name: "Gibraltar" },
  { code: "gr", name: "Greece" },
  { code: "gl", name: "Greenland" },
  { code: "gd", name: "Grenada" },
  { code: "gp", name: "Guadeloupe" },
  { code: "gu", name: "Guam" },
];

const CountrySlide = ({ code, name }) => (
  <div className="swiper-slide">
    <div className={styles.countryItem}>
      {" "}
      <span className={`fi fi-${code} fis`}></span> {name}{" "}
    </div>
  </div>
);

const TrustedCountries = () => {
  const sliderRefs = useRef([]);
  const swiperInstances = useRef([]);

  useEffect(() => {
    let destroyed = false;
    const instances = [];

    sliderRefs.current.filter(Boolean).forEach((el) => {
      const instance = new Swiper(el, {
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
      });
      if (destroyed) {
        instance.destroy(true, true);
      } else {
        instances.push(instance);
      }
    });

    swiperInstances.current = instances;

    return () => {
      destroyed = true;
      swiperInstances.current.forEach((instance) =>
        instance?.destroy(true, true),
      );
      swiperInstances.current = [];
    };
  }, []);
  return (
    <section className="py-4 worldSection">
      <div
        className="w-100 py-sm-5 py-4"
        style={{
          background: "url(/images/bgWorldMap.jpg) no-repeat center / auto 90%",
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
          <div
            className={`${styles.countrySlider} swiper w-100 position-relative`}
            dir="rtl"
            ref={(el) => (sliderRefs.current[0] = el)}
          >
            <div className="swiper-wrapper">
              {countries.map((c) => (
                <CountrySlide key={c.code} {...c} />
              ))}
            </div>
          </div>

          <div
            className={`${styles.countrySlider} swiper w-100 position-relative`}
            ref={(el) => (sliderRefs.current[1] = el)}
          >
            <div className="swiper-wrapper">
              {countries.map((c) => (
                <CountrySlide key={c.code} {...c} />
              ))}
            </div>
          </div>

          <div
            className={`${styles.countrySlider} swiper w-100 position-relative`}
            dir="rtl"
            ref={(el) => (sliderRefs.current[2] = el)}
          >
            <div className="swiper-wrapper">
              {countries.map((c) => (
                <CountrySlide key={c.code} {...c} />
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default TrustedCountries;
