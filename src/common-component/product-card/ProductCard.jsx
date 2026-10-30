"use client";

import React, { useEffect, useMemo, useRef, useState } from "react";
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
import {
  useAddToWishlistMutation,
  useRemoveFromWishlistMutation,
} from "@/redux/apis/addToWishlistApi";
import CustomPopup from "../custom-popup/CustomPopup";

const PRODUCT_ROUTE = "/product-details";
const WISHLIST_PATH = "/wishlist";

const IMAGE_BASE = process.env.NEXT_PUBLIC_IMAGE_BASE_URL || "";

export const toImageUrl = (path) => {
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
    const raw = Cookies.get("userData");
    return raw ? JSON.parse(decodeURIComponent(raw)) : null;
  } catch {
    return null;
  }
};

export const normalizeProduct = (raw) => {
  const isNestedRow = Boolean(raw?.product && typeof raw.product === "object");
  const item = isNestedRow ? raw.product : raw;
  const isFlatRow = !isNestedRow && raw?.product_id != null;

  const sellingPrice = Number(item?.selling_price ?? item?.price ?? 0);
  const mrp = Number(item?.price ?? 0);
  const productId = item?.id ?? raw?.product_id ?? null;

  // Row id (wishlist / cart row) is kept separately.
  const wishlistId =
    raw?.wishlist_id ??
    raw?.cart_id ??
    (isNestedRow || isFlatRow ? raw?.id : null) ??
    null;

  const variants = Array.isArray(item?.variants)
    ? item.variants.map((v) => ({
        ...v,
        image: v?.image ? toImageUrl(v.image) : null,
      }))
    : [];

  return {
    id: productId,
    wishlistId,
    slug: item?.slug,
    name: item?.name,
    image: toImageUrl(item?.thumbnail),
    price: sellingPrice,
    oldPrice: mrp > sellingPrice ? mrp : null,
    rating: item?.average_rating ?? item?.rating ?? 0,
    reviews: item?.total_reviews ?? item?.review_count ?? 0,
    tag: item?.badge,
    variants,
    hasVariants:
      variants.length > 0 ||
      Boolean(item?.is_variant) ||
      Boolean(item?.is_variable),
  };
};

const toKey = (s) => String(s ?? "").trim();

const getVariantAttrs = (v) => {
  const attrs = {};
  const src = v?.attributes ?? v?.options ?? v?.variant_options;

  if (Array.isArray(src)) {
    src.forEach((a) => {
      const k = a?.type ?? a?.name ?? a?.attribute ?? a?.key;
      const val = a?.value ?? a?.label ?? a?.option;
      if (k != null && val != null) attrs[toKey(k)] = toKey(val);
    });
  } else if (src && typeof src === "object") {
    Object.entries(src).forEach(([k, val]) => {
      attrs[toKey(k)] = toKey(val?.name ?? val?.value ?? val);
    });
  }

  const arch = v?.arch ?? v?.arch_name ?? v?.arch_type;
  const size = v?.size ?? v?.size_name;
  if (arch != null && !attrs.Arch) attrs.Arch = toKey(arch);
  if (size != null && !attrs.Size) attrs.Size = toKey(size);

  if (Object.keys(attrs).length === 0) {
    const label = v?.name ?? v?.variant_name ?? v?.title;
    if (label) attrs.Option = toKey(label);
  }
  return attrs;
};

const VariantPopup = ({ product, onClose, onConfirm, loading }) => {
  const rows = useMemo(
    () =>
      (product.variants || []).map((variant) => ({
        variant,
        attrs: getVariantAttrs(variant),
      })),
    [product.variants],
  );

  const groups = useMemo(() => {
    const map = new Map();
    rows.forEach(({ attrs }) => {
      Object.entries(attrs).forEach(([label, value]) => {
        if (!map.has(label)) map.set(label, []);
        if (!map.get(label).includes(value)) map.get(label).push(value);
      });
    });
    return Array.from(map, ([label, values]) => ({ label, values }));
  }, [rows]);

  const [selected, setSelected] = useState(() => ({
    ...(rows[0]?.attrs || {}),
  }));
  const [qty, setQty] = useState(1);

  const findRow = (sel) =>
    rows.find(({ attrs }) =>
      groups.every((g) => attrs[g.label] === sel[g.label]),
    );

  const selectOption = (label, value) => {
    const next = { ...selected, [label]: value };
    if (findRow(next)) {
      setSelected(next);
    } else {
      const fallback = rows.find(({ attrs }) => attrs[label] === value);
      if (fallback) setSelected({ ...fallback.attrs });
    }
    setQty(1);
  };

  const matched = findRow(selected)?.variant;

  const rawStock = matched?.quantity ?? matched?.stock ?? matched?.qty;
  const stock =
    rawStock === undefined || rawStock === null || rawStock === ""
      ? null
      : Number(rawStock);
  const hasStockNumber = stock !== null && Number.isFinite(stock);
  const outOfStock = !matched || (hasStockNumber && stock <= 0);
  const maxQty = hasStockNumber && stock > 0 ? stock : Infinity;

  const hasOwnPrice = matched?.selling_price != null || matched?.price != null;
  const sellPrice = hasOwnPrice
    ? Number(matched.selling_price ?? matched.price)
    : Number(product.price) || 0;
  const mrp = hasOwnPrice
    ? Number(matched.price ?? 0)
    : Number(product.oldPrice ?? 0);
  const oldPrice = mrp > sellPrice ? mrp : null;

  // variant image first, then product image, then fallback
  const displayImage = matched?.image || product.image || CanineMasterKit;

  return (
    <CustomPopup isOpen onClose={onClose} maxWidth="520px">
      <div className={`${styles.vpWrap} p-3 p-md-4`}>
        <div className={styles.vpImgBox}>
          <Image
            src={displayImage}
            alt={product.name || "Product"}
            width={220}
            height={220}
            className={styles.vpImg}
          />
        </div>

        <h3 className={styles.vpTitle}>{product.name}</h3>

        {groups.map((g) => {
          const compact = g.values.every((val) => val.length <= 3);
          return (
            <div key={g.label}>
              <div className={styles.vpLabel}>Select {g.label}</div>
              <div className={styles.vpOptions}>
                {g.values.map((val) => (
                  <button
                    key={val}
                    type="button"
                    className={`${styles.variantOption} ${
                      compact ? styles.variantOptionSm : ""
                    } ${selected[g.label] === val ? styles.active : ""}`}
                    onClick={() => selectOption(g.label, val)}
                  >
                    {val}
                  </button>
                ))}
              </div>
            </div>
          );
        })}

        <div className={styles.vpLabel}>Quantity</div>
        <div className={styles.vpQty}>
          <button
            type="button"
            className={styles.vpQtyBtn}
            aria-label="Decrease quantity"
            disabled={qty <= 1}
            onClick={() => setQty((q) => Math.max(1, q - 1))}
          >
            −
          </button>
          <span className={styles.vpQtyVal}>{qty}</span>
          <button
            type="button"
            className={styles.vpQtyBtn}
            aria-label="Increase quantity"
            disabled={qty >= maxQty}
            onClick={() => setQty((q) => Math.min(maxQty, q + 1))}
          >
            +
          </button>
        </div>

        <div className={`${styles.vpStock} ${outOfStock ? styles.out : ""}`}>
          {!matched
            ? "Combination not available"
            : outOfStock
              ? "Out of Stock"
              : "In Stock"}
        </div>

        <div className={styles.vpPrice}>
          ₹ {formatPrice(sellPrice)}
          {oldPrice && (
            <del className={styles.vpOld}>₹ {formatPrice(oldPrice)}</del>
          )}
        </div>

        <button
          type="button"
          className={styles.vpAddBtn}
          disabled={loading || outOfStock}
          onClick={() => onConfirm(matched.id, qty)}
        >
          {loading ? "Adding..." : "Add to Cart"}
        </button>
      </div>
    </CustomPopup>
  );
};

export const ProductCard = ({
  id,
  wishlistId = null,
  slug,
  name = "",
  image,
  price = 0,
  oldPrice = null,
  rating = 0,
  reviews = 0,
  tag = "New",
  variants = [],
  hasVariants: hasVariantsFlag = false,
  path,
  onRemove,
}) => {
  const [addToCart, { isLoading: isCartLoading }] = useAddToCartMutation();
  const [addToWishlist, { isLoading: isWishlistLoading }] =
    useAddToWishlistMutation();
  const [removeFromWishlist, { isLoading: isRemoveWishlist }] =
    useRemoveFromWishlistMutation();
  const { showToast } = useToast();
  const router = useRouter();

  const [showVariants, setShowVariants] = useState(false);

  const hasVariants = Array.isArray(variants) && variants.length > 0;
  const needsDetailsPage = !hasVariants && hasVariantsFlag;
  const isWishlistPage = path === WISHLIST_PATH;
  const detailsHref = slug ? `${PRODUCT_ROUTE}/${slug}` : "#";

  const addItem = async (variantId = null, qty = 1) => {
    if (!id) {
      showToast("Product ID is missing", "error");
      return false;
    }

    try {
      const res = await addToCart({
        body: {
          product_id: id,
          variant_id: variantId ?? null,
          quantity: qty,
        },
      }).unwrap();

      showToast(res?.message || "Added to cart", "success");
      return true;
    } catch (error) {
      const message = error?.data?.message || "Failed to add to cart";

      if (/variant/i.test(message) && !variantId && slug) {
        router.push(detailsHref);
        return false;
      }

      showToast(message, "error");
      return false;
    }
  };

  const closeVariants = () => setShowVariants(false);

  const handleAddToCart = async () => {
    if (hasVariants) {
      setShowVariants(true);
      return;
    }
    if (needsDetailsPage) {
      router.push(detailsHref);
      return;
    }
    await addItem();
  };


  const handleConfirmVariant = async (variantId, qty) => {
    const ok = await addItem(variantId, qty);
    if (ok) closeVariants();
  };

  const handleAddToWishlist = async () => {
    const userData = getUserData();

    if (!userData?.id) {
      showToast("Please log in to use the wishlist", "error");
      return;
    }

    if (!id) {
      showToast("Product ID is missing", "error");
      return;
    }

    try {
      const res = await addToWishlist({
        body: {
          user_id: userData.id,
          product_id: id,
          variant_id: null,
        },
      }).unwrap();

      if (res?.success || res?.status) {
        showToast(res?.message || "Added to wishlist", "success");
      } else {
        showToast(res?.message || "Failed to add to wishlist", "error");
      }
    } catch (error) {
      showToast(error?.data?.message || "Failed to add to wishlist", "error");
    }
  };

  const handleRemoveFromWishlist = async () => {
    // Remove uses the product id, same as `product.id` in ProductInfo.
    if (id === undefined || id === null || id === "") {
      showToast("Product ID is missing", "error");
      return;
    }

    try {
      const res = await removeFromWishlist({
        body: { product_id: Number(id) },
      }).unwrap();

      if (res?.success || res?.status) {
        showToast(res?.message || "Removed from wishlist", "success");
      } else {
        showToast(res?.message || "Failed to remove from wishlist", "error");
      }
    } catch (error) {
      showToast(
        error?.data?.message || "Failed to remove from wishlist",
        "error",
      );
    }
  };

  const handleWishlistClick = () => {
    if (isWishlistPage) {
      if (onRemove) onRemove();
      else handleRemoveFromWishlist();
    } else {
      handleAddToWishlist();
    }
  };

  const wishlistLabel = isWishlistPage
    ? "Remove from Wishlist"
    : "Add to Wishlist";

  return (
    <div className="position-relative">
      <div className={styles.prodItemBox}>
        <div className="p-3 p-lg-4 vstack gap-1 h-100">
          <div className="d-flex justify-content-between align-items-center position-relative z-3">
            <div>
              <div className={styles.pibTag}>{tag || "New"}</div>
            </div>

            <div className={`${styles.pibWL} align-self-end`}>
              <button
                onClick={handleWishlistClick}
                disabled={isWishlistLoading || isRemoveWishlist}
                type="button"
                className={`${styles.wishlistBtn} ${
                  isWishlistPage ? styles.removeWishlistBtn : ""
                }`}
                title={wishlistLabel}
                aria-label={wishlistLabel}
              >
                {isWishlistPage ? "×" : ""}
              </button>
            </div>
          </div>

          <div className={`${styles.pibImgBox} mx-auto`}>
            <Image
              src={image}
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
            Add to Cart
          </button>

          <button
            type="button"
            className={`${styles.pibBtn} ${styles.buyBtn}`}
            disabled={isCartLoading}
          >
            Buy Now
          </button>
        </div>

        <Link href={detailsHref} className="stretched-link" title={name} />
      </div>

      {showVariants && hasVariants && (
        <VariantPopup
          product={{ id, name, image, price, oldPrice, variants }}
          onClose={closeVariants}
          onConfirm={handleConfirmVariant}
          loading={isCartLoading}
        />
      )}
    </div>
  );
};

const ProductSlider = ({ products, path }) => {
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

  if (items.length === 0) return null;

  return (
    <div className="position-relative">
      <div className="productSlider swiper" ref={swiperRef}>
        <div className="swiper-wrapper">
          {items.map((product, index) => (
            <div
              className="swiper-slide"
              key={product.wishlistId ?? product.id ?? index}
            >
              <ProductCard {...product} path={path} />
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
