import { useState } from "react";
import "./login_page.css";
import "bootstrap/dist/css/bootstrap.min.css";
import axios from "axios"; // Import axios for making HTTP requests
import { useNavigate } from "react-router-dom";
import { useAuth } from "../store/auth";

function Login_page({ setCheck, setCheckApprover, setCheckUser }) {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleForgotPassword = async (e) => {
    e.preventDefault();
    if (formData.email === "") {
      alert("Please enter email");
      return;
    }
    try {
      // Make a POST request to your backend forgot password endpoint
      await axios.post("http://localhost:4000/users/forgotPass", {
        email: formData.email,
      });
      console.log("Forgot Password request sent successfully");
      // Optionally, you can show a success message to the user
      // console.log(response.data.token);
      // Navigate to the reset password page with the token received from the backend
      // navigate(`/resetPass/${response.data.token}`);
      // navigate('/forget-pass');
      alert("Reset password sent to email.");
    } catch (error) {
      alert(error.response.data.message);
      console.error("Forgot Password request failed:");
      // Handle error response from the backend
    }
  };
  const { storeTokenInLS } = useAuth();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // Make a POST request to your backend login endpoint
      // console.log('test');
      const response = await axios.post(
        "http://localhost:4000/users/login",
        formData
      );
      alert(response.data.message);

      // localStorage.setItem('token',res_data.token);
      // console.log('Login successful:', response.data);
      if (response.data.role === "admin") {
        const { password, __v, forcePasswordChange, _id, ...userData } =
          response.data.user;
        // console.log(userData);
        const res_data = await response.data.token;
        console.log("token", res_data);
        storeTokenInLS(res_data);
        setCheck(true);
        navigate("/admin-page", { state: { userData } });
      } else if (response.data.role === "user") {
        const { password, __v, forcePasswordChange, _id, ...userData } =
          response.data.user;
        const res_data = await response.data.token;
        console.log("token", res_data);
        storeTokenInLS(res_data);
        // console.log(userData);
        setCheckUser(true);
        navigate("/user-page", { state: { userData } });
      } else if (response.data.role === "approver") {
        const { password, __v, forcePasswordChange, _id, ...userData } =
          response.data.user;
        // console.log(userData);
        const res_data = await response.data.token;
        console.log("token", res_data);
        storeTokenInLS(res_data);
        setCheckApprover(true);
        navigate("/approver-page", { state: { userData } });
      }
      // You can handle the successful login response here
    } catch (error) {
      // console.error("Login failed:", error.response.data.message);
      alert("Wrong Password");
      // You can handle the login failure here
    }
  };
  const passRoute2 = () => {
    navigate("/home-page");
  };

  // useEffect(()=>{
  //   setCheck(true);
  //   setCheckApprover(true);
  //   setCheckUser(true);
  // },[setCheck,setCheckApprover,setCheckUser])

  return (
    <section className="background-radial-gradient overflow-auto vh-100">
      <div className="container-fluid ">
        <a
          className="navbar-brand d-lg font-weight-bold text-white me-2"
          href="http://localhost:3000/user-page"
          onClick={(event) => {
            event.preventDefault(); // Prevent the default behavior of the link
            passRoute2(); // Call passRoute3 function with userData
          }}
        >
          <img
            className="home-icon"
            src="https://www.freepnglogos.com/uploads/logo-home-png/chimney-home-icon-transparent-1.png"
            alt="logo"
            height="30"
          />
        </a>
      </div>
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
                      type="email"
                      id="form3Example3"
                      className="form-control"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      required
                    />
                    <label className="form-label" htmlFor="form3Example3">
                      Email address
                    </label>
                  </div>

                  <div className="form-outline mb-4">
                    <input
                      type="password"
                      id="form3Example4"
                      className="form-control"
                      name="password"
                      value={formData.password}
                      onChange={handleChange}
                      required
                    />
                    <label className="form-label" htmlFor="form3Example4">
                      Password
                    </label>
                  </div>

                  <button
                    type="submit"
                    className="btn btn-primary btn-block mb-4"
                  >
                    Log In
                  </button>

                  <div className="text-center mb-3">
                    <button
                      onClick={handleForgotPassword}
                      className="btn btn-link text-primary"
                      style={{
                        background: "none",
                        border: "none",
                        padding: 0,
                        textDecoration: "underline",
                        cursor: "pointer",
                      }}
                    >
                      Forgot Password?
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Login_page;
