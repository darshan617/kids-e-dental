import Image from "next/image";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import { FiLock, FiEye, FiEyeOff, FiArrowRight, FiMail } from "react-icons/fi";
import logo from "@/assets/images/KidseDental_Logo.png";
import styles from "@/components/reset-password/ResetPassword.module.css";
import { useResetPasswordMutation } from "@/redux/apis/registerApi";
import { useToast } from "@/custom-hooks/toast/ToastProvider";

const ResetPassword = () => {
  const router = useRouter();
  const { showToast } = useToast();
  const [resetPassword, { isLoading }] = useResetPasswordMutation();
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const [error, setError] = useState("");
  const [email, setEmail] = useState("");

  useEffect(() => {
    if (!router.isReady) return;
    const queryEmail = router.query.email;
    if (typeof queryEmail === "string") {
      setEmail(queryEmail);
    }
  }, [router.isReady, router.query.email]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    if (password.length < 8) {
      setError("Password must be at least 8 characters long.");
      return;
    }
    if (password !== confirmPassword) {
      setError("Passwords do not match.");
      return;
    }

    try {
      const response = await resetPassword({
        body: {
          email,
          password,
          password_confirmation: confirmPassword,
        },
      }).unwrap();

      showToast(response?.message || "Password reset successfully", "success");
      setPassword("");
      setConfirmPassword("");
      router.push("/");
    } catch (err) {
      const message =
        err?.data?.message || "Something went wrong. Please try again.";
      setError(message);
      showToast(message, "error");
    }
  };

  return (
    <div
      className={`${styles.page} d-flex flex-column align-items-center justify-content-center px-3`}
    >
      <div className={styles.card}>
        {/* Logo */}
        <div className="text-center mb-3">
          <Image src={logo} alt="Kids-e-Dental" className={styles.logo} />
        </div>

        {/* Heading */}
        <h2 className="text-center fw-semibold fs-4 text-dark">
          Reset Password
        </h2>

        <form onSubmit={handleSubmit}>
          {/* email */}
          <div className="mb-4">
            <label className="form-label small fw-medium text-dark">
              Email
            </label>
            <div className={`input-group ${styles.inputGroup}`}>
              <span className={`input-group-text ${styles.inputIcon}`}>
                <FiMail size={16} />
              </span>
              <input
                type="email"
                className={`form-control ${styles.input}`}
                placeholder="Enter email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                disabled
              />
            </div>
          </div>

          {/* New password */}
          <div className="mb-4">
            <label className="form-label small fw-medium text-dark">
              New Password
            </label>
            <div className={`input-group ${styles.inputGroup}`}>
              <span className={`input-group-text ${styles.inputIcon}`}>
                <FiLock size={16} />
              </span>
              <input
                type={showPassword ? "text" : "password"}
                className={`form-control ${styles.input}`}
                placeholder="Enter new password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
              <button
                type="button"
                className={`btn ${styles.toggleBtn}`}
                onClick={() => setShowPassword((v) => !v)}
                aria-label="Toggle password visibility"
              >
                {showPassword ? <FiEyeOff size={16} /> : <FiEye size={16} />}
              </button>
            </div>
          </div>

          {/* Confirm password */}
          <div className="mb-4">
            <label className="form-label small fw-medium text-dark">
              Confirm Password
            </label>
            <div className={`input-group ${styles.inputGroup}`}>
              <span className={`input-group-text ${styles.inputIcon}`}>
                <FiLock size={16} />
              </span>
              <input
                type={showConfirm ? "text" : "password"}
                className={`form-control ${styles.input}`}
                placeholder="Re-enter new password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                required
              />
              <button
                type="button"
                className={`btn ${styles.toggleBtn}`}
                onClick={() => setShowConfirm((v) => !v)}
                aria-label="Toggle confirm password visibility"
              >
                {showConfirm ? <FiEyeOff size={16} /> : <FiEye size={16} />}
              </button>
            </div>
          </div>

          {error && <p className="text-danger small mb-3">{error}</p>}

          {/* Submit */}
          <button
            type="submit"
            disabled={isLoading}
            className={`btn w-100 d-flex align-items-center justify-content-center gap-3 ${styles.submitBtn}`}
          >
            {isLoading ? "Resetting..." : "Reset Password"}
            {!isLoading && <FiArrowRight size={16} />}
          </button>
        </form>
      </div>
    </div>
  );
};

export default ResetPassword;
