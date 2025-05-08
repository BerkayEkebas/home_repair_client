import React, { useEffect, useState } from "react";
import { Box, Typography } from "@mui/material";
import axios from "axios";
import { Link, useLocation } from "react-router-dom";

function Sidebar() {
  const [latestAnnouncements, setLatestAnnouncements] = useState([]);
  const [adsimages, setAdsImages] = useState([]);
  const location = useLocation();  // Geçerli URL'yi almak için kullanılıyor


  useEffect(() => {
    // API'den verileri çekmek için useEffect kullanıyoruz
    const fetchMostViewedAnnouncements = async () => {
      try {
        const response = await axios.get("https://home-repair-api.onrender.com/api/duyuru/mostviewed");
        setLatestAnnouncements(response.data);
        const resImages = await axios.get("https://home-repair-api.onrender.com/api/ads/allAds");
        setAdsImages(resImages.data);

      } catch (error) {
        console.error("Error fetching most viewed announcements:", error);
      }
    };

    fetchMostViewedAnnouncements();
  }, [location]);  // location, URL değiştikçe useEffect'i tetikler

  const handleClick = (id, viewers) => {
    let updatedViewers;
      // Eğer viewers değeri null veya undefined ise 1 olarak ayarla
      if (viewers === null || viewers === undefined) {
        updatedViewers = 1;
      } else {
        // Eğer viewers değeri varsa 1 arttır
        updatedViewers = parseInt(viewers, 10) + 1;
      }
    // API'ye güncellenmiş viewers bilgisini gönder ve response'u kontrol et
    try {
      axios.post('https://home-repair-api.onrender.com/api/duyuru/viewers', {
        id: id,
        viewers: updatedViewers,
      });
    } catch (err) {
      console.error("Error updating viewers:", err);
    }
  };

  // Başlıkları 50 karakterle sınırlandır ve üç nokta ekle
  const truncateTitle = (title) => {
    const maxLength = 50;
    return title.length > maxLength ? title.slice(0, maxLength) + "..." : title;
  };

  const handleSlug = (record) => {
    const slug = record
      ?.split('/')
      .filter(Boolean)
      .pop()
      .replace('?', '');
    return slug;
  };

  const cleanTitle = (title) => {
    return title?.replace(/^[^\w\sİıĞğÜüŞşÇçÖö'"]+/g, "").trim() || ""; // ' ve " karakterlerini koruyacak
  };
  const handleAdLinks = (e, index) => {
    e.preventDefault();
    window.open(adsimages[index]?.ads_website, "_blank");
  };

  return (
    <>
      <div className="col-lg-3 col-md-12 col-sm-12 col-xs-12">
        <div className="sidebar">
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center",
              width: 300,
              height: 200,
              mx: "auto",
              mt: 5,
              mb: 5,
              p: 3,
              bgcolor: "white",
              color: "black",
              borderRadius: 2,
              boxShadow: 3,
              textAlign: "center",
            }}
          >
            <img onClick={(e) => handleAdLinks(e, 1)} src={adsimages[1]?.ads_image_url} alt="biyomed" />
          </Box>

          <div className="widget">
            <Typography
              variant="h6"
              fontWeight="bold"
              gutterBottom
              marginBottom={3}
              sx={{ textAlign: "center" }} // Başlığı merkeze alalım
            >
              En Çok Okunan Duyurular
            </Typography>
            <div className="blog-list-widget">
              <div className="list-group">
                {latestAnnouncements?.map((announcement, index) => (
                  <Link
                    key={index}
                    to={announcement.duyuru_content !== "" ? `/duyuru/${handleSlug(announcement.duyuru_link)}-${announcement.id}` : announcement.duyuru_link}
                    state={{ id: announcement.id }}
                    className="list-group-item list-group-item-action flex-column align-items-start"
                    sx={{
                      display: "flex",
                      alignItems: "center",
                      padding: "10px 15px",
                      marginBottom: "10px",
                      backgroundColor: "#f9f9f9",
                      borderRadius: "8px",
                      boxShadow: "0 2px 4px rgba(0, 0, 0, 0.1)", // Hafif gölge efekti
                      cursor: "pointer",
                      transition: "transform 0.2s ease",
                      ":hover": {
                        transform: "translateX(10px)", // Hover sırasında yana kayma efekti
                      },
                    }}
                  >
                    <div className="w-100 justify-content-between">
                      <h5
                        onClick={() => handleClick(announcement.id, announcement.viewers)}
                        className="mb-1"
                      >
                        {truncateTitle(cleanTitle(announcement.duyuru_title))}
                      </h5>
                      <small>
                        <i className="fa fa-eye" /> {announcement.viewers || 0}
                      </small>
                      <small style={{ fontWeight: 'bold', color: 'black' }}>
                        - {announcement.name || "Yazar yok"}
                      </small>
                      <small style={{ fontWeight: 'bold', color: 'black' }}>
                        - {announcement.duyuru_date}
                      </small>
                    </div>
                  </Link>
                ))}
              </div>
            </div>
            <Box
              sx={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "center",
                width: 300,
                height: 200,
                mx: "auto",
                mt: 5,
                mb: 5,
                p: 3,
                bgcolor: "white",
                color: "black",
                borderRadius: 2,
                boxShadow: 3,
                textAlign: "center",
              }}
            >
              <img onClick={(e) => handleAdLinks(e, 2)} src={adsimages[2]?.ads_image_url} alt="otimed" />
            </Box>
          </div>
        </div>
      </div>
    </>
  );
}

export default Sidebar;
