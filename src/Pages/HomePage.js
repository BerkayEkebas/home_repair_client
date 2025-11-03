import React, { useEffect } from "react";
import MainTop from "../Components/Body/MainTop";
import { useNavigate } from "react-router-dom";
import MainAdminTop from "../Components/Body/MainAdminTop";

function HomePage() {
  const navigate = useNavigate();
  const userId = localStorage.getItem("user_id");
  const userRole = localStorage.getItem("role")?.replace(/"/g, "") || "";

  useEffect(() => {
    // userId yoksa veya boşsa login sayfasına yönlendir
    if (!userId) {

      navigate('/auth');
      return;
    }
  }, [userId, navigate]);
  return (
    <div>
      {userRole === "student" ?
        <MainTop /> : userRole === "admin" ? <MainAdminTop /> : ""}
    </div>
  );
}

export default HomePage;
