import React, { useId, useState } from "react";
import { MdCardGiftcard, MdClose } from "react-icons/md";
import Cookies from "js-cookie";
import styles from "@/components/my-cart/cart-summary/CouponSection.module.css";
import AuthPopup from "@/common-component/auth-popup/AuthPopup";
import {
  useApplyCouponMutation,
  useGetAvailableCouponQuery,
  useRemoveCouponMutation,
} from "@/redux/apis/couponApi";
import { useToast } from "@/custom-hooks/toast/ToastProvider";

const getUserData = () => {
  try {
    const raw = Cookies.get("userData");
    return raw ? JSON.parse(decodeURIComponent(raw)) : null;
  } catch (error) {
    console.error("Failed to read userData cookie:", error);
    return null;
  }
};

const CouponSection = ({ appliedCouponData }) => {
  const inputId = useId();
  const { showToast } = useToast();
  const [couponCode, setCouponCode] = useState("");
  const [loginOpen, setLoginOpen] = useState(false);
  const {
    data: availableCoupon,
    isLoading,
    isError,
  } = useGetAvailableCouponQuery();
  const [applyCoupon, { isLoading: isApplyingCoupon }] =
    useApplyCouponMutation();

  const handleApplyCoupon = async () => {
    if (!getUserData()?.id) {
      setLoginOpen(true);
      return;
    }

    try {
      const res = await applyCoupon({
        body: {
          coupon_code: couponCode,
        },
      });
      if (res?.data?.status || res?.data?.success) {
        showToast(res?.data?.message, "success");
      }
    } catch (error) {
      console.log(error);
    }
  };

  const coupons = Array.isArray(availableCoupon?.data)
    ? availableCoupon.data.filter(
        (coupon) => coupon?.coupon_code ?? coupon?.code,
      )
    : [];

  return (
    <section
      className={styles.couponPanel}
      aria-labelledby={`${inputId}-title`}
    >
      <h3 className={styles.couponTitle} id={`${inputId}-title`}>
        Apply Coupon
      </h3>
      <div className={styles.couponForm}>
        <label className={styles.visuallyHidden} htmlFor={inputId}>
          Enter Coupon Code
        </label>
        <input
          className={styles.couponInput}
          id={inputId}
          type="text"
          value={couponCode}
          onChange={(event) => setCouponCode(event.target.value)}
          placeholder="Enter Coupon Code"
        />
        <button
          className={styles.applyButton}
          type="button"
          onClick={() => handleApplyCoupon()}
          disabled={isApplyingCoupon}
        >
          {isApplyingCoupon ? "Applying" : "Apply"}
        </button>
      </div>

      {isLoading ? (
        <p className={styles.couponMessage} role="status">
          Loading available coupons...
        </p>
      ) : isError ? (
        <p className={styles.couponMessage} role="alert">
          Could not load available coupons. Please try again later.
        </p>
      ) : coupons.length > 0 ? (
        <div className={styles.couponList}>
          {coupons.map((coupon, index) => {
            const code = coupon?.coupon_code ?? coupon?.code ?? "";
            const name =
              coupon?.coupon_name ?? coupon?.name ?? coupon?.title ?? code;

            return (
              <article
                className={styles.couponCard}
                key={coupon?.id ?? code ?? index}
              >
                <div className={styles.couponCardContent}>
                  <h4 className={styles.couponName}>{name}</h4>
                  <p className={styles.couponCode}>{code}</p>
                  {coupon?.description && (
                    <p className={styles.couponDecodescription}>
                      {coupon.description}
                    </p>
                  )}
                </div>
                <button
                  className={styles.copyButton}
                  type="button"
                  onClick={() => setCouponCode(code)}
                  aria-label={`Copy coupon code ${code} to the input`}
                >
                  Copy
                </button>
              </article>
            );
          })}
        </div>
      ) : (
        <div className={styles.couponEmpty}>
          <div className={styles.couponIllustration} aria-hidden="true">
            <MdCardGiftcard className={styles.giftLeft} />
            <div className={styles.couponTicket}>
              <span>No coupon</span>
              <MdClose className={styles.couponCross} />
            </div>
            <MdCardGiftcard className={styles.giftRight} />
          </div>
        </div>
      )}
      <AuthPopup isOpen={loginOpen} onClose={() => setLoginOpen(false)} />
    </section>
  );
};

export default CouponSection;
