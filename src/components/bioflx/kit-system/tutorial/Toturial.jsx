"use client";

import Image from "next/image";
import React, { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/router";
import bioflxLogo from "@/assets/images/bioflx/bioflx_logo.png";
import styles from "@/components/bioflx/kit-system/faqs/Faqs.module.css";
import { useGetTutorialDataQuery } from "@/redux/apis/tourialApi";

const getYouTubeId = (url = "") => {
  const match = String(url).match(
    /(?:youtu\.be\/|youtube\.com\/(?:watch\?(?:.*&)?v=|embed\/|shorts\/|v\/))([\w-]{11})/,
  );
  return match ? match[1] : "";
};

const isYouTubeTutorial = (tutorial) => {
  if (tutorial?.is_direct_video) return false;
  if (tutorial?.video_id) return true;
  const url = tutorial?.embed_url || tutorial?.video_url || "";
  return /youtu\.?be/.test(url);
};

const youtubeEmbedSrc = (tutorial) => {
  if (tutorial?.video_id) {
    return `https://www.youtube.com/embed/${tutorial.video_id}?autoplay=1&rel=0`;
  }

  const url = tutorial?.embed_url || tutorial?.video_url || "";
  if (url.includes("/embed/")) {
    return url.includes("autoplay=")
      ? url
      : `${url}${url.includes("?") ? "&" : "?"}autoplay=1&rel=0`;
  }

  const id = getYouTubeId(url);
  return id ? `https://www.youtube.com/embed/${id}?autoplay=1&rel=0` : "";
};

const videoSrc = (tutorial) =>
  tutorial?.embed_url || tutorial?.video_file || tutorial?.video_url || "";

const thumbnailSrc = (tutorial) => {
  if (tutorial?.thumbnail) return tutorial.thumbnail;
  const id = tutorial?.video_id || getYouTubeId(tutorial?.video_url || "");
  return id ? `https://img.youtube.com/vi/${id}/hqdefault.jpg` : "";
};

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
  const router = useRouter();
  const slug = typeof router.query.slug === "string" ? router.query.slug : "";
  const { data, isLoading, isError, isUninitialized } = useGetTutorialDataQuery(
    { slug },
    { skip: !slug },
  );
  const [activeVideo, setActiveVideo] = useState(null);

  const category = data?.category;
  const tutorials = Array.isArray(data?.data)
    ? [...data.data].sort((a, b) => (a.sort_order ?? 0) - (b.sort_order ?? 0))
    : [];
  const title = category?.title
    ? `${category.title} - Tutorials`
    : "Tutorials";
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
    { label: "Tutorials", active: true },
  ];

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

  const activeIsYouTube = isYouTubeTutorial(activeVideo);
  const activeYouTubeSrc = activeIsYouTube ? youtubeEmbedSrc(activeVideo) : "";
  const activeFileSrc = activeVideo ? videoSrc(activeVideo) : "";

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
          {(category?.slug || slug) === "bioflx-crown" && (
            <Image src={bioflxLogo} alt="BioFlx" />
          )}
          <h1 className="sectionHead fw-bold mb-0">{title}</h1>
        </div>
      </section>

      <section className="sitePadding py-sm-5 py-4 overflow-hidden">
        <div className="container-fluid">
          {waiting ? (
            <p className="mb-0">Loading tutorials...</p>
          ) : isError ? (
            <p className="mb-0">
              Something went wrong. Please try again later.
            </p>
          ) : tutorials.length === 0 ? (
            <p className="mb-0">
              No tutorials are available for this category yet.
            </p>
          ) : (
            <div className="row row-cols-xxl-4 row-cols-lg-3 row-cols-sm-2 row-cols-1 g-4 justify-content-center">
              {tutorials.map((tutorial) => {
                const image = thumbnailSrc(tutorial);
                return (
                  <div className="col animateThis slideTop" key={tutorial.id}>
                    <div
                      className={`${styles.crVideoItem} vstack gap-3 rounded-2 p-1`}
                    >
                      <div
                        className={`${styles.crVideoBox} bg-black rounded-2 overflow-hidden ratio ratio-16x9`}
                      >
                        {image ? (
                          <img
                            src={image}
                            alt={tutorial.title}
                            className="w-100 h-100 object-fit-cover"
                          />
                        ) : null}
                      </div>

                      <div className="px-2">
                        <h3 className={`${styles.crVideoHead} mb-0`}>
                          {tutorial.title}
                        </h3>
                        {tutorial.description ? (
                          <p className={`${styles.crVideoDesc} mb-0 mt-1`}>
                            {tutorial.description}
                          </p>
                        ) : null}
                      </div>

                      <button
                        type="button"
                        className="stretched-link border-0 bg-transparent p-0"
                        aria-label={`Watch ${tutorial.title}`}
                        onClick={() => setActiveVideo(tutorial)}
                      />
                    </div>
                  </div>
                );
              })}
            </div>
          )}
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
              {activeIsYouTube && activeYouTubeSrc ? (
                <iframe
                  src={activeYouTubeSrc}
                  title={activeVideo.title}
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; fullscreen"
                  allowFullScreen
                />
              ) : activeFileSrc ? (
                <video
                  src={activeFileSrc}
                  title={activeVideo.title}
                  controls
                  autoPlay
                  playsInline
                  className="w-100 h-100"
                />
              ) : null}
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Toturial;
