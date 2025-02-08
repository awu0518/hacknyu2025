import './Header.css'
import React from "react";
import { Link } from 'react-router-dom';

function Header() { 
    return (
        <div className="header-container">
        <div className="header-title-container">
          <Link to='/'>
            <h1 style={{ userSelect: 'text' }} className="header-title">Stock thingy</h1>
          </Link>
        </div>
      </div>
    )
}

export default Header