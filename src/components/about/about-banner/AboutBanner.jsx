import Image from "next/image";
import React from "react";
import abtBanner from "@/assets/images/aboutBanner.jpg";
import styles from "@/components/about/about-banner/AboutBanner.module.css";
import aboutContentImg from '@/assets/images/aboutContentImg.jpg'

const AboutBanner = () => {
  return (
    <>
      <section className={`${styles.aboutBanner} bg-dark overflow-hidden`}>
        <Image src={abtBanner} alt="" className="w-100 h-auto animateThis curtain" />
      </section>

      <section className="pt-5">
        <div className="sitePadding">
          <div className="container-fluid text-center py-4 mb-sm-5 mb-3 vstack align-items-center staggerList">
            <h3 className="sectionHead_sm animateThis slideTop">About Company</h3>
            <h2 className="sectionHead fw-bold mb-4 animateThis slideTop">
              A Journey of innovation{" "}
              <span className="textPrimary">for Little Smiles</span>
            </h2>
            <p
              className={`${styles.aboutText} text-secondary lh-base animateThis fadeIn`}
              style={{maxWidth: "1400px"}}
            >
              We are a dedicated team of professionals committed to providing
              the highest quality dental products for children.{" "}
              <strong className="text-dark">
                Established in 2017 by Dr. Mukul Jain, a Pediatric & Preventive
                Dentist,
              </strong>{" "}
              Kids-e-Dental LLP was founded with the vision of revolutionizing
              pediatric dentistry through innovation and excellence in
              manufacturing.
            </p>
          </div>
        </div>
        <div className="sitePadding bgPrimary">
          <div className="container-fluid">
            <div className="row gx-lg-5 animateOne">
              <div className={`${styles.abtContImgBox} col-xl-6 py-5 position-relative z-1`}>
                <Image
                  src={aboutContentImg}
                  alt=""
                  className="rounded-5 w-100 h-100 object-fit-cover animateThis curtain"
                  style={{transitionDelay: "1s"}}
                />
              </div>
              <div className="col-xl-6 px-xl-5 py-xl-4 mb-5 mb-xl-0 align-self-center animateThis slideTop">
                <p>
                  In 2021, Dr. Mukul Jain, Founder, CEO & Partner of
                  Kids-e-Dental LLP proudly joined hands with Laxmi Dental Group
                  under the leadership of Mr. Rajesh Khakhar, Chairman of Laxmi
                  Dental Group, along with the strategic vision and support of
                  Mr. Sameer Merchant, CEO of Laxmi Dental Group, and Mr.
                  Prithvi Khakhar, CEO & Partner of Kids-e-Dental LLP. This
                  collaboration marked a significant milestone in the company's
                  journey and further strengthened our mission of advancing
                  pediatric dentistry through innovation, quality manufacturing,
                  and global outreach.
                </p>
                <p>
                  Together, Kids-e-Dental LLP and Laxmi Dental Group have
                  successfully developed and introduced innovative pediatric
                  dental solutions, including the BIOFLX Crowns combining
                  clinical expertise, research-driven development, and
                  world-className manufacturing capabilities to provide advanced
                  treatment options for pediatric dentists worldwide.
                </p>
                <p>
                  With strong brand identity and long standing trust build by
                  Kids-e-Dental among dental professionals and over 35 years of
                  manufacturing excellence through Laxmi Dental Group, our
                  mission is to create exceptional products that make a
                  meaningful difference in children's lives. All our products
                  are research-based and passionately developed using advanced
                  technologies.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default AboutBanner;
