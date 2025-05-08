import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import axios from 'axios';
import { TextField, Button, Box } from '@mui/material';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';

function UpdateAnnouncements() {
  const location = useLocation();
  const { id } = location.state || {}; // ID alındı
  const [record, setRecord] = useState({
    duyuru_title: '',
    duyuru_content: '', // Duyuru içeriği buraya kaydedilecek
    duyuru_date: '',
    image: '', // Yeni resim alanı
    annimage: '', //  resim alanı
    tag: '', // Yeni tag alanı
    viewers: '', // Yeni viewers alanı
  });
  const [isActive, setIsActive] = useState(false); // Aktif/pasif durumu için state

  // React-Quill formats
  const modules = {
    toolbar: [
      [{ 'header': '1' }, { 'header': '2' }, { 'font': [] }],
      [{ size: [] }],
      ['bold', 'italic', 'underline', 'strike', 'blockquote'],
      [{ 'list': 'ordered' }, { 'list': 'bullet' }],
      ['link', 'image'],
      [{ 'color': [] }, { 'background': [] }], // Renk seçenekleri
      ['clean']
    ],
  };

  const formats = [
    'header', 'font', 'size',
    'bold', 'italic', 'underline', 'strike', 'blockquote',
    'list', 'bullet',
    'link', 'image',
    'color', 'background' // Renk seçenekleri
  ];

  useEffect(() => {
    const fetchRecord = async () => {
      try {
        const res = await axios.get(`https://home-repair-api.onrender.com/api/duyuru/detay/${id}`);
        setRecord(res.data);
        // Eğer active değeri yoksa true, varsa içerik kontrolü ile ayarla
        setIsActive(res.data.active === null || res.data.active === '' ? true : res.data.active.includes('pasif') ? false : true);
      } catch (error) {
        console.log(error);
      }
    };
    fetchRecord();
  }, [id]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setRecord((prevRecord) => ({
      ...prevRecord,
      [name]: value,
    }));
  };

  const handleContentChange = (value) => {
    setRecord((prevRecord) => ({
      ...prevRecord,
      duyuru_content: value, // HTML formatlı içeriği kaydet
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post(`https://home-repair-api.onrender.com/api/duyuru/update/${id}`, { ...record, active: isActive }, { withCredentials: true }); // Aktif durumu da gönder
      alert('Duyuru başarıyla güncellendi!');
    } catch (error) {
      console.log(error);
      alert('Güncelleme sırasında bir hata oluştu.');
    }
  };

  const handleToggleActive = () => {
    setIsActive(!isActive);
  };

  return (
    <Box sx={{ p: 3 }}>
      <form onSubmit={handleSubmit}>
        <TextField
          label="Duyuru Başlığı"
          variant="outlined"
          fullWidth
          name="duyuru_title"
          value={record.duyuru_title}
          onChange={handleChange}
          sx={{ mb: 2 }}
        />
        <ReactQuill
          value={record.duyuru_content}
          onChange={handleContentChange}
          style={{ height: '150px', marginBottom: '2rem' }} // Boyut ayarları
          modules={modules}
          formats={formats}
          placeholder="Duyuru içeriğini buraya yazın..."
        />
        <TextField
          label="Duyuru Tarihi"
          variant="outlined"
          fullWidth
          name="duyuru_date"
          value={record.duyuru_date}
          onChange={handleChange}
          sx={{ mb: 2, mt: 4 }}
          InputLabelProps={{
            shrink: true,
          }}
        />
        <TextField
          label="Resim Linki"
          variant="outlined"
          fullWidth
          name="image"
          value={record.image}
          onChange={handleChange}
          sx={{ mb: 2, mt: 2 }}
          InputLabelProps={{
            shrink: true,
          }}
        />        
        <TextField
          label="Resim Linki"
          variant="outlined"
          fullWidth
          name="annimage"
          value={record.annimage}
          onChange={handleChange}
          sx={{ mb: 2, mt: 2 }}
          InputLabelProps={{
            shrink: true,
          }}
        />
        <TextField
          label="Tag"
          variant="outlined"
          fullWidth
          name="tag"
          value={record.tag}
          onChange={handleChange}
          sx={{ mb: 2, mt: 2 }}
          placeholder="Tag'leri buraya yazın, virgülle ayırın"
        />
        <TextField
          label="İzlenme Sayısı (Viewers)"
          variant="outlined"
          fullWidth
          name="viewers"
          value={record.viewers}
          onChange={handleChange}
          sx={{ mb: 2, mt: 2 }}
        />

        {/* Toggle Butonu */}
        <Box sx={{ display: 'flex', alignItems: 'center', mb: 2, ml: 'auto' }}>
          <Button
            variant="contained"
            color={isActive ? 'success' : 'grey'}
            onClick={handleToggleActive}
            sx={{ marginRight: 2, transition: 'all 0.3s', transform: isActive ? 'translateX(50px)' : 'translateX(0)' }}
          >
            {isActive ? 'Aktif' : 'Pasif'}
          </Button>
          <span style={{ marginLeft: '50px' }}>{isActive ? 'Duyuru aktif' : 'Duyuru pasif'}</span>
        </Box>
        <Button variant="contained" color="primary" type="submit">
          Güncelle
        </Button>
      </form>
    </Box>
  );
}

export default UpdateAnnouncements;
