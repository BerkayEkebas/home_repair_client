import React, { useState } from 'react';
import { Button, Box, TextField, CircularProgress, Typography, Container } from '@mui/material';
import { useNavigate } from 'react-router-dom'; // Sayfa yönlendirmesi için
import axios from 'axios';

const Register = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState('customer'); // Varsayılan olarak 'user' seçili
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleRegister = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const response = await axios.post('https://home-repair-api.onrender.com/api/auth/register', {
        name,
        email,
        password,
        role,
      });
      alert(response.data); // Kayıt başarılı olduğunda mesaj göster
      navigate('/login'); // Kayıt başarılı olduğunda login sayfasına yönlendir
    } catch (err) {
      setError(err.response?.data || 'Bir hata oluştu, lütfen tekrar deneyin');
    } finally {
      setLoading(false);
    }
  };

  return (
    <Container maxWidth="xs" sx={{ marginTop: 4 }}>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', marginTop: 2 }}>
          <Button
            variant={role === 'customer' ? 'contained' : 'outlined'}
            onClick={() => setRole('customer')}
            sx={{
              width: '48%',
              backgroundColor: role === 'customer' ? '#23c0e9' : '#fff',
              color: role === 'customer' ? '#fff' : '#23c0e9',
              borderColor: '#23c0e9',
              '&:hover': {
                backgroundColor: role === 'customer' ? '#a1eafd' : '#f5f5f5',
              },
            }}
          >
            회원가입
          </Button>
          <Button
            variant={role === 'expert' ? 'contained' : 'outlined'}
            onClick={() => setRole('expert')}
            sx={{
              width: '48%',
              backgroundColor: role === 'expert' ? '#23c0e9' : '#fff',
              color: role === 'expert' ? '#fff' : '#23c0e9',
              borderColor: '#23c0e9',
              '&:hover': {
                backgroundColor: role === 'expert' ? '#a1eafd' : '#f5f5f5',
              },
            }}
          >
            전문가 가입
          </Button>
        </Box>
      <form onSubmit={handleRegister}>
        <TextField
          label="성명"
          variant="outlined"
          fullWidth
          margin="normal"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />
        <TextField
          label="이메일"
          variant="outlined"
          fullWidth
          margin="normal"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <TextField
          label="비밀번호"
          type="password"
          variant="outlined"
          fullWidth
          margin="normal"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />

        {error && <Typography color="error" sx={{ marginTop: 1 }}>{error}</Typography>}
        <Box sx={{ marginTop: 2 }}>
          <Button
            type="submit"
            variant="contained"
            color="primary"
            fullWidth
            disabled={loading}
          >
            {loading ? <CircularProgress size={24} color="inherit" /> : '등록'}
          </Button>
        </Box>
      </form>
      <Box sx={{ marginTop: 2, textAlign: 'center' }}>
        <Typography variant="body2">
          Zaten üye misiniz? <a href="/login">Giriş Yapın</a>
        </Typography>
      </Box>
    </Container>
  );
};

export default Register;
