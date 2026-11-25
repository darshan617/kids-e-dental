import React, { useState, useSyncExternalStore } from "react";
import { useRouter } from "next/router";
import Cookies from "js-cookie";

import Layout from "@/components/Layout/Layout";
import AuthPopup from "@/common-component/auth-popup/AuthPopup";

import DeliveryAddress from "@/components/my-profile/delivery-address/DeliveryAddress";

import CartSummary from "@/components/my-cart/cart-summary/cartSummary";

import CartDetails from "@/components/my-cart/item-info/CartDetails";
import {
  useGetBuyNowQuery,
  useRemoveCheckoutItemMutation,
  useUpdateCheckoutMutation,
} from "@/redux/apis/checkoutApi";
import {
  useGetCartQuery,
  useRemoveCartMutation,
  useUpdateCartMutation,
} from "@/redux/apis/addToCartApi";
import { useGetAddressQuery } from "@/redux/apis/addressApi";
import { useToast } from "@/custom-hooks/toast/ToastProvider";

const AUTH_STATE_CHANGE_EVENT = "kids-e-dental:auth-state-change";

const getUserData = () => {
  try {
    const raw = Cookies.get("userData");
    return raw ? JSON.parse(decodeURIComponent(raw)) : null;
  } catch (error) {
    console.error("Failed to read userData cookie:", error);
    return null;
  }
};

const subscribeToAuthChanges = (callback) => {
  if (typeof window === "undefined") return () => {};

  window.addEventListener(AUTH_STATE_CHANGE_EVENT, callback);
  return () => window.removeEventListener(AUTH_STATE_CHANGE_EVENT, callback);
};

const getAuthSnapshot = () => Boolean(getUserData()?.id);
const getServerAuthSnapshot = () => null;

const CheckoutPage = () => {
  const router = useRouter();
  const { showToast } = useToast();
  const isAuthenticated = useSyncExternalStore(
    subscribeToAuthChanges,
    getAuthSnapshot,
    getServerAuthSnapshot,
  );
  const isCartCheckout = router.isReady && router.query.source === "cart";
  const [showAddressForm, setShowAddressForm] = useState(false);

  const {
    data: buyNowData,
    refetch: refetchBuyNow,
    isLoading: isBuyNowLoading,
    isFetching: isBuyNowFetching,
  } = useGetBuyNowQuery(undefined, {
    refetchOnMountOrArgChange: true,
    skip: !router.isReady || isAuthenticated !== true || isCartCheckout,
  });
  const {
    data: cartResponse,
    refetch: refetchCart,
    isLoading: isCartLoading,
    isFetching: isCartFetching,
  } = useGetCartQuery(undefined, {
    refetchOnMountOrArgChange: true,
    skip: !router.isReady || isAuthenticated !== true || !isCartCheckout,
  });

  const [updateCheckout] = useUpdateCheckoutMutation();
  const [removeCheckout] = useRemoveCheckoutItemMutation();
  const [updateCart, { isLoading: isUpdating }] = useUpdateCartMutation();
  const [removeCart] = useRemoveCartMutation();
  const { data: addressRes } = useGetAddressQuery(undefined, {
    skip: isAuthenticated !== true,
  });
  const addresses = addressRes?.data ?? [];
  const hasAddress = addresses.length > 0;

  const activeResponse = isCartCheckout ? cartResponse : buyNowData;
  const checkoutItems = Array.isArray(activeResponse?.data)
    ? activeResponse.data
    : [];
  const isWaitingForItems =
    !router.isReady ||
    (checkoutItems.length === 0 &&
      (isCartCheckout
        ? isCartLoading || isCartFetching
        : isBuyNowLoading || isBuyNowFetching));

  const handleChangeDeliveryAddress = () => {
    console.log("Change delivery address clicked");
  };

  const refetchCheckout = () => {
    if (isCartCheckout) refetchCart();
    else refetchBuyNow();
  };

  const handleUpdateCart = async (id, quantity) => {
    try {
      const res = isCartCheckout
        ? await updateCart({
            body: {
              cart_id: id,
              quantity: quantity,
            },
          }).unwrap()
        : await updateCheckout({
            body: {
              buy_now_id: id,
              quantity: quantity,
            },
          }).unwrap();

      if (res?.success || res?.status) {
        refetchCheckout();
      } else {
        console.error(res?.message || "Failed to update cart");
      }
    } catch (error) {
      console.error("Error updating cart:", error);
      showToast(error?.data?.message, "error");
    }
  };
  const handleRemoveCart = async (id) => {
    try {
      const res = isCartCheckout
        ? await removeCart({
            body: {
              cart_id: id,
            },
          }).unwrap()
        : await removeCheckout({
            body: {
              buy_now_id: id,
            },
          }).unwrap();

      if (res?.success || res?.status) {
        refetchCheckout();
      } else {
        console.error(res?.message || "Failed to remove cart");
      }
    } catch (error) {
      console.error("Error removing cart item:", error);
    }
  };

  const handleLoginPopupClose = () => {
    if (getUserData()?.id) {
      window.dispatchEvent(new Event(AUTH_STATE_CHANGE_EVENT));
    } else {
      router.replace("/my-cart");
    }
  };

  if (isAuthenticated !== true) {
    return (
      <Layout>
        <AuthPopup
          isOpen={isAuthenticated === false}
          onClose={handleLoginPopupClose}
        />
      </Layout>
    );
  }

  return (
    <Layout>
      <div className="container-fluid sitePadding">
        <div className="row">
          <div className="col-12 col-lg-8 mt-3">
            <DeliveryAddress
              type="cart"
              handleChangeDeliveryAddress={handleChangeDeliveryAddress}
              showAddressForm={showAddressForm}
              setShowAddressForm={setShowAddressForm}
              handleUpdateCart={handleUpdateCart}
              refetchCartData={refetchCheckout}
            />

            <div className="mt-3">
              <CartDetails
                cartData={checkoutItems}
                handleUpdateCart={handleUpdateCart}
                handleRemoveCart={handleRemoveCart}
                isLoading={isWaitingForItems}
                isUpdating={isUpdating}
              />
            </div>
          </div>
          <div className="col-12 col-lg-4 mt-3 mb-3">
            <CartSummary
              cartData={activeResponse}
              couponSource={isCartCheckout ? "cart" : "buy_now"}
              hasAddress={hasAddress}
            />
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default CheckoutPage;
