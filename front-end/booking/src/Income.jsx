import React, { useState } from "react";
import axios from "axios";
import Navbar from "./NavBar";

const Income = () => {
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [incomeData, setIncomeData] = useState(null);
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!startDate || !endDate) {
      setError("Both start date and end date are required.");
      return;
    }

    try {
      const response = await axios.get(
        "https://back-end-ruvee-nature-therapy.fly.dev/income/view-by-period",
        {
          params: { startDate, endDate },
        }
      );

      setIncomeData(response.data);
      setError("");
    } catch (err) {
      console.error("Error fetching income data:", err);
      setError("Error fetching income data.");
    }
  };

  return (
    <>
      <Navbar />
      <div className="container my-4">
        <h2 className="text-center mb-4">View Total Income</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label htmlFor="startDate" className="form-label">
              Start Date
            </label>
            <input
              type="date"
              id="startDate"
              className="form-control"
              value={startDate}
              onChange={(e) => setStartDate(e.target.value)}
              required
            />
          </div>

          <div className="mb-3">
            <label htmlFor="endDate" className="form-label">
              End Date
            </label>
            <input
              type="date"
              id="endDate"
              className="form-control"
              value={endDate}
              onChange={(e) => setEndDate(e.target.value)}
              required
            />
          </div>

          <div className="d-grid gap-2">
            <button type="submit" className="btn btn-primary">
              Submit
            </button>
          </div>
        </form>

        {error && <div className="alert alert-danger mt-3">{error}</div>}

        {incomeData && (
          <div className="mt-4">
            
            <h4>Income Details:</h4>
            <div className="list-group">
              {incomeData.income_details.map((income, index) => (
                <div
                  key={index}
                  className="list-group-item d-flex justify-content-between"
                >
                  <div>
                    <b>Type: </b> {income.massage_type} <br />
                    <small><b>Date: </b>{new Date(income.date).toLocaleDateString()}</small>
                  </div>
                  <div className="fw-bold">LKR {income.price}</div>
                </div>
              ))}
            </div>
            <h4 className="py-4">Total Income: LKR {incomeData.total_income}</h4>
            
          </div>
        )}
      </div>
    </>
  );
};

export default Income;
