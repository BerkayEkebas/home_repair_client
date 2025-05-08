import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { TextField, Button, MenuItem, Select, FormControl, InputLabel, FormHelperText, Box, Container } from '@mui/material';

const CreateRequest = () => {
  const [userId, setUserId] = useState('');
  const [serviceId, setServiceId] = useState('');
  const [description, setDescription] = useState('');
  const [status, setStatus] = useState('pending'); // Varsayılan 'pending' olarak
  const [message, setMessage] = useState(''); // Başarı veya hata mesajlarını göstermek için

  // Servis seçenekleri array'i
  const services = [
    { id: 1, name: '일반 수리' },
    { id: 2, name: '창문/도어' },
    { id: 3, name: '화장실' },
    { id: 4, name: '부엌' },
    { id: 5, name: '조명/전기' },
    { id: 6, name: '목공' },
    { id: 7, name: '바닥 설치/수리' },
    { id: 8, name: '기타 수리' }
  ];

  useEffect(() => {
    // localStorage'den user_id'yi al
    const storedUserId = localStorage.getItem('user_id');
    if (storedUserId) {
      setUserId(storedUserId);
    }
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Verilerin doğruluğunu kontrol et
    if (!userId || !serviceId || !description) {
      setMessage('모든 필드를 입력하세요.');
      return;
    }

    // API'ye POST isteği gönder
    try {
      const response = await axios.post('https://home-repair-api.onrender.com/api/customer/create-request', {
        user_id: userId,
        service_id: serviceId,
        description,
        status
      });

      // Başarılı yanıt
      setMessage('요청이 성공적으로 생성되었습니다!');
      console.log(response.data);
    } catch (error) {
      // Hata mesajı
      setMessage('오류가 발생했습니다. 다시 시도하세요.');
      console.error(error);
    }
  };

  return (
    <Box 
      display="flex" 
      justifyContent="center" 
      alignItems="center" 
      height="100vh"
    >
      <Container maxWidth="sm">
        <div>
          <h2>새 요청 만들기</h2>
          <form onSubmit={handleSubmit}>
            <FormControl fullWidth margin="normal" required>
              <InputLabel>서비스</InputLabel>
              <Select
                label="서비스"
                value={serviceId}
                onChange={(e) => setServiceId(e.target.value)}
              >
                {services.map((service) => (
                  <MenuItem key={service.id} value={service.id}>
                    {service.name}
                  </MenuItem>
                ))}
              </Select>
              <FormHelperText>서비스를 선택하세요</FormHelperText>
            </FormControl>
            
            <TextField
              label="설명"
              variant="outlined"
              fullWidth
              multiline
              rows={4}
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              margin="normal"
              required
            />

            <Button variant="contained" color="primary" type="submit" fullWidth>
              요청 제출
            </Button>
          </form>
          {message && <p>{message}</p>} {/* Kullanıcıya mesaj göster */}
        </div>
      </Container>
    </Box>
  );
};

export default CreateRequest;
