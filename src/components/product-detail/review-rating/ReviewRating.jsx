import Image from "next/image";
import React from "react";
import stars from "@/assets/images/stars.gif";
import styles from "@/components/product-detail/product-info/ProductInfo.module.css";

const MAX_VISIBLE_REVIEWS = 3;

const formatDate = (iso) => {
  if (!iso) return "";
  const d = new Date(iso);
  return Number.isNaN(d.getTime()) ? "" : d.toLocaleDateString("en-GB");
};

const starClass = (rating) => {
  const n = Math.min(5, Math.max(0, Math.round(Number(rating) || 0)));
  return styles[`star${n}`] || "";
};

const ReviewRating = ({ product }) => {
  const summary = product?.rating_summary;
  const reviews = Array.isArray(product?.reviews) ? product.reviews : [];

  const average = Number(summary?.average_rating) || 0;
  const totalReviews = Number(summary?.total_reviews) || 0;
  const breakdown = Array.isArray(summary?.rating_breakdown)
    ? [...summary.rating_breakdown].sort((a, b) => b.star - a.star) // 5 → 1
    : [5, 4, 3, 2, 1].map((star) => ({ star, count: 0, percentage: 0 }));

  const visibleReviews = reviews.slice(0, MAX_VISIBLE_REVIEWS);
  const hasReviews = totalReviews > 0 || reviews.length > 0;

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
          {!hasReviews ? (
            <div className="text-center py-4">
              <Image
                src={stars}
                alt="No reviews yet"
                style={{ width: "80%", maxWidth: "300px", height: "auto" }}
              />
              <h5 className="">We're looking for stars!</h5>
              <p>Let us know what do you think.</p>
              {product?.can_review && (
                <button
                  type="button"
                  className="ctaBtn ctaBlack"
                  data-bs-toggle="modal"
                  data-bs-target="#reviewModal"
                >
                  Be the first to write a review
                </button>
              )}
            </div>
          ) : (
            <div className="row mb-5 animateThis fadeIn">
              <div className="col-md col-12">
                <div
                  className={`${styles.starItemsWrap} float-md-end pe-lg-4 mx-auto animateOne`}
                >
                  {breakdown.map(({ star, percentage }) => (
                    <div
                      key={star}
                      className={`${styles.starItem} row align-items-center gx-4 mb-3 text-end`}
                    >
                      <div className="col-3">
                        {star} <div className={styles.starIcon}></div>{" "}
                      </div>
                      <div
                        className="col px-0 progress"
                        role="progressbar"
                        aria-label={`${star} ${star === 1 ? "Star" : "Stars"}`}
                        aria-valuenow={percentage}
                        aria-valuemin={0}
                        aria-valuemax={100}
                      >
                        <div
                          className="progress-bar"
                          style={{ "--pbWidth": `${percentage}%` }}
                        ></div>
                      </div>
                      <div className="col-2 text-start">{percentage}%</div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="col-md-auto d-md-block d-none">
                {" "}
                <div className="vr h-100"></div>{" "}
              </div>

              <div className="col-md col-12">
                <div
                  className={`${styles.overallreview} text-center mx-auto float-md-start`}
                >
                  <div className="mx-auto d-inline-block">
                    <div className={styles.prodRating}>{average}</div>
                    <div className={styles.ratingBox}>
                      {" "}
                      <div
                        className={`${styles.ratedStars} ${starClass(average)}`}
                      ></div>{" "}
                    </div>
                    <small className="d-block mb-3">
                      Average rating based on {totalReviews}{" "}
                      {totalReviews === 1 ? "Review" : "Reviews"}
                    </small>
                    <div className="">
                      {product?.can_review ? (
                        <button
                          type="button"
                          className="ctaBtn arw w-100"
                          data-bs-toggle="modal"
                          data-bs-target="#reviewModal"
                        >
                          Write your review
                        </button>
                      ) : (
                        <small className="text-secondary">
                          Only customers who purchased this product can write a
                          review.
                        </small>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>

        {visibleReviews?.length > 0 && (
          <div className="row justify-content-center g-4 mb-4 reviewBoxList staggerList">
            {visibleReviews?.map((review) => (
              <div className="col-lg-4 animateThis fadeIn" key={review?.id}>
                <div
                  className={`${styles.reviewBox} rounded-4 d-flex flex-column p-sm-4 p-3`}
                >
                  <div className="col-auto d-flex">
                    <div className="col">
                      <div className={styles.ratingBox}>
                        {" "}
                        <div
                          className={`${styles.ratedStars} ${starClass(
                            review?.rating,
                          )}`}
                        ></div>{" "}
                      </div>
                    </div>
                    <div className={`${styles.reviewDate} col-auto`}>
                      {formatDate(review?.created_at)}
                    </div>
                  </div>

                  <div className="col">
                    <p>{review?.review}</p>

                    {Array.isArray(review?.image_urls) &&
                      review?.image_urls?.length > 0 && (
                        <div className="d-flex flex-wrap gap-2 mb-2">
                          {review?.image_urls?.map((url) => (
                            <Image
                              key={url}
                              src={url}
                              alt="Review photo"
                              width={60}
                              height={60}
                              style={{ objectFit: "cover", borderRadius: 6 }}
                            />
                          ))}
                        </div>
                      )}
                  </div>

                  <div className={`${styles.reviewAuthor} col-auto mt-auto`}>
                    By: {review?.user?.name || "Verified Customer"}
                  </div>
                </div>
              </div>
            ))}

            {reviews.length > MAX_VISIBLE_REVIEWS && (
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
            )}
          </div>
        )}
      </div>
    </section>
  );
};

export default ReviewRating;
