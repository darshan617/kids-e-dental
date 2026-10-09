
import React, { useState } from "react";

import Layout from "@/components/Layout/Layout";

import DeliveryAddress from "@/components/my-profile/delivery-address/DeliveryAddress";

import CartSummary from "@/components/my-cart/cart-summary/cartSummary";

import CartDetails from "@/components/my-cart/item-info/CartDetails";

const CheckoutPage = () => {
  const [showAddressForm, setShowAddressForm] = useState(false);

  const address = {
    name: "Darshan",
    address:
      "Flat 101, I C Colony, Near Borivali West, Mumbai, Maharashtra, India - 400103",
    mobile: "9876543210",
  };

  const addressCount = 1;

  const handleChangeDeliveryAddress = () => {
    console.log("Change delivery address clicked");
  };

  const handleUpdateCart = (a, b, addressId) => {
    console.log("Update cart with address", addressId);
  };

  const refetchCartData = () => {
    console.log("Refetch cart data");
  };

  return (
    <Layout>
      <div className="container-fluid sitePadding">
        <div className="row">
          <div className="col-12 col-lg-8 mt-3">
            <DeliveryAddress
              type="cart"
              address={address}
              addressCount={addressCount}
              handleChangeDeliveryAddress={handleChangeDeliveryAddress}
              showAddressForm={showAddressForm}
              setShowAddressForm={setShowAddressForm}
              handleUpdateCart={handleUpdateCart}
              refetchCartData={refetchCartData}
            />

            <div className="mt-3">
              <CartDetails />
            </div>
          </div>
          <div className="col-12 col-lg-4 mt-3 mb-3">
            <CartSummary />
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default CheckoutPage;