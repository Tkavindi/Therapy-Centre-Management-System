// ManageMassage.jsx
import React, { useState, useEffect } from "react";
import axios from "axios";
import Navbar from "./NavBar";

const ManageMassage = () => {
  const [massages, setMassages] = useState([]);

  const [massageDetails, setMassageDetails] = useState({
    massage_type: "",
    duration: "",
    price: "",
    therapist_pay: "",
  });

  const [selectedMassageId, setSelectedMassageId] = useState(null);
  const [isEditingMassage, setIsEditingMassage] = useState(false);

  useEffect(() => {
    fetchMassages();
  }, []);

  const fetchMassages = async () => {
    try {
      const response = await axios.get("https://back-end-ruvee-nature-therapy.fly.dev/massage/view");
      setMassages(response.data);
    } catch (error) {
      console.error("Error fetching massages", error);
    }
  };

  const handleMassageSubmit = async (e) => {
    e.preventDefault();

    try {
      if (isEditingMassage) {
        await axios.put(
          `https://back-end-ruvee-nature-therapy.fly.dev/massage/${selectedMassageId}`,
          massageDetails
        );
        alert("Massage updated successfully!");
      } else {
        await axios.post("https://back-end-ruvee-nature-therapy.fly.dev/massage/add", massageDetails);
        alert("Massage added successfully!");
      }
      fetchMassages();
      resetMassageForm();
    } catch (error) {
      console.error("Error submitting massage", error);
      alert("Error processing massage!");
    }
  };

  const handleMassageDelete = async (id) => {
    const confirmDelete = window.confirm('Are you sure you want to delete this employee?');
    if(confirmDelete ){
    try {
      await axios.delete(`https://back-end-ruvee-nature-therapy.fly.dev/massage/${id}`);
      alert("Massage deleted successfully!");
      fetchMassages();
    } catch (error) {
      console.error("Error deleting massage", error);
      alert("Error deleting massage!");
    }
  }
  };

  const resetMassageForm = () => {
    setMassageDetails({
      massage_type: "",
      duration: "",
      price: "",
      therapist_pay: "",
    });
    setIsEditingMassage(false);
    setSelectedMassageId(null);
  };

  return (
    <>
      <Navbar />
      <div className="container">
        <h1>Admin Dashboard</h1>

        <h2>Manage Massages</h2>

        <form onSubmit={handleMassageSubmit}>
          <div className="form-group">
            <label>Massage Type</label>
            <input
              type="text"
              className="form-control"
              value={massageDetails.massage_type}
              onChange={(e) =>
                setMassageDetails({
                  ...massageDetails,
                  massage_type: e.target.value,
                })
              }
              required
            />
          </div>
          <div className="form-group">
            <label>Duration (in minutes)</label>
            <input
              type="number"
              className="form-control"
              value={massageDetails.duration}
              onChange={(e) =>
                setMassageDetails({
                  ...massageDetails,
                  duration: e.target.value,
                })
              }
              required
            />
          </div>
          <div className="form-group">
            <label>Price</label>
            <input
              type="text"
              className="form-control"
              value={massageDetails.price}
              onChange={(e) =>
                setMassageDetails({ ...massageDetails, price: e.target.value })
              }
              required
            />
          </div>
          <div className="form-group">
            <label>Therapist Pay</label>
            <input
              type="number"
              className="form-control"
              value={massageDetails.therapist_pay}
              onChange={(e) =>
                setMassageDetails({
                  ...massageDetails,
                  therapist_pay: e.target.value,
                })
              }
              required
            />
          </div>
          <button type="submit" className="btn btn-primary d-flex justify-content-center w-100 my-2">
            {isEditingMassage ? "Update Massage" : "Add Massage"}
          </button>
        </form>

        <h3>Massage List</h3>
        <table className="table">
          <thead>
            <tr>
              <th>Massage Type</th>
              <th>Duration</th>
              <th>Price</th>
              <th>Therapist Pay</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {massages.map((massage) => (
              <tr key={massage._id}>
                <td>{massage.massage_type}</td>
                <td>{massage.duration} min</td>
                <td>LKR{massage.price}</td>
                <td>LKR{massage.therapist_pay}</td>
                <td className="d-lg-flex">
                  <button
                    className="btn btn-warning mx-2 mt-2"
                    onClick={() => {
                      setSelectedMassageId(massage._id);
                      setMassageDetails({
                        massage_type: massage.massage_type,
                        duration: massage.duration,
                        price: massage.price,
                        therapist_pay: massage.therapist_pay,
                      });
                      setIsEditingMassage(true);
                    }}
                  >
                    Edit
                  </button>
                  <button
                    className="btn btn-danger py-2 mt-2"
                    onClick={() => handleMassageDelete(massage._id)}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
};

export default ManageMassage;
