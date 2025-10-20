import React from 'react';
import { Link } from 'react-router-dom';

const Navbar = () => {
  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark" style={{ minHeight: '40px' }}>
      <div className="container">
        {/* brand */}
        <Link className="navbar-brand" to="/home">
          <img 
            src="/images/epc_logo.png" 
            alt="Exotic Pet Co." 
            className="d-inline-block align-top"
            style={{ height: '40px' }}
          />
        </Link>

        {/* mobile toggle button */}
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarNav"
          aria-controls="navbarNav"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        {/* navigation links */}
        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav me-auto">
            <li className="nav-item me-4">
              <Link className="nav-link" to="/purchase">
                Browse Collection
              </Link>
            </li>
            <li className="nav-item me-4">
              <Link className="nav-link" to="/about">
                About Us
              </Link>
            </li>
            <li className="nav-item me-4">
              <Link className="nav-link" to="/legal">
                Legal
              </Link>
            </li>
            <li className="nav-item me-4">
              <Link className="nav-link" to="/contactUs">
                Contact Us
              </Link>
            </li>
          </ul>

          {/* shopping cart icon */}
          <div className="navbar-nav">
            <Link className="nav-link" to="/purchase/viewOrder">
              <i className="fas fa-shopping-cart fa-lg"></i>
              <span className="ms-1">Cart</span>
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
