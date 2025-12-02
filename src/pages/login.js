import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { error } from "ajv/dist/vocabularies/applicator/dependencies";
import { Link } from "react-router-dom";

function Login() {
  const [user, setUser] = useState({
    email: "",
    password: "",
  });

  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const navigate = useNavigate();

  const handleChange = (e) => {
    setUser({ ...user, [e.target.name]: e.target.value });
  };

  const handleLogin = (e) => {
    e.preventDefault();

    axios
      .post("http://127.0.0.1:8000/api/login/", {
        email: user.email,
        password: user.password,
      })
      .then((response) => {
        const token = response.data.token;
        localStorage.setItem("token", token);

        setSuccess("Login successful!");
        setError("");

        // Redirect to homepage
        navigate("/home2");
      })
      .catch((error) => {
        setSuccess("");
        if (error.response) {
          setError(error.response.data.message || "Login failed!");
        } else {
          setError("Unable to connect to the server!");
        }
      });
  };

  return (
    <div className="d-flex justify-content-center align-items-center vh-100 bg-light">
      <div
        className="card shadow-sm p-4"
        style={{ width: "400px", borderRadius: "15px" }}
      >
        <h3 className="text-center mb-4 fw-bold text-primary">Welcome Back</h3>

        <form onSubmit={handleLogin}>
          <div className="mb-3">
            <label className="form-label fw-semibold">Email Address</label>
            <input
              type="email"
              name="email"
              className="form-control"
              placeholder="example@mail.com"
              value={user.email}
              onChange={handleChange}
              required
            />
          </div>

          <div className="mb-2">
            <label className="form-label fw-semibold">Password</label>
            <input
              type="password"
              name="password"
              className="form-control"
              placeholder="********"
              value={user.password}
              onChange={handleChange}
              required
            />
          </div>

          <div className="text-end mt-1">
            <a
              href="#"
              className="text-decoration-none text-primary fw-semibold"
              style={{ fontSize: "0.9rem" }}
            >
              Forgot Password?
            </a>
          </div>

          <button
            type="submit"
            className="btn btn-primary w-100 mt-3 fw-semibold"
          >
            Login
          </button>

          <p className="text-center mt-3">
            Don’t have an account?{" "}
            <Link
              to="/signup"
              className="text-decoration-none fw-bold text-primary"
            >
              Signup
            </Link>
          </p>
        </form>
      </div>
    </div>
  );
}

export default Login;
