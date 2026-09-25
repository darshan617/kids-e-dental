"use client";

import React, { useEffect, useState } from "react";
import CustomPopup from "@/common-component/custom-popup/CustomPopup";
import styles from "@/common-component/auth-popup/AuthPopup.module.css";
import Image from "next/image";
import aboutMascot from "@/assets/images/aboutMascot.png";
import { FaRegEye } from "react-icons/fa";
import { FaRegEyeSlash } from "react-icons/fa";

const AuthPopup = ({ isOpen, onClose, initialMode = "login" }) => {
  const [mode, setMode] = useState(initialMode);

  useEffect(() => {
    if (isOpen) setMode(initialMode);
  }, [isOpen, initialMode]);

  const isLogin = mode === "login";
  const isSignup = mode === "signup";
  const isForgot = mode === "forgot";

  const handleSubmit = (event) => {
    event.preventDefault();
  };

  const [showLoginPwd, setShowLoginPwd] = useState(false);
  const [showSignupPwd, setShowSignupPwd] = useState(false);

  return (
    <CustomPopup isOpen={isOpen} onClose={onClose} size="lg">
      <div className="loginModal bgPrimary d-flex flex-wrap align-items-stretch p-1">
        <div className="col-md-7 p-sm-5 p-4 pb-4 bg-white position-relative">
          {isLogin && (
            <>
              <h3 className="sectionHead mb-4 d-inline-flex align-items-center gap-3">
                Login
              </h3>

              <form
                onSubmit={handleSubmit}
                className={`${styles.formFormat} row g-4`}
              >
                <div className="col-12">
                  <input
                    type="email"
                    className="form-control"
                    name="email"
                    id="loginEmail"
                    placeholder="Email"
                  />
                </div>
                <div className="col-12">
                  <button
                    className={`${styles.closeBtn} rounded-circle position-absolute top-0 end-0 m-sm-3 m-2`}
                    aria-label="Close"
                    onClick={onClose}
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="currentColor"
                      viewBox="0 0 16 16"
                    >
                      <path d="M2.146 2.854a.5.5 0 1 1 .708-.708L8 7.293l5.146-5.147a.5.5 0 0 1 .708.708L8.707 8l5.147 5.146a.5.5 0 0 1-.708.708L8 8.707l-5.146 5.147a.5.5 0 0 1-.708-.708L7.293 8z" />
                    </svg>
                  </button>
                  <div className="position-relative">
                    <input
                      type={showLoginPwd ? "text" : "password"}
                      className="form-control"
                      name="password"
                      id="loginPasswordInput"
                      placeholder="Password"
                    />
                    <button
                      type="button"
                      className={`${styles.passwordBtn}`}
                      id="loginPswdSH"
                      onClick={() => setShowLoginPwd((prev) => !prev)}
                    >
                      {showLoginPwd ? <FaRegEye /> : <FaRegEyeSlash />}
                    </button>
                  </div>
                  <small>
                    <a
                      href="#"
                      role="button"
                      onClick={() => setMode("forgot")}
                      className={`${styles.forgotBtn} mt-1 float-end`}
                    >
                      Forgot Password?
                    </a>
                  </small>
                </div>
                <div className="col-12 text-center">
                  <button type="submit" className="ctaBtn arw">
                    Continue
                  </button>
                  <small className="d-block mt-3" style={{ fontSize: "11px" }}>
                    By continuing, you agree to our <a href="">Terms of Use</a>{" "}
                    & <a href="">Privacy Policy</a>
                  </small>
                </div>
                <div className="col-12 text-center mt-sm-5 mt-4 py-3 bg-secondary-subtle rounded-pill">
                  Didn't have an account?{" "}
                  <a
                    href="#"
                    role="button"
                    onClick={() => setMode("signup")}
                    className="fw-semibold"
                  >
                    Signup
                  </a>
                </div>
              </form>
            </>
          )}

          {isSignup && (
            <>
              <button
                className={`${styles.closeBtn} rounded-circle position-absolute top-0 end-0 m-sm-3 m-2`}
                aria-label="Close"
                onClick={onClose}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="currentColor"
                  viewBox="0 0 16 16"
                >
                  <path d="M2.146 2.854a.5.5 0 1 1 .708-.708L8 7.293l5.146-5.147a.5.5 0 0 1 .708.708L8.707 8l5.147 5.146a.5.5 0 0 1-.708.708L8 8.707l-5.146 5.147a.5.5 0 0 1-.708-.708L7.293 8z" />
                </svg>
              </button>
              <h3 className="sectionHead mb-4 d-inline-flex align-items-center gap-3">
                Sign Up
              </h3>

              <form
                onSubmit={handleSubmit}
                className={`${styles.formFormat} row g-4 `}
              >
                <div className="col-12">
                  <input
                    type="text"
                    className="form-control"
                    name="name"
                    id="signupName"
                    placeholder="Name"
                  />
                </div>
                <div className="col-12">
                  <input
                    type="email"
                    className="form-control"
                    name="email"
                    id="signupEmail"
                    placeholder="Email"
                  />
                </div>
                <div className="col-12">
                  <div className="position-relative">
                    <input
                      type={showSignupPwd ? "text" : "password"}
                      className="form-control"
                      name="password"
                      id="signupPasswordInput"
                      placeholder="Password"
                    />
                    <button
                      type="button"
                      className={styles.passwordBtn}
                      id="signupPswdSH"
                      onClick={() => setShowSignupPwd((prev) => !prev)}
                    >
                      {showSignupPwd ? <FaRegEye /> : <FaRegEyeSlash />}
                    </button>
                  </div>
                </div>
                <div className="col-12 text-center">
                  <button type="submit" className="ctaBtn arw">
                    Continue
                  </button>
                  <small className="d-block mt-3" style={{ fontSize: "11px" }}>
                    By continuing, you agree to our <a href="">Terms of Use</a>{" "}
                    & <a href="">Privacy Policy</a>
                  </small>
                </div>
                <div className="col-12 text-center mt-sm-5 mt-4 py-3 bg-secondary-subtle rounded-pill">
                  Already have an account?{" "}
                  <a
                    href="#"
                    role="button"
                    onClick={() => setMode("login")}
                    className="fw-semibold"
                  >
                    Login
                  </a>
                </div>
              </form>
            </>
          )}

          {isForgot && (
            <>
              <button
                className={`${styles.closeBtn} rounded-circle position-absolute top-0 end-0 m-sm-3 m-2`}
                aria-label="Close"
                onClick={onClose}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="currentColor"
                  viewBox="0 0 16 16"
                >
                  <path d="M2.146 2.854a.5.5 0 1 1 .708-.708L8 7.293l5.146-5.147a.5.5 0 0 1 .708.708L8.707 8l5.147 5.146a.5.5 0 0 1-.708.708L8 8.707l-5.146 5.147a.5.5 0 0 1-.708-.708L7.293 8z" />
                </svg>
              </button>
              <h3 className="sectionHead mb-4 d-inline-flex align-items-center gap-3">
                Reset Password
              </h3>

              <form
                onSubmit={handleSubmit}
                className={`${styles.formFormat} row g-4 `}
              >
                <div className="col-12">
                  Enter your registered email id to receive a password reset
                  link.
                </div>
                <div className="col-12">
                  <input
                    type="email"
                    className="form-control"
                    name="email"
                    id="forgotEmail"
                    placeholder="Email"
                  />
                </div>
                <div className="col-12 text-center">
                  <button type="submit" className="ctaBtn arw">
                    Continue
                  </button>
                  <small className="d-block mt-3" style={{ fontSize: "11px" }}>
                    By continuing, you agree to our <a href="">Terms of Use</a>{" "}
                    & <a href="">Privacy Policy</a>
                  </small>
                </div>
                <div className="col-12 text-center mt-sm-5 mt-4 py-3 bg-secondary-subtle rounded-pill">
                  Back to{" "}
                  <a
                    href="#"
                    role="button"
                    onClick={() => setMode("login")}
                    className="fw-semibold"
                  >
                    Login
                  </a>
                </div>
              </form>
            </>
          )}
        </div>

        <div className="col-md-5 d-none d-md-flex p-4 vstack text-center">
          <div className="col d-flex align-items-center">
            <h3 className="sectionHead lh-1 text-uppercase">
              <span className="fw-light">Making</span>
              <br />
              Pediatric Dentistry
              <i
                className="fw-normal text-white text-capitalize d-block"
                style={{ transform: "scale(1.3)" }}
              >
                Easy
              </i>
            </h3>
          </div>
          <div className="col-auto mt-auto">
            <Image src={aboutMascot} alt="" className="w-75 h-auto  " />
          </div>
        </div>
      </div>
    </CustomPopup>
  );
};

export default AuthPopup;
