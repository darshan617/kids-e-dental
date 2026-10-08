"use client";

import React, { useRef } from "react";
import Image from "next/image";
import groupMascot from "@/assets/images/groupMascot.png";
import styles from "@/components/contact-us/ContactUs.module.css";

const ContactUs = () => {
  const handleSubmit = (e) => {
    e.preventDefault();
  };

  const distributorRef = useRef(null);
  const distributorGradRef = useRef(null);

  const handleMouseMove = (e) => {
    const distributor = distributorRef.current;
    const distributorGrad = distributorGradRef.current;

    if (!distributor || !distributorGrad) return;

    const rect = distributor.getBoundingClientRect();

    const x = Math.floor(e.clientX - rect.left);
    const y = Math.floor(e.clientY - rect.top);

    distributorGrad.style.setProperty("--x", `${x}px`);
    distributorGrad.style.setProperty("--y", `${y}px`);
  };
  return (
    <section
      className="sitePadding py-5 bgPrimary position-relative distributor"
      ref={distributorRef}
      onMouseMove={handleMouseMove}
    >
      <div className={styles.distributorGrad} ref={distributorGradRef}>
        <span></span>
        <span></span>
      </div>
      <div className="container-fluid position-relative z-3">
        <div className="text-center mb-4">
          <h2 className="sectionHead">Contact Us</h2>
          <p>
            To receive smart dental solutions without compromising on quality.
          </p>
        </div>

        <div className="row justify-content-between gx-lg-5 gy-5">
          <div className="col-xl-4 col-md-6 pt-xl-4">
            <div
              className={`${styles.contDetails} vstack gap-4 animateThis slideRight`}
            >
              <div>
                <h3 className="sectionHead_sm fw-semibold mb-0">
                  Corporate Office
                </h3>
              </div>

              <div className="hstack gap-3 align-items-start">
                <div className={styles.contIcon}>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path d="M20 10c0 4.993-5.539 10.193-7.399 11.799a1 1 0 0 1-1.202 0C9.539 20.193 4 14.993 4 10a8 8 0 0 1 16 0" />
                    <circle cx="12" cy="10" r="3" />
                  </svg>
                </div>
                <div className="pt-1">
                  <address className="mb-3">
                    Kids-e-Dental LLP India, <br /> Akruti Arcade, JP Road, Azad
                    Nagar,
                    <br />
                    Opp. A. H. Wadia School, Andheri West,
                    <br /> Mumbai, India - 400053.
                  </address>
                  <div className="fw-bold lh-1" style={{ fontSize: "60%" }}>
                    <a
                      href="https://maps.app.goo.gl/jtKew7zQpZVLuwoY6"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      VIEW ON MAP
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="12"
                        height="12"
                        fill="currentColor"
                        className="ms-1"
                        viewBox="0 0 16 16"
                      >
                        <path
                          fillRule="evenodd"
                          d="M8.636 3.5a.5.5 0 0 0-.5-.5H1.5A1.5 1.5 0 0 0 0 4.5v10A1.5 1.5 0 0 0 1.5 16h10a1.5 1.5 0 0 0 1.5-1.5V7.864a.5.5 0 0 0-1 0V14.5a.5.5 0 0 1-.5.5h-10a.5.5 0 0 1-.5-.5v-10a.5.5 0 0 1 .5-.5h6.636a.5.5 0 0 0 .5-.5"
                        />
                        <path
                          fillRule="evenodd"
                          d="M16 .5a.5.5 0 0 0-.5-.5h-5a.5.5 0 0 0 0 1h3.793L6.146 9.146a.5.5 0 1 0 .708.708L15 1.707V5.5a.5.5 0 0 0 1 0z"
                        />
                      </svg>
                    </a>
                  </div>
                </div>
              </div>

              <div className="hstack gap-3 align-items-start">
                <div className={styles.contIcon}>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path d="M13.832 16.568a1 1 0 0 0 1.213-.303l.355-.465A2 2 0 0 1 17 15h3a2 2 0 0 1 2 2v3a2 2 0 0 1-2 2A18 18 0 0 1 2 4a2 2 0 0 1 2-2h3a2 2 0 0 1 2 2v3a2 2 0 0 1-.8 1.6l-.468.351a1 1 0 0 0-.292 1.233 14 14 0 0 0 6.392 6.384" />
                  </svg>
                </div>
                <div className="pt-1">
                  <a href="tel:+919960560199" className="fw-medium">
                    +91 99605 60199
                  </a>
                </div>
              </div>

              <div className="hstack gap-3 align-items-start">
                <div className={styles.contIcon}>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path d="m22 7-8.991 5.727a2 2 0 0 1-2.009 0L2 7" />
                    <rect x="2" y="4" width="20" height="16" rx="2" />
                  </svg>
                </div>
                <div className="vstack gap-2 pt-1">
                  <a
                    href="mailto:enquiry@kids-e-dental.com"
                    className="fw-medium"
                  >
                    enquiry@kids-e-dental.com
                  </a>
                  <a href="mailto:kidsedental@gmail.com" className="fw-medium">
                    kidsedental@gmail.com
                  </a>
                </div>
              </div>
            </div>
          </div>

          <div className="col-xl-4 col-md-6">
            <div className="p-2 bg-white rounded-4 shadow-lg animateThis fadeGrow">
              <form
                className="row g-3 p-sm-4 p-3 m-0 rounded-3 formFormat"
                style={{ border: "1px solid #aaa" }}
                onSubmit={handleSubmit}
              >
                <div className="col-12 mt-0">
                  <h4 className="sectionHead_sm mb-0 lh-1">
                    Send Us An Enquiry
                  </h4>
                </div>
                <div className="col-12">
                  <label className="form-label">Name *</label>
                  <input type="text" className="form-control" />
                  <span className="errorLabel">This field is required</span>
                </div>
                <div className="col-12">
                  <label className="form-label">Email *</label>
                  <input type="text" className="form-control" />
                  <span className="errorLabel">This field is required</span>
                </div>
                <div className="col-12">
                  <label className="form-label">Mobile No.*</label>
                  <input type="text" className="form-control" />
                  <span className="errorLabel">This field is required</span>
                </div>
                <div className="col-12">
                  <label className="form-label">Message</label>
                  <textarea className="form-control" rows="2"></textarea>
                  <span className="errorLabel">This field is required</span>
                </div>
                <div className="col-12 pt-3 text-center">
                  <button
                    type="submit"
                    className="ctaBtn arw"
                    style={{ width: "150px" }}
                  >
                    Submit
                  </button>
                </div>
              </form>
            </div>
          </div>

          <div className="col-xl-4 d-flex align-items-end justify-content-xl-end justify-content-center">
            <Image
              src={groupMascot}
              alt=""
              className="mw-100 animateThis slideTop"
              style={{ height: "auto" }}
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default ContactUs;
