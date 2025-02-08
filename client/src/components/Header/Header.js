import './Header.css'
import React from "react";
import { Link } from 'react-router-dom';

function Header() {
  return (
    <div className="header-container">
      <div className="header-title-container">
        <Link to="/" className="header-title-link">
          <h1 className="header-title">Cash Clash</h1>
        </Link>
      </div>
      <div className="home-button-container">
        <Link to="/" className="home-button">
          Home
        </Link>
      </div>
    </div>
  );
}

export default Header