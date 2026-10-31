import React, { useMemo } from "react";
import styles from "@/components/privacy-policy/PrivacyPolicy.module.css";
import { useGetPolicyDataQuery } from "@/redux/apis/privacyPolicyApi";

const normalizeContent = (content) => {
  if (typeof content === "string") return content;
  if (Array.isArray(content)) {
    return content.map((item) => item?.text || "").join("");
  }
  return "";
};

const PrivacyPolicy = () => {
  const { data, isLoading, isError } = useGetPolicyDataQuery();

  const html = useMemo(() => normalizeContent(data?.data?.content), [data]);

  return (
    <>
      <section className="py-5 sitePadding bgPrimary">
        <div className="container-fluid vstack align-items-center gap-2 animateThis fadeIn">
          <h1 className="sectionHead fw-bold mb-0">Privacy Policy</h1>
        </div>
      </section>

      <section className="sitePadding py-sm-5 py-4">
        <div className="container-fluid">
          <div
            className={`${styles.generalContent} w-100 mx-auto`}
            style={{ maxWidth: "1200px" }}
          >
            {isLoading ? (
              <p>Loading privacy policy...</p>
            ) : isError ? (
              <p>Something went wrong. Please try again later.</p>
            ) : html ? (
              <div dangerouslySetInnerHTML={{ __html: html }} />
            ) : (
              <p>Privacy policy content is currently unavailable.</p>
            )}
          </div>
        </div>
      </section>
    </>
  );
};

export default PrivacyPolicy;
