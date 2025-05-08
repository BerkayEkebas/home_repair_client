import React, { useState, useEffect } from "react";
import axios from "axios";
import { Card, CardContent, Typography, Button, Link } from "@mui/material";

const servicesList = [
  { id: 1, name: '일반 수리' },
  { id: 2, name: '창문/도어' },
  { id: 3, name: '화장실' },
  { id: 4, name: '부엌' },
  { id: 5, name: '조명/전기' },
  { id: 6, name: '목공' },
  { id: 7, name: '바닥 설치/수리' },
  { id: 8, name: '기타 수리' }
];

const MyPageExpert = () => {
  const [expert, setExpert] = useState(null);  // Tek bir uzman için state

  // LocalStorage'den kullanıcı ID'sini alıyoruz
  const userId = localStorage.getItem("user_id");

  useEffect(() => {
    const fetchExpert = async () => {
      try {
        const response = await axios.post(`https://home-repair-api.onrender.com/api/expert/get-expert-details`,
          { user_id: userId }
        );  // user_id ile POST isteği
        setExpert(response.data);  // Gelen veriyi state'e kaydediyoruz
      } catch (error) {
        console.error("Error fetching expert:", error);
      }
    };

    fetchExpert();
  }, [userId]);  // userId değiştiğinde tekrar çalışacak

  // Eğer user_id yoksa, kullanıcıyı giriş yapmaya yönlendirebiliriz
  if (!userId) {
    return (
      <div style={{ padding: "20px" }}>
        <Typography variant="h5" gutterBottom>No user found, please login.</Typography>
        <Link href="/login">
          <Button variant="contained">Login</Button>
        </Link>
      </div>
    );
  }

  // Eğer expert verisi yoksa, 'No expert found' mesajı gösteriyoruz
  if (!expert) {
    return (
      <div style={{ padding: "20px" }}>
        <Typography variant="h5" gutterBottom>No Expert Found</Typography>
        <Link href="/create-expert-details">
          <Button variant="contained">Enter expert details</Button>
        </Link>
      </div>
    );
  }

  // services_id'yi virgülle ayırıp, her bir id'yi servicesList ile eşleştiriyoruz
  const serviceNames = expert.services_id
    .split(",")  // Virgülle ayırarak bir diziye dönüştürüyoruz
    .map((id) => {
      const service = servicesList.find((service) => service.id === parseInt(id));  // id ile eşleşen servisi buluyoruz
      return service ? service.name : null;  // Eşleşen servis ismini döndürüyoruz
    })
    .filter((name) => name !== null)  // Null olan değerleri filtreliyoruz
    .join(", ");  // Servis isimlerini virgülle ayırarak birleştiriyoruz

  return (
    <div style={{ padding: "20px" }}>
      <Typography variant="h5" gutterBottom>Expert Details</Typography>
      <Card>
        <CardContent>
          <Typography variant="h6">User ID: {expert.user_id}</Typography>
          <Typography variant="body1">Services: {serviceNames}</Typography>
          <Typography variant="body1">Experience: {expert.experience_years} years</Typography>
          <Typography variant="body1">Phone: {expert.phone}</Typography>
          <Button variant="contained" color="secondary" style={{ marginTop: "10px" }}>
            Edit
          </Button>
        </CardContent>
      </Card>
    </div>
  );
};

export default MyPageExpert;
