import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { TextField, Button, Box, MenuItem, Select, InputLabel, FormControl } from '@mui/material';
import ReactQuill from 'react-quill'; 
import 'react-quill/dist/quill.snow.css'; 

function CreateNewAnnouncement() {
  const [record, setRecord] = useState({
    duyuru_title: '',
    duyuru_content: '',
    duyuru_date: '',
    duyuru_unit: '',
    duyuru_link: '',
    page_number: 1,
    name: '',
    image: '',
    website_id: '', // Varsayılan değer boş
    tag: '',
    annimage: '',
  });

  const [websites, setWebsites] = useState([]); // Web sitelerini tutacak state

  //react-quill
  const modules = {
    toolbar: [
      [{ 'header': '1' }, { 'header': '2' }, { 'font': [] }],
      [{ size: [] }],
      ['bold', 'italic', 'underline', 'strike', 'blockquote'],
      [{ 'list': 'ordered'}, { 'list': 'bullet' }],
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
  
  const handleContentChange = (value) => {
    setRecord((prevRecord) => ({
      ...prevRecord,
      duyuru_content: value, // HTML formatlı içeriği kaydet
    }));
  };

  useEffect(() => {
    const fetchWebsites = async () => {
      try {
        const res = await axios.get('https://home-repair-api.onrender.com/api/websites/detay'); // API'den web sitelerini çekme
        setWebsites(res.data);
      } catch (error) {
        console.log('Web siteleri alınırken bir hata oluştu:', error);
      }
    };
    fetchWebsites();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setRecord((prevRecord) => ({
      ...prevRecord,
      [name]: value,
    }));
  };

  const handleWebsiteChange = (e) => {
    setRecord((prevRecord) => ({
      ...prevRecord,
      website_id: e.target.value, // Seçilen website_id'yi kaydetme
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post(`https://home-repair-api.onrender.com/api/duyuru/create`, record, { withCredentials: true }); // Yeni duyuru eklemek için POST isteği with cookie icin 
      alert('Duyuru başarıyla eklendi!');
      setRecord({
        duyuru_title: '',
        duyuru_content: '',
        duyuru_date: '',
        duyuru_unit: '',
        duyuru_link: '',
        page_number: 1,
        name: '',
        image: '',
        website_id: '', // Seçim sıfırlanıyor
        tag: '',
        annimage: '',
      });
    } catch (error) {
      console.log(error);
      alert('Duyuru ekleme sırasında bir hata oluştu.');
    }
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
          placeholder="GG.AA.YYYY seklinde noktalar ile beraber yaziniz" 
          name="duyuru_date"
          value={record.duyuru_date}
          onChange={handleChange}
          sx={{ mb: 2 , mt:4}}
          InputLabelProps={{
            shrink: true,
          }}
        />
        <TextField
          label="Duyuru Birimi"
          variant="outlined"
          fullWidth
          name="duyuru_unit"
          value={record.duyuru_unit}
          onChange={handleChange}
          sx={{ mb: 2 }}
        />
        <TextField
          label="Duyuru Linki"
          variant="outlined"
          fullWidth
          name="duyuru_link"
          value={record.duyuru_link}
          onChange={handleChange}
          sx={{ mb: 2 }}
        />
        <TextField
          label="Duyuru Etiketi"
          variant="outlined"
          fullWidth
          name="tag"
          value={record.tag}
          onChange={handleChange}
          sx={{ mb: 2 }}
        />
        <TextField
          label="İsim"
          variant="outlined"
          fullWidth
          name="name"
          value={record.name}
          onChange={handleChange}
          sx={{ mb: 2 }}
        />
        <TextField
          label="Logo Linki"
          variant="outlined"
          fullWidth
          name="image"
          value={record.image}
          onChange={handleChange}
          sx={{ mb: 2 }}
        />
         <TextField
          label="Görsel Linki"
          variant="outlined"
          fullWidth
          name="annimage"
          value={record.annimage}
          onChange={handleChange}
          sx={{ mb: 2 }}
        />

        {/* Web Site Seçimi */}
        <FormControl fullWidth sx={{ mb: 2 }}>
          <InputLabel id="website-select-label">Web Sitesi Seçin</InputLabel>
          <Select
            labelId="website-select-label"
            id="website-select"
            value={record.website_id}
            label="Web Sitesi Seçin"
            onChange={handleWebsiteChange}
          >
            {websites.map((website) => (
              <MenuItem key={website.website_id} value={website.website_id}>
                {website.website_name}
              </MenuItem>
            ))}
          </Select>
        </FormControl>

        <Button variant="contained" color="primary" type="submit">
          Duyuru Ekle
        </Button>
      </form>
    </Box>
  );
}

export default CreateNewAnnouncement;
