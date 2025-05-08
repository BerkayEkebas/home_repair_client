import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Typography } from '@mui/material';
import { Pie } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  Title,
  Tooltip,
  Legend,
  ArcElement,
} from 'chart.js';

// Register Chart.js components
ChartJS.register(
  Title,
  Tooltip,
  Legend,
  ArcElement
);

const DashBoard = () => {
  const [websites, setWebsites] = useState([]);
  const [tags, setTags] = useState({});

  useEffect(() => {
    const fetchWebsites = async () => {
      try {
        const res = await axios.get('https://home-repair-api.onrender.com/api/websites/detay'); // API'den web sitelerini çekme
        setWebsites(res.data);

        // Tags verilerini işleme
        const tagCounts = {};
        res.data.forEach((website) => {
          const tag = website.tags; // Her bir tag string olarak geliyor
          tagCounts[tag] = (tagCounts[tag] || 0) + 1;
        });
        setTags(tagCounts);
      } catch (error) {
        console.log('Web siteleri alınırken bir hata oluştu:', error);
      }
    };
    fetchWebsites();
  }, []);

  const pieChartData = {
    labels: Object.keys(tags),
    datasets: [
      {
        label: 'Tags Dağılımı',
        data: Object.values(tags),
        backgroundColor: ['#ff6384', '#36a2eb', '#cc65fe', '#ffce56', '#36a2eb'],
      },
    ],
  };

  return (
    <div style={{ padding: '16px' }}>
      <Typography variant="h4" gutterBottom>Dashboard'a Hoşgeldin</Typography>
      <div style={{ display: 'flex', gap: '16px' }}>
        <div style={{ flex: 1 }}>
          <Typography variant="h6" sx={{ mb: 2 }}>Web Siteleri</Typography>
          <TableContainer component={Paper} sx={{ mb: 4 }}>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>İD</TableCell>
                  <TableCell>İsim</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {websites.map((website) => (
                  <TableRow key={website.website_id}>
                    <TableCell>{website.website_id}</TableCell>
                    <TableCell>{website.website_name}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </div>
        <div style={{ flex: 1 }}>
          <Typography variant="h6" sx={{ mb: 2 }}>Tag Dağılımı</Typography>
          <div style={{ width: '100%', height: '400px' }}>
            <Pie data={pieChartData} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashBoard;
