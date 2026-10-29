import Layout from "@/components/Layout/Layout";
import CustomerInfo from "@/components/my-profile/customer-info/CustomerInfo";
import DeliveryAddress from "@/components/my-profile/delivery-address/DeliveryAddress";
import ProfileDetail from "@/components/my-profile/profile-detail/ProfileDetail";
import React from "react";

const ProfilePage = () => {
  return (
    <Layout>
      <div className="row sitePadding">
        <section class="py-sm-3 py-2 mb-3" style={{ background: "#fbfbfb" }}>
          <div class="container-fluid">
            <nav aria-label="breadcrumb">
              <ol class="breadcrumb mb-0">
                <li class="breadcrumb-item">
                  <a href="/">Home</a>
                </li>
                <li class="breadcrumb-item">
                  <a href="#">My Profile</a>
                </li>
              </ol>
            </nav>
          </div>
        </section>
        <div className="col-xl-3 col-md-12">
          <CustomerInfo />
        </div>
        <div className="col-xl-9 col-md-12 mt-auto mb-auto">
          <ProfileDetail />
          <DeliveryAddress type="profile" />
        </div>
      </div>
    </Layout>
  );
};

export default ProfilePage;
