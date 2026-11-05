"use client";

import Image from "next/image";
import { useCallback, useEffect, useRef, useState } from "react";
import distributorImg from "@/assets/images/home/distributorImg.png";
import styles from "@/components/product-listing/ProductListing.module.css";
import {
  ProductCard,
  normalizeProduct,
} from "@/common-component/product-card/ProductCard";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";
import { VscSettings } from "react-icons/vsc";
import { useGetCategoryDataQuery } from "@/redux/apis/categoryApi";
import { useProductListingQuery } from "@/redux/apis/productListingApi";
import { useLocation } from "@/custom-hooks/location/Location";

const PRODUCTS_PER_PAGE = 12;

const sortOptions = [
  { value: "recent", label: "Recently Added" },
  { value: "relevance", label: "Relevance" },
  { value: "price-asc", label: "Price (low-high)" },
  { value: "price-desc", label: "Price (high-low)" },
  { value: "brand-asc", label: "Brands (A-Z)" },
  { value: "brand-desc", label: "Brands (Z-A)" },
];

function Pagination({ currentPage, totalPages, onChange }) {
  if (totalPages <= 1) return null;

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
            onClick={(e) => {
              e.preventDefault();
              if (currentPage > 1) onChange(currentPage - 1);
            }}
          >
            <FaChevronLeft />
          </a>
        </li>

        {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
          <li
            key={page}
            className={`page-item ${currentPage === page ? "active" : ""}`}
            aria-current={currentPage === page ? "page" : undefined}
          >
            <a
              className="page-link"
              href="#"
              onClick={(e) => {
                e.preventDefault();
                onChange(page);
              }}
            >
              {page}
            </a>
          </li>
        ))}

        <li
          className={`page-item ${
            currentPage === totalPages ? "disabled" : ""
          }`}
        >
          <a
            className="page-link"
            href="#"
            aria-label="Next"
            onClick={(e) => {
              e.preventDefault();
              if (currentPage < totalPages) onChange(currentPage + 1);
            }}
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

function CategoryFilter({
  categories,
  selectedCategory,
  selectedSubs,
  selectedChildren,
  onSelectCategory,
  onToggleSub,
  onToggleChild,
}) {
  return (
    <ul className={styles.afiContent}>
      {categories?.map((category) => {
        const isOpen = selectedCategory === category?.id;

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

              {isOpen && category.subs?.length > 0 && (
                <ul className="list-unstyled ps-4 mt-3 mb-0">
                  {category.subs.map((sub) => {
                    const isSubSelected = selectedSubs?.includes(sub.id);

                    return (
                      <li
                        key={sub.id}
                        className="mb-2"
                        style={{ display: "block" }}
                      >
                        {/* Subcategory checkbox */}
                        <div className="d-flex align-items-center gap-2">
                          <input
                            className="form-check-input mt-0"
                            type="checkbox"
                            id={`sub_${sub.id}`}
                            checked={isSubSelected}
                            onChange={() => onToggleSub(sub.id)}
                          />
                          <label
                            className="form-check-label"
                            htmlFor={`sub_${sub.id}`}
                          >
                            {sub.label}
                          </label>
                        </div>

                        {/* Child categories, shown below the subcategory */}
                        {isSubSelected && sub.children?.length > 0 && (
                          <ul className="list-unstyled ps-4 mt-2 mb-0 w-100">
                            {sub.children.map((child) => (
                              <li
                                key={child.id}
                                className="mb-1"
                                style={{ display: "block" }}
                              >
                                <div className="d-flex align-items-center gap-2">
                                  <input
                                    className="form-check-input mt-0"
                                    type="checkbox"
                                    id={`child_${child.id}`}
                                    checked={selectedChildren?.includes(
                                      child.id,
                                    )}
                                    onChange={() => onToggleChild(child.id)}
                                  />
                                  <label
                                    className="form-check-label"
                                    htmlFor={`child_${child.id}`}
                                    style={{ fontSize: "90%" }}
                                  >
                                    {child.label}
                                  </label>
                                </div>
                              </li>
                            ))}
                          </ul>
                        )}
                      </li>
                    );
                  })}
                </ul>
              )}
            </div>
          </li>
        );
      })}
    </ul>
  );
}
function PriceFilter({ range, selectedRange, onChange }) {
  const { min_price: rangeMin, max_price: rangeMax } = range;
  const [minPrice, setMinPrice] = useState(
    selectedRange?.min ?? rangeMin,
  );
  const [maxPrice, setMaxPrice] = useState(
    selectedRange?.max ?? rangeMax,
  );
  const lastEmittedRange = useRef({ min: minPrice, max: maxPrice });
  const rangeSize = rangeMax - rangeMin;
  const minPercent =
    rangeSize > 0 ? ((minPrice - rangeMin) / rangeSize) * 100 : 0;
  const maxPercent =
    rangeSize > 0 ? ((maxPrice - rangeMin) / rangeSize) * 100 : 100;

  useEffect(() => {
    if (
      lastEmittedRange.current.min === minPrice &&
      lastEmittedRange.current.max === maxPrice
    ) {
      return;
    }

    const timeoutId = setTimeout(() => {
      const nextRange = { min: minPrice, max: maxPrice };
      lastEmittedRange.current = nextRange;
      onChange(nextRange);
    }, 500);

    return () => clearTimeout(timeoutId);
  }, [minPrice, maxPrice, onChange]);

  return (
    <div className="row g-0 mb-4">
      <div className={`${styles.priceSliderContainer} col-12 mb-0`}>
        <div
          className={styles.sliderTrack}
          style={{
            background: `linear-gradient(to right, #eee ${minPercent}%, #ffcc00 ${minPercent}%, #ffcc00 ${maxPercent}%, #eee ${maxPercent}%)`,
          }}
        />

        <input
          type="range"
          className={styles.priceRange}
          step={500}
          min={rangeMin}
          max={maxPrice}
          value={minPrice}
          onChange={(e) => setMinPrice(Number(e.target.value))}
        />

        <input
          type="range"
          className={styles.priceRange}
          step={500}
          min={minPrice}
          max={rangeMax}
          value={maxPrice}
          onChange={(e) => setMaxPrice(Number(e.target.value))}
        />
      </div>

      <div className="col-6">₹ {minPrice}</div>
      <div className="col-6 text-end">₹ {maxPrice}</div>
    </div>
  );
}

function FilterDrawer({
  categories,
  isLoading,
  isError,
  applied,
  priceRange,
  selectedPriceRange,
  priceFilterKey,
  onPriceRangeChange,
  onApply,
}) {
  const { isIndia } = useLocation();
  const [selectedCategory, setSelectedCategory] = useState(applied.category);
  const [selectedSubs, setSelectedSubs] = useState(applied.subs);
  const [selectedChildren, setSelectedChildren] = useState(applied.children);

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
            <path d="M2.146 2.854a.5.5 0 1 1 .708-.708L8 7.293l5.146-5.147a.5.5 0 0 1 .708.708L8.707 8l5.147 5.146a.5.5 0 0 1-.708.708L8 8.707l-5.146 5.147a.5.5 0 0 1-.708-.708L7.293 8z" />
          </svg>
        </button>
      </div>

      <div className="offcanvas-body py-3">
        <div className={`${styles.filterBox} mb-3`}>
          <ul className="accdFilters clearfix" id="filterWrap">
            <FilterSection id="fltr_Category" title="Categories" open>
              {isLoading ? (
                <p className="small text-muted mb-0">Loading categories...</p>
              ) : isError ? (
                <p className="small text-danger mb-0">
                  Failed to load categories.
                </p>
              ) : (
                <CategoryFilter
                  categories={categories}
                  selectedCategory={selectedCategory}
                  selectedSubs={selectedSubs}
                  selectedChildren={selectedChildren}
                  onSelectCategory={(categoryId) => {
                    setSelectedCategory(categoryId);
                    setSelectedSubs([]);
                    setSelectedChildren([]);
                  }}
                  onToggleSub={(subId) => {
                    setSelectedSubs((prev) =>
                      prev.includes(subId) ? [] : [subId],
                    );
                    setSelectedChildren([]);
                  }}
                  onToggleChild={(childId) =>
                    setSelectedChildren((prev) =>
                      prev.includes(childId) ? [] : [childId],
                    )
                  }
                />
              )}
            </FilterSection>

            {isIndia && (
              <FilterSection id="fltr_Price" title="Price">
                {priceRange ? (
                  <PriceFilter
                    key={`${priceFilterKey}:${priceRange.min_price}:${priceRange.max_price}`}
                    range={priceRange}
                    selectedRange={selectedPriceRange}
                    onChange={onPriceRangeChange}
                  />
                ) : (
                  <p className="small text-muted mb-0">
                    Loading price range...
                  </p>
                )}
              </FilterSection>
            )}
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
          onClick={() => {
            setSelectedCategory(null);
            setSelectedSubs([]);
            setSelectedChildren([]);
            onApply({ category: null, subs: [], children: [] });
          }}
        >
          Clear All
        </button>

        <button
          type="button"
          className={`${styles.ctaBtn} col p-3 ctaBtn`}
          data-bs-dismiss="offcanvas"
          onClick={() =>
            onApply({
              category: selectedCategory,
              subs: selectedSubs,
              children: selectedChildren,
            })
          }
        >
          Apply
        </button>
      </div>
    </div>
  );
}

function ProductListing() {
  const [currentPage, setCurrentPage] = useState(1);
  const [priceSelection, setPriceSelection] = useState(null);
  const [applied, setApplied] = useState({
    category: null,
    subs: [],
    children: [],
  });
  const [sortBy, setSortBy] = useState("");

  const {
    data: categoryData,
    isLoading: categoriesLoading,
    isError: categoriesError,
  } = useGetCategoryDataQuery();
  const categories = (categoryData?.data ?? []).map((category) => ({
    id: category.id,
    label: category.name,
    slug: category.slug,
    subs: (category.subcategories ?? []).map((sub) => ({
      id: String(sub.id),
      label: sub.name,
      slug: sub.slug,
      children: (sub.child_categories ?? []).map((child) => ({
        id: String(child.id),
        label: child.name,
        slug: child.slug,
      })),
    })),
  }));
  const selectedCategory = categories.find((c) => c.id === applied.category);
  const selectedSub = selectedCategory?.subs.find((sub) =>
    applied.subs.includes(sub.id),
  );
  const selectedChild = selectedSub?.children.find((child) =>
    applied.children.includes(child.id),
  );
  const filterKey = [
    selectedCategory?.slug,
    selectedSub?.slug,
    selectedChild?.slug,
  ].join("|");
  const selectedPriceRange =
    priceSelection?.filterKey === filterKey ? priceSelection : null;
  const handlePriceRangeChange = useCallback(
    (range) => setPriceSelection({ ...range, filterKey }),
    [filterKey],
  );

  const {
    data: productData,
    isLoading: productsLoading,
    isError: productsError,
  } = useProductListingQuery({
    category_slug: selectedCategory?.slug,
    subcategory_slug: selectedSub?.slug,
    child_category_slug: selectedChild?.slug,
    min_price: selectedPriceRange?.min,
    max_price: selectedPriceRange?.max,
  });
  const apiPriceRange = productData?.price_range;
  const rangeMin = Number(apiPriceRange?.min_price);
  const rangeMax = Number(apiPriceRange?.max_price);
  const priceRangeValues =
    apiPriceRange &&
    apiPriceRange.min_price !== undefined &&
    apiPriceRange.min_price !== null &&
    apiPriceRange.max_price !== undefined &&
    apiPriceRange.max_price !== null &&
    Number.isFinite(rangeMin) &&
    Number.isFinite(rangeMax) &&
    rangeMax >= rangeMin
      ? {
          min_price: rangeMin,
          max_price: rangeMax,
        }
      : null;

  const apiProducts = Array.isArray(productData?.data)
    ? productData.data
    : Array.isArray(productData?.data?.products)
      ? productData.data.products
      : Array.isArray(productData?.products)
        ? productData.products
        : [];

  const allProducts = apiProducts.map((product) => {
    const normalized = normalizeProduct(product);
    return {
      ...product,
      ...normalized,
      id: normalized.id ?? product.product_id,
      name:
        normalized.name ?? product.product_name ?? product.title ?? "Product",
    };
  });

  const sortedProducts = [...allProducts].sort((a, b) => {
    switch (sortBy) {
      case "price-asc":
        return (
          Number(a.price ?? a.selling_price ?? 0) -
          Number(b.price ?? b.selling_price ?? 0)
        );
      case "price-desc":
        return (
          Number(b.price ?? b.selling_price ?? 0) -
          Number(a.price ?? a.selling_price ?? 0)
        );
      case "brand-asc":
        return String(a.brand ?? "").localeCompare(String(b.brand ?? ""));
      case "brand-desc":
        return String(b.brand ?? "").localeCompare(String(a.brand ?? ""));
      case "recent":
        return (
          new Date(b.created_at ?? b.createdAt ?? 0).getTime() -
          new Date(a.created_at ?? a.createdAt ?? 0).getTime()
        );
      default:
        return 0;
    }
  });

  const total = sortedProducts.length;
  const totalPages = Math.ceil(total / PRODUCTS_PER_PAGE);
  const startIndex = (currentPage - 1) * PRODUCTS_PER_PAGE;

  const visibleProducts = sortedProducts.slice(
    startIndex,
    startIndex + PRODUCTS_PER_PAGE,
  );

  return (
    <>
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
              value={sortBy}
              onChange={(e) => {
                setSortBy(e.target.value);
                setCurrentPage(1);
              }}
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
        {productsLoading ? (
          <p className="text-center">Loading products...</p>
        ) : productsError ? (
          <p className="text-center text-danger">
            Failed to load products. Please try again.
          </p>
        ) : (
          <>
            <div
              className={`mb-5 row g-xl-5 g-lg-4 g-md-3 g-sm-2 g-1 row-cols-xl-4 row-cols-lg-4 row-cols-md-3 row-cols-2 ${styles.productListing}`}
            >
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
          </>
        )}
      </div>

      <FilterDrawer
        categories={categories}
        isLoading={categoriesLoading}
        isError={categoriesError}
        applied={applied}
        priceRange={priceRangeValues}
        selectedPriceRange={selectedPriceRange}
        priceFilterKey={filterKey}
        onPriceRangeChange={handlePriceRangeChange}
        onApply={(filters) => {
          setApplied(filters);
          setCurrentPage(1);
        }}
      />
    </>
  );
}

export default ProductListing;
