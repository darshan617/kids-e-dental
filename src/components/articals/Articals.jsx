import Image from "next/image";
import React from "react";
import { BsFileEarmarkPdfFill } from "react-icons/bs";
import bioflx from "@/assets/images/bioflx/bioflx_logo.png";
import styles from "@/components/articals/Articals.module.css";

const breadcrumbs = [
  { label: "Home", href: "index.html" },
  { label: "Products", href: "#" },
  { label: "Restorative", href: "#" },
  { label: "Bioflx Crown", href: "bioflx.html" },
  { label: "Research Articles", active: true },
];

const articles = [
  {
    id: 1,
    img: bioflx,
    title:
      "Comparison of the Fluoride release of Silver Diamine Fluoride, Fluoride Varnish, Acidulated Phosphate Fluoride Gel on extracted teeth over various time intervals in artificial saliva",
    pdf: "/pdf/e-SDF.pdf",
  },
  {
    id: 2,
    img: bioflx,
    title:
      "Clinical Comparison of Three Tooth-colored Full-coronal Restorations in Primary Maxillary Incisors",
    pdf: "/pdf/e-SDF.pdf",
  },
];

const Articals = () => {
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
                    <a href={crumb.href}>{crumb.label}</a>
                  </li>
                ),
              )}
            </ol>
          </nav>
        </div>
      </section>

      <section className={`${styles.clisupBanner} py-5 sitePadding`}>
        <div className="container-fluid vstack align-items-center gap-2 animateThis fadeIn">
          <Image src={bioflx} alt="" width={200} height={80} />
          <h1 className="sectionHead fw-bold mb-0"> Research Articles</h1>
        </div>
      </section>

      <section className="sitePadding py-sm-5 py-4 overflow-hidden">
        <div className="container-fluid">
          <div className="row row-cols-lg-2 row-cols-1 g-5 mb-5">
            {articles.map((item) => (
              <div className="col" key={item.id}>
                <div
                  className={`${styles.crsItem} d-flex flex-wrap align-items-center p-lg-4 p-sm-3 p-2 gap-3 rounded-4`}
                >
                  <div
                    className={`${styles.crsImgbox} col-sm-4 col-12 rounded-3 overflow-hidden d-sm-flex justify-content-center align-items-center`}
                  >
                    <Image
                      src={item.img}
                      alt=""
                      width={200}
                      height={80}
                      className={styles.crsImg}
                    />
                  </div>
                  <div className="crsContent col-sm">
                    <h2
                      className={`${styles.crsTitle} fw-semibold lh-base mb-5`}
                    >
                      {item.title}
                    </h2>
                    <a
                      href={item.pdf}
                      target="_blank"
                      className={`${styles.crsBtn} px-3`}
                    >
                      <BsFileEarmarkPdfFill size={16} /> Download
                    </a>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
};

export default Articals;
