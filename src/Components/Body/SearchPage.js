import React, { useEffect, useState } from "react";
import axios from "axios";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Box,
  Typography,
  TablePagination,
} from "@mui/material";
import { Link, useParams } from "react-router-dom";

function SearchPage() {
  const { searchTerm } = useParams();
  const [results, setResults] = useState([]);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);

  useEffect(() => {
    const fetchSearchResults = async () => {
      try {
        let res;
        if (searchTerm) {
          res = await axios.get(
            `https://home-repair-api.onrender.com/api/duyuru/search/${searchTerm}`
          );
        } else {
          res = await axios.get("https://home-repair-api.onrender.com/api/duyuru/first");
        }

        const filteredRecords = res.data.filter(
          (record) => record.active !== "pasif"
        );

        // id'ye göre sıralama (büyükten küçüğe) ve ardından createdAt tarihine göre (en yeni tarih üste) sıralama
        const sortedRecords = filteredRecords.sort((a, b) => {
          if (b.id !== a.id) {
            return b.id - a.id; // id'ye göre sıralama
          }
          const dateA = new Date(a.createdAt);
          const dateB = new Date(b.createdAt);
          return dateB - dateA; // createdAt'a göre sıralama (en yeni tarih üste)
        });

        setResults(sortedRecords);
      } catch (error) {
        console.log("Arama hatası:", error);
      }
    };

    fetchSearchResults();
  }, [searchTerm]);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const cleanTitle = (title) => {
    return title?.replace(/^[^\w\sİıĞğÜüŞşÇçÖö'"]+/g, "").trim() || ""; // ' ve " karakterlerini koruyacak
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const handleClick = (record) => {
    const slug = record.duyuru_link
    ?.split('/')
    .filter(Boolean)
    .pop()
    .replace('?', ''); 
    return slug;
  };

  return (
    <Box sx={{ p: 3 }}>
      <Typography variant="h4" gutterBottom>
        Arama Sonuçları
      </Typography>
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Duyuru Başlığı</TableCell>
              <TableCell>Duyuru Tarihi</TableCell>
              <TableCell>Duyuruyu Yayınlayan</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {results
              .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
              .map((record) => (
                <TableRow key={record.id}>
                  <TableCell>
                    <Link
                      to={
                        record.duyuru_content !== ""
                          ? `/duyuru/${handleClick(record)}-${record.id}`
                          : record.duyuru_link
                      }
                      state={{ id: record.id }}
                    >
                      {cleanTitle(record.duyuru_title)}
                    </Link>
                  </TableCell>
                  <TableCell>{record.duyuru_date}</TableCell>
                  <TableCell>{record.name}</TableCell>
                </TableRow>
              ))}
          </TableBody>
        </Table>
      </TableContainer>
      <Box sx={{ display: "flex", justifyContent: "center", mt: 2 }}>
        <TablePagination
          rowsPerPageOptions={[5, 10, 25]}
          component="div"
          count={results.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
          labelRowsPerPage="Sayfa başına kayıt"
          labelDisplayedRows={({ from, to, count }) =>
            `${from}-${to} arası, toplam ${count}`
          }
        />
      </Box>
    </Box>
  );
  
}

export default SearchPage;
