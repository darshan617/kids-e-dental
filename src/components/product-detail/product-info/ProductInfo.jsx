"use client";

import React, { useEffect, useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import Swiper from "swiper";
import { Navigation, Pagination, Thumbs } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import { Fancybox } from "@fancyapps/ui";
import "@fancyapps/ui/dist/fancybox/fancybox.css";

import styles from "@/components/product-detail/product-info/ProductInfo.module.css";
import PMCMK1 from "@/assets/images/products/PMCMK_1.jpg";
import PMCMK2 from "@/assets/images/products/PMCMK_2.jpg";
import PMCMK3 from "@/assets/images/products/PMCMK_3.jpg";
import PMCMK4 from "@/assets/images/products/PMCMK_4.jpg";
import { FaHeart } from "react-icons/fa";
import { CiHeart } from "react-icons/ci";

const galleryImages = [PMCMK1, PMCMK2, PMCMK3, PMCMK4];

const archOptions = [
  { id: "arch1", label: "Lower Left" },
  { id: "arch2", label: "Lower Right" },
  { id: "arch3", label: "Upper Left" },
  { id: "arch4", label: "Upper Right" },
];

const sizeOptions = [1, 2, 3, 4, 5, 6, 7];

const kitSpecs = [
  "Universal Design bands: No left and right side bands cut short the inventory and lessen the confusion.",
  "Shorter tube length: Helpful in small spaces",
  "316 L stainless steel wire used",
  "Laser marking on bands",
  "Laser brazing joints",
];

const accordionItems = [
  {
    id: "pa_Descp",
    title: "Product Description",
    body: (
      <>
        <p>
          Lorem ipsum, dolor sit amet consectetur adipisicing elit. Ducimus amet
          saepe repellat ullam quis veritatis corrupti dolorem molestias itaque,
          mollitia iste distinctio libero facilis voluptatem nemo ex et cum
          magni!
        </p>
        <p>
          <strong>With Accessories :</strong> <br /> Bands with tube - 74, Space
          components - 80, Straight - 30, Curved - 30, Distal Shoe - 20,
          Accessories - 2 (e-cutter - 1, e-crimper - 1)
        </p>
        <p>
          <strong>Without Accessories :</strong> <br /> Bands with tube - 74,
          Space components - 80, Straight - 30, Curved - 30, Distal Shoe - 20
        </p>
      </>
    ),
  },
  {
    id: "pa_material",
    title: "Key Specifications",
    body: (
      <>
        <p>
          <strong>With Accessories</strong>
        </p>
        <ul>
          {kitSpecs.map((t) => (
            <li key={t}>{t}</li>
          ))}
        </ul>
        <p>
          <strong>Without Accessories</strong>
        </p>
        <ul>
          {kitSpecs.map((t) => (
            <li key={t}>{t}</li>
          ))}
        </ul>
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
];

const ProductInfo = () => {
  const mainRef = useRef(null);
  const thumbsRef = useRef(null);
  const nextRef = useRef(null);
  const prevRef = useRef(null);
  const paginationRef = useRef(null);

  const [arch, setArch] = useState("arch1");
  const [size, setSize] = useState(4);
  const [qty, setQty] = useState(1);
  const [wishlisted, setWishlisted] = useState(false);
  const [openItem, setOpenItem] = useState(null);
  const [pincode, setPincode] = useState("");
  const [deliveryMsg, setDeliveryMsg] = useState(null);

  useEffect(() => {
    const thumbsSwiper = new Swiper(thumbsRef.current, {
      modules: [Thumbs],
      slidesPerView: "auto",
      spaceBetween: 12,
      watchSlidesProgress: true,
    });

    const mainSwiper = new Swiper(mainRef.current, {
      modules: [Navigation, Pagination, Thumbs],
      navigation: { nextEl: nextRef.current, prevEl: prevRef.current },
      pagination: { el: paginationRef.current, clickable: true },
      thumbs: { swiper: thumbsSwiper },
    });

    Fancybox.bind('[data-fancybox="prodGallery"]');

    return () => {
      Fancybox.unbind('[data-fancybox="prodGallery"]');
      Fancybox.close();
      mainSwiper.destroy(true, true);
      thumbsSwiper.destroy(true, true);
    };
  }, []);

  const changeQty = (value) => {
    const n = parseInt(value, 10);
    if (Number.isNaN(n)) return setQty(1);
    setQty(Math.min(10, Math.max(1, n)));
  };

  const checkDelivery = () => {
    if (/^[1-9][0-9]{5}$/.test(pincode)) {
      setDeliveryMsg({
        ok: true,
        text: "Standard delivery available to this location within 2 working days",
      });
    } else {
      setDeliveryMsg({ ok: false, text: "Enter a valid 6-digit pincode." });
    }
  };

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
              <li className={styles.breadcrumbItem}>
                <Link href="#">Restorative</Link>
              </li>
              <li className={styles.breadcrumbItem}>
                <Link href="#">Bioflx Crown</Link>
              </li>
              <li className={styles.breadcrumbItem}>
                <Link href="#">Permanent Molar Crowns</Link>
              </li>
              <li
                className={`${styles.breadcrumbItem} ${styles.active}`}
                aria-current="page"
              >
                Permanent Molar Crowns Master Kit
              </li>
            </ol>
          </nav>
        </div>
      </section>

      <section className="sitePadding py-3">
        <div className={`container-xl ${styles.prodPgWrap}`}>
          <div className="row justify-content-between mb-5">
            {/* Gallery */}
            <div className="col-xl-5 col-lg-6">
              <div
                className={`${styles.productImgSlider} row flex-column position-sticky mx-sm-auto me-xl-5`}
              >
                <div className="col mb-4 mb-lg-0 px-0">
                  <div
                    ref={mainRef}
                    className={`${styles.prodImgSwiper} swiper pb-4 pb-lg-0`}
                  >
                    <div className="swiper-wrapper">
                      {galleryImages.map((src, index) => (
                        <div className="swiper-slide" key={src.src}>
                          <a
                            href={src.src}
                            data-fancybox="prodGallery"
                            className={styles.picBox}
                          >
                            <Image
                              src={src}
                              alt={`Product image ${index + 1}`}
                              fill
                              sizes="(max-width: 992px) 100vw, 40vw"
                              priority={index === 0}
                            />
                          </a>
                        </div>
                      ))}
                    </div>
                    <div
                      ref={nextRef}
                      className={`${styles.prodImgBtns} swiper-button-next`}
                    ></div>
                    <div
                      ref={prevRef}
                      className={`${styles.prodImgBtns} swiper-button-prev`}
                    ></div>
                    <div
                      ref={paginationRef}
                      className="swiper-pagination d-lg-none"
                    ></div>
                  </div>
                </div>

                <div className="col-auto d-none d-lg-block pt-3">
                  <div
                    ref={thumbsRef}
                    className={`${styles.prodImgThumbSwiper} swiper`}
                  >
                    <div className="swiper-wrapper">
                      {galleryImages.map((src, index) => (
                        <div className="swiper-slide" key={src.src}>
                          <div className={styles.pitBox}>
                            <Image
                              src={src}
                              alt={`Product thumbnail ${index + 1}`}
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

            {/* Details */}
            <div className={`col-lg-6 ${styles.productDetail}`}>
              <div className="d-flex gap-2 mb-2">
                <div className="col">
                  <h1 className={`${styles.prod_Name} mb-0`}>
                    Bioflx Permanent Molar Crowns Master Kit
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
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="currentColor"
                      viewBox="0 0 16 16"
                      className={styles.shareIcon}
                    >
                      <path d="M13.5 1a1.5 1.5 0 1 0 0 3 1.5 1.5 0 0 0 0-3M11 2.5a2.5 2.5 0 1 1 .603 1.628l-6.718 3.12a2.5 2.5 0 0 1 0 1.504l6.718 3.12a2.5 2.5 0 1 1-.488.876l-6.718-3.12a2.5 2.5 0 1 1 0-3.256l6.718-3.12A2.5 2.5 0 0 1 11 2.5m-8.5 4a1.5 1.5 0 1 0 0 3 1.5 1.5 0 0 0 0-3m11 5.5a1.5 1.5 0 1 0 0 3 1.5 1.5 0 0 0 0-3" />
                    </svg>
                  </button>
                </div>
              </div>

              <div className={`${styles.pibReview} hstack gap-2 mb-4`}>
                <span className="pibStar">4.5</span> (35 Reviews)
              </div>

              <div className="mb-3">
                <small className="d-block mb-1 fw-medium">Select Arch</small>
                <div
                  className={`btn-group ${styles.prodType} gap-2`}
                  role="group"
                  aria-label="Select arch"
                >
                  {archOptions.map((o) => (
                    <React.Fragment key={o.id}>
                      <input
                        type="radio"
                        className="btn-check"
                        name="arch"
                        id={o.id}
                        autoComplete="off"
                        checked={arch === o.id}
                        onChange={() => setArch(o.id)}
                      />
                      <label className="btn" htmlFor={o.id}>
                        {o.label}
                      </label>
                    </React.Fragment>
                  ))}
                </div>
              </div>

              <div className="mb-3">
                <small className="d-block mb-1 fw-medium">Select Size</small>
                <div
                  className={`btn-group ${styles.prodType} gap-2`}
                  role="group"
                  aria-label="Select size"
                >
                  {sizeOptions.map((s) => (
                    <React.Fragment key={s}>
                      <input
                        type="radio"
                        className="btn-check"
                        name="size"
                        id={`size${s}`}
                        autoComplete="off"
                        checked={size === s}
                        onChange={() => setSize(s)}
                      />
                      <label className="btn" htmlFor={`size${s}`}>
                        {s}
                      </label>
                    </React.Fragment>
                  ))}
                </div>
              </div>

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
              </div>

              <div className="d-flex align-items-center pi_price gap-4 mb-4 lh-sm">
                <div className="col-auto">
                  <del className="pibStikePrice opacity-50">₹ 55,000.00</del>
                  <div className={`${styles.prod_Price} fw-bolder`}>
                    ₹ 40,000.00
                  </div>
                </div>
                <div className="col">
                  <div className={styles.offerTag}>
                    30% <small className="d-block">Off</small>
                  </div>
                </div>
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
                    <CiHeart size={20} /> {" "}
                    Add to Wishlist
                  </button>
                  <hr className="w-100" />
                </div>
                <div className="col">
                  <button
                    type="button"
                    className={`${styles.pibBtn} ${styles.cartBtn} w-100`}
                  >
                    Add to Cart
                  </button>
                </div>
                <div className="col">
                  <button
                    type="button"
                    className={`${styles.pibBtn} ${styles.buyBtn} w-100`}
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
                        <span className="text-danger">{deliveryMsg.text}</span>
                      )}
                    </div>
                  )}
                </div>

                <svg
                  className={styles.deliveryBg}
                  viewBox="0 0 682.66669 682.66669"
                  xmlns="http://www.w3.org/2000/svg"
                  aria-hidden="true"
                  style={{
                    fill: "none",
                    stroke: "#fff",
                    strokeWidth: 15,
                    strokeLinecap: "round",
                    strokeLinejoin: "round",
                    strokeMiterlimit: 10,
                    strokeOpacity: 0.8,
                  }}
                >
                  <g transform="matrix(1.3333333,0,0,-1.3333333,0,682.66667)">
                    <g transform="translate(460.8389,119.7256)">
                      <path d="m 0,0 c -4.745,-17.708 -22.947,-32.064 -40.656,-32.064 -17.709,0 -28.218,14.356 -23.473,32.064 4.745,17.709 22.947,32.065 40.656,32.065 C -5.764,32.065 4.745,17.709 0,0 Z" />
                    </g>
                    <g transform="translate(428.8545,119.7256)">
                      <path d="M 0,0 H -0.08" />
                    </g>
                    <g transform="translate(212.3389,119.7256)">
                      <path d="m 0,0 c -4.745,-17.708 -22.947,-32.064 -40.656,-32.064 -17.709,0 -28.218,14.356 -23.473,32.064 4.745,17.709 22.947,32.065 40.656,32.065 C -5.764,32.065 4.745,17.709 0,0 Z" />
                    </g>
                    <g transform="translate(180.3545,119.7256)">
                      <path d="M 0,0 H -0.08" />
                    </g>
                    <g transform="translate(212.3389,119.7256)">
                      <path d="M 0,0 H 184.371" />
                    </g>
                    <g transform="translate(336.1611,328.145)">
                      <path d="m 0,0 h 52.266 c 4.426,0 7.054,-3.589 5.868,-8.016 L 4.436,-208.419" />
                    </g>
                    <g transform="translate(148.21,119.7256)">
                      <path d="m 0,0 h -40.081 c -4.427,0 -7.054,3.589 -5.868,8.016 l 15.036,56.115" />
                    </g>
                    <g transform="translate(392.147,312.1128)">
                      <path d="m 0,0 h 67.916 c 7.23,0 12.268,-4.839 12.302,-11.814 l 0.365,-76.363 27.104,-19.379 c 4.053,-2.897 5.609,-8.115 4.1,-13.747 l -14.751,-55.051 c -2.372,-8.855 -11.473,-16.033 -20.328,-16.033 h -8.016" />
                    </g>
                    <g transform="translate(502.0703,183.855)">
                      <path d="M 0,0 H -16.032" />
                    </g>
                    <g transform="translate(453.9736,183.855)">
                      <path d="M 0,0 H -96.193" />
                    </g>
                    <g transform="translate(472.7295,223.9355)">
                      <path d="m 0,0 h -56.113 c -8.854,0 -14.109,7.178 -11.736,16.032 l 6.443,24.049 c 2.373,8.854 11.474,16.032 20.328,16.032 h 40.081" />
                    </g>
                    <g transform="translate(304.0967,312.1128)">
                      <path d="m 0,0 c 0,-61.98 -50.245,-112.226 -112.226,-112.226 -61.981,0 -112.226,50.246 -112.226,112.226 0,61.98 50.245,112.226 112.226,112.226 C -50.245,112.226 0,61.98 0,0 Z" />
                    </g>
                    <g transform="translate(207.9033,312.1128)">
                      <path d="m 0,0 c 0,-8.854 -7.178,-16.032 -16.032,-16.032 -8.855,0 -16.032,7.178 -16.032,16.032 0,8.854 7.177,16.032 16.032,16.032 C -7.178,16.032 0,8.854 0,0 Z" />
                    </g>
                    <g transform="translate(204.396,324.6382)">
                      <path d="M 0,0 43.588,43.587" />
                    </g>
                    <g transform="translate(159.8066,280.0483)">
                      <path d="M 0,0 20.04,20.041" />
                    </g>
                    <g transform="translate(191.8711,392.2744)">
                      <path d="M 0,0 V -8.016" />
                    </g>
                    <g transform="translate(191.8711,239.9678)">
                      <path d="M 0,0 V -8.016" />
                    </g>
                    <g transform="translate(272.0322,312.1128)">
                      <path d="M 0,0 H -8.016" />
                    </g>
                    <g transform="translate(119.7256,312.1128)">
                      <path d="M 0,0 H -8.016" />
                    </g>
                    <g transform="translate(87.6611,207.9033)">
                      <path d="M 0,0 H -80.161" />
                    </g>
                    <g transform="translate(79.645,175.8389)">
                      <path d="M 0,0 H -48.097" />
                    </g>
                    <g transform="translate(71.6289,143.7744)">
                      <path d="M 0,0 H -16.032" />
                    </g>
                  </g>
                </svg>
              </div>

              <div className="prodBriefContent">
                {accordionItems.map((item) => {
                  const isOpen = openItem === item.id;
                  return (
                    <div className={`${styles.pbcItem} py-4`} key={item.id}>
                      <div
                        className={styles.pbcHead}
                        role="button"
                        tabIndex={0}
                        aria-expanded={isOpen}
                        aria-controls={item.id}
                        onClick={() => setOpenItem(isOpen ? null : item.id)}
                        onKeyDown={(e) => {
                          if (e.key === "Enter" || e.key === " ") {
                            e.preventDefault();
                            setOpenItem(isOpen ? null : item.id);
                          }
                        }}
                      >
                        {item.title}
                      </div>
                      <div
                        id={item.id}
                        className={`${styles.pbcBody} ${
                          isOpen ? styles.pbcBodyOpen : ""
                        }`}
                      >
                        <div className={`${styles.prodDescp} pt-3`}>
                          {item.body}
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default ProductInfo;
