import React, { useState, useEffect, useCallback } from 'react';
import axios from 'axios';
import { Button, TextField, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Pagination, Box } from '@mui/material';
import { Delete as DeleteIcon } from '@mui/icons-material';

const ManageImages = () => {
    const [images, setImages] = useState([]);
    const [previewUrls, setPreviewUrls] = useState([]);
    const [uploading, setUploading] = useState(false);
    const [fileList, setFileList] = useState([]);
    const [searchTerm, setSearchTerm] = useState(''); // Kullanıcı girişini tutar
    const [searchQuery, setSearchQuery] = useState(''); // Arama butonuyla tetiklenen sorgu
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);

    const itemsPerPage = 10;

    const fetchFiles = useCallback(async () => {
        try {
            const response = await axios.get('https://home-repair-api.onrender.com/api/images/files');
            const files = response.data.files;
            const filteredFiles = files.filter((file) =>
                file.toLowerCase().includes(searchQuery.toLowerCase())
            );

            const totalItems = filteredFiles.length;
            const totalPagesCalculated = Math.ceil(totalItems / itemsPerPage);

            setTotalPages(totalPagesCalculated);
            const startIndex = (currentPage - 1) * itemsPerPage;
            const endIndex = startIndex + itemsPerPage;

            setFileList(filteredFiles.slice(startIndex, endIndex));
        } catch (error) {
            alert('Dosyalar alınırken bir hata oluştu.');
        }
    }, [searchQuery, currentPage, itemsPerPage]);

    const handleImageUpload = (event) => {
        const files = Array.from(event.target.files);
        const validImages = files.filter(file => file.type.startsWith('image/'));
        if (validImages.length > 0) {
            const previewUrls = validImages.map(file => URL.createObjectURL(file));
            setImages(validImages);
            setPreviewUrls(previewUrls);
        } else {
            alert('Lütfen geçerli bir resim dosyası seçin.');
        }
    };

    const handleImageUploadToServer = async () => {
        if (images.length === 0) {
            alert('Önce resim seçin!');
            return;
        }

        const formData = new FormData();
        images.forEach(image => formData.append('files', image));

        try {
            setUploading(true);
            await axios.post('https://home-repair-api.onrender.com/api/images/upload', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            });

            setUploading(false);
            alert('Resimler başarıyla yüklendi!');
            setPreviewUrls([]);
            setImages([]);
            fetchFiles();
        } catch (error) {
            setUploading(false);
            alert('Yükleme sırasında bir hata oluştu!');
        }
    };

    const handleDeleteFile = async (filename) => {
        try {
            await axios.delete(`https://home-repair-api.onrender.com/api/images/files/${filename}`);
            alert('Dosya başarıyla silindi!');
            fetchFiles();
        } catch (error) {
            alert('Dosya silinirken bir hata oluştu!');
        }
    };

    const handleSearch = () => {
        setSearchQuery(searchTerm); // "Ara" butonuna basıldığında sorgu başlat
        setCurrentPage(1); // İlk sayfaya dön
    };

    const handlePageChange = (event, pageNumber) => {
        setCurrentPage(pageNumber);
    };

    useEffect(() => {
        fetchFiles();
    }, [searchQuery, currentPage, fetchFiles]);

    const decodeUtf8 = (str) => {
        try {
            return decodeURIComponent(escape(str));
        } catch (e) {
            return str;
        }
    };

    return (
        <Box sx={{ padding: 3 }}>
            <h1>Toplu Resim Yükleme ve Dosya Yönetimi</h1>

            {/* Arama Alanı */}
            <Box sx={{ display: 'flex', gap: 2, marginBottom: 3 }}>
                <TextField
                    label="Resim ismine göre ara"
                    variant="outlined"
                    fullWidth
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                />
                <Button
                    variant="contained"
                    color="primary"
                    onClick={handleSearch} // "Ara" butonuna tıklanırsa
                >
                    Ara
                </Button>
            </Box>

            {/* Dosya Seçim */}
            <Button
                variant="contained"
                component="label"
                color="primary"
            >
                Resim Yükle
                <input
                    type="file"
                    accept="image/*"
                    multiple
                    onChange={handleImageUpload}
                    hidden
                />
            </Button>

            {/* Resim Önizlemeleri */}
            {previewUrls.length > 0 && (
                <Box sx={{ marginTop: 2, display: 'flex', flexWrap: 'wrap', gap: 2 }}>
                    {previewUrls.map((url, index) => (
                        <div key={index}>
                            <img src={url} alt={`Preview ${index}`} width="100" style={{ marginRight: '10px' }} />
                        </div>
                    ))}
                    <Box sx={{ marginTop: 1, width: '100%' }}>
                        <Button variant="contained" color="success" onClick={handleImageUploadToServer} disabled={uploading}>
                            {uploading ? 'Yükleniyor...' : 'Resimleri Yükle'}
                        </Button>
                    </Box>
                </Box>
            )}

            {/* Dosya Listesi */}
            <TableContainer component={Paper} sx={{ marginTop: 2 }}>
                <Table>
                    <TableHead>
                        <TableRow>
                            <TableCell>Resimin İsmi</TableCell>
                            <TableCell>Resim</TableCell>
                            <TableCell>İşlem</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {fileList.length > 0 ? (
                            fileList.map((file, index) => (
                                <TableRow key={index}>
                                    <TableCell>
                                        {decodeUtf8(file)}
                                    </TableCell>
                                    <TableCell>
                                        <img style={{ width: '80px', height: '80px' }} src={`https://www.duyurular.org/duyurular_images/${decodeUtf8(file)}`} alt='duyurular_images' />
                                    </TableCell>
                                    <TableCell>
                                        <Button
                                            variant="contained"
                                            color="error"
                                            startIcon={<DeleteIcon />}
                                            onClick={() => handleDeleteFile(file)}
                                        >
                                            Sil
                                        </Button>
                                    </TableCell>
                                </TableRow>
                            ))
                        ) : (
                            <TableRow>
                                <TableCell colSpan={2} align="center">Henüz dosya yok.</TableCell>
                            </TableRow>
                        )}
                    </TableBody>
                </Table>
            </TableContainer>

            {/* Sayfalama */}
            <Box sx={{ marginTop: 2, display: 'flex', justifyContent: 'center' }}>
                <Pagination
                    count={totalPages}
                    page={currentPage}
                    onChange={handlePageChange}
                    color="primary"
                />
            </Box>
        </Box>
    );
};

export default ManageImages;
