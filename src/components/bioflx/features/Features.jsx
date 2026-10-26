"use client";

import Image from "next/image";
import React from "react";
import styles from "@/components/bioflx/bioflx-banner/BioflxBanner.module.css";
import FlexiFit2 from "@/assets/images/bioflx/FlexiFit2.gif";
import EstheticFam from "@/assets/images/bioflx/EstheticFam.png";
import durable from "@/assets/images/bioflx/durable.gif";
import RoughCementingsurface from "@/assets/images/bioflx/RoughCementingsurface.png";

const features = [
  {
    title: "Flex Fit",
    iconViewBox: "0 0 512 512",
    iconPaths: [
      "m0 0h64v512h-64z",
      "m137.969 0c-24.622 170.097-24.622 341.903 0 512h64c-24.622-170.097-24.622-341.902 0-512z",
      "m349.937 0h-64c-62.577 166.104-62.576 345.897 0 512h64c-62.577-166.103-62.578-345.896 0-512z",
      "m512 288-.001-64h-80.995v-32h-22.374l-63.999 64 64 64h22.373v-32z",
    ],
    image: FlexiFit2,
    details: [
      {
        heading: "Snug/ Active Fit",
        text: "Distinctively flexible and versatile nature for easy placement and a snug/ active fit",
      },
      {
        heading: "Chair Time",
        text: "Tooth preparation and handling properties very similar to an SSC, saving valuable chair time",
      },
      {
        heading: "Not Recommended",
        text: "Bioflx is NOT recommended for the Hall Technique, bruxism or manipulation by crimping",
      },
    ],
  },
  {
    title: "Esthetic",
    iconViewBox: "0 0 128 128",
    iconPaths: [
      "m92.889 38.055c-6.34-10.88-21.34-11.34-31.27-6.47a16.247 16.247 0 0 1 -3.891 1.335 2 2 0 0 0 -.5 3.779 2.816 2.816 0 0 0 .435.146 1.592 1.592 0 0 1 1.363 1.514 1.5 1.5 0 0 1 -1.5 1.476h-.15c-3.11-.31-4.576-2.372-6-4.37a11.157 11.157 0 0 0 -4.13-3.88c-9.815-5.116-24.94-4.41-31.28 6.47-8.31 14.27 0 35.02 8.25 49.68s5.37 39.73 17.09 37.76c8.56-1.45 3.97-41.43 13.12-41.43s4.57 39.98 13.13 41.43c11.72 1.97 8.85-23.11 17.09-37.76s16.563-35.41 8.243-49.68zm-8.322 8.756-2.448 1.339a5.531 5.531 0 0 0 -2.2 2.2l-1.339 2.45a.714.714 0 0 1 -1.253 0l-1.339-2.45a5.535 5.535 0 0 0 -2.2-2.2l-2.448-1.339a.714.714 0 0 1 0-1.253l2.448-1.339a5.535 5.535 0 0 0 2.2-2.2l1.339-2.448a.714.714 0 0 1 1.253 0l1.339 2.448a5.531 5.531 0 0 0 2.2 2.2l2.448 1.339a.714.714 0 0 1 0 1.253z",
      "m93.99 2.787-1.906 3.485a7.88 7.88 0 0 1 -3.131 3.128l-3.486 1.906a1.018 1.018 0 0 0 0 1.785l3.486 1.909a7.886 7.886 0 0 1 3.131 3.131l1.906 3.485a1.017 1.017 0 0 0 1.785 0l1.906-3.485a7.88 7.88 0 0 1 3.131-3.131l3.485-1.906a1.017 1.017 0 0 0 0-1.785l-3.485-1.909a7.874 7.874 0 0 1 -3.131-3.131l-1.906-3.482a1.017 1.017 0 0 0 -1.785 0z",
      "m110.606 33.619-1.339 2.448a5.532 5.532 0 0 1 -2.2 2.2l-2.447 1.333a.714.714 0 0 0 0 1.254l2.448 1.339a5.526 5.526 0 0 1 2.2 2.2l1.339 2.448a.715.715 0 0 0 1.254 0l1.339-2.441a5.532 5.532 0 0 1 2.2-2.2l2.448-1.339a.714.714 0 0 0 0-1.254l-2.448-1.341a5.539 5.539 0 0 1 -2.2-2.2l-1.339-2.448a.714.714 0 0 0 -1.255.001z",
    ],
    image: EstheticFam,
    details: [
      {
        heading: "New Era",
        text: "Metal-free, monochromatic tooth-colored crowns made of a completely biocompatible material which can mask discoloration of arrested caries",
      },
      {
        heading: "Biocompatible Material",
        text: "Made of high impact, biocompatible, hybrid resin polymer used in the medical field where high strength, flexibility and durability are required. They are Bis-GMA free and contain no metal.",
      },
      {
        heading: "Esthetic Laser Marking",
        text: "Laser marking on the inner occlusal surface for easy identification and optimal esthetics",
      },
    ],
  },
  {
    title: "Durable",
    iconViewBox: "0 0 512 512",
    iconPaths: [
      "m382.512 134.313c-1.688-6.653-7.676-11.313-14.54-11.313h-42.163v-5c0-30.327-24.673-55-55-55h-29.618c-30.327 0-55 24.673-55 55v5h-42.198c-6.86 0-12.845 4.653-14.537 11.301-6.627 26.047-44.97 176.923-49.49 194.699h352.068c-4.419-17.381-43.72-171.805-49.522-194.687zm-86.703-11.313h-79.618v-5c0-13.785 11.215-25 25-25h29.618c13.785 0 25 11.215 25 25z",
      "m297.468 359-51.962 90h97.513l51.962-90z",
      "m165.621 359-51.961 90h97.205l51.962-90z",
      "M15 359c-8.284 0-15 6.716-15 15v60c0 8.284 6.716 15 15 15h64.019l51.961-90z",
      "m497 359h-67.378l-51.962 90h119.34c8.284 0 15-6.716 15-15v-60c0-8.285-6.716-15-15-15z",
    ],
    image: durable,
    details: [
      {
        heading: "Durable",
        text: "Wear resistance of Bioflx is similar to or better than traditional SSCs!",
      },
      {
        heading: "Self-adaptive Technology",
        text: "Rather than wearing, Bioflx crowns will self-adapt forming a 'dimple' in areas of high occlusion",
      },
      {
        heading: "Color Stable",
        text: "Stain resistant with no visible discoloration after > 1 year intraorally or when placed opposing an SSC",
      },
    ],
  },
  {
    title: "Cementation",
    iconViewBox: "0 0 512 512",
    iconPaths: [
      "m205.93 143.89h106.07c22.09 0 40.05 13.14 40.05 29.28v15.23c0 4.17 1.26 8.22 3.73 12.09h34.62c.72-7.6 1.41-13.96 2.15-19.69.18-1.41.85-2.7 1.89-3.66 19.05-17.5 29.98-43.14 29.98-70.35v-1.8c0-44.71-36.33-81.81-81-82.76-15.21.26-30.05 3.24-44.11 8.85-28.44 11.34-57.28 11.34-85.73 0-14.05-5.61-28.89-8.59-44.1-8.85-44.68.95-81 38.05-81 82.76v1.8c0 27.21 10.92 52.85 29.98 70.35 1.04.96 1.71 2.25 1.89 3.66.74 5.75 1.43 12.11 2.15 19.69h39.65c2.47-3.87 3.73-7.92 3.73-12.09v-15.23c0-16.14 17.95-29.28 40.05-29.28zm185.19 135.85h-269.35c1.06 10.23 1.93 20.98 2.84 32.25 5 61.69 10.66 131.62 52.01 165.33 3.09 2.51 6.64 3.4 10.55 2.64s6.86-2.92 8.77-6.42c9.64-17.6 15.28-37.96 16.31-58.89 1.02-20.57 4.89-38.06 12.55-56.7 5.38-13.08 17.5-21.21 31.64-21.21s26.26 8.13 31.64 21.21c7.66 18.64 11.53 36.13 12.54 56.7 1.04 20.93 6.68 41.29 16.31 58.89 1.92 3.5 4.87 5.66 8.78 6.42s7.46-.13 10.55-2.64c41.35-33.71 47.01-103.64 52-165.33.92-11.27 1.79-22.02 2.86-32.25zm-79.13-56.59h-106.06c-15.21 0-28.05 7.91-28.05 17.27v15.23c0 4.1-.8 8.17-2.33 12.09h166.83c-1.53-3.92-2.33-7.99-2.33-12.09v-15.23c-.01-9.36-12.85-17.27-28.06-17.27z",
    ],
    fillRule: "evenodd",
    image: RoughCementingsurface,
    details: [
      {
        heading: "Enhanced Retention",
        text: "Sandblasted intaglio surface for enhanced retention with self-setting RMGI & GI cements",
      },
      {
        heading: "Recommended Cements",
        text: "A regular GI (FujiCem I, Ketac) or RMGI (FujiCem II) should be sufficient for cementing Bioflx. A light-cured cement is not recommended",
      },
    ],
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
          <div className="col-xl-5 col-lg-6 pt-lg-4 mb-4">
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
            <div className="accordion featAccordion" id="featAccordion">
              {features.map((feature, index) => (
                <div
                  className={`${styles.featItem} p-3 py-sm-4 animateThis slideRight`}
                  key={feature.title}
                >
                  <div
                    className={`${styles.hstack} hstack align-items-center gap-sm-3 gap-2`}
                    role="button"
                    tabIndex={0}
                    data-bs-toggle="collapse"
                    data-bs-target={`#feature_${index + 1}`}
                    aria-expanded="false"
                    aria-controls={`feature_${index + 1}`}
                  >
                    <div
                      className={`${styles.ftIcImg}  d-flex justify-content-center align-items-center`}
                    >
                      <svg
                        viewBox={feature.iconViewBox}
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <g>
                          {feature.iconPaths.map((path, pathIndex) => (
                            <path
                              key={pathIndex}
                              d={path}
                              {...(feature.fillRule
                                ? {
                                    "fill-rule": feature.fillRule,
                                    "clip-rule": "evenodd",
                                  }
                                : {})}
                            />
                          ))}
                        </g>
                      </svg>
                    </div>
                    <h2 className={`${styles.featTitle}  mb-0`}>
                      {feature.title}
                    </h2>
                  </div>

                  <div
                    id={`feature_${index + 1}`}
                    className="collapse"
                    data-bs-parent="#featAccordion"
                  >
                    <div className={`${styles.featcontent} pt-3`}>
                      <div className="row justify-content-center">
                        <div className="col-md-5 col-10 align-self-center">
                          <Image
                            src={feature.image}
                            alt={feature.title}
                            width={500}
                            height={300}
                            unoptimized
                            className="w-100 h-auto"
                          />
                        </div>

                        <div className="col-md col-12">
                          <ul className="vstack">
                            {feature.details.map((detail) => (
                              <li key={detail.heading}>
                                <h4 className="featHead">{detail.heading}</h4>
                                <p>{detail.text}</p>
                              </li>
                            ))}
                          </ul>
                        </div>
                      </div>
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
