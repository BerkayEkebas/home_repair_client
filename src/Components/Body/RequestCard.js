import React, { useState } from 'react';
import { Card, CardContent, Typography, Box, Avatar, Button, IconButton, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle } from '@mui/material';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import CloseIcon from '@mui/icons-material/Close';
import axios from 'axios';
import { Link } from "react-router-dom";

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

const RequestCard = ({ request, sx }) => {
  const [open, setOpen] = useState(false);
  const storedUserId = localStorage.getItem('user_id');
  const date = new Date(request.created_at);
  const formattedDate = `${date.toLocaleDateString()} ${date.toLocaleTimeString()}`;
  const serviceName = services.find(service => service.id === request.service_id)?.name || '서비스 없음';

  const deleteRequest = async (user_id, request_id) =>{
    try {
      const response = await axios.post('https://home-repair-api.onrender.com/api/customer/delete-request', {
          user_id,
          request_id,
      });
      console.log(response.data.message);
      window.location.href="/my-requests"
  } catch (error) {
      console.error("요청 삭제 중 오류 발생:", error);
  }
  }

  return (
    <Card sx={{ ...sx, width: '100%', display: 'flex', flexDirection: 'column', borderRadius: 2, boxShadow: 3, position: 'relative' }}>
      {/* X Butonu */}
      <IconButton
        sx={{ position: 'absolute', top: 8, right: 8 }}
        onClick={() => setOpen(true)}
      >
        <CloseIcon style={{color:"red"}} />
      </IconButton>

      <CardContent>
        <Box display="flex" flexDirection="column" mb={2}>
          <Typography variant="h6" sx={{ fontWeight: 'bold' }}>
            서비스: {serviceName}
          </Typography>
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
        
        <Box display="flex" justifyContent="flex-end" mt={2}>
          <Link to={`/check-offer/${request.id}`}>
          <Button variant="contained" color="primary">
            제안 보기
          </Button>
          </Link>

        </Box>
      </CardContent>

      {/* Silme Onay Popup */}
      <Dialog open={open} onClose={() => setOpen(false)}>
        <DialogTitle>삭제 확인</DialogTitle>
        <DialogContent>
          <DialogContentText>
            이 요청을 삭제하시겠습니까?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpen(false)} color="primary">
            취소
          </Button>
          <Button onClick={() => {
            deleteRequest(storedUserId,request.id);
            setOpen(false);
          }} color="error" autoFocus>
            삭제
          </Button>
        </DialogActions>
      </Dialog>
    </Card>
  );
};

export default RequestCard;
