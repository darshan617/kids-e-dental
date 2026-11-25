import Layout from "@/components/Layout/Layout";
import CartSummary from "@/components/my-cart/cart-summary/cartSummary";
import CartDetails from "@/components/my-cart/item-info/CartDetails";
import { useToast } from "@/custom-hooks/toast/ToastProvider";
import {
  useGetCartQuery,
  useUpdateCartMutation,
  useRemoveCartMutation,
} from "@/redux/apis/addToCartApi";
import React from "react";

const cartPage = () => {
  const {
    data: cartData,
    isLoading: isCartLoading,
    refetch,
  } = useGetCartQuery();

  const { showToast } = useToast();
  const [updateCart, { isLoading: isUpdating }] = useUpdateCartMutation();
  const [removeCart] = useRemoveCartMutation();

  const handleUpdateCart = async (id, quantity) => {
    try {
      const res = await updateCart({
        body: {
          cart_id: id,
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
      showToast(error?.data?.message, "error");
    }
  };

  const handleRemoveCart = async (id) => {
    try {
      const res = await removeCart({
        body: {
          cart_id: id,
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

  // Check if cart has items
  const cartItems = cartData?.data || [];
  const hasItems = Array.isArray(cartItems) && cartItems.length > 0;

  return (
    <Layout>
      <div className="sitePadding">
        <div className="row">
          <div className={hasItems ? "col-xl-8 col-md-12 col-12" : "col-12"}>
            <CartDetails
              cartData={cartData?.data}
              totalAmount={cartData?.cart_summary?.grand_total}
              handleUpdateCart={handleUpdateCart}
              handleRemoveCart={handleRemoveCart}
              isUpdating={isUpdating}
            />
          </div>

          {hasItems && (
            <div className="col-xl-4 col-md-12 col-12 mt-5">
              <CartSummary cartData={cartData} />
            </div>
          )}
        </div>
      </div>
    </Layout>
  );
};

export default cartPage;
