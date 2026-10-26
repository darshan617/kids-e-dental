"use client";

import Image from "next/image";
import React, { useEffect, useState } from "react";
import Link from "next/link";
import bioflxLogo from "@/assets/images/bioflx/bioflx_logo.png";
import styles from "@/components/bioflx/kit-system/faqs/Faqs.module.css";

const rawTutorials = [
  {
    image: "https://img.youtube.com/vi/AS2RmWkbVL0/0.jpg",
    title:
      "BioFlx Posterior Crown Technique Step-by-Step Guide | BioFlx Posterior Crowns Technique Explained",
    url: "https://youtu.be/AS2RmWkbVL0?si=i6xhZlKkIcl-3iza",
  },
  {
    image: "https://img.youtube.com/vi/AS2RmWkbVL0/1.jpg",
    title:
      "BioFlx Posterior Crown Technique Step-by-Step Guide | BioFlx Posterior Crowns Technique Explained",
    url: "https://youtu.be/AS2RmWkbVL0",
  },
  {
    image: "https://img.youtube.com/vi/AS2RmWkbVL0/2.jpg",
    title:
      "BioFlx Posterior Crown Technique Step-by-Step Guide | BioFlx Posterior Crowns Technique Explained",
    url: "https://youtu.be/AS2RmWkbVL0",
  },
];

const getYouTubeId = (url = "") => {
  const match = url.match(
    /(?:youtu\.be\/|youtube\.com\/(?:watch\?(?:.*&)?v=|embed\/|shorts\/|v\/))([\w-]{11})/,
  );
  return match ? match[1] : "";
};

const tutorials = rawTutorials.map((t) => {
  const id = getYouTubeId(t.url);
  return {
    ...t,
    id,
    image: t.image || `https://img.youtube.com/vi/${id}/hqdefault.jpg`,
  };
});

const overlayStyle = {
  position: "fixed",
  inset: 0,
  background: "rgba(0, 0, 0, 0.75)",
  zIndex: 99999,
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  padding: "16px",
};

const closeBtnStyle = {
  position: "absolute",
  top: "-40px",
  right: 0,
  background: "transparent",
  border: 0,
  color: "#fff",
  fontSize: "32px",
  lineHeight: 1,
  cursor: "pointer",
};

const Toturial = () => {
  const [activeVideo, setActiveVideo] = useState(null);

  useEffect(() => {
    if (!activeVideo) return;

    const onKeyDown = (e) => {
      if (e.key === "Escape") setActiveVideo(null);
    };
    document.addEventListener("keydown", onKeyDown);
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    return () => {
      document.removeEventListener("keydown", onKeyDown);
      document.body.style.overflow = prevOverflow;
    };
  }, [activeVideo]);

  return (
    <>
      <section
        className="sitePadding py-sm-3 py-2"
        style={{ background: "#fbfbfb" }}
      >
        <div className="container-fluid">
          <nav aria-label="breadcrumb">
            <ol className="breadcrumb mb-0">
              <li className="breadcrumb-item">
                <Link href="/">Home</Link>
              </li>
              <li className="breadcrumb-item">
                <Link href="#">Products</Link>
              </li>
              <li className="breadcrumb-item">
                <Link href="#">Restorative</Link>
              </li>
              <li className="breadcrumb-item">
                <Link href="/bioflx">Bioflx Crown</Link>
              </li>
              <li className="breadcrumb-item active" aria-current="page">
                Tutorials
              </li>
            </ol>
          </nav>
        </div>
      </section>

      <section className={`${styles.clisupBanner} py-5 sitePadding`}>
        <div className="container-fluid vstack align-items-center gap-2 animateThis fadeIn">
          <Image src={bioflxLogo} alt="BioFlx Logo" />
          <h1 className="sectionHead fw-bold mb-0">
            BioFlx Crowns - Tutorials
          </h1>
        </div>
      </section>

      <section className="sitePadding py-sm-5 py-4 overflow-hidden">
        <div className="container-fluid">
          <div className="row row-cols-xxl-4 row-cols-lg-3 row-cols-sm-2 row-cols-1 g-4 justify-content-center">
            {tutorials.map((tutorial, index) => (
              <div className="col animateThis slideTop" key={index}>
                <div
                  className={`${styles.crVideoItem} vstack gap-3 rounded-2 p-1`}
                >
                  <div
                    className={`${styles.crVideoBox} bg-black rounded-2 overflow-hidden ratio ratio-16x9`}
                  >
                    <img
                      src={tutorial.image}
                      alt={tutorial.title}
                      className="w-100 h-100 object-fit-cover"
                    />
                  </div>

                  <h3 className={`${styles.crVideoHead} px-2 mb-0`}>
                    {tutorial.title}
                  </h3>

                  <button
                    type="button"
                    className="stretched-link border-0 bg-transparent p-0"
                    aria-label={`Watch ${tutorial.title}`}
                    onClick={() => setActiveVideo(tutorial)}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {activeVideo && (
        <div
          style={overlayStyle}
          role="dialog"
          aria-modal="true"
          aria-label={activeVideo.title}
          onClick={() => setActiveVideo(null)}
        >
          <div
            style={{ position: "relative", width: "80%", height: "90%" }}
            onClick={(e) => e.stopPropagation()}
          >
            <button
              type="button"
              style={closeBtnStyle}
              aria-label="Close video"
              onClick={() => setActiveVideo(null)}
            >
              &times;
            </button>

            <div className="ratio ratio-16x9 bg-black">
              <iframe
                src={`https://www.youtube.com/embed/${activeVideo.id}?autoplay=1&rel=0`}
                title={activeVideo.title}
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; fullscreen"
                allowFullScreen
              />
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Toturial;
