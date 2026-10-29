import React from "react";
import styles from "@/components/help-center/HelpCenter.module.css";
import { useRouter } from "next/router";

const faqLinks = [
  { title: "Bioflx Crowns", slug: "bioflx-crowns" },
  { title: "Kids-e-Crown®", slug: "" },
  { title: "Kids-e-Restore", slug: "" },
  { title: "Kids-e-SSC", slug: "" },
  { title: "e-Sdf®", slug: "" },
  { title: "e-Pit And Fissure Sealant", slug: "" },
  { title: "e-Space Maintainer", slug: "" },
  { title: "e-MTA®", slug: "" },
  { title: "e-MTA Putty", slug: "" },
  { title: "e-MTA Sealer", slug: "" },
  { title: "e-MTA Carrier", slug: "" },
  { title: "Kids-e-Files", slug: "" },
  { title: "e-IodoCal", slug: "" },
  { title: "Scented-e-Pens", slug: "" },
  { title: "e-Splint", slug: "" },
];

const tutorialLinks = [
  { title: "Bioflx Crowns", href: "/faqs" },
  { title: "Kids-e-Crown®", href: "" },
  { title: "Kids-e-Restore", href: "" },
  { title: "Kids-e-SSC", href: "" },
  { title: "e-Sdf®", href: "" },
  { title: "e-Pit And Fissure Sealant", href: "" },
  { title: "e-Space Maintainer", href: "" },
  { title: "e-MTA®", href: "" },
  { title: "e-MTA Putty", href: "" },
  { title: "e-MTA Sealer", href: "" },
  { title: "e-MTA Carrier", href: "" },
];

const HelpCenter = () => {
  const router = useRouter();
  const { slug } = router.query;

  return (
    <>
      <section className="py-5 sitePadding bgPrimary">
        <div className="container-fluid vstack align-items-center gap-2 animateThis fadeIn">
          <h1 className="sectionHead fw-bold mb-0">Help Center</h1>
          <p className="mb-0">
            Access Quick-start guides, Product literature, Instructions, FAQs
            and Tutorials
          </p>
        </div>
      </section>

      <section className="sitePadding py-sm-5 py-4 overflow-hidden">
        <div className="container-fluid">
          <div className="row justify-content-center g-sm-5 g-4">
            {/* FAQs */}
            <div className="col-xl-3 col-lg-4 col-sm-6 col-12">
              <div className={`${styles.helpItem} vstack p-sm-4 p-3 rounded-4`}>
                <div className={styles.helpIconBox}>
                  {/* Keep your existing FAQs SVG here */}
                </div>

                <div className="mt-5">
                  <h4 className="helphead sectionHead_sm fw-semibold">FAQs</h4>
                  <p>
                    Find answers to common clinical, product, and placement
                    questions.
                  </p>
                </div>

                <div className="h-100">
                  <ul
                    className={`${styles.helpLinks} vstack gap-1 rounded-3 p-3`}
                  >
                    {faqLinks.map((item) => (
                      <li key={item.title}>
                        <a
                          href={item.slug ? `/faqs/${item.slug}` : "#"}
                          onClick={(e) => {
                            if (!item.slug) e.preventDefault();
                          }}
                        >
                          {item.title}
                        </a>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>

            {/* Tutorials */}
            <div className="col-xl-3 col-lg-4 col-sm-6 col-12">
              <div className={`${styles.helpItem} vstack p-sm-4 p-3 rounded-4`}>
                <div className={styles.helpIconBox}>
                  {/* Keep your existing Tutorials SVG here */}
                </div>

                <div className="mt-5">
                  <h4 className="helphead sectionHead_sm fw-semibold">
                    Tutorials
                  </h4>
                  <p>
                    Watch educational content supporting product preparation,
                    placement, and clinical technique.
                  </p>
                </div>

                <div className="h-100">
                  <ul
                    className={`${styles.helpLinks} vstack gap-1 rounded-3 p-3`}
                  >
                    {tutorialLinks.map((item) => (
                      <li key={item.title}>
                        <a
                          href={item.href || "#"}
                          onClick={(e) => {
                            if (!item.href) e.preventDefault();
                          }}
                        >
                          {item.title}
                        </a>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default HelpCenter;
