import React, { createContext, useContext, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [user, setUser] = useState(() => {
    const token = localStorage.getItem('token');
    const storedUser = localStorage.getItem('user');
    return token && storedUser ? JSON.parse(storedUser) : null;
  });

  const navigate = useNavigate();

  // Kullanıcı giriş fonksiyonu
  const login = async (email, password) => {
    try {
      const response = await axios.post('https://home-repair-api.onrender.com/api/auth/login', { email, password });
      const { user,role,user_id } = response.data; // Backend'den gelen user nesnesi
      
      // Kullanıcı bilgilerini localStorage'e kaydet
      localStorage.setItem('user_id', JSON.stringify(user_id));
      localStorage.setItem('role', JSON.stringify(role));

      setUser(user); // State'i güncelle

      // Kullanıcının rolüne göre yönlendirme yap
      if (user.role === 'student') {
        navigate('/');
      } else if (user.role === 'admin') {
        navigate('/');
      } else {
        navigate('/'); // Geçerli rol yoksa ana sayfaya yönlendir
      }
    } catch (error) {
      console.error('Giriş hatası:', error);
      throw new Error('Giriş başarısız. Lütfen bilgilerinizi kontrol ediniz.');
    }
  };

  // Kullanıcı çıkış fonksiyonu
  const logout = async () => {
    try {
      await axios.post('https://home-repair-api.onrender.com/api/auth/logout');

      // localStorage temizle
      localStorage.removeItem('role');
      localStorage.removeItem('user');
      localStorage.removeItem('user_id');

      setUser(null); // State sıfırla

      navigate('/login'); // Çıkış sonrası yönlendirme
    } catch (error) {
      console.error('Çıkış hatası:', error);
    }
  };

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

// useAuth hook'u ile AuthContext'e erişim
export const useAuth = () => useContext(AuthContext);
