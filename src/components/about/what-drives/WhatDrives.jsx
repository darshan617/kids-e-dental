import Image from "next/image";
import React from "react";
import wdu1 from '@/assets/images/wdu_1.jpg'
import wdu2 from '@/assets/images/wdu_2.jpg'
import wdu3 from '@/assets/images/wdu_3.jpg'
import styles from '@/components/about/about-banner/AboutBanner.module.css'



const WhatDrives = () => {
  return (
    <section className="sitePadding py-5">
      <div className="continer-fluid text-center py-4 vstack align-items-center staggerList">
        <h3 className="sectionHead_sm animateThis slideTop">What Drives Us</h3>
        <h2 className="sectionHead fw-bold mb-3 animateThis slideTop">
          Better Dentistry.{" "}
          <span className="textPrimary">Brighter Smiles.</span>
        </h2>
        <p className="animateThis fadeIn">
          Our commitment to quality, innovation and global trust shapes
          everything we do.
        </p>
      </div>

      <div className="container-fluid">
        <div className="row row-cols-lg-3 row-cols-md-2 row-cols-1 justify-content-center g-md-4 g-0 staggerList">
          <div className="col animateThis fadeGrow">
            <div className={`${styles.wduBox} bgPrimary p-2 h-100 rounded-4 vstack`}>
              <div className="ratio ratio-16x9 w-100 rounded-3 overflow-hidden">
                <Image
                  src={wdu1}
                  alt=""
                  className="wdu_img object-fit-cover"
                />
              </div>
              <div className="p-2 p-md-3">
                <h3 className={styles.wduTitle}>
                  Quality <br /> By Design
                </h3>
                <p className="wdu_txt mb-0 lh-base">
                  Quality is built into every Kids-e-Dental product—from
                  carefully selected materials and precise manufacturing to
                  rigorous attention to consistency, safety, and performance. We
                  don't cut corners, because every product we make carries our
                  name and the trust of the professionals who use it.
                </p>
              </div>
            </div>
          </div>
          <div className="col animateThis fadeGrow">
            <div className={`${styles.wduBox} bgPrimary p-2 h-100 rounded-4 vstack`}>
              <div className="ratio ratio-16x9 w-100 rounded-3 overflow-hidden">
                <Image
                  src={wdu2}
                  alt=""
                  className="wdu_img object-fit-cover"
                />
              </div>
              <div className="p-2 p-md-3">
                <h3 className={styles.wduTitle}>
                  Innovation <br /> That Matters
                </h3>
                <p className="wdu_txt mb-0 lh-base">
                  We turn real challenges in pediatric dentistry into
                  thoughtful, practical solutions that make care easier for
                  professionals and better for children. For us, innovation
                  isn't about making something new—it's about making something
                  genuinely better.
                </p>
              </div>
            </div>
          </div>
          <div className="col animateThis fadeGrow">
            <div className={`${styles.wduBox} bgPrimary p-2 h-100 rounded-4 vstack`}>
              <div className="ratio ratio-16x9 w-100 rounded-3 overflow-hidden">
                <Image
                  src={wdu3}
                  alt=""
                  className="wdu_img object-fit-cover"
                />
              </div>
              <div className="p-2 p-md-3">
                <h3 className={styles.wduTitle}>
                  Made in India <br />
                  Trusted Worldwide
                </h3>
                <p className="wdu_txt mb-0 lh-base">
                  With a growing presence across international markets,
                  Kids-e-Dental is building lasting relationships with dentists,
                  distributors, and dental businesses around the world. Our
                  ambition is global, but our commitment remains the same
                  exceptional products, dependable partnerships, and quality
                  without compromise.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default WhatDrives;
