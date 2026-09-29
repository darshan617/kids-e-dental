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

const formatAddressLine = (a) =>
  [
    a.flat,
    a.area,
    a.landmark,
    a.city,
    a.state,
    a.country,
    a.pincode ? `- ${a.pincode}` : "",
  ]
    .filter(Boolean)
    .join(", ");

const DeliveryAddress = ({
  handleUpdateCart,
  setShowAddressForm,
  showAddressForm,
  refetchCartData,
}) => {
  // Works even if the parent doesn't pass these props
  const [localShowForm, setLocalShowForm] = useState(false);
  const formVisible = showAddressForm ?? localShowForm;
  const setFormVisible = setShowAddressForm ?? setLocalShowForm;

  const [addresses, setAddresses] = useState(DUMMY_ADDRESSES);
  const [selectedAddressId, setSelectedAddressId] = useState(
    DUMMY_ADDRESSES[0]?.id ?? null
  );
  const [editingAddress, setEditingAddress] = useState(null);

  const openAddForm = () => {
    setEditingAddress(null);
    setFormVisible(true);
  };

  const closeForm = () => {
    setFormVisible(false);
    setEditingAddress(null);
  };

  const handleSelect = (id) => {
    setSelectedAddressId(id);
    if (handleUpdateCart) handleUpdateCart(null, null, id);
  };

  const handleEditAddress = (addr) => {
    setEditingAddress(addr);
    setFormVisible(true);
  };

  const handleDeleteAddress = (addr) => {
    const updated = addresses.filter((item) => item.id !== addr.id);
    setAddresses(updated);
    if (selectedAddressId === addr.id) {
      setSelectedAddressId(updated[0]?.id ?? null);
    }
  };

  const handleAddressSave = (saved) => {
    if (!saved) return;

    if (saved.id) {
      setAddresses((prev) =>
        prev.map((item) => (item.id === saved.id ? { ...item, ...saved } : item))
      );
      setSelectedAddressId(saved.id);
    } else {
      const newAddress = { ...saved, id: Date.now() };
      setAddresses((prev) => [...prev, newAddress]);
      setSelectedAddressId(newAddress.id);
    }

    closeForm();
  };

  return (
    <section className={styles.checkoutSection}>
      <div className={styles.content}>
        <div className="d-flex justify-content-between align-items-center">
          <p className={styles.sectionLabel}>
            Delivery Address ({addresses.length})
          </p>

          <button type="button" className={styles.addBtn} onClick={openAddForm}>
            + Add New Delivery Address
          </button>
        </div>

        <div className={styles.addressList}>
          {addresses.length > 0 ? (
            addresses.map((addr) => {
              const isSelected = selectedAddressId === addr.id;

              return (
                <div
                  key={addr.id}
                  className={`${styles.selectAddressCard} ${
                    isSelected ? styles.selectAddressCardActive : ""
                  }`}
                  onClick={() => handleSelect(addr.id)}
                >
                  <label className={styles.selectAddressHeader}>
                    <input
                      type="radio"
                      name="deliveryAddress"
                      className={styles.selectAddressRadio}
                      checked={isSelected}
                      onChange={() => handleSelect(addr.id)}
                    />
                    <span className={styles.selectAddressName}>{addr.name}</span>
                  </label>

                  <p className={styles.selectAddressLine}>
                    {formatAddressLine(addr)}
                  </p>
                  <p className={styles.selectAddressMobile}>
                    Mobile : {addr.phone}
                  </p>

                  {isSelected && (
                    <div
                      className={styles.selectAddressActions}
                      onClick={(e) => e.stopPropagation()}
                    >
                      <button
                        type="button"
                        className={`${styles.editAddressBtn} ctaBtn`}
                        onClick={() => handleEditAddress(addr)}
                      >
                        EDIT
                      </button>

                      <button
                        type="button"
                        className={styles.deleteAddressBtn}
                        onClick={() => handleDeleteAddress(addr)}
                      >
                        <FaTrash size={16} />
                      </button>
                    </div>
                  )}
                </div>
              );
            })
          ) : (
            <p className="m-0 small">
              No Address Found. Please add a new address.
            </p>
          )}
        </div>
      </div>

      {formVisible && (
        <CustomPopup wide onclose={closeForm} maxWidth="700px">
          <AddressForm
            initialValues={editingAddress}
            title={editingAddress ? "Edit Delivery Address" : "Add Delivery Address"}
            onClose={closeForm}
            onSave={handleAddressSave}
            isEditing={!!editingAddress}
            addressId={editingAddress?.id}
            refetchCartData={refetchCartData}
          />
        </CustomPopup>
      )}
    </section>
  );
};

export default DeliveryAddress;