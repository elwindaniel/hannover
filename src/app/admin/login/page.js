"use client";
import React, { useState, useRef } from "react";
import { useRouter } from "next/navigation";
import { setSessionStorage } from "@/utils/sessionStorageUtil";

// Mock username and password
const USERNAME = "adimHannover2.0";
const PASSWORD = "yesItsAdmin";

function Login() {
  const router = useRouter();

  const [loginForm, setLoginForm] = useState({
    username: "",
    password: "",
  });

  const [errors, setErrors] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const usernameRef = useRef(null);
  const passwordRef = useRef(null);
  const submitBtnRef = useRef(null);

  const loginInfoChange = (e) => {
    const { id, value } = e.target;
    setLoginForm({ ...loginForm, [id]: value });
    setErrors({ ...errors, [id]: "" }); // Clear the error message for the current input
  };

  const validateForm = () => {
    let formErrors = {};
    let isValid = true;

    if (!loginForm.username) {
      formErrors.username = "Username is required";
      isValid = false;
    }

    if (!loginForm.password) {
      formErrors.password = "Password is required";
      isValid = false;
    }

    setErrors(formErrors);
    return isValid;
  };

  const handleLogin = async () => {
    if (validateForm()) {
      setIsLoading(true);
      // Mock authentication process
      if (
        loginForm.username === USERNAME &&
        loginForm.password === PASSWORD
      ) {
        setSessionStorage("admin-user", "logged");
        // Save login status to local storage
        router.push(`/admin/dashboard/list-ticket`); // Navigate to the dashboard or another page on successful login
      } else {
        setErrors({ general: "Invalid username or password" });
      }
      setIsLoading(false);
    }
  };

  const handleKeyDown = (e, ref) => {
    if (e.key === "Enter") {
      ref.current.focus();
    }
  };

  return (
    <div className="body-admin">
    <div className="white-box">
      <div className="box-title">Login</div>
      <div>
        <input
          className="box-card"
          placeholder="Username"
          id="username"
          value={loginForm.username}
          onChange={loginInfoChange}
          ref={usernameRef}
          onKeyDown={(e) => handleKeyDown(e, passwordRef)}
        />
        {errors.username && <span style={{ color: "red" }}>{errors.username}</span>}
      </div>
      <div>
        <input
          className="box-card"
          placeholder="Password"
          id="password"
          type="password"
          value={loginForm.password}
          onChange={loginInfoChange}
          ref={passwordRef}
          onKeyDown={(e) => handleKeyDown(e, submitBtnRef)}
        />
        {errors.password && <span style={{ color: "red" }}>{errors.password}</span>}
      </div>
      {errors.general && <span style={{ color: "red" }}>{errors.general}</span>}
      {isLoading ? (
        <button
          className="box-card-btn"
          disabled={isLoading}
        >
          Loading...
        </button>
      ) : (
        <button
          className="box-card-btn"
          onClick={handleLogin}
          ref={submitBtnRef}
          disabled={isLoading}
        >
          Login
        </button>
      )}
    </div>
    </div>
  );
}

export default Login;
