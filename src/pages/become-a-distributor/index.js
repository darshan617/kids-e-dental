import BecomeDistributor from "@/components/become-distributor/BecomeDistributor";
import TrustedCountries from "@/components/home/trusted-countries/TrustedCountries";
import Layout from "@/components/Layout/Layout";
import React from "react";

const BecomeDistributorPage = () => {
  return (
    <Layout>
      <BecomeDistributor />
      <TrustedCountries title="Our Distributors supply worldwide" />
    </Layout>
  );
};

export default BecomeDistributorPage;
