import React, { useState, useEffect } from "react";
import axios from "axios";
import "./BookingView.css"; 

const BookingView = () => {
    const [bookings, setBookings] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchBookings = async () => {
            setLoading(true);
            setError(null);
            try {
                const response = await axios.get("http://localhost:3000/booking/view");
                setBookings(response.data);
            } catch (err) {
                setError("Failed to load bookings");
                console.error(err);
            } finally {
                setLoading(false);
            }
        };

        fetchBookings();
    }, []);

    const handleStatusChange = async (bookingId, newStatus) => {
        try {
            await axios.put(`http://localhost:3000/booking/complete/${bookingId}`, {
                status: newStatus
            });
            setBookings(prevBookings =>
                prevBookings.map(booking =>
                    booking._id === bookingId ? { ...booking, status: newStatus } : booking
                )
            );
        } catch (error) {
            setError("Failed to update booking status");
            console.error(error);
        }
    };

    return (
        <div className="booking-view-container">
            <h2>All Bookings</h2>
            {error && <p className="error">{error}</p>}
            {loading ? (
                <p>Loading...</p>
            ) : (
                <table className="booking-table">
                    <thead>
                        <tr>
                            <th>Customer Name</th>
                            <th>Massage Type</th>
                            <th>Therapist</th>
                            <th>Date</th>
                            <th>Time</th>
                            <th>Price</th>
                            <th>Status</th>
                            <th>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {bookings.length === 0 ? (
                            <tr>
                                <td colSpan="8">No bookings found.</td>
                            </tr>
                        ) : (
                            bookings.map((booking) => (
                                <tr key={booking._id}>
                                    <td>{booking.customer_name}</td>
                                    <td>{booking.massage_type}</td>
                                    <td>{booking.therapist_name}</td>
                                    <td>{new Date(booking.date).toLocaleDateString()}</td>
                                    <td>{booking.time}</td>
                                    <td>LKR{booking.price}</td>
                                    <td>
                                        <select
                                            value={booking.status}
                                            onChange={(e) => handleStatusChange(booking._id, e.target.value)}
                                        >
                                            <option value="Pending">Pending</option>
                                            <option value="Completed">Completed</option>
                                        </select>
                                    </td>
                                    <td>
                                        <button onClick={() => handleStatusChange(booking._id, booking.status === "Pending" ? "Completed" : "Pending")}>
                                            {booking.status === "Pending" ? "Mark as Completed" : "Mark as Pending"}
                                        </button>
                                    </td>
                                </tr>
                            ))
                        )}
                    </tbody>
                </table>
            )}
        </div>
    );
};

export default BookingView;
