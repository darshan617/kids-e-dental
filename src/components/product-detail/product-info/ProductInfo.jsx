"use client";

import React, { useEffect, useMemo, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import Swiper from "swiper";
import { Navigation, Pagination, Thumbs } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import { Fancybox } from "@fancyapps/ui";
import "@fancyapps/ui/dist/fancybox/fancybox.css";
import { CiHeart } from "react-icons/ci";
import delivery from "@/assets/images/fast-delivery.png";
import styles from "@/components/product-detail/product-info/ProductInfo.module.css";
import { IoShareSocialOutline } from "react-icons/io5";
const formatPrice = (n) =>
  new Intl.NumberFormat("en-IN", {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(Number(n) || 0);

const ProductInfo = ({ product }) => {
  const variants = product?.variants ?? [];
  const variantTypes = product?.variant_types ?? [];
  const isVariable = Boolean(product?.is_variable) && variantTypes.length > 0;
  const initialVariant = product?.selected_variant;

  const [arch, setArch] = useState(
    initialVariant?.arch ?? variantTypes[0]?.arch ?? null,
  );
  const [size, setSize] = useState(
    String(initialVariant?.size ?? variantTypes[0]?.available_sizes?.[0] ?? ""),
  );
  const [qty, setQty] = useState(1);
  const [wishlisted, setWishlisted] = useState(Boolean(product?.is_wishlist));
  const [openItem, setOpenItem] = useState(null);
  const [pincode, setPincode] = useState("");
  const [deliveryMsg, setDeliveryMsg] = useState(null);

  const gallery = useMemo(
    () => [...new Set((product?.gallery ?? []).filter(Boolean))],
    [product],
  );

  const sizeOptions =
    variantTypes.find((v) => v.arch === arch)?.available_sizes ?? [];

  const selectedVariant = variants.find(
    (v) => v.arch === arch && String(v.size) === String(size),
  );

  const sellingPrice = Number(
    selectedVariant?.selling_price ?? product.selling_price ?? 0,
  );
  const mrp = Number(selectedVariant?.price ?? product.price ?? 0);
  const hasDiscount = mrp > sellingPrice && sellingPrice > 0;
  const discountPct = hasDiscount
    ? Math.round(((mrp - sellingPrice) / mrp) * 100)
    : 0;

  const stock = Number(selectedVariant?.quantity ?? product?.quantity ?? 0);
  const inStock = Boolean(
    selectedVariant ? selectedVariant.in_stock : product?.in_stock,
  );
  const maxQty = Math.max(1, Math.min(10, stock));

  const rating = product.rating_summary?.average_rating ?? 0;
  const totalReviews = product.rating_summary?.total_reviews ?? 0;

  const specs = product.specification ?? [];
  const features = product.key_features ?? [];

  const accordionItems = [
    (product?.description || product?.details) && {
      id: "pa_Descp",
      title: "Product Description",
      body: (
        <>
          {product?.description && (
            <div dangerouslySetInnerHTML={{ __html: product?.description }} />
          )}
          {product?.details && (
            <div dangerouslySetInnerHTML={{ __html: product?.details }} />
          )}
        </>
      ),
    },
    (specs?.length > 0 || features?.length > 0) && {
      id: "pa_material",
      title: "Key Specifications",
      body: (
        <>
          {[features, specs].map(
            (list, i) =>
              list.length > 0 && (
                <ul key={i}>
                  {list.map((t) => (
                    <li key={t}>{t}</li>
                  ))}
                </ul>
              ),
          )}
        </>
      ),
    },
    {
      id: "pa_ship",
      title: "Shipping and Returns",
      body: (
        <ul>
          <li>Free shipping on all orders</li>
          <li>Free returns within 30 days</li>
          <li>
            Limited editions and last-season items can only be refunded, but are
            not exchangeable due to limited stock
          </li>
        </ul>
      ),
    },
  ].filter(Boolean);

  useEffect(() => {
    const thumbsSwiper = new Swiper("#prodThumbs", {
      modules: [Thumbs],
      slidesPerView: "auto",
      spaceBetween: 12,
      watchSlidesProgress: true,
    });

    const mainSwiper = new Swiper("#prodMain", {
      modules: [Navigation, Pagination, Thumbs],
      navigation: { nextEl: "#prodNext", prevEl: "#prodPrev" },
      pagination: { el: "#prodPagination", clickable: true },
      thumbs: { swiper: thumbsSwiper },
    });

    Fancybox.bind('[data-fancybox="prodGallery"]');

    return () => {
      Fancybox.unbind('[data-fancybox="prodGallery"]');
      Fancybox.close();
      mainSwiper.destroy(true, true);
      thumbsSwiper.destroy(true, true);
    };
  }, [gallery?.length]);

  const changeArch = (nextArch) => {
    const available =
      variantTypes.find((v) => v.arch === nextArch)?.available_sizes ?? [];
    setArch(nextArch);
    if (!available.map(String).includes(String(size))) {
      setSize(String(available[0] ?? ""));
    }
    setQty(1);
  };

  const changeSize = (nextSize) => {
    setSize(String(nextSize));
    setQty(1);
  };

  const changeQty = (value) => {
    const n = parseInt(value, 10);
    setQty(Number.isNaN(n) ? 1 : Math.min(maxQty, Math.max(1, n)));
  };

  const checkDelivery = () => {
    const valid = /^[1-9][0-9]{5}$/.test(pincode);
    setDeliveryMsg(
      valid
        ? { ok: true }
        : { ok: false, text: "Enter a valid 6-digit pincode." },
    );
  };

  const handleAddToCart = () => {};

  const handleBuyNow = () => {};

  const categoryHref = product?.category?.slug
    ? `/category/${product?.category?.slug}`
    : "#";

  return (
    <>
      <section
        className="sitePadding py-sm-3 py-2"
        style={{ background: "#fbfbfb" }}
      >
        <div className="container-fluid">
          <nav aria-label="breadcrumb">
            <ol className={`${styles.breadcrumb} mb-0`}>
              <li className={styles.breadcrumbItem}>
                <Link href="/">Home</Link>
              </li>
              {product?.category && (
                <li className={styles.breadcrumbItem}>
                  <Link href={categoryHref}>{product?.category?.name}</Link>
                </li>
              )}
              {product?.subcategory && (
                <li className={styles.breadcrumbItem}>
                  <Link href="#">{product?.subcategory?.name}</Link>
                </li>
              )}
              <li
                className={`${styles.breadcrumbItem} ${styles.active}`}
                aria-current="page"
              >
                {product?.name}
              </li>
            </ol>
          </nav>
        </div>
      </section>

      <section className="sitePadding py-3">
        <div className={`container-xl ${styles.prodPgWrap}`}>
          <div className="row justify-content-between mb-5">
            <div className="col-xl-5 col-lg-6">
              <div
                className={`${styles.productImgSlider} row flex-column position-sticky mx-sm-auto me-xl-5`}
              >
                <div className="col mb-4 mb-lg-0 px-0">
                  <div
                    id="prodMain"
                    className={`${styles.prodImgSwiper} swiper pb-4 pb-lg-0`}
                  >
                    <div className="swiper-wrapper">
                      {gallery.map((img, i) => (
                        <div className="swiper-slide" key={`main-${i}`}>
                          <a
                            href={img}
                            data-fancybox="prodGallery"
                            className={styles.picBox}
                          >
                            <Image
                              src={img}
                              alt={`${product?.name} image ${i + 1}`}
                              fill
                              sizes="(max-width: 992px) 100vw, 40vw"
                              priority={i === 0}
                            />
                          </a>
                        </div>
                      ))}
                    </div>
                    <div
                      id="prodNext"
                      className={`${styles.prodImgBtns} swiper-button-next`}
                    />
                    <div
                      id="prodPrev"
                      className={`${styles.prodImgBtns} swiper-button-prev`}
                    />
                    <div
                      id="prodPagination"
                      className="swiper-pagination d-lg-none"
                    />
                  </div>
                </div>

                <div className="col-auto d-none d-lg-block pt-3">
                  <div
                    id="prodThumbs"
                    className={`${styles.prodImgThumbSwiper} swiper`}
                  >
                    <div className="swiper-wrapper">
                      {gallery?.map((img, i) => (
                        <div className="swiper-slide" key={`thumb-${i}`}>
                          <div className={styles.pitBox}>
                            <Image
                              src={img}
                              alt={`${product?.name} thumbnail ${i + 1}`}
                              fill
                            />
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className={`col-lg-6 ${styles.productDetail}`}>
              <div className="d-flex gap-2 mb-2">
                <div className="col">
                  <h1 className={`${styles.prod_Name} mb-0`}>
                    {product?.name}
                  </h1>
                </div>
                <div className="col-auto">
                  <button
                    type="button"
                    className={`${styles.shareBtn} rounded-circle`}
                    data-bs-toggle="modal"
                    data-bs-target="#shareModal"
                    aria-label="Share"
                  >
                    <IoShareSocialOutline />
                  </button>
                </div>
              </div>

              <div className={`${styles.pibReview} hstack gap-2 mb-4`}>
                {totalReviews > 0 ? (
                  <>
                    <span className="pibStar">{rating}</span> ({totalReviews}{" "}
                    {totalReviews === 1 ? "Review" : "Reviews"})
                  </>
                ) : (
                  <span>No reviews yet</span>
                )}
              </div>

              {isVariable &&
                [
                  {
                    label: "Select Arch",
                    name: "arch",
                    options: variantTypes.map((v) => v.arch),
                    value: arch,
                    onChange: changeArch,
                  },
                  {
                    label: "Select Size",
                    name: "size",
                    options: sizeOptions,
                    value: size,
                    onChange: changeSize,
                  },
                ].map(({ label, name, options, value, onChange }) => (
                  <div className="mb-3" key={name}>
                    <small className="d-block mb-1 fw-medium">{label}</small>
                    <div
                      className={`btn-group ${styles.prodType} gap-2`}
                      role="group"
                      aria-label={label}
                    >
                      {options?.map((opt) => (
                        <React.Fragment key={opt}>
                          <input
                            type="radio"
                            className="btn-check"
                            name={name}
                            id={`${name}${opt}`}
                            autoComplete="off"
                            checked={String(value) === String(opt)}
                            onChange={() => onChange(opt)}
                          />
                          <label className="btn" htmlFor={`${name}${opt}`}>
                            {opt}
                          </label>
                        </React.Fragment>
                      ))}
                    </div>
                  </div>
                ))}

              <div className="mb-4">
                <small className="d-block mb-1 fw-medium">Quantity</small>
                <div
                  className={`${styles.quantitySpinner} input-group border rounded d-inline-flex`}
                >
                  <button
                    type="button"
                    className="btn bg-white border-0"
                    onClick={() => changeQty(qty - 1)}
                    aria-label="Decrease quantity"
                  >
                    -
                  </button>
                  <input
                    type="text"
                    inputMode="numeric"
                    value={qty}
                    onChange={(e) => changeQty(e.target.value)}
                    className="form-control border-0 text-center px-0"
                    aria-label="Quantity"
                  />
                  <button
                    type="button"
                    className="btn bg-white border-0"
                    onClick={() => changeQty(qty + 1)}
                    aria-label="Increase quantity"
                  >
                    +
                  </button>
                </div>
                <small
                  className={`d-block mt-1 ${inStock ? "text-success" : "text-danger"}`}
                >
                  {inStock ? "In Stock" : "Out of Stock"}
                </small>
              </div>

              <div className="d-flex align-items-center pi_price gap-4 mb-4 lh-sm">
                <div className="col-auto">
                  {hasDiscount && (
                    <del className="pibStikePrice opacity-50">
                      ₹ {formatPrice(mrp)}
                    </del>
                  )}
                  <div className={`${styles.prod_Price} fw-bolder`}>
                    ₹ {formatPrice(sellingPrice)}
                  </div>
                </div>
                {hasDiscount && (
                  <div className="col">
                    <div className={styles.offerTag}>
                      {discountPct}% <small className="d-block">Off</small>
                    </div>
                  </div>
                )}
              </div>

              <div className="d-flex flex-row flex-wrap gap-3 mb-5">
                <div className="col-12 text-center hstack gap-3">
                  <hr className="w-100" />
                  <button
                    type="button"
                    className={`wishlistBtn ${styles.prodDetWish} flex-shrink-0 ${
                      wishlisted ? "active" : ""
                    }`}
                    aria-pressed={wishlisted}
                    title="Add to Wishlist"
                    onClick={() => setWishlisted((v) => !v)}
                  >
                    <CiHeart size={20} /> Add to Wishlist
                  </button>
                  <hr className="w-100" />
                </div>
                <div className="col">
                  <button
                    type="button"
                    className={`${styles.pibBtn} ${styles.cartBtn} w-100`}
                    disabled={!inStock}
                    onClick={handleAddToCart}
                  >
                    Add to Cart
                  </button>
                </div>
                <div className="col">
                  <button
                    type="button"
                    className={`${styles.pibBtn} ${styles.buyBtn} w-100`}
                    disabled={!inStock}
                    onClick={handleBuyNow}
                  >
                    Buy Now
                  </button>
                </div>
              </div>

              <div
                className={`${styles.deliveryCheck} d-flex flex-wrap rounded p-3 gap-3 mb-4`}
              >
                <div className="col-12 lh-base text-secondary">
                  <strong className="d-block fw-bold text-uppercase text-dark">
                    Check Delivery
                  </strong>
                  Enter your pincode to check delivery availability and
                  estimated delivery time.
                </div>
                <div className="col-sm-9 col-10">
                  <div
                    className={`${styles.deliveryForm} input-group bg-black rounded-pill overflow-hidden`}
                  >
                    <input
                      type="text"
                      inputMode="numeric"
                      maxLength={6}
                      className="form-control bg-white border-0 rounded-pill"
                      placeholder="Enter Pincode"
                      aria-label="Enter Pincode"
                      value={pincode}
                      onChange={(e) =>
                        setPincode(e.target.value.replace(/\D/g, ""))
                      }
                      onKeyDown={(e) => e.key === "Enter" && checkDelivery()}
                    />
                    <button
                      className="btn bg-transparent ms-0"
                      type="button"
                      onClick={checkDelivery}
                    >
                      Check
                    </button>
                  </div>
                  {deliveryMsg && (
                    <div className="pt-2" role="status">
                      {deliveryMsg.ok ? (
                        <>
                          Standard delivery available to this location within{" "}
                          <strong className="txtRed d-inline-block">
                            2 working days
                          </strong>
                        </>
                      ) : (
                        <span className="text-danger">{deliveryMsg?.text}</span>
                      )}
                    </div>
                  )}
                </div>
                <Image src={delivery} className={styles.deliveryBg} />
              </div>

              <div className="prodBriefContent">
                {accordionItems.map(({ id, title, body }) => (
                  <div className={`${styles.pbcItem} py-4`} key={id}>
                    <div
                      className={styles.pbcHead}
                      role="button"
                      tabIndex={0}
                      aria-expanded={openItem === id}
                      aria-controls={id}
                      onClick={() => setOpenItem(openItem === id ? null : id)}
                      onKeyDown={(e) => {
                        if (e.key === "Enter" || e.key === " ") {
                          e.preventDefault();
                          setOpenItem(openItem === id ? null : id);
                        }
                      }}
                    >
                      {title}
                    </div>
                    <div
                      id={id}
                      className={`${styles.pbcBody} ${
                        openItem === id ? styles.pbcBodyOpen : ""
                      }`}
                    >
                      <div className={`${styles.prodDescp} pt-3`}>{body}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default ProductInfo;
