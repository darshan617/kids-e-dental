import React, { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import styles from "@/components/my-wishlist/MyWishlist.module.css";
import { ProductCard } from "@/common-component/product-card/ProductCard";
import EMPTY_IMAGE from "@/assets/images/wishlist.jpg";
import { useGetWishlistQuery } from "@/redux/apis/addToWishlistApi";


const normalizeWishlistItems = (res) => {
  if (!res) return [];
  if (Array.isArray(res)) return res;
  if (Array.isArray(res.data)) return res.data;
  if (Array.isArray(res.wishlist)) return res.wishlist;
  if (Array.isArray(res.data?.wishlist)) return res.data.wishlist;
  return [];
};

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

  const {
    data: wishlistData,
    isLoading,
    isFetching,
    isError,
    error,
  } = useGetWishlistQuery(undefined, { skip: !isMounted });

  useEffect(() => {
    if (wishlistData) console.log("wishlist response:", wishlistData);
    if (isError) console.log("wishlist error:", error);
  }, [wishlistData, isError, error]);

  const wishlistItems = useMemo(
    () => normalizeWishlistItems(wishlistData),
    [wishlistData],
  );

  const itemCount = wishlistItems.length;
  const hasItems = itemCount > 0;
  const showEmpty = isMounted && !hasItems && !isLoading && !isFetching;
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
          {/* <div className={styles.productsGrid}>
            {Array.from({ length: 4 }).map((_, index) => (
              <ProductCardShimmer key={index} />
            ))}
          </div> */}
        </div>
      ) : (
        hasItems && (
          <div className={styles.productsSection}>
            <div className={styles.productsGrid}>
              {wishlistItems.map((item) => {
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