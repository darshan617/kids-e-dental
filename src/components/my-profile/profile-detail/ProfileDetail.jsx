"use client";

import React, { useState, useEffect } from "react";
import Cookies from "js-cookie";
import styles from "@/components/my-profile/profile-detail/ProfileDetail.module.css";
import { FaRegEdit } from "react-icons/fa";
import { useUpdateUserProfileMutation } from "@/redux/apis/userProfileApi";
import { useToast } from "@/custom-hooks/toast/ToastProvider";
import AuthPopup from "@/common-component/auth-popup/AuthPopup";

const EMPTY_PROFILE = {
  fullName: "",
  email: "",
  mobile: "",
};

const getStoredUser = () => {
  try {
    return JSON.parse(Cookies.get("userData") || "null");
  } catch {
    return null;
  }
};

const fields = [
  {
    id: "fullName",
    label: "Full Name",
    type: "text",
    required: true,
  },
  {
    id: "email",
    label: "Email ID",
    type: "email",
    required: false,
  },
  {
    id: "mobile",
    label: "Mobile Number",
    type: "tel",
    required: false,
  },
];

const ProfileDetail = () => {
  const [form, setForm] = useState(EMPTY_PROFILE);
  const [saved, setSaved] = useState(EMPTY_PROFILE);
  const [isEditing, setIsEditing] = useState(false);

  // null = not checked yet (avoids flashing the login message on load)
  const [isLoggedIn, setIsLoggedIn] = useState(null);
  const [showAuthPopup, setShowAuthPopup] = useState(false);

  const [profileUpdate, { isLoading }] = useUpdateUserProfileMutation();
  const { showToast } = useToast();

  const loadUser = () => {
    const user = getStoredUser();
    const loggedIn = Boolean(Cookies.get("token") && user);

    setIsLoggedIn(loggedIn);

    if (loggedIn) {
      const profile = {
        fullName: user.name || "",
        email: user.email || "",
        mobile: user.phone || "",
      };
      setForm(profile);
      setSaved(profile);
    }
  };

  useEffect(() => {
    loadUser();

    window.addEventListener("userDataUpdated", loadUser);
    return () => window.removeEventListener("userDataUpdated", loadUser);
  }, []);

  const handleClosePopup = () => {
    setShowAuthPopup(false);
    // pick up the login that may have just happened in the popup
    loadUser();
  };

  const handleEdit = () => {
    setSaved({ ...form });
    setIsEditing(true);
  };

  const handleSave = async () => {
    const name = form.fullName.trim();

    if (!name) {
      showToast("Full name is required", "error");
      return;
    }

    try {
      const res = await profileUpdate({
        body: {
          name,
          email: form.email,
          phone: form.mobile,
        },
      }).unwrap();

      const user = getStoredUser() || {};
      Cookies.set(
        "userData",
        JSON.stringify({
          ...user,
          name,
          email: form.email,
          phone: form.mobile,
        }),
        { expires: 7, sameSite: "Lax" },
      );
      window.dispatchEvent(new Event("userDataUpdated"));

      const updated = { ...form, fullName: name };
      setForm(updated);
      setSaved(updated);
      setIsEditing(false);
      showToast(res?.message || "Profile updated successfully", "success");
    } catch (err) {
      showToast(
        err?.data?.message || "Failed to update profile. Please try again.",
        "error",
      );
    }
  };

  const handleCancel = () => {
    setForm({ ...saved });
    setIsEditing(false);
  };

  const handleChange = (e) => {
    setForm((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  // still checking the cookie
  if (isLoggedIn === null) return null;

  // ---------- not logged in ----------
  if (!isLoggedIn) {
    return (
      <div className={styles.profilePage}>
        <div className="alert alert-danger mb-3" role="alert">
          Please login or signup to access this page
        </div>

        <button
          type="button"
          className="btn btn-success"
          onClick={() => setShowAuthPopup(true)}
        >
          Login / Signup
        </button>

        <AuthPopup
          isOpen={showAuthPopup}
          onClose={handleClosePopup}
          initialMode="login"
        />
      </div>
    );
  }

  // ---------- logged in ----------
  return (
    <div className={styles.profilePage}>
      <div className={styles.profileWrapper}>
        <div className={styles.profileHeader}>
          <h1 className={styles.profileTitle}>My Profile</h1>

          {!isEditing && (
            <button className="ctaBtn" onClick={handleEdit}>
              <FaRegEdit />
              Edit Profile
            </button>
          )}
        </div>

        <div className={styles.profileCard}>
          {fields.map((field, index) => (
            <div
              key={field.id}
              className={`${styles.profileField}${
                index < fields.length - 1 ? " profile-field--bordered" : ""
              }`}
            >
              <label htmlFor={field.id} className={styles.fieldLabel}>
                {field.label}

                {field.required && <span className="field-required">*</span>}
              </label>

              <input
                id={field.id}
                name={field.id}
                type={field.type}
                value={form[field.id] || ""}
                disabled={
                  !isEditing || field.id === "email" || field.id === "mobile"
                }
                onChange={handleChange}
                className={`${styles.fieldInput}${
                  isEditing && field.id === "fullName"
                    ? " field-input--active"
                    : ""
                }`}
              />
            </div>
          ))}
        </div>

        {isEditing && (
          <div className={styles.profileActions}>
            <button
              className={styles.btnCancel}
              onClick={handleCancel}
              disabled={isLoading}
            >
              Cancel
            </button>
            <button
              className={styles.btnSave}
              onClick={handleSave}
              disabled={isLoading}
            >
              {isLoading ? "Saving..." : "Save changes"}
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default ProfileDetail;