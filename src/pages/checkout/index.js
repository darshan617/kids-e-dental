import React, { useState } from "react";

import Layout from "@/components/Layout/Layout";

import DeliveryAddress from "@/components/my-profile/delivery-address/DeliveryAddress";

import CartSummary from "@/components/my-cart/cart-summary/cartSummary";

import CartDetails from "@/components/my-cart/item-info/CartDetails";
import {
  useGetBuyNowQuery,
  useRemoveCheckoutItemMutation,
  useUpdateCheckoutMutation,
} from "@/redux/apis/checkoutApi";
import {
  useRemoveCartMutation,
  useUpdateCartMutation,
} from "@/redux/apis/addToCartApi";

const CheckoutPage = () => {
  const [showAddressForm, setShowAddressForm] = useState(false);
  const { data: buyNowData, refetch } = useGetBuyNowQuery();

  const [updateCheckout] = useUpdateCheckoutMutation();
  const [removeCheckout] = useRemoveCheckoutItemMutation();

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

  const handleUpdateCart = async (id, quantity, addressId) => {
    try {
      const res = await updateCheckout({
        body: {
          buy_now_id: id,
          quantity: quantity,
        },
      }).unwrap();

      if (res?.success || res?.status) {
        refetch();
      } else {
        console.error(res?.message || "Failed to update cart");
      }
    } catch (error) {
      console.error("Error updating cart:", error);
    }
  };
  const handleRemoveCart = async (id) => {
    try {
      const res = await removeCheckout({
        body: {
          buy_now_id: id,
        },
      }).unwrap();

      if (res?.success || res?.status) {
        refetch();
      } else {
        console.error(res?.message || "Failed to remove cart");
      }
    } catch (error) {
      console.error("Error removing cart item:", error);
    }
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
              refetchCartData={refetch}
            />

            <div className="mt-3">
              <CartDetails
                cartData={buyNowData?.data}
                handleUpdateCart={handleUpdateCart}
                handleRemoveCart={handleRemoveCart}
              />
            </div>
          </div>
          <div className="col-12 col-lg-4 mt-3 mb-3">
            <CartSummary cartData={buyNowData} />
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default CheckoutPage;
