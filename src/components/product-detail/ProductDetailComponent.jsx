import React from "react";
import Layout from "../Layout/Layout";
import ProductInfo from "./product-info/ProductInfo";
import ReviewRating from "./review-rating/ReviewRating";
import SimilarProduct from "./similar-product/SimilarProduct";

const ProductDetailComponent = ({ productDetails, isLoading, isError }) => {
  const product = productDetails;

  let content;

  if (isLoading) {
    content = (
      <div className="container py-5 text-center">Loading product...</div>
    );
  } else if (isError || !product) {
    content = (
      <div className="container py-5 text-center">Something went wrong.</div>
    );
  } else {
    content = (
      <>
        <ProductInfo key={product.id} product={product} />
        <ReviewRating product={product} />
        <SimilarProduct products={product.similar_products} />
      </>
    );
  }

  return <Layout>{content}</Layout>;
};

export default ProductDetailComponent;
