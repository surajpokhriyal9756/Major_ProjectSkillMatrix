import React, { useState, useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "./AdminPage.css"; // Import the CSS file

const Home = () => {
  const [showPopup, setShowPopup] = useState(false);
  const [isImageLoaded, setIsImageLoaded] = useState(false);

  const handleImageLoad = () => {
    setIsImageLoaded(true);
  };
  useEffect(() => {
    // Set showPopup to true when the component mounts
    setShowPopup(true);
  }, []);

  const closePopup = () => {
    // Function to close the pop-up
    setShowPopup(false);
  };

  return (
    <div>
      <nav className="navbar navbar-expand-lg bg-body-tertiary custom-navbar">
        <div className="container-fluid ">
          <a
            className="navbar-brand d-lg font-weight-bold text-white me-2"
            href="http://localhost:3000/home-page"
          >
            <strong>SkillCorp Group </strong>{" "}
          </a>

          <div className="products-wrapper">
            <a
              className="d-lg font-weight-bold text-white  link products"
              href="http://localhost:3000/home-page"
            >
              <h6>Products</h6>

              <div className="products-popup">
                <div className="flex">
                  <div>
                    <img
                      className="me-1 "
                      src="https://assets-global.website-files.com/5d99fb0b6e7b4802b40d8ac0/61ddaad97ba2ba87237e14fb_Visualize%20Team%20Skills.png"
                      alt="logo"
                      height="100"
                    />
                    <h6>Visualised Team Skills</h6>
                  </div>
                  <div>
                    <img
                      className="me-1 "
                      src="https://assets-global.website-files.com/5d99fb0b6e7b4802b40d8ac0/61ddaade85fc796059cf58a3_Build%20Skills%20Based%20Teams.png"
                      alt="logo"
                      height="100"
                    />

                    <h6>Build Skill Based Teams</h6>
                  </div>
                </div>
              </div>
            </a>
          </div>
          <div className="products-wrapper">
            <a
              className=" d-lg font-weight-bold text-white link products"
              href="http://localhost:3000/home-page"
            >
              <h6>Service</h6>
              <div className="products-popup">
                <div className="flex">
                  <div>
                    <img
                      className="me-1 "
                      src="https://assets-global.website-files.com/5d99fb0b6e7b4802b40d8ac0/61ddaad97ba2ba87237e14fb_Visualize%20Team%20Skills.png"
                      alt="logo"
                      height="100"
                    />
                    <h6>Skills taxonomy and roles</h6>
                  </div>
                  <div>
                    <img
                      className="me-1 "
                      src="https://assets-global.website-files.com/5d99fb0b6e7b4802b40d8ac0/61ddaade85fc796059cf58a3_Build%20Skills%20Based%20Teams.png"
                      alt="logo"
                      height="100"
                    />

                    <h6>Employee Management</h6>
                  </div>
                </div>
              </div>
            </a>
          </div>
          <div className="products-wrapper">
            <a
              className=" d-lg font-weight-bold text-white  link products"
              href="http://localhost:3000/home-page"
            >
              <h6>Pricing</h6>
              <div className="products-popup">
                <div className="flex">
                  <div>
                    <img
                      className="me-1 "
                      src="https://assets-global.website-files.com/5d99fb0b6e7b4802b40d8ac0/61ddaad97ba2ba87237e14fb_Visualize%20Team%20Skills.png"
                      alt="logo"
                      height="100"
                    />
                    <h6>Affordable Prices-Free Version</h6>
                  </div>
                  <div>
                    <img
                      className="me-1 "
                      src="https://assets-global.website-files.com/5d99fb0b6e7b4802b40d8ac0/61ddaade85fc796059cf58a3_Build%20Skills%20Based%20Teams.png"
                      alt="logo"
                      height="100"
                    />

                    <h6>Premium</h6>
                  </div>
                </div>
              </div>
            </a>
          </div>

          <div className="products-wrapper">
            <a
              className="d-lg font-weight-bold text-white  link products"
              href="http://localhost:3000/home-page"
            >
              <h6>About</h6>

              <div className="products-popup">
                <div class="menu">
                  <p>ABOUT US</p>
                  <p>METHODOLOGY</p>
                  <p>CONTACT</p>
                  <p>CAREERS</p>
                  <p>PARTNERS</p>
                  <p>NEWS</p>
                </div>
              </div>
            </a>
          </div>

          <a
            className="navbar-brand d-lg font-weight-bold text-white me-2"
            href="http://localhost:3000/"
          >
            <div className="login">
              <h6>Log In</h6>
            </div>
          </a>
        </div>
      </nav>
      <div className="vertical-space"></div>{" "}
      <div className="vertical-space"></div>
      <div className="container-fluid">
        <div className="row">
          <div className="col">
            <div className="jumbotron mt-5">
              <h1 className="display-4">
                Optimize Your Organization's Skills with SkillCorp
              </h1>
              <p className="lead">
                SkillCorp empowers organizations to optimize their workforce by
                strategically managing skillsets and fostering high-performance
                teams.
              </p>
              <p className="lead-1">
                SkillCorp is a skills management platform that helps you focus
                on what matters most, people.
              </p>
            </div>
          </div>
          <div className="col img-main">
            <img
              src="https://assets-global.website-files.com/5d99fb0b6e7b4802b40d8ac0/61dea928389b4e0b4cbb18de_interactive%20org%20chart%20(1).png"
              alt=""
              height="450"
              className={`image-transition ${
                isImageLoaded ? "image-loaded" : ""
              }`}
              onLoad={handleImageLoad}
            />
          </div>
        </div>

        <div className="row">
          <div className="col img-main">
            <img
              src="https://assets-global.website-files.com/5d99fb0b6e7b4802b40d8ac0/61dea3d3e5669c81c1ea7693_self-propelled%20teams.png"
              alt=""
              height="250"
              className={`image-transition ${
                isImageLoaded ? "image-loaded" : ""
              }`}
              onLoad={handleImageLoad}
            />
            <video
              autoPlay
              muted
              loop
              style={{ height: "250px" }}
              className={`image-transition ${
                isImageLoaded ? "image-loaded" : ""
              }`}
              onLoad={handleImageLoad}
            >
              <source
                src="https://assets-global.website-files.com/5d99fb0b6e7b4802b40d8ac0/5ea05d01bc13efed8df3a1ee_MuchSkills%20JobFocus%20updated-transcode.mp4"
                type="video/mp4"
              />
              Your browser does not support the video tag.
            </video>
          </div>
          <div className="col">
            <div className="jumbotron mt-5">
              <h1 className="display-4">
                Unlock Your Organization's Potential with SkillCorp
              </h1>
              <p className="lead">
                SkillCorp is dedicated to unlocking the full potential of your
                organization by strategically managing skillsets and cultivating
                high-performance teams.
              </p>
              <p className="lead-1">
                As a comprehensive skills management platform, SkillCorp
                prioritizes what truly matters: your people.
              </p>
            </div>
          </div>
        </div>
        <div className="vertical-space"></div>
        <div className="row">
          <div className="col">
            <div className="jumbotron mt-5">
              <h1 className="display-4">
                Maximize Your Company's Skill Potential with SkillCorp
              </h1>
              <p className="lead">
                SkillCorp enables businesses to enhance their workforce
                efficiency by strategically overseeing skillsets and cultivating
                high-performance teams.
              </p>
              <p className="lead-1">
                SkillCorp serves as a skill management platform, placing
                emphasis on what truly drives success: your people.
              </p>
            </div>
          </div>
          <div className="col img-main right-img">
            <img
              src="https://assets-global.website-files.com/5d99fb0b6e7b4802b40d8ac0/61de0d65ed839718ab6e0dfe_Search%20Skills.png"
              alt=""
              height="450"
              className={`image-transition ${
                isImageLoaded ? "image-loaded" : ""
              }`}
              onLoad={handleImageLoad}
            />
          </div>
        </div>
        <div className="vertical-space"></div>
        <div className="row">
          <div className="col img-main">
            <img
              src="https://assets-global.website-files.com/5d99fb0b6e7b4802b40d8ac0/61deab0b80c4847bb3729690_agile%20teams.png"
              alt=""
              height="250"
              className={`image-transition ${
                isImageLoaded ? "image-loaded" : ""
              }`}
              onLoad={handleImageLoad}
            />
            <video
              autoPlay
              muted
              loop
              style={{ height: "250px" }}
              className={`image-transition ${
                isImageLoaded ? "image-loaded" : ""
              }`}
              onLoad={handleImageLoad}
            >
              <source
                src="https://assets-global.website-files.com/5d99fb0b6e7b4802b40d8ac0/5ea0379d19bbdc17dccbb43d_Software%20MuchSkills-transcode.mp4"
                type="video/mp4"
              />
              Your browser does not support the video tag.
            </video>
          </div>
          <div className="col">
            <div className="jumbotron mt-5">
              <h1 className="display-4">
                Unlock Your Organization's Potential with SkillCorp
              </h1>
              <p className="lead">
                SkillCorp is dedicated to unlocking the full potential of your
                organization by strategically managing skillsets and cultivating
                high-performance teams.
              </p>
              <p className="lead-1">
                As a comprehensive skills management platform, SkillCorp
                prioritizes what truly matters: your people.
              </p>
            </div>
          </div>
        </div>
      </div>
      <div className="vertical-space"></div>
      {showPopup && (
        <div className="popup-container bottom-left">
          <div className="popup-content">
            <button className="close-button" onClick={closePopup}>
              X
            </button>
            <img
              src="https://assets-global.website-files.com/5d99fb0b6e7b4802b40d8ac0/65423e192804a947ff554bc5_webinar.png"
              alt="logo"
              height="100"
            />
            <h6>
              Are you struggling to identify and address skill gaps within your
              team? Don't worry, we've got you covered!{" "}
            </h6>
            <p>
              Get our Service where we'll dive deep into the process of skill
              gap analysis and provide you with actionable strategies to bridge
              those gaps effectively.
            </p>
            <a
              className="navbar-brand d-lg font-weight-bold text-white me-2"
              href="http://localhost:3000/"
            >
              <button>Login Now...</button>
            </a>
          </div>
        </div>
      )}
      {/* /\Footer */}
      <footer className="footer  navbar-expand-lg bg-body-tertiary custom-navbar">
        <div className="container-fluid">
          <span className="text-muted">@Employee_Skill_Matrix</span>
        </div>
      </footer>
    </div>
  );
};

export default Home;
