import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useLocation } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "./AdminPage.css"; // Import the CSS file
import axios from "axios";

const ProjectPage = ({ setCheck, setCheckApprover, setCheckUser }) => {
  const location = useLocation();
  const navigate = useNavigate();

  // const [activeLink, setActiveLink] = useState('Dashboard');
  const userData = location.state.userData;
  // console.log(userData);
  // Example function to handle navigation

  useEffect(() => {
    setCheck(true);
    setCheckApprover(true);
    setCheckUser(true);
  }, [setCheck, setCheckApprover, setCheckUser]);

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
  const [projects, setProjects] = useState([]);
  const [newProject, setNewProject] = useState({
    name: "",
    project_id: "",
    description: "",
    projectManagerId: "",
    startDate: "",
    endDate: "",
    status: "",
    url: "",
  });

  useEffect(() => {
    fetchProjects(userData.emp_id);
  }, [userData.emp_id]);

  const fetchProjects = async (emp_id) => {
    try {
      const response = await axios.post(
        "http://localhost:4000/userRouterSkills/getProjects",
        { emp_id }
      );
      if (!response.data || !response.data.length) {
        throw new Error("Projects not found");
      }
      setProjects(response.data);
    } catch (error) {
      console.error("Error fetching projects:", error);
    }
  };

  const handleInputChange = (e) => {
    setNewProject({ ...newProject, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    alert("Please wait..");
    try {
      await axios.post(
        "http://localhost:4000/userRouterSkills/createProjects",
        {
          emp_id: userData.emp_id,
          ...newProject,
        }
      );
      setNewProject({
        name: "",
        project_id: "",
        description: "",
        projectManagerId: "",
        startDate: "",
        endDate: "",
        status: "",
        url: "",
      });
      fetchProjects(userData.emp_id);
    } catch (error) {
      alert("Enter proper details.");
      console.error("Error creating project:", error);
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
            <h6>Certifications</h6>
          </a>

          <a
            className=" d-lg font-weight-bold text-white me-2 link"
            href="http://localhost:3000/project-page"
            onClick={() => {
              // handleLinkClick('Projects');
              passRoute1(userData); // Pass userData to the passRoute function
            }}
          >
            <h3>Projects</h3>
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
              {/* Display projects as cards */}
              {projects.map((project) => (
                <div className="col-md-4" key={project._id}>
                  <div
                    className="card mb-4"
                    style={{
                      maxHeight: "300px",
                      overflow: "auto",
                      scrollbarWidth: "thin",
                    }}
                  >
                    <div className="card-body">
                      <h4 className="card-title">{project.name}</h4>
                      <p className="card-text">
                        <strong>Project Id:</strong> {project.project_id}
                      </p>
                      <p className="card-text">
                        <strong>Status:</strong> {project.status}
                      </p>
                      <p className="card-text">
                        <strong>Project Manager ID:</strong>{" "}
                        {project.projectManagerId}
                      </p>
                      <p className="card-text">
                        <strong>Start Date:</strong>{" "}
                        {
                          new Date(project.startDate)
                            .toISOString()
                            .split("T")[0]
                        }
                      </p>
                      <p className="card-text">
                        <strong>End Date:</strong>{" "}
                        {new Date(project.endDate).toISOString().split("T")[0]}
                      </p>
                      <p className="card-text">
                        <strong>Approval:</strong> {project.approval}
                      </p>
                      <p className="card-text">
                        <strong>URL:</strong>{" "}
                        <a
                          href={project.url}
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          {project.url}
                        </a>
                      </p>
                      {/* Add more project details as needed */}
                    </div>
                  </div>
                </div>
              ))}
            </div>
            <div className="card">
              <div className="card-body">
                <h2 className="card-title">Add New Project</h2>
                <form onSubmit={handleSubmit}>
                  <div className="mb-3">
                    <label htmlFor="name" className="form-label">
                      Name:
                    </label>
                    <input
                      type="text"
                      className="form-control"
                      id="name"
                      name="name"
                      value={newProject.name}
                      onChange={handleInputChange}
                    />
                  </div>
                  <div className="mb-3">
                    <label htmlFor="project_id" className="form-label">
                      Project Id:
                    </label>
                    <input
                      type="text"
                      className="form-control"
                      id="project_id"
                      name="project_id"
                      value={newProject.project_id}
                      onChange={handleInputChange}
                    />
                  </div>
                  <div className="mb-3">
                    <label htmlFor="description" className="form-label">
                      Technology Stack:
                    </label>
                    <input
                      type="text"
                      className="form-control"
                      id="description"
                      name="description"
                      value={newProject.description}
                      onChange={handleInputChange}
                    />
                  </div>
                  <div className="mb-3">
                    <label htmlFor="projectManagerId" className="form-label">
                      Project Manager ID:
                    </label>
                    <input
                      type="text"
                      className="form-control"
                      id="projectManagerId"
                      name="projectManagerId"
                      value={newProject.projectManagerId}
                      onChange={handleInputChange}
                    />
                  </div>
                  <div className="mb-3">
                    <label htmlFor="startDate" className="form-label">
                      Start Date:
                    </label>
                    <input
                      type="date"
                      className="form-control"
                      id="startDate"
                      name="startDate"
                      value={newProject.startDate}
                      onChange={handleInputChange}
                    />
                  </div>
                  <div className="mb-3">
                    <label htmlFor="endDate" className="form-label">
                      End Date:
                    </label>
                    <input
                      type="date"
                      className="form-control"
                      id="endDate"
                      name="endDate"
                      value={newProject.endDate}
                      onChange={handleInputChange}
                    />
                  </div>
                  <div className="mb-3">
                    <label htmlFor="status" className="form-label">
                      Status:(active/completed)
                    </label>
                    <input
                      type="text"
                      className="form-control"
                      id="status"
                      name="status"
                      value={newProject.status}
                      onChange={handleInputChange}
                    />
                  </div>
                  <div className="mb-3">
                    <label htmlFor="url" className="form-label">
                      URL:
                    </label>
                    <input
                      type="text"
                      className="form-control"
                      id="url"
                      name="url"
                      value={newProject.url}
                      onChange={handleInputChange}
                    />
                  </div>
                  <button type="submit" className="btn btn-primary">
                    Add Project
                  </button>
                </form>
              </div>
            </div>
            <div className="mt-3"></div>
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

export default ProjectPage;
