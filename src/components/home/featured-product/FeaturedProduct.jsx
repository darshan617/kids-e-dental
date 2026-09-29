import ProductCard from "@/common-component/product-card/ProductCard";
import { useRouter } from "next/router";
import React from "react";

const FeaturedProduct = () => {

  const router = useRouter();

  return (
    <section class="sitePadding py-sm-5 py-4">
      <div class="container-fluid">
        <div class="row g-sm-4 g-3 justify-content-between">
          <div class="col-md-auto order-md-1 animateThis slideRight">
            <h2 class="sectionHead fw-bold">Featured Products</h2>
          </div>
          <div class="col-12 order-md-3 position-relative animateThis slideLeft">
            <div class="swiper productSlider z-1 position-relative">
              <div class="swiper-wrapper pb-md-5 pb-4">
                <div class="swiper-slide">
                    <ProductCard />
                </div>
              </div>

              <div class="swiper-pagination end-0 psPagination"></div>
            </div>

            <div class="swiperNaviBtns d-none d-md-flex justify-content-between gap-3">
              <div class="swiperNaviBtn psPrev">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="16"
                  height="16"
                  fill="currentColor"
                  viewBox="0 0 16 16"
                >
                  <path d="M11.354 1.646a.5.5 0 0 1 0 .708L5.707 8l5.647 5.646a.5.5 0 0 1-.708.708l-6-6a.5.5 0 0 1 0-.708l6-6a.5.5 0 0 1 .708 0" />
                </svg>
              </div>
              <div class="swiperNaviBtn psNext">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="16"
                  height="16"
                  fill="currentColor"
                  viewBox="0 0 16 16"
                >
                  <path d="M4.646 1.646a.5.5 0 0 1 .708 0l6 6a.5.5 0 0 1 0 .708l-6 6a.5.5 0 0 1-.708-.708L10.293 8 4.646 2.354a.5.5 0 0 1 0-.708" />
                </svg>
              </div>
            </div>
          </div>
          <div class="col-12 col-md-auto order-md-2 text-center animateThis fadeIn ">
            <a onClick={() => router.push("/product-listing")}  class="ctaBtn arw ">
              View All Products
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};

export default FeaturedProduct;
