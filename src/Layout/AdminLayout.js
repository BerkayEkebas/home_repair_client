import React from "react";
import { CssBaseline, Box, Drawer, List, ListItem, ListItemText, AppBar, Toolbar, Typography, IconButton, Button } from "@mui/material";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { Dashboard, Announcement, Settings, AccountCircle, Logout, Add } from "@mui/icons-material";
import AdsClickIcon from '@mui/icons-material/TrendingUp';
import OpenInBrowserIcon from '@mui/icons-material/OpenInBrowser';
import NotFoundPage from "../Pages/NotFoundPage";
import { useAuth } from "../Context/authContext";

const drawerWidth = 240;

const AdminLayout = ({ children }) => {
  const navigate = useNavigate();
  const location = useLocation();
  const isAdmin = localStorage.getItem("isAdmin");
  const username = localStorage.getItem("username") || "Kullanıcı";
  const { logout } = useAuth();

  const handleLogout = () => {
    logout();
    navigate("/"); // Redirect to homepage
  };

  const isActive = (path) => location.pathname === path;

  return isAdmin === "admin" ? (
    <Box sx={{ display: "flex" }}>
      <CssBaseline />
      <AppBar position="fixed" sx={{ zIndex: (theme) => theme.zIndex.drawer + 1 }}>
        <Toolbar>
          <Typography variant="h6" noWrap component="div" sx={{ flexGrow: 1 }}>
            Admin Panel
          </Typography>
          <IconButton color="inherit">
            <AccountCircle />
          </IconButton>
          <Typography variant="subtitle1" sx={{ marginRight: 2 }}>
            {username}
          </Typography>
          <Button color="inherit" onClick={handleLogout} startIcon={<Logout />}>
            Çıkış Yap
          </Button>
        </Toolbar>
      </AppBar>
      <Drawer
        variant="permanent"
        sx={{
          width: drawerWidth,
          flexShrink: 0,
          [`& .MuiDrawer-paper`]: {
            width: drawerWidth,
            boxSizing: "border-box",
            backgroundColor: "#333",
          },
        }}
      >
        <Toolbar />
        <Box sx={{ overflow: "auto" }}>
          <List>
            <Link to="admin/" style={{ textDecoration: 'none' }}>
              <ListItem button sx={{ backgroundColor: isActive("/admin/") ? "#555" : "inherit" }}>
                <Dashboard sx={{ color: 'gray' }} />
                <ListItemText primary="Dashboard" sx={{ marginLeft: 1, color: 'white' }} />
              </ListItem>
            </Link>
            <Link to="admin/duyuru" style={{ textDecoration: 'none' }}>
              <ListItem button sx={{ backgroundColor: isActive("/admin/duyuru") ? "#555" : "inherit" }}>
                <Announcement sx={{ color: 'gray' }} />
                <ListItemText primary="Duyurular" sx={{ marginLeft: 1, color: 'white' }} />
              </ListItem>
            </Link>
            <Link to="admin/duyuru/create" style={{ textDecoration: 'none' }}>
              <ListItem button sx={{ backgroundColor: isActive("/admin/duyuru/create") ? "#555" : "inherit" }}>
                <Add sx={{ color: 'gray' }} />
                <ListItemText primary="Duyuru Ekle" sx={{ marginLeft: 1, color: 'white' }} />
              </ListItem>
            </Link>
            <Link to="admin/websites" style={{ textDecoration: 'none' }}>
              <ListItem button sx={{ backgroundColor: isActive("/admin/websites") ? "#555" : "inherit" }}>
                <OpenInBrowserIcon sx={{ color: 'gray' }} />
                <ListItemText primary="Web Siteleri Düzenle" sx={{ marginLeft: 1, color: 'white' }} />
              </ListItem>
            </Link>
            <Link to="admin/manage/ads" style={{ textDecoration: 'none' }}>
              <ListItem button sx={{ backgroundColor: isActive("/admin/manage/ads") ? "#555" : "inherit" }}>
                <AdsClickIcon sx={{ color: 'gray' }} />
                <ListItemText primary="Reklamlari Düzenle" sx={{ marginLeft: 1, color: 'white' }} />
              </ListItem>
            </Link>
            <Link style={{ textDecoration: 'none' }}>
              <ListItem button sx={{ backgroundColor: isActive("/admin/settings") ? "#555" : "inherit" }}>
                <Settings sx={{ color: 'gray' }} />
                <ListItemText primary="Ayarlar" sx={{ marginLeft: 1, color: 'white' }} />
              </ListItem>
            </Link>
          </List>
        </Box>
      </Drawer>
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          bgcolor: "background.default",
          p: 3,
          marginLeft: `${drawerWidth / 3}px`,  // Buradaki değeri azaltarak sol alanda daha fazla boşluk bırakabilirsiniz
        }}
      >
        <Toolbar />
        {children}
      </Box>
    </Box>
  ) : (
    <NotFoundPage />
  );
};

export default AdminLayout;
