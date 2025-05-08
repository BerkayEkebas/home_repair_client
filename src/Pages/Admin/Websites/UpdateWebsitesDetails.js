import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Button, TextField, Modal, Box, ToggleButton, ToggleButtonGroup, IconButton } from "@mui/material";
import TablePagination from "@mui/material/TablePagination";
import CloseIcon from "@mui/icons-material/Close"; // X simgesi için

const UpdateWebsitesDetails = () => {
  const { id } = useParams();
  const [websiteDetails, setWebsiteDetails] = useState(null);
  const [logoImages, setLogoImages] = useState([]); // Sol tablo için ayrı state
  const [announcementImages, setAnnouncementImages] = useState([]); // Sağ tablo için ayrı state
  const [updatedLogoImages, setUpdatedLogoImages] = useState([]); // Sol tabloyu güncellemek için
  const [updatedAnnouncementImages, setUpdatedAnnouncementImages] = useState([]); // Sağ tabloyu güncellemek için
  const [pageLogo, setPageLogo] = useState(0);  // Logo resmi için sayfa yönetimi
  const [pageAnnouncement, setPageAnnouncement] = useState(0);  // Duyuru resmi için sayfa yönetimi
  const [openModal, setOpenModal] = useState(false);  // Modal açma kapama
  const [newImageUrl, setNewImageUrl] = useState("");  // Yeni resim URL'si
  const [isLogo, setIsLogo] = useState("image");  // Logo durumu (default olarak 'image')
  // API'den veriyi çekmek için useEffect
  useEffect(() => {
    const fetchWebsiteDetails = async () => {
      try {
        const response = await axios.get(`https://home-repair-api.onrender.com/api/websites/detaylar/${id}`);
        if (response.data) {
          setWebsiteDetails(response.data[0]);
        }
      } catch (error) {
        console.error("Veri çekme hatası:", error);
      }
    };

    const fetchImages = async () => {
      try {
        const response = await axios.get(`https://home-repair-api.onrender.com/api/websites/getImages/${id}`);
        if (response.data) {
          // Resimleri ayırarak set ediyoruz
          const logos = response.data.filter(image => image.islogo === 1);
          const announcements = response.data.filter(image => image.islogo === 0);
          setLogoImages(logos);
          setAnnouncementImages(announcements);
          setUpdatedLogoImages(logos);
          setUpdatedAnnouncementImages(announcements);
        }
      } catch (error) {
        console.error("Veri çekme hatası:", error);
      }
    };

    if (id) {
      fetchWebsiteDetails();
      fetchImages();
    }
  }, [id]);

  // Sayfa değiştirme fonksiyonları
  const handleChangePageLogo = (event, newPage) => {
    setPageLogo(newPage);
  };

  const handleChangePageAnnouncement = (event, newPage) => {
    setPageAnnouncement(newPage);
  };

  const handleImageUrlChange = (index, newUrl, isLogoImage) => {
    const currentPage = isLogoImage ? pageLogo : pageAnnouncement;
    const actualIndex = (currentPage) * 5 + index;
    const updated = isLogoImage ? [...updatedLogoImages] : [...updatedAnnouncementImages];
    updated[actualIndex] = { ...updated[actualIndex], image: 'https://www.duyurular.org/duyurular_images/' + newUrl };
    if (isLogoImage) {
      setUpdatedLogoImages(updated);
      console.log(updated)
    } else {
      setUpdatedAnnouncementImages(updated);
    }
  };

  // Resim ekleme fonksiyonu (modal açma)
  const handleAddImage = () => {
    setOpenModal(true);
  };

  // Resim ekleme işlemi
  const handleAddNewImage = async () => {
    if (!isLogo) {
      alert("Lütfen bir resim türü seçin.");
      return;
    }

    // "isLogo" değerini TINYINT (0 ya da 1) formatına dönüştürme
    const isLogoValue = isLogo === "logo" ? 1 : 0;

    const newImage = {
      image: newImageUrl,
      website_id: id,
      islogo: isLogoValue, // 0 veya 1 olarak gönderiliyor
    };

    try {
      // API'ye POST isteği gönderme
      const response = await axios.post('https://home-repair-api.onrender.com/api/websites/addImages', newImage);

      // API yanıtındaki "message" değerine göre kontrol yapma
      if (response.data.message === "Resim başarıyla eklendi") {
        if (isLogoValue === 1) {
          setUpdatedLogoImages([...updatedLogoImages, newImage]);
        } else {
          setUpdatedAnnouncementImages([...updatedAnnouncementImages, newImage]);
        }
        alert("Resim başarıyla eklendi!");
        setTimeout(() => {
          window.location.reload();
        }, 300);
      } else {
        alert("Resim ekleme işlemi başarısız.");
      }

      // Modal'ı kapatma ve inputları sıfırlama
      setOpenModal(false);
      setNewImageUrl("");
      setIsLogo("image");

    } catch (error) {
      console.error("Resim ekleme hatası:", error);
      alert("Resim eklenirken bir hata oluştu.");
    }
  };

  const handleDeleteImage = async (imageId) => {
    try {
      // API'ye DELETE isteği gönderme (body üzerinden ID gönderiyoruz)
      const response = await axios.delete('https://home-repair-api.onrender.com/api/websites/deleteImage', {
        data: { imageId } // data ile body içeriğini gönderiyoruz
      });

      // Başarılı işlem sonrası resmin listeden silinmesi
      if (response.data.message === "Resim başarıyla silindi") {
        alert("Resim başarıyla silindi!");
        setTimeout(() => {
          window.location.reload();
        }, 300);
      } else {
        alert("Resim silme işlemi başarısız.");
      }
    } catch (error) {
      console.error("Resim silme hatası:", error);
      alert("Resim silinirken bir hata oluştu.");
    }
  };

  const handleUpdateImage = async (image) => {
    console.log("Güncellenen resim:", image); // image nesnesini kontrol edin

    try {
      // POST isteği gönderiyoruz
      const response = await axios.post('https://home-repair-api.onrender.com/api/websites/updateImages', image, {
        headers: {
          'Content-Type': 'application/json', // JSON formatında veri gönderiyoruz
        },
      });

      // API yanıtına göre işlem
      if (response.data.message === "Resim başarıyla güncellendi") {
        alert("Resim başarıyla güncellendi!");
        // Güncellediğiniz resmin state'ini burada güncelleyebilirsiniz.
      } else {
        alert("Resim güncelleme işlemi başarısız.");
      }
    } catch (error) {
      console.error("Resim güncelleme hatası:", error);
      alert("Resim güncellenirken bir hata oluştu.");
    }
  };

  return websiteDetails === null || (logoImages.length === 0 && announcementImages.length === 0) ? (
    <p>Yükleniyor...</p>
  ) : (
    <div>
      <h2>Website Detayları</h2>
      <div style={{ marginBottom: "20px" }}>
        <strong>Website Adı:</strong> {websiteDetails.website_name}
      </div>
      <div style={{ marginBottom: "20px" }}>
        <strong>Tags:</strong> {websiteDetails.tags}
      </div>

      {/* Resim Ekle Butonu (Tabloların üstüne alındı) */}
      <Button variant="contained" onClick={handleAddImage} style={{ marginBottom: "20px" }}>
        + Resim Ekle
      </Button>

      {/* Sol ve sağdaki tablolar */}
      <div style={{ display: "flex", justifyContent: "space-between" }}>
        {/* Logo olan resimler */}
        <TableContainer component={Paper} style={{ width: "48%" }}>
          <h3>Logo Resimleri</h3>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Resim</TableCell>
                <TableCell>Resim İsmi</TableCell>
                <TableCell>Güncelle</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {updatedLogoImages
                .slice(pageLogo * 5, pageLogo * 5 + 5) // 5 öğe ile sınırlı
                .map((image, index) => (
                  <TableRow key={index}>
                    <TableCell>
                      <img src={image.image} alt={`image-${index}`} style={{ width: "100px", height: "auto" }} />
                    </TableCell>
                    <TableCell>
                      <TextField
                        value={image.image.replace("https://www.duyurular.org/duyurular_images/", "")}
                        onChange={(e) => handleImageUrlChange(index, e.target.value, true)}  // URL güncellenmesi
                        fullWidth
                      />
                    </TableCell>
                    <TableCell>
                      <Button
                        onClick={() => handleUpdateImage(image)}
                        variant="contained"
                        sx={{
                          marginBottom: 1, // Butonlar arasına boşluk eklemek için
                          fontSize: '0.75rem', // Küçük font boyutu
                          padding: '4px 8px', // Butonun boyutunu küçültmek için
                          width: '100%',
                          display: 'block' // Butonları alt alta sıralamak için
                        }}
                      >
                        Güncelle
                      </Button>
                      <Button
                        onClick={() => handleDeleteImage(image.image_id)}
                        variant="contained"
                        sx={{
                          backgroundColor: 'red',
                          '&:hover': { backgroundColor: '#d32f2f' }, // Sil butonunun kırmızı arka planı
                          marginTop: 1, // Butonlar arasına boşluk eklemek için
                          fontSize: '0.75rem', // Küçük font boyutu
                          padding: '4px 8px', // Butonun boyutunu küçültmek için
                          width: '100%',
                          display: 'block' // Butonları alt alta sıralamak için
                        }}
                      >
                        Sil
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
            </TableBody>
          </Table>
          <TablePagination
            rowsPerPageOptions={[5]}
            component="div"
            count={updatedLogoImages.length}
            rowsPerPage={5}
            page={pageLogo}
            onPageChange={handleChangePageLogo}
          />
        </TableContainer>

        {/* Duyuru resimleri */}
        <TableContainer component={Paper} style={{ width: "48%" }}>
          <h3>Duyuru Resimleri</h3>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Resim</TableCell>
                <TableCell>Resim İsmi</TableCell>
                <TableCell>Güncelle</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {updatedAnnouncementImages
                .slice(pageAnnouncement * 5, pageAnnouncement * 5 + 5) // 5 öğe ile sınırlı
                .map((image, index) => (
                  <TableRow key={index}>
                    <TableCell>
                      <img src={image.image} alt={`image-${index}`} style={{ width: "100px", height: "auto" }} />
                    </TableCell>
                    <TableCell>
                      <TextField
                        value={image.image.replace("https://www.duyurular.org/duyurular_images/", "")} // URL'den belirli kısmı çıkar
                        onChange={(e) => handleImageUrlChange(index, e.target.value, false)} // URL güncellenmesi
                        fullWidth
                      />
                    </TableCell>
                    <TableCell>
                      <Button
                        onClick={() => handleUpdateImage(image)}
                        variant="contained"
                        sx={{
                          marginBottom: 1, // Butonlar arasına boşluk eklemek için
                          fontSize: '0.75rem', // Küçük font boyutu
                          padding: '4px 8px', // Butonun boyutunu küçültmek için
                          width: '100%',
                          display: 'block' // Butonları alt alta sıralamak için
                        }}
                      >
                        Güncelle
                      </Button>
                      <Button
                        onClick={() => handleDeleteImage(image.image_id)}
                        variant="contained"
                        sx={{
                          backgroundColor: 'red',
                          '&:hover': { backgroundColor: '#d32f2f' }, // Sil butonunun kırmızı arka planı
                          marginTop: 1, // Butonlar arasına boşluk eklemek için
                          fontSize: '0.75rem', // Küçük font boyutu
                          padding: '4px 8px', // Butonun boyutunu küçültmek için
                          width: '100%',
                          display: 'block' // Butonları alt alta sıralamak için
                        }}
                      >
                        Sil
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
            </TableBody>
          </Table>
          <TablePagination
            rowsPerPageOptions={[5]}
            component="div"
            count={updatedAnnouncementImages.length}
            rowsPerPage={5}
            page={pageAnnouncement}
            onPageChange={handleChangePageAnnouncement}
          />
        </TableContainer>
      </div>

      {/* Modal alanı */}
      {/* Modal Pop-Up */}
      <Modal
        open={openModal}
        onClose={() => setOpenModal(false)}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', bgcolor: 'background.paper', boxShadow: 24, p: 4 }}>
          <IconButton
            onClick={() => setOpenModal(false)}
            sx={{ position: 'absolute', top: 8, right: 8 }}
          >
            <CloseIcon />
          </IconButton>
          <h2>Yeni Resim Ekle</h2>
          <TextField
            label="Resim ismi"
            onChange={(e) => setNewImageUrl('https://www.duyurular.org/duyurular_images/'+e.target.value)}
            fullWidth
          />
          <ToggleButtonGroup
            value={isLogo}
            exclusive
            onChange={(event, newAlignment) => {
              if (newAlignment) setIsLogo(newAlignment);
            }}
            aria-label="image or logo"
            fullWidth
            sx={{ marginTop: 2 }}
          >
            <ToggleButton
              value="image"
              aria-label="image"
              sx={{
                flexGrow: 1,
                backgroundColor: isLogo === "image" ? "#13bd16 !important" : "", // Image seçildiğinde yeşil
                color: isLogo === "image" ? "white" : "inherit", // Metin rengini de değiştirebilirsiniz
              }}
            >
              Resim
            </ToggleButton>
            <ToggleButton
              value="logo"
              aria-label="logo"
              sx={{
                flexGrow: 1,
                backgroundColor: isLogo === "logo" ? "#13bd16 !important" : "", // Logo seçildiğinde yeşil
                color: isLogo === "logo" ? "white" : "inherit", // Metin rengini de değiştirebilirsiniz
              }}
            >
              Logo
            </ToggleButton>
          </ToggleButtonGroup>
          <Button variant="contained" onClick={handleAddNewImage} fullWidth sx={{ marginTop: 2 }}>
            Resim Ekle
          </Button>
        </Box>
      </Modal>
    </div>
  );
};

export default UpdateWebsitesDetails;
