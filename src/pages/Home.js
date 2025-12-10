import React from "react";
import "./LandingPage.css";
import { Link } from "react-router-dom";
import img from "./OE612L0.jpg";

function LandingPage() {
  return (
    <div className="landing-container">
      {/* NAVBAR */}
      <nav className="navbar navbar-expand-lg navbar-light bg-white shadow-sm px-4 py-3">
        <a className="navbar-brand fw-bold text-primary" href="#">
          BOOK TRAIN QUICK
        </a>

        <div className="collapse navbar-collapse justify-content-end">
          <ul className="navbar-nav me-3">
            <li className="nav-item mx-2">
              <a className="nav-link" href="#">
                Home
              </a>
            </li>
            <li className="nav-item mx-2">
              <Link className="nav-link" to="/about">
                About
              </Link>
            </li>
            <li className="nav-item mx-2">
              <a className="nav-link" href="#">
                Services
              </a>
            </li>
            <li className="nav-item mx-2">
              <a className="nav-link" href="#">
                Contact
              </a>
            </li>
          </ul>

          <Link to="/signup" className="btn btn-outline-primary me-2">
            Sign Up
          </Link>
          <Link to="/login" className="btn btn-primary ml-2">
            Sign In
          </Link>
        </div>
      </nav>

      {/* HERO SECTION */}
      <div className="hero-section container">
        <div className="row align-items-center">
          {/* LEFT TEXT */}
          <div className="col-md-6">
            <h1 className="title">
              Book Your <span className="text-primary">Train</span>
            </h1>

            <p className="subtitle">
              Book your railway tickets easily and quickly. Fast, secure, and
              convenient online reservations.
            </p>

            <Link to="/signup" className="btn btn-primary btn-lg mt-3">
              Get Started →
            </Link>
          </div>

          {/* RIGHT IMAGE */}
          <div className="col-md-6 text-center">
            <img
              src={img}
              alt="Train Illustration"
              className="hero-img"
              style={{ borderRadius: "30% 70% 70% 30% / 30% 30% 70% 70% " }}
            />
          </div>
        </div>
      </div>
    </div>
  );
}

export default LandingPage;
