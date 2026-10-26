import Image from "next/image";
import React from "react";
import bioflxLogo from "@/assets/images/bioflx/bioflx_logo.png";
import bioflxPost from "@/assets/images/bioflx/bioflx-post.png";
import styles from "@/components/bioflx/bioflx-banner/BioflxBanner.module.css";

const BioflxBanner = () => {
  return (
    <>
      <section
        className="sitePadding py-sm-3 py-2"
        style={{ background: "#fbfbfb" }}
      >
        <div className="container-fluid">
          <nav aria-label="breadcrumb">
            <ol className="breadcrumb mb-0">
              <li className="breadcrumb-item">
                <a href="index.html">Home</a>
              </li>
              <li className="breadcrumb-item">
                <a href="#">Products</a>
              </li>
              <li className="breadcrumb-item">
                <a href="#">Restorative</a>
              </li>
              <li className="breadcrumb-item active" aria-current="page">
                Bioflx Crown
              </li>
            </ol>
          </nav>
        </div>
      </section>

      <section
        className={`${styles.catgHero} sitePadding py-sm-5 py-4 overflow-hidden`}
      >
        <div className="container-xxl py-xxl-3">
          <div className="row justify-content-around align-items-center position-relative z-3">
            <div className="col-lg-6 py-xl-5 text-center text-lg-start">
              <div className="vstack gap-3 animateThis slideRight">
                <div className="mb-3">
                  <Image
                    src={bioflxLogo}
                    alt="BioFlx Crown"
                    title="BioFlx Crown"
                    className={styles.catgLogo}
                  />
                </div>

                <h1 className="sectionHead lh-sm text-capitalize mb-0">
                  World's First Flexible, Durable, Self-adaptable and Esthetic
                  pediatric crowns.
                </h1>

                <div style={{ fontSize: "90%" }}>
                  <p>
                    Designed and invented by a Pediatric dentist from India,
                    that offers a smart solution to do pediatric tooth colored
                    crowns, having properties of both stainless steel and
                    zirconia crowns.
                  </p>
                </div>

                <div>
                  <ul
                    className={`${styles.catPgLinks} hstack justify-content-center justify-content-lg-start gap-sm-3 gap-1 fw-medium text-center`}
                  >
                    <li>
                      <a href="#featureSection">Features</a>
                    </li>
                    <li>
                      <a href="#kitsSection">Purchase Kits</a>
                    </li>
                    <li>
                      <a href="#supportSection">Clinical Resources</a>
                    </li>
                  </ul>
                </div>
              </div>
            </div>

            <div className="col-lg-6 d-flex justify-content-center justify-content-lg-end">
              <div
                className={`${styles.catgHeroProd} d-flex justify-content-center align-items-center`}
              >
                <Image
                  src={bioflxPost}
                  alt="BioFlx Crown product"
                  className={`${styles.catgHeroImg} animateThis fadeGrow`}
                  priority
                />
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default BioflxBanner;
