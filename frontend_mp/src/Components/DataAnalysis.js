import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useLocation } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "./AdminPage.css"; // Import the CSS file
import axios from "axios";

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

  const [techStack, setTechStack] = useState("");
  const [proficiency, setProficiency] = useState("");
  const [recommendations, setRecommendations] = useState([]);

  const handleTechStackChange = (event) => {
    setTechStack(event.target.value);
  };

  const handleProficiencyChange = (event) => {
    setProficiency(event.target.value);
  };

  const handleClickRecommend = async () => {
    console.log(proficiency);
    try {
      const response = await axios.post("http://localhost:5000/recommend", {
        tech_stack: techStack,
        proficiency: proficiency.split(",").map((level) => level.trim()),
      });
      //   console.log(response.data);
      setRecommendations(response.data);
    } catch (error) {
      console.error("Error:", error);
    }
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
                    href="http://localhost:3000/data"
                    onClick={() => {
                      handleLinkClick("Dashboard");
                    }}
                  >
                    Project Recommendation
                  </a>
                </li>
              </ul>
            </div>
          </nav>

          <div className="container mt-4 example-container">
            <div className="container mt-4 example-container">
              <div>
                <div className="container side">
                  <div className="container side">
                    <div >
                      <div className="card-content">
                        <label htmlFor="techStackInput"><strong> Tech Stack:</strong></label>
                        <input
                          type="text"
                          id="techStackInput"
                          className="form-control"
                          value={techStack}
                          onChange={handleTechStackChange}
                          placeholder="Enter Tech Stack"
                        />
                      </div>
                    </div>
                    <div className="mt-2">
                      <div className="card-content ">
                        <label htmlFor="proficiencyInput"> <strong>Proficiency:</strong> </label>
                        <select
                          id="proficiencyInput"
                          className="form-select"
                          value={proficiency}
                          onChange={handleProficiencyChange}
                        >
                          <option value="">Select Proficiency Levels</option>
                          <option value="Beginner">Beginner</option>
                          <option value="Intermediate">Intermediate</option>
                          <option value="Advanced">Advanced</option>
                        </select>
                      </div>
                    </div>

                    <button
                      className="btn btn-primary mt-2"
                      onClick={handleClickRecommend}
                    >
                      Get Recommendations
                    </button>
                    <table className="table">
                      <thead>
                        <tr>
                          <th scope="col">Rank</th>
                          <th scope="col">Employee ID</th>
                          <th scope="col">Employee Name</th>
                          <th scope="col">Similarity Score</th>
                        </tr>
                      </thead>
                      <tbody>
                        {recommendations.map((recommendation, index) => (
                          <tr key={recommendation.EMP_ID}>
                            <th scope="row">{index + 1}</th>
                            <td>{recommendation.EMP_ID}</td>
                            <td>{recommendation.EMPName}</td>
                            <td>{recommendation.similarity_score}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            </div>
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
