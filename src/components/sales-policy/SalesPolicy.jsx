import React from "react";
import styles from "@/components/privacy-policy/PrivacyPolicy.module.css";
import Link from "next/link";

const SalesPolicy = () => {
  return (
    <>
      <section className="py-5 sitePadding bgPrimary">
        <div className="container-fluid vstack align-items-center gap-2 animateThis fadeIn">
          <h1 className="sectionHead fw-bold mb-0"> Sales Policy</h1>
        </div>
      </section>

      <section className="sitePadding py-sm-5 py-4">
        <div className="container-fluid">
          <div
            className={`${styles.generalContent} w-100 mx-auto`}
            style={{ maxWidth: "1200px" }}
          >
            <h2>Ordering</h2>
            <p>
              The Users may place the order for purchasing such products
              displayed for sale on the Website and this order of the User shall
              be processed by Kids-e-Dental LLP and its affiliates as per its
              internal rules, policies and practice, including but not limited
              to what is stated along with the display of the products on the
              Website, as visible to the User. The User agrees and accepts that
              in order to successfully place an order through this Website,
              he/she is required to follow all the steps as detailed along with
              the display of the products on the Website which shall also
              include
            </p>
            <ul className={styles.roman}>
              <li>
                Using the required mode of payment facility i.e. 'credit/debit
                card' or 'net-banking'
              </li>
              <li>
                Submitting the correct personal details viz. full description of
                the address wherein the products shall be delivered, contact
                numbers, e-mail address etc.
              </li>
            </ul>
            <p>
              The User agrees that any authorized representative of
              Kids-e-Dental LLP and its affiliates or its distributor&nbsp; who
              has listed the said products (ordered by the User) on the Website
              may contact via telephone the User prior to the delivery of the
              product for the purpose of confirmation of the address or
              otherwise. The User agrees to attend to such phone calls and
              co-operate with such individuals with respect to such delivery.
            </p>

            <h2>Pricing</h2>
            <p>
              The price of the products listed on the Website and as displayed
              on the Website, along with the replacement and refund policies,
              modes of payment available etc., have been solely and absolutely
              decided and put up by Kids-e-Dental LLP and its affiliates and the
              same are absolute and non-negotiable.
            </p>

            <h2>Delivery</h2>
            <p>
              We deliver the order to PAN India within 1 to 20 working days and
              for international order 4 to 90 working days
            </p>

            <h2>Cancellation</h2>
            <p>
              The Users may place their orders for cancellation of the products
              within 7 days from the date of placing the order, by following the
              instructions as have been stated visibly along with the display of
              the products on the Website or by contacting the helpdesk&nbsp; at
              the e-mail id: enquiry@kids-e-dental.com.
            </p>
            <p>
              Pursuant to the 'Ordering' clause hereinabove, if the User is not
              present to accept the delivery of the products at the specified
              address stated while ordering and/or fails to respond to the
              telephone calls made by such authorized representative prior to
              the delivery, shall be deemed by Kids-e-Dental LLP and its
              affiliates to be the cancellation of the of the order by the User.
            </p>

            <h2>Replacement</h2>
            <p>
              After completion of the delivery of the products, subject to the
              necessary provisions on the Website specified with respect to such
              products individually and particularly, the User may apply through
              the Website for the replacement of such products (provided they
              are in good working condition) with similar products by providing
              the reason(s) for the same, within such number of days as
              specified with respect to such products on the Website. Upon
              receiving such application for replacement, Kids-e-Dental LLP and
              its affiliates shall arrange for such facilities for replacing the
              products accordingly within 7 days, through its authorized
              representative. In the event any further payment required to be
              made on account of delivery charges or replacement benefit
              charges, then the same shall be payable by the User to
              Kids-e-Dental LLP and its affiliates through such authorized
              representative.
            </p>

            <h2>Refund</h2>
            <p>
              Upon delivery of damaged products or wrongful delivery of
              products, the User may return the products by contacting
              Kids-e-Dental LLP and its affiliates/ the distributor of the
              products and obtaining the refund of the entire consideration or
              part of the consideration paid by the User for such products, as
              per the refund facility made available on such products, if any,
              on case to case basis.
            </p>

            <h2>Sales Specification</h2>
            <p>
              Through this website - https://Kidsedental.com/, Kids-e-Dental LLP
              (“seller”) is engaged in marketing and selling of dental products
              and equipments, via online/e-commerce medium and via its
              distribution channels. The website also disseminates information
              relevant to the said products and equipments.
            </p>
            <p>
              KIDS-E-DENTAL LLP DOES NOT WARRANT SPECIFICATIONS, TOLERANCES,
              SUITABILITY, MERCHANTABILITY, FITNESS OR ANY OTHER ASPECT OF ANY
              PRODUCT BEING SOLD ON THIS WEBSITE. In the event of product defect
              or failure, Kids-e-Dental LLP liability shall not exceed the cost
              of the product when purchased from Kids-e-Dental LLP, by a user of
              this website/customer. It should be noted that “labor” or other
              incidental costs, are never warranted by Kids-e-Dental LLP or its
              manufacturers, in the event of product failure. IN NO CASE SHALL
              KIDS-E-DENTAL LLP BE LIABLE FOR ANY INCIDENTAL OR CONSEQUENTIAL
              DAMAGES, INCLUDING, BUT NOT LIMITED TO LOSS OF PROFITS, EVENT IF
              IT HAS BEEN ADVISED OF THE POSSIBILITY THEREOF.
            </p>
          </div>
        </div>
      </section>
    </>
  );
};

export default SalesPolicy;
