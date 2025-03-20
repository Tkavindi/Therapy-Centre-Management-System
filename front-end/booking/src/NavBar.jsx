import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Navbar.css"; 

const Navbar = () => {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const navigate = useNavigate();

    const toggleMenu = () => {
        setIsMenuOpen(prevState => !prevState);
    };

    return (
        <nav className={`navbar py-4  ${isMenuOpen ? 'open' : ''}`}>
            <h2>Massage Booking </h2>
            <div className="hamburger" onClick={toggleMenu}>
                <div className="bar"></div>
                <div className="bar"></div>
                <div className="bar"></div>
            </div>
            <ul>
                <li onClick={() => navigate("/book")}>Book Now</li>
                <li onClick={() => navigate("/bookings")}>View Bookings</li>
                <li onClick={() => navigate("/income")}>Income</li>
                <li onClick={() => navigate("/salary")}>Salary</li>
                <li onClick={() => navigate("/expenses")}>Expenses</li>
                
                {/* Admin Dropdown - Shows on Hover */}
                <li className="admin-dropdown">
                    Admin
                    <ul className="dropdown-menu">
                        <li onClick={() => navigate("/admin/manage_employees")}>Manage Employees</li>
                        <li onClick={() => navigate("/admin/manage_massage")}>Manage Massage</li>
                    </ul>
                </li>
            </ul>
        </nav>
    );
};

export default Navbar;
