"use client";

import React, { useEffect } from "react";
import { createPortal } from "react-dom";
import styles from "@/common-component/custom-popup/CustomPopup.module.css";

const SIZE_CLASS = {
  sm: styles.sm,
  md: styles.md,
  lg: styles.lg,
};

const CustomPopup = ({
  isOpen,
  onClose,
  title,
  children,
  size = "md",
  closeOnBackdrop = true,
  showClose = true,
}) => {
  useEffect(() => {
    if (!isOpen) return;

    const onKeyDown = (event) => {
      if (event.key === "Escape") onClose?.();
    };

    document.body.classList.add("stopScroll");
    document.addEventListener("keydown", onKeyDown);

    return () => {
      document.body.classList.remove("stopScroll");
      document.removeEventListener("keydown", onKeyDown);
    };
  }, [isOpen, onClose]);

  if (!isOpen || typeof document === "undefined") return null;

  const handleBackdropClick = (event) => {
    if (closeOnBackdrop && event.target === event.currentTarget) {
      onClose?.();
    }
  };

  return createPortal(
    <div
      className={styles.overlay}
      onClick={handleBackdropClick}
      role="presentation"
    >
      <div
        className={`${styles.dialog} ${SIZE_CLASS[size] || styles.md}`}
        role="dialog"
        aria-modal="true"
        aria-label={typeof title === "string" ? title : "Popup"}
        onClick={(event) => event.stopPropagation()}
      >
        <div className={styles.body}>{children}</div>
      </div>
    </div>,
    document.body
  );
};

export default CustomPopup;
