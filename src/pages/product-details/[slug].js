"use client";

import React, { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import ProductDetailComponent from "@/components/product-detail/ProductDetailComponent";
import { useProductDetailsMutation } from "@/redux/apis/productDetailApi";
import { useRouter } from "next/router";

const ProductDetailsPage = () => {
  const params = useParams();
  const slug = params?.slug;
const router = useRouter()
  const [productDetails, { isLoading, isError, error }] =
    useProductDetailsMutation();
    const [productData, setProductData] = useState({})
console.log(productData);

  const fetchProductDetail = async () => {
    try {
      const res = await productDetails({
        slug: router?.query?.slug,
        body: {
          arch: "",
          size: 1,
        },
      });
      console.log(res);
      
      if(res?.data?.status){
      
        
        setProductData(res?.data?.data)
      }
      else{
        console.log(res?.data?.message);
        
      }
    } catch (error) {
      console.log(error, 'error in fetchProductDetail');
    }
  };
  useEffect(() => {
    if(!router?.isReady) return
    fetchProductDetail();
  }, [router?.isReady]);

  return (
    <ProductDetailComponent
      productDetails={productData}
      isError={isError}
      error={error}
    />
  );
};

export default ProductDetailsPage;
