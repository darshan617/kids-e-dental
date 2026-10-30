import Image from "next/image";
import React, { useRef, useState } from "react";
import styles from "@/components/case-study/CaseStudy.module.css";
import csImg from "@/assets/images/home/csImg.jpg";
import { FaAngleLeft, FaAngleRight } from "react-icons/fa";

const PER_PAGE = 4;

const caseStudies = [
  {
    id: 1,
    img: csImg,
    title: "Kids-e-Crown®",
    subtitle: "Reliable Pediatric Crown Solutions",
    details: [
      { label: "Product", value: "Kids-e-Crown®" },
      { label: "Application", value: "Pediatric Crown Restoration" },
      { label: "Key Benefit", value: "Durable & child-friendly solution" },
    ],
    link: "",
  },
  {
    id: 2,
    img: csImg,
    title: "Kids-e-Crown®",
    subtitle: "Reliable Pediatric Crown Solutions",
    details: [
      { label: "Product", value: "Kids-e-Crown®" },
      { label: "Application", value: "Pediatric Crown Restoration" },
      { label: "Key Benefit", value: "Durable & child-friendly solution" },
    ],
    link: "",
  },
  {
    id: 3,
    img: csImg,
    title: "Kids-e-Crown®",
    subtitle: "Reliable Pediatric Crown Solutions",
    details: [
      { label: "Product", value: "Kids-e-Crown®" },
      { label: "Application", value: "Pediatric Crown Restoration" },
      { label: "Key Benefit", value: "Durable & child-friendly solution" },
    ],
    link: "",
  },
  {
    id: 4,
    img: csImg,
    title: "Kids-e-Crown®",
    subtitle: "Reliable Pediatric Crown Solutions",
    details: [
      { label: "Product", value: "Kids-e-Crown®" },
      { label: "Application", value: "Pediatric Crown Restoration" },
      { label: "Key Benefit", value: "Durable & child-friendly solution" },
    ],
    link: "",
  },
];

const articles = [
  {
    id: 1,
    title:
      "Comparison of the Fluoride release of Silver Diamine Fluoride, Fluoride Varnish, Acidulated Phosphate Fluoride Gel on extracted teeth over various time intervals in artificial saliva",
    pdf: "/pdf/e-SDF.pdf",
    paragraphs: [
      {
        text: "Silver Diamine Fluoride (SDF) has been documented to effectively arrest dental caries and reduce dental hypersensitivity. SDF promotes remineralization and harden the carious lesion. SDF increases fluoride concentration in saliva and increase the bioavailability of fluoride in saliva. After SDF application, fluoride ion promotes remineralization and silver ion is available for antimicrobial action.",
      },
      {
        label: "Aim",
        text: "The study aims to determine and compare the amount of fluoride released from various fluoride releasing materials in artificial saliva after 24 hours, 7th day and 14th day of the study.",
      },
      {
        label: "Materials and Methods",
        text: "96 premolars free of any caries, fractures, or any other defects were sterilized in 10% formalin for 2 weeks. Then they were rinsed in tap water to remove any fixative from its surface and then stored in deionised distilled water for a period of 30 days prior to testing. Tooth samples were divided into four groups - Group 1: 38% SDF, Group 2: 1.23% APF gel, Group 3: Fluoride varnish and Group 4: Control. All the teeth specimens were blot dried and subjected to their respective material. Fluoride release was analysed using a Fluoride ion-selective electrode after 24 hours, 7days and 14 days of suspension in artificial saliva.",
      },
      {
        label: "Results",
        text: "Mann-Whitney U Test for inter-group comparison was used for statistical evaluation. 24 Hours fluoride release: The maximum amount of fluoride was released from Fluoride Varnish followed by SDF then APF Gel and least by artificial saliva alone (control) (p<0.001). 7th Day fluoride release: The maximum amount of fluoride was released from SDF followed by Fluoride Varnish then APF Gel and least by artificial saliva alone (control) (p<0.001). 14th Day fluoride release: The maximum amount of fluoride was released from Fluoride Varnish followed by SDF then APF Gel and least by artificial saliva alone (control) (p<0.001).",
      },
    ],
  },
  {
    id: 2,
    title:
      "Clinical Comparison of Three Tooth-colored Full-coronal Restorations in Primary Maxillary Incisors",
    pdf: "",
    paragraphs: [
      {
        label: "Aim",
        text: "The aim of this in vivo study was to evaluate the surface texture, anatomical form, marginal integrity, marginal discoloration, and secondary caries of three different types of crowns in primary anterior teeth at different time intervals of 3, 6, and 9 months.",
      },
      {
        label: "Materials and methods",
        text: "Total 45 primary maxillary incisors were randomly selected and divided into three groups of 15 each: group I—strip crowns (Pedoform strip crowns, 3M, United States), group II—zirconia crown (kids-e-crown, India), and group III—luxa crown (DMG, Germany). All the full-coronal restorations were evaluated at 3, 6, and 9 months. The modified USPHS criteria were used to evaluate different parameters. Data were collected and the nonparametric test (Chi-square) was used to analyze the intergroup data.",
      },
      {
        label: "Results",
        text: "Statistically nonsignificant difference was observed for most of the parameters except marginal integrity and secondary caries. Resin strip crowns showed maximum cases with distorted marginal integrity and secondary caries.",
      },
      {
        label: "Conclusion",
        text: "Zirconia crown performed best among the three full-coronal restorations. Luxa crown performed similar to zirconia crown. It can be used as an alternative economical esthetic full-coronal restoration for primary maxillary anterior incisors.",
      },
      {
        label: "Clinical significance",
        text: "This study illustrates the advantage of the temporization material as a full-coronal restoration option in primary maxillary anterior teeth.",
      },
    ],
  },
  {
    id: 3,
    title:
      "Evaluation and comparison of strip crowns and primary anterior zirconia crowns in 3-5 years old children at one year",
    pdf: "",
    paragraphs: [
      {
        label: "Background",
        text: "Preservation of the decayed primary anterior teeth is important until their natural exfoliation time as it acts as natural space maintainer. Two most common anterior aesthetic full coronal restorations, the strip crowns and the preformed zirconia crowns, are available options.",
      },
      {
        label: "Objective",
        text: "To evaluate and compare the clinical outcomes (gingival health, plaque accumulation, teeth wear of opposing dentition, color match and restoration failure) of strip crowns and preformed primary anterior zirconia crowns at one year follow up in 3-5 years old children.",
      },
      {
        label: "Material and methods",
        text: "Forty maxillary primary incisors were restored by either strip crown or zirconia crown. Permuted block randomisation method was used for allocation of participants. Gingival health, plaque accumulation, teeth wear of the opposing dentition, color match and restoration failure for crowns were assessed at one-year follow-up. Data was analysed using McNemar- Bowker test and Chi-Square test.",
      },
      {
        label: "Results",
        text: "At one-year follow-up, gingival inflammation, plaque accumulation, restoration failure were significantly higher for the strip crowns (level of significance = 0.012, 0.013 and 0.0001, respectively) and, no statistically significant difference was found between the strip crowns and zirconia crowns for teeth wear of opposing dentition and color match evaluation (level of significance = 0.435 and 0.168, respectively).",
      },
      {
        label: "Conclusion",
        text: "Overall, zirconia crowns were found more successful than strip crowns for the rehabilitation of caries affected primary incisors.",
      },
    ],
  },
];

const CaseStudy = () => {
  const [page, setPage] = useState(1);
  const listRef = useRef(null);

  const totalPages = Math.ceil(caseStudies.length / PER_PAGE);
  const pagedItems = caseStudies.slice((page - 1) * PER_PAGE, page * PER_PAGE);

  const goToPage = (p) => {
    if (p < 1 || p > totalPages || p === page) return;
    setPage(p);
    listRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  return (
    <>
      <section className="py-5 sitePadding bgPrimary">
        <div className="container-fluid vstack align-items-center gap-2 animateThis fadeIn">
          <h1 className="sectionHead fw-bold mb-0"> Case Studies </h1>
          <p>
            Discover how our pediatric dental solutions support better clinical
            care
          </p>
        </div>
      </section>

      <section
        ref={listRef}
        className="sitePadding py-sm-5 py-4 overflow-hidden"
      >
        <div className="container-fluid">
          <div className="row row-cols-lg-2 row-cols-1 g-lg-5 g-4 mb-5 eduCardList">
            {pagedItems.map((item) => (
              <div className="col animateThis slideTop" key={item.id}>
                <div
                  className={`${styles.csItem} d-flex flex-wrap align-items-center p-lg-4 p-sm-3 p-2 gap-3 gap-sm-0 rounded-4 order-sm-last`}
                >
                  <div
                    className={`${styles.csImgbox} col-sm-4 col-12 rounded-3 overflow-hidden d-sm-flex`}
                  >
                    <Image
                      src={item.img}
                      alt=""
                      width={400}
                      height={400}
                      className={`${styles.csImg} h-auto`}
                    />
                  </div>
                  <div className="csContent col-sm-8 order-sm-first">
                    <h3 className={`${styles.csTitle} fw-semibold`}>
                      {item.title}
                    </h3>
                    <h4 className={styles.csSubtitle}>{item.subtitle}</h4>
                    <ul className="csList my-sm-4 my-3">
                      {item.details.map((d) => (
                        <li key={d.label}>
                          <strong>{d.label} :</strong> {d.value}
                        </li>
                      ))}
                    </ul>
                    <a href={item.link} className={styles.csBtn}>
                      Read More
                    </a>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {totalPages > 1 && (
            <nav className={styles.pager} aria-label="Case study pages">
              <button
                type="button"
                className={styles.pagerBtn}
                onClick={() => goToPage(page - 1)}
                disabled={page === 1}
                aria-label="Previous page"
              >
                <FaAngleLeft />
              </button>

              {Array.from({ length: totalPages }, (_, i) => i + 1).map((p) => (
                <button
                  key={p}
                  type="button"
                  className={`${styles.pagerBtn} ${
                    p === page ? styles.pagerBtnActive : ""
                  }`}
                  onClick={() => goToPage(p)}
                  aria-current={p === page ? "page" : undefined}
                >
                  {p}
                </button>
              ))}

              <button
                type="button"
                className={styles.pagerBtn}
                onClick={() => goToPage(page + 1)}
                disabled={page === totalPages}
                aria-label="Next page"
              >
               <FaAngleRight />
              </button>
            </nav>
          )}

          <div className="vstack gap-5 d-none">
            {articles.map((article) => (
              <div className="col" key={article.id}>
                <div className="articleItem d-flex rounded-2 bg-white overflow-hidden shadow">
                  <div className="col-lg-6 p-5 text-end vstack">
                    <div
                      className="pe-3"
                      style={{ borderRight: "10px solid var(--primary)" }}
                    >
                      <h3 className="sectionHead_sm fw-semibold lh-base">
                        {article.title}
                      </h3>
                    </div>
                    <div className="mt-auto border-top pt-4">
                      <a
                        href={article.pdf}
                        target="_blank"
                        className="ctaBtn arw"
                      >
                        Download PDF
                      </a>
                    </div>
                  </div>
                  <div className="col-lg-6 p-5" style={{ fontSize: ".8rem" }}>
                    {article.paragraphs.map((p, i) => (
                      <p key={i}>
                        {p.label && <strong>{p.label} :</strong>} {p.text}
                      </p>
                    ))}
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

export default CaseStudy;
