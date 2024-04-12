import React, { useState } from "react";
import axios from "axios"; // Import axios for making HTTP requests
import { useNavigate, useLocation } from "react-router-dom";
import "./login_page.css";
import { useAuth } from "../store/auth";

const SignUp = ({ setCheck }) => {
  const navigate = useNavigate();
  const location = useLocation();
  const userData = location.state.userData;

  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    emp_id: "",
    email: "",
    phoneNumber: "",
    designation: "",
    dateOfJoining: "",
    role: "", // Added role field to formData
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };
  const { storeTokenInLS } = useAuth();

  const handleSubmit = async (e) => {
    console.log(formData);
    alert("Please wait...");
    e.preventDefault();
    try {
      // Make a POST request to your backend signup endpoint
      const response = await axios.post(
        "http://localhost:4000/users/signup",
        formData
      );
      alert(
        "Sign in Successfully. Password Reset Link has been sent in your Email."
      );
      const res_data = response.data;
      console.log(res_data);
      storeTokenInLS(res_data.token);
      // localStorage.setItem('token',res_data.token);
      navigate("/");
      // Handle success response from the backend
      // For example, you can redirect the user to a login page or display a success message
    } catch (error) {
      alert(error.response.data.message);
      console.error("Signup failed:", error.response.data);
      // Handle error response from the backend
      // For example, you can display an error message to the user
    }
    // Reset form fields after submission
    setFormData({
      firstName: "",
      lastName: "",
      emp_id: "",
      email: "",
      phoneNumber: "",
      designation: "",
      dateOfJoining: "",
      role: "",
    });
  };
  const passRoute2 = (userData) => {
    // Navigate to the skill-page route with userData
    setCheck(true);
    navigate("/admin-page", { state: { userData: userData } });
  };

  return (
    <section className="background-radial-gradient overflow-auto vh-100">
      <style>
        {`.background-radial-gradient {
          background-color: hsl(218, 41%, 15%);
          background-image: radial-gradient(650px circle at 0% 0%,
            hsl(218, 41%, 35%) 15%,
            hsl(218, 41%, 30%) 35%,
            hsl(218, 41%, 20%) 75%,
            hsl(218, 41%, 19%) 80%,
            transparent 100%),
          radial-gradient(1250px circle at 100% 100%,
            hsl(218, 41%, 45%) 15%,
            hsl(218, 41%, 30%) 35%,
            hsl(218, 41%, 20%) 75%,
            hsl(218, 41%, 19%) 80%,
            transparent 100%);
        }`}
      </style>
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

      <div className="container px-4 py-5 px-md-5 text-center text-lg-start my-5 overflow-auto">
        <div className="row gx-lg-5 align-items-center mb-5">
          <div className="col-lg-6 mb-5 mb-lg-0" style={{ zIndex: 10 }}>
            <h1
              className="my-5 display-5 fw-bold ls-tight"
              style={{ color: "hsl(218, 81%, 95%)" }}
            >
              <span style={{ color: "hsl(218, 81%, 75%)" }}>
                SkillCorp Group
              </span>
            </h1>
          </div>

          <div className="col-lg-6 mb-5 mb-lg-0 position-relative">
            <div
              id="radius-shape-1"
              className="position-absolute rounded-circle shadow-5-strong"
            ></div>
            <div
              id="radius-shape-2"
              className="position-absolute shadow-5-strong"
            ></div>

            <div className="card bg-glass">
              <div
                className="card-body px-4 py-5 px-md-5"
                style={{ width: "100%" }}
              >
                <form onSubmit={handleSubmit} className="row">
                  <div className="row mb-4">
                    <div className="col">
                      <div className="form-outline">
                        <input
                          type="text"
                          id="firstName"
                          className="form-control"
                          name="firstName"
                          value={formData.firstName}
                          onChange={handleChange}
                          required
                        />
                        <label className="form-label" htmlFor="firstName">
                          First Name*
                        </label>
                      </div>
                    </div>
                    <div className="col">
                      <div className="form-outline">
                        <input
                          type="text"
                          id="lastName"
                          className="form-control"
                          name="lastName"
                          value={formData.lastName}
                          onChange={handleChange}
                          required
                        />
                        <label className="form-label" htmlFor="lastName">
                          Last Name*
                        </label>
                      </div>
                    </div>
                  </div>

                  <div className="form-outline mb-4">
                    <input
                      type="text"
                      id="emp_id"
                      className="form-control"
                      name="emp_id"
                      value={formData.emp_id}
                      onChange={handleChange}
                      required
                    />
                    <label className="form-label" htmlFor="emp_id">
                      Employee ID*
                    </label>
                  </div>

                  <div className="form-outline mb-4">
                    <input
                      type="email"
                      id="email"
                      className="form-control"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      required
                    />
                    <label className="form-label" htmlFor="email">
                      Email Address*
                    </label>
                  </div>

                  <div className="form-outline mb-4">
                    <input
                      type="tel"
                      id="phoneNumber"
                      className="form-control"
                      name="phoneNumber"
                      value={formData.phoneNumber}
                      onChange={handleChange}
                      required
                    />
                    <label className="form-label" htmlFor="phoneNumber">
                      Phone Number*
                    </label>
                  </div>

                  <div className="form-outline mb-4">
                    <input
                      type="text"
                      id="designation"
                      className="form-control"
                      name="designation"
                      value={formData.designation}
                      onChange={handleChange}
                      required
                    />
                    <label className="form-label" htmlFor="designation">
                      Designation*
                    </label>
                  </div>

                  <div className="form-outline mb-4">
                    <input
                      type="date"
                      id="dateOfJoining"
                      className="form-control"
                      name="dateOfJoining"
                      value={formData.dateOfJoining}
                      onChange={handleChange}
                      required
                    />
                    <label className="form-label" htmlFor="dateOfJoining">
                      Date of Joining*
                    </label>
                  </div>

                  <div className="form-outline mb-4">
                    <select
                      id="role"
                      className="form-select mb-4"
                      name="role"
                      value={formData.role}
                      onChange={handleChange}
                      required
                    >
                      <option value="">Select Role</option>
                      <option value="user">User</option>
                      <option value="admin">Admin</option>
                      <option value="approver">Approver</option>
                    </select>
                    <label className="form-label" htmlFor="role">
                      Role*
                    </label>
                  </div>

                  <button
                    type="submit"
                    className="btn btn-primary btn-block mb-4"
                  >
                    Sign Up
                  </button>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default SignUp;
