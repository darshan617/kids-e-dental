import BioflxBanner from "@/components/bioflx/bioflx-banner/BioflxBanner";
import Features from "@/components/bioflx/features/Features";
import KitSystem from "@/components/bioflx/kit-system/KitSystem";
import Testimonial from "@/components/bioflx/testimonial/Testimonial";
import Layout from "@/components/Layout/Layout";
import React from "react";

const productCategory = () => {
  return (
    <Layout>
      <BioflxBanner />
      <Features />
      <Testimonial />
      <KitSystem />
    </Layout>
  );
};

export default productCategory;
