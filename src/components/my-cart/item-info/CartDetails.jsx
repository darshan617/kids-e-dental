import React, { useEffect, useState } from "react";
import styles from "@/components/my-cart/item-info/CartDetails.module.css";
import Link from "next/link";
import { ImBin } from "react-icons/im";
import { MdOutlineKeyboardArrowRight } from "react-icons/md";
import Image from "next/image";
import csImg from "@/assets/images/csImg.jpg";
import { useRouter } from "next/router";
import emptyCartImg from "@/assets/images/wishlist.jpg";

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
      <Link href="/product-listing" className='ctaBtn'>
        CONTINUE SHOPPING
      </Link>
    </div>
  </div>
);

const CartRow = ({ item, onIncrease, onDecrease, onDelete }) => {
  const product = item?.product ?? {};

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
              <Link href={`/product/${product?.slug || ""}`}>
                {product?.name || "Product"}
              </Link>
            </h4>

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
              -
            </button>
          )}

          <span className={styles.productCartCount}>{item?.quantity}</span>

          <button
            type="button"
            className={styles.productCartPlus}
            onClick={() => onIncrease(item?.id)}
          >
            +
          </button>
        </div>

        <div className={styles.productCartSubtotal}>
          <h5>₹ {(Number(product?.selling_price) || 0) * item?.quantity}</h5>
        </div>
      </div>
    </div>
  );
};

const CartDetails = ({ cartData, handleUpdateCart, handleRemoveCart }) => {
  const router = useRouter();
  const isCheckoutPage = router.pathname === "/checkout";

  const [cartItems, setCartItems] = useState([]);

  useEffect(() => {
    const items = cartData?.data;

    if (Array.isArray(items)) {
      setCartItems(
        items.map((item) => ({
          ...item,
          quantity: Number(item?.quantity) || 1,
          product: {
            ...item.product,
            thumbnail: item?.product?.thumbnail || csImg,
          },
        })),
      );
    }
  }, [cartData]);

  const onIncrease = (id, currentQty) => {
    handleUpdateCart(id, currentQty + 1);
  };

  const onDecrease = (id, currentQty) => {
    if (currentQty > 1) {
      handleUpdateCart(id, currentQty - 1);
    }
  };

  const onDelete = (id) => {
    handleRemoveCart(id);
  };

  const cartTotal = cartItems?.reduce(
    (acc, item) =>
      acc + (Number(item?.product?.selling_price) || 0) * item?.quantity,
    0,
  );

  if (cartItems?.length === 0) {
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
          key={item.id}
          item={item}
          onIncrease={() => onIncrease(item?.id, item?.quantity)}
          onDecrease={() => onDecrease(item?.id, item?.quantity)}
          onDelete={() => onDelete(item?.id)}
        />
      ))}

      {!isCheckoutPage && (
        <Link href="/checkout" className={styles.checkoutSection}>
          <button type="button" className={styles.checkoutBtn}>
            <div>
              <div>
                <span>PROCEED TO CHECKOUT</span>
                <p>₹ {cartTotal}</p>
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
