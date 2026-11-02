"use client";

import React, { useState, useEffect } from "react";
import AddressForm from "@/components/my-profile/address-form/AddressForm";
import styles from "@/components/my-profile/delivery-address/DeliveryAddress.module.css";
import { FaTrash } from "react-icons/fa";
import CustomPopup from "@/common-component/custom-popup/CustomPopup";
import {
  useGetAddressQuery,
  useDeleteAddressMutation,
} from "@/redux/apis/addressApi";

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
  handleChangeDeliveryAddress,
}) => {
  const [localShowForm, setLocalShowForm] = useState(false);
  const {
    data: addressRes,
    error: addressError,
    isLoading: isGettingAddress,
  } = useGetAddressQuery();
  const [deleteAddress, { isLoading: isDeletingAddress }] =
    useDeleteAddressMutation();
  const isControlled =
    typeof showAddressForm === "boolean" &&
    typeof setShowAddressForm === "function";

  const formVisible = isControlled ? showAddressForm : localShowForm;
  const setFormVisible = isControlled ? setShowAddressForm : setLocalShowForm;

  const [addresses, setAddresses] = useState([]);
  const [selectedAddressId, setSelectedAddressId] = useState(null);
  const [deliveryAddressId, setDeliveryAddressId] = useState(null);
  const [editingAddress, setEditingAddress] = useState(null);
  const [showEditPopup, setShowEditPopup] = useState(false);
  const [showAllAddresses, setShowAllAddresses] = useState(false);

  const popupOpen = showEditPopup || formVisible;
  const isCart = type === "cart";

  useEffect(() => {
    if (addressError) console.log("get address error:", addressError);
  }, [addressError]);

  useEffect(() => {
    if (!addressRes || isGettingAddress) return;

    const list = Array.isArray(addressRes?.data) ? addressRes.data : [];
    const preferred = list.find((a) => a.is_selected) ?? list[0];

    setAddresses(list);

    setSelectedAddressId((prev) =>
      list.some((a) => a.id === prev) ? prev : (preferred?.id ?? null),
    );
    setDeliveryAddressId((prev) =>
      list.some((a) => a.id === prev) ? prev : (preferred?.id ?? null),
    );
  }, [addressRes, isGettingAddress]);

  const deliveryAddr = addresses.find((a) => a.id === deliveryAddressId);
  const shownAddress = deliveryAddr
    ? {
        name: deliveryAddr.name,
        address: formatAddressLine(deliveryAddr),
        mobile: deliveryAddr.phone,
      }
    : null;
  const shownCount = addresses.length || 0;

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

  const handleEditAddress = async (e, addr) => {
    e.stopPropagation();
    setEditingAddress(addr);
    setShowAllAddresses(false);
    setShowEditPopup(true);
  };
  const handleDeleteAddress = async (e, addr) => {
    e.stopPropagation();
    const res = await deleteAddress({ body: { id: addr.id } }).unwrap();
    if (res?.success || res?.status) {
      if (isCart && refetchCartData) refetchCartData();
      const updated = addresses.filter((item) => item.id !== addr.id);
      setAddresses(updated);
      if (selectedAddressId === addr.id) {
        setSelectedAddressId(updated[0]?.id ?? null);
      }
      if (deliveryAddressId === addr.id) {
        setDeliveryAddressId(updated[0]?.id ?? null);
      }
    }
  };

  const handleAddressSave = (saved) => {
    if (saved?.id) setSelectedAddressId(saved.id);

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
