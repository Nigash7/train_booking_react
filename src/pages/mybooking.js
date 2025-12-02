import React, { useEffect, useState } from "react";
import axios from "axios";
import Navebar from "../components/navebar";

function MyBookings() {
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const token = localStorage.getItem("token");

    if (!token) {
      window.location.href = "/login";
      return;
    }

    axios
      .get("http://127.0.0.1:8000/api/user_bookings/", {
        headers: { Authorization: `Token ${token}` },
      })
      .then((res) => {
        setBookings(res.data);
        setLoading(false);
      })
      .catch(() => {
        setError("Failed to load booking list");
        setLoading(false);
      });
  }, []);

  //   -------------------------------
  const handleDownload = (id) => {
    const token = localStorage.getItem("token");

    axios
      .get(`http://127.0.0.1:8000/api/download_ticket/${id}/`, {
        headers: { Authorization: `Token ${token}` },
        responseType: "blob", // IMPORTANT for PDF
      })
      .then((response) => {
        const url = window.URL.createObjectURL(new Blob([response.data]));
        const link = document.createElement("a");
        link.href = url;
        link.setAttribute("download", `ticket_${id}.pdf`);
        document.body.appendChild(link);
        link.click();
      })
      .catch((error) => {
        console.error("PDF Download Failed:", error);
        alert("Unable to download ticket");
      });
  };
  //   -------------------------------

  if (loading) return <h2 className="text-center mt-5">Loading...</h2>;
  if (error) return <h3 className="text-center text-danger">{error}</h3>;

  return (
    <div>
      <Navebar />
      <div className="container mt-4">
        <h2 className="fw-bold text-center mb-4">My Bookings</h2>

        {bookings.length === 0 ? (
          <h4 className="text-center text-muted">No bookings found</h4>
        ) : (
          bookings.map((booking) => (
            <div key={booking.id} className="card p-3 mb-3 shadow-sm">
              <h5 className="fw-bold">{booking.train_name}</h5>
              <p>
                <strong>Booking ID:</strong> {booking.booking_id}
              </p>
              <p>
                <strong>Passenger:</strong> {booking.passenger_name} (
                {booking.passenger_gender}, {booking.passenger_age})
              </p>
              <p>
                <strong>Seats:</strong> {booking.seats}
              </p>
              <p>
                <strong>Total Price:</strong> ₹{booking.total_price}
              </p>
              <p>
                <strong>Date:</strong> {booking.booking_date}
              </p>
              <button
                className="btn btn-success mt-2"
                onClick={() => handleDownload(booking.id)}
              >
                Download Ticket
              </button>
            </div>
          ))
        )}
      </div>
    </div>
  );
}

export default MyBookings;
