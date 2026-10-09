import Image from "next/image";
import React, { useState } from "react";
import distributorImg from "@/assets/images/distributorImg.png";
import styles from "@/components/product-listing/ProductListing.module.css";
import { ProductCard } from "@/common-component/product-card/ProductCard";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";
import { VscSettings } from "react-icons/vsc";
import { useGetCategoryDataQuery } from "@/redux/apis/categoryApi";

const PRODUCTS_PER_PAGE = 12;
const MIN_PRICE = 1000;
const MAX_PRICE = 50000;
const MIN_GAP = 1000;

const allProducts = Array.from({ length: 13 }, (_, i) => ({
  id: i + 1,
  name: "Kids-e-Crown",
  categoryId: (i % 5) + 1,
  subId: String((i % 4) + 1),
}));

const genders = [
  { id: "genderBoy", label: "Boy" },
  { id: "genderGirl", label: "Girl" },
];

const sortOptions = [
  { value: "recent", label: "Recently Added" },
  { value: "relevance", label: "Relevance" },
  { value: "price-asc", label: "Price (low-high)" },
  { value: "price-desc", label: "Price (high-low)" },
  { value: "brand-asc", label: "Brands (A-Z)" },
  { value: "brand-desc", label: "Brands (Z-A)" },
];

const closeIconPath =
  "M2.146 2.854a.5.5 0 1 1 .708-.708L8 7.293l5.146-5.147a.5.5 0 0 1 .708.708L8.707 8l5.147 5.146a.5.5 0 0 1-.708.708L8 8.707l-5.146 5.147a.5.5 0 0 1-.708-.708L7.293 8z";

const formatCategory = (category) => ({
  id: category.id,
  label: category.name,
  subs: (category.subcategories ?? []).map((sub) => ({
    id: String(sub.id),
    label: sub.name,
  })),
});

function Pagination({ currentPage, totalPages, onChange }) {
  if (totalPages <= 1) return null;

  const pages = Array.from({ length: totalPages }, (_, i) => i + 1);

  const goToPage = (event, page) => {
    event.preventDefault();
    if (page >= 1 && page <= totalPages) onChange(page);
  };

  return (
    <nav aria-label="Page navigation">
      <ul
        className={`${styles.paginationStyle} pagination justify-content-center py-4`}
      >
        <li className={`page-item ${currentPage === 1 ? "disabled" : ""}`}>
          <a
            className="page-link"
            href="#"
            aria-label="Previous"
            onClick={(e) => goToPage(e, currentPage - 1)}
          >
            <FaChevronLeft />
          </a>
        </li>

        {pages.map((page) => (
          <li
            key={page}
            className={`page-item ${currentPage === page ? "active" : ""}`}
            aria-current={currentPage === page ? "page" : undefined}
          >
            <a
              className="page-link"
              href="#"
              onClick={(e) => goToPage(e, page)}
            >
              {page}
            </a>
          </li>
        ))}

        <li
          className={`page-item ${currentPage === totalPages ? "disabled" : ""}`}
        >
          <a
            className="page-link"
            href="#"
            aria-label="Next"
            onClick={(e) => goToPage(e, currentPage + 1)}
          >
            <FaChevronRight />
          </a>
        </li>
      </ul>
    </nav>
  );
}

function FilterSection({ id, title, open = false, children }) {
  return (
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
}

function CheckboxList({ items }) {
  return (
    <ul className={styles.afiContent}>
      {items.map((item) => (
        <li key={item.id}>
          <input className="form-check-input" type="checkbox" id={item.id} />
          <label className="form-check-label" htmlFor={item.id}>
            {item.label}
          </label>
        </li>
      ))}
    </ul>
  );
}

function CategoryFilter({
  categories,
  selectedCategory,
  selectedSubs,
  onSelectCategory,
  onToggleSub,
}) {
  return (
    <ul className={styles.afiContent}>
      {categories.map((category) => {
        const isOpen = selectedCategory === category.id;

        return (
          <li key={category.id}>
            <div className="w-100">
              <div className="d-flex align-items-center gap-2">
                <input
                  className="form-check-input"
                  type="checkbox"
                  id={`category_${category.id}`}
                  checked={isOpen}
                  onChange={() => onSelectCategory(isOpen ? null : category.id)}
                />
                <label
                  className="form-check-label"
                  htmlFor={`category_${category.id}`}
                >
                  {category.label}
                </label>
              </div>

              {isOpen && category.subs.length > 0 && (
                <ul className="list-unstyled ps-4 mt-3 mb-0">
                  {category.subs.map((sub) => (
                    <li
                      key={sub.id}
                      role="button"
                      onClick={() => onToggleSub(sub.id)}
                      style={{
                        cursor: "pointer",
                        fontWeight: selectedSubs.includes(sub.id) ? 700 : 400,
                      }}
                    >
                      {sub.label}
                    </li>
                  ))}
                </ul>
              )}
            </div>
          </li>
        );
      })}
    </ul>
  );
}

function PriceFilter() {
  const [minPrice, setMinPrice] = useState(MIN_PRICE);
  const [maxPrice, setMaxPrice] = useState(MAX_PRICE);

  const minPercent = (minPrice / MAX_PRICE) * 100;
  const maxPercent = (maxPrice / MAX_PRICE) * 100;

  const trackStyle = {
    background: `linear-gradient(to right, #eee ${minPercent}%, #ffcc00 ${minPercent}%, #ffcc00 ${maxPercent}%, #eee ${maxPercent}%)`,
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
          value={minPrice}
          onChange={(e) =>
            setMinPrice(Math.min(+e.target.value, maxPrice - MIN_GAP))
          }
        />
        <input
          type="range"
          className={styles.priceRange}
          min={MIN_PRICE}
          max={MAX_PRICE}
          value={maxPrice}
          onChange={(e) =>
            setMaxPrice(Math.max(+e.target.value, minPrice + MIN_GAP))
          }
        />
      </div>

      <div className="col-6">₹ {minPrice}</div>
      <div className="col-6 text-end">₹ {maxPrice}</div>
    </div>
  );
}

function FilterDrawer({ categories, isLoading, isError, applied, onApply }) {
  const [selectedCategory, setSelectedCategory] = useState(applied.category);
  const [selectedSubs, setSelectedSubs] = useState(applied.subs);

  const handleSelectCategory = (categoryId) => {
    setSelectedCategory(categoryId);
    setSelectedSubs([]); 
  };

  const handleToggleSub = (subId) => {
    setSelectedSubs(selectedSubs.includes(subId) ? [] : [subId]);
  };

  const handleClearAll = () => {
    setSelectedCategory(null);
    setSelectedSubs([]);
    onApply({ category: null, subs: [] });
  };

  const handleApply = () => {
    onApply({ category: selectedCategory, subs: selectedSubs });
  };

  let categoryContent;
  if (isLoading) {
    categoryContent = (
      <p className="small text-muted mb-0">Loading categories...</p>
    );
  } else if (isError) {
    categoryContent = (
      <p className="small text-danger mb-0">Failed to load categories.</p>
    );
  } else {
    categoryContent = (
      <CategoryFilter
        categories={categories}
        selectedCategory={selectedCategory}
        selectedSubs={selectedSubs}
        onSelectCategory={handleSelectCategory}
        onToggleSub={handleToggleSub}
      />
    );
  }

  return (
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
            <path d={closeIconPath} />
          </svg>
        </button>
      </div>

      <div className="offcanvas-body py-3">
        <div className={`${styles.filterBox} mb-3`}>
          <ul className="accdFilters clearfix" id="filterWrap">
            <FilterSection id="fltr_Category" title="Categories" open>
              {categoryContent}
            </FilterSection>

            <FilterSection id="fltr_Price" title="Price">
              <PriceFilter />
            </FilterSection>

            <FilterSection id="fltr_Gender" title="Gender">
              <CheckboxList items={genders} />
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
          onClick={handleClearAll}
        >
          Clear All
        </button>

        <button
          type="button"
          className={`${styles.ctaBtn} col p-3 ctaBtn`}
          data-bs-dismiss="offcanvas"
          onClick={handleApply}
        >
          Apply
        </button>
      </div>
    </div>
  );
}

function ProductListing() {
  const [currentPage, setCurrentPage] = useState(1);
  const [applied, setApplied] = useState({ category: null, subs: [] });

  const { data, isLoading, isError } = useGetCategoryDataQuery();
  const categories = (data?.data ?? []).map(formatCategory);

  const handleApply = (filters) => {
    setApplied(filters);
    setCurrentPage(1);
  };

  const filteredProducts = allProducts.filter((product) => {
    const categoryMatches =
      applied.category === null || product.categoryId === applied.category;

    const subMatches =
      applied.subs.length === 0 || applied.subs.includes(product.subId);

    return categoryMatches && subMatches;
  });

  const total = filteredProducts.length;
  const totalPages = Math.ceil(total / PRODUCTS_PER_PAGE);
  const startIndex = (currentPage - 1) * PRODUCTS_PER_PAGE;
  const endIndex = Math.min(startIndex + PRODUCTS_PER_PAGE, total);
  const visibleProducts = filteredProducts.slice(startIndex, endIndex);

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
              <strong className="textPrimary">{visibleProducts.length}</strong>{" "}
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
              <VscSettings /> Filters
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
              {sortOptions.map((option) => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>
          </div>
        </div>
      </div>

      <div className="container-fluid sitePadding py-5 pt-0">
        <div className={`row g-5 ${styles.productListing}`}>
          {visibleProducts.length === 0 ? (
            <p className="text-center">No products found.</p>
          ) : (
            visibleProducts.map((product) => (
              <div className="col-6 col-md-4 col-xl-3" key={product.id}>
                <ProductCard {...product} />
              </div>
            ))
          )}
        </div>

        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          onChange={setCurrentPage}
        />
      </div>

      <FilterDrawer
        categories={categories}
        isLoading={isLoading}
        isError={isError}
        applied={applied}
        onApply={handleApply}
      />
    </>
  );
}

export default ProductListing;