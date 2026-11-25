import React from "react";
import styles from "@/components/my-cart/item-info/CartDetails.module.css";
import Link from "next/link";
import { ImBin } from "react-icons/im";
import { MdOutlineKeyboardArrowRight } from "react-icons/md";
import Image from "next/image";
import csImg from "@/assets/images/home/csImg.jpg";
import { useRouter } from "next/router";
import emptyCartImg from "@/assets/images/prd-detail/wishlist.jpg";

export const EmptyCart = () => (
  <div className={styles.emptySection}>
    <div className={styles.emptyVisual}>
      <Image
        src={emptyCartImg}
        alt="empty-cart"
        className={styles.emptyImage}
        width={420}
        height={320}
        priority
      />
    </div>

    <div className={styles.emptyContent}>
      <h2 className={styles.emptyTitle}>Your Cart is empty!</h2>
      <p className={styles.emptyText}>Add product and proceed</p>
      <Link href="/product-listing" className="ctaBtn">
        CONTINUE SHOPPING
      </Link>
    </div>
  </div>
);

const readVariantValue = (...values) => {
  for (const value of values) {
    if (value == null || value === "") continue;
    if (typeof value === "object") {
      const label = value.name ?? value.label ?? value.value ?? value.title;
      if (label != null && label !== "") return String(label);
      continue;
    }
    return String(value);
  }
  return "";
};

const CartRow = ({ item, onIncrease, onDecrease, onDelete, isUpdating }) => {
  const product = item?.product ?? {};
  const selectedArch = readVariantValue(
    item?.selected_arch,
    product?.selected_arch,
  );
  const selectedSize = readVariantValue(
    item?.selected_size,
    product?.selected_size,
  );

  return (
    <div className={styles.productCartWrapper}>
      <div className={styles.productCartRow}>
        <div className={styles.productCartInfo}>
          <Image
            src={product?.thumbnail || csImg}
            alt={product?.name || "Product"}
            className={styles.productImg}
            width={62}
            height={62}
          />

          <div className={styles.productCartContent}>
            <h4 className={styles.productCartName}>
              <Link href={`/product-details/${product?.slug || ""}`}>
                {product?.name || "Product"}
              </Link>
            </h4>

            {(selectedArch || selectedSize) && (
              <div className={styles.variantMeta}>
                {selectedArch && (
                  <span className={styles.variantChip}>
                    <span className={styles.variantLabel}>Arch</span>
                    {selectedArch}
                  </span>
                )}
                {selectedSize && (
                  <span className={styles.variantChip}>
                    <span className={styles.variantLabel}>Size</span>
                    {selectedSize}
                  </span>
                )}
              </div>
            )}

            <span>SKU: {product?.sku || "N/A"}</span>

            {item.coupon_applicable && (
              <p
                className="fs-12 small"
                style={{
                  fontSize: "12px",
                  fontWeight: "400",
                  color: "#2d8d2f",
                }}
              >
                {item?.coupon_code} (You save ₹ {item?.coupon_discount} on this
                product)
              </p>
            )}
          </div>
        </div>

        <div className={styles.productCartPrice}>
          ₹ {product?.selling_price ?? 0}
        </div>

        <div className={styles.productCartQuantity}>
          {item?.quantity === 1 ? (
            <button
              type="button"
              className={styles.productCartDelete}
              onClick={() => onDelete(item?.id)}
            >
              <ImBin />
            </button>
          ) : (
            <button
              type="button"
              className={styles.productCartDelete}
              onClick={() => onDecrease(item?.id)}
            >
              {isUpdating ? (
                <div
                  class="spinner-border text-light spinner-border-sm"
                  role="status"
                ></div>
              ) : (
                "-"
              )}
            </button>
          )}

          <span className={styles.productCartCount}>{item?.quantity}</span>

          <button
            type="button"
            className={styles.productCartPlus}
            onClick={() => onIncrease(item?.id)}
          >
            {isUpdating ? (
              <div
                class="spinner-border text-light spinner-border-sm"
                role="status"
              ></div>
            ) : (
              "+"
            )}
          </button>
        </div>

        <div className={styles.productCartSubtotal}>
          <h5>₹ {(Number(product?.selling_price) || 0) * item?.quantity}</h5>
        </div>
      </div>
    </div>
  );
};

const CartDetails = ({
  cartData,
  totalAmount,
  handleUpdateCart,
  handleRemoveCart,
  isLoading = false,
  isUpdating,
}) => {
  const router = useRouter();
  const isCheckoutPage = router.pathname === "/checkout";
  const cartItems = Array.isArray(cartData) ? cartData : [];

  const onIncrease = (item) => {
    handleUpdateCart(item?.id, item?.quantity + 1, undefined, item);
  };

  const onDecrease = (item) => {
    if (item?.quantity > 1) {
      handleUpdateCart(item?.id, item?.quantity - 1, undefined, item);
    }
  };

  const onDelete = (item) => {
    handleRemoveCart(item?.id, item);
  };

  const itemTotal = cartItems?.reduce(
    (acc, item) =>
      acc + (Number(item?.product?.selling_price) || 0) * item?.quantity,
    0,
  );
  const summaryTotal =
    totalAmount === null || totalAmount === undefined || totalAmount === ""
      ? Number.NaN
      : Number(totalAmount);
  const checkoutTotal = Number.isFinite(summaryTotal)
    ? summaryTotal
    : itemTotal;

  if (isLoading && cartItems.length === 0) {
    return null;
  }

  if (cartItems.length === 0) {
    return <EmptyCart />;
  }

  return (
    <div className={styles.productInfo}>
      <div className={styles.productCartHeader}>
        <div>PRODUCT</div>
        <div>Price</div>
        <div>Quantity</div>
        <div>Subtotal</div>
      </div>

      {cartItems?.map((item) => (
        <CartRow
          key={item?._source ? `${item._source}-${item.id}` : item.id}
          item={item}
          onIncrease={() => onIncrease(item)}
          onDecrease={() => onDecrease(item)}
          onDelete={() => onDelete(item)}
          isUpdating={isUpdating}
        />
      ))}

      {!isCheckoutPage && (
        <Link href="/checkout?source=cart" className={styles.checkoutSection}>
          <button type="button" className={styles.checkoutBtn}>
            <div>
              <div>
                <span>PROCEED TO CHECKOUT</span>
                <p>₹ {checkoutTotal.toFixed(2)}</p>
              </div>
            </div>

            <span className={styles.arrow}>
              <MdOutlineKeyboardArrowRight size={30} />
            </span>
          </button>
        </Link>
      )}
    </div>
  );
};

export default CartDetails;
