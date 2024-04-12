import { useState } from "react";
import { Route, Routes } from "react-router-dom";
import "./App.css";
import ResetPasswordPage from "./Components/ResetPasswordPage";
import LoginPage from "./Components/login_page";
import AdminPage from "./Components/AdminPage";
import UserPage from "./Components/UserPage";
import ApproverPage from "./Components/ApproverPage";
import Signup from "./Components/SignUp";
import ForgetPass from "./Components/ForgetPassword";
import SkillPage from "./Components/SkillPage";
import CertificatePage from "./Components/CertificatePage";
import ProjectPage from "./Components/ProjectPage";
import ApproverDesk from "./Components/ApproverDesk";
import UserDetails from "./Components/UserDetails";
import { Logout } from "./Components/Logout";
import HomePage from "./Components/Home";
import DataAnalysis from "./Components/DataAnalysis";
import UserManagement from "./Components/UserManagement";
import UserDataAnalysis from "./Components/UserDataAnalysis";
import UpdateUser from "./Components/UpdateUserDetails";

function App() {
  const [check, setCheck] = useState(false);
  const [checkApprover, setCheckApprover] = useState(false);
  const [checkUser, setCheckUser] = useState(false);

  return (
    <Routes>
      <Route
        path="/"
        element={
          <LoginPage
            setCheckApprover={setCheckApprover}
            setCheckUser={setCheckUser}
            setCheck={setCheck}
          />
        }
      />
      <Route
        path="/admin-page"
        element={<AdminPage check={check} setCheck={setCheck} />}
      />
      <Route
        path="/user-page"
        element={<UserPage checkUser={checkUser} setCheckUser={setCheckUser} />}
      />
      <Route
        path="/approver-page"
        element={
          <ApproverPage
            checkApprover={checkApprover}
            setCheckApprover={setCheckApprover}
          />
        }
      />
      <Route
        path="/signup"
        element={<Signup check={check} setCheck={setCheck} />}
      />
      <Route
        path="/update-user-details"
        element={<UpdateUser check={check} setCheck={setCheck} />}
      />
      <Route
        path="/forgot-pass/:token"
        element={<ForgetPass check={check} setCheck={setCheck} />}
      />
      <Route
        path="/resetPass/:token"
        element={<ResetPasswordPage check={check} setCheck={setCheck} />}
      />
      <Route
        path="/skill-page"
        element={
          <SkillPage
            setCheckApprover={setCheckApprover}
            setCheckUser={setCheckUser}
            setCheck={setCheck}
          />
        }
      />
      <Route
        path="/certificate-page"
        element={
          <CertificatePage
            setCheckApprover={setCheckApprover}
            setCheckUser={setCheckUser}
            setCheck={setCheck}
          />
        }
      />
      <Route
        path="/project-page"
        element={
          <ProjectPage
            setCheckApprover={setCheckApprover}
            setCheckUser={setCheckUser}
            setCheck={setCheck}
          />
        }
      />
      <Route
        path="/approver-desk"
        element={
          <ApproverDesk
            checkApprover={checkApprover}
            setCheckApprover={setCheckApprover}
          />
        }
      />
      <Route
        path="/user-detail"
        element={
          <UserDetails
            setCheckApprover={setCheckApprover}
            setCheckUser={setCheckUser}
            setCheck={setCheck}
          />
        }
      />
      <Route
        path="/data"
        element={
          <DataAnalysis
            setCheckApprover={setCheckApprover}
            setCheckUser={setCheckUser}
            setCheck={setCheck}
          />
        }
      />
      <Route
        path="/user-management"
        element={
          <UserManagement
            setCheckApprover={setCheckApprover}
            setCheckUser={setCheckUser}
            setCheck={setCheck}
          />
        }
      />
      <Route
        path="/user-data-analysis"
        element={
          <UserDataAnalysis
            setCheckApprover={setCheckApprover}
            setCheckUser={setCheckUser}
            setCheck={setCheck}
          />
        }
      />
      <Route
        path="/logout"
        element={<Logout check={check} setCheck={setCheck} />}
      />
      <Route
        path="/home-page"
        element={
          <HomePage
            setCheckApprover={setCheckApprover}
            setCheckUser={setCheckUser}
            setCheck={setCheck}
          />
        }
      />
    </Routes>
    // <Login_Page/>
  );
}

export default App;
