import Image from "next/image";
import React from "react";
import distributorImg from "@/assets/images/distributorImg.png";
const BecomeDistributor = () => {
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
                    {" "}
                    <strong>
                      Join us in our mission to make dental care safe efficient
                      and pleasant.
                    </strong>{" "}
                  </p>
                </div>
                <div className="col-auto">
                  <Image
                    src={distributorImg}
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
                >
                  <div className="col-12 mt-0">
                    <h4 className="sectionHead_sm mb-0 lh-1">
                      Send Us An Enquiry
                    </h4>
                  </div>
                  <div className="col-12">
                    <label className="form-label">Company Name *</label>
                    <input type="text" className="form-control" />
                    <span className="errorLabel">This field is required</span>
                  </div>
                  <div className="col-12">
                    <label className="form-label">Contact Person *</label>
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
                    <label className="form-label">Country/City *</label>
                    <input type="text" className="form-control" />
                    <span className="errorLabel">This field is required</span>
                  </div>
                  {/* <!-- <div className="col-12">
                              <label className="form-label">Upload Documents</label>
                              <div className="fileUploadContainer hstack justify-content-between">
                                 <input type="file" id="real-file-input" hidden />
                                 <span id="file-name-text" className="filenametext">No file chosen</span>
                                 <button type="button" className="ctaBtn white" id="custom-upload-button">Choose File</button>
                               </div>
                           </div> --> */}
                  <div className="col-12">
                    <label className="form-label">Message</label>
                    <textarea className="form-control" rows="2"></textarea>
                    <span className="errorLabel">This field is required</span>
                  </div>
                  <div className="col-12 pt-3 text-center">
                    <button className="ctaBtn arw" style={{ width: "150px" }}>
                      Submit
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
