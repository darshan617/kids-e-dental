import { useEffect, useMemo, useRef } from "react";
import { useRouter } from "next/router";
import Swiper from "swiper";
import { Navigation, Pagination } from "swiper/modules";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";

import {
  ProductCard,
  normalizeProduct,
} from "@/common-component/product-card/ProductCard";
import { useGetHomeDataQuery } from "@/redux/apis/homeApi";

const FeaturedProduct = () => {
  const router = useRouter();

  const swiperRef = useRef(null);
  const prevRef = useRef(null);
  const nextRef = useRef(null);
  const paginationRef = useRef(null);

  const { data: homeResult } = useGetHomeDataQuery();

  const items = useMemo(() => {
    const source = homeResult?.data?.featured_products;
    return Array.isArray(source) ? source.map(normalizeProduct) : [];
  }, [homeResult]);

  useEffect(() => {
    if (!swiperRef.current || items.length === 0) return;

    const swiper = new Swiper(swiperRef.current, {
      modules: [Navigation, Pagination],
      slidesPerView: 1.3,
      spaceBetween: 10,
      speed: 500,
      navigation: {
        prevEl: prevRef.current,
        nextEl: nextRef.current,
      },
      pagination: {
        el: paginationRef.current,
        clickable: true,
      },
      breakpoints: {
        500: { slidesPerView: 2, spaceBetween: 15 },
        900: { slidesPerView: 3, spaceBetween: 15 },
        1200: { slidesPerView: 4, spaceBetween: 20 },
        1600: { slidesPerView: 5, spaceBetween: 20 },
      },
    });

    return () => swiper.destroy(true, true);
  }, [items]);

  return (
    <section className="sitePadding py-sm-5 py-4">
      <div className="container-fluid">
        <div className="row g-sm-4 g-3 justify-content-between">
          <div className="col-md-auto order-md-1 animateThis slideRight">
            <h2 className="sectionHead fw-bold">Featured Products</h2>
          </div>

          <div className="col-12 order-md-3 position-relative animateThis slideLeft">
            <div
              className="swiper productSlider z-1 position-relative"
              ref={swiperRef}
            >
              <div className="swiper-wrapper pb-md-5 pb-4">
                {items.map((product, index) => (
                  <div
                    className="swiper-slide"
                    key={product.wishlistId ?? product.id ?? index}
                  >
                    <ProductCard {...product} />
                  </div>
                ))}
              </div>

              <div
                className="swiper-pagination end-0 psPagination"
                ref={paginationRef}
              ></div>
            </div>

            <div className="swiperNaviBtns d-none d-md-flex justify-content-between gap-3">
              <div className="swiperNaviBtn psPrev" ref={prevRef}>
                <FaChevronLeft />
              </div>
              <div className="swiperNaviBtn psNext" ref={nextRef}>
                <FaChevronRight />
              </div>
            </div>
          </div>

          <div className="col-12 col-md-auto order-md-2 text-center animateThis fadeIn">
            <a
              onClick={() => router.push("/product-listing")}
              className="ctaBtn arw"
              style={{ cursor: "pointer" }}
            >
              View All Products
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};

export default FeaturedProduct;
