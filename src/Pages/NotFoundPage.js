import React, { useEffect } from 'react'
import { useNavigate } from 'react-router-dom';

function NotFoundPage() {
    const navigate = useNavigate();
    const userId = localStorage.getItem("user_id");
  
    useEffect(() => {
      // userId yoksa veya boşsa login sayfasına yönlendir
      if (!userId) {
        
        navigate('/auth');
        return;
      }
    }, [userId, navigate]);
  return (
    <div className="container-fluid py-5">
  <div className="container py-5 text-center">
    <ol className="breadcrumb justify-content-center mb-5">
      <li className="breadcrumb-item">
        <a href="/">Home</a>
      </li>
      <li className="breadcrumb-item">
        <a href="/">Pages</a>
      </li>
      <li className="breadcrumb-item active text-dark">404</li>
    </ol>
    <div className="row justify-content-center">
      <div className="col-lg-6">
        <i className="bi bi-exclamation-triangle display-1 text-secondary" />
        <h1 className="display-1">404</h1>
        <h1 className="mb-4">페이지를 찾을 수 없음</h1>
        <p className="mb-4">
        귀하가 찾고 있는 페이지는 당사 사이트에서 제공되지 않습니다. 우리 홈페이지에서 검색 엔진을 사용하는 것은 어떻습니까?
        </p>
        <a href="/"
          className="btn link-hover border border-primary rounded-pill py-3 px-5"
        >
          홈 페이지로 돌아가기
        </a>
      </div>
    </div>
  </div>
</div>
  )
}

export default NotFoundPage