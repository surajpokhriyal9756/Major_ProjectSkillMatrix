import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useLocation } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "./AdminPage.css"; // Import the CSS file
// import axios from 'axios';

const AdminPage = ({ check, setCheck }) => {

  const location = useLocation();
  const navigate = useNavigate();
  const keyMappings = {
    firstName: "First Name",
    lastName: "Last Name",
    email: "Email",
    role: "Role",
    designation: "Designation",
    dateOfJoining: "Date of Joining",
    phoneNumber: "Phone Number",
    emp_id: "Employee ID",
  };

  const [activeLink, setActiveLink] = useState("Dashboard");
  const userData = location.state.userData;
  // console.log(userData);
  // Example function to handle navigation

  useEffect(() => {
    if (!check) {
      // Check if the user is authenticated
      const isAuthenticated =
        sessionStorage.getItem("token") || localStorage.getItem("token");
      if (!isAuthenticated) {
        // If not authenticated, navigate to the login page
        navigate("/");
      }
    }
    setActiveLink("Dashboard");
  }, [check, navigate]);

  const handleLinkClick = (link) => {
    setActiveLink(link);
  };
  const passRoute = (userData) => {
    // Navigate to the skill-page route with userData
    navigate("/skill-page", { state: { userData: userData } });
  };
  const passRoute1 = (userData) => {
    // Navigate to the skill-page route with userData
    navigate("/project-page", { state: { userData: userData } });
  };
  const passRoute2 = (userData) => {
    // Navigate to the skill-page route with userData

    navigate("/certificate-page", { state: { userData: userData } });
  };
  const passRoute3 = (userData) => {
    // Navigate to the skill-page route with userData

    navigate("/admin-page", { state: { userData: userData } });
  };


  const passRouteAdmin = (userData) => {
    // Navigate to the skill-page route with userData
    setCheck(true);
    navigate("/admin-page", { state: { userData: userData } });
  };
  const passRouteSignup = (userData) => {
    // Navigate to the skill-page route with userData

    navigate("/signup", { state: { userData: userData } });
  };
  const passRouteManage = (userData) => {
    // Navigate to the skill-page route with userData

    navigate("/user-management", { state: { userData: userData } });
  };

  const handleLogout = () => {
    setCheck(false);
    // Clear the token from sessionStorage
    sessionStorage.removeItem("token");
    // Clear the token from localStorage
    localStorage.removeItem("token");
    // Navigate to logout page or home page
    navigate("/");
  };

  return (
    <div>
      <nav className="navbar navbar-expand-lg bg-body-tertiary custom-navbar">
        <div className="container-fluid ">
          <a
            className="navbar-brand d-lg font-weight-bold text-white me-2"
            onClick={(event) => {
              event.preventDefault(); // Prevent the default behavior of the link
              passRouteAdmin(userData); // Pass userData to the passRoute function
            }}
            href="http://localhost:3000/admin-page"
          >
            <strong>SkillCorp Group</strong>
          </a>

          <a
            className=" d-lg font-weight-bold text-white me-2 link"
            href="http://localhost:3000/skill-page"
            onClick={() => {
              handleLinkClick("Skills");
              passRoute(userData); // Pass userData to the passRoute function
            }}
          >
            <h6>Skills</h6>
          </a>
          <a
            className=" d-lg font-weight-bold text-white me-2 link"
            href="http://localhost:3000/certificate-page"
            onClick={() => {
              handleLinkClick("Certifications");
              passRoute2(userData); // Pass userData to the passRoute function
            }}
          >
            <h6>Certifications</h6>
          </a>

          <a
            className=" d-lg font-weight-bold text-white me-2 link"
            href="http://localhost:3000/project-page"
            onClick={() => {
              handleLinkClick("Projects");
              passRoute1(userData); // Pass userData to the passRoute function
            }}
          >
            <h6>Projects</h6>
          </a>

          <a
            className="navbar-brand d-lg font-weight-bold text-white me-2"
            href="http://localhost:3000/"
            onClick={handleLogout}
          >
            <img
              className="me-1 "
              src="https://static-00.iconduck.com/assets.00/logout-icon-2048x2048-libuexip.png"
              alt="logo"
              height="25"
            />
            Log-out
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
                    href="http://localhost:3000/admin-page"
                    onClick={() => {
                      handleLinkClick("Dashboard");
                      passRoute3(userData);
                    }}
                  >
                    Dashboard
                  </a>
                </li>

                <li className="nav-item">
                  <a
                    className={`nav-link ${
                      activeLink === "User_Management" ? "active" : ""
                    } text-white`}
                    href="http://localhost:3000/user-management"
                    onClick={() => {
                      handleLinkClick("User_Management");
                      passRouteManage(userData);
                    }}
                  >
                    User Management
                  </a>
                </li>
                <li className="nav-item">
                  <a
                    className={`nav-link ${
                      activeLink === "Approver_Management" ? "active" : ""
                    } text-white`}
                    href="http://localhost:3000/signup"
                    onClick={() => {
                      handleLinkClick("Approver_Management");
                      passRouteSignup(userData);
                    }}
                  >
                    Approver/User Creation
                  </a>
                </li>
                <li></li>
              </ul>
            </div>
          </nav>

          <div className="container mt-4 example-container">
            <div className="container">
              <h2>Admin Details</h2>
              <div className="row">
                {Object.keys(userData).map((key) => (
                  <div className="col-md-6" key={key}>
                    <div className="card mb-3 test">
                      <div className="card-body ">
                        <h5 className="card-title ">{keyMappings[key]}</h5>
                        <p className="card-text">
                          {key === "dateOfJoining"
                            ? new Date(userData[key]).toLocaleDateString()
                            : userData[key]}
                        </p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

    

      <footer className="footer  navbar-expand-lg bg-body-tertiary custom-navbar">
        <div className="container-fluid">
          <span className="text-muted">@Employee_Skill_Matrix</span>
        </div>
      </footer>
    </div>
  );
};

export default AdminPage;
