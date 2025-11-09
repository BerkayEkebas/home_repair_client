import React, { useState } from 'react';
import {
  TextField,
  Button,
  Box,
  CircularProgress,
  Typography,
  Paper,
  Container,
  InputAdornment,
  Alert,
  Fade,
  IconButton,
  Menu,
  MenuItem,
  AppBar,
  Toolbar
} from '@mui/material';
import {
  Email,
  Lock,
  Person,
  Visibility,
  VisibilityOff,
  Language,
  School
} from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../Context/authContext';

const Login = () => {
  const { login } = useAuth();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [language, setLanguage] = useState('korean'); // 'korean', 'english'
  const [anchorEl, setAnchorEl] = useState(null);
  const navigate = useNavigate();

  // Dil çevirileri
  const translations = {
    korean: {
      title: '스마트 기숙사 관리 시스템',
      loginTitle: '로그인',
      loginSubtitle: '계정에 로그인하여 서비스를 이용하세요',
      email: '이메일 주소',
      password: '비밀번호',
      loginButton: '로그인',
      loginError: '로그인에 실패했습니다. 이메일과 비밀번호를 확인해주세요.',
      copyright: '© 2024 모든 권리 보유',
      korean: '한국어',
      english: 'English'
    },
    english: {
      title: 'Smart Dorm Management System',
      loginTitle: 'Login',
      loginSubtitle: 'Sign in to your account to access the service',
      email: 'Email Address',
      password: 'Password',
      loginButton: 'Login',
      loginError: 'Login failed. Please check your email and password.',
      copyright: '© 2024 All rights reserved',
      korean: 'Korean',
      english: 'English'
    }
  };

  const t = translations[language];

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      await login(email, password);
      navigate('/');
    } catch (err) {
      setLoading(false);
      setError(t.loginError);
    }
  };

  const handleClickShowPassword = () => {
    setShowPassword(!showPassword);
  };

  const handleLanguageClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleLanguageClose = () => {
    setAnchorEl(null);
  };

  const handleLanguageChange = (lang) => {
    setLanguage(lang);
    handleLanguageClose();
  };

  return (
    <Box
      sx={{
        minHeight: '100vh',
        background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: 2,
        position: 'relative',
        '&::before': {
          content: '""',
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          backgroundImage: 'url("https://i.namu.wiki/i/VEKe1PvGOhEODVUCklfvGzPMVqTEF8ohWAWEjLMq24c4gXjV_TYfV5mDQV5-McXmzNAyVPFh8gpY7l715z0dxg.svg")',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundRepeat: 'no-repeat',
          opacity: 0.1,
          zIndex: 0,
        }
      }}
    >
      {/* Language Selector App Bar */}
      <AppBar 
        position="absolute" 
        sx={{ 
          backgroundColor: 'transparent', 
          boxShadow: 'none',
          top: 16,
          right: 16
        }}
      >
        <Toolbar sx={{ justifyContent: 'flex-end', minHeight: 'auto!important' }}>
          <IconButton
            onClick={handleLanguageClick}
            sx={{
              color: 'white',
              backgroundColor: 'rgba(255, 255, 255, 0.2)',
              backdropFilter: 'blur(10px)',
              '&:hover': {
                backgroundColor: 'rgba(255, 255, 255, 0.3)',
              }
            }}
          >
            <Language />
          </IconButton>
          <Menu
            anchorEl={anchorEl}
            open={Boolean(anchorEl)}
            onClose={handleLanguageClose}
            sx={{
              '& .MuiPaper-root': {
                borderRadius: 2,
                marginTop: 1,
                minWidth: 120,
              }
            }}
          >
            <MenuItem 
              onClick={() => handleLanguageChange('korean')}
              selected={language === 'korean'}
            >
              {t.korean}
            </MenuItem>
            <MenuItem 
              onClick={() => handleLanguageChange('english')}
              selected={language === 'english'}
            >
              {t.english}
            </MenuItem>
          </Menu>
        </Toolbar>
      </AppBar>

      <Container component="main" maxWidth="sm" sx={{ position: 'relative', zIndex: 1 }}>
        <Fade in timeout={800}>
          <Paper
            elevation={24}
            sx={{
              padding: { xs: 3, md: 6 },
              borderRadius: 4,
              background: 'rgba(255, 255, 255, 0.95)',
              backdropFilter: 'blur(10px)',
              border: '1px solid rgba(255, 255, 255, 0.2)',
              boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.25)',
            }}
          >
            {/* Header Section */}
            <Box
              sx={{
                textAlign: 'center',
                mb: 4,
              }}
            >
              <Box
                sx={{
                  width: 80,
                  height: 80,
                  borderRadius: '50%',
                  background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  margin: '0 auto 16px',
                  boxShadow: '0 10px 25px rgba(102, 126, 234, 0.3)',
                }}
              >
                <School sx={{ fontSize: 40, color: 'white' }} />
              </Box>
              
              {/* System Title */}
              <Typography
                variant="h4"
                component="h1"
                sx={{
                  fontWeight: 'bold',
                  background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                  backgroundClip: 'text',
                  WebkitBackgroundClip: 'text',
                  color: 'transparent',
                  mb: 2,
                  fontSize: { xs: '1.5rem', md: '2rem' },
                }}
              >
                {t.title}
              </Typography>

              {/* Login Title */}
              <Typography
                variant="h3"
                component="h2"
                sx={{
                  fontWeight: 'bold',
                  background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                  backgroundClip: 'text',
                  WebkitBackgroundClip: 'text',
                  color: 'transparent',
                  mb: 1,
                  fontSize: { xs: '1.75rem', md: '2.5rem' },
                }}
              >
                {t.loginTitle}
              </Typography>
              
              <Typography
                variant="body1"
                sx={{
                  color: 'text.secondary',
                  fontSize: '1.1rem',
                }}
              >
                {t.loginSubtitle}
              </Typography>
            </Box>

            <form onSubmit={handleSubmit}>
              <Box sx={{ mb: 3 }}>
                <TextField
                  fullWidth
                  label={t.email}
                  variant="outlined"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  disabled={loading}
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <Email sx={{ color: 'primary.main' }} />
                      </InputAdornment>
                    ),
                  }}
                  sx={{
                    '& .MuiOutlinedInput-root': {
                      borderRadius: 3,
                      backgroundColor: 'rgba(255, 255, 255, 0.8)',
                      '&:hover fieldset': {
                        borderColor: 'primary.main',
                      },
                      '&.Mui-focused fieldset': {
                        borderColor: 'primary.main',
                        borderWidth: 2,
                      },
                    },
                    '& .MuiInputLabel-root.Mui-focused': {
                      color: 'primary.main',
                    },
                  }}
                />
              </Box>

              <Box sx={{ mb: 2 }}>
                <TextField
                  fullWidth
                  label={t.password}
                  type={showPassword ? 'text' : 'password'}
                  variant="outlined"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  disabled={loading}
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <Lock sx={{ color: 'primary.main' }} />
                      </InputAdornment>
                    ),
                    endAdornment: (
                      <InputAdornment position="end">
                        <Button
                          onClick={handleClickShowPassword}
                          sx={{
                            minWidth: 'auto',
                            padding: '4px',
                            color: 'text.secondary',
                            '&:hover': {
                              backgroundColor: 'transparent',
                              color: 'primary.main',
                            },
                          }}
                        >
                          {showPassword ? <VisibilityOff /> : <Visibility />}
                        </Button>
                      </InputAdornment>
                    ),
                  }}
                  sx={{
                    '& .MuiOutlinedInput-root': {
                      borderRadius: 3,
                      backgroundColor: 'rgba(255, 255, 255, 0.8)',
                      '&:hover fieldset': {
                        borderColor: 'primary.main',
                      },
                      '&.Mui-focused fieldset': {
                        borderColor: 'primary.main',
                        borderWidth: 2,
                      },
                    },
                    '& .MuiInputLabel-root.Mui-focused': {
                      color: 'primary.main',
                    },
                  }}
                />
              </Box>

              {error && (
                <Fade in>
                  <Alert
                    severity="error"
                    sx={{
                      borderRadius: 3,
                      mb: 2,
                      '& .MuiAlert-message': {
                        fontWeight: 'medium',
                      },
                    }}
                  >
                    {error}
                  </Alert>
                </Fade>
              )}

              <Button
                type="submit"
                fullWidth
                variant="contained"
                disabled={loading}
                sx={{
                  py: 1.5,
                  borderRadius: 3,
                  fontSize: '1.1rem',
                  fontWeight: 'bold',
                  textTransform: 'none',
                  background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                  boxShadow: '0 8px 25px rgba(102, 126, 234, 0.3)',
                  '&:hover': {
                    boxShadow: '0 12px 35px rgba(102, 126, 234, 0.4)',
                    transform: 'translateY(-2px)',
                  },
                  '&:disabled': {
                    background: 'grey.300',
                  },
                  transition: 'all 0.3s ease',
                  mb: 3,
                }}
              >
                {loading ? (
                  <CircularProgress size={24} color="inherit" />
                ) : (
                  t.loginButton
                )}
              </Button>
            </form>

            {/* Footer */}
            <Box
              sx={{
                textAlign: 'center',
                mt: 4,
                pt: 2,
                borderTop: '1px solid',
                borderColor: 'divider',
              }}
            >
              <Typography
                variant="caption"
                sx={{
                  color: 'text.secondary',
                  opacity: 0.7,
                }}
              >
                {t.copyright}
              </Typography>
            </Box>
          </Paper>
        </Fade>
      </Container>
    </Box>
  );
};

export default Login;