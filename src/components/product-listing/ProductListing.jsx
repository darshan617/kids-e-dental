import Image from "next/image";
import React, { useState } from "react";
import distributorImg from "@/assets/images/distributorImg.png";
import styles from "@/components/product-listing/ProductListing.module.css";
import { ProductCard } from "@/common-component/product-card/ProductCard";

/* ---------- Config & data ---------- */

const PRODUCTS_PER_PAGE = 2;
const MIN_PRICE = 1000;
const MAX_PRICE = 50000;
const MIN_GAP = 1000;

const allProducts = Array.from({ length: 3 }, (_, i) => ({
  id: i + 1,
  name: "Kids-e-Crown",
}));

const CATEGORIES = Array.from({ length: 8 }, (_, i) => ({
  id: `category_${i + 1}`,
  label: `Category ${i + 1}`,
}));

const GENDERS = [
  { id: "genderBoy", label: "Boy" },
  { id: "genderGirl", label: "Girl" },
];

const SORT_OPTIONS = [
  { value: "recent", label: "Recently Added" },
  { value: "relevance", label: "Relevance" },
  { value: "price-asc", label: "Price (low-high)" },
  { value: "price-desc", label: "Price (high-low)" },
  { value: "brand-asc", label: "Brands (A-Z)" },
  { value: "brand-desc", label: "Brands (Z-A)" },
];

const paginationStyle = {
  "--bs-pagination-active-bg": "var(--primary)",
  "--bs-pagination-color": "#111",
  "--bs-pagination-active-color": "#111",
  "--bs-pagination-active-border-color": "var(--primary)",
  "--bs-pagination-hover-color": "#111",
  "--bs-pagination-focus-color": "#111",
  "--bs-pagination-focus-box-shadow": "none",
};

/* ---------- Small icons ---------- */

const Icon = ({ path, className, fillRule }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="16"
    height="16"
    fill="currentColor"
    viewBox="0 0 16 16"
    className={className}
  >
    <path fillRule={fillRule} d={path} />
  </svg>
);

const ICONS = {
  filter:
    "M11.5 2a1.5 1.5 0 1 0 0 3 1.5 1.5 0 0 0 0-3M9.05 3a2.5 2.5 0 0 1 4.9 0H16v1h-2.05a2.5 2.5 0 0 1-4.9 0H0V3zM4.5 7a1.5 1.5 0 1 0 0 3 1.5 1.5 0 0 0 0-3M2.05 8a2.5 2.5 0 0 1 4.9 0H16v1H6.95a2.5 2.5 0 0 1-4.9 0H0V8zm9.45 4a1.5 1.5 0 1 0 0 3 1.5 1.5 0 0 0 0-3m-2.45 1a2.5 2.5 0 0 1 4.9 0H16v1h-2.05a2.5 2.5 0 0 1-4.9 0H0v-1z",
  prev: "M11.354 1.646a.5.5 0 0 1 0 .708L5.707 8l5.647 5.646a.5.5 0 0 1-.708.708l-6-6a.5.5 0 0 1 0-.708l6-6a.5.5 0 0 1 .708 0",
  next: "M4.646 1.646a.5.5 0 0 1 .708 0l6 6a.5.5 0 0 1 0 .708l-6 6a.5.5 0 0 1-.708-.708L10.293 8 4.646 2.354a.5.5 0 0 1 0-.708",
  close:
    "M2.146 2.854a.5.5 0 1 1 .708-.708L8 7.293l5.146-5.147a.5.5 0 0 1 .708.708L8.707 8l5.147 5.146a.5.5 0 0 1-.708.708L8 8.707l-5.146 5.147a.5.5 0 0 1-.708-.708L7.293 8z",
};

/* ---------- Pagination ---------- */

const Pagination = ({ currentPage, totalPages, onChange }) => {
  if (totalPages <= 1) return null;

  const go = (page) => (e) => {
    e.preventDefault();
    if (page >= 1 && page <= totalPages) onChange(page);
  };

  const pages = Array.from({ length: totalPages }, (_, i) => i + 1);

  return (
    <nav aria-label="Page navigation">
      <ul
        className="pagination justify-content-center py-4"
        style={paginationStyle}
      >
        <li className={`page-item ${currentPage === 1 ? "disabled" : ""}`}>
          <a
            className="page-link "
            href="#"
            aria-label="Previous"
            onClick={go(currentPage - 1)}
          >
            <Icon path={ICONS.prev} fillRule="evenodd" />
          </a>
        </li>

        {pages.map((page) => (
          <li
            key={page}
            className={`page-item ${currentPage === page ? "active" : ""}`}
            aria-current={currentPage === page ? "page" : undefined}
          >
            <a className="page-link" href="#" onClick={go(page)}>
              {page}
            </a>
          </li>
        ))}

        <li
          className={`page-item ${currentPage === totalPages ? "disabled" : ""}`}
        >
          <a
            className="page-link "
            href="#"
            aria-label="Next"
            onClick={go(currentPage + 1)}
          >
            <Icon path={ICONS.next} fillRule="evenodd" />
          </a>
        </li>
      </ul>
    </nav>
  );
};

/* ---------- Filters ---------- */

const FilterSection = ({ id, title, open = false, children }) => (
  <li>
    <button
      className={styles.rfiHead}
      type="button"
      data-bs-toggle="collapse"
      data-bs-target={`#${id}`}
      aria-expanded={open}
      aria-controls={id}
    >
      {title}
    </button>
    <div
      className={`collapse ${open ? "show" : ""}`}
      id={id}
      data-bs-parent="#filterWrap"
    >
      {children}
    </div>
  </li>
);

// A list of checkboxes from an array of { id, label }
const CheckboxList = ({ items }) => (
  <ul className={styles.afiContent}>
    {items.map(({ id, label }) => (
      <li key={id}>
        <input className="form-check-input" type="checkbox" id={id} />
        <label className="form-check-label" htmlFor={id}>
          {label}
        </label>
      </li>
    ))}
  </ul>
);

// Dual-handle price slider, driven by React state (no DOM queries)
const PriceFilter = () => {
  const [min, setMin] = useState(MIN_PRICE);
  const [max, setMax] = useState(MAX_PRICE);

  const minPct = (min / MAX_PRICE) * 100;
  const maxPct = (max / MAX_PRICE) * 100;

  const trackStyle = {
    background: `linear-gradient(to right, #eee ${minPct}%, #ffcc00 ${minPct}%, #ffcc00 ${maxPct}%, #eee ${maxPct}%)`,
  };

  return (
    <div className="row g-0 mb-4">
      <div className={`${styles.priceSliderContainer} col-12 mb-0`}>
        <div className={styles.sliderTrack} style={trackStyle} />
        <input
          type="range"
          className={styles.priceRange}
          min={MIN_PRICE}
          max={MAX_PRICE}
          value={min}
          onChange={(e) => setMin(Math.min(+e.target.value, max - MIN_GAP))}
        />
        <input
          type="range"
          className={styles.priceRange}
          min={MIN_PRICE}
          max={MAX_PRICE}
          value={max}
          onChange={(e) => setMax(Math.max(+e.target.value, min + MIN_GAP))}
        />
      </div>
      <div className="col-6">₹ {min}</div>
      <div className="col-6 text-end">₹ {max}</div>
    </div>
  );
};

const FilterDrawer = () => (
  <div
    className={`offcanvas offcanvas-start ${styles.filterMain}`}
    tabIndex="-1"
    id="filterMain"
  >
    <div
      className="offcanvas-header hstack justify-content-between py-1 pe-2"
      style={{ backgroundColor: "#f3f3f3" }}
    >
      <h5 className="offcanvas-title fs-6" style={{ fontWeight: "800" }}>
        FILTERS
      </h5>
      <button
        type="button"
        className={`${styles.searchClose} ${styles.headBtn} rounded-circle bg-white`}
        data-bs-dismiss="offcanvas"
        aria-label="Close"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="currentColor"
          viewBox="0 0 16 16"
        >
          <path d={ICONS.close} />
        </svg>
      </button>
    </div>

    <div className="offcanvas-body py-3">
      <div className={`${styles.filterBox} mb-3`}>
        <ul className="accdFilters clearfix" id="filterWrap">
          <FilterSection id="fltr_Category" title="Categories" open>
            <CheckboxList items={CATEGORIES} />
          </FilterSection>

          <FilterSection id="fltr_Price" title="Price">
            <PriceFilter />
          </FilterSection>

          <FilterSection id="fltr_Gender" title="Gender">
            <CheckboxList items={GENDERS} />
          </FilterSection>
        </ul>
      </div>
    </div>

    <div
      className="d-flex p-3 gap-3 flex-nowrap"
      style={{ backgroundColor: "#f3f3f3" }}
    >
      <button
        type="button"
        className={`${styles.ctaBtn} col p-3 ctaBtn white`}
        data-bs-dismiss="offcanvas"
      >
        Clear All
      </button>
      <button
        type="button"
        className={`${styles.ctaBtn} col p-3 ctaBtn`}
        data-bs-dismiss="offcanvas"
      >
        Apply
      </button>
    </div>
  </div>
);

/* ---------- Main component ---------- */

const ProductListing = () => {
  const [currentPage, setCurrentPage] = useState(1);

  const total = allProducts.length;
  const totalPages = Math.ceil(total / PRODUCTS_PER_PAGE);
  const startIndex = (currentPage - 1) * PRODUCTS_PER_PAGE;
  const endIndex = Math.min(startIndex + PRODUCTS_PER_PAGE, total);

  const visibleProducts = allProducts.slice(startIndex, endIndex);
  const showingFrom = total === 0 ? 0 : startIndex + 1;

  return (
    <>
      {/* Banner */}
      <section
        className="py-5 bgPrimary position-relative container-fluid sitePadding d-flex justify-content-md-center align-items-center overflow-hidden"
        style={{ marginBottom: "-25px" }}
      >
        <Image
          src={distributorImg}
          alt="distributorImg"
          className="position-absolute top-0 start-50 end-0 mx-auto animateThis slideRight w-auto h-100"
        />
        <h1 className="sectionHead py-md-4 fw-bold animateThis slideTop">
          Products
        </h1>
      </section>

      <div className="container-fluid sitePadding">
        <div
          className={`${styles.filterSortWrap} d-flex flex-wrap align-items-stretch overflow-hidden mb-sm-5 mb-4 rounded shadow-lg`}
        >
          <div
            className={`${styles.prodListCount} col-sm col-12 order-sm-2 p-2 d-flex justify-content-center align-items-center text-center`}
            style={{ fontSize: "85%" }}
          >
            <span>
              Showing{" "}
              <strong className="textPrimary">
                {showingFrom}-{endIndex}
              </strong>{" "}
              out of <span>{total}</span> Products
            </span>
          </div>

          <div className="col-sm col-6 order-sm-1">
            <button
              className={styles.filterSortBtn}
              type="button"
              data-bs-toggle="offcanvas"
              data-bs-target="#filterMain"
            >
              <Icon path={ICONS.filter} fillRule="evenodd" className="me-2" />
              Filters
            </button>
          </div>

          <div className="col-sm col-6 order-sm-3 text-end">
            <select
              className={`${styles.filterSortBtn} form-select rounded-0`}
              defaultValue=""
            >
              <option value="" disabled>
                Sort By
              </option>
              {SORT_OPTIONS.map(({ value, label }) => (
                <option key={value} value={value}>
                  {label}
                </option>
              ))}
            </select>
          </div>
        </div>
      </div>

      {/* Product grid + pagination */}
      <div className="container-fluid sitePadding">
        <div className={`row g-5  ${styles.productListing}`}>
          {visibleProducts.map((product) => (
            <div className="col-6 col-md-4 col-xl-3" key={product.id}>
              <ProductCard {...product} />
            </div>
          ))}
        </div>

        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          onChange={setCurrentPage}
        />
      </div>

      <FilterDrawer />
    </>
  );
};

export default ProductListing;
