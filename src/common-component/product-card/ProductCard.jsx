import React, { useEffect, useMemo, useRef } from "react";
import Swiper from "swiper";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

import CanineMasterKit from "@/assets/images/products/Canine-Master-Kit.jpg";
import styles from "@/common-component/product-card/ProductCard.module.css";
import Image from "next/image";
import { useGetHomeDataQuery } from "@/redux/apis/homeApi";

export const ProductCard = ({
  id,
  name = "",
  image,
  price = "",
  oldPrice = "",
  rating = "",
  reviews = "",
  tag = "New",
}) => {
  return (
    <div className="order-md-3 position-relative animateThis slideLeft">
      <div className={styles.prodItemBox}>
        <div className="p-3 p-lg-4 vstack gap-1 h-100">
          <div className="d-flex justify-content-between align-items-center position-relative z-3">
            <div>
              <div className={styles.pibTag}>{tag || "New"}</div>
            </div>

            <div className={`${styles.pibWL} align-self-end`}>
              <button
                type="button"
                data-bs-toggle="button"
                className={styles.wishlistBtn}
                title="Add to Wishlist"
              ></button>
            </div>
          </div>

          <div className={`${styles.pibImgBox} mx-auto`}>
            <Image
              src={image || CanineMasterKit}
              alt={name}
              width={200}
              height={200}
              className={`${styles.pibProdImg} w-100 h-auto`}
            />
          </div>

          <div className={`${styles.pibReview} hstack gap-2`}>
            <span className={styles.pibStar}>{rating}</span> ({reviews} Reviews)
          </div>

          <div>
            <h3 className={`${styles.pibProdName} mb-0 text-truncate`}>
              {name}
            </h3>
          </div>

          <div
            className={`${styles.pibPriceBox} d-flex align-items-center gap-2`}
          >
            <strong className="pibProdPrice">₹ {price}</strong>

            {oldPrice && (
              <del className="pibStikePrice opacity-50">
                ₹ {oldPrice} 
              </del>
            )}
          </div>
        </div>

        <div
          className={`${styles.pibBtns} d-flex justify-content-center mt-auto gap-2 p-3 position-relative z-3`}
        >
          <button className={`${styles.pibBtn} ${styles.cartBtn}`}>
            Add to Cart
          </button>

          <button className={`${styles.pibBtn} ${styles.buyBtn}`}>
            Buy Now
          </button>
        </div>

        <a href="" className="stretched-link" title={name}></a>
      </div>
    </div>
  );
};

const defaultProducts = Array.from({ length: 8 }, (_, i) => ({
  id: i + 1,
}));

const ProductSlider = ({ products = defaultProducts }) => {
  const swiperRef = useRef(null);
  const swiperInstance = useRef(null);

  const { data: homeResult } = useGetHomeDataQuery();

  const featuredProducts = useMemo(() => {
    const productsList = homeResult?.data?.featured_products;

    if (!Array.isArray(productsList) || productsList.length === 0) {
      return [];
    }

    return productsList.map((item) => ({
      id: item.id,
      name: item.name,
      image: item.thumbnail,
      price: item.selling_price ?? item.price,
      oldPrice: item.selling_price ? item.price : null,
      rating: item.average_rating ?? 0,
      reviews: item.total_reviews ?? 0,
      tag: item.badge,
    }));
  }, [homeResult]);

  useEffect(() => {
    if (!swiperRef.current || featuredProducts.length === 0) return;

    swiperInstance.current = new Swiper(swiperRef.current, {
      slidesPerView: 1.3,
      spaceBetween: 10,
      speed: 500,

      navigation: {
        nextEl: ".psNext",
        prevEl: ".psPrev",
      },

      pagination: {
        el: ".psPagination",
        clickable: true,
      },

      breakpoints: {
        500: { slidesPerView: 2, spaceBetween: 15 },
        900: { slidesPerView: 3, spaceBetween: 15 },
        1200: { slidesPerView: 4, spaceBetween: 20 },
        1600: { slidesPerView: 5, spaceBetween: 20 },
      },
    });

    return () => {
      if (swiperInstance.current) {
        swiperInstance.current.destroy(true, true);
        swiperInstance.current = null;
      }
    };
  }, [featuredProducts]);

  const items =
    featuredProducts.length > 0 ? featuredProducts : products;

  return (
    <div className="position-relative">
      <div className="productSlider swiper" ref={swiperRef}>
        <div className="swiper-wrapper">
          {items.map((product, index) => (
            <div className="swiper-slide" key={product.id ?? index}>
              <ProductCard {...product} />
            </div>
          ))}
        </div>
      </div>

      <div className="swiper-pagination end-0 psPagination"></div>
    </div>
  );
};

export default ProductSlider;