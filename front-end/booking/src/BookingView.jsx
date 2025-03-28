import React, { useState, useEffect } from "react";
import axios from "axios";
import Navbar from "./NavBar";
import "bootstrap/dist/css/bootstrap.min.css"; // Ensure Bootstrap is imported

const BookingView = () => {
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [filteredBookings, setFilteredBookings] = useState([]);
  const [totalBookings, setTotalBookings] = useState(0); // New state for total bookings count

  useEffect(() => {
    const fetchBookings = async () => {
      setLoading(true);
      setError(null);
      try {
        const response = await axios.get("https://back-end-ruvee-nature-therapy.fly.dev/booking/view");
        setBookings(response.data);

        // Get current month and year
        const today = new Date();
        const currentMonth = today.getMonth();
        const currentYear = today.getFullYear();

        // Filter bookings for the current month
        const currentMonthBookings = response.data.filter((booking) => {
          const bookingDate = new Date(booking.date);
          return (
            bookingDate.getMonth() === currentMonth && bookingDate.getFullYear() === currentYear
          );
        });

        setFilteredBookings(currentMonthBookings);
        setTotalBookings(currentMonthBookings.length); // Update total bookings count
      } catch (err) {
        setError("Failed to load bookings");
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchBookings();
  }, []);

  const handleFilterSubmit = () => {
    if (startDate && endDate) {
      const filtered = bookings.filter((booking) => {
        const bookingDate = new Date(booking.date);
        const start = new Date(startDate);
        const end = new Date(endDate);
        return bookingDate >= start && bookingDate <= end;
      });
      setFilteredBookings(filtered);
      setTotalBookings(filtered.length); // Update count based on filtered data
    } else {
      setFilteredBookings(bookings);
      setTotalBookings(bookings.length);
    }
  };

  const handleStatusChange = async (bookingId, newStatus) => {
    try {
      await axios.put(`https://back-end-ruvee-nature-therapy.fly.dev/booking/complete/${bookingId}`, {
        status: newStatus,
      });

      setBookings((prevBookings) =>
        prevBookings.map((booking) =>
          booking._id === bookingId ? { ...booking, status: newStatus } : booking
        )
      );

      setFilteredBookings((prevFiltered) =>
        prevFiltered.map((booking) =>
          booking._id === bookingId ? { ...booking, status: newStatus } : booking
        )
      );
    } catch (error) {
      setError("Failed to update booking status");
      console.error(error);
    }
  };

  return (
    <>
      <Navbar />
      <div className="container mt-4">
        <h2 className="text-center mb-4">Bookings</h2>

        {/* Date Filter Section */}
        <div className="row g-3 mb-4">
          <div className="col-12 col-md-6">
            <div className="form-group">
              <label className="fw-bold">Start Date:</label>
              <input
                type="date"
                className="form-control"
                value={startDate}
                onChange={(e) => setStartDate(e.target.value)}
              />
            </div>
          </div>
          <div className="col-12 col-md-6">
            <div className="form-group">
              <label className="fw-bold">End Date:</label>
              <input
                type="date"
                className="form-control"
                value={endDate}
                onChange={(e) => setEndDate(e.target.value)}
              />
            </div>
          </div>
        </div>

        <div className="d-flex justify-content-center">
          <button className="btn btn-primary w-100" onClick={handleFilterSubmit}>
            Show Bookings
          </button>
        </div>

        {/* Error Message */}
        {error && <p className="text-danger text-center mt-3">{error}</p>}

        {/* Loading Indicator */}
        {loading ? (
          <p className="text-center">Loading...</p>
        ) : (
          <>
            {filteredBookings.length === 0 ? (
              <p className="text-center text-muted mt-3">
                No bookings found for the selected time period.
              </p>
            ) : (
              <div className="table-responsive">
                <table className="table table-bordered table-striped mt-4">
                  <thead className="table-dark">
                    <tr>
                      <th>Details</th>
                      <th>Date & Time</th>
                      <th>Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    {filteredBookings.map((booking) => (
                      <tr key={booking._id}>
                        <td>
                          <b>Customer: </b>{booking.customer_name} <br />
                          <b>Type: </b>{booking.massage_type} <br />
                          <b>Therapist: </b>{booking.therapist_name} <br />
                          <b>Status: </b>
                          <span
                            className={`badge ${
                              booking.status === "Pending"
                                ? "bg-warning text-dark"
                                : "bg-success"
                            }`}
                          >
                            {booking.status}
                          </span>
                        </td>
                        <td>
                          {new Date(booking.date).toLocaleDateString()} <br /> {booking.time}
                        </td>
                        <td>
                          <button
                            className={`btn btn-sm ${
                              booking.status === "Pending"
                                ? "btn-success"
                                : "btn-warning"
                            }`}
                            onClick={() =>
                              handleStatusChange(
                                booking._id,
                                booking.status === "Pending" ? "Completed" : "Pending"
                              )
                            }
                          >
                            {booking.status === "Pending"
                              ? "Mark as Completed"
                              : "Mark as Pending"}
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>

                {/* Total Booking Count */}
                <h5 className="mt-3 text-center">
                  Total Bookings: <span className="fw-bold">{totalBookings}</span>
                </h5>
              </div>
            )}
          </>
        )}
      </div>
    </>
  );
};

export default BookingView;
