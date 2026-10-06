import FeaturedProduct from "@/components/home/featured-product/FeaturedProduct";
import Layout from "@/components/Layout/Layout";
import ProductInfo from "@/components/product-detail/product-info/ProductInfo";
import ReviewRating from "@/components/product-detail/review-rating/ReviewRating";
import React from "react";

const ProductDetailsPage = () => {
  return (
    <Layout>
      <ProductInfo />
      <ReviewRating />
      <FeaturedProduct />
    </Layout>
  );
};

export default ProductDetailsPage;
