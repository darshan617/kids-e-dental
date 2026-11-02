import React, { useState, useEffect } from "react";
import Cookies from "js-cookie";
import Layout from "@/components/Layout/Layout";
import CustomerInfo from "@/components/my-profile/customer-info/CustomerInfo";
import DeliveryAddress from "@/components/my-profile/delivery-address/DeliveryAddress";
import ProfileDetail from "@/components/my-profile/profile-detail/ProfileDetail";
import AuthPopup from "@/common-component/auth-popup/AuthPopup";

const ProfilePage = () => {
  // null = not checked yet (avoids flashing the login message on load)
  const [isLoggedIn, setIsLoggedIn] = useState(null);
  const [showAuthPopup, setShowAuthPopup] = useState(false);

  const checkLogin = () => setIsLoggedIn(Boolean(Cookies.get("token")));

  useEffect(() => {
    checkLogin();

    window.addEventListener("userDataUpdated", checkLogin);
    return () => window.removeEventListener("userDataUpdated", checkLogin);
  }, []);

  const handleClosePopup = () => {
    setShowAuthPopup(false);
    // pick up a login that may have just happened in the popup
    checkLogin();
  };

  return (
    <Layout>
      <div className="row sitePadding">
        <section
          className="py-sm-3 py-2 mb-3"
          style={{ background: "#fbfbfb" }}
        >
          <div className="container-fluid">
            <nav aria-label="breadcrumb">
              <ol className="breadcrumb mb-0">
                <li className="breadcrumb-item">
                  <a href="/">Home</a>
                </li>
                <li className="breadcrumb-item">
                  <a href="#">My Profile</a>
                </li>
              </ol>
            </nav>
          </div>
        </section>

        {isLoggedIn === null && null}

        {isLoggedIn === false && (
          <div className="col-12 align-center">
            <div className="alert alert-danger mb-3" role="alert">
              Please login or signup to access this page
            </div>

            <button
              type="button"
              className="ctaBtn"
              onClick={() => setShowAuthPopup(true)}
            >
              Login / Signup
            </button>

            <AuthPopup
              isOpen={showAuthPopup}
              onClose={handleClosePopup}
              initialMode="login"
            />
          </div>
        )}

        {isLoggedIn === true && (
          <>
            <div className="col-xl-3 col-md-12">
              <CustomerInfo />
            </div>
            <div className="col-xl-9 col-md-12 mt-auto mb-auto">
              <ProfileDetail />
              <DeliveryAddress type="profile" />
            </div>
          </>
        )}
      </div>
    </Layout>
  );
};

export default ProfilePage;
