import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Menu, MenuItem } from "@mui/material";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown"; // Ok ikonu eklendi

const ExpertNavbar = () => {
  const [isNavOpen, setIsNavOpen] = useState(false);
  const [anchorEl, setAnchorEl] = useState(null);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false); // Dropdown menünün açık olup olmadığını takip eden state

  const handleToggle = () => {
    setIsNavOpen(!isNavOpen);
  };

  const handleMenuToggle = (event) => {
    if (anchorEl) {
      setAnchorEl(null);
      setIsDropdownOpen(false);
    } else {
      setAnchorEl(event.currentTarget);
      setIsDropdownOpen(true);
    }
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
    setIsDropdownOpen(false);
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
            <Link className="nav-link color-green-hover" to="/find-requests">
              내 예약
            </Link>
          </li>
          <li className="nav-item">
            <Link className="nav-link color-green-hover" to="/find-requests">
             문의 전체조회
            </Link>
          </li>
          <li className="nav-item">
            <button
              className="nav-link color-green-hover d-flex align-items-center"
              onClick={handleMenuToggle}
              style={{
                background: "none",
                border: "none",
                cursor: "pointer",
                outline: "none",
                boxShadow: "none", 
                marginTop:-3
              }}
            >
              마이 페이지
              <KeyboardArrowDownIcon
                style={{
                  marginLeft: 1,
                  transition: "transform 0.3s",
                  transform: isDropdownOpen ? "rotate(180deg)" : "rotate(0deg)",
                }}
              />
            </button>
            {/* Dropdown Menüsü */}
            <Menu
              anchorEl={anchorEl}
              open={Boolean(anchorEl)}
              onClose={handleMenuClose}
              MenuListProps={{
                onMouseLeave: handleMenuClose,
              }}
            >
              <MenuItem onClick={handleMenuClose}>
                <Link to="/find-requests" className="dropdown-item">
                수락된 요청
                </Link>
              </MenuItem>
              <MenuItem onClick={handleMenuClose}>
                <Link to="/my-expert-page" className="dropdown-item">
                내 정보
                </Link>
              </MenuItem>
            </Menu>
          </li>
        </ul>
      </div>
    </nav>
  );
};

export default ExpertNavbar;
