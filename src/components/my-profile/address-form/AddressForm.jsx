
import React, { useEffect, useMemo, useState } from "react";
import { MdMyLocation } from "react-icons/md";
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

const DUMMY_USER = {
  name: "Darshan",
  email: "darshan@example.com",
  phone: "9876543210",
};

const AddressForm = ({
  onClose,
  onSave,
  initialValues = null,
  title,
  isEditing = false,
  addressId = null,
  refetchCartData,
}) => {
  const [form, setForm] = useState(EMPTY_FORM);
  const [isPhoneVerified, setIsPhoneVerified] = useState(false);
  const [isLocating, setIsLocating] = useState(false);

  useEffect(() => {
    if (initialValues) {
      setForm({
        name: initialValues.name || "",
        email: initialValues.email || "",
        phone: initialValues.phone || "",
        alternate_phone: initialValues.alternate_phone || "",
        flat: initialValues.flat || "",
        area: initialValues.area || "",
        landmark: initialValues.landmark || "",
        pincode: initialValues.pincode || "",
        city: initialValues.city || "",
        state: initialValues.state || "",
        country: initialValues.country || "INDIA",
      });

      if (initialValues.phone) {
        setIsPhoneVerified(true);
      }

      return;
    }

    setForm((prev) => ({
      ...prev,
      name: DUMMY_USER.name,
      email: DUMMY_USER.email,
      phone: DUMMY_USER.phone,
    }));

    setIsPhoneVerified(true);
  }, [initialValues]);

  const updateField = (field) => (e) => {
    setForm((prev) => ({
      ...prev,
      [field]: e.target.value,
    }));
  };

  const isFormValid = useMemo(() => {
    return (
      form.name.trim() &&
      form.email.trim() &&
      form.phone.trim() &&
      form.flat.trim() &&
      form.pincode.trim() &&
      form.city.trim() &&
      form.state.trim() &&
      form.country.trim()
    );
  }, [form]);

  const handleUseLocation = async () => {
    if (!navigator.geolocation) {
      alert("Geolocation is not supported by your browser.");
      return;
    }

    setIsLocating(true);

    try {
      await new Promise((resolve, reject) => {
        navigator.geolocation.getCurrentPosition(
          (position) => {
            console.log("Current location:", {
              latitude: position.coords.latitude,
              longitude: position.coords.longitude,
            });

            resolve(position);
          },
          (error) => {
            reject(error);
          }
        );
      });

      /*
       * Dummy location data.
       * In the API version, this data was coming
       * from the location API using latitude/longitude.
       */
      setForm((prev) => ({
        ...prev,
        area: "I C Colony",
        pincode: "400103",
        city: "Mumbai",
        state: "Maharashtra",
        country: "INDIA",
      }));

      alert("Location detected successfully.");
    } catch (error) {
      console.log(error);

      alert("Unable to get your location. Please enter manually.");
    } finally {
      setIsLocating(false);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!isFormValid) return;

    const savedAddress = {
      ...form,
      ...(isEditing && addressId ? { id: addressId } : {}),
    };

    /*
     * Send the form data to the parent component.
     * DeliveryAddress.jsx will handle adding/updating
     * the dummy address in local state.
     */
    onSave?.(savedAddress);

    onClose?.();
  };

  return (
    <form className={styles.root} onSubmit={handleSubmit}>
      <h2 className={styles.title}>
        {title || "Add Delivery Address"}
      </h2>

      <div className={styles.grid}>
        <div className={styles.field}>
          <input
            id="address-name"
            className={styles.input}
            placeholder=" "
            value={form.name}
            onChange={updateField("name")}
            required
          />

          <label htmlFor="address-name" className={styles.label}>
            Name*
          </label>
        </div>

        <div className={styles.field}>
          <input
            id="address-email"
            type="email"
            className={styles.input}
            placeholder=" "
            value={form.email}
            onChange={updateField("email")}
            required
          />

          <label htmlFor="address-email" className={styles.label}>
            Email Id*
          </label>
        </div>

        <div className={`${styles.field} ${styles.phoneField}`}>
          <input
            id="address-phone"
            type="tel"
            className={styles.input}
            placeholder=" "
            value={form.phone}
            onChange={(e) => {
              const val = e.target.value
                .replace(/[^0-9]/g, "")
                .slice(0, 10);

              updateField("phone")({
                target: {
                  value: val,
                },
              });
            }}
            maxLength={10}
            required
          />

          <label htmlFor="address-phone" className={styles.label}>
            Phone Number*
          </label>

          {isPhoneVerified && (
            <span className={styles.verifiedBadge}>
              VERIFIED
            </span>
          )}
        </div>

        <div className={styles.field}>
          <input
            id="address-alt-phone"
            type="tel"
            inputMode="numeric"
            className={styles.input}
            placeholder=" "
            value={form.alternate_phone}
            onChange={(e) => {
              const val = e.target.value
                .replace(/[^0-9]/g, "")
                .slice(0, 10);

              updateField("alternate_phone")({
                target: {
                  value: val,
                },
              });
            }}
            maxLength={10}
            pattern="^\d{10}$"
          />

          <label htmlFor="address-alt-phone" className={styles.label}>
            Enter Alternate Phone Number
          </label>
        </div>

        <button
          type="button"
          className={styles.locationBtn}
          onClick={handleUseLocation}
          disabled={isLocating}
        >
          <MdMyLocation size={18} />

          {isLocating
            ? "LOCATING..."
            : "USE MY LOCATION"}
        </button>

        <div className={styles.field}>
          <input
            id="address-flat"
            className={styles.input}
            placeholder=" "
            value={form.flat}
            onChange={updateField("flat")}
            required
          />

          <label htmlFor="address-flat" className={styles.label}>
            Flat, House No., Building, Company*
          </label>
        </div>

        <div className={styles.field}>
          <input
            id="address-area"
            className={styles.input}
            placeholder=" "
            value={form.area}
            onChange={updateField("area")}
          />

          <label htmlFor="address-area" className={styles.label}>
            Area, Street, Sector, Village
          </label>
        </div>

        <div className={styles.field}>
          <input
            id="address-landmark"
            className={styles.input}
            placeholder=" "
            value={form.landmark}
            onChange={updateField("landmark")}
          />

          <label htmlFor="address-landmark" className={styles.label}>
            Landmark
          </label>
        </div>

        <div className={styles.field}>
          <input
            id="address-pincode"
            type="text"
            className={styles.input}
            placeholder=" "
            value={form.pincode}
            onChange={(e) => {
              const val = e.target.value
                .replace(/[^0-9]/g, "")
                .slice(0, 6);

              updateField("pincode")({
                target: {
                  value: val,
                },
              });
            }}
            pattern="^\d{6}$"
            maxLength={6}
            required
          />

          <label htmlFor="address-pincode" className={styles.label}>
            Pincode*
          </label>
        </div>

        <div className={styles.field}>
          <input
            id="address-city"
            className={styles.input}
            placeholder=" "
            value={form.city}
            onChange={(e) => {
              const val = e.target.value
                .replace(/[^a-zA-Z\s]/g, "")
                .slice(0, 20);

              updateField("city")({
                target: {
                  value: val,
                },
              });
            }}
            maxLength={20}
            required
          />

          <label htmlFor="address-city" className={styles.label}>
            City/District/Town*
          </label>
        </div>

        <div className={styles.field}>
          <input
            id="address-state"
            inputMode="text"
            className={styles.input}
            placeholder=" "
            value={form.state}
            onChange={(e) => {
              const val = e.target.value
                .replace(/[^a-zA-Z\s]/g, "")
                .slice(0, 20);

              updateField("state")({
                target: {
                  value: val,
                },
              });
            }}
            maxLength={20}
            required
          />

          <label htmlFor="address-state" className={styles.label}>
            State*
          </label>
        </div>

        <div className={styles.field}>
          <input
            id="address-country"
            className={styles.input}
            placeholder=" "
            value={form.country}
            onChange={updateField("country")}
            required
          />

          <label htmlFor="address-country" className={styles.label}>
            Country*
          </label>
        </div>
      </div>

      <div className={styles.actions}>
        <button
          type="button"
          className={styles.cancelBtn}
          onClick={onClose}
        >
          CANCEL
        </button>

        <button
          type="submit"
          className={styles.saveBtn}
          disabled={!isFormValid}
        >
          {isEditing
            ? "UPDATE"
            : "SAVE ADDRESS"}
        </button>
      </div>
    </form>
  );
};

export default AddressForm;

