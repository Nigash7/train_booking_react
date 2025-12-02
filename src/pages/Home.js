import { useState } from "react";
import React from "react";

function Home() {
  const [form, setForm] = useState({
    from: "",
    to: "",
    date: "",
    passengers: 1,
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const searchTrains = (e) => {
    e.preventDefault();
    alert(`Searching trains from ${form.from} to ${form.to}`);
  };
  return (
    <div>
      {/* Nav Bar */}
      <nav
        style={{ position: "fixed", top: "0", width: "100vw" }}
        className="navbar navbar-expand-lg navbar-primary bg-primary p-3"
      >
        <a className="navbar-brand text-white fw-bold" href="#">
          🚆 Train Booking
        </a>
        <div className="ms-auto">
          <a className="btn btn-light me-2" href="/login">
            Login
          </a>
          <a className="btn btn-warning" href="/signup">
            Register
          </a>
        </div>
      </nav>

      {/* Banner Section */}
      <div
        className="text-center p-5 text-white"
        style={{
          marginTop: "75px",
          background: "url('') center/cover no-repeat",
          height: "300px",
        }}
      >
        <h1 className="fw-bold">Book Your Train Tickets</h1>
        <p>Search & Book Train Tickets instantly</p>
      </div>

      {/* Search Box */}
      <div
        className="container shadow p-4 mt-n5 bg-white rounded"
        style={{ marginTop: "-60px" }}
      >
        <form onSubmit={searchTrains} className="row g-3">
          <div className="col-md-3">
            <label className="form-label fw-bold">From</label>
            <input
              type="text"
              name="from"
              className="form-control"
              placeholder="Enter departure city"
              onChange={handleChange}
              required
            />
          </div>

          <div className="col-md-3">
            <label className="form-label fw-bold">To</label>
            <input
              type="text"
              name="to"
              className="form-control"
              placeholder="Enter destination city"
              onChange={handleChange}
              required
            />
          </div>

          <div className="col-md-3">
            <label className="form-label fw-bold">Date</label>
            <input
              type="date"
              name="date"
              className="form-control"
              onChange={handleChange}
              required
            />
          </div>

          <div className="col-md-2">
            <label className="form-label fw-bold">Passengers</label>
            <input
              type="number"
              name="passengers"
              className="form-control"
              min="1"
              max="10"
              value={form.passengers}
              onChange={handleChange}
            />
          </div>

          <div className="col-md-1 d-flex align-items-end">
            <button type="submit" className="btn btn-danger w-100">
              Search
            </button>
          </div>
        </form>
      </div>

      {/* Footer */}
      <footer
        style={{ position: "fixed", bottom: "0px", width: "100vw" }}
        className="bg-dark text-white text-center p-3 mt-5"
      >
        <p className="mb-0">© 2025 Train Booking. All rights reserved.</p>
      </footer>
    </div>
  );
}

export default Home;
