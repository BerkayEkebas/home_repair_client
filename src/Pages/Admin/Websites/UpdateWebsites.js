import React, { useState, useEffect } from "react";
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, TablePagination, Paper, Button } from "@mui/material";
import axios from "axios";
import { Link } from "react-router-dom";

const UpdateWebsites = () => {
  const [websites, setWebsites] = useState([]);
  const [page, setPage] = useState(0);
  const rowsPerPage = 5; // Her sayfada gösterilecek satır sayısı

  // Web siteleri verisini API'den al
  useEffect(() => {
    const fetchWebsites = async () => {
      try {
        const res = await axios.get("https://home-repair-api.onrender.com/api/websites/detay");
        setWebsites(res.data); // API'den alınan veriyi websites state'ine aktar
        console.log(res.data)
      } catch (error) {
        console.error("Veri çekme hatası:", error);
      }
    };
    fetchWebsites();
  }, []);

  // Sayfa değişikliği için event handler
  const handleChangePage = (event, newPage) => {
    setPage(newPage); // Yeni sayfa numarasını state'e aktar
  };

  // Sayfa başına satır sayısını değiştirme fonksiyonu
  const handleChangeRowsPerPage = (event) => {
    setPage(0); // Sayfa sıfırlama
  };

  return (
    <TableContainer sx={{ marginLeft: 0 }} component={Paper}>
      <Table sx={{ tableLayout: "fixed" }}>
        <TableHead>
          <TableRow>
            <TableCell>Website Adı</TableCell>
            <TableCell align="right">
            <Link style={{color:'white'}} to={`/admin/allimages`}><Button variant="contained" color="success">Tüm resimleri yönet</Button></Link>
            </TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {websites.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((website) => (
            <TableRow key={website.website_id}>
              <TableCell>{website.website_name}</TableCell>
              <TableCell align="right">
                <Link to={`/admin/websites/update/${website.website_id}`}>
                  <Button variant="contained" color="primary">Güncelle</Button>
                </Link>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>

      {/* Sayfalama bileşeni */}
      <TablePagination
        component="div"
        count={websites.length}              
        rowsPerPage={rowsPerPage}             
        page={page}                           
        onPageChange={handleChangePage}       
        rowsPerPageOptions={[5, 10, 25]}      
        onRowsPerPageChange={handleChangeRowsPerPage} 
        labelRowsPerPage="Satır başına"       
        sx={{ marginLeft: 0 }} 
      />
    </TableContainer>
  );
};

export default UpdateWebsites;
