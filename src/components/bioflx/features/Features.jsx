"use client";

import Image from "next/image";
import React from "react";
import styles from "@/components/bioflx/bioflx-banner/BioflxBanner.module.css";
import FlexiFit2 from "@/assets/images/bioflx/FlexiFit2.gif";
import bioflxDurable from "@/assets/images/bioflx/bioflx_durable.gif";
import EstheticFam from "@/assets/images/bioflx/EstheticFam.png";
import RoughCementingsurface from "@/assets/images/bioflx/RoughCementingsurface.png";
import bioflxCrownAnimation from "@/assets/images/bioflx/bioflx-crown-animation_vf.gif";

const features = [
  {
    title: "Flex Fit",
    image: FlexiFit2,
    text: "Strong yet flexible for easy placement and a snug, active fit.",
  },
  {
    title: "Durable",
    image: bioflxDurable,
    text: "Wear resistance similar to or better than traditional SSCs.",
  },
  {
    title: "Esthetic",
    image: EstheticFam,
    text: "Metal-free, tooth-colored crowns designed to support natural-looking pediatric restorations.",
  },
  {
    title: "Cementation",
    image: RoughCementingsurface,
    text: "Sandblasted intaglio surface supports retention with self-setting RMGI and GI cements.",
  },
  {
    title: "Narrow",
    image: bioflxCrownAnimation,
    text: "Available in narrow first primary molar sizes for clinical situations where space is limited.",
  },
  {
    title: "Chair Time Efficiency",
    image: RoughCementingsurface,
    text: "Preparation and handling properties are designed to feel familiar to clinicians experienced with SSCs.",
  },
];

const Features = () => {
  return (
    <section
      className={`${styles.featureSection} sitePadding py-5 animateThis curtain`}
      id="featureSection"
    >
      <div className="container-fluid py-lg-4">
        <div className="text-center vstack align-items-center mb-3 staggerList featMainWrap">
          <h3 className="sectionHead_sm animateThis slideTop">Features</h3>
          <h2 className="sectionHead fw-bold mb-3 animateThis slideTop">
            The next generation of pediatric esthetic crowns.
          </h2>
          <p className="animateThis fadeIn">
            Ideal full coverage restoration and a dream crown of every pediatric
            dentist.
          </p>
        </div>

        <div className="row justify-content-between">
          <div className="col-xxl-5 col-lg-6 mb-4 mb-lg-0">
            <div className={`${styles.featWrapper} mx-auto bg-black rounded-4`}>
              <video
                src="/video/bioflx_video.mp4"
                muted
                autoPlay
                loop
                playsInline
                className={`${styles.featMainVideo} mx-auto rounded-4`}
              />
            </div>
          </div>

          <div className="col-lg-6">
            <div
              className={`${styles.featureList} row row-cols-xl-2 row-cols-lg-1 row-cols-sm-2 row-cols-1 g-3`}
            >
              {features.map((feature) => (
                <div className="col animateThis fadeGrow" key={feature.title}>
                  <div
                    className={`${styles.featItem} hstack align-items-center`}
                  >
                    <div className="col-4 d-flex justify-content-center align-items-center">
                      <div className={`${styles.ftIcImg} p-2 rounded-circle`}>
                        <Image
                          src={feature.image}
                          alt=""
                          width={500}
                          height={300}
                          unoptimized
                          className="w-100 h-auto"
                        />
                      </div>
                    </div>
                    <div className="col p-3">
                      <h2 className={`${styles.featTitle} mb-2`}>
                        {feature.title}
                      </h2>
                      <p>{feature.text}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Features;