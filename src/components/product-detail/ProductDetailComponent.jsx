import React from "react";
import Layout from "../Layout/Layout";
import ProductInfo from "./product-info/ProductInfo";
import ReviewRating from "./review-rating/ReviewRating";
import FeaturedProduct from "../home/featured-product/FeaturedProduct";

const ProductDetailComponent = ({
  productDetails,
  isLoading,
  isError,
  error,
}) => {
  const product = productDetails;

  let content;

  if (isLoading) {
    content = <div className="container py-5 text-center">Loading product...</div>;
  } else if (isError || !productDetails?.status || !product) {
    content = (
      <div className="container py-5 text-center">
        {error?.data?.message || "Product not found."}
      </div>
    );
  } else {
    content = (
      <>
        <ProductInfo key={product.id} product={product} />
        <ReviewRating product={product} />
        <FeaturedProduct products={product.similar_products} />
      </>
    );
  }

  return <Layout>{content}</Layout>;
};

export default ProductDetailComponent;