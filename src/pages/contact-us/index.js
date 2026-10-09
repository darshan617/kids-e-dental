import ContactUs from "@/components/contact-us/ContactUs";
import TrustedCountries from "@/components/home/trusted-countries/TrustedCountries";
import Layout from "@/components/Layout/Layout";
import React from "react";

const ContactUsPage = () => {
  return (
    <Layout>
      <ContactUs />
      <TrustedCountries />
    </Layout>
  );
};

export default ContactUsPage;
