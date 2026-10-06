import Image from "next/image";
import React from "react";
import styles from '@/components/about/vision-mission/VisionMission.module.css'
import mvMascot from "@/assets/images/mvMascot.png";

const VisionMission = () => {
  return (
    <section className="sitePadding py-5 overflow-hidden">
      <div
        className="container-fluid pt-5"
        style={{ maxWidth: "1500px" }}
      >
        <div className="row">
          <div className="col-lg-auto col-12 order-lg-2 text-center">
            <div className={`${styles.mvMascotBox} mx-auto mb-4 mb-lg-0`}>
              <div className={`${styles.mvArrow} ${styles.mvTop} animateOne curtainLeft `}>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 1000 189.1"
                  style={{ enableBackground: "new 0 0 1000 189.1" }}
                  fill="#ffcc00"
                >
                  <path d="M990.2,152.1c4.1,2.1,4.5-2.6,4.5-2.6l5.2-33.1c0.2-3.9-3.9-1.9-3.9-1.9l-1.9,0.7C969.9,48,905.6,0,830,0c-91.2,0-166,70-173.8,159.1l0,0.1c-0.3,6.2-7.1,5.2-7.1,5.2h-4.5H0v24.7h659.4c14.1,0,20.4-6.7,23-14.6l0.7-2.4c0.7-2.8,0.9-5.6,1-8.4c0.2-9.3,2.2-20,3-23.5C702.5,75.6,760.7,27.6,830,27.6c63.7,0,117.9,40.5,138.3,97.2l-3.4,1.3c-3.2,1.4-1.3,3.9-1.3,3.9L990.2,152.1z" />
                </svg>
              </div>

              <div className={`${styles.mvArrow} ${styles.mvBtm} animateOne curtainRight`}>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 1000 189.1"
                  style={{ enableBackground: "new 0 0 1000 189.1" }}
                  fill="#282828"
                >
                  <path d="M9.8,37c-4.1-2.1-4.5,2.6-4.5,2.6L0,72.8c-0.2,3.9,3.9,1.9,3.9,1.9L5.8,74C30.1,141.2,94.4,189.1,170,189.1c91.2,0,166-70,173.8-159.1l0-0.1c0.3-6.2,7.1-5.2,7.1-5.2h4.5H1000V0L340.6,0c-14.1,0-20.4,6.7-23,14.6l-0.7,2.4c-0.7,2.8-0.9,5.6-1,8.4c-0.2,9.3-2.2,20-3,23.5c-15.4,64.6-73.6,112.7-142.9,112.7C106.3,161.6,52,121,31.7,64.3l3.4-1.3c3.2-1.4,1.3-3.9,1.3-3.9L9.8,37z" />
                </svg>
              </div>

              <Image
                src={mvMascot}
                alt=""
                className={`${styles.mvMascotImg} animateThis fadeGrow w-auto`}
              />
            </div>
          </div>

          <div className="col-sm col-12 order-lg-1 text-sm-end text-center pe-4">
            <div className="animateThis slideLeft">
              <h3 className="sectionHead">Vision</h3>
              <p>
                To shape the future of pediatric dentistry through smarter,
                safer, and better dental solutions.
              </p>
            </div>
          </div>

          <div className="col-sm col-12 order-lg-3 text-sm-start text-center d-flex flex-column justify-content-end ps-4">
            <div className="animateThis slideRight">
              <h3 className="sectionHead">Mission</h3>
              <p>
                To make pediatric dentistry easier through innovative,
                high-quality products that empower dental professionals to
                deliver better care and healthier smiles for life.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default VisionMission;
