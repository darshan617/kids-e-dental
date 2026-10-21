"use client";

import React from "react";
import { useParams } from "next/navigation";
import ProductDetailComponent from "@/components/product-detail/ProductDetailComponent";
import { useGetProductDetailsQuery } from "@/redux/apis/productDetailApi";

const ProductDetailsPage = () => {
  const params = useParams();
  const slug = params?.slug;

  const {
    data: productDetails,
    isLoading,
    isFetching,
    isError,
    error,
  } = useGetProductDetailsQuery({ slug }, { skip: !slug });

  return (
    <ProductDetailComponent
      productDetails={productDetails}
      isLoading={isLoading || isFetching}
      isError={isError}
      error={error}
    />
  );
};

export default ProductDetailsPage;
