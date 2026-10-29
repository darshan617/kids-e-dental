"use client";

import { FaChevronRight, FaChevronLeft } from "react-icons/fa";
import React, { useState, useRef, useEffect } from "react";
import styles from "@/components/product-detail/similar-product/SimilarProduct.module.css";
import {
  ProductCard,
  normalizeProduct,
} from "@/common-component/product-card/ProductCard";

const AUTOPLAY_DELAY = 3000;
const ANIMATION_MS = 350;

const getSliderConfig = (width) => {
  if (width <= 425) return { visibleCount: 2, gap: 5 };
  if (width <= 575) return { visibleCount: 2, gap: 14 };
  if (width <= 768) return { visibleCount: 2, gap: 16 };
  if (width <= 1199) return { visibleCount: 3, gap: 18 };
  return { visibleCount: 5, gap: 20 };
};

const SimilarProduct = ({ products = [] }) => {
  const visibleItems = Array.isArray(products) ? products.slice(0, 5) : [];

  const [currentIndex, setCurrentIndex] = useState(0);
  const [visibleCount, setVisibleCount] = useState(4);
  const [gap, setGap] = useState(16);
  const [isAnimating, setIsAnimating] = useState(false);
  const [autoplayKey, setAutoplayKey] = useState(0);
  const isPausedRef = useRef(false);

  useEffect(() => {
    const update = () => {
      const { visibleCount: count, gap: slideGap } = getSliderConfig(
        window.innerWidth,
      );
      setVisibleCount(count);
      setGap(slideGap);
    };
    update();
    window.addEventListener("resize", update);
    return () => window.removeEventListener("resize", update);
  }, []);

  const maxIndex = Math.max(0, visibleItems.length - visibleCount);

  useEffect(() => {
    setCurrentIndex((prev) => Math.min(prev, maxIndex));
  }, [maxIndex]);

  useEffect(() => {
    if (!visibleItems.length || maxIndex === 0) return undefined;

    const timer = setInterval(() => {
      if (isPausedRef.current) return;
      setIsAnimating(true);
      setCurrentIndex((prev) => (prev >= maxIndex ? 0 : prev + 1));
      setTimeout(() => setIsAnimating(false), ANIMATION_MS);
    }, AUTOPLAY_DELAY);

    return () => clearInterval(timer);
  }, [maxIndex, autoplayKey, visibleItems.length]);

  if (!visibleItems.length) return null;

  const isAtStart = currentIndex === 0;
  const isAtEnd = currentIndex >= maxIndex;

  const slide = (nextIndex) => {
    if (isAnimating) return;
    setIsAnimating(true);
    setCurrentIndex(nextIndex);
    setAutoplayKey((key) => key + 1);
    setTimeout(() => setIsAnimating(false), ANIMATION_MS);
  };

  const handleNext = () => {
    if (!isAtEnd) slide(currentIndex + 1);
  };

  const handlePrev = () => {
    if (!isAtStart) slide(currentIndex - 1);
  };

  const translatePct = (currentIndex / visibleCount) * 100;

  return (
    <div className="sitePadding">
      <div className={styles.titleContainer}>
        <h2 className={styles.title}>Similar Products</h2>
      </div>

      <div
        className={styles.sliderRoot}
        onMouseEnter={() => {
          isPausedRef.current = true;
        }}
        onMouseLeave={() => {
          isPausedRef.current = false;
        }}
      >
        <button
          type="button"
          className={`${styles.navBtn} ${styles.sideBtn} ${isAtStart ? styles.hidden : ""}`}
          onClick={handlePrev}
          aria-label="Previous"
        >
          <FaChevronLeft />
        </button>

        <div className={styles.viewport}>
          <div
            className={styles.track}
            style={{
              "--slide-gap": `${gap}px`,
              transform: `translateX(calc(-${translatePct}% - ${currentIndex * gap}px))`,
              transition: isAnimating
                ? "transform 0.35s cubic-bezier(0.25,0.46,0.45,0.94)"
                : "none",
            }}
          >
            {visibleItems.map((product) => (
              <div
                className={styles.slide}
                key={product?.id ?? product?.slug ?? product?.name}
                style={{
                  "--visible-count": visibleCount,
                  "--slide-gap": `${gap}px`,
                }}
              >
                <ProductCard {...normalizeProduct(product)} />
              </div>
            ))}
          </div>
        </div>

        <button
          type="button"
          className={`${styles.navBtn} ${styles.sideBtn} ${isAtEnd ? styles.hidden : ""}`}
          onClick={handleNext}
          aria-label="Next"
        >
          <FaChevronRight />
        </button>

        <div className={styles.mobileControls}>
          <button
            type="button"
            className={`${styles.navBtn} ${isAtStart ? styles.hidden : ""}`}
            onClick={handlePrev}
            aria-label="Previous"
          >
            <FaChevronLeft />
          </button>
          <button
            type="button"
            className={`${styles.navBtn} ${isAtEnd ? styles.hidden : ""}`}
            onClick={handleNext}
            aria-label="Next"
          >
            <FaChevronRight />
          </button>
        </div>
      </div>
    </div>
  );
};

export default SimilarProduct;
