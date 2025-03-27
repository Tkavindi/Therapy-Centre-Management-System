import React, { useState, useEffect } from 'react';
import axios from 'axios'; // Importing axios
import Navbar from './NavBar';

function ManageEmployee() {
  const [employees, setEmployees] = useState([]);
  const [employeeDetails, setEmployeeDetails] = useState({
    username: '',
    password: '',
    employee_name: '',
    employee_contact: '',
    employee_type: ''
  });

  const [selectedEmployeeId, setSelectedEmployeeId] = useState(null);
  const [isEditingEmployee, setIsEditingEmployee] = useState(false);

  useEffect(() => {
    fetchEmployees();
  }, []);

  const fetchEmployees = async () => {
    try {
      const response = await axios.get('https://back-end-ruvee-nature-therapy.fly.dev/employee/view');
      setEmployees(response.data);
    } catch (error) {
      console.error('Error fetching employees', error);
    }
  };

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
    const confirmDelete = window.confirm('Are you sure you want to delete this employee?');
    if (confirmDelete) {
      try {
        await axios.delete(`https://back-end-ruvee-nature-therapy.fly.dev/employee/${id}`);
        alert('Employee deleted successfully!');
        fetchEmployees();
      } catch (error) {
        console.error('Error deleting employee', error);
        alert('Error deleting employee!');
      }
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
      <Navbar />
      <div className='container'>
        <h1>Admin Dashboard</h1>
        <h2>Manage Employees</h2>
        <form onSubmit={handleEmployeeSubmit}>
          <div className="form-group">
            <label>Username</label>
            <input type="text" className="form-control" value={employeeDetails.username} onChange={(e) => setEmployeeDetails({ ...employeeDetails, username: e.target.value })} required />
          </div>
          <div className="form-group">
            <label>Password</label>
            <input type="password" className="form-control" value={employeeDetails.password} onChange={(e) => setEmployeeDetails({ ...employeeDetails, password: e.target.value })} required />
          </div>
          <div className="form-group">
            <label>Employee Name</label>
            <input type="text" className="form-control" value={employeeDetails.employee_name} onChange={(e) => setEmployeeDetails({ ...employeeDetails, employee_name: e.target.value })} required />
          </div>
          <div className="form-group">
            <label>Contact</label>
            <input type="text" className="form-control" value={employeeDetails.employee_contact} onChange={(e) => setEmployeeDetails({ ...employeeDetails, employee_contact: e.target.value })} required />
          </div>
          <div className="form-group">
            <label>Employee Type</label>
            <input type="text" className="form-control" value={employeeDetails.employee_type} onChange={(e) => setEmployeeDetails({ ...employeeDetails, employee_type: e.target.value })} required />
          </div>
          <button type="submit" className="btn btn-primary d-flex justify-content-center w-100 my-2">
            {isEditingEmployee ? 'Update Employee' : 'Add Employee'}
          </button>
        </form>
        <h3>Employee List</h3>
        <table className="table">
          <thead>
            <tr>
              <th>Employee Name</th>
              <th>Contact</th>
              <th>Employee Type</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {employees.map((employee) => (
              <tr key={employee._id}>
                <td>{employee.employee_name}</td>
                <td>{employee.employee_contact}</td>
                <td>{employee.employee_type}</td>
                <td className='d-lg-flex'>
                  <button className="btn btn-warning mx-2 mt-2" onClick={() => {
                    setSelectedEmployeeId(employee._id);
                    setEmployeeDetails({
                      username: employee.username,
                      password: employee.password,
                      employee_name: employee.employee_name,
                      employee_contact: employee.employee_contact,
                      employee_type: employee.employee_type
                    });
                    setIsEditingEmployee(true);
                  }}>
                    Edit
                  </button>
                  <button className="btn btn-danger mt-2 py-2" onClick={() => handleEmployeeDelete(employee._id)}>
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
}

export default ManageEmployee;
