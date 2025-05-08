import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Box, Container, CircularProgress, Grid, Pagination } from '@mui/material';
import RequestCard from './RequestCard';

const MyRequests = () => {
  const [requests, setRequests] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [page, setPage] = useState(1);
  const itemsPerPage = 4;

  useEffect(() => {
    const fetchRequests = async () => {
      const userId = localStorage.getItem('user_id');

      if (!userId) {
        setError('사용자 ID를 찾을 수 없습니다. 로그인 후 다시 시도하세요.');
        setLoading(false);
        return;
      }

      try {
        const response = await axios.post('https://home-repair-api.onrender.com/api/customer/get-requests', {
          user_id: userId
        });
        setRequests(response.data);
      } catch (err) {
        setError('요청을 가져오는 중 오류가 발생했습니다.');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchRequests();
  }, []);

  // Gösterilecek sayfa verisini hesapla
  const indexOfLastItem = page * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = requests.slice(indexOfFirstItem, indexOfLastItem);

  return (
    <Box display="flex" flexDirection="column" alignItems="center" justifyContent="center" minHeight="100vh" marginTop={-10}>
      <Container maxWidth="lg">
        <h2>요청 목록</h2>
        {loading ? (
          <CircularProgress />
        ) : error ? (
          <p>{error}</p>
        ) : (
          <>
            <Grid container spacing={2} justifyContent="center">
              {currentItems.map((request) => (
                <Grid item xs={12} sm={6} md={3} key={request.id}>
                  <RequestCard request={request} sx={{ height: 300 }} />
                </Grid>
              ))}
            </Grid>
            <Box mt={3} display="flex" justifyContent="center">
              <Pagination 
                count={Math.ceil(requests.length / itemsPerPage)} 
                page={page} 
                onChange={(event, value) => setPage(value)} 
                color="primary"
              />
            </Box>
          </>
        )}
      </Container>
    </Box>
  );
};

export default MyRequests;