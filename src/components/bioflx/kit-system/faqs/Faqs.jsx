import React from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";
import bioflxLogo from "@/assets/images/bioflx/bioflx_logo.png";
import styles from "@/components/bioflx/kit-system/faqs/Faqs.module.css";
import { useGetFaqDataQuery } from "@/redux/apis/categoryApi";

const BioflxFaqs = () => {
  const router = useRouter();
  const slug = typeof router.query.slug === "string" ? router.query.slug : "";
  const { data, isLoading, isError, isUninitialized } = useGetFaqDataQuery(
    { slug },
    { skip: !slug },
  );

  const category = data?.category;
  const faqs = Array.isArray(data?.data) ? data.data : [];
  const title = category?.title
    ? `${category.title} - FAQs`
    : "FAQs";
  const waiting = !router.isReady || isUninitialized || isLoading;
  const breadcrumbs = [
    { label: "Home", href: "/" },
    { label: "Products", href: "/product-listing" },
    ...(category?.parent_category
      ? [{ label: category.parent_category, href: "/product-listing" }]
      : []),
    ...(category?.title
      ? [
          {
            label: category.title,
            href: `/product-category/${category.slug || slug}`,
          },
        ]
      : []),
    { label: "FAQs", active: true },
  ];

  return (
    <>
      <section
        className="sitePadding py-sm-3 py-2"
        style={{ background: "#fbfbfb" }}
      >
        <div className="container-fluid">
          <nav aria-label="breadcrumb">
            <ol className="breadcrumb mb-0">
              {breadcrumbs.map((crumb) =>
                crumb.active ? (
                  <li
                    key={crumb.label}
                    className="breadcrumb-item active"
                    aria-current="page"
                  >
                    {crumb.label}
                  </li>
                ) : (
                  <li key={crumb.label} className="breadcrumb-item">
                    <Link href={crumb.href}>{crumb.label}</Link>
                  </li>
                ),
              )}
            </ol>
          </nav>
        </div>
      </section>

      <section className={`${styles.clisupBanner} py-5 sitePadding`}>
        <div className="container-fluid vstack align-items-center gap-2 animateThis fadeIn">
          {slug === "bioflx-crown" && (
            <Image src={bioflxLogo} alt="BioFlx" />
          )}
          <h1 className="sectionHead fw-bold mb-0">{title}</h1>
        </div>
      </section>

      <section className="sitePadding py-sm-5 py-4">
        <div className="container-fluid">
          <div
            className="vstack faqList mx-auto"
            style={{ maxWidth: "1100px" }}
          >
            {waiting ? (
              <p className="mb-0">Loading FAQs...</p>
            ) : isError ? (
              <p className="mb-0">
                Something went wrong. Please try again later.
              </p>
            ) : faqs.length === 0 ? (
              <p className="mb-0">No FAQs are available for this category yet.</p>
            ) : (
              faqs.map((faq) => (
                <div className="animateThis curtainLeft" key={faq.id}>
                  <div className={`${styles.faqItem} vstack rounded-1`}>
                    <h3 className={styles.faqQ}>{faq.question}</h3>
                    <div className={styles.faqA}>
                      <p>{faq.answer}</p>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      </section>
    </>
  );
};

export default BioflxFaqs;
