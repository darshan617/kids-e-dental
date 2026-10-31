"use client";

import React, { useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import { IoClose } from "react-icons/io5";
import { useToast } from "@/custom-hooks/toast/ToastProvider";
import styles from "@/components/product-detail/all-coupons/AllCoupons.module.css";

const DEFAULT_COUPONS = [
  {
    id: 1,
    code: "WELCOME10",
    title: "10% off on your first order",
    desc: "Valid on orders above ₹999",
  },
  {
    id: 2,
    code: "FREESHIP",
    title: "Free shipping",
    desc: "No minimum order value",
  },
  { id: 3, code: "FEST20", title: "Flat 20% off", desc: "Max discount ₹500" },
];

const AllCoupons = ({
  isOpen,
  onClose,
  coupons = DEFAULT_COUPONS,
  width = "420px",
}) => {
  const { showToast } = useToast();

  const [rendered, setRendered] = useState(false);
  const [closing, setClosing] = useState(false);

  const onCloseRef = useRef(onClose);
  useEffect(() => {
    onCloseRef.current = onClose;
  }, [onClose]);

  useEffect(() => {
    if (isOpen) {
      setRendered(true);
      setClosing(false);
      return;
    }

    if (!rendered) return;

    setClosing(true);

    return () => clearTimeout();
  }, [isOpen, rendered]);

  useEffect(() => {
    if (!rendered) return;

    const html = document.documentElement;
    const body = document.body;
    const scrollbarWidth = window.innerWidth - html.clientWidth;
    const scrollY = window.scrollY;

    const prev = {
      htmlOverflow: html.style.overflow,
      bodyOverflow: body.style.overflow,
      bodyPosition: body.style.position,
      bodyTop: body.style.top,
      bodyWidth: body.style.width,
      bodyPaddingRight: body.style.paddingRight,
    };

    html.style.overflow = "hidden";
    body.style.overflow = "hidden";
    body.style.position = "fixed";
    body.style.top = `-${scrollY}px`;
    body.style.width = "100%";
    if (scrollbarWidth > 0) body.style.paddingRight = `${scrollbarWidth}px`;

    const onKeyDown = (e) => e.key === "Escape" && onCloseRef.current?.();
    document.addEventListener("keydown", onKeyDown);

    return () => {
      document.removeEventListener("keydown", onKeyDown);
      html.style.overflow = prev.htmlOverflow;
      body.style.overflow = prev.bodyOverflow;
      body.style.position = prev.bodyPosition;
      body.style.top = prev.bodyTop;
      body.style.width = prev.bodyWidth;
      body.style.paddingRight = prev.bodyPaddingRight;
      window.scrollTo(0, scrollY);
    };
  }, [rendered]);

  const copyCode = async (code) => {
    try {
      await navigator.clipboard.writeText(code);
      showToast(`Code ${code} copied`, "success");
    } catch {
      showToast("Failed to copy code", "error");
    }
  };

  if (!rendered) return null;

  return createPortal(
    <div
      className={`${styles.acOverlay} ${closing ? styles.acOverlayClosing : ""}`}
    >
      <aside
        className={`${styles.acPanel} ${closing ? styles.acPanelClosing : ""}`}
        style={{ "--ac-width": width }}
        role="dialog"
        aria-modal="true"
        aria-label="Coupons and offers"
        onClick={(e) => e.stopPropagation()}
      >
        <header className={styles.acHeader}>
          <h5 className={styles.acTitle}>Coupons & Offers</h5>
          <button
            type="button"
            className={styles.acClose}
            onClick={onClose}
            aria-label="Close"
          >
            <IoClose size={24} />
          </button>
        </header>

        <div className={styles.acBody}>
          {coupons.length === 0 ? (
            <p>No coupons available right now.</p>
          ) : (
            <ul className={styles.acList}>
              {coupons.map(({ id, code, title, desc }) => (
                <li key={id} className={styles.acCard}>
                  <div>
                    <strong className={styles.acCode}>{code}</strong>
                    <div className={styles.acCardTitle}>{title}</div>
                    <small className="text-secondary">{desc}</small>
                  </div>
                  <button
                    type="button"
                    className={styles.acCopy}
                    onClick={() => copyCode(code)}
                  >
                    Copy
                  </button>
                </li>
              ))}
            </ul>
          )}
        </div>
      </aside>
    </div>,
    document.body,
  );
};

export default AllCoupons;
