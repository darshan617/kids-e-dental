import React from "react";
import styles from "@/components/my-cart/cart-summary/cartSummary.module.css";

const CartSummary = ({ subtotal = 499, total = 499 }) => {
  return (
    <div className={styles.summaryCard}>
      <h3 className={styles.summaryTitle}>Cart Summary</h3>

      <div className={styles.summaryBody}>
        <div className={styles.summaryRow}>
          <span className={styles.summaryLabel}>Subtotal</span>
          <span className={styles.summaryValue}>₹ {subtotal.toFixed(2)}</span>
        </div>

        <div className={styles.totalRow}>
          <div>
            <span className={styles.totalLabel}>Total Amount</span>
            <p className={styles.taxNote}>(Inclusive of all taxes)</p>
          </div>
          <span className={styles.totalValue}>₹ {total.toFixed(2)}</span>
        </div>
      </div>
    </div>
  );
};

export default CartSummary;