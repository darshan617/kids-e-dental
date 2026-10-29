import React, { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import styles from "@/components/my-wishlist/MyWishlist.module.css";
import {
  ProductCard,
  normalizeProduct,
} from "@/common-component/product-card/ProductCard";
import EMPTY_IMAGE from "@/assets/images/wishlist.jpg";
import { useGetWishlistQuery } from "@/redux/apis/addToWishlistApi";

const normalizeWishlistItems = (res) => {
  if (!res) return [];

  if (Array.isArray(res)) return res;
  if (Array.isArray(res.data)) return res.data;
  if (Array.isArray(res.wishlist)) return res.wishlist;
  if (Array.isArray(res.items)) return res.items;
  if (Array.isArray(res.data?.wishlist)) return res.data.wishlist;
  if (Array.isArray(res.data?.items)) return res.data.items;
  if (Array.isArray(res.data?.data)) return res.data.data;

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
  } = useGetWishlistQuery(undefined, { skip: !isMounted });

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
        <div className={styles.productsSection} />
      ) : (
        hasItems && (
          <div className={styles.productsSection}>
            <div className={styles.productsGrid}>
              {wishlistItems.map((item) => {
                const card = normalizeProduct(item);

                return (
                  <ProductCard
                    key={item?.id ?? card.id}
                    {...card}
                    path="/wishlist"
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
