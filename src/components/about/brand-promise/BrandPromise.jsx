"use client";

import Image from "next/image";
import React, { useEffect, useRef } from "react";
import promiseMascot from "@/assets/images/promiseMascot.png";
import styles from "@/components/about/brand-promise/BrandPromise.module.css";

const BrandPromise = () => {
  const sectionRef = useRef(null);
  const canvasRef = useRef(null);

  useEffect(() => {
    const section = sectionRef.current;
    const canvas = canvasRef.current;
    if (!section || !canvas) return;
    const ctx = canvas.getContext("2d");

    const gap = 42;
    const waveSpeed = 1200;
    const waveWidth = 180;
    const dotSizeRatio = 0.3;
    const restScale = 0.22;
    const minHoverScale = 1.4;
    const maxHoverScale = 2.4;
    const speedIn = 0.5;
    const speedOut = 0.6;
    const color = { h: 190, s: 100, l: 60 }; 

    let grid = null;
    let waves = [];
    let rafId = null;

    const rnd = (min, max) => Math.random() * (max - min) + min;
    const smoothstep = (t) => {
      const c = Math.max(0, Math.min(1, t));
      return c * c * (3 - 2 * c);
    };
    const durationToFactor = (s) => 1 - Math.pow(0.05, 1 / (60 * s));

    const init = () => {
      const rect = section.getBoundingClientRect();
      const W = rect.width;
      const H = rect.height;
      const dpr = window.devicePixelRatio || 1;

      canvas.width = W * dpr;
      canvas.height = H * dpr;
      canvas.style.width = W + "px";
      canvas.style.height = H + "px";
      ctx.setTransform(1, 0, 0, 1, 0, 0);
      ctx.scale(dpr, dpr);

      const cols = Math.floor(W / gap);
      const rows = Math.floor(H / gap);
      const offsetX = (W - (cols - 1) * gap) / 2;
      const offsetY = (H - (rows - 1) * gap) / 2;
      const shapes = [];

      for (let row = 0; row < rows; row++) {
        for (let col = 0; col < cols; col++) {
          shapes.push({
            x: offsetX + col * gap,
            y: offsetY + row * gap,
            size: gap * dotSizeRatio,
            scale: restScale,
            maxScale: rnd(minHoverScale, maxHoverScale),
          });
        }
      }

      grid = { shapes, width: W, height: H };
    };

    const triggerWave = (x, y) => {
      const rect = section.getBoundingClientRect();
      waves.push({
        x: x !== undefined ? x : rect.width / 2,
        y: y !== undefined ? y : rect.height / 2,
        startTime: performance.now(),
      });
    };

    const tick = () => {
      if (!grid) {
        rafId = requestAnimationFrame(tick);
        return;
      }

      const { shapes, width, height } = grid;
      const now = performance.now();

      ctx.clearRect(0, 0, width, height);

      // drop waves that have left the section
      const maxDist = Math.sqrt(width * width + height * height);
      waves = waves.filter(
        (w) => ((now - w.startTime) / 1000) * waveSpeed < maxDist + waveWidth
      );

      for (let i = 0; i < shapes.length; i++) {
        const shape = shapes[i];

        // strongest wave influence on this dot
        let waveInfluence = 0;
        for (let j = 0; j < waves.length; j++) {
          const wave = waves[j];
          const waveRadius = ((now - wave.startTime) / 1000) * waveSpeed;
          const wdx = shape.x - wave.x;
          const wdy = shape.y - wave.y;
          const wdist = Math.sqrt(wdx * wdx + wdy * wdy);
          const wt = 1 - Math.abs(wdist - waveRadius) / waveWidth;
          if (wt > 0) {
            waveInfluence = Math.max(waveInfluence, Math.sin(Math.PI * wt));
          }
        }

        // ease dot scale toward its target
        const target = restScale + waveInfluence * (shape.maxScale - restScale);
        const factor =
          target > shape.scale
            ? durationToFactor(speedIn)
            : durationToFactor(speedOut);
        shape.scale += (target - shape.scale) * factor;

        const lift = smoothstep(
          (shape.scale - restScale) / (shape.maxScale - restScale)
        );
        const alpha = 0.08 + lift * 0.9; // faint at rest, bright on wave
        const fill = `hsla(${color.h}, ${color.s}%, ${color.l}%, ${alpha})`;

        // neon glow
        ctx.save();
        ctx.translate(shape.x, shape.y);
        ctx.fillStyle = fill;
        ctx.shadowColor = fill;
        ctx.shadowBlur = 10 * shape.scale * lift;
        ctx.beginPath();
        ctx.arc(0, 0, shape.size * shape.scale, 0, Math.PI * 2);
        ctx.fill();
        ctx.restore();
      }

      rafId = requestAnimationFrame(tick);
    };

    // ---- events ----
    const onClick = (e) => {
      const rect = section.getBoundingClientRect();
      triggerWave(e.clientX - rect.left, e.clientY - rect.top);
    };

    init();
    triggerWave(); // initial wave on load
    rafId = requestAnimationFrame(tick);

    const ro = new ResizeObserver(init);
    ro.observe(section);
    section.addEventListener("click", onClick);

    return () => {
      cancelAnimationFrame(rafId);
      ro.disconnect();
      section.removeEventListener("click", onClick);
    };
  }, []);

  return (
    <section ref={sectionRef} className="bgPrimary position-relative">
      {/* <canvas
        ref={canvasRef}
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          zIndex: 0,
          pointerEvents: "none",
        }}
      /> */}

      <div
        className="position-absolute top-0 start-0 w-100 bg-white"
        style={{ height: "5%" }}
      ></div>

      <div className="sitePadding position-relative z-1">
        <div className="container-fluid" style={{ maxWidth: "1500px" }}>
          <div className="row align-items-center justify-content-center">
            <div className="col-xl-4 col-md-4 col-sm-6 col-8">
              <Image
                src={promiseMascot}
                alt=""
                width={500}
                height={500}
                className="w-100 h-auto animateThis fadeGrow"
              />
            </div>

            <div className="col-xl-4 col-md-8 col-12 pt-md-5 pt-4 animateThis slideRight">
              <h2 className="sectionHead">Our Brand Promise</h2>

              <p>
                At Kids-e-Dental, our promise is simple{" "}
                <strong>
                  to deliver smart dental solutions without compromising on
                  quality.
                </strong>
              </p>

              <p>
                Every product we develop and manufacture is guided by three
                priorities:
              </p>
            </div>

            <div className="col-xl-4 col-12 pt-xl-5 pt-md-4 ps-xl-5">
              <ul
                className={`${styles.promiseList} fw-bolder promiseList d-flex flex-xl-column flex-md-row flex-column gap-4`}
              >
                <li className="col hstack gap-lg-4 gap-3 animateThis slideRight">
                  <div className={`${styles.promIcBox} flex-shrink-0`}>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 512.001 512.001"
                    >
                      <path d="M433.013,113.612h-74.169V67.268c0-20.929-17.201-37.954-38.344-37.954H191.502c-21.143,0-38.344,17.027-38.344,37.954v46.344H78.988C35.434,113.612,0,149.046,0,192.6v225.567c0,35.576,28.943,64.52,64.52,64.52h382.961c35.576,0,64.52-28.943,64.52-64.52V192.6C512,149.046,476.566,113.612,433.013,113.612z M183.249,67.268c0-4.483,3.548-7.863,8.253-7.863h128.997c4.705,0,8.253,3.38,8.253,7.863v46.344H183.249V67.268z M481.908,418.167c0.001,18.984-15.443,34.429-34.427,34.429H64.52c-18.985,0-34.429-15.445-34.429-34.429V277.629c4.712,2.957,9.864,5.353,15.392,7.061c0.288,0.088,0.578,0.169,0.87,0.241l153.282,37.461v12.374c0,19.428,15.806,35.234,35.234,35.234h42.262c19.428,0,35.234-15.806,35.234-35.234v-12.374l153.282-37.461c0.293-0.071,0.583-0.151,0.87-0.241c5.528-1.708,10.679-4.104,15.392-7.061V418.167z M229.727,334.766v-42.452c0-2.836,2.307-5.143,5.143-5.143h42.262c2.836-0.001,5.143,2.307,5.143,5.143v42.452c0,2.836-2.307,5.143-5.143,5.143h-42.262C232.034,339.908,229.727,337.601,229.727,334.766z M481.91,222.921c0,15.126-9.579,28.293-23.883,32.895l-145.683,35.603c-0.477-19.016-16.083-34.341-35.212-34.341h-42.262c-19.128,0-34.734,15.326-35.212,34.341L53.974,255.817c-14.303-4.603-23.883-17.77-23.883-32.896V192.6c0-26.962,21.935-48.897,48.897-48.897h354.025c26.961,0,48.896,21.935,48.896,48.897V222.921z"></path>
                    </svg>
                  </div>

                  <div className="lh-1">Better for professionals.</div>
                </li>

                <li className="col hstack gap-lg-4 gap-3 animateThis slideRight">
                  <div className={`${styles.promIcBox} flex-shrink-0`}>
                    <svg
                      viewBox="0 0 505.994 505.994"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path d="m216.784 280.57c0-26.935-21.913-48.848-48.848-48.848s-48.849 21.913-48.849 48.848h29.648c0-10.587 8.614-19.2 19.201-19.2s19.2 8.613 19.2 19.2z"></path>

                      <path d="m338.058 231.721c-26.935 0-48.848 21.913-48.848 48.848h29.648c0-10.587 8.613-19.2 19.2-19.2s19.201 8.613 19.201 19.2h29.648c0-26.935-21.913-48.848-48.849-48.848z"></path>

                      <path d="m252.997 367.32c-18.744 0-36.319-10.052-45.869-26.234l-25.534 15.066c14.856 25.176 42.216 40.815 71.402 40.815s56.546-15.639 71.402-40.815l-25.534-15.067c-9.548 16.182-27.124 26.235-45.867 26.235z"></path>

                      <path d="m486.704 228.061c-9.442-9.431-21.299-15.667-34.169-18.109-27.794-85.888-108.42-145.023-199.538-145.023h-9.939c-23.868 0-43.286-19.419-43.286-43.286h-29.648c0 16.196 5.313 31.17 14.278 43.286h-9.393c-23.868 0-43.286-19.419-43.286-43.286h-29.648c0 32.213 20.999 59.596 50.02 69.226-45.899 25.234-81.875 67.29-98.635 119.083-12.87 2.442-24.73 8.68-34.18 18.12-12.433 12.446-19.28 28.984-19.28 46.568 0 17.368 6.7 33.754 18.867 46.141 9.509 9.681 21.518 16.069 34.593 18.548 27.792 85.888 108.418 145.022 199.537 145.022s171.744-59.134 199.537-145.022c13.075-2.479 25.084-8.867 34.593-18.548 12.167-12.387 18.867-28.773 18.867-46.141 0-17.584-6.847-34.122-19.29-46.579zm-45.85 82.771-11.125.211-2.905 10.741c-21.164 78.26-92.644 132.918-173.828 132.918s-152.663-54.657-173.826-132.918l-2.905-10.741-11.125-.211c-19.571-.37-35.493-16.605-35.493-36.192 0-9.671 3.767-18.768 10.595-25.604 6.659-6.652 15.501-10.413 24.895-10.589l11.127-.209 2.905-10.743c21.164-78.259 92.644-132.917 173.828-132.917 26.795 0 48.594 21.799 48.594 48.594s-21.799 48.595-48.594 48.595-48.594-21.799-48.594-48.594h-29.648c0 43.143 35.099 78.242 78.242 78.242s78.242-35.099 78.242-78.242c0-12.278-2.85-23.899-7.912-34.251 49.725 21.151 88.779 64.152 103.497 118.574l2.905 10.743 11.127.209c9.395.176 18.236 3.937 24.884 10.577 6.84 6.848 10.607 15.945 10.607 25.616-.001 19.587-15.923 35.822-35.493 36.191z"></path>
                    </svg>
                  </div>

                  <div className="lh-1">Better for children.</div>
                </li>

                <li className="col hstack gap-lg-4 gap-3 animateThis slideRight">
                  <div className={`${styles.promIcBox} flex-shrink-0`}>
                    <svg
                      viewBox="0 0 512 512"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path d="m512 128.533-80.643-44.192-44.191-84.341-31.581 61.281c-14.219-4.49-29.016-6.77-44.15-6.77-27.924 0-57.382 9.293-82.364 25.76-24.982-16.466-54.441-25.76-82.364-25.76-80.895.001-146.707 65.813-146.707 146.708 0 48.802 23.407 77.079 56.083 115.237l51.954 161.935c6.283 20.105 24.647 33.609 45.717 33.609h9.033l63.271-119.556c.793-1.5 2.077-1.815 3.014-1.815s2.22.314 3.014 1.815l63.269 119.556h9.033c21.07 0 39.434-13.503 45.717-33.61l51.953-161.934c32.677-38.159 56.084-66.436 56.084-115.237 0-13.68-1.866-27.119-5.554-40.105zm-94.108 116.286c-10.203 20.215-27.934 39.65-42.552 56.713l-53.821 167.759-.04.126c-1.488 4.786-4.809 8.574-9.055 10.697l-53.822-101.703c-5.805-10.969-17.12-17.783-29.53-17.783s-23.726 6.814-29.53 17.783l-53.823 101.703c-4.247-2.123-7.566-5.91-9.055-10.696l-53.862-167.886c-25.245-29.466-52.802-59.179-52.802-100.313 0-64.353 52.354-116.707 116.707-116.707 31.37 0 58.167 14.506 82.364 33.056 31.691-24.293 67.848-39.354 108.311-30.169l-75.21 41.134 80.802 44.192 44.192 80.802 39.334-71.921c3.646 21.575 1.292 43.598-8.608 63.213zm-8.638-94.198-22.088 40.386-22.089-40.386-40.386-22.088 40.386-22.088 22.089-40.386 22.088 40.386 40.386 22.088z"></path>

                      <path d="m464.958 28.404h30v30h-30z"></path>

                      <path d="m279.457 198.895h30v30h-30z"></path>
                    </svg>
                  </div>

                  <div className="lh-1">Better for long-term oral health.</div>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>

      <svg
        className={styles.waves}
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 24 150 28"
        preserveAspectRatio="none"
        shapeRendering="auto"
      >
        <defs>
          <path
            id="gentle-wave"
            d="M-160 44c30 0 58-18 88-18s 58 18 88 18 58-18 88-18 58 18 88 18 v44h-352z"
          />
        </defs>

        <g className={styles.parallax}>
          <use
            xlinkHref="#gentle-wave"
            x="48"
            y="0"
            fill="rgba(255,255,255,1)"
          />

          <use
            xlinkHref="#gentle-wave"
            x="48"
            y="3"
            fill="rgba(255,255,255,0.5)"
          />

          <use
            xlinkHref="#gentle-wave"
            x="48"
            y="5"
            fill="rgba(255,255,255,.75)"
          />

          <use xlinkHref="#gentle-wave" x="48" y="7" fill="#faf5e0" />
        </g>
      </svg>

      <div className="sitePadding pb-5 pt-4" style={{ background: "#faf5e0" }}>
        <div
          className="container-fluid text-center animateThis fadeIn"
          style={{ maxWidth: "1300px" }}
        >
          <p>
            We believe great pediatric dental products should combine function,
            safety, quality, and thoughtful design making everyday dentistry
            more effective for professionals and more comfortable for children.
          </p>

          <p>
            Our commitment goes beyond the product itself. It is reflected in
            the way we develop, manufacture, quality-check, and deliver
            everything we put into the hands of dental professionals.
          </p>

          <h4 className="fw-bold animateThis curtain">
            Because quality is not an option. It is our standard.
          </h4>
        </div>
      </div>
    </section>
  );
};

export default BrandPromise;