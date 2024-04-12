import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useLocation } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "./AdminPage.css"; // Import the CSS file

const UserPage = ({ checkUser, setCheckUser }) => {
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
    if (!checkUser) {
      // Check if the user is authenticated
      const isAuthenticated =
        sessionStorage.getItem("token") || localStorage.getItem("token");
      if (!isAuthenticated) {
        // If not authenticated, navigate to the login page
        navigate("/");
      }
    }
    setActiveLink("Dashboard");
  }, [checkUser, navigate]);

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

  const passRouteDash = (userData) => {
    // Navigate to the skill-page route with userData
    setCheckUser(false);
    navigate("/user-page", { state: { userData: userData } });
  };
  const handleLogout = () => {
    setCheckUser(false);
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
            href="http://localhost:3000/user-page"
            onClick={(e) => {
              e.preventDefault();
              passRouteDash(userData); // Pass userData to the passRoute function
            }}
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
            <strong>Skills</strong>
          </a>
          <a
            className=" d-lg font-weight-bold text-white me-2 link"
            href="http://localhost:3000/certificate-page"
            onClick={() => {
              handleLinkClick("Certifications");
              passRoute2(userData); // Pass userData to the passRoute function
            }}
          >
            <strong>Certifications</strong>
          </a>

          <a
            className=" d-lg font-weight-bold text-white me-2 link"
            href="http://localhost:3000/project-page"
            onClick={() => {
              handleLinkClick("Projects");
              passRoute1(userData); // Pass userData to the passRoute function
            }}
          >
            <strong>Projects</strong>
          </a>

          <a
            className="navbar-brand d-lg font-weight-bold text-white me-2 link"
            href="http://localhost:3000/"
          >
            <img
              className="me-1 "
              src="https://static-00.iconduck.com/assets.00/logout-icon-2048x2048-libuexip.png"
              alt="logo"
              height="25"
              onClick={(e) => {
                e.preventDefault();
                handleLogout();
              }}
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
                    href="http://localhost:3000/user-page"
                    onClick={(e) => {
                      e.preventDefault();
                      handleLinkClick("Dashboard");
                      passRouteDash(userData);
                    }}
                  >
                    Dashboard
                  </a>
                </li>
              </ul>
            </div>
          </nav>

          <div className="container mt-4">
            <div className="container">
              <h2>User Details</h2>
              <div className="row">
                {Object.keys(userData).map((key) => (
                  <div className="col-md-6 " key={key}>
                    <div className="card mb-3 test">
                      <div className="card-body">
                        <h5 className="card-title">{keyMappings[key]}</h5>
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

export default UserPage;
