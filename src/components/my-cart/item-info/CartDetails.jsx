import React, { useState } from "react";
import styles from "@/components/my-cart/item-info/CartDetails.module.css";
import Link from "next/link";
import { ImBin } from "react-icons/im";
import { MdOutlineKeyboardArrowRight } from "react-icons/md";
import Image from "next/image";
import csImg from "@/assets/images/csImg.jpg";
import { useRouter } from "next/router";
import emptyCartImg from "@/assets/images/wishlist.jpg"

const dummyCartItems = [
  {
    id: 1,
    quantity: 1,
    coupon_applicable: true,
    coupon_code: "SAVE10",
    coupon_discount: 50,
    product: {
      name: "Organic Basmati Rice 5kg",
      slug: "organic-basmati-rice-5kg",
      sku: "RICE-001",
      selling_price: 499,
      thumbnail: csImg,
    },
  },
];
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
      <Link href="/product-category/all" className={styles.shopBtn}>
        CONTINUE SHOPPING
      </Link>
    </div>
  </div>
);

const CartRow = ({ item, onIncrease, onDecrease, onDelete }) => (
  <div className={styles.productCartWrapper}>
    <div className={styles.productCartRow}>
      <div className={styles.productCartInfo}>
        <Image
          src={item.product.thumbnail}
          alt={item.product.name}
          className={styles.productImg}
          width={62}
          height={62}
        />

        <div className={styles.productCartContent}>
          <h4 className={styles.productCartName}>
            <Link href="/">{item.product.name}</Link>
          </h4>

          <span>SKU: {item.product.sku}</span>

          {item.coupon_applicable && (
            <p
              className="fs-12 small"
              style={{
                fontSize: "12px",
                fontWeight: "400",
                color: "#2d8d2f",
              }}
            >
              {item.coupon_code} (You save ₹ {item.coupon_discount} on this
              product)
            </p>
          )}
        </div>
      </div>

      <div className={styles.productCartPrice}>
        ₹ {item.product.selling_price}
      </div>

      <div className={styles.productCartQuantity}>
        {item.quantity === 1 ? (
          <button
            type="button"
            className={styles.productCartDelete}
            onClick={() => onDelete(item.id)}
          >
            <ImBin />
          </button>
        ) : (
          <button
            type="button"
            className={styles.productCartDelete}
            onClick={() => onDecrease(item.id)}
          >
            -
          </button>
        )}

        <span className={styles.productCartCount}>{item.quantity}</span>

        <button
          type="button"
          className={styles.productCartPlus}
          onClick={() => onIncrease(item.id)}
        >
          +
        </button>
      </div>

      <div className={styles.productCartSubtotal}>
        <h5>₹ {item.product.selling_price * item.quantity}</h5>
      </div>
    </div>
  </div>
);

const CartDetails = () => {
  const router = useRouter();
  const isCheckoutPage = router.pathname === "/checkout";

  const [cartItems, setCartItems] = useState(dummyCartItems);

  const onIncrease = (id) => {
    setCartItems((prevItems) =>
      prevItems.map((item) =>
        item.id === id ? { ...item, quantity: item.quantity + 1 } : item,
      ),
    );
  };

  const onDecrease = (id) => {
    setCartItems((prevItems) =>
      prevItems.map((item) =>
        item.id === id && item.quantity > 1
          ? { ...item, quantity: item.quantity - 1 }
          : item,
      ),
    );
  };

  const onDelete = (id) => {
    setCartItems((prevItems) => prevItems.filter((item) => item.id !== id));
  };

  const cartTotal = cartItems.reduce(
    (acc, item) => acc + item.product.selling_price * item.quantity,
    0,
  );

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

      {cartItems.map((item) => (
        <CartRow
          key={item.id}
          item={item}
          onIncrease={onIncrease}
          onDecrease={onDecrease}
          onDelete={onDelete}
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
