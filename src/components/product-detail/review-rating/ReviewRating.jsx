"use client";

import Image from "next/image";
import React, { useState } from "react";
import stars from "@/assets/images/stars.gif";
import styles from "@/components/product-detail/product-info/ProductInfo.module.css";
import CustomPopup from "@/common-component/custom-popup/CustomPopup";

const MAX_VISIBLE_REVIEWS = 5;

const formatDate = (iso) => {
  if (!iso) return "";
  const d = new Date(iso);
  return Number.isNaN(d.getTime()) ? "" : d.toLocaleDateString("en-GB");
};

const starClass = (rating) => {
  const n = Math.min(5, Math.max(0, Math.round(Number(rating) || 0)));
  return styles[`star${n}`] || "";
};

const ReviewCard = ({ review }) => (
  <div
    className={`${styles.reviewBox} rounded-4 d-flex flex-column p-sm-4 p-3`}
  >
    <div className="col-auto d-flex">
      <div className="col">
        <div className={styles.ratingBox}>
          <div
            className={`${styles.ratedStars} ${starClass(review?.rating)}`}
          ></div>
        </div>
      </div>
      <div className={`${styles.reviewDate} col-auto`}>
        {formatDate(review?.created_at)}
      </div>
    </div>

    <div className="col">
      {review?.title && <h4 className={styles.reviewHead}>{review.title}</h4>}
      <p>{review?.review}</p>

      {Array.isArray(review?.image_urls) && review.image_urls.length > 0 && (
        <div className="d-flex flex-wrap gap-2 mb-2">
          {review.image_urls.map((url, i) => (
            <Image
              key={`${review?.id}-${i}`}
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
);

const ReviewRating = ({ product }) => {
  const [showAll, setShowAll] = useState(false);
  const [showReviewPopup, setShowReviewPopup] = useState(false);

  const [rating, setRating] = useState("1");
  const [reviewHeading, setReviewHeading] = useState("");
  const [reviewDescription, setReviewDescription] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState("");

  const summary = product?.rating_summary;
  const reviews = Array.isArray(product?.reviews) ? product.reviews : [];

  const average = Number(summary?.average_rating) || 0;
  const totalReviews = Number(summary?.total_reviews) || 0;
  const breakdown = Array.isArray(summary?.rating_breakdown)
    ? [...summary.rating_breakdown].sort((a, b) => b.star - a.star) // 5 → 1
    : [5, 4, 3, 2, 1].map((star) => ({ star, count: 0, percentage: 0 }));

  const visibleReviews = reviews.slice(0, MAX_VISIBLE_REVIEWS);
  const hasMore = reviews.length < MAX_VISIBLE_REVIEWS;
  const hasReviews = totalReviews > 0 || reviews.length > 0;
  const canReview = Boolean(product?.can_review);

  const openReviewPopup = () => {
    setSubmitError("");
    setShowReviewPopup(true);
  };

  const resetForm = () => {
    setRating("1");
    setReviewHeading("");
    setReviewDescription("");
    setSubmitError("");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (submitting) return;

    const reviewData = {
      rating: Number(rating),
      title: reviewHeading.trim(),
      review: reviewDescription.trim(),
    };

    setSubmitting(true);
    setSubmitError("");
  };

  return (
    <>
      <section
        id="reviews"
        className={`${styles.reviewSection} sitePadding py-5`}
      >
        <div className="container-fluid">
          <div className="text-center py-4 vstack align-items-center staggerList">
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
                {canReview && (
                  <button
                    type="button"
                    className="ctaBtn ctaBlack"
                    onClick={openReviewPopup}
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
                    {breakdown.map(({ star, percentage }) => {
                      const pct = Math.round(Number(percentage) || 0);
                      return (
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
                            aria-valuenow={pct}
                            aria-valuemin={0}
                            aria-valuemax={100}
                          >
                            <div
                              className="progress-bar"
                              style={{ "--pbWidth": `${pct}%` }}
                            ></div>
                          </div>
                          <div className="col-2 text-start">{pct}%</div>
                        </div>
                      );
                    })}
                  </div>
                </div>

                <div className="col-md-auto d-md-block d-none">
                  <div className="vr h-100"></div>
                </div>

                <div className="col-md col-12">
                  <div
                    className={`${styles.overallreview} text-center mx-auto float-md-start`}
                  >
                    <div className="mx-auto d-inline-block">
                      <div className={styles.prodRating}>
                        {average.toFixed(1)}
                      </div>
                      <div className={styles.ratingBox}>
                        <div
                          className={`${styles.ratedStars} ${starClass(average)}`}
                        ></div>
                      </div>
                      <small className="d-block mb-3">
                        Average rating based on {totalReviews}{" "}
                        {totalReviews === 1 ? "Review" : "Reviews"}
                      </small>
                      <div className="">
                        <button
                          type="button"
                          className="ctaBtn arw w-100"
                          // disabled={!canReview}
                          onClick={openReviewPopup}
                        >
                          Write your review
                        </button>
                      </div>
                    </div>
                    {!canReview && (
                      <div className="d-flex mt-2">
                        <small className="text-danger">
                          (Only customers who purchased this product can write a
                          review.)
                        </small>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            )}
          </div>

          {visibleReviews.length > 0 && (
            <div className="row justify-content-center g-4 mb-4 reviewBoxList staggerList">
              {visibleReviews.map((review) => (
                <div className="col-lg-4 animateThis fadeIn" key={review?.id}>
                  <ReviewCard review={review} />
                </div>
              ))}

              {hasMore && (
                <div className="col-12 text-center">
                  <button
                    type="button"
                    className="ctaBtn white arw"
                    onClick={() => setShowAll(true)}
                  >
                    View All Reviews
                  </button>
                </div>
              )}
            </div>
          )}
        </div>

        {/* All reviews popup */}
        <CustomPopup
          isOpen={showAll}
          onClose={() => setShowAll(false)}
          wide
          maxWidth={"1140px"}
        >
          <div className={`${styles.reviewSection} p-4 rounded`}>
            <h3 className="sectionHead_sm mb-3">
              Reviews ({totalReviews || reviews.length})
            </h3>
            <div
              className="d-flex flex-column gap-4"
              style={{ maxHeight: "70vh", overflowY: "auto" }}
            >
              {reviews.map((review) => (
                <ReviewCard key={review?.id} review={review} />
              ))}
            </div>
          </div>
        </CustomPopup>
      </section>

      <CustomPopup
        isOpen={showReviewPopup}
        onClose={() => setShowReviewPopup(false)}
        // maxWidth="600px"
      >
        <div className="p-sm-5 rounded " style={{ border: "5px solid #fc0" }}>
          <h3 className="sectionHead mb-4">Write a Review</h3>

          <form
            className={`${styles.reviewForm} row g-3 formFormat`}
            onSubmit={handleSubmit}
          >
            <div className="col-12">
              <label className="mb-2">
                Your Rating <span>*</span>
              </label>

              <div className={styles.ratingScale}>
                {[1, 2, 3, 4, 5].map((star) => (
                  <React.Fragment key={star}>
                    <input
                      type="radio"
                      name="myRating"
                      id={`reviewStar${star}`}
                      value={star}
                      checked={rating === String(star)}
                      onChange={(e) => setRating(e.target.value)}
                      required
                    />
                    <label
                      htmlFor={`reviewStar${star}`}
                      className={styles[`s${star}`]}
                      title={`${star} Star${star > 1 ? "s" : ""}`}
                    >
                      {star} Star{star > 1 ? "s" : ""}
                    </label>
                  </React.Fragment>
                ))}
              </div>
            </div>

            <div className="col-12">
              <input
                type="text"
                name="reviewHeading"
                className="form-control"
                placeholder="Review Heading* (eg: Amazing Product)"
                value={reviewHeading}
                onChange={(e) => setReviewHeading(e.target.value)}
                required
              />
            </div>

            <div className="col-12">
              <textarea
                name="reviewDescription"
                className="form-control"
                style={{ minHeight: "100px" }}
                placeholder="Description*"
                value={reviewDescription}
                onChange={(e) => setReviewDescription(e.target.value)}
                required
              />
            </div>

            {submitError && (
              <div className="col-12">
                <small className="text-danger">{submitError}</small>
              </div>
            )}

            <div className="col-12 text-center pt-4">
              <button
                type="submit"
                className="ctaBtn arw"
                disabled={submitting}
              >
                {submitting ? "Submitting..." : "Submit Review"}
              </button>
            </div>
          </form>
        </div>
      </CustomPopup>
    </>
  );
};

export default ReviewRating;
