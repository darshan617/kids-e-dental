"use client";

import React from "react";
import styles from "@/components/privacy-policy/PrivacyPolicy.module.css";
import { useGetTermConditionDataQuery } from "@/redux/apis/termsConditionsApi";

const TermsAndConditions = () => {
  const { data, isLoading, isError } = useGetTermConditionDataQuery();

  const content = data?.data?.content;

  return (
    <>
      <section className="py-5 sitePadding bgPrimary">
        <div className="container-fluid vstack align-items-center gap-2 animateThis fadeIn">
          <h1 className="sectionHead fw-bold mb-0">Terms & Conditions</h1>
        </div>
      </section>

      <section className="sitePadding py-sm-5 py-4">
        <div className="container-fluid">
          <div
            className={`${styles.generalContent} w-100 mx-auto`}
            style={{ maxWidth: "1200px" }}
          >
            {isLoading && <p>Loading...</p>}

            {isError && (
              <p className="text-danger">
                Failed to load terms & conditions. Please try again later.
              </p>
            )}

            {!isLoading && !isError && content && (
              <div dangerouslySetInnerHTML={{ __html: content }} />
            )}

            {!isLoading && !isError && !content && <p>No content available.</p>}
          </div>
        </div>
      </section>
    </>
  );
};

export default TermsAndConditions;
