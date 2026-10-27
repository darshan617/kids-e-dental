import React from "react";
import styles from "@/components/home/banner/BannerShimmer.module.css";

const BannerShimmer = () => {
  return (
    <section
      className={styles.bannerShimmer}
      aria-hidden="true"
      role="presentation"
    >
      <div className={styles.shimmer} />
      <div className={`${styles.dots} sitePadding`}>
        <span />
        <span />
        <span />
      </div>
    </section>
  );
};

export default BannerShimmer;