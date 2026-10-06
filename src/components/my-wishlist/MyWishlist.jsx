import React, { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import styles from '@/components/my-wishlist/MyWishlist.module.css'
import { ProductCard } from "@/common-component/product-card/ProductCard";
import EMPTY_IMAGE from '@/assets/images/wishlist.avif'

const STATIC_CATEGORIES = [
  { name: "Safety", slug: "safety", image: "/category-image/1.png" },
  { name: "Electricals", slug: "electricals", image: "/category-image/2.png" },
  { name: "Power Tools", slug: "power-tools", image: "/category-image/3.png" },
  { name: "Pumps & Motors", slug: "pumps-motors", image: "/category-image/4.png" },
  {
    name: "Office Stationery & Supplies",
    slug: "office-stationery",
    image: "/category-image/5.png",
  },
  { name: "Medical Supplies", slug: "medical-supplies", image: "/category-image/6.png" },
];

const STATIC_WISHLIST_ITEMS = [
  {
    id: 1,
    product: {
      id: 1,
      name: "Neptune NF-767 Power Sprayer | 4 Stroke 31 CC Petrol Engine | 25 Ltr",
      slug: "neptune-nf-767",
      thumbnail: "/products/product-1.jpg",
      gallery: ["/products/product-1.jpg", "/products/product-1-hover.jpg"],
      discount: 49,
      is_best_selling: true,
      is_trending: false,
      is_featured: false,
      is_top_rated: false,
      selling_price: 8343,
      price: 16500,
      total_reviews: 24,
      rating: "4.5",
      quantity: 10,
    },
  },
  {
    id: 2,
    product: {
      id: 2,
      name: "Dual Action Farming Combo Battery Sprayer + Mist Blower Gun",
      slug: "dual-action-combo-sprayer",
      thumbnail: "/products/product-2.jpg",
      gallery: ["/products/product-2.jpg", "/products/product-2-hover.jpg"],
      discount: 47,
      is_best_selling: false,
      is_trending: false,
      is_featured: false,
      is_top_rated: false,
      selling_price: 4500,
      price: 8500,
      total_reviews: 18,
      rating: "4.5",
      quantity: 10,
    },
  },
  {
    id: 3,
    product: {
      id: 3,
      name: "Neptune Dk-14 Plus Double Motor Battery Sprayer",
      slug: "neptune-dk-14-plus",
      thumbnail: "/products/product-3.jpg",
      gallery: ["/products/product-3.jpg", "/products/product-3-hover.jpg"],
      discount: 38,
      is_best_selling: true,
      is_trending: false,
      is_featured: false,
      is_top_rated: false,
      selling_price: 3400,
      price: 5500,
      total_reviews: 31,
      rating: "4.5",
      quantity: 10,
    },
  },
];

// Toggle these to preview each state while designing
const PREVIEW_WISHLIST_EMPTY = false;
const PREVIEW_LOADING = false;
/* ------------------------------------------------------------------------------------- */

const MyWishlist = ({
  title = "My Wishlist",
  emptyTitle = "Your Wishlist is empty!",
  emptyText = "Explore more & shortlist your favourite items. Review them anytime and add to cart",
  shopBtnText = "START SHOPPING",
  shopBtnHref,
}) => {
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  const isLoading = PREVIEW_LOADING;
  const isFetching = false;

  const wishlistItems = useMemo(
    () => (PREVIEW_WISHLIST_EMPTY ? [] : STATIC_WISHLIST_ITEMS),
    [],
  );

  const itemCount = wishlistItems.length;
  const hasItems = itemCount < 0;
  const showEmpty = isMounted && !hasItems && !isLoading && !isFetching;

  const trendingCategories = STATIC_CATEGORIES;

  const itemLabel = itemCount === 1 ? "Item" : "Items";

  return (
    <section className={styles.wishlistPanel}>
      <div className={styles.pageHeader}>
        {title && (
          <h1 className={styles.pageTitle}>
            {title} ({itemCount} {itemLabel})
          </h1>
        )}
      </div>

      {showEmpty && (
        <div className={styles.emptySection}>
          <div className={styles.emptyVisual}>
            <Image
              src={EMPTY_IMAGE}
              alt="empty-wishlist"
              className={styles.emptyImage}
              width={420}
              // height={320}
              
              priority
            />
          </div>

          <div className={styles.emptyContent}>
            <h2 className={styles.emptyTitle}>{emptyTitle}</h2>
            <p className={styles.emptyText}>{emptyText}</p>
            <Link
              href={shopBtnHref || "/product-category/safety"}
              className="ctaBtn"
              prefetch={true}
            >
              {shopBtnText}
            </Link>
          </div>
        </div>
      )}

      {isLoading || isFetching ? (
        <div className={styles.productsSection}>
          <div className={styles.productsGrid}>
            {Array.from({ length: 4 }).map((_, index) => (
              <ProductCardShimmer key={index} />
            ))}
          </div>
        </div>
      ) : (
        hasItems && (
          <div className={styles.productsSection}>
            <div className={styles.productsGrid}>
              {wishlistItems?.map((item) => {
                const product = item?.product ?? item;
                return (
                  <ProductCard
                    key={item?.id ?? product?.id}
                    type="productPage"
                    image={product?.thumbnail}
                    imageHover={product?.gallery?.[1] ?? product?.gallery?.[0]}
                    discount={product?.discount}
                    isBestSeller={product?.is_best_selling}
                    isTrending={product?.is_trending}
                    isFeatured={product?.is_featured}
                    isTopRated={product?.is_top_rated}
                    name={product?.name}
                    price={product?.selling_price}
                    oldPrice={product?.price}
                    reviews={
                      product?.reviews?.length ?? product?.total_reviews ?? 0
                    }
                    rating={product?.rating ?? "4.5"}
                    slug={product?.slug}
                    productId={product?.id}
                    path="/wishlist"
                    quantity={product?.quantity}
                  />
                );
              })}
            </div>
          </div>
        )
      )}

    </section>
  );
};

export default MyWishlist;