import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function Edit_profile() {
  const navigate = useNavigate();
  const [profile, setProfile] = useState({
    email: "",
    name: "",
    phone_number: "",
    address: "",
    age: "",
    gender: "",
  });
  const [message, setMessage] = useState("");

  const token = localStorage.getItem("token");

  // Load user profile
  useEffect(() => {
    axios
      .get("http://127.0.0.1:8000/api/profile/", {
        headers: { Authorization: `Token ${token}` },
      })
      .then((res) => setProfile(res.data))
      .catch((err) => console.log(err));
  }, []);

  // Handle input
  const handleChange = (e) => {
    setProfile({ ...profile, [e.target.name]: e.target.value });
  };

  // Submit update
  const handleSubmit = (e) => {
    e.preventDefault();

    axios
      .put("http://127.0.0.1:8000/api/update_profile/", profile, {
        headers: { Authorization: `Token ${token}` },
      })
      .then(() => {
        setMessage(
          <div className="d-flex align-items-center">
            Profile updated successfully &nbsp;
            <div
              className="spinner-border spinner-border-sm ms-2"
              role="status"
            >
              <span className="visually-hidden"></span>
            </div>
          </div>
        );

        setTimeout(() => {
          navigate("/profile");
        }, 2000);
      })
      .catch(() => setMessage("Update failed"));
  };
  function back() {
    navigate("/profile");
  }

  return (
    <div className="container mt-4">
      <h2>Edit Profile</h2>

      {message && <p className="text-success">{message}</p>}

      <form onSubmit={handleSubmit} className="mt-3">
        {/* Email (readonly) */}
        <div className="mb-3">
          <label>Email</label>
          <input
            type="text"
            className="form-control"
            name="email"
            value={profile.email}
            readOnly
          />
        </div>

        {/* Name */}
        <div className="mb-3">
          <label>Name</label>
          <input
            type="text"
            className="form-control"
            name="name"
            value={profile.name}
            onChange={handleChange}
          />
        </div>

        {/* Phone Number */}
        <div className="mb-3">
          <label>Phone Number</label>
          <input
            type="text"
            className="form-control"
            name="phone_number"
            value={profile.phone_number}
            onChange={handleChange}
          />
        </div>

        {/* Address */}
        <div className="mb-3">
          <label>Address</label>
          <textarea
            className="form-control"
            name="address"
            value={profile.address}
            onChange={handleChange}
          ></textarea>
        </div>

        {/* Age */}
        <div className="mb-3">
          <label>Age</label>
          <input
            type="number"
            className="form-control"
            name="age"
            value={profile.age}
            onChange={handleChange}
          />
        </div>

        {/* Gender */}
        <div className="mb-3">
          <label>Gender</label>
          <select
            className="form-control"
            name="gender"
            value={profile.gender}
            onChange={handleChange}
          >
            <option value="">Select Gender</option>
            <option value="Male">Male</option>
            <option value="Female">Female</option>
            <option value="Other">Other</option>
          </select>
        </div>
        <div
          style={{
            display: "flex",
            alignItems: "end",
            justifyContent: "end",
          }}
        >
          <button className="btn btn-primary mt-2" type="submit">
            Save Changes
          </button>
          <button
            className="btn btn-secondary fw-semibold mt-2 ml-2"
            onClick={back}
          >
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
}

export default Edit_profile;
