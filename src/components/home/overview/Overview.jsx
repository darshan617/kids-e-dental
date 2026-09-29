import Image from "next/image";
import React from "react";
import aboutMascot from "@/assets/images/aboutMascot.png";
import styles from "@/components/home/overview/Overview.module.css";

const Overview = () => {
  const statsData = [
    {
      id: 1,
      target: "98",
      suffix: "%",
      label: "Dentist Satisfaction",
    },
    {
      id: 2,
      target: "2",
      suffix: "M+",
      label: "Happy Kids",
    },
    {
      id: "spacer",
      isSpacer: true,
    },
    {
      id: 3,
      target: "16",
      suffix: "+",
      label: "Products Developed",
    },
    {
      id: 4,
      target: "40",
      suffix: "+",
      label: "Countries Served",
    },
  ];

  return (
    <section
      className={`${styles.aboutSection} pt-5 bgPrimary sitePadding position-relative overflow-hidden`}
    >
      <div className="container-fluid position-relative z-1">
        <div className="text-center mb-sm-5 mb-3 vstack align-items-center staggerList">
          <h3 className="sectionHead_sm animateThis slideTop">
            Company Overview
          </h3>
          <h2 className="sectionHead fw-bold mb-4 animateThis slideTop">
            Innovating Pediatric Dentistry,{" "}
            <span className="textPrimary">One Smile at a Time.</span>
          </h2>
          <p
            className={`${styles.aboutText} text-secondary lh-base animateThis fadeIn`}
            style={{ maxWidth: "1100px" }}
          >
            We are a dedicated team committed to delivering high-quality dental
            products for children.{" "}
            <strong className="text-dark">
              Founded in 2017 by Dr. Mukul Jain, a Pediatric & Preventive
              Dentist,
            </strong>{" "}
            Kids-e-Dental LLP aims to transform pediatric dentistry through
            innovation and excellence in manufacturing.
          </p>
        </div>

        <div className="row g-4 g-lg-0 mb-4 mb-md-0 text-center align-items-start">
          {statsData.map((stat) =>
            stat.isSpacer ? (
              <div key={stat.id} className="col d-none d-xl-block"></div>
            ) : (
              <div key={stat.id} className={`${styles.statBox} col-lg col-6`}>
                <div className={`${styles.statNo}`}>
                  {" "}
                  <span className="counter" data-target={stat.target}>
                    {stat.target}
                  </span>
                  {stat.suffix}
                </div>
                <div className={`${styles.statHead} animateThis curtain`}>
                  {stat.label}
                </div>
              </div>
            ),
          )}
        </div>

        <div className={`${styles.aboutMascotBox} row`}>
          <div className="col-auto col-sm d-flex align-items-end justify-content-end">
            <div className={styles.aboutCircle}>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                lang="en"
                viewBox="0 0 500 500"
                className={styles.cirText}
              >
                <title>9+ Years of Experience</title>
                <defs>
                  <path
                    id="textcircle"
                    d="M250,400 a150,150 0 0,1 0,-300a150,150 0 0,1 0,300Z"
                    transform="scale(1.2)"
                    transformOrigin="50% 50%"
                  ></path>
                </defs>
                <g className={styles.textcircle}>
                  <text>
                    <textPath href="#textcircle" textLength="1100">
                      Years of Experience • Years of Experience •
                    </textPath>
                  </text>
                </g>
              </svg>
              <div
                className={`${styles.inCircle} d-flex justify-content-center align-items-center`}
              >
                9+
              </div>
            </div>
          </div>
          <div className="col-xxl-3 col-xl-4 col-lg-5 col-md-6 col-sm-5 col">
            <Image
              src={aboutMascot}
              alt=""
              className="mx-auto mw-100 d-block abtMascotImg animateThis fadeGrow h-auto"
            />
          </div>
          <div className="col d-none d-sm-block"></div>
        </div>
      </div>
    </section>
  );
};

export default Overview;
