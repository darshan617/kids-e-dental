import Image from "next/image";
import React from "react";
import stars from "@/assets/images/stars.gif";
import styles from '@/components/product-detail/product-info/ProductInfo.module.css'

const ReviewRating = () => {
  return (
    <section className={`${styles.reviewSection} sitePadding py-5`}>
      <div className="container-fluid">
        <div className="continer-fluid text-center py-4 vstack align-items-center staggerList">
          <h3 className="sectionHead_sm animateThis fadeIn">
            Rating & Reviews
          </h3>
          <h2 className="sectionHead fw-bold mb-3 animateThis fadeIn">
            Better Dentistry.{" "}
            <span className="textPrimary">Brighter Smiles.</span>
          </h2>
          <p className="animateThis fadeIn">
            Our commitment to quality, innovation and global trust shapes
            everything we do.
          </p>
        </div>

        <div className={`${styles.reviewWrap} rounded mb-4`}>
          {/* <!-- Below Div for Reviews absent --> */}

          <div className="text-center d-none">
            <Image src={stars} style={{ width: "80%", maxWidth: "300px" }} />
            <h5 className="">We're looking for stars!</h5>
            <p>Let us know what do you think.</p>
            <button
              type="button"
              className="ctaBtn ctaBlack"
              data-bs-toggle="modal"
              data-bs-target="#reviewModal"
            >
              Be the first to write a review
            </button>
          </div>

          {/* <!-- Below Div for Review Present --> */}

          <div className="row mb-5 animateThis fadeIn">
            <div className="col-md col-12">
              <div className={`${styles.starItemsWrap} float-md-end pe-lg-4 mx-auto animateOne`}>
                <div className={`${styles.starItem} row align-items-center gx-4 mb-3 text-end`}>
                  <div className="col-3">
                    5 <div className={styles.starIcon}></div>{" "}
                  </div>
                  <div
                    className="col px-0 progress"
                    role="progressbar"
                    aria-label="5 Stars"
                    aria-valuenow="90"
                  >
                    <div
                      className="progress-bar"
                      style={{ "--pbWidth": "90%" }}
                    ></div>
                  </div>
                  <div className="col-2 text-start">90%</div>
                </div>

                <div className={`${styles.starItem} row align-items-center gx-4 mb-3 text-end`}>
                  <div className="col-3">
                    4 <div className={styles.starIcon}></div>{" "}
                  </div>
                  <div
                    className="col px-0 progress"
                    role="progressbar"
                    aria-label="4 Stars"
                    aria-valuenow="10"
                  >
                    <div className="progress-bar" style={{"--pbWidth":"10%"}}></div>
                  </div>
                  <div className="col-2 text-start">10%</div>
                </div>

                <div className={`${styles.starItem} row align-items-center gx-4 mb-3 text-end`}>
                  <div className="col-3">
                    3 <div className={styles.starIcon}></div>{" "}
                  </div>
                  <div
                    className="col px-0 progress"
                    role="progressbar"
                    aria-label="3 Stars"
                    aria-valuenow="0"
                  >
                    <div className="progress-bar" style={{"--pbWidth":"0%"}}></div>
                  </div>
                  <div className="col-2 text-start">0%</div>
                </div>

                <div className={`${styles.starItem} row align-items-center gx-4 mb-3 text-end`}>
                  <div className="col-3">
                    2 <div className={styles.starIcon}></div>{" "}
                  </div>
                  <div
                    className="col px-0 progress"
                    role="progressbar"
                    aria-label="2 Stars"
                    aria-valuenow="0"
                  >
                    <div className="progress-bar" style={{"--pbWidth":"0%"}}></div>
                  </div>
                  <div className="col-2 text-start">0%</div>
                </div>

                <div className={`${styles.starItem} row align-items-center gx-4 mb-3 text-end`}>
                  <div className="col-3">
                    1 <div className={styles.starIcon}></div>{" "}
                  </div>
                  <div
                    className="col px-0 progress"
                    role="progressbar"
                    aria-label="1 Star"
                    aria-valuenow="0"
                  >
                    <div className="progress-bar" style={{"--pbWidth":"0%"}}></div>
                  </div>
                  <div className="col-2 text-start">0%</div>
                </div>
              </div>
            </div>
            <div className="col-md-auto d-md-block d-none">
              {" "}
              <div className="vr h-100"></div>{" "}
            </div>
            <div className="col-md col-12">
              <div className={`${styles.overallreview} text-center mx-auto float-md-start`}>
                <div className="mx-auto d-inline-block">
                  <div className={styles.prodRating}>5</div>
                  <div className={styles.ratingBox}>
                    {" "}
                    <div className={`${styles.ratedStars} ${styles.star5}`}></div>{" "}
                  </div>
                  <small className="d-block mb-3">
                    Average rating based on 8 Reviews
                  </small>
                  <div className="">
                    <button
                      type="button"
                      className="ctaBtn arw w-100"
                      data-bs-toggle="modal"
                      data-bs-target="#reviewModal"
                    >
                      Write your review
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="row justify-content-center g-4 mb-4 reviewBoxList staggerList">
          <div className="col-lg-4 animateThis fadeIn">
            <div className={`${styles.reviewBox} rounded-4 d-flex flex-column p-sm-4 p-3`}>
              <div className="col-auto d-flex">
                <div className="col">
                  <div className={styles.ratingBox}>
                    {" "}
                    <div className={`${styles.ratedStars} ${styles.star5}`}></div>{" "}
                  </div>
                </div>
                <div className={`${styles.reviewDate} col-auto`}>08/07/2024</div>
              </div>
              <div className="col">
                <h4 className={styles.reviewHead}>Easily can have more than one!</h4>
                <p>
                  I loved the material as they are breathable especially the
                  dark blue top every thing is the same like the picture.
                </p>
              </div>
              <div className={`${styles.reviewAuthor} col-auto mt-auto`}>
                By: Rasha Salhoub
              </div>
            </div>
          </div>

          <div className="col-lg-4 animateThis fadeIn">
            <div className={`${styles.reviewBox} rounded-4 d-flex flex-column p-sm-4 p-3`}>
              <div className="col-auto d-flex">
                <div className="col">
                  <div className={styles.ratingBox}>
                    {" "}
                    <div className={`${styles.ratedStars} ${styles.star5}`}></div>{" "}
                  </div>
                </div>
                <div className={`${styles.reviewDate} col-auto`}>08/07/2024</div>
              </div>
              <div className="col">
                <h4 className={styles.reviewHead}>Amazing Product !</h4>
                <p>
                  Good quality material, perfect length, and by tying two knots
                  it doesn't get loose by time.
                </p>
              </div>
              <div className={`${styles.reviewAuthor} col-auto mt-auto`}>
                By: Nour Koraa
              </div>
            </div>
          </div>

          <div className="col-lg-4 animateThis fadeIn">
            <div className={`${styles.reviewBox} rounded-4 d-flex flex-column p-sm-4 p-3`}>
              <div className="col-auto d-flex">
                <div className="col">
                  <div className={styles.ratingBox}>
                    {" "}
                    <div className={`${styles.ratedStars} ${styles.star5}`}></div>{" "}
                  </div>
                </div>
                <div className={`${styles.reviewDate} col-auto`}>08/07/2024</div>
              </div>
              <div className="col">
                <h4 className={styles.reviewHead}>Fantastic Bodysuit</h4>
                <p>
                  Absolutely fantastic top. True to it size. Good quality, I've
                  bought another 3 in different colours.
                </p>
              </div>
              <div className={`${styles.reviewAuthor} col-auto mt-auto`}>
                By: Tracy Entwistle
              </div>
            </div>
          </div>

          <div className="col-12 text-center">
            <button
              type="button"
              className="ctaBtn white arw"
              data-bs-toggle="modal"
              data-bs-target="#moreReviews"
            >
              View All Review
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ReviewRating;
