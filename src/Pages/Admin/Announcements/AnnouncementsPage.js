import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Button, Pagination, Box, TextField,Select, Typography, Dialog, DialogActions, DialogContent, DialogTitle, FormControl, MenuItem, InputLabel } from '@mui/material';
import { DatePicker } from '@mui/x-date-pickers/DatePicker'; // Tarih seçici
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { Link } from 'react-router-dom';
import dayjs from 'dayjs'; // Tarih formatlama için gerekli

function AnnouncementsPage() {
  const [records, setRecords] = useState([]);
  const [originalRecords, setOriginalRecords] = useState([]); // Orijinal kayıtlar
  const [currentPage, setCurrentPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedDate, setSelectedDate] = useState(null); // Tarih için state
  const [selectedWebsiteId, setSelectedWebsiteId] = useState("Hepsi"); // Seçilen website_id
  const [openDialog, setOpenDialog] = useState(false);
  const [selectedRecordId, setSelectedRecordId] = useState(null);
  const [websites, setWebsites] = useState([]); 
  const recordsPerPage = 7;


  useEffect(() => {
    const fetchWebsites = async () => {
      try {
        const res = await axios.get('https://home-repair-api.onrender.com/api/websites/detay'); // API'den web sitelerini çekme
        setWebsites(res.data);
        console.log(res.data)
      } catch (error) {
        console.log('Web siteleri alınırken bir hata oluştu:', error);
      }
    };
    fetchWebsites();
  }, []);
  useEffect(() => {
    const fetchAllRecords = async () => {
      try {
        const res = await axios.get("https://home-repair-api.onrender.com/api/duyuru/first");
        const sortedRecords = res.data.sort((a, b) => {
          if (b.id !== a.id) {
            return b.id - a.id;
          }
          const dateA = new Date(a.createdAt);
          const dateB = new Date(b.createdAt);
          return dateB - dateA;
        });

        setOriginalRecords(sortedRecords); // Orijinal kayıtları sakla
        setRecords(sortedRecords); // Tabloda gösterilecek kayıtlar
      } catch (error) {
        console.log(error);
      }
    };
    fetchAllRecords();
  }, []);

  const indexOfLastRecord = currentPage * recordsPerPage;
  const indexOfFirstRecord = indexOfLastRecord - recordsPerPage;
  const currentRecords = records.slice(indexOfFirstRecord, indexOfLastRecord);

  const handlePageChange = (event, value) => {
    setCurrentPage(value);
  };

  const handleSearch = async () => {
    try {
      let res;
      if (searchTerm !== "") {
        res = await axios.get(`https://home-repair-api.onrender.com/api/duyuru/search/${searchTerm}`);
      } else {
        res = await axios.get("https://home-repair-api.onrender.com/api/duyuru/first");
      }

      const sortedRecords = res.data.sort((a, b) => {
        if (b.id !== a.id) {
          return b.id - a.id;
        }
        const dateA = new Date(a.createdAt);
        const dateB = new Date(b.createdAt);
        return dateB - dateA;
      });

      setOriginalRecords(sortedRecords); // Orijinal kayıtları güncelle
      setRecords(sortedRecords); // Tabloda gösterilecek kayıtlar
    } catch (error) {
      console.log('Arama hatası:', error);
    }
  };

  const handleDateFilter = (date) => {
    setSelectedDate(date); // Seçilen tarihi state'e kaydet

    if (!date) {
      // Tarih sıfırlandıysa tüm kayıtları göster
      setRecords(originalRecords); // Orijinal kayıtları geri yükle
      return;
    }

    const formattedDate = dayjs(date).format('YYYY-MM-DD'); // Tarihi formatla
    const filteredRecords = originalRecords.filter((record) => {
      const recordDate = dayjs(record.createdAt).format('YYYY-MM-DD');
      return recordDate === formattedDate; // Sadece eşleşen tarihleri dahil et
    });

    setRecords(filteredRecords); // Filtrelenmiş kayıtları güncelle
  };
  const handleWebsiteFilter = (websiteId) => {
    setSelectedWebsiteId(websiteId);

    const filteredRecords = originalRecords.filter((record) => {
      const isDateMatch = selectedDate
        ? dayjs(record.createdAt).format('YYYY-MM-DD') === dayjs(selectedDate).format('YYYY-MM-DD')
        : true;

      const isWebsiteMatch = websiteId
        ? record.website_id === parseInt(websiteId, 10)
        : true;

      return isDateMatch && isWebsiteMatch;
    });

    setRecords(filteredRecords);
  };


  const handleOpenDialog = (id) => {
    setSelectedRecordId(id);
    setOpenDialog(true);
  };

  const handleDelete = async () => {
    try {
      await axios.delete(`https://home-repair-api.onrender.com/api/duyuru/delete/${selectedRecordId}`);
      setOriginalRecords((prevRecords) => prevRecords.filter((record) => record.id !== selectedRecordId));
      setRecords((prevRecords) => prevRecords.filter((record) => record.id !== selectedRecordId));
      alert('Duyuru başarıyla silindi!');
    } catch (error) {
      console.log('Silme hatası:', error);
      alert('Silme işlemi sırasında bir hata oluştu.');
    } finally {
      setOpenDialog(false);
      setSelectedRecordId(null);
    }
  };

  return (
    <Box sx={{ p: 3 }}>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', marginBottom: 3 }}>
        <TextField
          label="Duyuru Başlığı Ara"
          variant="outlined"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <Button variant="contained" color="primary" onClick={handleSearch}>
          Ara
        </Button>
      </Box>
      <Box sx={{ display: 'flex', gap: 3, alignItems: 'center', marginBottom: 3 }}>
        <LocalizationProvider dateAdapter={AdapterDayjs}>
          <DatePicker
            label="Tarihe Göre Filtrele"
            value={selectedDate}
            onChange={(newValue) => handleDateFilter(newValue)}
            renderInput={(params) => <TextField {...params} />}
          />
        </LocalizationProvider>
        <FormControl sx={{ minWidth: 200 }}>
          <InputLabel id="website-select-label">Websiteler</InputLabel>
          <Select
            labelId="website-select-label"
            value={selectedWebsiteId}
            onChange={(e) => handleWebsiteFilter(e.target.value)}
          >
            <MenuItem value="">Tüm Websiteler</MenuItem>
            {websites.map((website) => (
              <MenuItem key={website.website_id} value={website.website_id}>
                     {website.website_name}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      </Box>
      <TableContainer component={Paper} sx={{ marginTop: 3 }}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Id</TableCell>
              <TableCell>Duyuru Başlığı</TableCell>
              <TableCell>Duyuru Tarihi</TableCell>
              <TableCell>Aktiflik Durumu</TableCell>
              <TableCell align="right">İşlem</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {currentRecords.map((record) => (
              <TableRow key={record.id}>
                <TableCell>{record.id}</TableCell>
                <TableCell
                  sx={{
                    maxWidth: 200,
                    overflow: 'hidden',
                    textOverflow: 'ellipsis',
                    whiteSpace: 'nowrap',
                  }}
                >
                  {record.duyuru_title}
                </TableCell>
                <TableCell>{record.duyuru_date}</TableCell>
                <TableCell>
                  <Typography
                    variant="body2"
                    style={{ color: record.active === 'aktif' || record.active === null || record.active === '' ? 'green' : 'red' }}
                  >
                    {record.active === 'aktif' || record.active === null || record.active === '' ? 'Aktif' : 'Pasif'}
                  </Typography>
                </TableCell>
                <TableCell align="right">
                  <Link to={`/admin/duyuru/update/${record.id}`} state={{ id: record.id }}>
                    <Button variant="contained" color="primary" style={{ marginRight: 10 }}>
                      Güncelle
                    </Button>
                  </Link>
                  <Button
                    variant="contained"
                    color="error"
                    onClick={() => handleOpenDialog(record.id)}
                  >
                    Sil
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      <Box sx={{ display: 'flex', justifyContent: 'center', marginTop: 3 }}>
        <Pagination
          count={Math.ceil(records.length / recordsPerPage)}
          page={currentPage}
          onChange={handlePageChange}
          color="primary"
        />
      </Box>

      <Dialog open={openDialog} onClose={() => setOpenDialog(false)}>
        <DialogTitle>Silme Onayı</DialogTitle>
        <DialogContent>
          <Typography>
            Bu duyuruyu silmek istediğinizden emin misiniz? Sistemimiz otomatik olarak siteleri taradığından, var olan bu duyuruyu silerseniz tekrar sistemde oluşacaktır. Eğer duyuru asıl sitesinden silinmişse duyuruyu siliniz, eğer değilse güncelleme sayfasından duyuruyu pasife alınız.
          </Typography>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpenDialog(false)} color="primary">
            İptal
          </Button>
          <Button onClick={handleDelete} color="error">
            Sil
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
}

export default AnnouncementsPage;
