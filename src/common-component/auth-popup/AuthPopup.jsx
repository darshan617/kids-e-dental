"use client";

import React, { useEffect, useRef, useState } from "react";
import CustomPopup from "@/common-component/custom-popup/CustomPopup";
import styles from "@/common-component/auth-popup/AuthPopup.module.css";
import Image from "next/image";
import aboutMascot from "@/assets/images/aboutMascot.png";
import { FaRegEye, FaRegEyeSlash } from "react-icons/fa";
import { useToast } from "@/custom-hooks/toast/ToastProvider";
import {
  useLoginMutation,
  useRegisterMutation,
  useResetPasswordMutation,
  useVerifyOtpMutation,
  useResendOtpMutation,
} from "@/redux/apis/registerApi";
import Cookies from "js-cookie";

const OTP_LENGTH = 6;
const RESEND_SECONDS = 30;

const CloseIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    fill="currentColor"
    viewBox="0 0 16 16"
  >
    <path d="M2.146 2.854a.5.5 0 1 1 .708-.708L8 7.293l5.146-5.147a.5.5 0 0 1 .708.708L8.707 8l5.147 5.146a.5.5 0 0 1-.708.708L8 8.707l-5.146 5.147a.5.5 0 0 1-.708-.708L7.293 8z" />
  </svg>
);

const TermsNote = () => (
  <small className="d-block mt-3" style={{ fontSize: "11px" }}>
    By continuing, you agree to our <a href="#">Terms of Use</a> &{" "}
    <a href="#">Privacy Policy</a>
  </small>
);

const ErrorMessage = ({ message }) =>
  message ? (
    <div className="col-12 text-danger small" role="alert">
      {message}
    </div>
  ) : null;

const maskEmail = (value = "") => {
  const [user, domain] = value.split("@");
  if (!domain) return value;
  return `${user.slice(0, 2)}${"*".repeat(Math.max(user.length - 2, 2))}@${domain}`;
};

const AuthPopup = ({ isOpen = false, onClose, initialMode = "login" }) => {
  const [mode, setMode] = useState(initialMode);
  const { showToast } = useToast();

  // api calls
  const [register, { isLoading: isSignupLoading }] = useRegisterMutation();
  const [login, { isLoading: isLoginLoading }] = useLoginMutation();
  const [passwordReset, { isLoading: isResetLoading }] =
    useResetPasswordMutation();
  const [verifyOtp, { isLoading: isVerifyLoading }] = useVerifyOtpMutation();
  const [resendOtp, { isLoading: isResendLoading }] = useResendOtpMutation();

  // signup fields
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showSignupPwd, setShowSignupPwd] = useState(false);

  // login fields
  const [loginEmail, setLoginEmail] = useState("");
  const [loginPassword, setLoginPassword] = useState("");
  const [showLoginPwd, setShowLoginPwd] = useState(false);

  // forgot password field
  const [resetEmail, setResetEmail] = useState("");

  // otp fields
  const [otpEmail, setOtpEmail] = useState("");
  const [otp, setOtp] = useState(Array(OTP_LENGTH).fill(""));
  const [secondsLeft, setSecondsLeft] = useState(0);
  const otpRefs = useRef([]);

  const [error, setError] = useState("");

  useEffect(() => {
    if (isOpen) {
      setMode(initialMode);
      setError("");
    }
  }, [isOpen, initialMode]);

  // resend countdown
  useEffect(() => {
    if (secondsLeft <= 0) return;
    const id = setTimeout(() => setSecondsLeft((s) => s - 1), 1000);
    return () => clearTimeout(id);
  }, [secondsLeft]);

  // focus first otp box when otp screen opens
  useEffect(() => {
    if (mode === "otp") {
      setTimeout(() => otpRefs.current[0]?.focus(), 50);
    }
  }, [mode]);

  const isLogin = mode === "login";
  const isSignup = mode === "signup";
  const isForgot = mode === "forgot";
  const isOtp = mode === "otp";

  const switchMode = (e, nextMode) => {
    e.preventDefault();
    setError("");
    setMode(nextMode);
  };

  const clearOtpBoxes = () => {
    setOtp(Array(OTP_LENGTH).fill(""));
    setTimeout(() => otpRefs.current[0]?.focus(), 0);
  };

  // show api error in the form and as a toast
  const showError = (err, fallback) => {
    const message = err?.data?.message || fallback;
    setError(message);
    showToast(message, "error");
  };

  // ---------- Signup ----------
  const handleSignup = async (e) => {
    e.preventDefault();
    setError("");

    try {
      const response = await register({
        body: { name, email, password, password_confirmation: password },
      }).unwrap();

      showToast(
        response?.message || "Verification code sent to your email",
        "success",
      );

      setOtpEmail(email);
      setName("");
      setEmail("");
      setPassword("");
      setShowSignupPwd(false);
      clearOtpBoxes();
      setSecondsLeft(RESEND_SECONDS);
      setMode("otp");
    } catch (err) {
      console.error("Signup failed:", err);
      showError(err, "Signup failed. Please try again.");
    }
  };

  // ---------- Login ----------

  const handleLogin = async (e) => {
    e.preventDefault();
    setError("");

    try {
      const response = await login({
        body: {
          email: loginEmail,
          password: loginPassword,
        },
      }).unwrap();

      const userData = response?.user;
      const token = response?.token;

      if (userData) {
        Cookies.set("userData", JSON.stringify(userData), {
          expires: 7,
          sameSite: "Lax",
        });
      }

      if (token) {
        Cookies.set("token", token, {
          expires: 7,
          sameSite: "Lax",
        });
      }

      console.log("User data saved:", userData);
      console.log("User ID:", userData?.id);

      showToast(response?.message || "Logged in successfully", "success");

      setLoginEmail("");
      setLoginPassword("");
      setShowLoginPwd(false);
      onClose?.();
    } catch (err) {
      console.error("Login failed:", err);
      showError(err, "Login failed. Please try again.");
    }
  };

  // ---------- OTP ----------
  const handleOtpChange = (index, value) => {
    const digit = value.replace(/\D/g, "").slice(-1);
    const next = [...otp];
    next[index] = digit;
    setOtp(next);
    setError("");

    // move to next box
    if (digit && index < OTP_LENGTH - 1) {
      otpRefs.current[index + 1]?.focus();
    }
  };

  const handleOtpKeyDown = (index, e) => {
    if (e.key === "Backspace" && !otp[index] && index > 0) {
      otpRefs.current[index - 1]?.focus();
    } else if (e.key === "ArrowLeft" && index > 0) {
      otpRefs.current[index - 1]?.focus();
    } else if (e.key === "ArrowRight" && index < OTP_LENGTH - 1) {
      otpRefs.current[index + 1]?.focus();
    }
  };

  const handleOtpPaste = (e) => {
    e.preventDefault();
    const pasted = e.clipboardData
      .getData("text")
      .replace(/\D/g, "")
      .slice(0, OTP_LENGTH);
    if (!pasted) return;

    const next = Array(OTP_LENGTH).fill("");
    pasted.split("").forEach((digit, i) => (next[i] = digit));
    setOtp(next);
    otpRefs.current[Math.min(pasted.length, OTP_LENGTH - 1)]?.focus();
  };

  const handleVerifyOtp = async (e) => {
    e.preventDefault();
    setError("");

    try {
      const response = await verifyOtp({
        body: { email: otpEmail, otp: otp.join("") },
      }).unwrap();

      showToast(response?.message || "Email verified successfully", "success");

      clearOtpBoxes();
      onClose?.();
    } catch (err) {
      console.error("OTP verification failed:", err);
      showError(err, "Invalid code. Please try again.");
    }
  };

  const handleResendOtp = async (e) => {
    e.preventDefault();
    if (secondsLeft > 0 || isResendLoading) return;
    setError("");

    try {
      const response = await resendOtp({ body: { email: otpEmail } }).unwrap();

      showToast(
        response?.message || "A new code has been sent to your email",
        "success",
      );

      setSecondsLeft(RESEND_SECONDS);
      clearOtpBoxes();
    } catch (err) {
      console.error("Resend OTP failed:", err);
      showError(err, "Could not resend code. Try again.");
    }
  };

  // ---------- Forgot password ----------
  const handleReset = async (e) => {
    e.preventDefault();
    setError("");

    try {
      const response = await passwordReset({
        body: { email: resetEmail },
      }).unwrap();

      showToast(
        response?.message || "Password reset link sent to your email",
        "success",
      );

      setResetEmail("");
    } catch (err) {
      console.error("Reset failed:", err);
      showError(err, "Reset failed. Please try again.");
    }
  };

  return (
    <CustomPopup
      isOpen={isOpen}
      onClose={onClose}
      closeIcon={false}
      maxWidth="800px"
    >
      <div className="loginModal bgPrimary d-flex flex-wrap align-items-stretch p-1">
        <div className="col-md-7 p-sm-5 p-4 pb-4 bg-white position-relative">
          <button
            type="button"
            className={`${styles.closeBtn} rounded-circle position-absolute top-0 end-0 m-sm-3 m-2`}
            aria-label="Close"
            onClick={onClose}
          >
            <CloseIcon />
          </button>

          {/* ---------- LOGIN ---------- */}
          {isLogin && (
            <>
              <h3 className="sectionHead mb-4 d-inline-flex align-items-center gap-3">
                Login
              </h3>

              <form
                className={`${styles.formFormat} row g-4`}
                onSubmit={handleLogin}
              >
                <div className="col-12">
                  <input
                    type="email"
                    className="form-control"
                    name="email"
                    id="loginEmail"
                    placeholder="Email"
                    value={loginEmail}
                    onChange={(e) => setLoginEmail(e.target.value)}
                    required
                  />
                </div>
                <div className="col-12">
                  <div className="position-relative">
                    <input
                      type={showLoginPwd ? "text" : "password"}
                      className="form-control"
                      name="password"
                      id="loginPasswordInput"
                      placeholder="Password"
                      value={loginPassword}
                      onChange={(e) => setLoginPassword(e.target.value)}
                      required
                    />
                    <button
                      type="button"
                      className={styles.passwordBtn}
                      id="loginPswdSH"
                      aria-label={
                        showLoginPwd ? "Hide password" : "Show password"
                      }
                      onClick={() => setShowLoginPwd(!showLoginPwd)}
                    >
                      {showLoginPwd ? <FaRegEye /> : <FaRegEyeSlash />}
                    </button>
                  </div>
                  <small>
                    <a
                      href="#"
                      role="button"
                      onClick={(e) => switchMode(e, "forgot")}
                      className={`${styles.forgotBtn} mt-1 float-end`}
                    >
                      Forgot Password?
                    </a>
                  </small>
                </div>

                <ErrorMessage message={error} />

                <div className="col-12 text-center">
                  <button
                    type="submit"
                    className="ctaBtn arw"
                    disabled={isLoginLoading}
                  >
                    {isLoginLoading ? "Logging in..." : "Continue"}
                  </button>
                  <TermsNote />
                </div>
                <div className="col-12 text-center mt-sm-5 mt-4 py-3 bg-secondary-subtle rounded-pill">
                  Don&apos;t have an account?{" "}
                  <a
                    href="#"
                    role="button"
                    onClick={(e) => switchMode(e, "signup")}
                    className="fw-semibold"
                  >
                    Signup
                  </a>
                </div>
              </form>
            </>
          )}

          {/* ---------- SIGNUP ---------- */}
          {isSignup && (
            <>
              <h3 className="sectionHead mb-4 d-inline-flex align-items-center gap-3">
                Sign Up
              </h3>

              <form
                className={`${styles.formFormat} row g-4`}
                onSubmit={handleSignup}
              >
                <div className="col-12">
                  <input
                    type="text"
                    className="form-control"
                    name="name"
                    id="signupName"
                    placeholder="Name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    required
                  />
                </div>
                <div className="col-12">
                  <input
                    type="email"
                    className="form-control"
                    name="email"
                    id="signupEmail"
                    placeholder="Email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
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
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      required
                    />
                    <button
                      type="button"
                      className={styles.passwordBtn}
                      id="signupPswdSH"
                      aria-label={
                        showSignupPwd ? "Hide password" : "Show password"
                      }
                      onClick={() => setShowSignupPwd(!showSignupPwd)}
                    >
                      {showSignupPwd ? <FaRegEye /> : <FaRegEyeSlash />}
                    </button>
                  </div>
                </div>

                <ErrorMessage message={error} />

                <div className="col-12 text-center">
                  <button
                    type="submit"
                    className="ctaBtn arw"
                    disabled={isSignupLoading}
                  >
                    {isSignupLoading ? "Signing up..." : "Continue"}
                  </button>
                  <TermsNote />
                </div>
                <div className="col-12 text-center mt-sm-5 mt-4 py-3 bg-secondary-subtle rounded-pill">
                  Already have an account?{" "}
                  <a
                    href="#"
                    role="button"
                    onClick={(e) => switchMode(e, "login")}
                    className="fw-semibold"
                  >
                    Login
                  </a>
                </div>
              </form>
            </>
          )}

          {/* ---------- VERIFY OTP ---------- */}
          {isOtp && (
            <>
              <h3 className="sectionHead mb-2 d-inline-flex align-items-center gap-3">
                Verify Email
              </h3>
              <p className="mb-4 small text-secondary">
                We&apos;ve sent a {OTP_LENGTH}-digit code to{" "}
                <strong className="text-dark">{maskEmail(otpEmail)}</strong>.
                Enter it below to verify your account.
              </p>

              <form
                className={`${styles.formFormat} row g-4`}
                onSubmit={handleVerifyOtp}
              >
                <div className="col-12">
                  <div
                    className={styles.otpWrap}
                    onPaste={handleOtpPaste}
                    role="group"
                    aria-label="One-time password"
                  >
                    {otp.map((digit, i) => (
                      <input
                        key={i}
                        ref={(el) => (otpRefs.current[i] = el)}
                        type="text"
                        inputMode="numeric"
                        autoComplete={i === 0 ? "one-time-code" : "off"}
                        maxLength={1}
                        value={digit}
                        aria-label={`Digit ${i + 1}`}
                        className={`${styles.otpInput} ${
                          digit ? styles.otpFilled : ""
                        } ${error ? styles.otpError : ""}`}
                        onChange={(e) => handleOtpChange(i, e.target.value)}
                        onKeyDown={(e) => handleOtpKeyDown(i, e)}
                        onFocus={(e) => e.target.select()}
                      />
                    ))}
                  </div>
                </div>

                <ErrorMessage message={error} />

                <div className="col-12 text-center">
                  <button
                    type="submit"
                    className="ctaBtn arw"
                    disabled={
                      isVerifyLoading || otp.join("").length < OTP_LENGTH
                    }
                  >
                    {isVerifyLoading ? "Verifying..." : "Verify"}
                  </button>

                  <div className="small mt-3">
                    {secondsLeft > 0 ? (
                      <span className="text-secondary">
                        Resend code in{" "}
                        <strong>
                          0:{String(secondsLeft).padStart(2, "0")}
                        </strong>
                      </span>
                    ) : (
                      <>
                        Didn&apos;t get the code?{" "}
                        <a
                          href="#"
                          role="button"
                          onClick={handleResendOtp}
                          className="fw-semibold"
                        >
                          {isResendLoading ? "Sending..." : "Resend"}
                        </a>
                      </>
                    )}
                  </div>
                </div>

                <div className="col-12 text-center mt-sm-4 mt-3 py-3 bg-secondary-subtle rounded-pill">
                  Wrong email?{" "}
                  <a
                    href="#"
                    role="button"
                    onClick={(e) => switchMode(e, "signup")}
                    className="fw-semibold"
                  >
                    Go back
                  </a>
                </div>
              </form>
            </>
          )}

          {/* ---------- FORGOT PASSWORD ---------- */}
          {isForgot && (
            <>
              <h3 className="sectionHead mb-4 d-inline-flex align-items-center gap-3">
                Reset Password
              </h3>

              <form
                className={`${styles.formFormat} row g-4`}
                onSubmit={handleReset}
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
                    value={resetEmail}
                    onChange={(e) => setResetEmail(e.target.value)}
                    required
                  />
                </div>

                <ErrorMessage message={error} />

                <div className="col-12 text-center">
                  <button
                    type="submit"
                    className="ctaBtn arw"
                    disabled={isResetLoading}
                  >
                    {isResetLoading ? "Sending..." : "Continue"}
                  </button>
                  <TermsNote />
                </div>
                <div className="col-12 text-center mt-sm-5 mt-4 py-3 bg-secondary-subtle rounded-pill">
                  Back to{" "}
                  <a
                    href="#"
                    role="button"
                    onClick={(e) => switchMode(e, "login")}
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
            <Image src={aboutMascot} alt="" className="w-75 h-auto" />
          </div>
        </div>
      </div>
    </CustomPopup>
  );
};

export default AuthPopup;
