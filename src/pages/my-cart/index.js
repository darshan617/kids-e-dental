import Layout from "@/components/Layout/Layout";
import CartSummary from "@/components/my-cart/cart-summary/cartSummary";
import CartDetails from "@/components/my-cart/item-info/CartDetails";
import React from "react";

const cartPage = () => {
  return (
    <Layout>
      <div className="sitePadding">
        <div className="row">
          <div className="col-xl-8 col-md-12 col-12">
            <CartDetails />
          </div>
          <div className="col-xl-4 col-md-12 col-12 mt-5">
            <CartSummary />
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default cartPage;
