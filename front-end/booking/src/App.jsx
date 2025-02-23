import React from 'react'
import Login from './Login'
import 'bootstrap/dist/css/bootstrap.css';
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Home from './Home';
import BookingForm from './BookingForm';
import BookingView from './BookingView';



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
        </Routes>
      </div>
    </Router>
   </>
  )
}

export default App