"use client";

import Image from "next/image";
import React, { useEffect } from "react";
import { Fancybox } from "@fancyapps/ui";
import "@fancyapps/ui/dist/fancybox/fancybox.css";

import BioflxCrownsKit from "@/assets/images/bioflx/Bioflx-Crowns-Kit-IFU.jpg";
import kidsEcrownAnteriorTechnique from "@/assets/images/education/kids-e-crown_anterior-technique.jpg";
import posteriorTechnique from "@/assets/images/education/kids-e-crown_posterior-technique.jpg";
import eSdfTechnique from "@/assets/images/education/e-sdf-technique.jpg";
import PulpotomyTechnique from "@/assets/images/education/e-MTA-Pulpotomy-technique.jpg";
import SPLINTTechnique from "@/assets/images/education/e-SPLINT-technique.jpg";

import styles from "@/components/education/Education.module.css";

const Education = () => {
  useEffect(() => {
    const handleImageClick = (event) => {
      const image = event.target.closest("[data-fancybox]");

      if (!image) return;

      event.preventDefault();

      Fancybox.show(
        [
          {
            src: image.currentSrc || image.src,
            type: "image",
          },
        ],
        {
          Carousel: {
            Thumbs: {
              showOnStart: false,
            },
            Navigation: false,
          },
          Toolbar: {
            display: {
              left: [],
              middle: [],
              right: ["close"],
            },
          },
          Images: {
            zoom: false,
          },
        },
      );
    };

    document.addEventListener("click", handleImageClick);

    return () => {
      document.removeEventListener("click", handleImageClick);
    };
  }, []);

  return (
    <>
      <section className="py-5 sitePadding bgPrimary">
        <div className="container-fluid vstack align-items-center gap-2 animateThis fadeIn">
          <h1 className="sectionHead fw-bold mb-0">Education</h1>
          <p>
            Discover how our pediatric dental solutions support better clinical
            care
          </p>
        </div>
      </section>

      <section className="sitePadding py-sm-5 py-4 overflow-hidden">
        <div className="container-fluid">
          <div className="row row-cols-lg-2 row-cols-1 g-lg-5 g-4 eduCardList">
            <div className="col animateThis slideTop">
              <div
                className={`${styles.eduCardItem} rounded-4 p-3 text-center overflow-hidden`}
              >
                <h2 className="sectionHead_sm fw-semibold bgPrimary rounded-pill d-inline-block px-4 lh-base">
                  BioFlx - Posterior Technique
                </h2>
                <Image
                  src={BioflxCrownsKit}
                  alt="Bioflx Crowns Kit"
                  className="mw-100 rounded-2 border w-100"
                  data-fancybox
                />
              </div>
            </div>

            <div className="col animateThis slideTop">
              <div
                className={`${styles.eduCardItem} rounded-4 p-3 text-center overflow-hidden`}
              >
                <h2 className="sectionHead_sm fw-semibold bgPrimary rounded-pill d-inline-block px-4 lh-base">
                  Kids-e-Crown® - Anterior Technique
                </h2>
                <Image
                  src={kidsEcrownAnteriorTechnique}
                  alt="Kids-e-Crown Anterior Technique"
                  className="mw-100 rounded-2 border"
                  data-fancybox
                />
              </div>
            </div>

            <div className="col animateThis slideTop">
              <div
                className={`${styles.eduCardItem} rounded-4 p-3 text-center overflow-hidden`}
              >
                <h2 className="sectionHead_sm fw-semibold bgPrimary rounded-pill d-inline-block px-4 lh-base">
                  Kids-e-Crown® - Posterior Technique
                </h2>
                <Image
                  src={posteriorTechnique}
                  alt="Kids-e-Crown Posterior Technique"
                  className="mw-100 rounded-2 border"
                  data-fancybox
                />
              </div>
            </div>

            <div className="col animateThis slideTop">
              <div
                className={`${styles.eduCardItem} rounded-4 p-3 text-center overflow-hidden`}
              >
                <h2 className="sectionHead_sm fw-semibold bgPrimary rounded-pill d-inline-block px-4 lh-base">
                  e-sdf - Technique
                </h2>
                <Image
                  src={eSdfTechnique}
                  alt="e-SDF Technique"
                  className="mw-100 rounded-2 border"
                  data-fancybox
                />
              </div>
            </div>

            <div className="col animateThis slideTop">
              <div
                className={`${styles.eduCardItem} rounded-4 p-3 text-center overflow-hidden`}
              >
                <h2 className="sectionHead_sm fw-semibold bgPrimary rounded-pill d-inline-block px-4 lh-base">
                  e-MTA - Pulpotomy Technique
                </h2>
                <Image
                  src={PulpotomyTechnique}
                  alt="e-MTA Pulpotomy Technique"
                  className="mw-100 rounded-2 border"
                  data-fancybox
                />
              </div>
            </div>

            <div className="col animateThis slideTop">
              <div
                className={`${styles.eduCardItem} rounded-4 p-3 text-center overflow-hidden`}
              >
                <h2 className="sectionHead_sm fw-semibold bgPrimary rounded-pill d-inline-block px-4 lh-base">
                  e-SPLINT - Technique
                </h2>
                <Image
                  src={SPLINTTechnique}
                  alt="e-SPLINT Technique"
                  className="mw-100 rounded-2 border"
                  data-fancybox
                />
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default Education;
