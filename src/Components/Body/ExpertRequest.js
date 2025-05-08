import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Box, Container, CircularProgress, Pagination, Select, MenuItem, InputLabel, FormControl } from '@mui/material';
import ExpertRequestCard from './ExpertRequestCard';

const servicesList = [
  { id: 1, name: '일반 수리' },
  { id: 2, name: '창문/도어' },
  { id: 3, name: '화장실' },
  { id: 4, name: '부엌' },
  { id: 5, name: '조명/전기' },
  { id: 6, name: '목공' },
  { id: 7, name: '바닥 설치/수리' },
  { id: 8, name: '기타 수리' }
];

const ExpertRequests = () => {
  const [requests, setRequests] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [page, setPage] = useState(1);
  const [selectedServiceId, setSelectedServiceId] = useState('');
  const requestsPerPage = 8;

  useEffect(() => {
    const fetchRequests = async () => {
      try {
        const response = await axios.get('https://home-repair-api.onrender.com/api/expert/get-requests');
        const filteredRequests = response.data.filter(request => request.status !== 'accepted');
        setRequests(filteredRequests);
      } catch (err) {
        setError('요청을 가져오는 중 오류가 발생했습니다.');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchRequests();
  }, []);

  const handleServiceFilterChange = (event) => {
    setSelectedServiceId(event.target.value ? Number(event.target.value) : '');
    setPage(1);
  };

  const handleOfferClick = (requestId) => {
    console.log('Teklif Ver butonuna tıklandı, talep ID:', requestId);
  };

  const handleChangePage = (event, value) => {
    setPage(value);
  };

  const filteredRequests = selectedServiceId
    ? requests.filter((request) => request.service_id === Number(selectedServiceId))
    : requests;

  const startIndex = (page - 1) * requestsPerPage;
  const selectedRequests = filteredRequests.slice(startIndex, startIndex + requestsPerPage);

  return (
    <Box display="flex" flexDirection="column" alignItems="center" minHeight="100vh" p={3}>
      <Container maxWidth="md">
        <h2>모든 요청 보기</h2>

        <FormControl fullWidth>
          <InputLabel>서비스 필터</InputLabel>
          <Select
            value={selectedServiceId}
            onChange={handleServiceFilterChange}
            label="서비스 필터"
          >
            <MenuItem value="">
              <em>모든 서비스</em>
            </MenuItem>
            {servicesList.map((service) => (
              <MenuItem key={service.id} value={service.id}>
                {service.name}
              </MenuItem>
            ))}
          </Select>
        </FormControl>

        {loading ? (
          <CircularProgress />
        ) : error ? (
          <p>{error}</p>
        ) : (
          <>
            <Box display="grid" gridTemplateColumns="repeat(4, 1fr)" gap={2}>
              {selectedRequests.map((request) => (
                <ExpertRequestCard
                  key={request.id}
                  request={request}
                  onOfferClick={handleOfferClick}
                />
              ))}
            </Box>
            <Box mt={3} display="flex" justifyContent="center">
              <Pagination
                count={Math.ceil(filteredRequests.length / requestsPerPage)}
                page={page}
                onChange={handleChangePage}
                color="primary"
              />
            </Box>
          </>
        )}
      </Container>
    </Box>
  );
};

export default ExpertRequests;