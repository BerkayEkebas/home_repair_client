import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import { TextField, Button, Container, Box, Typography } from '@mui/material';
import axios from 'axios';

const OfferPage = () => {
  const { id } = useParams(); // request_id를 URL에서 가져오기
  const expertId = localStorage.getItem('user_id'); // localStorage에서 expert_id 가져오기
  const [price, setPrice] = useState('');
  const [message, setMessage] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();

    const offerData = {
      request_id: id,
      user_id: expertId,
      price: parseFloat(price),
      message,
    };

    try {
      const response = await axios.post('https://home-repair-api.onrender.com/api/expert/create-offer', offerData);
      console.log('응답:', response.data);
      alert('제안이 성공적으로 제출되었습니다!'); // "Teklif başarıyla gönderildi!"
    } catch (error) {
      console.error('제안 제출 오류:', error);
      alert('제안을 제출하는 동안 오류가 발생했습니다.'); // "Teklif gönderilirken hata oluştu."
    }
  };

  return (
    <Container maxWidth="sm">
      <Box mt={5} p={3} boxShadow={3} borderRadius={2}>
        <Typography variant="h5" mb={2}>제안하기</Typography> {/* Teklif Ver */}
        <form onSubmit={handleSubmit}>
          <TextField
            label="요청 ID" // Talep ID
            value={id}
            fullWidth
            disabled
            margin="normal"
          />
          <TextField
            label="전문가 ID" // Uzman ID
            value={expertId}
            fullWidth
            disabled
            margin="normal"
          />
          <TextField
            label="가격 (₩)" // Fiyat (₩)
            type="number"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
            fullWidth
            required
            margin="normal"
          />
          <TextField
            label="메시지" // Mesaj
            multiline
            rows={4}
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            fullWidth
            required
            margin="normal"
          />
          <Button type="submit" variant="contained" color="primary" fullWidth sx={{ mt: 2 }}>
            제안 제출 {/* Teklif Gönder */}
          </Button>
        </form>
      </Box>
    </Container>
  );
};

export default OfferPage;
