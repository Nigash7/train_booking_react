import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import Navebar from "../components/navebar";
import { Link } from "react-router-dom";
function BookingPage() {
  const { id } = useParams(); // train_id
  const navigate = useNavigate();

  const [train, setTrain] = useState(null);
  const [loading, setLoading] = useState(true);

  const [passengerName, setPassengerName] = useState("");
  const [passengerAge, setPassengerAge] = useState("");
  const [passengerGender, setPassengerGender] = useState("");
  const [seats, setSeats] = useState(1);

  const [message, setMessage] = useState("");

  useEffect(() => {
    const token = localStorage.getItem("token");

    if (!token) {
      navigate("/login");
      return;
    }

    axios
      .get(`http://127.0.0.1:8000/api/train_id/${id}/`)
      .then((res) => {
        setTrain(res.data);
        setLoading(false);
      })
      .catch(() => {
        setMessage("Train not found");
        setLoading(false);
      });
  }, [id]);

  const handleBooking = () => {
    const token = localStorage.getItem("token");

    if (!passengerName || !passengerAge || !passengerGender || !seats) {
      setMessage("All fields are required");
      return;
    }

    axios
      .post(
        "http://127.0.0.1:8000/api/book_ticket/",
        {
          train_id: Number(id),
          seats: Number(seats),
          passenger_name: passengerName,
          passenger_age: Number(passengerAge),
          passenger_gender: passengerGender,
        },
        {
          headers: {
            Authorization: `Token ${token}`,
          },
        }
      )
      .then((res) => {
        alert("Booking Successful! Booking ID: " + res.data.booking_id);
        navigate("/mybooking");
      })
      .catch((error) => {
        console.log(error);
        setMessage("Booking failed. Try again.");
      });
  };

  if (loading) return <h2>Loading...</h2>;

  return (
    <div>
      <Navebar />

      <div className="container mt-5">
        <h2 className="fw-bold text-center mb-4">Train Booking</h2>

        {train && (
          <div className="card p-4 shadow-sm">
            <h3>{train.train_name}</h3>
            <p>
              <strong>Route:</strong> {train.from_place} → {train.to_place}
            </p>
            <p>
              <strong>Departure:</strong> {train.departure_time}
            </p>
            <p>
              <strong>Price:</strong> ₹ {train.ticket_price}
            </p>
            <p>
              <strong>Available Seats:</strong> {train.available_seats}
            </p>
          </div>
        )}

        <div className="card p-4 mt-4 shadow-sm">
          <h4 className="mb-3">Passenger Details</h4>

          {message && <p className="text-danger">{message}</p>}

          <div className="mb-3">
            <label className="form-label">Passenger Name</label>
            <input
              type="text"
              className="form-control"
              value={passengerName}
              onChange={(e) => setPassengerName(e.target.value)}
            />
          </div>

          <div className="mb-3">
            <label className="form-label">Passenger Age</label>
            <input
              type="number"
              className="form-control"
              value={passengerAge}
              onChange={(e) => setPassengerAge(e.target.value)}
            />
          </div>

          <div className="mb-3">
            <label className="form-label">Gender</label>
            <select
              className="form-control"
              value={passengerGender}
              onChange={(e) => setPassengerGender(e.target.value)}
            >
              <option value="">Select gender</option>
              <option value="Male">Male</option>
              <option value="Female">Female</option>
              <option value="Other">Other</option>
            </select>
          </div>

          <div className="mb-3">
            <label className="form-label">Number of Seats</label>
            <input
              type="number"
              className="form-control"
              value={seats}
              onChange={(e) => setSeats(e.target.value)}
              min="1"
            />
          </div>

          <button className="btn btn-primary w-100" onClick={handleBooking}>
            Confirm Booking
          </button>
        </div>
      </div>
    </div>
  );
}

export default BookingPage;
