import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Navbar from "./NavBar.jsx"; // Import Navbar
import "./BookingForm.css";

const BookingForm = () => {
    const navigate = useNavigate();

    const [formData, setFormData] = useState({
        customer_name: "",
        customer_country: "",
        massage_type: "",
        duration: "",
        date: "",
        time: "",
        therapist_id: "",
        price: ""
    });

    const [therapists, setTherapists] = useState([]);
    const [massageTypes, setMassageTypes] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const therapistsResponse = await axios.get("https://back-end-ruvee-nature-therapy.fly.dev/employee/view");
                const massagesResponse = await axios.get("https://back-end-ruvee-nature-therapy.fly.dev/massage/view");

                setTherapists(therapistsResponse.data);
                setMassageTypes(massagesResponse.data);
            } catch (err) {
                console.error("Error fetching data", err);
                setError("Failed to load data");
            }
        };

        fetchData();
    }, []);

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleMassageChange = (e) => {
        const selectedMassage = massageTypes.find(m => m.massage_type === e.target.value);
        if (selectedMassage) {
            setFormData({
                ...formData,
                massage_type: selectedMassage.massage_type,
                duration: selectedMassage.duration,
                price: selectedMassage.price // Price auto-fills but remains editable
            });
        } else {
            console.error("Massage type not found: ", e.target.value);
        }
    };

    const handleTherapistChange = (e) => {
        const selectedTherapist = therapists.find(therapist => therapist._id === e.target.value);
        setFormData({
            ...formData,
            therapist_id: selectedTherapist._id,
            therapist_name: selectedTherapist.employee_name
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError(null);

        console.log(formData);

        try {
            const response = await axios.post("https://back-end-ruvee-nature-therapy.fly.dev/booking/add", formData);
            alert("Booking Successful!");
            console.log(response.data);
            navigate("/bookings");
        } catch (error) {
            setError("Booking Failed. Please try again.");
            console.error(error);
        } finally {
            setLoading(false);
        }
    };

    return (
        <>
            <Navbar />
            <div className="booking-container col-lg-4">
                <h2>Massage Booking</h2>
                {error && <p className="error">{error}</p>}
                <form onSubmit={handleSubmit} className="booking-form">
                    <input
                        type="text"
                        name="customer_name"
                        placeholder="Customer Name"
                        onChange={handleChange}
                        required
                    />
                    <input
                        type="text"
                        name="customer_country"
                        placeholder="Country"
                        onChange={handleChange}
                        required
                    />

                    <select name="massage_type" onChange={handleMassageChange} required>
                        <option value="">Select Massage Type</option>
                        {massageTypes.map((option, index) => (
                            <option key={index} value={option.massage_type}>
                                {option.massage_type}
                            </option>
                        ))}
                    </select>

                    <input
                        type="text"
                        name="duration"
                        value={formData.duration}
                        placeholder="Duration (auto-filled)"
                        readOnly
                    />
                    <input
                        type="date"
                        name="date"
                        onChange={handleChange}
                        required
                    />
                    <input
                        type="time"
                        name="time"
                        onChange={handleChange}
                        required
                    />
                    <input
                        type="text"
                        name="price"
                        value={formData.price}
                        onChange={handleChange} // Now editable
                        placeholder="Price (auto-filled but editable)"
                    />

                    <select name="therapist_id" onChange={handleTherapistChange} required>
                        <option value="">Select Therapist</option>
                        {therapists.map((therapist) => (
                            <option key={therapist._id} value={therapist._id}>
                                {therapist.employee_name}
                            </option>
                        ))}
                    </select>

                    <button type="submit" disabled={loading}>
                        {loading ? "Booking..." : "Book Now"}
                    </button>
                </form>
            </div>
        </>
    );
};

export default BookingForm;