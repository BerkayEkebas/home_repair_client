import React, { useState, useEffect } from "react";
import { TextField, Button, Box, Typography, Dialog, DialogActions, DialogContent, IconButton } from "@mui/material";
import HelpOutlineIcon from '@mui/icons-material/HelpOutline'; // Soru işareti ikonu
import axios from "axios";

const ManageAds = () => {
  const [adsData, setAdsData] = useState([]);
  const [openDialog, setOpenDialog] = useState(false); // Dialog'u kontrol etmek için state
  const [dialogContent, setDialogContent] = useState({ text: "", imgSrc: "" }); // Dialog içeriği

  // API'den verileri çek
  useEffect(() => {
    const fetchAdsData = async () => {
      try {
        const response = await axios.get("https://home-repair-api.onrender.com/api/ads/allAds");
        setAdsData(response.data); // Gelen tüm verileri adsData'ya ata
      } catch (error) {
        console.error("Error fetching ads data:", error);
      }
    };

    fetchAdsData();
  }, []);

  // Form alanı değişikliklerini yönet
  const handleChange = (index, field, value) => {
    setAdsData((prev) =>
      prev.map((ad, i) =>
        i === index ? { ...ad, [field]: value } : ad
      )
    );
  };

  // Her bir kaydı ayrı ayrı güncelle
  const handleUpdate = async () => {
    try {
      // Her bir reklam için PUT isteği gönder
      for (const ad of adsData) {
        await axios.put("https://home-repair-api.onrender.com/api/ads/update", ad);
      }
      alert(`Reklamlar başarıyla güncellendi`);
    } catch (error) {
      console.error("Error updating ads:", error);
      alert("Failed to update ads.");
    }
  };

  // Dialog'u açma
  const handleOpenDialog = () => {
    setDialogContent({
      text: "Reklam Alanları göründüğü gibidir boyut olarak benzer ya da yakın boyutlarda jpg formatinda yüklenmelidir",
      imgSrc: "https://www.duyurular.org/duyurular_images/reklamalanlari.jpg" // Burayı dinamik olarak değiştirebilirsiniz
    });
    setOpenDialog(true); // Dialog'u aç
  };

  // Dialog'u kapama
  const handleCloseDialog = () => {
    setOpenDialog(false); // Dialog'u kapat
  };

  return (
    <Box sx={{ maxWidth: 600, margin: "auto", mt: 4 }}>
      <Typography variant="h5" sx={{ mb: 2 }}>
        Reklam alanlarını güncelle
        <IconButton
        onClick={handleOpenDialog}
      >
        <HelpOutlineIcon fontSize="large" />
      </IconButton>
      </Typography>

      {/* Sağ üst köşede soru işareti ikonu */}


      {adsData.map((ad, index) => (
        <Box key={ad.id} sx={{ mb: 3, borderBottom: "1px solid #ccc", pb: 2 }}>
          <Typography variant="h6" sx={{ mb: 1 }}>
            Reklam Alanı {ad.id}
          </Typography>
          <TextField
            label="Reklam ismi"
            value={ad.ads_name}
            onChange={(e) => handleChange(index, "ads_name", e.target.value)}
            fullWidth
            sx={{ mb: 2 }}
          />
          <TextField
            label="Reklam resim URLsi"
            value={ad.ads_image_url}
            onChange={(e) => handleChange(index, "ads_image_url", e.target.value)}
            fullWidth
            sx={{ mb: 2 }}
          />
          <TextField
            label="Reklamın Websitesi"
            value={ad.ads_website}
            onChange={(e) => handleChange(index, "ads_website", e.target.value)}
            fullWidth
          />
        </Box>
      ))}

      <Button variant="contained" color="primary" onClick={handleUpdate}>
         Güncelle
      </Button>

      {/* Dialog Pop-up */}
      <Dialog open={openDialog} onClose={handleCloseDialog}>
        <DialogContent>
          <Typography variant="h6">Açıklama</Typography>
          <Typography variant="body1" sx={{ mb: 2 }}>
            {dialogContent.text}
          </Typography>
          {dialogContent.imgSrc && (
            <img
              src={dialogContent.imgSrc}
              alt=""
              style={{ maxWidth: "100%", height: "auto" }}
            />
          )}
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDialog} color="primary">
            Kapat
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default ManageAds;
