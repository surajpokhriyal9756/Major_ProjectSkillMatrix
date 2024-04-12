import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useLocation } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "./AdminPage.css"; // Import the CSS file
import axios from "axios";

const UserDetails = ({ setCheck, setCheckApprover, setCheckUser }) => {
  const location = useLocation();
  const navigate = useNavigate();
  const [userDetail, setUserDetail] = useState(null);
  const [error, setError] = useState("");
  const [empId, setEmpId] = useState("");

  const userData = location.state.userData;

  const [activeLink, setActiveLink] = useState("Dashboard");

  //   console.log(userData);
  // Example function to handle navigation

  useEffect(() => {
    // Set "Dashboard" as active by default when component mounts
    setActiveLink("Dashboard");
  }, []);
  useEffect(() => {
    // console.log(userData);
    setCheck(true);
    setCheckApprover(true);
    setCheckUser(true);
  }, [setCheck, setCheckApprover, setCheckUser]);

  const handleLinkClick = (link) => {
    setActiveLink(link);
  };
  const passRoute2 = (userData) => {
    // Navigate to the skill-page route with userData

    navigate("/admin-page", { state: { userData: userData } });
  };

  const passRouteda = (userData) => {
    // Navigate to the skill-page route with userData

    navigate("/user-data-analysis", { state: { userData: userData } });
  };
  const passRoutedata = (userData) => {
    // Navigate to the skill-page route with userData

    navigate("/data", { state: { userData: userData } });
  };
  const handleSearch = async () => {
    try {
      const response = await axios.post(
        "http://localhost:4000/userRouterSkills/getUserDetails",
        { empId }
      );
      setUserDetail(response.data); // Set the retrieved user data in state
      setError(""); // Clear any previous errors
    } catch (error) {
      console.error("Error fetching user details:", error);
      setError("User not found"); // Set error message if user not found
      setUserDetail(null); // Clear user data
    }
  };

  const passRouteUpdate = (userData,userDetail) => {
    // Navigate to the skill-page route with userData
    setCheck(true);
    navigate("/update-user-details", { state: { userData: userData,userDetail:userDetail } });
  };


  return (
    <div>
      <nav className="navbar navbar-expand-lg bg-body-tertiary custom-navbar">
        <div className="container-fluid ">
          <a
            className="navbar-brand d-lg font-weight-bold text-white me-2"
            href="http://localhost:3000/user-page"
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
                      activeLink === "Data_Analysis" ? "active" : ""
                    } text-white`}
                    href="http://localhost:3000/data"
                    onClick={() => {
                      handleLinkClick("Data_analysis");
                      passRoutedata(userData);
                    }}
                  >
                    Project Recommendation
                  </a>
                </li>
                <li className="nav-item">
                  <a
                    className={`nav-link ${
                      activeLink === "User_Details" ? "active" : ""
                    } text-white`}
                    href="http://localhost:3000/user-data-analysis"
                    onClick={() => {
                      handleLinkClick("User_Details");
                      passRouteda(userData);
                    }}
                  >
                    User Data Analysis
                  </a>
                </li>
              </ul>
            </div>
          </nav>

          <div className="container mt-4 example-container">
            <div>
              <div className="container side">
                <div className="container side">
                  <h2>User Details</h2>
                  <div className="input-group mb-3">
                    <input
                      type="text"
                      className="form-control"
                      placeholder="Enter Employee ID"
                      value={empId}
                      onChange={(e) => setEmpId(e.target.value)}
                    />
                    <button className="btn btn-primary" onClick={handleSearch}>
                      Search
                    </button>
                  </div>
                  {userDetail && (
                    <div className="row mt-4 ">
                      <div className="col-md-6 ">
                        <div className="card ">
                          <div className="card-body ">
                            <p className="card-text">
                              <strong>Name:</strong> {userDetail.firstName}{" "}
                              {userDetail.lastName}
                            </p>
                            <p className="card-text">
                              <strong>Employee ID:</strong> {userDetail.emp_id}{" "}
                              
                            </p>
                            <p className="card-text">
                              <strong>Email:</strong> {userDetail.email}
                            </p>
                            <p className="card-text">
                              <strong>Role: </strong>
                              {userDetail.role}
                            </p>
                            <p className="card-text">
                              <strong>Phone Number:</strong>{" "}
                              {userDetail.phoneNumber}
                            </p>
                            <p className="card-text">
                              <strong>Designation: </strong>
                              {userDetail.designation}
                            </p>
                            <p className="card-text">
                              <strong>Date of Joining:</strong>{" "}
                              {
                                new Date(userDetail.dateOfJoining)
                                  .toISOString()
                                  .split("T")[0]
                              }
                            </p>
                            {/* Add more details as needed */}
                            <button className="btn btn-primary"      onClick={() => {
                      
                      passRouteUpdate(userData,userDetail);
                    }}>
                              Update
                            </button>
                            {/* Add more details as needed */}
                          </div>
                        </div>
                      </div>
                    </div>
                  )}
                  {error && <p className="text-danger">{error}</p>}
                </div>
              </div>
            </div>
            <div className="mt-5"></div>
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
