import React from "react";
import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

function Profile() {
  const [profile, setProfile] = useState(null);
  const navigate = useNavigate();
  useEffect(() => {
    const token = localStorage.getItem("token");
    axios
      .get("http://127.0.1:8000/api/profile/", {
        headers: { Authorization: `Token ${token}` },
      })
      .then((res) => setProfile(res.data))
      .catch((err) => console.log(err));
  }, []);
  function handleEdit() {
    navigate("/edit_profile");

    // alert("Currently not editable");
  }
  function back() {
    navigate("/home2");
  }

  if (profile) {
    return (
      <div className="container mt-5">
        <button className="btn btn-secondary fw-semibold " onClick={back}>
          <h1>
            <span>&#8592;</span>
          </h1>
        </button>
        <h2 className="fw-bold">User Profile</h2>
        <div className="card p-4 shadow mt-4">
          <p>
            <strong>Name:</strong> {profile.name}
          </p>
          <p>
            <strong>Email:</strong> {profile.email}
          </p>
          <p>
            <strong>Phone Numbeer:</strong> {profile.phone_number}
          </p>
          <p>
            <strong>Age:</strong> {profile.age}
          </p>
          <p>
            <strong>Address:</strong> {profile.address}
          </p>
          <p>
            <strong>Gender:</strong> {profile.gender}
          </p>
          <div
            style={{
              display: "flex",
              alignItems: "end",
              justifyContent: "end",
            }}
          >
            <button
              className="btn btn-primary p-2 col-6 col-lg-3"
              onClick={() => handleEdit()}
            >
              Edit Profile
            </button>
          </div>
        </div>
      </div>
    );
  }

  return <div></div>;
}

export default Profile;
