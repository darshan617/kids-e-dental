import Layout from "@/components/Layout/Layout";
import CustomerInfo from "@/components/my-profile/customer-info/CustomerInfo";
import DeliveryAddress from "@/components/my-profile/delivery-address/DeliveryAddress";
import ProfileDetail from "@/components/my-profile/profile-detail/ProfileDetail";
import React from "react";

const ProfilePage = () => {
  return (
    <Layout>
      <div className="row sitePadding">
        <div className="col-xl-3 col-md-12">
          <CustomerInfo />
        </div>
        <div className="col-xl-9 col-md-12 mt-auto mb-auto">
          <ProfileDetail />
          <DeliveryAddress />
        </div>
      </div>
    </Layout>
  );
};

export default ProfilePage;
