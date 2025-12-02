import React, { useEffect, useState } from "react";
import Navebar from "../components/navebar";
import axios from "axios";

function Home2() {
  const [trains, setTrains] = useState([]);
  const [filteredTrains, setFilteredTrains] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [from, setFrom] = useState("");
  const [to, setTo] = useState("");

  useEffect(() => {
    const token = localStorage.getItem("token");

    if (!token) {
      window.location.href = "/login";
      return;
    }

    axios
      .get("http://127.0.0.1:8000/api/trains/", {
        headers: {
          Authorization: `Token ${token}`,
        },
      })
      .then((response) => {
        const sortedData = response.data.sort((a, b) => b.id - a.id);
        setTrains(sortedData);
        setFilteredTrains(sortedData);
        setLoading(false);
      })
      .catch((error) => {
        console.error(error);
        setError("Error fetching train data");
        setLoading(false);
      });
  }, []);

  const handleSearch = () => {
    let results = trains;

    if (from.trim() !== "") {
      results = results.filter((t) =>
        t.from_place.toLowerCase().includes(from.toLowerCase())
      );
    }

    if (to.trim() !== "") {
      results = results.filter((t) =>
        t.to_place.toLowerCase().includes(to.toLowerCase())
      );
    }

    setFilteredTrains(results);
  };
  const handleRefresh = () => {
    setFrom("");
    setTo("");
    setFilteredTrains(trains); // Show all trains again
  };

  if (loading) return <h2>Loading trains...</h2>;
  if (error) return <h3 style={{ color: "red" }}>{error}</h3>;

  return (
    <div>
      <Navebar />

      <div className="container mt-5">
        <h2 className="text-center fw-bold mb-4">Search Trains</h2>

        {/* Search Form */}
        <div className="card shadow-sm p-4 mb-5">
          <div className="row g-3">
            <div className="col-md-5">
              <label className="form-label">From</label>
              <input
                type="text"
                className="form-control"
                placeholder="Enter starting place"
                value={from}
                onChange={(e) => setFrom(e.target.value)}
              />
            </div>

            <div className="col-md-5">
              <label className="form-label">To</label>
              <input
                type="text"
                className="form-control"
                placeholder="Enter destination"
                value={to}
                onChange={(e) => setTo(e.target.value)}
              />
            </div>

            <div className="col-md-2 d-flex align-items-end">
              <button className="btn btn-primary w-100" onClick={handleSearch}>
                Search
              </button>
              <button
                className="btn btn-secondary w-100"
                onClick={handleRefresh}
              >
                Reset
              </button>
            </div>
          </div>
        </div>

        {/* Train List */}
        <h2 className="text-center mb-4 fw-bold">Available Trains</h2>

        <div className="row">
          {filteredTrains.map((train) => (
            <div key={train.id} className="col-md-6 mb-4">
              <div className="card shadow-sm border-0 rounded-4">
                <div className="card-body">
                  <div className="d-flex justify-content-between align-items-center">
                    <h4 className="card-title mb-0">{train.train_name}</h4>

                    <span
                      className={`badge px-3 py-2 ${
                        train.is_active ? "bg-success" : "bg-secondary"
                      }`}
                    >
                      {train.is_active ? "Active" : "Inactive"}
                    </span>
                  </div>

                  <p className="text-muted mt-2">
                    Train No: <strong>{train.train_number}</strong>
                  </p>

                  <p className="mt-3">
                    <strong>Route:</strong> {train.from_place} →{" "}
                    {train.to_place}
                  </p>

                  <p className="mb-1">
                    <strong>Departure:</strong> {train.departure_time}
                  </p>

                  <p>
                    <strong>Arrival:</strong> {train.arrival_time}
                  </p>

                  <h5 className="text-primary fw-bold mt-3">
                    ₹ {train.ticket_price}
                  </h5>

                  <p className="text-muted">
                    Seats Available:{" "}
                    <strong>
                      {train.available_seats}/{train.total_seats}
                    </strong>
                  </p>

                  <button
                    className="btn btn-primary w-100 mt-3"
                    onClick={() => (window.location.href = `/book/${train.id}`)}
                  >
                    Book Now
                  </button>
                </div>
              </div>
            </div>
          ))}

          {filteredTrains.length === 0 && (
            <h4 className="text-center text-danger mt-4">
              No trains found for this route
            </h4>
          )}
        </div>
      </div>
    </div>
  );
}

export default Home2;
