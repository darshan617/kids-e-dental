"use client";
import Image from "next/image";
import React, { useState } from "react";
import distributorImg from "@/assets/images/home/distributorImg.png";
import { useBecomeDistributorMutation } from "@/redux/apis/distributor";
import { useToast } from "@/custom-hooks/toast/ToastProvider";

const initialForm = {
  companyName: "",
  contactPerson: "",
  email: "",
  mobileNo: "",
  country: "",
  message: "",
};

const BecomeDistributor = () => {
  const { showToast } = useToast();
  const [becomeDistributor, { isLoading }] = useBecomeDistributorMutation();
  const [formData, setFormData] = useState(initialForm);
  const [errors, setErrors] = useState({});
  const [submitted, setSubmitted] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (errors[name]) setErrors((prev) => ({ ...prev, [name]: "" }));
    if (submitted) setSubmitted(false);
  };

  const validate = () => {
    const newErrors = {};
    if (!formData.companyName.trim())
      newErrors.companyName = "This field is required";
    if (!formData.contactPerson.trim())
      newErrors.contactPerson = "This field is required";
    if (!formData.email.trim()) newErrors.email = "This field is required";
    else if (!/^\S+@\S+\.\S+$/.test(formData.email))
      newErrors.email = "Enter a valid email";
    if (!formData.mobileNo.trim())
      newErrors.mobileNo = "This field is required";
    else if (!/^[0-9+\-\s]{7,15}$/.test(formData.mobileNo))
      newErrors.mobileNo = "Enter a valid mobile number";
    if (!formData.country.trim()) newErrors.country = "This field is required";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validate()) return;

    try {
      const payload = {
        company_name: formData.companyName.trim(),
        contact_person: formData.contactPerson.trim(),
        email: formData.email.trim(),
        mobile_no: formData.mobileNo.trim(),
        country_city: formData.country.trim(),
        message: formData.message.trim(),
      };
      const response = await becomeDistributor(payload).unwrap();
      showToast(
        response?.message || "Enquiry submitted successfully",
        "success",
      );
      setFormData({ ...initialForm });
      setErrors({});
      setSubmitted(true);
    } catch (err) {
      showToast(
        err?.data?.message || "Something went wrong. Please try again.",
        "error",
      );
    }
  };

  return (
    <>
      <section className="py-5 sitePadding bgPrimary">
        <div className="container-fluid vstack align-items-center gap-2 animateThis fadeIn">
          <h1 className="sectionHead fw-bold mb-0"> Become a Distributor </h1>
          <p className="mb-0">
            Driven by growth and innovation, we deliver exceptional value on a
            global scale.
          </p>
        </div>
      </section>

      <section className="sitePadding py-5">
        <div className="container-fluid">
          <div className="row justify-content-center gx-xl-5 gy-5">
            <div className="col-xl-5 col-lg-6">
              <div className="h-100 vstack">
                <div className="col-auto mb-auto pt-lg-4 animateThis slideRight">
                  <p>
                    We are constantly expanding our global network and are
                    always on the lookout for new partnerships. If you are
                    interested in becoming a distributor for Kids-e-Dental&reg;
                    products, we invite you to sign up using the enquiry form.
                  </p>
                  <p>
                    As a distributor, you will have access to our extensive
                    product line, receive training and support, and benefit from
                    our reputation for excellence in the dental industry.
                  </p>
                  <p>
                    <strong>
                      Join us in our mission to make dental care safe efficient
                      and pleasant.
                    </strong>
                  </p>
                </div>
                <div className="col-auto">
                  <Image
                    src={distributorImg}
                    alt="Become a distributor"
                    className="mw-100 mx-auto d-block animateThis slideTop h-100"
                  />
                </div>
              </div>
            </div>

            <div className="col-xl-4 col-lg-6">
              <div className="p-2 bg-white rounded-4 shadow-lg animateThis fadeGrow">
                <form
                  className="row g-3 p-sm-4 p-3 m-0 rounded-3 formFormat"
                  style={{ border: "1px solid #aaa" }}
                  onSubmit={handleSubmit}
                  noValidate
                >
                  <div className="col-12 mt-0">
                    <h4 className="sectionHead_sm mb-0 lh-1">
                      Send Us An Enquiry
                    </h4>
                  </div>

                  <div className="col-12">
                    <label className="form-label">Company Name *</label>
                    <input
                      type="text"
                      name="companyName"
                      className="form-control"
                      value={formData.companyName}
                      onChange={handleChange}
                    />
                    {errors.companyName && (
                      <span className="errorLabel d-block">
                        {errors.companyName}
                      </span>
                    )}
                  </div>

                  <div className="col-12">
                    <label className="form-label">Contact Person *</label>
                    <input
                      type="text"
                      name="contactPerson"
                      className="form-control"
                      value={formData.contactPerson}
                      onChange={handleChange}
                    />
                    {errors.contactPerson && (
                      <span className="errorLabel d-block">
                        {errors.contactPerson}
                      </span>
                    )}
                  </div>

                  <div className="col-12">
                    <label className="form-label">Email *</label>
                    <input
                      type="email"
                      name="email"
                      className="form-control"
                      value={formData.email}
                      onChange={handleChange}
                    />
                    {errors.email && (
                      <span className="errorLabel d-block">{errors.email}</span>
                    )}
                  </div>

                  <div className="col-12">
                    <label className="form-label">Mobile No.*</label>
                    <input
                      type="text"
                      name="mobileNo"
                      className="form-control"
                      value={formData.mobileNo}
                      onChange={handleChange}
                    />
                    {errors.mobileNo && (
                      <span className="errorLabel d-block">
                        {errors.mobileNo}
                      </span>
                    )}
                  </div>

                  <div className="col-12">
                    <label className="form-label">Country/City *</label>
                    <input
                      type="text"
                      name="country"
                      className="form-control"
                      value={formData.country}
                      onChange={handleChange}
                    />
                    {errors.country && (
                      <span className="errorLabel d-block">
                        {errors.country}
                      </span>
                    )}
                  </div>

                  <div className="col-12">
                    <label className="form-label">Message</label>
                    <textarea
                      name="message"
                      className="form-control"
                      rows="2"
                      value={formData.message}
                      onChange={handleChange}
                    ></textarea>
                  </div>

                  <div className="col-12 pt-3 text-center">
                    <button
                      type="submit"
                      className="ctaBtn arw"
                      style={{ width: "150px" }}
                      disabled={isLoading}
                    >
                      {isLoading ? "Submitting..." : "Submit"}
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default BecomeDistributor;
