import React, { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";

function ResetPasswordPage() {
  const navigate = useNavigate();
  const { token } = useParams();
  const [formData, setFormData] = useState({
    temporaryPassword: "", // Add temporaryPassword field to state
    newPassword: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // Make a POST request to validate the temporary password

      console.log(formData.temporaryPassword, " ", "test");
      // If temporary password validation succeeds, proceed to reset password
      const response = await axios.patch(
        `http://localhost:4000/users/resetPass/${token}`,
        {
          newPassword: formData.newPassword,
          temporaryPassword: formData.temporaryPassword,
        }
      );
      // Assuming the backend sends a success message
      console.log(response.data.message);
      alert("Password Reset Successful.");
      navigate("/");
    } catch (error) {
      alert(error.response.data.message);
      console.log(error.response.data.message); // Assuming the backend sends an error message
    }
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

      <div className="container px-4 py-5 px-md-5 text-center text-lg-start my-5">
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
              <div className="card-body px-4 py-5 px-md-5">
                <form onSubmit={handleSubmit}>
                  <div className="form-outline mb-4">
                    <input
                      type="password"
                      id="temporaryPassword"
                      className="form-control"
                      name="temporaryPassword"
                      value={formData.temporaryPassword}
                      onChange={handleChange}
                      required
                    />
                    <label htmlFor="temporaryPassword">
                      Temporary Password
                    </label>
                  </div>

                  <div className="form-outline mb-4">
                    <input
                      type="password"
                      id="newPassword"
                      className="form-control"
                      name="newPassword"
                      value={formData.newPassword}
                      onChange={handleChange}
                      required
                    />
                    <label className="form-label" htmlFor="newPassword">
                      New Password
                    </label>
                  </div>

                  <button
                    onClick={handleSubmit}
                    type="submit"
                    className="btn btn-primary btn-block mb-4"
                  >
                    Reset Password
                  </button>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default ResetPasswordPage;
