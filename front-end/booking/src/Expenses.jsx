import React, { useState, useEffect } from "react";
import axios from "axios";
import Navbar from "./NavBar";

const Expenses = () => {
  const [expense, setExpense] = useState({ expenditure: "", amount: "" });
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [expenses, setExpenses] = useState([]);
  const [loading, setLoading] = useState(false);
  const [dataFetched, setDataFetched] = useState(false);
  const [totalAmount, setTotalAmount] = useState(0); // New state for total expense amount

  const handleChange = (e) => {
    setExpense({ ...expense, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post("https://back-end-ruvee-nature-therapy.fly.dev/expenses/add", expense);
      alert("Expense added successfully!");
      setExpense({ expenditure: "", amount: "" });
    } catch (error) {
      console.error("Error adding expense:", error);
      alert("Failed to add expense");
    }
  };

  const fetchExpenses = async () => {
    if (!startDate || !endDate) {
      alert("Please select both start and end dates.");
      return;
    }

    setLoading(true);
    setDataFetched(true);

    try {
      const response = await axios.get("https://back-end-ruvee-nature-therapy.fly.dev/expenses/view", {
        params: { startDate, endDate },
      });
      setExpenses(response.data);

      // Calculate total amount
      const total = response.data.reduce((sum, exp) => sum + parseFloat(exp.amount), 0);
      setTotalAmount(total);
    } catch (error) {
      console.error("Error fetching expenses:", error);
      alert("Failed to fetch expenses.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Navbar />
      <div className="container mt-4">
        {/* Add Expense Form */}
        <div className="card p-4 mb-4">
          <h4>Add Expense</h4>
          <form onSubmit={handleSubmit}>
            <div className="mb-3">
              <label className="form-label">Expenditure</label>
              <input
                type="text"
                className="form-control"
                name="expenditure"
                value={expense.expenditure}
                onChange={handleChange}
                required
              />
            </div>
            <div className="mb-3">
              <label className="form-label">Amount</label>
              <input
                type="number"
                className="form-control"
                name="amount"
                value={expense.amount}
                onChange={handleChange}
                required
              />
            </div>
            <button type="submit" className="btn btn-primary">
              Add Expense
            </button>
          </form>
        </div>

        {/* View Expenses by Date Range */}
        <div className="card p-4">
          <h4>View Expenses</h4>
          <div className="row mb-3">
            <div className="col">
              <label className="form-label">Start Date</label>
              <input
                type="date"
                className="form-control"
                value={startDate}
                onChange={(e) => setStartDate(e.target.value)}
                required
              />
            </div>
            <div className="col">
              <label className="form-label">End Date</label>
              <input
                type="date"
                className="form-control"
                value={endDate}
                onChange={(e) => setEndDate(e.target.value)}
                required
              />
            </div>
            <div className="col align-self-end">
              <button className="btn btn-success w-100" onClick={fetchExpenses}>
                View Expenses
              </button>
            </div>
          </div>

          {/* Expenses Table */}
          {loading ? (
            <p>Loading...</p>
          ) : dataFetched && expenses.length > 0 ? (
            <>
              <table className="table table-bordered mt-3">
                <thead>
                  <tr>
                    <th>#</th>
                    <th>Expenditure</th>
                    <th>Amount</th>
                    <th>Date</th>
                  </tr>
                </thead>
                <tbody>
                  {expenses.map((exp, index) => (
                    <tr key={index}>
                      <td>{index + 1}</td>
                      <td>{exp.expenditure}</td>
                      <td>LKR {exp.amount}</td>
                      <td>{new Date(exp.date).toLocaleDateString("en-CA")}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
              <h5 className="mt-3">Total Expenses: LKR {totalAmount.toFixed(2)}</h5>
            </>
          ) : dataFetched && expenses.length === 0 ? (
            <p className="mt-3 text-muted">No expenses found for the selected period.</p>
          ) : null}
        </div>
      </div>
    </>
  );
};

export default Expenses;
