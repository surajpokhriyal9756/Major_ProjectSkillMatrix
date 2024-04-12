import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useLocation } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "./AdminPage.css"; // Import the CSS file
import axios from "axios";

const ApproverDesk = ({ setCheckApprover }) => {
  const location = useLocation();
  const navigate = useNavigate();

  const [activeLink, setActiveLink] = useState("Dashboard");
  const userData = location.state.userData;
  // console.log(userData);
  // Example function to handle navigation

  const [pendingRequests, setPendingRequests] = useState([]);
  const [pendingProjectRequests, setPendingProjectRequests] = useState([]);

  useEffect(() => {
    // Fetch pending requests when component mounts
    fetchPendingRequests();
    fetchPendingProjectRequests();
  }, []);

  const fetchPendingRequests = async () => {
    try {
      // Fetch pending requests from the server
      const response = await axios.post(
        `http://localhost:4000/userRouterSkills/get-approve-request/`
      );
      // console.log("out");
      setPendingRequests(response.data);
    } catch (error) {
      console.error("Error fetching pending requests:", error);
    }
  };

  const fetchPendingProjectRequests = async () => {
    try {
      // Fetch pending requests from the server
      const responseProject = await axios.post(
        `http://localhost:4000/userRouterSkills/get-approve-project-request/`
      );
      console.log("get-approve-project-request");

      setPendingProjectRequests(responseProject.data);
      // setPendingRequests(responseProject.data);
    } catch (error) {
      console.error("Error fetching pending project requests:", error);
    }
  };

  const approveRequest = async (requestId) => {
    try {
      // console.log(requestId);
      // Send approval request to the server
      await axios.post(
        "http://localhost:4000/userRouterSkills/approve-request/",
        { requestId }
      );
      // Refresh pending requests after approval
      alert("Certificate has been Approved.");
      fetchPendingRequests();
    } catch (error) {
      console.error("Error approving request:", error);
    }
  };

  const approveProjectRequest = async (requestId) => {
    try {
      // console.log(requestId);
      // Send approval request to the server
      await axios.post(
        "http://localhost:4000/userRouterSkills/approve-project-request/",
        { requestId }
      );
      // Refresh pending requests after approval
      alert("Project has been Approved.");
      fetchPendingProjectRequests();
    } catch (error) {
      console.error("Error approving request:", error);
    }
  };

  const rejectProjectRequest = async (requestId) => {
    try {
      // console.log(requestId);
      // Send approval request to the server
      await axios.post(
        "http://localhost:4000/userRouterSkills/reject-project-request/",
        { requestId }
      );
      // Refresh pending requests after approval
      alert("Project has been Rejected.");
      fetchPendingProjectRequests();
    } catch (error) {
      console.error("Error rejecting request:", error);
    }
  };
  const rejectRequest = async (requestId) => {
    try {
      // console.log(requestId);
      // Send approval request to the server
      await axios.post(
        "http://localhost:4000/userRouterSkills/reject-request/",
        { requestId }
      );
      // Refresh pending requests after approval
      alert("Certificate has been Rejected.");
      fetchPendingRequests();
    } catch (error) {
      console.error("Error rejecting request:", error);
    }
  };

  useEffect(() => {
    // Set "Dashboard" as active by default when component mounts
    setActiveLink("Approver_Desk");
  }, []);

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

    navigate("/approver-desk", { state: { userData: userData } });
  };

  const passRoute4 = (userData) => {
    // Navigate to the skill-page route with userData
    setCheckApprover(true);
    navigate("/approver-page", { state: { userData: userData } });
  };

  return (
    <div>
      <nav className="navbar navbar-expand-lg bg-body-tertiary custom-navbar">
        <div className="container-fluid ">
          <a
            className="navbar-brand d-lg font-weight-bold text-white me-2"
            href="http://localhost:3000/approver-page"
            onClick={(e) => {
              e.preventDefault();
              handleLinkClick("Approver");
              passRoute4(userData); // Pass userData to the passRoute function
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
                    href="http://localhost:3000/approver-page"
                    onClick={(e) => {
                      e.preventDefault();
                      handleLinkClick("Dashboard");
                      passRoute4(userData); // Pass userData to the passRoute function
                    }}
                  >
                    Dashboard
                  </a>
                </li>
                <li className="nav-item">
                  <a
                    className={`nav-link ${
                      activeLink === "Approver_Desk" ? "active" : ""
                    } text-white`}
                    href="http://localhost:3000/approver-desk"
                    onClick={() => {
                      handleLinkClick("Approver_Desk");
                      passRoute3(userData);
                    }}
                  >
                    {" "}
                    Approver Desk
                  </a>
                </li>
              </ul>
            </div>
          </nav>

          <div className="container mt-4">
            <div>
              <div>
                <h2>Pending Requests-Certificates</h2>
                {pendingRequests.length > 0 ? (
                  <ul>
                    {pendingRequests.map((request) => (
                      <div className="card mt-3">
                        <div className="card-body">
                          <h5 className="card-title">
                            Cerificate Title: {request.title}
                          </h5>
                          <p className="card-text">
                            Employee Id: {request.emp_id}
                          </p>
                          <p className="card-text">
                            Certificate Id: {request.certificate_id}
                          </p>
                          <p className="card-text">
                            Issuing Organization: {request.issuingOrganization}
                          </p>
                          <p className="card-text">
                            Description: {request.description}
                          </p>
                          <p className="card-text">
                            Issuance Date:{" "}
                            {
                              new Date(request.issuanceDate)
                                .toISOString()
                                .split("T")[0]
                            }
                          </p>
                          <p className="card-text">
                            Expiration Date:{" "}
                            {
                              new Date(request.expirationDate)
                                .toISOString()
                                .split("T")[0]
                            }
                          </p>
                          <button
                            className="btn btn-success"
                            onClick={() =>
                              approveRequest(request.certificate_id)
                            }
                          >
                            Approve
                          </button>{" "}
                          {/* Adding a space here */}
                          <button
                            className="btn btn-danger"
                            onClick={() =>
                              rejectRequest(request.certificate_id)
                            }
                          >
                            Reject
                          </button>
                        </div>
                      </div>
                    ))}
                  </ul>
                ) : (
                  <p>No pending requests</p>
                )}
              </div>
              <div>
                <h2>Pending Requests-Projects</h2>
                {pendingProjectRequests.length > 0 ? (
                  <div className="row row-cols-1 row-cols-md-2 g-4">
                    {pendingProjectRequests.map((request) => (
                      <div className="col " key={request.project_id}>
                        <div
                          className="card mt-3"
                          style={{
                            maxHeight: "400px",
                            overflow: "auto",
                            scrollbarWidth: "thin",
                            marginLeft: "25px",
                            width: "950px",
                          }}
                        >
                          <div className="card-body">
                            <h5 className="card-title">
                              Project Title: {request.name}
                            </h5>
                            <p className="card-text">
                              Project Id: {request.project_id}
                            </p>
                            <p className="card-text">
                              Employee ID: {request.emp_id}
                            </p>
                            <p className="card-text">
                              Project Manager ID: {request.projectManagerId}
                            </p>
                            <p className="card-text">
                              Start Date:{" "}
                              {
                                new Date(request.startDate)
                                  .toISOString()
                                  .split("T")[0]
                              }
                            </p>
                            <p className="card-text">
                              End Date:{" "}
                              {
                                new Date(request.endDate)
                                  .toISOString()
                                  .split("T")[0]
                              }
                            </p>
                            Project URL:{" "}
                            <a
                              href={request.url}
                              className="card-text"
                              target="_blank"
                              rel="noopener noreferrer"
                            >
                              {request.url}
                            </a>
                            <button
                              className="btn btn-success"
                              onClick={() =>
                                approveProjectRequest(request.project_id)
                              }
                            >
                              Approve
                            </button>
                            <button
                              className="btn btn-danger ms-2"
                              onClick={() =>
                                rejectProjectRequest(request.project_id)
                              }
                            >
                              Reject
                            </button>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <p>No pending project requests</p>
                )}
              </div>
              <div className="mt-3"></div>
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

export default ApproverDesk;
