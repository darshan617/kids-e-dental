import React from "react";
import styles from '@/components/privacy-policy/PrivacyPolicy.module.css'
import Link from "next/link";

const SalesPolicy = () => {
  return (
    <div className="sitePadding">
      <div className={`${styles.breadcrumb}`}>
        <div style={{ margin: "16px 0" }}>
          <ul>
            <li>
              <Link href="/" prefetch={true}>
                Home
              </Link>
            </li>

            <li style={{ margin: "0 8px", color: "#6c757d" }}>/</li>

            <li>
              <Link href="/privacy-policy" prefetch={true}>
                Terms And Conditions
              </Link>
            </li>
          </ul>
        </div>
      </div>

      <div className={`${styles.privacyPolicyContainer}`}>
        <div className={`${styles.privacyPolicyHeading} text-center`}>
          <h1>Terms And Conditions</h1>
        </div>

        <div className={`${styles.privacyPolicyContent}`}>
          <div className={`${styles.privacyPolicyContentItem}`}>
            <ul>
              <li>
                <p>
                  We respect your privacy and are committed to protecting your
                  personal information when you use our website.
                </p>
              </li>

              <li>
                <p>
                  Any personal information you provide may be used to improve
                  your browsing experience and respond to your inquiries.
                </p>
              </li>

              <li>
                <p>
                  We take reasonable measures to protect your information
                  against unauthorized access, alteration, or disclosure.
                </p>
              </li>

              <li>
                <p>
                  Our website may use cookies to improve functionality and
                  provide a better user experience.
                </p>
              </li>

              <li>
                <p>
                  If you have any questions about this Privacy Policy, please
                  contact us through our website.
                </p>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SalesPolicy;
