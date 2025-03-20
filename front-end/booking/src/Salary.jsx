import React, { useState, useEffect } from "react";
import axios from "axios";
import Navbar from "./NavBar";

const Salary = () => {
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [selectedEmployee, setSelectedEmployee] = useState("");
  const [employees, setEmployees] = useState([]);
  const [salaryData, setSalaryData] = useState(null);
  const [error, setError] = useState("");

  // Fetch employees when component loads
  useEffect(() => {
    const fetchEmployees = async () => {
      try {
        const response = await axios.get("http://localhost:3000/employee/view");
        setEmployees(response.data);
      } catch (err) {
        console.error("Error fetching employees:", err);
      }
    };

    fetchEmployees();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Clear previous salary data before new search
    setSalaryData(null);

    if (!startDate || !endDate || !selectedEmployee) {
      setError("Start date, end date, and employee selection are required.");
      return;
    }

    try {
      const response = await axios.get(
        "http://localhost:3000/salary/view-by-period",
        {
          params: { startDate, endDate, employeeName: selectedEmployee },
        }
      );

      if (
        response.data &&
        response.data.salary_details &&
        response.data.salary_details.length > 0
      ) {
        setSalaryData(response.data); // Set the new salary data
        setError(""); // Clear any previous error
      } else {
        setSalaryData(null); // No data found, clear the salary data
        setError("No salaries found for the selected period.");
      }
    } catch (err) {
      console.error("Error fetching salary data:", err);
      setError("No salaries found for the selected period."); // Show error message
    }
  };

  return (
    <>
      <Navbar />
      <div className="container my-4">
        <h2 className="text-center mb-4">View Employee Salaries</h2>

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

          <div className="mb-3">
            <label htmlFor="employee" className="form-label">
              Select Employee
            </label>
            <select
              id="employee"
              className="form-select"
              value={selectedEmployee}
              onChange={(e) => setSelectedEmployee(e.target.value)}
              required
            >
              <option value="">-- Select Employee --</option>
              {employees.map((employee) => (
                <option key={employee._id} value={employee.employee_name}>
                  {employee.employee_name} ({employee.employee_type})
                </option>
              ))}
            </select>
          </div>

          <div className="d-grid gap-2">
            <button type="submit" className="btn btn-primary">
              Submit
            </button>
          </div>
        </form>

        {/* Error message */}
        {error && (
          <div className="alert alert-danger mt-3" role="alert">
            {error}
          </div>
        )}

        {/* Display Salary Data */}
        {salaryData && (
          <div className="mt-4">
            <h4>
              Employee: {salaryData.employee_name} ({salaryData.employee_type})
            </h4>
            

            <h4>Salary Breakdown:</h4>
            <div className="list-group">
              {salaryData.salary_details.map((salary, index) => (
                <div
                  key={index}
                  className="list-group-item d-flex justify-content-between"
                >
                  <div>
                  <b>Type: </b> {salary.massage_type} <br/>
                  <small>
                    <b>Date: </b>
                    {new Date(salary.timestamp).toLocaleDateString()}
                  </small>
                  </div>
                  <div className="fw-bold">LKR {salary.earned_amount}</div>
                </div>
              ))}
            </div>
            <h4 className="py-3">Total Salary: LKR {salaryData.total_salary}</h4>
          </div>
        )}
      </div>
    </>
  );
};

export default Salary;
