import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import {
  Container,
  Paper,
  TextField,
  Button,
  Typography,
  Box,
  Alert,
  CircularProgress,
  Link,
  ToggleButton,
  ToggleButtonGroup,
  styled
} from "@mui/material";

const StyledPaper = styled(Paper)(({ theme }) => ({
  padding: theme.spacing(4),
  marginTop: theme.spacing(8),
  maxWidth: 400,
  margin: "0 auto",
  [theme.breakpoints.down('sm')]: {
    padding: theme.spacing(3),
    marginTop: theme.spacing(4),
  }
}));

const StyledButton = styled(Button)(({ theme }) => ({
  padding: theme.spacing(1.5),
  marginTop: theme.spacing(2),
  fontWeight: 'bold'
}));

const RoleButtonGroup = styled(ToggleButtonGroup)(({ theme }) => ({
  marginBottom: theme.spacing(3),
  width: "100%",
  '& .MuiToggleButtonGroup-grouped': {
    margin: theme.spacing(0.5),
    border: '1px solid #23c0e9',
    '&.Mui-selected': {
      backgroundColor: '#23c0e9',
      color: '#fff',
      '&:hover': {
        backgroundColor: '#1ca8c9'
      }
    },
    '&:not(.Mui-selected)': {
      color: '#23c0e9',
      '&:hover': {
        backgroundColor: 'rgba(35, 192, 233, 0.04)'
      }
    }
  }
}));

const RoleButton = styled(ToggleButton)(({ theme }) => ({
  flex: 1,
  fontWeight: '500'
}));

export default function Register() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: ""
  });
  const [role, setRole] = useState("student");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleRoleChange = (event, newRole) => {
    if (newRole !== null) {
      setRole(newRole);
    }
  };

  const handleRegister = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);
    
    try {
      const res = await axios.post("https://home-repair-api.onrender.com/api/auth/register", {
        ...formData,
        role,
      });
      
      alert("Register successful");
      navigate("/login");
    } catch (err) {
      console.log(err.response?.data || err.message);
      setError(err.response?.data?.message || "An error occurred during registration");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Container component="main" maxWidth="sm">
      <StyledPaper elevation={3}>
        <Typography component="h1" variant="h4" align="center" gutterBottom fontWeight="bold">
          학생가입
        </Typography>

        {/* Role selection */}
        <RoleButtonGroup
          value={role}
          exclusive
          onChange={handleRoleChange}
          aria-label="role selection"
        >
          <RoleButton value="student">
            학생가입
          </RoleButton>
          {/* Uncomment if you want to add expert role later */}
          {/* <RoleButton value="expert">
            전문가 가입
          </RoleButton> */}
        </RoleButtonGroup>

        <Box component="form" onSubmit={handleRegister} noValidate>
          <TextField
            margin="normal"
            required
            fullWidth
            id="name"
            label="성명"
            name="name"
            autoComplete="name"
            autoFocus
            value={formData.name}
            onChange={handleChange}
            variant="outlined"
          />
          <TextField
            margin="normal"
            required
            fullWidth
            id="email"
            label="이메일"
            name="email"
            autoComplete="email"
            value={formData.email}
            onChange={handleChange}
            variant="outlined"
          />
          <TextField
            margin="normal"
            required
            fullWidth
            name="password"
            label="비밀번호"
            type="password"
            id="password"
            autoComplete="new-password"
            value={formData.password}
            onChange={handleChange}
            variant="outlined"
          />

          {error && (
            <Alert severity="error" sx={{ mt: 2 }}>
              {error}
            </Alert>
          )}

          <StyledButton
            type="submit"
            fullWidth
            variant="contained"
            disabled={loading}
            sx={{ mt: 3, mb: 2 }}
          >
            {loading ? (
              <CircularProgress size={24} color="inherit" />
            ) : (
              "등록"
            )}
          </StyledButton>

          <Box textAlign="center">
            <Link
              component="button"
              type="button"
              variant="body2"
              onClick={() => navigate("/login")}
              sx={{ 
                color: "#23c0e9",
                fontWeight: '500',
                textDecoration: 'none',
                '&:hover': {
                  textDecoration: 'underline'
                }
              }}
            >
              로그인
            </Link>
          </Box>
        </Box>
      </StyledPaper>
    </Container>
  );
}