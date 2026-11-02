import React from "react";
import styles from "@/components/my-cart/cart-summary/cartSummary.module.css";
import { useRouter } from "next/router";
import CouponSection from "@/components/my-cart/cart-summary/CouponSection";
import { BiX } from "react-icons/bi";
import { useRemoveCouponMutation } from "@/redux/apis/couponApi";
import { useToast } from "@/custom-hooks/toast/ToastProvider";

const CartSummary = ({ cartData, hasAddress = false, onProceed }) => {
  console.log("000000000", cartData);
  const [removeCoupon, { isLoading: isRemovingCoupon }] =
    useRemoveCouponMutation();
  const { showToast } = useToast();
  const router = useRouter();
  const isCheckoutPage = router.pathname === "/checkout";

  const finalTotal = cartData?.cart_summary?.grand_total;

  const handleRemoveCoupon = async () => {
    try {
      const res = await removeCoupon({
        source: isCheckoutPage ? "buy_now" : "cart",
      }).unwrap();

      showToast(res?.message || "Coupon removed", "success");
    } catch (error) {
      console.log("remove coupon error:", error);
      showToast(error?.data?.message || "Failed to remove coupon", "error");
    }
  };

  return (
    <div className={styles.summaryContainer}>
      <div className={styles.summaryCard}>
        <h3 className={styles.summaryTitle}>Cart Summary</h3>

        <div className={styles.summaryBody}>
          <div className={styles.summaryRow}>
            <span className={styles.summaryLabel}>Subtotal</span>
            <span className={styles.summaryValue}>
              ₹ {cartData?.cart_summary?.subtotal?.toFixed(2)}
            </span>
          </div>
          <div className={styles.summaryRow}>
            <div>
              <span className={styles.summaryLabel}>Discount</span>
              {cartData?.coupon?.code && (
                <p className="m-0 text-success">
                  (Applied Coupon: {cartData?.coupon?.code})
                  <button
                    className={styles.removeCoupon}
                    onClick={handleRemoveCoupon}
                  >
                    <BiX size={18} />
                  </button>
                </p>
              )}
            </div>
            <span
              className={styles.summaryValue}
              style={{
                color:
                  Number(cartData?.cart_summary?.discount_amount?.toFixed(2)) >
                  0
                    ? "green"
                    : "#1a1a1a",
              }}
            >
              -₹ {cartData?.cart_summary?.discount_amount?.toFixed(2) || 0}
            </span>
          </div>

          <div className={styles.totalRow}>
            <div>
              <span className={styles.totalLabel}>Total Amount</span>
              <p className={styles.taxNote}>(Inclusive of all taxes)</p>
            </div>

            <span className={styles.totalValue}>
              ₹ {finalTotal?.toFixed(2) || 0}
            </span>
          </div>

          {isCheckoutPage && (
            <div className="d-flex flex-column align-items-center mt-3 gap-2">
              <button
                type="button"
                className="ctaBtn"
                disabled={!hasAddress}
                onClick={() => onProceed?.()}
                style={
                  hasAddress
                    ? { opacity: 1, cursor: "pointer" }
                    : { opacity: 0.5, cursor: "not-allowed" }
                }
              >
                <p className="mb-0 fs-6 fw-semibold text-start">
                  Proceed to Payment
                </p>
              </button>

              {!hasAddress && (
                <small className="text-danger">
                  Please add a delivery address to continue.
                </small>
              )}
            </div>
          )}
        </div>
      </div>

      <CouponSection appliedCouponData={cartData?.coupon} />
    </div>
  );
};

export default CartSummary;
