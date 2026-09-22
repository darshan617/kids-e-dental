import React, { useEffect, useRef } from "react";
import Swiper from "swiper";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import CanineMasterKit from "@/assets/images/products/Canine-Master-Kit.jpg";
import styles from "@/common-component/product-card/ProductCard.module.css";
import Image from "next/image";

const ProductCard = () => {
  return (
    <div className={`${styles.prodItemBox}`}>
      <div className="p-3 p-lg-4 vstack gap-1 h-100">
        <div className="d-flex justify-content-between align-items-center position-relative z-3">
          <div>
            <div className={`${styles.pibTag}`}>New</div>
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
          <Image src={CanineMasterKit} className={`${styles.pibProdImg} w-100 h-auto`} />
        </div>
        <div className={`${styles.pibReview} hstack gap-2`}>
          <span className={styles.pibStar}>4.5</span> (35 Reviews)
        </div>
        <div className="">
          <h3 className={`${styles.pibProdName} mb-0 text-truncate`}>
            Kids-e-Crown
          </h3>
        </div>
        <div
          className={`${styles.pibPriceBox} d-flex align-items-center gap-2`}
        >
          <strong className="pibProdPrice">₹ 8343.00</strong>
          <del className="pibStikePrice opacity-50">₹ 9859.00</del>
        </div>
      </div>
      <div
        className={`${styles.pibBtns} d-flex justify-content-center mt-auto gap-2 p-3 position-relative z-3`}
      >
        <button className={`${styles.pibBtn} ${styles.cartBtn}`}>
          Add to Cart
        </button>
        <button className={`${styles.pibBtn} ${styles.buyBtn}`}>Buy Now</button>
      </div>
      <a href="" className="stretched-link" title="Kids-e-Crown"></a>
    </div>
  );
};

const ProductSlider = ({ products = [] }) => {
  const swiperRef = useRef(null);
  const swiperInstance = useRef(null);

  useEffect(() => {
    if (!swiperRef.current) return;

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
  }, [products]);

  const items = products.length > 0 ? products : [{ id: 1 }];

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

      {/* <button className="psPrev" type="button" aria-label="Previous">
        &#10094;
      </button>
      <button className="psNext" type="button" aria-label="Next">
        &#10095;
      </button> */}
      <div class="swiper-pagination end-0 psPagination"></div>
    </div>
  );
};

export default ProductSlider;
