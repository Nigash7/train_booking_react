import React from "react";
import img from "./OE612L0.jpg";
import "./AboutPage.css";

import { Link } from "react-router-dom";

function AboutPage() {
  return (
    <div className="about-page">
      <Link id="back" to="/">
        <h1>←</h1>
      </Link>
      {/* HEADER SECTION */}
      <div className="about-header text-center py-5">
        <h1 className="fw-bold">
          About <span className="text-primary">Us</span>
        </h1>
        <p className="text-muted mt-3">
          Providing a fast, secure, and smooth train booking experience
        </p>
      </div>

      {/* MAIN CONTENT */}
      <div className="container mt-5">
        <div className="row align-items-center">
          {/* LEFT IMAGE */}
          <div className="col-md-6 text-center">
            <img src={img} className="about-img" alt="Train Illustration" />
          </div>

          {/* RIGHT TEXT */}
          <div className="col-md-6">
            <h2 className="fw-bold mb-3">Who We Are</h2>
            <p className="text-muted">
              We are a modern online train booking platform, dedicated to
              offering a smooth ticket reservation process. Our mission is to
              simplify railway travel with fast, secure, and user-friendly
              technology.
            </p>

            <h2 className="fw-bold mt-4 mb-3">What We Do</h2>
            <p className="text-muted">
              From instant ticket booking to real-time updates and travel
              assistance, our platform brings everything in one place.
            </p>

            <a href="/contact" className="btn btn-primary mt-3">
              Contact Us
            </a>
          </div>
        </div>
      </div>

      {/* FEATURES SECTION */}
      <div className="container mt-5 pb-5">
        <h2 className="text-center fw-bold mb-4">Why Choose Us?</h2>

        <div className="row">
          <div className="col-md-4 text-center">
            <div className="feature-card p-4 shadow-sm">
              <h5 className="fw-bold">Fast Booking</h5>
              <p className="text-muted">
                Book your train tickets in seconds with our fast interface.
              </p>
            </div>
          </div>

          <div className="col-md-4 text-center">
            <div className="feature-card p-4 shadow-sm">
              <h5 className="fw-bold">Secure Payments</h5>
              <p className="text-muted">
                Safe & encrypted transactions for worry-free booking.
              </p>
            </div>
          </div>

          <div className="col-md-4 text-center">
            <div className="feature-card p-4 shadow-sm">
              <h5 className="fw-bold">24/7 Support</h5>
              <p className="text-muted">
                We are available anytime to assist with your travel needs.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AboutPage;
