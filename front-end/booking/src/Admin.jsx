import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Navbar from './NavBar';

const Admin = () => {
  // State for Massages and Employees data
  const [massages, setMassages] = useState([]);
  const [employees, setEmployees] = useState([]);
  
  // State for creating/updating Massages and Employees
  const [massageDetails, setMassageDetails] = useState({
    massage_type: '',
    duration: '',
    price: '',
    therapist_pay: ''
  });
  
  const [employeeDetails, setEmployeeDetails] = useState({
    username: '',
    password: '',
    employee_name: '',
    employee_contact: '',
    employee_type: ''
  });

  const [selectedMassageId, setSelectedMassageId] = useState(null);
  const [selectedEmployeeId, setSelectedEmployeeId] = useState(null);
  
  const [isEditingMassage, setIsEditingMassage] = useState(false);
  const [isEditingEmployee, setIsEditingEmployee] = useState(false);

  // Fetch Massages and Employees data
  useEffect(() => {
    fetchMassages();
    fetchEmployees();
  }, []);

  const fetchMassages = async () => {
    try {
      const response = await axios.get('https://back-end-ruvee-nature-therapy.fly.dev/massage/view');
      setMassages(response.data);
    } catch (error) {
      console.error('Error fetching massages', error);
    }
  };

  const fetchEmployees = async () => {
    try {
      const response = await axios.get('https://back-end-ruvee-nature-therapy.fly.dev/employee/view');
      setEmployees(response.data);
    } catch (error) {
      console.error('Error fetching employees', error);
    }
  };

  // Massage CRUD operations
  const handleMassageSubmit = async (e) => {
    e.preventDefault();

    try {
      if (isEditingMassage) {
        await axios.put(`https://back-end-ruvee-nature-therapy.fly.dev/massage/${selectedMassageId}`, massageDetails);
        alert('Massage updated successfully!');
      } else {
        await axios.post('https://back-end-ruvee-nature-therapy.fly.dev/massage/add', massageDetails);
        alert('Massage added successfully!');
      }
      fetchMassages();
      resetMassageForm();
    } catch (error) {
      console.error('Error submitting massage', error);
      alert('Error processing massage!');
    }
  };

  const handleMassageDelete = async (id) => {
    try {
      await axios.delete(`https://back-end-ruvee-nature-therapy.fly.dev/massage/${id}`);
      alert('Massage deleted successfully!');
      fetchMassages();
    } catch (error) {
      console.error('Error deleting massage', error);
      alert('Error deleting massage!');
    }
  };

  const resetMassageForm = () => {
    setMassageDetails({
      massage_type: '',
      duration: '',
      price: '',
      therapist_pay: ''
    });
    setIsEditingMassage(false);
    setSelectedMassageId(null);
  };

  // Employee CRUD operations
  const handleEmployeeSubmit = async (e) => {
    e.preventDefault();

    try {
      if (isEditingEmployee) {
        await axios.put(`https://back-end-ruvee-nature-therapy.fly.dev/employee/${selectedEmployeeId}`, employeeDetails);
        alert('Employee updated successfully!');
      } else {
        await axios.post('https://back-end-ruvee-nature-therapy.fly.dev/employee/add', employeeDetails);
        alert('Employee added successfully!');
      }
      fetchEmployees();
      resetEmployeeForm();
    } catch (error) {
      console.error('Error submitting employee', error);
      alert('Error processing employee!');
    }
  };

  const handleEmployeeDelete = async (id) => {
    try {
      await axios.delete(`https://back-end-ruvee-nature-therapy.fly.dev/employee/${id}`);
      alert('Employee deleted successfully!');
      fetchEmployees();
    } catch (error) {
      console.error('Error deleting employee', error);
      alert('Error deleting employee!');
    }
  };

  const resetEmployeeForm = () => {
    setEmployeeDetails({
      username: '',
      password: '',
      employee_name: '',
      employee_contact: '',
      employee_type: ''
    });
    setIsEditingEmployee(false);
    setSelectedEmployeeId(null);
  };

  return (
    <>
    <Navbar/>
    <div className="container">
      <h1>Admin Dashboard</h1>

      {/* Massage CRUD Operations */}
      <h2>Manage Massages</h2>
      <form onSubmit={handleMassageSubmit}>
        <div className="form-group">
          <label>Massage Type</label>
          <input
            type="text"
            className="form-control"
            value={massageDetails.massage_type}
            onChange={(e) => setMassageDetails({ ...massageDetails, massage_type: e.target.value })}
            required
          />
        </div>
        <div className="form-group">
          <label>Duration (in minutes)</label>
          <input
            type="number"
            className="form-control"
            value={massageDetails.duration}
            onChange={(e) => setMassageDetails({ ...massageDetails, duration: e.target.value })}
            required
          />
        </div>
        <div className="form-group">
          <label>Price</label>
          <input
            type="text"
            className="form-control"
            value={massageDetails.price}
            onChange={(e) => setMassageDetails({ ...massageDetails, price: e.target.value })}
            required
          />
        </div>
        <div className="form-group">
          <label>Therapist Pay</label>
          <input
            type="number"
            className="form-control"
            value={massageDetails.therapist_pay}
            onChange={(e) => setMassageDetails({ ...massageDetails, therapist_pay: e.target.value })}
            required
          />
        </div>
        <button type="submit" className="btn btn-primary">
          {isEditingMassage ? 'Update Massage' : 'Add Massage'}
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
              <td>
                <button
                  className="btn btn-warning btn-sm"
                  onClick={() => {
                    setSelectedMassageId(massage._id);
                    setMassageDetails({
                      massage_type: massage.massage_type,
                      duration: massage.duration,
                      price: massage.price,
                      therapist_pay: massage.therapist_pay
                    });
                    setIsEditingMassage(true);
                  }}
                >
                  Edit
                </button>
                <button
                  className="btn btn-danger btn-sm"
                  onClick={() => handleMassageDelete(massage._id)}
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <hr />

      {/* Employee CRUD Operations */}
      <h2>Manage Employees</h2>
      <form onSubmit={handleEmployeeSubmit}>
        <div className="form-group">
          <label>Username</label>
          <input
            type="text"
            className="form-control"
            value={employeeDetails.username}
            onChange={(e) => setEmployeeDetails({ ...employeeDetails, username: e.target.value })}
            required
          />
        </div>
        <div className="form-group">
          <label>Password</label>
          <input
            type="password"
            className="form-control"
            value={employeeDetails.password}
            onChange={(e) => setEmployeeDetails({ ...employeeDetails, password: e.target.value })}
            required
          />
        </div>
        <div className="form-group">
          <label>Employee Name</label>
          <input
            type="text"
            className="form-control"
            value={employeeDetails.employee_name}
            onChange={(e) => setEmployeeDetails({ ...employeeDetails, employee_name: e.target.value })}
            required
          />
        </div>
        <div className="form-group">
          <label>Contact</label>
          <input
            type="text"
            className="form-control"
            value={employeeDetails.employee_contact}
            onChange={(e) => setEmployeeDetails({ ...employeeDetails, employee_contact: e.target.value })}
            required
          />
        </div>
        <div className="form-group">
          <label>Employee Type</label>
          <input
            type="text"
            className="form-control"
            value={employeeDetails.employee_type}
            onChange={(e) => setEmployeeDetails({ ...employeeDetails, employee_type: e.target.value })}
            required
          />
        </div>
        <button type="submit" className="btn btn-primary">
          {isEditingEmployee ? 'Update Employee' : 'Add Employee'}
        </button>
      </form>

      <h3>Employee List</h3>
      <table className="table">
        <thead>
          <tr>
            <th>Username</th>
            <th>Employee Name</th>
            <th>Contact</th>
            <th>Employee Type</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {employees.map((employee) => (
            <tr key={employee._id}>
              <td>{employee.username}</td>
              <td>{employee.employee_name}</td>
              <td>{employee.employee_contact}</td>
              <td>{employee.employee_type}</td>
              <td>
                <button
                  className="btn btn-warning btn-sm"
                  onClick={() => {
                    setSelectedEmployeeId(employee._id);
                    setEmployeeDetails({
                      username: employee.username,
                      password: employee.password,
                      employee_name: employee.employee_name,
                      employee_contact: employee.employee_contact,
                      employee_type: employee.employee_type
                    });
                    setIsEditingEmployee(true);
                  }}
                >
                  Edit
                </button>
                <button
                  className="btn btn-danger btn-sm"
                  onClick={() => handleEmployeeDelete(employee._id)}
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

export default Admin;


