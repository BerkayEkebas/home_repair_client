import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { Box, CircularProgress, Typography, Paper, Button, Dialog, DialogActions, DialogContent, DialogTitle } from "@mui/material";

const CheckOffer = () => {
  const { request_id } = useParams(); // URL'den request_id al
  const [offers, setOffers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [openDialog, setOpenDialog] = useState(false); // Dialog penceresinin açık olup olmadığını kontrol etmek için
  const [selectedExpert, setSelectedExpert] = useState(null); // Seçilen uzmanın bilgileri

  // Services listesi
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

  // Services ID'leri virgülle ayrılmış olarak gelen veriyi adlarına çeviren fonksiyon
  const getServiceNames = (servicesIds) => {
    const ids = servicesIds.split(','); // Virgülle ayırarak array'e çevir
    return ids
      .map((id) => {
        const service = servicesList.find((service) => service.id === parseInt(id));
        return service ? service.name : null; // Bulunan servis ismini döndür
      })
      .filter(Boolean) // null'ları filtrele
      .join(', '); // Servis isimlerini virgülle birleştir
  };

  useEffect(() => {
    const fetchOffers = async () => {
      try {
        const response = await axios.get(`https://home-repair-api.onrender.com/api/customer/get-offer/${request_id}`);
        setOffers(response.data);
      } catch (err) {
        setError("제안을 가져오는 중 오류가 발생했습니다.");
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchOffers();
  }, [request_id]);

  const handleAcceptOffer = (offerId) => {
    console.log("Teklif kabul edildi, Teklif ID:", offerId);
    // Burada teklif kabul işlemine dair API isteği yapılabilir
  };

  const handleExpertClick = (expertId) => {
    // Uzman bilgilerini almak için API isteği yapılabilir
    const selected = offers.find(offer => offer.id === expertId);
    if (selected) {
      setSelectedExpert(selected);
      setOpenDialog(true); // Dialog penceresini aç
    }
  };

  const handleCloseDialog = () => {
    setOpenDialog(false); // Dialog penceresini kapat
    setSelectedExpert(null); // Seçilen uzmanı sıfırla
  };

  return (
    <Box p={3}>
      <Typography variant="h4" gutterBottom>
        제안 보기 (요청 ID: {request_id})
      </Typography>

      {loading ? (
        <CircularProgress />
      ) : error ? (
        <Typography color="error">{error}</Typography>
      ) : offers.length === 0 ? (
        <Typography>이 요청에 대한 제안이 없습니다.</Typography>
      ) : (
        offers.map((offer) => (
          <Paper key={offer.id} elevation={3} sx={{ p: 2, mb: 2, display: "flex", justifyContent: "space-between" }}>
            <Box>
              <Typography variant="h6">가격: {offer.price} ₩</Typography>
              <Typography>메시지: {offer.message}</Typography>
              <Typography>전문가 id: {offer.id}</Typography>
              <Typography>전화: {offer.phone}</Typography>
              <Typography>서비스: {getServiceNames(offer.services_id)}</Typography> {/* Servis ID'lerini adlarına çevir */}
            </Box>
            <Button
              variant="contained"
              color="primary"
              onClick={() => handleAcceptOffer(offer.id)}
              sx={{ alignSelf: "center" }}
            >
              제안 수락
            </Button>
            <Button
              variant="outlined"
              color="secondary"
              onClick={() => handleExpertClick(offer.id)}
              sx={{ alignSelf: "center", marginLeft: -130 }}
            >
              전문가 보기
            </Button>
          </Paper>
        ))
      )}

      {/* Uzman bilgilerini gösteren pop-up (Dialog) */}
      <Dialog open={openDialog} onClose={handleCloseDialog}>
        <DialogTitle>전문가 정보</DialogTitle>
        <DialogContent>
          {selectedExpert ? (
            <>
              <Typography>전문가 ID: {selectedExpert.id}</Typography>
              <Typography>서비스 ID: {getServiceNames(selectedExpert.services_id)}</Typography>
              <Typography>경력 연수: {selectedExpert.experience_years}년</Typography>
              <Typography>전화: {selectedExpert.phone}</Typography>
            </>
          ) : (
            <Typography>전문가 정보를 불러올 수 없습니다.</Typography>
          )}
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDialog} color="primary">
            닫기
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default CheckOffer;
