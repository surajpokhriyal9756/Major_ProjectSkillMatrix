import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useLocation } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "./AdminPage.css"; // Import the CSS file
import axios from "axios";

const CertificatePage = ({ setCheck, setCheckApprover, setCheckUser }) => {
  const location = useLocation();
  const navigate = useNavigate();
  const [certificates, setCertificates] = useState([]);
  const [formData, setFormData] = useState({
    title: "",
    issuingOrganization: "",
    certificate_id: "",
    issuanceDate: "",
    expirationDate: "",
    description: "",
  });
  const userData = location.state.userData;
  useEffect(() => {
    setCheck(true);
    setCheckApprover(true);
    setCheckUser(true);
  }, [setCheck, setCheckApprover, setCheckUser]);

  const fetchCertificates = async (emp_id) => {
    try {
      const response = await axios.post(
        "http://localhost:4000/userRouterSkills/getCertificates",
        { emp_id }
      );
      if (!response.data || !response.data.length) {
        throw new Error("Certificates not found");
      }
      setCertificates(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchCertificates(userData.emp_id);
    fetchSkills(userData.emp_id);
  }, [userData.emp_id]);

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    alert("Please wait..");
    e.preventDefault();
    try {
      await axios.post(
        "http://localhost:4000/userRouterSkills/createCertificate",
        { emp_id: userData.emp_id, ...formData }
      );
      fetchCertificates(userData.emp_id);
      alert("Mail send to approver for approving your Certificate. Thank you.");
      // Clear form data after successful submission
      setFormData({
        title: "",
        issuingOrganization: "",
        certificate_id: "",
        issuanceDate: "",
        expirationDate: "",
        description: "",
      });
    } catch (error) {
      alert("Enter proper details.");
      console.error(error);
    }
  };

  // const [activeLink, setActiveLink] = useState('Dashboard');
  // const userData = location.state.userData;
  // console.log(userData);
  // Example function to handle navigation

  // useEffect(() => {
  //   // Set "Dashboard" as active by default when component mounts
  //   // setActiveLink('Dashboard');
  // }, []);

  // const handleLinkClick = (link) => {
  //   setActiveLink(link);
  // };
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
    // Check the user's role
    if (userData && userData.role) {
      const { role } = userData;
      switch (role) {
        case "admin":
          navigate("/admin-page", { state: { userData: userData } });
          break;
        case "user":
          navigate("/user-page", { state: { userData: userData } });
          break;
        case "approver":
          navigate("/approver-page", { state: { userData: userData } });
          break;
        default:
          // Handle other cases or roles
          break;
      }
    } else {
      // Handle the case where userData or role is missing
      console.error("User data or role not found");
    }
  };
  const [skills, setSkills] = useState([]);
  const fetchSkills = async (emp_id) => {
    try {
      const response = await axios.post(
        "http://localhost:4000/userRouterSkills/getSkills",
        { emp_id }
      );
      if (!response.data || !response.data.length) {
        throw new Error("Skills not found");
      }
      setSkills(response.data);
    } catch (error) {
      console.log("here");
      console.error(error);
    }
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
              passRoute3(userData); // Call passRoute3 function with userData
            }}
          >
            <img
              className="me-1"
              src="https://www.logolynx.com/images/logolynx/69/691eca7da08ed4d76f338dcb058f4242.png"
              alt="logo"
              height="35"
            />
          </a>
          <a
            className=" d-lg font-weight-bold text-white me-2 link"
            href="http://localhost:3000/skill-page"
            onClick={() => {
              // handleLinkClick('Skills');
              passRoute(userData); // Pass userData to the passRoute function
            }}
          >
            <h6>Skills</h6>
          </a>
          <a
            className=" d-lg font-weight-bold text-white me-2 link"
            href="http://localhost:3000/certificate-page"
            onClick={() => {
              // handleLinkClick('Certifications');
              passRoute2(userData); // Pass userData to the passRoute function
            }}
          >
            <h3>Certifications</h3>
          </a>

          <a
            className=" d-lg font-weight-bold text-white me-2 link"
            href="http://localhost:3000/project-page"
            onClick={() => {
              // handleLinkClick('Projects');
              passRoute1(userData); // Pass userData to the passRoute function
            }}
          >
            <h6>Projects</h6>
          </a>
        </div>
      </nav>

      <div className="container-fluid ">
        <div className="row">
          {/* <nav className="col-md-3 col-lg-2 d-md-block bg-light sidebar custom-navbar">
            <div className="position-sticky" style={{ height: "100vh" }}>
              <ul className="nav flex-column"></ul>
            </div>
          </nav> */}

          <div className="col-md-9 col-lg-12 mt-3">
            <div className="row">
              {/* Display existing certificates */}
              {certificates.map((certificate, index) => (
                <div className="col-md-4 mb-4" key={index}>
                  <div
                    className="card"
                    style={{
                      maxHeight: "300px",
                      overflow: "auto",
                      scrollbarWidth: "thin",
                    }}
                  >
                    <div className="card-body">
                      <h4 className="card-title">{certificate.title}</h4>
                      <p className="card-text">
                        <strong>Issuing Organization:</strong>{" "}
                        {certificate.issuingOrganization}
                      </p>
                      <p className="card-text">
                        <strong>Certificate ID:</strong>{" "}
                        {certificate.certificate_id}
                      </p>
                      <p className="card-text">
                        <strong>Issuance Date:</strong>{" "}
                        {
                          new Date(certificate.issuanceDate)
                            .toISOString()
                            .split("T")[0]
                        }
                      </p>
                      <p className="card-text">
                        <strong>Expiration Date:</strong>{" "}
                        {
                          new Date(certificate.expirationDate)
                            .toISOString()
                            .split("T")[0]
                        }
                      </p>
                      <p className="card-text">
                        <strong>Description:</strong> {certificate.description}
                      </p>
                      <p className="card-text">
                        <strong>Status:</strong> {certificate.approval}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
            {/* Certificate creation form */}
            <div className="row mt-4 ">
              <div className="">
                <div className="card">
                  <div className="card-body">
                    <h2 className="card-title">Create Certificate</h2>
                    <form onSubmit={handleSubmit}>
                      <div className="mb-3">
                        <label htmlFor="certification" className="form-label">
                          Select a Certification
                        </label>
                        <select
                          className="form-select"
                          id="certification"
                          name="title"
                          value={formData.title}
                          onChange={handleInputChange}
                        >
                          <option value="">Select a Certification</option>
                          {/* Map over the certifications array and create an option for each certification */}
                          {skills.map((certification) => (
                            <option
                              key={certification.id}
                              value={certification.name}
                            >
                              {certification.name}
                            </option>
                          ))}
                        </select>
                      </div>
                      <div className="mb-3">
                        <label
                          htmlFor="issuingOrganization"
                          className="form-label"
                        >
                          Issuing Organization
                        </label>
                        <input
                          type="text"
                          className="form-control"
                          id="issuingOrganization"
                          name="issuingOrganization"
                          value={formData.issuingOrganization}
                          onChange={handleInputChange}
                        />
                      </div>
                      <div className="mb-3">
                        <label htmlFor="certificate_id" className="form-label">
                          Certificate Id
                        </label>
                        <input
                          type="text"
                          className="form-control"
                          id="certificate_id"
                          name="certificate_id"
                          value={formData.certificate_id}
                          onChange={handleInputChange}
                        />
                      </div>
                      <div className="mb-3">
                        <label htmlFor="issuanceDate" className="form-label">
                          Issuance Date
                        </label>
                        <input
                          type="date"
                          className="form-control"
                          id="issuanceDate"
                          name="issuanceDate"
                          value={formData.issuanceDate}
                          onChange={handleInputChange}
                        />
                      </div>
                      <div className="mb-3">
                        <label htmlFor="expirationDate" className="form-label">
                          Expiration Date
                        </label>
                        <input
                          type="date"
                          className="form-control"
                          id="expirationDate"
                          name="expirationDate"
                          value={formData.expirationDate}
                          onChange={handleInputChange}
                        />
                      </div>
                      <div className="mb-3">
                        <label htmlFor="description" className="form-label">
                          Description
                        </label>
                        <textarea
                          className="form-control"
                          id="description"
                          name="description"
                          value={formData.description}
                          onChange={handleInputChange}
                        />
                      </div>
                      <button type="submit" className="btn btn-primary">
                        Submit
                      </button>
                    </form>
                  </div>
                </div>
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

export default CertificatePage;
