// import React, { useState, useEffect } from "react";
// import { useNavigate } from "react-router-dom";
// import axios from "axios";
// import Navbar from "./NavBar.jsx"; // Import Navbar
// import "./BookingForm.css";

// const BookingForm = () => {
//     const navigate = useNavigate();

//     const [formData, setFormData] = useState({
//         customer_name: "",
//         customer_contact_no: "",
//         massage_type: "",
//         duration: "",
//         date: "",
//         time: "",
//         therapist_id: "",
//         price: ""
//     });

//     const [therapists, setTherapists] = useState([]);
//     const [loading, setLoading] = useState(false);
//     const [error, setError] = useState(null);

//     // const massageOptions = [
//     //     { type: "Full Body Massage (60 min)", duration: 60, price: 2500 },
//     //     { type: "Full Body Massage (80 min)", duration: 80, price: 2900 },
//     //     { type: "Intensive Massage (60 min)", duration: 60, price: 2500 },
//     //     { type: "Thermo Massage (80 min)", duration: 80, price: 2900 },
//     //     { type: "Mind Stress Calm Treatment (40 min)", duration: 40, price: 1800 },
//     //     { type: "Back, Spine, Neck & Shoulder Pain Massage (40 min)", duration: 40, price: 1800 },
//     //     { type: "Foot, Legs, Thigh & Breech Relax Massage (40 min)", duration: 40, price: 1800 },
//     //     { type: "Head & Face Massage (30 min)", duration: 30, price: 1500 },
//     //     { type: "Back & Legs (30 min)", duration: 30, price: 1500 },
//     //     { type: "Head & Shoulder (30 min)", duration: 30, price: 1500 },
//     //     { type: "Back & Shoulder (30 min)", duration: 30, price: 1500 },
//     //     { type: "Ruvee Nature Special Massage (30 min)", duration: 30, price: 1500 },
//     // ];

//     const massageOptions = [
//         { type: "Full Body Massage (60 min)", duration: 60, price: 2500, therapist_pay: 1200 },
//         { type: "Full Body Massage (80 min)", duration: 80, price: 2900, therapist_pay: 1500 },
//         { type: "Intensive Massage (60 min)", duration: 60, price: 2500, therapist_pay: 1200 },
//         { type: "Thermo Massage (80 min)", duration: 80, price: 2900, therapist_pay: 1500 },
//         { type: "Mind Stress Calm Treatment (40 min)", duration: 40, price: 1800, therapist_pay: 900 },
//         { type: "Back, Spine, Neck & Shoulder Pain Massage (40 min)", duration: 40, price: 1800, therapist_pay: 900 },
//         { type: "Foot, Legs, Thigh & Breech Relax Massage (40 min)", duration: 40, price: 1800, therapist_pay: 900 },
//         { type: "Head & Face Massage (30 min)", duration: 30, price: 1500, therapist_pay: 750 },
//         { type: "Back & Legs (30 min)", duration: 30, price: 1500, therapist_pay: 750 },
//         { type: "Head & Shoulder (30 min)", duration: 30, price: 1500, therapist_pay: 750 },
//         { type: "Back & Shoulder (30 min)", duration: 30, price: 1500, therapist_pay: 750 },
//         { type: "Ruvee Nature Special Massage (30 min)", duration: 30, price: 1500, therapist_pay:750 },
//     ];
    
//     useEffect(() => {
//         const fetchTherapists = async () => {
//             try {
//                 const response = await axios.get("http://localhost:3000/employee/view");
//                 setTherapists(response.data);
//             } catch (err) {
//                 console.error("Error fetching therapists", err);
//                 setError("Failed to load therapists");
//             }
//         };
//         fetchTherapists();
//     }, []);

//     const handleChange = (e) => {
//         setFormData({ ...formData, [e.target.name]: e.target.value });
//     };


//     const handleMassageChange = (e) => {
//         const selectedMassage = massageOptions.find(m => m.type === e.target.value);
//         if (selectedMassage) {
//             setFormData({
//                 ...formData,
//                 massage_type: selectedMassage.type,
//                 duration: selectedMassage.duration,
//                 price: selectedMassage.price
//             });
//         } else {
//             console.error("Massage type not found: ", e.target.value);
//         }
//     };
    
//     const handleTherapistChange = (e) => {
//         const selectedTherapist = therapists.find(therapist => therapist._id === e.target.value);
//         setFormData({
//             ...formData,
//             therapist_id: selectedTherapist._id,
//             therapist_name: selectedTherapist.employee_name
//         });
//     };

//     const handleSubmit = async (e) => {
//         e.preventDefault();
//         setLoading(true);
//         setError(null);
    
//         // Check the form data before sending it
//         console.log(formData);
    
//         try {
//             const response = await axios.post("http://localhost:3000/booking/add", formData);
//             alert("Booking Successful!");
//             console.log(response.data);
//             navigate("/bookings");
//         } catch (error) {
//             setError("Booking Failed. Please try again.");
//             console.error(error);
//         } finally {
//             setLoading(false);
//         }
//     };
    
//     return (
//         <>
//         <Navbar />
//         <div className="booking-container">
//             {/* Add the navigation bar at the top */}
            
//             <h2>Massage Booking</h2>
//             {error && <p className="error">{error}</p>}
//             <form onSubmit={handleSubmit} className="booking-form">
//                 <input type="text" name="customer_name" placeholder="Customer Name" onChange={handleChange} required />
//                 <input type="text" name="customer_contact_no" placeholder="Contact Number" onChange={handleChange} required />

//                 <select name="massage_type" onChange={handleMassageChange} required>
//                     <option value="">Select Massage Type</option>
//                     {massageOptions.map((option, index) => (
//                         <option key={index} value={option.type}>{option.type}</option>
//                     ))}
//                 </select>

//                 <input type="text" name="duration" value={formData.duration} placeholder="Duration (auto-filled)" readOnly />
//                 <input type="date" name="date" onChange={handleChange} required />
//                 <input type="time" name="time" onChange={handleChange} required />
//                 <input type="text" name="price" value={formData.price} placeholder="Price (auto-filled)" readOnly />

//                 <select name="therapist_id" onChange={handleTherapistChange} required>
//                     <option value="">Select Therapist</option>
//                     {therapists.map((therapist) => (
//                         <option key={therapist._id} value={therapist._id}>{therapist.employee_name}</option>
//                     ))}
//                 </select>

//                 <button type="submit" disabled={loading}>{loading ? "Booking..." : "Book Now"}</button>
//             </form>
//         </div>
//         </>
//     );
// };

// export default BookingForm;

import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Navbar from "./NavBar.jsx"; // Import Navbar
import "./BookingForm.css";

const BookingForm = () => {
    const navigate = useNavigate();

    const [formData, setFormData] = useState({
        customer_name: "",
        customer_contact_no: "",
        massage_type: "",
        duration: "",
        date: "",
        time: "",
        therapist_id: "",
        price: ""
    });

    const [therapists, setTherapists] = useState([]);
    const [massageTypes, setMassageTypes] = useState([]); // For storing massages from database
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    // Fetch therapists and massage types
    useEffect(() => {
        const fetchData = async () => {
            try {
                const therapistsResponse = await axios.get("http://localhost:3000/employee/view");
                const massagesResponse = await axios.get("http://localhost:3000/massage/view");

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
                price: selectedMassage.price
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

        // Check the form data before sending it
        console.log(formData);

        try {
            const response = await axios.post("http://localhost:3000/booking/add", formData);
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
                        name="customer_contact_no"
                        placeholder="Contact Number"
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
                        placeholder="Price (auto-filled)"
                        readOnly
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

