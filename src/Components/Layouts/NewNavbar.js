import React, { useState } from "react";
import { Link } from "react-router-dom";


const NewNavbar = () => {
  const [isNavOpen, setIsNavOpen] = useState(false);


  const handleToggle = () => {
    setIsNavOpen(!isNavOpen);
  };

 

  return (
    <nav className="navbar navbar-expand-md navbar-inverse">
      <button
        className="navbar-toggler"
        type="button"
        onClick={handleToggle}
        aria-controls="ForestTimemenu"
        aria-expanded={isNavOpen}
        aria-label="Toggle navigation"
      >
        <span className="navbar-toggler-icon"></span>
      </button>
      <div
        className={`collapse navbar-collapse ${isNavOpen ? "show" : ""}`}
        id="ForestTimemenu"
      >
        <ul className="navbar-nav mx-auto">
          {/* Anasayfa Dropdown */}
          <li className="nav-item">
            <Link className="nav-link color-green-hover" to="/">
            홈
            </Link>
          </li>

          <li className="nav-item">
            <Link className="nav-link color-green-hover" to="/cumhurbaskanligi">
               주거용
            </Link>
          </li>
          <li className="nav-item">
            <Link className="nav-link color-green-hover" to="/bakanliklar">
              사무실
            </Link>
          </li>
          <li className="nav-item">
            <Link className="nav-link color-green-hover" to="/kurumlar">
            전문가 소개
            </Link>
          </li>
          <li className="nav-item">
            <Link className="nav-link color-green-hover" to="/kurumlar">
            수리 문의
            </Link>
          </li>
        </ul>
      </div>
    </nav>
  );
};

export default NewNavbar;
