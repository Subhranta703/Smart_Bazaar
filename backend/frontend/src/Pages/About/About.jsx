import React from "react";
import Footer from "../../Components/Footer/Footer";
import Header from "../../Components/Header/Header";
import "./About.css";
// import MetaData from "../MetaData";

const About = () => {
  document.title = "About Us";
  return (
    <>
      <Header />

      <div className="about-section-container">
        <h1 className="Heading">
          About <span>Us</span>
        </h1>
        {/* <MetaData title={'About Us'} /> */}
        <div className="about-section-box">
          <div>
            <div>
              <img
                style={{
                  width: "20rem",
                  height: "20rem",
                  margin: "2rem 0",
                  borderRadius: "100%",
                }}
                // src="https://media.licdn.com/dms/image/v2/D5603AQGbeRJ8DA3BBA/profile-displayphoto-shrink_400_400/profile-displayphoto-shrink_400_400/0/1676695469014?e=1738800000&v=beta&t=rdwVTrAEqkgbsXZipX8ytsRWM7uIFDQLbR-8LtF0Z6Q"
                alt="Founder"
              />
              <h1>Subhranta kumar Nayak</h1>
              <button
                onClick={() =>
                  window.open("https://subhranta-portfolio.vercel.app/", "_blank")
                }
              >
                Visit Website
              </button>
              <br />
              <p>
                This is a sample wesbite made by @subhranta .
                <br />
                Only for Ecommece platfrom
              </p>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default About;
