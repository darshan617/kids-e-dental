import Image from "next/image";
import React from "react";
import drMukulJain from "@/assets/images/dr-mukul-jain.png";
import prithviKhakar from "@/assets/images/prithvi-khakar.png";
import nikhilKitawat from "@/assets/images/nikhil-kitawat.png";
import styles from "@/components/about/about-banner/AboutBanner.module.css";

const leadershipData = [
  {
    id: 1,
    name: "Dr. Mukul Jain",
    designation: "Founder, CEO & Partner, Kids-e-Dental LLP",
    image: drMukulJain,
    bio: [
      "Lorem ipsum, dolor sit amet consectetur adipisicing elit. Ut animi repellendus, placeat illum autem amet debitis consectetur perspiciatis quis, fuga enim itaque sapiente laborum dignissimos consequatur dolore praesentium vero minus.",
      "Optio eius dolore commodi distinctio autem qui, hic, enim magni quasi deleniti quia, aut vero voluptas totam ab explicabo molestias repellat. Dolor quis excepturi culpa? Quam, perspiciatis. Incidunt, quo laudantium.",
      "Minus blanditiis odit non ea enim mollitia ullam natus commodi saepe ducimus dolorum inventore id consequuntur sapiente magni voluptatum numquam voluptates, voluptate autem molestiae accusamus assumenda temporibus modi. Animi, harum! Deserunt maiores facere nisi iste provident vero, omnis ducimus velit, consectetur inventore aperiam quae sequi repellendus officia recusandae vitae temporibus nobis. Molestiae harum ut, magni id accusamus sint a rerum?",
    ],
  },
  {
    id: 2,
    name: "Mr. Prithvi Khakar",
    designation: "CEO & Partner, Kids-e-Dental LLP",
    image: prithviKhakar,
    bio: [
      "Lorem ipsum, dolor sit amet consectetur adipisicing elit. Ut animi repellendus, placeat illum autem amet debitis consectetur perspiciatis quis, fuga enim itaque sapiente laborum dignissimos consequatur dolore praesentium vero minus.",
      "Optio eius dolore commodi distinctio autem qui, hic, enim magni quasi deleniti quia, aut vero voluptas totam ab explicabo molestias repellat. Dolor quis excepturi culpa? Quam, perspiciatis. Incidunt, quo laudantium.",
      "Minus blanditiis odit non ea enim mollitia ullam natus commodi saepe ducimus dolorum inventore id consequuntur sapiente magni voluptatum numquam voluptates, voluptate autem molestiae accusamus assumenda temporibus modi. Animi, harum! Deserunt maiores facere nisi iste provident vero, omnis ducimus velit, consectetur inventore aperiam quae sequi repellendus officia recusandae vitae temporibus nobis. Molestiae harum ut, magni id accusamus sint a rerum?",
    ],
  },
  {
    id: 3,
    name: "Mr. Nikhil Kitawat",
    designation: "Quality Control Manager",
    image: nikhilKitawat,
    bio: [
      "Lorem ipsum, dolor sit amet consectetur adipisicing elit. Ut animi repellendus, placeat illum autem amet debitis consectetur perspiciatis quis, fuga enim itaque sapiente laborum dignissimos consequatur dolore praesentium vero minus.",
      "Optio eius dolore commodi distinctio autem qui, hic, enim magni quasi deleniti quia, aut vero voluptas totam ab explicabo molestias repellat. Dolor quis excepturi culpa? Quam, perspiciatis. Incidunt, quo laudantium.",
      "Minus blanditiis odit non ea enim mollitia ullam natus commodi saepe ducimus dolorum inventore id consequuntur sapiente magni voluptatum numquam voluptates, voluptate autem molestiae accusamus assumenda temporibus modi. Animi, harum! Deserunt maiores facere nisi iste provident vero, omnis ducimus velit, consectetur inventore aperiam quae sequi repellendus officia recusandae vitae temporibus nobis. Molestiae harum ut, magni id accusamus sint a rerum?",
    ],
  },
];

const Leadership = () => {
  return (
    <section className="sitePadding py-5" style={{ background: "#f1f1f1" }}>
      <div className="continer-fluid text-center vstack align-items-center staggerList mb-4">
        <h3 className="sectionHead_sm animateThis slideTop">Our Leadership</h3>
        <h2 className="sectionHead fw-bold mb-3 animateThis slideTop">
          CEO's Corner
        </h2>
        <p className="animateThis fadeIn">
          A glimpse into the vision, journey, and leadership behind
          Kids-e-Dental.
        </p>
      </div>

      <div className="container-fluid mb-4">
        <div
          className="vstack gap-5 teamList mx-auto"
          style={{ maxWidth: "1400px" }}
        >
          {leadershipData.map((leader) => (
            <div
              key={leader.id}
              className={`${styles.teamBox} px-lg-5 px-4 d-flex flex-wrap justify-content-center gap-lg-5 gap-4 rounded-5 animateThis slideTop`}
            >
              <div className="col-xl-auto col-md-4 mt-4 bgPrimary">
                <div className={`${styles.teamImg} mx-auto`}>
                  <Image
                    src={leader.image}
                    alt=""
                    className={`w-100 ${styles.teamImage}`}
                  />
                </div>
              </div>
              <div className="col-md col-12 py-md-5 px-xl-5">
                <div className={`${styles.teamProfile} mb-4`}>
                  <h3 className="teamName fw-bold">{leader.name}</h3>
                  <div className="teamDesg">{leader.designation}</div>
                </div>
                <div className="teamBio">
                  {leader.bio.map((paragraph, index) => (
                    <p key={index}>{paragraph}</p>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Leadership;
