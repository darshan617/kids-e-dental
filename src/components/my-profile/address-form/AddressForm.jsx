import React, { useState } from "react";
import styles from "./AddressForm.module.css";

const EMPTY_FORM = {
  name: "",
  email: "",
  phone: "",
  alternate_phone: "",
  flat: "",
  area: "",
  landmark: "",
  pincode: "",
  city: "",
  state: "",
  country: "INDIA",
};

// Reusable floating-label input
const Field = ({ id, label, value, onChange, ...rest }) => (
  <div className={styles.field}>
    <input
      id={id}
      className={styles.input}
      placeholder=" "
      value={value}
      onChange={onChange}
      {...rest}
    />
    <label htmlFor={id} className={styles.label}>
      {label}
    </label>
  </div>
);

const onlyDigits = (value, max) => value.replace(/[^0-9]/g, "").slice(0, max);
const onlyLetters = (value, max) =>
  value.replace(/[^a-zA-Z\s]/g, "").slice(0, max);

const AddressForm = ({
  onClose,
  onSave,
  initialValues = null,
  title,
  isEditing = false,
  addressId = null,
}) => {
  // Start with the address being edited (if any), otherwise an empty form
  const [form, setForm] = useState({ ...EMPTY_FORM, ...(initialValues || {}) });

  const setValue = (field, value) =>
    setForm((prev) => ({ ...prev, [field]: value }));

  const isFormValid =
    form.name.trim() &&
    form.email.trim() &&
    form.phone.trim() &&
    form.flat.trim() &&
    form.pincode.trim() &&
    form.city.trim() &&
    form.state.trim() &&
    form.country.trim();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!isFormValid) return;

    onSave?.({
      ...form,
      ...(isEditing && addressId ? { id: addressId } : {}),
    });
    onClose?.();
  };

  return (
    <form className={styles.root} onSubmit={handleSubmit}>
      <h2 className={styles.title}>{title || "Add Delivery Address"}</h2>

      <div className={styles.grid}>
        <Field
          id="address-name"
          label="Name*"
          value={form.name}
          onChange={(e) => setValue("name", e.target.value)}
          required
        />

        <Field
          id="address-email"
          type="email"
          label="Email Id*"
          value={form.email}
          onChange={(e) => setValue("email", e.target.value)}
          required
        />

        <Field
          id="address-phone"
          type="tel"
          inputMode="numeric"
          label="Phone Number*"
          value={form.phone}
          onChange={(e) => setValue("phone", onlyDigits(e.target.value, 10))}
          maxLength={10}
          required
        />

        <Field
          id="address-alt-phone"
          type="tel"
          inputMode="numeric"
          label="Alternate Phone Number"
          value={form.alternate_phone}
          onChange={(e) =>
            setValue("alternate_phone", onlyDigits(e.target.value, 10))
          }
          maxLength={10}
          pattern="^\d{10}$"
        />

        <Field
          id="address-flat"
          label="Flat, House No., Building, Company*"
          value={form.flat}
          onChange={(e) => setValue("flat", e.target.value)}
          required
        />

        <Field
          id="address-area"
          label="Area, Street, Sector, Village"
          value={form.area}
          onChange={(e) => setValue("area", e.target.value)}
        />

        <Field
          id="address-landmark"
          label="Landmark"
          value={form.landmark}
          onChange={(e) => setValue("landmark", e.target.value)}
        />

        <Field
          id="address-pincode"
          inputMode="numeric"
          label="Pincode*"
          value={form.pincode}
          onChange={(e) => setValue("pincode", onlyDigits(e.target.value, 6))}
          pattern="^\d{6}$"
          maxLength={6}
          required
        />

        <Field
          id="address-city"
          label="City/District/Town*"
          value={form.city}
          onChange={(e) => setValue("city", onlyLetters(e.target.value, 20))}
          maxLength={20}
          required
        />

        <Field
          id="address-state"
          label="State*"
          value={form.state}
          onChange={(e) => setValue("state", onlyLetters(e.target.value, 20))}
          maxLength={20}
          required
        />

        <Field
          id="address-country"
          label="Country*"
          value={form.country}
          onChange={(e) => setValue("country", e.target.value)}
          required
        />
      </div>

      <div className={styles.actions}>
        <button type="button" className={`${styles.cancelBtn} ctaBtn`}  onClick={onClose}>
          CANCEL
        </button>

        <button type="submit" className={`${styles.saveBtn} ctaBtn`} disabled={!isFormValid}>
          {isEditing ? "UPDATE" : "SAVE ADDRESS"}
        </button>
      </div>
    </form>
  );
};

export default AddressForm;