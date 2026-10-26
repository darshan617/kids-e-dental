"use client";

import React, { useEffect, useMemo, useRef } from "react";
import Swiper from "swiper";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import { Navigation, Pagination } from "swiper/modules";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import Cookies from "js-cookie";

import CanineMasterKit from "@/assets/images/products/Canine-Master-Kit.jpg";
import styles from "@/common-component/product-card/ProductCard.module.css";
import { useGetHomeDataQuery } from "@/redux/apis/homeApi";
import { useToast } from "@/custom-hooks/toast/ToastProvider";
import { useAddToCartMutation } from "@/redux/apis/addToCartApi";
import { useAddToWishlistMutation } from "@/redux/apis/addToWishlistApi";

const PRODUCT_ROUTE = "/product-details";

const IMAGE_BASE = process.env.NEXT_PUBLIC_IMAGE_BASE_URL || "";

const toImageUrl = (path) => {
  if (!path) return null;
  if (/^https?:\/\//i.test(path)) return path;
  return `${IMAGE_BASE.replace(/\/$/, "")}/${String(path).replace(/^\//, "")}`;
};

const formatPrice = (n) =>
  new Intl.NumberFormat("en-IN", {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(Number(n) || 0);

const getUserData = () => {
  try {
    const raw = Cookies?.get("userData");
    return raw ? JSON?.parse(decodeURIComponent(raw)) : null;
  } catch {
    return null;
  }
};

const normalizeProduct = (item) => {
  const sellingPrice = Number(item?.selling_price ?? item?.price ?? 0);
  const mrp = Number(item?.price ?? 0);

  const firstGallery = Array.isArray(item?.gallery) ? item?.gallery[0] : null;
  const galleryUrl =
    typeof firstGallery === "string"
      ? firstGallery
      : firstGallery?.url || firstGallery?.image || firstGallery?.path;

  return {
    id: item?.id,
    slug: item?.slug,
    name: item?.name,
    image: toImageUrl(item?.thumbnail || galleryUrl),
    price: sellingPrice,
    oldPrice: mrp > sellingPrice ? mrp : null,
    rating: item?.average_rating ?? item?.rating ?? 0,
    reviews: item?.total_reviews ?? item?.review_count ?? 0,
    tag: item?.badge,
    isVariable: Boolean(item.is_variable || item.product_type === "variable"),
  };
};

export const ProductCard = ({
  id,
  slug,
  name = "",
  image,
  price = 0,
  oldPrice = null,
  rating = 0,
  reviews = 0,
  tag = "New",
  isVariable = false,
}) => {
  const [addToCart, { isLoading: isCartLoading }] = useAddToCartMutation();
  const [addToWishlist, { isLoading: isWishlistLoading }] =
    useAddToWishlistMutation();
  const { showToast } = useToast();
  const router = useRouter();

  const detailsHref = slug ? `${PRODUCT_ROUTE}/${slug}` : "#";

  const addItem = async () => {
    if (isVariable) {
      router.push(detailsHref);
      return false;
    }

    try {
      const res = await addToCart({
        body: { product_id: id, quantity: 1 },
      }).unwrap();
      showToast(res?.message || "Added to cart", "success");
      return true;
    } catch (error) {
      showToast(error?.data?.message || "Failed to add to cart", "error");
      return false;
    }
  };

  const handleAddToCart = () => addItem();

  const handleBuyNow = async () => {
    const ok = await addItem();
    if (ok) router.push("/cart");
  };

  const handleAddToWishlist = async () => {
    const userData = getUserData();
    if (!userData) {
      showToast("Please log in to use the wishlist", "error");
      return;
    }

    const res = await addToWishlist({
      body: {
        user_id: userData?.id,
        product_id: id,
        variant_id: null,
      },
    });

    if (res.error) {
      showToast(
        res.error?.data?.message || "Failed to add to wishlist",
        "error",
      );
      return;
    }

    if (res?.data?.success || res?.data?.status) {
      showToast(res?.data?.message || "Added to wishlist", "success");
    } else {
      showToast(res?.data?.message || "Failed to add to wishlist", "error");
    }
  };

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
                onClick={handleAddToWishlist}
                disabled={isWishlistLoading}
                type="button"
                data-bs-toggle="button"
                className={styles.wishlistBtn}
                title="Add to Wishlist"
                aria-label="Add to Wishlist"
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
            <strong className="pibProdPrice">₹ {formatPrice(price)}</strong>

            {oldPrice && (
              <del className="pibStikePrice opacity-50">
                ₹ {formatPrice(oldPrice)}
              </del>
            )}
          </div>
        </div>

        <div
          className={`${styles.pibBtns} d-flex justify-content-center mt-auto gap-2 p-3 position-relative z-3`}
        >
          <button
            type="button"
            className={`${styles.pibBtn} ${styles.cartBtn}`}
            onClick={handleAddToCart}
            disabled={isCartLoading}
          >
            {isVariable ? "Select Options" : "Add to Cart"}
          </button>

          <button
            type="button"
            className={`${styles.pibBtn} ${styles.buyBtn}`}
            onClick={handleBuyNow}
            disabled={isCartLoading}
          >
            Buy Now
          </button>
        </div>

        <Link href={detailsHref} className="stretched-link" title={name} />
      </div>
    </div>
  );
};

const ProductSlider = ({ products }) => {
  const swiperRef = useRef(null);
  const prevRef = useRef(null);
  const nextRef = useRef(null);
  const paginationRef = useRef(null);

  const hasCustomProducts = Array.isArray(products) && products.length > 0;

  const { data: homeResult } = useGetHomeDataQuery(undefined, {
    skip: hasCustomProducts,
  });

  const items = useMemo(() => {
    const source = hasCustomProducts
      ? products
      : homeResult?.data?.featured_products;

    return Array.isArray(source) ? source.map(normalizeProduct) : [];
  }, [hasCustomProducts, products, homeResult]);

  useEffect(() => {
    if (!swiperRef.current || items.length === 0) return;

    const swiper = new Swiper(swiperRef.current, {
      modules: [Navigation, Pagination],
      slidesPerView: 1.3,
      spaceBetween: 10,
      speed: 500,
      navigation: {
        nextEl: nextRef.current,
        prevEl: prevRef.current,
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

  if (items?.length === 0) return null;

  return (
    <div className="position-relative">
      <div className="productSlider swiper" ref={swiperRef}>
        <div className="swiper-wrapper">
          {items?.map((product) => (
            <div className="swiper-slide" key={product?.id}>
              <ProductCard {...product} />
            </div>
          ))}
        </div>
      </div>

      <button
        ref={prevRef}
        className="psPrev"
        type="button"
        aria-label="Previous"
      />
      <button
        ref={nextRef}
        className="psNext"
        type="button"
        aria-label="Next"
      />
      <div
        ref={paginationRef}
        className="swiper-pagination end-0 psPagination"
      ></div>
    </div>
  );
};

export default ProductSlider;
