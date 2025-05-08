import React, { useState, useEffect } from "react";
import axios from "axios";
import { TextField, Button, Grid, Typography, Select, MenuItem, Checkbox, ListItemText, InputLabel, FormControl } from "@mui/material";

const servicesList = [
  { id: 1, name: '일반 수리' },
  { id: 2, name: '창문/도어' },
  { id: 3, name: '화장실' },
  { id: 4, name: '부엌' },
  { id: 5, name: '조명/전기' },
  { id: 6, name: '목공' },
  { id: 7, name: '바닥 설치/수리' },
  { id: 8, name: '기타 수리' }
];

const ExpertDetails = () => {
  const [user_id, setUserId] = useState("");
  const [services_id, setServicesId] = useState([]);
  const [experience_years, setExperienceYears] = useState("");
  const [phone, setPhone] = useState("");

  // user_id'yi localStorage'den alıyoruz
  useEffect(() => {
    const storedUserId = localStorage.getItem("user_id");
    if (storedUserId) {
      setUserId(storedUserId);
    }
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const expertData = {
      user_id,
      services_id: services_id.join(", "), // services_id dizisini string'e çeviriyoruz
      experience_years,
      phone,
    };

    try {
      await axios.get("https://home-repair-api.onrender.com/api/expert/create-details", expertData);
      alert("Expert added successfully!");
    } catch (error) {
      alert("Error adding expert.");
      console.error(error);
    }
  };

  const handleServiceChange = (event) => {
    const {
      target: { value },
    } = event;
    setServicesId(typeof value === "string" ? value.split(",") : value);
  };

  return (
    <div style={{ padding: "20px" }}>
      <Typography variant="h5" gutterBottom>Add Expert</Typography>
      <form onSubmit={handleSubmit}>
        <Grid container spacing={2}>
          <Grid item xs={12} sm={6}>
            <TextField
              label="User ID"
              type="text"
              value={user_id}
              fullWidth
              disabled
              required
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <FormControl fullWidth required>
              <InputLabel>Services</InputLabel>
              <Select
                multiple
                value={services_id}
                onChange={handleServiceChange}
                renderValue={(selected) => selected.map((id) => servicesList.find(service => service.id === parseInt(id))?.name).join(", ")}
              >
                {servicesList.map((service) => (
                  <MenuItem key={service.id} value={service.id}>
                    <Checkbox checked={services_id.indexOf(service.id.toString()) > -1} />
                    <ListItemText primary={service.name} />
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              label="Experience Years"
              type="number"
              value={experience_years}
              onChange={(e) => setExperienceYears(e.target.value)}
              fullWidth
              required
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              label="Phone"
              type="text"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              fullWidth
              required
            />
          </Grid>
          <Grid item xs={12}>
            <Button type="submit" variant="contained" color="primary" fullWidth>
              Submit
            </Button>
          </Grid>
        </Grid>
      </form>
    </div>
  );
};

export default ExpertDetails;
