import React, { useState } from "react";
import styles from "./AddressForm.module.css";
import {
  useAddAddressMutation,
  useUpdateAddressMutation,
} from "@/redux/apis/addressApi";
import { useGetLocationDetailsQuery } from "@/redux/apis/locationApi";
import { useToast } from "@/custom-hooks/toast/ToastProvider";

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

const SelectField = ({ id, label, value, onChange, disabled, children }) => (
  <div className={styles.field}>
    <select
      id={id}
      className={`${styles.input} ${styles.select}`}
      value={value}
      onChange={onChange}
      disabled={disabled}
      required
    >
      {children}
    </select>
    <label htmlFor={id} className={`${styles.label} ${styles.selectLabel}`}>
      {label}
    </label>
  </div>
);

const onlyDigits = (value, max) => value.replace(/[^0-9]/g, "").slice(0, max);

const AddressForm = ({
  onClose,
  onSave,
  initialValues = null,
  title,
  isEditing = false,
  addressId = null,
}) => {
  const [form, setForm] = useState({ ...EMPTY_FORM, ...(initialValues || {}) });
  const [addAddress, { isLoading: isAddingAddress }] = useAddAddressMutation();
  const [updateAddress, { isLoading: isUpdatingAddress }] =
    useUpdateAddressMutation();
  const {
    data: locationData,
    isLoading: isLoadingLocations,
    isError: isLocationError,
  } = useGetLocationDetailsQuery();
  const setValue = (field, value) =>
    setForm((prev) => ({ ...prev, [field]: value }));
  const { showToast } = useToast();

  const states = Array.isArray(locationData?.state) ? locationData.state : [];
  const selectedState = states.find(
    (state) =>
      state?.name?.trim().toLowerCase() === form.state.trim().toLowerCase(),
  );
  const cities = Array.isArray(selectedState?.cities)
    ? selectedState.cities
    : [];
  const selectedCity =
    cities.find(
      (city) => city.toLowerCase() === form.city.trim().toLowerCase(),
    ) ?? "";

  const isFormValid =
    form.name.trim() &&
    form.email.trim() &&
    form.phone.trim() &&
    form.flat.trim() &&
    form.pincode.trim() &&
    form.city.trim() &&
    form.state.trim() &&
    form.country.trim();

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!isFormValid) return;

    try {
      const res = await (isEditing ? updateAddress : addAddress)({
        body: {
          ...form,
          ...(isEditing && addressId ? { id: addressId } : {}),
        },
      }).unwrap();

      if (res?.data?.status || res?.data?.success) {
        showToast("Address " + (isEditing ? "updated" : "added") + " successfully", "success");

        setForm(EMPTY_FORM);

          onClose?.();
      }
    } catch (error) {
      console.log(error);
      showToast(error?.data?.message || "Something went wrong", "error");
    }
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
          id="address-country"
          label="Country*"
          value={form.country}
          onChange={(e) => setValue("country", e.target.value)}
          required
        />

        <SelectField
          id="address-state"
          label="State*"
          value={selectedState?.name ?? form.state}
          disabled={
            isLoadingLocations || isLocationError || states.length === 0
          }
          onChange={(e) =>
            setForm((prev) => ({
              ...prev,
              state: e.target.value,
              city: "",
            }))
          }
        >
          <option value="">
            {isLoadingLocations
              ? "Loading states..."
              : isLocationError
                ? "Unable to load states"
                : "Select state"}
          </option>
          {form.state && !selectedState && (
            <option value={form.state}>{form.state}</option>
          )}
          {states.map((state) => (
            <option key={state.id} value={state.name}>
              {state.name}
            </option>
          ))}
        </SelectField>

        <SelectField
          id="address-city"
          label="City/District/Town*"
          value={
            selectedCity || (form.city && cities.length === 0 ? form.city : "")
          }
          disabled={!selectedState || cities.length === 0}
          onChange={(e) => setValue("city", e.target.value)}
        >
          <option value="">
            {selectedState ? "Select city" : "Select state first"}
          </option>
          {form.city && !selectedCity && (
            <option value={form.city}>{form.city}</option>
          )}
          {cities.map((city) => (
            <option key={city} value={city}>
              {city}
            </option>
          ))}
        </SelectField>

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
      </div>
      {isLocationError && (
        <p className={styles.locationError} role="alert">
          Could not load states and cities. Please try again later.
        </p>
      )}

      <div className={styles.actions}>
        <button
          type="button"
          className={`${styles.cancelBtn} ctaBtn`}
          onClick={onClose}
        >
          CANCEL
        </button>

        <button
          type="submit"
          className={`${styles.saveBtn} ctaBtn`}
          disabled={!isFormValid}
        >
          {isEditing ? "UPDATE" : "SAVE ADDRESS"}
        </button>
      </div>
    </form>
  );
};

export default AddressForm;
