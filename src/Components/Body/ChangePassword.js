import React, { useState } from 'react';
import axios from 'axios';
import '../../Css/ChangePassword.css';

const ChangePassword = () => {
  // LocalStorage'dan kullanıcı bilgilerini al
  const userRole = localStorage.getItem("role")?.replace(/"/g, "") || "";
  const userId = localStorage.getItem("user_id")?.replace(/"/g, "") || "";
  
  console.log("User Role:", userRole); // "student" olmalı
  console.log("User ID:", userId);

  const [formData, setFormData] = useState({
    currentPassword: '',
    newPassword: '',
    confirmPassword: ''
  });
  const [message, setMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [language, setLanguage] = useState('ko');

  const translations = {
    en: {
      title: "Change Password",
      currentPassword: "Current Password",
      newPassword: "New Password",
      confirmPassword: "Confirm Password",
      changePassword: "Change Password",
      passwordChanged: "Password changed successfully",
      passwordsNotMatch: "Passwords do not match",
      onlyStudents: "Only students can change password",
      fillAllFields: "Please fill all fields"
    },
    ko: {
      title: "비밀번호 변경",
      currentPassword: "현재 비밀번호",
      newPassword: "새 비밀번호",
      confirmPassword: "비밀번호 확인",
      changePassword: "비밀번호 변경",
      passwordChanged: "비밀번호가 성공적으로 변경되었습니다",
      passwordsNotMatch: "비밀번호가 일치하지 않습니다",
      onlyStudents: "학생만 비밀번호를 변경할 수 있습니다",
      fillAllFields: "모든 필드를 입력해주세요"
    }
  };

  const t = translations[language];

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleLanguageChange = (lang) => {
    setLanguage(lang);
    setMessage('');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!formData.currentPassword || !formData.newPassword || !formData.confirmPassword) {
      setMessage(t.fillAllFields);
      return;
    }

    if (formData.newPassword !== formData.confirmPassword) {
      setMessage(t.passwordsNotMatch);
      return;
    }

    // DÜZELTME: userRole string olarak kontrol et
    if (userRole !== 'student') {
      setMessage(t.onlyStudents);
      return;
    }

    setIsLoading(true);
    setMessage('');

    try {
      const response = await axios.put('http://localhost:8800/api/users/change-password', {
        userId: userId, // userId'yi doğrudan kullan
        currentPassword: formData.currentPassword,
        newPassword: formData.newPassword
      });

      if (response.data[language]) {
        setMessage(response.data[language]);
      } else if (response.data.en) {
        setMessage(response.data.en);
      } else {
        setMessage(t.passwordChanged);
      }

      setFormData({
        currentPassword: '',
        newPassword: '',
        confirmPassword: ''
      });
    } catch (error) {
      console.log('Error response:', error.response);
      
      let errorMessage = t.fillAllFields;
      
      if (error.response?.data) {
        if (typeof error.response.data === 'object') {
          errorMessage = error.response.data[language] || 
                        error.response.data.en || 
                        JSON.stringify(error.response.data);
        } else {
          errorMessage = error.response.data;
        }
      }
      
      setMessage(errorMessage);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="change-password-container">
      <div className="language-switcher">
        <button 
          className={`lang-btn ${language === 'en' ? 'active' : ''}`}
          onClick={() => handleLanguageChange('en')}
        >
          EN
        </button>
        <button 
          className={`lang-btn ${language === 'ko' ? 'active' : ''}`}
          onClick={() => handleLanguageChange('ko')}
        >
          KO
        </button>
      </div>

      <div className="change-password-card">
        <h2>{t.title}</h2>
        
        <form onSubmit={handleSubmit} className="password-form">
          <div className="form-group">
            <label htmlFor="currentPassword">{t.currentPassword}</label>
            <input
              type="password"
              id="currentPassword"
              name="currentPassword"
              value={formData.currentPassword}
              onChange={handleChange}
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="newPassword">{t.newPassword}</label>
            <input
              type="password"
              id="newPassword"
              name="newPassword"
              value={formData.newPassword}
              onChange={handleChange}
              required
              minLength="6"
            />
          </div>

          <div className="form-group">
            <label htmlFor="confirmPassword">{t.confirmPassword}</label>
            <input
              type="password"
              id="confirmPassword"
              name="confirmPassword"
              value={formData.confirmPassword}
              onChange={handleChange}
              required
            />
          </div>

          {message && (
            <div className={`message ${
              message.includes('successfully') || 
              message.includes('성공적으로') || 
              message.includes('변경되었습니다') ? 'success' : 'error'
            }`}>
              {message}
            </div>
          )}

          <button 
            type="submit" 
            className="submit-btn"
            disabled={isLoading}
          >
            {isLoading ? '...' : t.changePassword}
          </button>
        </form>
      </div>
    </div>
  );
};

export default ChangePassword;