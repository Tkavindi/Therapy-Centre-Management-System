import React from 'react'
import Login from './Login'
import 'bootstrap/dist/css/bootstrap.css';
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Home from './Home';
import BookingForm from './BookingForm';
import BookingView from './BookingView';
import Income from './Income';
import Salary from './Salary';
import Expenses from './Expenses';
import Admin from './Admin';
import ManageEmployee from './ManageEmployee';
import ManageMassage from './ManageMassage';



function App() {
  return (
   <>
    <Router>
      <div>
        <Routes>
          <Route path="/" element={<Login />} /> 
          <Route path="/home" element={<Home />} />
          <Route path="/book" element={<BookingForm/>}></Route>
          <Route path="/bookings" element={<BookingView/>}></Route>
          <Route path="/income" element={<Income/>} />
          <Route path="/salary" element={<Salary/>} />
          <Route path="/expenses" element={<Expenses/>} />
          <Route path="/admin" element={<Admin/>} />
          <Route path="/admin/manage_employees" element={<ManageEmployee/>} />
          <Route path="/admin/manage_massage" element={<ManageMassage/>} />

        </Routes>
      </div>
    </Router>
   </>
  )
}

export default App