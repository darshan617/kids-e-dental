import React from "react";
import styles from "@/components/my-cart/cart-summary/cartSummary.module.css";
import { useRouter } from "next/router";

const CartSummary = ({ subtotal = 100, total }) => {
  const router = useRouter();
  const isCheckoutPage = router.pathname === "/checkout";

  const gst = subtotal * 0.18;
  const finalTotal = total ?? subtotal + (isCheckoutPage ? gst : 0);

  return (
    <div className={styles.summaryCard}>
      {" "}
      <h3 className={styles.summaryTitle}>Cart Summary</h3>
      <div className={styles.summaryBody}>
        <div className={styles.summaryRow}>
          <span className={styles.summaryLabel}>Subtotal</span>
          <span className={styles.summaryValue}>₹ {subtotal.toFixed(2)}</span>
        </div>

        {isCheckoutPage && (
          <div className={styles.summaryRow}>
            <span className={styles.summaryLabel}>GST 18%</span>
            <span className={styles.summaryValue}>₹ {gst.toFixed(2)}</span>
          </div>
        )}

        <div className={styles.totalRow}>
          <div>
            <span className={styles.totalLabel}>Total Amount</span>
            <p className={styles.taxNote}>(Inclusive of all taxes)</p>
          </div>

          <span className={styles.totalValue}>₹ {finalTotal.toFixed(2)}</span>
        </div>
        {isCheckoutPage && (
          <div className="d-flex justify-content-center mt-3 gap-3 align-items-center">
            <button
              type="button"
              className="ctaBtn "
              style={{ opacity: "1", cursor: "pointer" }}
            >
              <div>
                <div>
                  <p className="mb-0 fs-6 fw-semibold text-start">
                    Proceed to Payment
                  </p>
                </div>
              </div>
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default CartSummary;
