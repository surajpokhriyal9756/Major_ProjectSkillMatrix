import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useLocation } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "./AdminPage.css"; // Import the CSS file
import axios from "axios";

const SkillPage = ({
  check,
  setCheck,
  checkApprover,
  setCheckApprover,
  checkUser,
  setCheckUser,
}) => {
  const location = useLocation();
  const userData = location.state.userData;
  // console.log(userData);

  const navigate = useNavigate();

  // const [activeLink, setActiveLink] = useState('Dashboard');

  const [skills, setSkills] = useState([]);
  const [newSkill, setNewSkill] = useState({
    name: "",
    description: "",
    proficiency: "Beginner",
  });
  const skills_ls = [
    // Programming Languages
    "Java",
    "Python",
    "SQL",
    "JavaScript",
    "HTML/CSS",
    "Swift",
    "Kotlin",

    // Web Development Frameworks and Libraries
    "React.js",
    "Node.js",
    "Angular",
    "Django",
    "Flask",
    "Spring Framework",
    "Hibernate",
    "Express.js",

    // Databases
    "MongoDB",
    "MySQL",
    "PostgreSQL",
    "Oracle",
    "Firebase",

    // Frontend Development Tools
    "React.js",
    "Angular",
    "HTML/CSS",
    "JavaScript",
    "UI/UX Design Principles",
    "Adobe XD",
    "Figma",

    // Backend Development Tools
    "Node.js",
    "Express.js",
    "Django",
    "Flask",
    "Spring Framework",
    "Hibernate",

    // API Technologies
    "RESTful APIs",
    "GraphQL",

    // Mobile App Development
    "Swift",
    "Kotlin",
    "Android Studio",
    "Xcode",

    // Version Control
    "Git",

    // Containerization and Orchestration
    "Docker",
    "Kubernetes",

    // Cloud Platforms
    "AWS",
    "Azure",
    "Google Cloud Platform",

    // Continuous Integration/Continuous Deployment (CI/CD)
    "Jenkins",

    // Testing Frameworks
    "Selenium",

    // Issue Tracking
    "JIRA",

    // Machine Learning and AI
    "TensorFlow",
    "PyTorch",
    "Scikit-learn",
    "Natural Language Processing (NLP)",
    "Computer Vision",

    // Big Data Technologies
    "Hadoop",
    "Spark",

    // Blockchain Development
    "Solidity",
    "Ethereum",

    // Internet of Things (IoT)
    "IoT Development",
    "Raspberry Pi",
    "Arduino",

    // Soft Skills
    "Communication Skills",
    "Teamwork and Collaboration",
    "Problem-Solving Skills",
    "Time Management",
    "Leadership Abilities",
    "Adaptability",
    "Creativity and Innovation",

    // Other Technical Skills
    "Analytical Skills",
    "Attention to Detail",
    "Customer Service Skills",
    "Project Management Skills",
    "Research Skills",
    "Decision-Making Skills",
    "Networking Abilities",
  ];
  useEffect(() => {
    setCheck(true);
    setCheckApprover(true);
    setCheckUser(true);
  }, [setCheck, setCheckApprover, setCheckUser]);

  useEffect(() => {
    fetchSkills(userData.emp_id);
  }, [userData.emp_id]);

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

  const handleInputChange = (e) => {
    setNewSkill({ ...newSkill, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    alert("Please wait..");
    e.preventDefault();
    try {
      await axios.post("http://localhost:4000/userRouterSkills/createSkills", {
        emp_id: userData.emp_id,
        ...newSkill,
      });
      fetchSkills(userData.emp_id);
      setNewSkill({
        name: "",
        description: "",
        proficiency: "Beginner",
      });
    } catch (error) {
      alert("Enter proper details.");
      console.error("Error creating skill:", error);
    }
  };

  // Example function to handle navigation

  // useEffect(() => {
  //   // Set "Dashboard" as active by default when component mounts
  //   setActiveLink('Dashboard');
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
            <h3>Skills</h3>
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
            <h6>Projects</h6>
          </a>
        </div>
      </nav>

      <div className="container-fluid">
        <div className="row">
          {/* <nav className="col-md-3 col-lg-2 d-md-block bg-light sidebar custom-navbar">
            <div className="position-sticky" style={{ height: "100vh" }}>
              <ul className="nav flex-column"></ul>
            </div>
          </nav> */}

          <div className="col-md-9 col-lg-12">
            {/* Existing Skills */}
            <div className="mb-4 mt-3">
              <div className="row">
                {skills.map((skill) => (
                  <div className="col-md-4 mb-3" key={skill._id}>
                    <div className="card">
                      <div
                        className="card-body"
                        style={{
                          maxHeight: "180px",
                          overflow: "auto",
                          scrollbarWidth: "thin",
                        }}
                      >
                        <h5 className="card-title">{skill.name}</h5>
                        <p className="card-text">
                          Proficiency: {skill.proficiency}
                        </p>
                        <p className="card-text">
                          Description: {skill.description}
                        </p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* New Skill Form */}
            <div className="card">
              <div className="card-body">
                <h5 className="card-title">Add New Skill</h5>
                <form onSubmit={handleSubmit}>
                  <div className="mb-3">
                    <label htmlFor="name" className="form-label">
                      Name:
                    </label>
                    <select
                      className="form-select"
                      id="name"
                      name="name"
                      value={newSkill.name}
                      onChange={handleInputChange}
                    >
                      <option value="">Select a skill</option>
                      {/* Map over the skills array and create an option for each skill */}
                      {skills_ls.map((skill, index) => (
                        <option key={index} value={skill}>
                          {skill}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div className="mb-3">
                    <label htmlFor="description" className="form-label">
                      Description:
                    </label>
                    <input
                      type="text"
                      className="form-control"
                      id="description"
                      name="description"
                      value={newSkill.description}
                      onChange={handleInputChange}
                    />
                  </div>
                  <div className="mb-3">
                    <label htmlFor="proficiency" className="form-label">
                      Proficiency:
                    </label>
                    <select
                      className="form-select"
                      id="proficiency"
                      name="proficiency"
                      value={newSkill.proficiency}
                      onChange={handleInputChange}
                    >
                      <option value="Beginner">Beginner</option>
                      <option value="Intermediate">Intermediate</option>
                      <option value="Advanced">Advanced</option>
                    </select>
                  </div>
                  <button type="submit" className="btn btn-primary">
                    Add Skill
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

export default SkillPage;
