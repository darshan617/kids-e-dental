import React from "react";
import Image from "next/image";
import Link from "next/link";
import bioflxLogo from "@/assets/images/bioflx/bioflx_logo.png";
import styles from "@/components/bioflx/kit-system/faqs/Faqs.module.css";
const breadcrumbs = [
  { label: "Home", href: "/" },
  { label: "Products", href: "/product-listing" },
  { label: "Restorative", href: "/product-listing" },
  { label: "Bioflx Crown", href: "/product-category/bioflix" },
  { label: "FAQs", active: true },
];

const faqs = [
  {
    question: "What material is Bioflx made of?",
    answer:
      "Bioflx crown is made of high impact, biocompatible, hybrid resin polymer used in the medical field where high strength, flexibility and durability are required. They are Bis-GMA free and contain no metal.",
  },
  {
    question: "Can I Crimp, Contour & Trim the crown?",
    answer:
      "You can trim the crown with bridge scissors, when needed. Slightly flattening of proximal surface with howes plier is allowed, but you should not attempt to crimp Bioflx crowns.",
  },
  {
    question: "How do you describe the fit of Bioflx crowns?",
    answer:
      "It is neither a “snap fit”, nor a “passive fit”. Bioflx crowns should fit snugly on the tooth, with slight resistance that can be described as a flex or active fit. It will flex over small convexities of the tooth.",
  },
  {
    question: "Can Bioflx crowns be sterilized?",
    answer:
      "Cold sterilization, autoclave or steam sterilization may be used according to the standard instructions of the manufacturer of the sterilant or sterilizer. Bioflx crowns, as other pediatric crowns, are provided in non-sterile packaging. Clinician may choose to sterilize before use.",
  },
  {
    question: "Can I adjust the occlusion of Bioflx crowns?",
    answer:
      "It is not recommended to use any kind of rotary instrument to adjust the occlusion of a Bioflx crown. The occlusal surface of the preparation should be reduced 1-1.5 mm, similar to an SSC preparation. If the crown is slightly high in occlusion, it will slightly self-adapt and may show a dimple in that area after a period of time.",
  },
  {
    question: "Are Bioflx crowns radiopaque?",
    answer:
      "The radiopacity of Bioflx crowns is similar to the radiopacity of enamel and should allow radiographic evaluation of adaptation of the crown margins and pulpal therapy.",
  },
  {
    question:
      "Will blood or Salivary contamination affect the cementation of Bioflx crowns?",
    answer:
      "If Bioflx crowns are contaminated with blood or saliva during try-in, they can be rinsed with water, dried and then cemented without any significant effect on cementation.",
  },
  {
    question: "Can I use Bioflx crowns in areas of space loss?",
    answer:
      "Bioflx crowns will be available in narrow sizes to be easier to place in areas of space loss. Due their flexible nature and elastic memory, Bioflx crowns cannot be significantly altered in their shape or width with pliers. To fit Bioflx in areas of space loss, it is likely that circumferential reduction of the tooth will be needed to fit a smaller crown than would have been used if there were no space loss.",
  },
  {
    question: "Can I use a bite stick to seat a Bioflx crown?",
    answer:
      "You can use significant force to seat a Bioflx crown onto a preparation, including heavy finger pressure or a bite stick. It is unlikely that you will break a Bioflx crown during seating.",
  },
  {
    question: "What should I use to cement Bioflx crowns?",
    answer:
      "A regular glass ionomer cement should be sufficient for cementing Bioflx crowns. A self-setting resin modified glass ionomer cement can also be used. A light cured cement should NOT be used because the opacity of the crown will not let light pass through to set the cement.",
  },
  {
    question:
      "How does the wear resistance of Bioflx crowns compare to stainless steel crowns?",
    answer:
      "Robust in house wear testing demonstrates that Bioflx crowns are at least as wear resistant as stainless steel crowns, after 800,000 cycles at 80 newtons on a Leinfelder wear machine. However, clinicians may see a “dimple” develop on the Bioflx crowns in areas of heavy occlusion. This “dimple” appears due to the self-adaptable technology of the material. Rather than wearing, the material “self adapts” to reduce the pressure of the opposing occlusal surface. For this reason, and for best results, it is recommended that Bioflx crowns not be placed in high occlusion on teeth with little or no occlusal preparation.",
  },
];

const BioflxFaqs = () => {
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
          <Image src={bioflxLogo} alt="BioFlx" />
          <h1 className="sectionHead fw-bold mb-0">BioFlx Crowns - FAQs</h1>
        </div>
      </section>

      <section className="sitePadding py-sm-5 py-4">
        <div className="container-fluid">
          <div
            className="vstack faqList mx-auto"
            style={{ maxWidth: "1100px" }}
          >
            {faqs.map((faq) => (
              <div className="animateThis curtainLeft" key={faq.question}>
                <div className={`${styles.faqItem} vstack rounded-1`}>
                  <h3 className={styles.faqQ}>{faq.question}</h3>
                  <div className={styles.faqA}>
                    <p>{faq.answer}</p>
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

export default BioflxFaqs;
