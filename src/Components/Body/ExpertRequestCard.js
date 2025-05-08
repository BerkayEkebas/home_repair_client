import React from 'react';
import { Card, CardContent, Typography, Box, Avatar, Button } from '@mui/material';
import AccessTimeIcon from '@mui/icons-material/AccessTime';  // Saat ikonu için
import { Link } from 'react-router-dom';

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

const ExpertRequestCard = ({ request, sx }) => {
  // Tarihi formatlayalım
  const date = new Date(request.created_at);
  const formattedDate = `${date.toLocaleDateString()} ${date.toLocaleTimeString()}`;

  // Service ID'yi eşleştirip ismi bulalım
  const serviceName = services.find(service => service.id === request.service_id)?.name || '서비스 없음';

  return (
    <Card sx={{ ...sx, width: '100%', display: 'flex', flexDirection: 'column', borderRadius: 2, boxShadow: 3 }}>
      <CardContent>
        <Box display="flex" flexDirection="column" mb={2}>
          {/* Servis ismini ekliyoruz */}
          <Typography variant="h6" sx={{ fontWeight: 'bold' }}>
            서비스: {serviceName}
          </Typography>
          
          {/* Saat simgesi ve tarih */}
          <Box display="flex" alignItems="center" mb={2}>
            <Avatar sx={{ bgcolor: 'primary.main', mr: 1 }}>
              <AccessTimeIcon sx={{ color: 'white' }} />
            </Avatar>
            <Typography variant="body2" color="text.secondary">
              {formattedDate}
            </Typography>
          </Box>
        </Box>

        <Typography variant="h6" sx={{ fontWeight: 'bold' }}>
          요청 상태: {request.status}
        </Typography>
        <Typography variant="body1" sx={{ marginTop: 2 }}>
          설명: {request.description}
        </Typography>
        
        {/* Teklif Ver butonu */}
        <Box display="flex" justifyContent="flex-end" mt={2}>
          <Link to={`/offer/${request.id}`}>
          <Button 
            variant="contained" 
            color="primary" 
          >
            제안하기
          </Button></Link>

        </Box>
      </CardContent>
    </Card>
  );
};

export default ExpertRequestCard;
