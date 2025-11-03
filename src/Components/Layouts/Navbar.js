import React, { useState } from "react";
import SearchIcon from "@mui/icons-material/Search";
import NewNavbar from "./NewNavbar";
import CustomerNavbar from "./CustomerNavbar";
import ExpertNavbar from "./ExpertNavbar";
import { useAuth } from "../../Context/authContext";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "@mui/material";

const Header = () => {
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isCollapsing, setIsCollapsing] = useState(false);
  const userRole = localStorage.getItem("role")?.replace(/"/g, "") || ""; // Burada tırnaklar kaldırılacak.
  const { logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = async (e) => {
    e.preventDefault();

    try {
      await logout(); // AuthContext'teki login fonksiyonunu çağırıyoruz
    } catch (err) {
      console.log(err);
    }
  };

  const handleSearchBar = () => {
    if (isSearchOpen) {
      setIsCollapsing(true);
      setTimeout(() => {
        setIsCollapsing(false);
        setIsSearchOpen(false);
      }, 300);
    } else {
      setIsCollapsing(true);
      setTimeout(() => {
        setIsCollapsing(false);
        setIsSearchOpen(true);
      }, 300);
    }
  };

  return (
    <>
      {/* Search */}
      <div
        className={`top-search ${isCollapsing ? "collapsing" : ""} ${
          isSearchOpen ? "collapse show" : "collapse"
        }`}
        id="collapseExample"
        style={{
          maxHeight: isSearchOpen ? "150px" : "0",
          overflow: "hidden",
          transition: "max-height 0.5s ease-out !important",
        }}
      >
        <div className="card card-block">
          <div className="newsletter-widget text-center">
            <form className="form-inline">
              <input
                type="text"
                className="form-control"
                placeholder="Aramak istediğiniz kelimeyi giriniz"
              />
              <button type="submit" className="btn btn-primary">
                <SearchIcon />
              </button>
            </form>
          </div>
        </div>
      </div>

      <div
        className="mobile-navbar"
        style={{ backgroundColor: "#a2aabd", padding: "10px 15px" }}
      >
        <div
          className="d-flex align-items-center justify-content-between"
          style={{ height: "50px" }}
        >

          {/* Logo */}
          <div
            className="logo-container"
            style={{
              backgroundColor: "transparent",
              padding: "70px 70px",
              borderRadius: "5px",
              marginLeft: "1%",
            }}
          >
            <img
              src={`${process.env.PUBLIC_URL}/logo.png`}
              alt="Logo"
              style={{
                maxHeight: "50px",
                objectFit: "contain",
              }}
            />
          </div>

          <div
            className="search-container d-flex align-items-center"
            style={{ cursor: "pointer", color: "white", marginRight: "30px" }}
          >{userRole ?               <Button
            variant="contained"
            style={{backgroundColor:"red", marginRight: "10px" }}
            component={Link}
            to="/auth"
            onClick={handleLogout}
          >
            로그아웃
          </Button> :             <div style={{ display: "flex" }}>
              <Button
                variant="contained"
                style={{backgroundColor:"#5399e1", marginRight: "10px" }}
                component={Link}
                to="/auth"
              >
                로그인
              </Button>
              {/* <Button
                variant="contained"
                style={{backgroundColor:"green"}}
                component={Link}
                to="/register"
              >
                회원가입
              </Button> */}
            </div> }

          </div>
        </div>
      </div>

      {/* Navbar */}
      <header className="header">
        <div className="container">
          {userRole === "student" ? (
            <CustomerNavbar />
          ) : userRole === "admin" ? (
            <ExpertNavbar />
          ) : (
            ""
          )}
        </div>
      </header>

      <style>
        {`
          @media (min-width: 768px) {
            .navbar-toggler {
              display: none; 
            }
            .navbar-collapse {
              display: flex !important; 
              flex-direction: row; 
            }
            .navbar-nav {
              flex-direction: row;
              margin: 0 auto; /* Ortalamak için */
            }
            .nav-item {
              margin-left: 1rem; 
            }
          }

          @media (max-width: 767px) {
            .navbar-nav {
              flex-direction: column;
              width: 100%;
              margin: 0; /* Ortalamak için */
            }
            .nav-item {
              margin-left: 0;
              margin-bottom: 1rem;
              text-align: center; /* Mobil görünümde yazıları ortalamak için */
            }
          }
        `}
      </style>
    </>
  );
};

export default Header;
