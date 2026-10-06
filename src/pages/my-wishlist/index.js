import Layout from "@/components/Layout/Layout";
import CustomerInfo from "@/components/my-profile/customer-info/CustomerInfo";
import MyWishlist from "@/components/my-wishlist/MyWishlist";
import React from "react";

const MyWishlistPage = () => {
  return (
    <Layout>
      <div className="row sitePadding align-items-start">
        <div className="col-xl-3 col-md-12">
          <CustomerInfo />
        </div>

        <div className="col-xl-9 col-md-12">
          <MyWishlist />
        </div>
      </div>
    </Layout>
  );
};

export default MyWishlistPage;