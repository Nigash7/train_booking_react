import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";

function Signup() {
  let [name, setName] = useState("");
  let [email, setEmail] = useState("");
  let [phone_number, setPhone_number] = useState("");
  let [address, setAddress] = useState("");
  let [age, setAge] = useState("");
  let [gender, setGender] = useState("");
  let [password, setPassword] = useState("");
  let [confirmpassword, setConfirmpassword] = useState("");
  let [error, setError] = useState("");
  let [success, setSuccess] = useState("");
  let navigate = useNavigate();
  function registerUser(e) {
    e.preventDefault();
    if (password !== confirmpassword) {
      setError("Passwords do not match");
      return;
    }
    var data = {
      name: name,
      email: email,
      phone_number: phone_number,
      address: address,
      age: age,
      gender: gender,
      password: password,
    };
    axios
      .post("http://127.0.0.1:8000/api/signup/", data)
      .then((response) => {
        setSuccess(response.data.message); // success message
        setError(""); // clear error
        setTimeout(() => {
          navigate("/login");
        }, 2000);
      })
      .catch((error) => {
        setError(error.response.data.message); // show error message
        setSuccess(""); // clear success
      });
  }

  return (
    <div className="  container d-flex justify-content-center align-items-center vh-100 ">
      <div
        className="card  col-12  shadow-sm p-4"
        style={{ width: "400px", borderRadius: "15px" }}
      >
        <h3 className="text-center mb-4 fw-bold text-primary">
          Create Account
        </h3>

        <form className="col-12" onSubmit={registerUser}>
          {error ? <div className="alert alert-danger">{error}</div> : ""}
          {success ? (
            <div className="success alert-success  p-3">{success}</div>
          ) : (
            ""
          )}
          <div className="row">
            <div className=" col mb-3">
              <label className="form-label fw-semibold">Full Name</label>
              <input
                type="text"
                name="name"
                className="form-control"
                value={name}
                onInput={(event) => setName(event.target.value)}
                placeholder="Your Name"
                required
              />
            </div>

            <div className="col-12 mb-3">
              <label className="form-label fw-semibold">Email Address</label>
              <input
                type="email"
                name="email"
                className="form-control"
                value={email}
                onInput={(event) => setEmail(event.target.value)}
                placeholder="example@mail.com"
                required
              />
            </div>
            <div className=" mb-3">
              <label className="form-label fw-semibold">Phone Number</label>
              <input
                type="text"
                name="phone_number"
                placeholder="Phone Number"
                className="form-control"
                value={phone_number}
                onInput={(event) => setPhone_number(event.target.value)}
                required
              />
            </div>
            <div className="mb-3">
              <label className="form-label fw-semibold">Address</label>
              <textarea
                name="address"
                placeholder="Address"
                className="form-control"
                value={address}
                onInput={(event) => setAddress(event.target.value)}
              ></textarea>
            </div>
            <div className="mb-3">
              <label className="form-label fw-semibold">Age</label>
              <input
                type="number"
                name="age"
                className="form-control"
                placeholder="Age"
                value={age}
                onInput={(event) => setAge(event.target.value)}
              />
            </div>
            <div className="mb-3">
              <label className="form-label fw-semibold">Gender</label>
              <select
                name="gender"
                className="form-control"
                value={gender}
                onInput={(event) => setGender(event.target.value)}
              >
                <option value="">Select Gender</option>
                <option value="Male">Male</option>
                <option value="Female">Female</option>
                <option value="Other">Other</option>
              </select>
            </div>

            <div className="mb-3">
              <label className="form-label fw-semibold">Password</label>
              <input
                type="password"
                name="password"
                className="form-control"
                placeholder="********"
                value={password}
                onInput={(event) => setPassword(event.target.value)}
                required
              />
            </div>

            <div className="mb-3">
              <label className="form-label fw-semibold">Confirm Password</label>
              <input
                type="password"
                name="confirmPassword"
                className="form-control"
                placeholder="********"
                value={confirmpassword}
                onInput={(event) => setConfirmpassword(event.target.value)}
                required
              />
            </div>
          </div>
          <div
            style={{
              display: "flex",
              alignItems: "end",
              justifyContent: "end",
            }}
          >
            <button
              type="submit"
              className="btn btn-primary w-100 mt-2 fw-semibold col-12 col-lg-4"
            >
              Sign Up
            </button>
          </div>

          <p className="text-center mt-3">
            Already have an account?{" "}
            <Link
              to="/login"
              className="text-decoration-none fw-bold text-primary"
            >
              Login
            </Link>
          </p>
        </form>
      </div>
    </div>
  );
}

export default Signup;
