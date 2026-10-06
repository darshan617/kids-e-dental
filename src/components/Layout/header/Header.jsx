"use client";

import Image from "next/image";
import React, { useEffect, useRef, useState } from "react";
import Logo from "@/assets/images/KidseDental_Logo.png";
import distributorImg from "@/assets/images/distributorImg.png";
import styles from "@/components/Layout/header/Header.module.css";
import { useRouter } from "next/router";
import AuthPopup from "@/common-component/auth-popup/AuthPopup";
import { BsCart, BsSearch } from "react-icons/bs";
import { FaMapMarkerAlt } from "react-icons/fa";
import { MdHeadsetMic } from "react-icons/md";
import { IoSearchOutline } from "react-icons/io5";
import Link from "next/link";

// Extracted Data Arrays
const TOP_BAR_LINKS = [
  {
    id: "country",
    label: "India",
    icon: <span className="fi fi-in"></span>,
    url: "",
  },
  {
    id: "distributor",
    label: "Become a Distributor",
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512">
        <path d="M200.7,80.1l49.7-49.7c3.1-3.1,8.2-3.1,11.3,0l49.7,49.7c3.1,3.1,3.1,8.2,0,11.3c-1.6,1.6-3.6,2.3-5.7,2.3H277v58.6c0,4.4-3.6,8-8,8h-25.9c-4.4,0-8-3.6-8-8V93.8h-28.8c-4.4,0-8-3.6-8-8C198.3,83.6,199.2,81.5,200.7,80.1L200.7,80.1z M460,114.8c-1.5-1.5-3.5-2.4-5.7-2.4c-4.4,0-8,3.6-8,8v28.7l-0.8,0c-46.3-0.8-79.4-1.4-82.4,66.4c-0.3,2.5,0.7,5.1,2.8,6.9c3.4,2.8,8.4,2.4,11.2-1c5-5.9,8.8-11,11.9-15.2c8.6-11.6,11.6-15.7,32.3-15.5c7.5,0.1,12,0.1,16.5,0.2c2.6,0,5.3,0.1,8.6,0.1v28.9c0,2,0.8,4.1,2.4,5.6c3.1,3.1,8.2,3.1,11.3,0l49.7-49.7c3.1-3.1,3.1-8.2,0-11.3L460,114.8z M2.3,164.5c-3.1,3.1-3.1,8.2,0,11.3l49.7,49.7c3.1,3.1,8.2,3.1,11.3,0c1.6-1.6,2.4-3.6,2.4-5.6v-28.9c3.3,0,5.9-0.1,8.6-0.1c4.5-0.1,9-0.1,16.5-0.2c20.7-0.2,23.7,3.9,32.3,15.5c3.1,4.2,6.8,9.2,11.9,15.2c2.8,3.4,7.9,3.8,11.2,1c2.1-1.8,3-4.4,2.8-6.9c-3-67.8-36.2-67.2-82.4-66.4l-0.8,0v-28.7c0-4.4-3.6-8-8-8c-2.2,0-4.2,0.9-5.7,2.4L2.3,164.5z M256,293.8l143.4-42.3l-137.2-52c-4.1-1.6-8.2-1.6-12.4,0l-137.3,52L256,293.8z M411.4,264.5c-0.4,0.2-0.8,0.3-1.2,0.4L264,308.1v175.8L399.3,444c7.5-2.2,12.5-8.9,12.5-16.8v-159C411.8,267,411.7,265.7,411.4,264.5L411.4,264.5z M248,308.1L101.8,265c-0.4-0.1-0.8-0.3-1.2-0.4c-0.3,1.2-0.4,2.4-0.4,3.7v159c0,7.9,5,14.5,12.5,16.8L248,483.9L248,308.1z" />
      </svg>
    ),
    url: "",
  },
  {
    id: "track",
    label: "Track Order",
    icon: <FaMapMarkerAlt size={22} />,
    url: "",
  },
  {
    id: "help",
    label: "Help Center",
    icon: <MdHeadsetMic size={22} />,
    url: "",
  },
];

const PRODUCT_LIST = [
  { id: 1, label: "Bioflx", url: "" },
  { id: 2, label: "Kids-e-Crown®", url: "" },
  { id: 3, label: "Scented-e-Pens", url: "" },
  { id: 4, label: "E Space Maintainer", url: "" },
  { id: 5, label: "e-Sdf®", url: "" },
  { id: 6, label: "e-MTA®", url: "" },
  { id: 7, label: "e-MTA Carrier", url: "" },
  { id: 8, label: "e-MTA Putty", url: "" },
  { id: 9, label: "e-MTA Sealer", url: "" },
  { id: 10, label: "e-IodoCal", url: "" },
  { id: 11, label: "e-Splint", url: "" },
  { id: 12, label: "Kids-e-Files", url: "" },
  { id: 13, label: "e-Pit And Fissure Sealant", url: "" },
  { id: 14, label: "Kids-e-Restore", url: "" },
];

const NAVIGATION_MENU = [
  { id: 1, label: "About Us", url: "/about-us" },
  { id: 2, label: "Products", isDropdown: true },
  { id: 3, label: "Catalogue", url: "" },
  { id: 4, label: "Education", url: "" },
  { id: 5, label: "Case Studies", url: "" },
  { id: 6, label: "Contact Us", url: "" },
];

const TRENDING_SEARCHES = [
  { id: 1, label: "e-MTA Sealer", url: "#" },
  { id: 2, label: "e-SPLINT", url: "#" },
  { id: 3, label: "Kids-e-Restore", url: "#" },
  { id: 4, label: "Crown & Space Maintainer", url: "#" },
  { id: 5, label: "Zirconia Crown", url: "#" },
];

const Header = () => {
  const headerRef = useRef(null);
  const [isAuthOpen, setIsAuthOpen] = useState(false);
  const router = useRouter();

  useEffect(() => {
    let ticking = false;

    function stickyRelocate() {
      const windowTop = window.scrollY || window.pageYOffset;
      const pageBody = document.querySelector(".pageBody");
      if (!pageBody) return;

      const isStuck = pageBody.classList.contains("stick");
      if (!isStuck && windowTop > 40) {
        pageBody.classList.add("stick");
      } else if (isStuck && windowTop < 10) {
        pageBody.classList.remove("stick");
      }
    }

    function onScroll() {
      if (!ticking) {
        requestAnimationFrame(() => {
          stickyRelocate();
          ticking = false;
        });
        ticking = true;
      }
    }

    window.addEventListener("scroll", onScroll, { passive: true });
    stickyRelocate();

    return () => {
      window.removeEventListener("scroll", onScroll);
    };
  }, []);

  return (
    <header ref={headerRef} className={`${styles.pageHeader} w-100`}>
      <div className={`${styles.headTop} bg-black text-white py-sm-3 py-1 container-fluid sitePadding`}>
        <div className="row">
          <div className="col text-center text-lg-start">
            India's Dedicated Pediatric Dental Products Brand
          </div>
          <div className="col-auto d-none d-lg-block">
            <div className={`${styles.headTopLinks} d-flex gap-5`}>
              {TOP_BAR_LINKS.map((link) => (
                <div key={link.id} className="col-auto">
                  <a onClick={() => router.push(link.url)} >
                    {link.icon} {link.label}
                  </a>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      <div className="bg-white py-3 container-fluid sitePadding">
        <div className="row justify-content-between align-items-center">
          <div className="col-auto order-xl-1">
            <a onClick={() => router.push("/")} className={styles.pgLogo}>
              <Image
                src={Logo}
                alt=""
                className={styles.pgLogoImg}
                sizes="(min-width: 1200px) 20vw, 200px"
              />
            </a>
          </div>
          <div className="col-auto order-xl-3">
            <div className={`${styles.headBtns} d-flex gap-xxl-4 gap-sm-3 gap-2`}>
              <div>
                <button
                  className={`${styles.headBtn} headBtn rounded-circle searchMenuBtn`}
                  title="Search"
                  type="button"
                  data-bs-toggle="collapse"
                  data-bs-target="#searchWrapper"
                  aria-expanded="false"
                  aria-controls="searchWrapper"
                >
                  <BsSearch size={28} />
                </button>
              </div>
              <div>
                <button
                  className={`${styles.headBtn} rounded-circle d-sm-none`}
                  title="Login"
                  type="button"
                  onClick={() => setIsAuthOpen(true)}
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="currentColor"
                    viewBox="0 0 16 16"
                  >
                    <path d="M8 8a3 3 0 1 0 0-6 3 3 0 0 0 0 6m2-3a2 2 0 1 1-4 0 2 2 0 0 1 4 0m4 8c0 1-1 1-1 1H3s-1 0-1-1 1-4 6-4 6 3 6 4m-1-.004c-.001-.246-.154-.986-.832-1.664C11.516 10.68 10.289 10 8 10s-3.516.68-4.168 1.332c-.678.678-.83 1.418-.832 1.664z" />
                  </svg>
                </button>
                <button
                  className={`${styles.loginBtn} ctaBtn d-none d-sm-block`}
                  title="Login"
                  type="button"
                  onClick={() => setIsAuthOpen(true)}
                >
                  Login/Signup
                </button>
              </div>
              <div>
                <Link href="/my-cart" 
                  className={`${styles.headBtn} rounded-circle`}
                  title="Cart"
                >
                  <span className={`${styles.badge} bgPrimary`}>0</span>
                  <BsCart size={28} />
                </Link>
              </div>
              <div className="d-xl-none">
                <button
                  className={`${styles.headBtn} rounded-circle`}
                  title="Menu"
                  data-bs-toggle="offcanvas"
                  data-bs-target="#navigation"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="currentColor"
                    viewBox="0 0 16 16"
                  >
                    <path
                      fillRule="evenodd"
                      d="M2.5 12a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5m0-4a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5m0-4a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5"
                    />
                  </svg>
                </button>
              </div>
            </div>
          </div>
          <div
            className={`${styles.navigation} col order-xl-2 offcanvas-xl offcanvas-end`}
            id="navigation"
          >
            <div className="d-xl-none w-100 px-3 py-2 text-end position-absolute start-0 z-3">
              <button
                type="button"
                className={`${styles.headBtn} rounded-circle float-end`}
                aria-label="Close"
                data-bs-toggle="offcanvas"
                data-bs-target="#navigation"
                style={{ height: "2rem", aspectRatio: "1" }}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="currentColor"
                  viewBox="0 0 16 16"
                >
                  <path d="M2.146 2.854a.5.5 0 1 1 .708-.708L8 7.293l5.146-5.147a.5.5 0 0 1 .708.708L8.707 8l5.147 5.146a.5.5 0 0 1-.708.708L8 8.707l-5.146 5.147a.5.5 0 0 1-.708-.708L7.293 8z" />
                </svg>
              </button>
            </div>

            <ul className={`${styles.siteMenu} d-xl-flex justify-content-end`}>
              {NAVIGATION_MENU.map((menuItem) => (
                <li key={menuItem.id}>
                  {menuItem.isDropdown ? (
                    <>
                      <a href="#productMenu" role="button" data-bs-toggle="collapse">
                        {menuItem.label}
                      </a>
                      <div
                        className={`${styles.subMenu} container-fluid sitePadding collapse`}
                        id="productMenu"
                      >
                        <div className="row g-xl-5 g-4 py-xl-4">
                          <div className="col-xl-4 col-12">
                            <div className="p-3 bgPrimary rounded-3 overflow-hidden position-relative">
                              <Image
                                src={distributorImg}
                                alt=""
                                className="w-100 h-auto"
                              />
                              <div className="position-absolute bottom-0 py-4 w-100 d-flex justify-content-center">
                                <a
                                  href=""
                                  className="ctaBtn arw white d-inline-block shadow-lg"
                                >
                                  View All Products
                                </a>
                              </div>
                            </div>
                          </div>
                          <div className="col-xl col-12">
                            <ul className="row g-1 row-cols-xl-3 row-cols-1">
                              {PRODUCT_LIST.map((product) => (
                                <li key={product.id}>
                                  <a onClick={() => router.push(product.url)}>{product.label}</a>
                                </li>
                              ))}
                            </ul>
                          </div>
                        </div>
                      </div>
                    </>
                  ) : (
                    <a onClick={() => router.push(menuItem.url)} >{menuItem.label}</a>
                  )}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>

      <div className={`${styles.searchWrapper} collapse`} id="searchWrapper">
        <div
          className="pt-sm-5 py-2 container-fluid sitePadding"
          style={{ background: "#f3f3f3" }}
        >
          <div className={`${styles.searchContainer} mx-auto vstack gap-4`}>
            <div
              className={`${styles.searchBarWrap} overflow-hidden d-flex align-items-center`}
            >
              <IoSearchOutline size={28} className="ms-2" />
              <input
                type="search"
                placeholder="Search for products, brands and more"
                className={`${styles.searchBar} w-100 h-100 px-5 rounded-pill`}
              />
            </div>

            <div className="row align-items-center suggestWrap g-0">
              <div className={`${styles.suggestTitle} col-md mb-1`}>
                Trending Search :
              </div>
              <div className="col-12 suggestTagList position-relative">
                <div className="hstack flex-wrap gap-2">
                  {TRENDING_SEARCHES.map((item) => (
                    <div key={item.id}>
                      <a href={item.url} className={styles.suggestTag}>
                        {item.label}
                      </a>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <div className="d-flex justify-content-center">
              <button
                className={`${styles.searchClose} ${styles.headBtn} rounded-circle bg-white`}
                data-bs-toggle="collapse"
                data-bs-target="#searchWrapper"
                aria-expanded="true"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="currentColor"
                  viewBox="0 0 16 16"
                >
                  <path d="M2.146 2.854a.5.5 0 1 1 .708-.708L8 7.293l5.146-5.147a.5.5 0 0 1 .708.708L8.707 8l5.147 5.146a.5.5 0 0 1-.708.708L8 8.707l-5.146 5.147a.5.5 0 0 1-.708-.708L7.293 8z" />
                </svg>
              </button>
            </div>
          </div>
        </div>
      </div>
      <AuthPopup isOpen={isAuthOpen} onClose={() => setIsAuthOpen(false)} />
    </header>
  );
};

export default Header;