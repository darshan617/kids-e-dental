"use client";

import React, { useState } from "react";
import AddressForm from "@/components/my-profile/address-form/AddressForm";
import styles from "@/components/my-profile/delivery-address/DeliveryAddress.module.css";
import { FaTrash } from "react-icons/fa";
import CustomPopup from "@/common-component/custom-popup/CustomPopup";

const DUMMY_ADDRESSES = [
  {
    id: 1,
    name: "Darshan",
    flat: "Flat 101",
    area: "I C Colony",
    landmark: "Near Borivali West",
    city: "Mumbai",
    state: "Maharashtra",
    country: "India",
    pincode: "400103",
    phone: "9876543210",
  },
  {
    id: 2,
    name: "Saif",
    flat: "Flat 202",
    area: "Link Road",
    landmark: "Near Mall",
    city: "Mumbai",
    state: "Maharashtra",
    country: "India",
    pincode: "400050",
    phone: "9876543210",
  },
];

const formatAddressLine = (addr) => {
  const streetPart = [addr.flat, addr.area, addr.landmark]
    .filter(Boolean)
    .join(", ");
  const locationPart = [addr.city, addr.state, addr.country]
    .filter(Boolean)
    .join(", ");

  let line = [streetPart, locationPart].filter(Boolean).join(", ");
  if (addr.pincode) line += ` - ${addr.pincode}`;
  return line;
};

const DeliveryAddress = ({
  type = "profile", 
  handleUpdateCart,
  setShowAddressForm,
  showAddressForm,
  refetchCartData,
  address,
  addressCount,
  handleChangeDeliveryAddress,
}) => {
  const [localShowForm, setLocalShowForm] = useState(false);

  const isControlled =
    typeof showAddressForm === "boolean" &&
    typeof setShowAddressForm === "function";

  const formVisible = isControlled ? showAddressForm : localShowForm;
  const setFormVisible = isControlled ? setShowAddressForm : setLocalShowForm;

  const [addresses, setAddresses] = useState(DUMMY_ADDRESSES);
  const [selectedAddressId, setSelectedAddressId] = useState(
    DUMMY_ADDRESSES[0]?.id ?? null,
  );
  const [deliveryAddressId, setDeliveryAddressId] = useState(
    DUMMY_ADDRESSES[0]?.id ?? null,
  );
  const [editingAddress, setEditingAddress] = useState(null);
  const [showEditPopup, setShowEditPopup] = useState(false);
  const [showAllAddresses, setShowAllAddresses] = useState(false);

  const popupOpen = showEditPopup || formVisible;
  const isCart = type === "cart";

  const deliveryAddr = addresses.find((a) => a.id === deliveryAddressId);
  const shownAddress = deliveryAddr
    ? {
        name: deliveryAddr.name,
        address: formatAddressLine(deliveryAddr),
        mobile: deliveryAddr.phone,
      }
    : address;
  const shownCount = addresses.length || addressCount || 0;

  const openAddForm = () => {
    setEditingAddress(null);
    setShowEditPopup(false);
    setShowAllAddresses(false);
    setFormVisible(true);
  };

  const closeForm = () => {
    setShowEditPopup(false);
    setFormVisible(false);
    setEditingAddress(null);
  };

  const openChangeAddress = () => {
    setSelectedAddressId(deliveryAddressId ?? addresses[0]?.id ?? null);
    setShowAllAddresses(true);
    handleChangeDeliveryAddress?.();
  };

  const handleSelect = (id) => {
    setSelectedAddressId(id);
    if (!isCart && handleUpdateCart) handleUpdateCart(null, null, id);
  };

  const handleDeliverHere = (addr) => {
    setDeliveryAddressId(addr.id);
    setSelectedAddressId(addr.id);
    handleUpdateCart?.(null, null, addr.id);
    setShowAllAddresses(false);
  };

  const handleEditAddress = (e, addr) => {
    e.stopPropagation();
    setEditingAddress(addr);
    setShowAllAddresses(false);
    setShowEditPopup(true);
  };

  const handleDeleteAddress = (e, addr) => {
    e.stopPropagation();
    const updated = addresses.filter((item) => item.id !== addr.id);
    setAddresses(updated);
    if (selectedAddressId === addr.id) {
      setSelectedAddressId(updated[0]?.id ?? null);
    }
    if (deliveryAddressId === addr.id) {
      setDeliveryAddressId(updated[0]?.id ?? null);
    }
  };

  const handleAddressSave = (saved) => {
    if (!saved) return;

    if (saved.id) {
      setAddresses((prev) =>
        prev.map((item) =>
          item.id === saved.id ? { ...item, ...saved } : item,
        ),
      );
      setSelectedAddressId(saved.id);
    } else {
      const newAddress = { ...saved, id: Date.now() };
      setAddresses((prev) => [...prev, newAddress]);
      setSelectedAddressId(newAddress.id);
      if (!deliveryAddressId) setDeliveryAddressId(newAddress.id);
    }

    if (isCart && refetchCartData) refetchCartData();

    closeForm();
  };

  const renderAddressCard = (addr, { showDeliverHere = false } = {}) => {
    const isSelected = selectedAddressId === addr.id;

    return (
      <div
        key={addr.id}
        className={`${styles.selectAddressCard} ${
          isSelected ? styles.selectAddressCardActive : ""
        }`}
        onClick={() => handleSelect(addr.id)}
      >
        <label
          className={styles.selectAddressHeader}
          onClick={(e) => e.stopPropagation()}
        >
          <input
            type="radio"
            name="deliveryAddress"
            className={styles.selectAddressRadio}
            checked={isSelected}
            onChange={() => handleSelect(addr.id)}
          />
          <span className={styles.selectAddressName}>{addr.name}</span>
        </label>

        <p className={styles.selectAddressLine}>{formatAddressLine(addr)}</p>
        <p className={styles.selectAddressMobile}>Mobile : {addr.phone}</p>

        {isSelected && (
          <div
            className={styles.selectAddressActions}
            onClick={(e) => e.stopPropagation()}
          >
            {showDeliverHere && (
              <button
                type="button"
                className="ctaBtn"
                onClick={() => handleDeliverHere(addr)}
              >
                DELIVER HERE
              </button>
            )}

            <button
              type="button"
              className="ctaBtn"
              onClick={(e) => handleEditAddress(e, addr)}
            >
              EDIT
            </button>

            <button
              type="button"
              className={styles.deleteAddressBtn}
              onClick={(e) => handleDeleteAddress(e, addr)}
            >
              <FaTrash size={16} />
            </button>
          </div>
        )}
      </div>
    );
  };

  return (
    <section className={styles.checkoutSection}>
      {isCart ? (
        <div className={styles.content}>
          <p className={styles.sectionLabel}>Delivery Address ({shownCount})</p>

          <div className={styles.addressCard}>
            {shownAddress?.address ? (
              <>
                <p className={styles.addressName}>{shownAddress?.name}</p>
                <p className={styles.addressLine}>{shownAddress?.address}</p>
                <p className={styles.addressMobile}>
                  Mobile : {shownAddress?.mobile}
                </p>
              </>
            ) : (
              <p className="m-0 small">
                No Address Found. Please add a new address.
              </p>
            )}

            <div className={styles.addressActions}>
              <button
                type="button"
                className={styles.changeBtn}
                onClick={openChangeAddress}
                disabled={!shownAddress?.address}
                style={{
                  opacity: !shownAddress?.address ? 0.5 : 1,
                  cursor: !shownAddress?.address ? "not-allowed" : "pointer",
                }}
              >
                Change Delivery Address
              </button>

              <button
                type="button"
                className={styles.addBtn}
                onClick={openAddForm}
              >
                + Add New Delivery Address
              </button>
            </div>
          </div>
        </div>
      ) : (
        <div className={styles.content}>
          <div className="d-flex justify-content-between align-items-center">
            <p className={styles.sectionLabel}>
              Delivery Address ({addresses.length})
            </p>

            <button
              type="button"
              className={styles.addBtn}
              onClick={openAddForm}
            >
              + Add New Delivery Address
            </button>
          </div>

          <div className={styles.addressList}>
            {addresses.length > 0 ? (
              addresses.map((addr) => renderAddressCard(addr))
            ) : (
              <p className="m-0 small">
                No Address Found. Please add a new address.
              </p>
            )}
          </div>
        </div>
      )}

      {popupOpen && (
        <CustomPopup isOpen={popupOpen} onClose={closeForm} size="lg">
          <AddressForm
            key={editingAddress?.id ?? "new"}
            initialValues={editingAddress}
            title={
              editingAddress ? "Edit Delivery Address" : "Add Delivery Address"
            }
            onClose={closeForm}
            onSave={handleAddressSave}
            isEditing={!!editingAddress}
            addressId={editingAddress?.id}
          />
        </CustomPopup>
      )}

      {showAllAddresses && (
        <CustomPopup
          isOpen={showAllAddresses}
          onClose={() => setShowAllAddresses(false)}
          size="lg"
        >
          <div className={styles.addressesPopup}>
            <h2 className={styles.addressesPopupTitle}>
              Select Delivery Address
            </h2>

            <div className={styles.addressList}>
              {addresses.length > 0 ? (
                addresses.map((addr) =>
                  renderAddressCard(addr, { showDeliverHere: true }),
                )
              ) : (
                <>
                  <p className="m-0 small">
                    No Address Found. Please add a new address.
                  </p>
                  <button
                    type="button"
                    className={styles.addBtn}
                    onClick={openAddForm}
                  >
                    + Add New Delivery Address
                  </button>
                </>
              )}
            </div>
          </div>
        </CustomPopup>
      )}
    </section>
  );
};

export default DeliveryAddress;
