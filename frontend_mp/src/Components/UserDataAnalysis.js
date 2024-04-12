import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useLocation } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "./AdminPage.css"; // Import the CSS file
// import axios from "axios";

const UserDetails = ({ setCheck, setCheckApprover, setCheckUser }) => {
  const location = useLocation();
  const navigate = useNavigate();

  const userData = location.state.userData;

  const [activeLink, setActiveLink] = useState("Dashboard");

  //   console.log(userData);
  // Example function to handle navigation

  useEffect(() => {
    // Set "Dashboard" as active by default when component mounts
    setActiveLink("Dashboard");
  }, []);
  useEffect(() => {
    setCheck(true);
    setCheckApprover(true);
    setCheckUser(true);
  }, [setCheck, setCheckApprover, setCheckUser]);

  const handleLinkClick = (link) => {
    setActiveLink(link);
  };
  const passRoute2 = (userData) => {
    // Navigate to the skill-page route with userData

    navigate("/user-management", { state: { userData: userData } });
  };

  return (
    <div>
      <nav className="navbar navbar-expand-lg bg-body-tertiary custom-navbar">
        <div className="container-fluid ">
          <a
            className="navbar-brand d-lg font-weight-bold text-white me-2"
            href="http://localhost:3000/user-management"
            onClick={(event) => {
              event.preventDefault(); // Prevent the default behavior of the link
              passRoute2(userData); // Call passRoute3 function with userData
            }}
          >
            <img
              className="me-1"
              src="https://www.logolynx.com/images/logolynx/69/691eca7da08ed4d76f338dcb058f4242.png"
              alt="logo"
              height="35"
            />
          </a>
        </div>
      </nav>

      <div className="container-fluid ">
        <div className="row">
          <nav className="col-md-3 col-lg-2 d-md-block bg-light sidebar custom-navbar">
            <div className="position-sticky" style={{ height: "100vh" }}>
              <ul className="nav flex-column">
                <li className="nav-item">
                  <a
                    className={`nav-link ${
                      activeLink === "Dashboard" ? "active" : ""
                    } text-white`}
                    href="http://localhost:3000/user-data-analysis"
                    onClick={() => {
                      handleLinkClick("Dashboard");
                    }}
                  >
                    User Data Analysis
                  </a>
                </li>
              </ul>
            </div>
          </nav>

          <div className="container mt-4 example-container">
            <h2>Dashboard</h2>
            <iframe
              title="SkillCorp_BI"
              width="1140"
              height="541.25"
              src="https://app.powerbi.com/reportEmbed?reportId=fd1b4277-425a-4c14-8a40-8b885f8dea37&autoAuth=true&ctid=2800c0a0-70e9-49be-8733-faeaa6aced99"
              frameborder="0"
              allowFullScreen="true"
            ></iframe>
          </div>
        </div>
      </div>

      <footer className="footer  navbar-expand-lg bg-body-tertiary custom-navbar">
        <div className="container-fluid">
          <span className="text-muted">@SkillCorp_Group</span>
        </div>
      </footer>
    </div>
  );
};

export default UserDetails;
