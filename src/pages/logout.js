import React from "react";
import { useEffect, useState } from "react";

import axios from "axios";
import { useNavigate } from "react-router-dom";

function Logout() {
  const navigate = useNavigate();

  const handleLogout = () => {
    const token = localStorage.getItem("token");

    axios
      .post(
        "http://127.0.0.1:8000/api/logout/",
        {},
        {
          headers: {
            Authorization: `Token ${token}`,
          },
        }
      )
      .then((response) => {
        console.log(response.data);

        // Remove token
        localStorage.removeItem("token");

        // Redirect to login
        navigate("/login");
      })
      .catch((error) => {
        console.error("Logout failed", error);

        // Still clear token to avoid stuck situation
        localStorage.removeItem("token");
        navigate("/login");
      });
  };
  function back() {
    navigate("/home2");
  }
  return (
    <div className="d-flex justify-content-center align-items-center vh-100 bg-light">
      <div
        className="card shadow-sm p-4 text-center"
        style={{ width: "380px", borderRadius: "15px" }}
      >
        <h3 className="fw-bold text-primary mb-4">Logout</h3>

        <p className="fw-semibold">Are you sure you want to logout?</p>

        <div className="d-flex justify-content-center mt-3 gap-3">
          <button className="btn btn-danger fw-semibold" onClick={handleLogout}>
            Yes, Logout
          </button>
          <button className="btn btn-secondary fw-semibold" onClick={back}>
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
}

export default Logout;
