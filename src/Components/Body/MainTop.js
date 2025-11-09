import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  Box,
  Card,
  CardContent,
  Typography,
  Button,
  Grid,
  Container,
  Divider,
  Chip,
  CircularProgress,
  Alert,
  Stack,
  Paper,
  Tab,
  Tabs,
  IconButton,
  Menu,
  MenuItem,
  AppBar,
  Toolbar
} from "@mui/material";
import { styled } from "@mui/material/styles";
import {
  Logout,
  Refresh,
  Power,
  AcUnit,
  Window,
  Schedule,
  LocationOn,
  People,
  Home,
  Numbers,
  WarningAmber,
  Language
} from "@mui/icons-material";
import AiDangerStatus from "../AiDangerStatus";

const StyledCard = styled(Card)(({ theme }) => ({
  background: "rgba(255, 255, 255, 0.1)",
  backdropFilter: "blur(10px)",
  border: "1px solid rgba(255, 255, 255, 0.2)",
  borderRadius: 16,
  color: "white",
  marginBottom: theme.spacing(3),
  "&:hover": {
    background: "rgba(255, 255, 255, 0.15)",
    transition: "all 0.3s ease",
  },
}));

const StatusItem = styled(Box)(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  justifyContent: "space-between",
  padding: theme.spacing(1.5),
  backgroundColor: "rgba(255, 255, 255, 0.05)",
  borderRadius: 8,
  border: "1px solid rgba(255, 255, 255, 0.1)",
  marginBottom: theme.spacing(1),
}));

const PowerUsageBox = styled(Box)(({ theme }) => ({
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
  padding: theme.spacing(2),
  backgroundColor: "rgba(255, 255, 255, 0.05)",
  borderRadius: 8,
  border: "1px solid rgba(255, 255, 255, 0.1)",
  marginBottom: theme.spacing(2),
}));

const VacancyTable = styled(Paper)(({ theme }) => ({
  backgroundColor: "rgba(255, 255, 255, 0.05)",
  borderRadius: 8,
  overflow: "hidden",
  border: "1px solid rgba(255, 255, 255, 0.1)",
}));

const TableRow = styled(Box)(({ theme }) => ({
  display: "flex",
  padding: theme.spacing(1.5),
  "&:nth-of-type(odd)": {
    backgroundColor: "rgba(255, 255, 255, 0.02)",
  },
}));

const TableCell = styled(Box)(({ theme }) => ({
  flex: 1,
  textAlign: "center",
  fontWeight: "bold",
  color: "white",
}));

const TableHeader = styled(TableRow)(({ theme }) => ({
  backgroundColor: "rgba(255, 255, 255, 0.1) !important",
  "& > div": {
    color: "#9ca3af",
    fontWeight: "bold",
  },
}));

const InfoItem = styled(Box)(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  padding: theme.spacing(1.5),
  backgroundColor: "rgba(255, 255, 255, 0.05)",
  borderRadius: 8,
  border: "1px solid rgba(255, 255, 255, 0.1)",
  marginBottom: theme.spacing(1),
}));

const StyledTabs = styled(Tabs)(({ theme }) => ({
  '& .MuiTabs-indicator': {
    backgroundColor: '#00BFFF',
  },
  '& .MuiTab-root': {
    color: '#9ca3af',
    fontWeight: 'bold',
    '&.Mui-selected': {
      color: '#00BFFF',
    },
  },
  marginBottom: theme.spacing(3),
}));

const MainTop = () => {
  const navigate = useNavigate();
  const [roomData, setRoomData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [tabValue, setTabValue] = useState(0);
  const [language, setLanguage] = useState('korean'); // 'korean', 'english'
  const [anchorEl, setAnchorEl] = useState(null);

  // Dil çevirileri
  const translations = {
    korean: {
      title: '기숙사 환경 상태',
      environmentStatus: '환경 상태',
      roomInfo: '방 정보',
      occupantInfo: '거주자 정보',
      loading: '데이터 로딩 중...',
      error: '데이터를 가져올 수 없습니다',
      retry: '다시 시도',
      logout: '로그아웃',
      smartOutlet: '스마트 콘센트',
      powerUsage: '전력 사용량:',
      windowAc: '창문 열림 / 에어컨 켜짐',
      temperature: '온도:',
      ac: '에어컨:',
      humidity: '습도:',
      window: '창문:',
      roomVacancy: '빈 방 (30분 제한)',
      detect: '감지',
      timeLeft: '남은 시간',
      power: '전력',
      buildingName: '건물 이름',
      location: '위치 정보',
      roomInfoDetail: '방 정보',
      roomNumber: '방 번호',
      capacity: '정원',
      currentOccupants: '현재 거주 인원',
      lastUpdate: '마지막 업데이트',
      totalOccupants: '총 거주자 수',
      currentStudents: '현재 거주 중인 학생들:',
      noStudents: '현재 이 방에 거주 중인 학생이 없습니다.',
      noData: '표시할 방 데이터가 없습니다.',
      floor: '층',
      people: '명',
      on: 'ON',
      off: 'OFF',
      open: 'OPEN',
      closed: 'CLOSED',
      korean: '한국어',
      english: 'English'
    },
    english: {
      title: 'Dorm Environment Status',
      environmentStatus: 'Environment Status',
      roomInfo: 'Room Information',
      occupantInfo: 'Occupant Information',
      loading: 'Loading data...',
      error: 'Failed to fetch data',
      retry: 'Try Again',
      logout: 'Logout',
      smartOutlet: 'Smart Outlet',
      powerUsage: 'Power Usage:',
      windowAc: 'Windows Open / AC On',
      temperature: 'Temperature:',
      ac: 'AC:',
      humidity: 'Humidity:',
      window: 'Window:',
      roomVacancy: 'Room Vacant (30Min limit)',
      detect: 'Detect',
      timeLeft: 'Time Left',
      power: 'Power',
      buildingName: 'Building Name',
      location: 'Location',
      roomInfoDetail: 'Room Information',
      roomNumber: 'Room Number',
      capacity: 'Capacity',
      currentOccupants: 'Current Occupants',
      lastUpdate: 'Last Updated',
      totalOccupants: 'Total Occupants',
      currentStudents: 'Currently residing students:',
      noStudents: 'No students currently residing in this room.',
      noData: 'No room data to display.',
      floor: 'Floor',
      people: 'people',
      on: 'ON',
      off: 'OFF',
      open: 'OPEN',
      closed: 'CLOSED',
      korean: 'Korean',
      english: 'English'
    }
  };

  const t = translations[language];

  useEffect(() => {
    const user = localStorage.getItem("user_id");
    if (!user) {
      navigate("/login", { replace: true });
      return;
    }
    fetchRoomStatus();
  }, [navigate]);

  const fetchRoomStatus = async () => {
    try {
      setLoading(true);
      setError(null);
      const userId = localStorage.getItem("user_id");

      if (!userId) {
        setError(language === 'korean' 
          ? "사용자 ID를 찾을 수 없습니다 (localStorage 비어있음)"
          : "User ID not found (localStorage empty)"
        );
        setLoading(false);
        return;
      }

      const response = await fetch(
        "https://home-repair-api.onrender.com/api/room/getRoomStatus/",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ user_id: userId }),
        }
      );

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      setRoomData(Array.isArray(data) ? data : [data]);
    } catch (err) {
      console.error("Fetch error:", err);
      setError(err.message || t.error);
    } finally {
      setLoading(false);
    }
  };

  const handleTabChange = (event, newValue) => {
    setTabValue(newValue);
  };

  const handleLogout = () => {
    localStorage.removeItem("user");
    localStorage.removeItem("user_id");
    navigate("/login");
  };

  const handleLanguageClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleLanguageClose = () => {
    setAnchorEl(null);
  };

  const handleLanguageChange = (lang) => {
    setLanguage(lang);
    handleLanguageClose();
  };

  if (loading) {
    return (
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          minHeight: "100vh",
          flexDirection: "column",
          backgroundColor: "#0B1120",
          color: "white",
        }}
      >
        <CircularProgress sx={{ color: "#00BFFF", mb: 2 }} />
        <Typography variant="h6">{t.loading}</Typography>
      </Box>
    );
  }

  if (error) {
    return (
      <Container
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          minHeight: "100vh",
          flexDirection: "column",
          backgroundColor: "#0B1120",
        }}
      >
        <Alert severity="error" sx={{ mb: 3, width: "100%", maxWidth: 400 }}>
          {error}
        </Alert>
        <Button
          variant="contained"
          startIcon={<Refresh />}
          onClick={fetchRoomStatus}
          sx={{
            backgroundColor: "#2563eb",
            "&:hover": { backgroundColor: "#1d4ed8" },
            mb: 2,
          }}
        >
          {t.retry}
        </Button>
        <Button
          variant="contained"
          startIcon={<Logout />}
          onClick={handleLogout}
          sx={{
            backgroundColor: "#ef4444",
            "&:hover": { backgroundColor: "#dc2626" },
          }}
        >
          {t.logout}
        </Button>
      </Container>
    );
  }

  return (
    <Box sx={{ backgroundColor: "#0B1120", minHeight: "100vh", py: 4 }}>
      {/* Language Selector App Bar */}
      <AppBar 
        position="absolute" 
        sx={{ 
          backgroundColor: 'transparent', 
          boxShadow: 'none',
          top: 200,
          right: 16
        }}
      >
        <Toolbar sx={{ justifyContent: 'flex-end', minHeight: 'auto!important' }}>
          <IconButton
            onClick={handleLanguageClick}
            sx={{
              color: 'white',
              backgroundColor: 'rgba(255, 255, 255, 0.2)',
              backdropFilter: 'blur(10px)',
              '&:hover': {
                backgroundColor: 'rgba(255, 255, 255, 0.3)',
              }
            }}
          >
            <Language />
          </IconButton>
          <Menu
            anchorEl={anchorEl}
            open={Boolean(anchorEl)}
            onClose={handleLanguageClose}
            sx={{
              '& .MuiPaper-root': {
                borderRadius: 2,
                marginTop: 1,
                minWidth: 120,
              }
            }}
          >
            <MenuItem 
              onClick={() => handleLanguageChange('korean')}
              selected={language === 'korean'}
            >
              {t.korean}
            </MenuItem>
            <MenuItem 
              onClick={() => handleLanguageChange('english')}
              selected={language === 'english'}
            >
              {t.english}
            </MenuItem>
          </Menu>
        </Toolbar>
      </AppBar>

      <Container maxWidth="lg">
        {/* Header */}
        <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", mb: 4 }}>
          <Typography
            variant="h4"
            component="h1"
            sx={{
              color: "white",
              fontWeight: "bold",
              textAlign: "center",
              flex: 1
            }}
          >
            {t.title}
          </Typography>
        </Box>

        {/* Room Cards */}
        <Grid container spacing={3}>
          {roomData.map((room, index) => (
            <Grid item xs={12} key={index}>
              <StyledCard>
                <CardContent>
                  {/* Tab Navigation */}
                  <StyledTabs value={tabValue} onChange={handleTabChange} centered>
                    <Tab label={t.environmentStatus} />
                    <Tab label={t.roomInfo} />
                    <Tab label={t.occupantInfo} />
                  </StyledTabs>

                  {/* Tab 1: Environment Status */}
                  {tabValue === 0 && (
                    <Box>
                      <Box sx={{ display: "flex", alignItems: "center", mb: 2 }}>
                        <Typography sx={{ mr: 1 }}>AI 🤖</Typography>
                        <AiDangerStatus danger_status_ai={room.danger_status_ai} />
                      </Box>
                      {/* Smart Outlet Section */}
                      <Box sx={{ mb: 3 }}>
                        <Box sx={{ display: "flex", alignItems: "center", mb: 1 }}>
                          <Power sx={{ mr: 1, color: "#fff" }} />
                          <Typography variant="h6" component="h2" sx={{ color: "white", fontWeight: "bold" }}>
                            {t.smartOutlet}
                          </Typography>
                        </Box>
                        <Chip
                          label="(MAX 3KW)"
                          size="small"
                          sx={{
                            backgroundColor: "rgba(255,255,255,0.1)",
                            color: "#9ca3af",
                            mb: 2
                          }}
                        />
                        <PowerUsageBox sx={room.danger_status_ai === 1 ? {backgroundColor:"red"} : "" }>
                          
                          <Typography variant="body1" sx={{ color: "#9ca3af" }}>
                            {room.danger_status_ai === 1 && 
                          <WarningAmber/>}
                            {t.powerUsage}
                          </Typography>
                          <Typography variant="h6" sx={{ color: "white", fontWeight: "bold" }}>
                            {room.power_consumption || 0}W
                          </Typography>
                        </PowerUsageBox>
                      </Box>

                      <Divider sx={{ backgroundColor: "rgba(255,255,255,0.2)", my: 2 }} />

                      {/* Environment Status Section */}
                      <Box sx={{ mb: 3 }}>
                        <Box sx={{ display: "flex", alignItems: "center", mb: 2 }}>
                          <AcUnit sx={{ mr: 1, color: "#fff" }} />
                          <Typography variant="h6" component="h2" sx={{ color: "white", fontWeight: "bold" }}>
                            {t.windowAc}
                          </Typography>
                        </Box>

                        <Grid container spacing={1}>
                          <Grid item xs={6}>
                            <StatusItem sx={room.danger_status_ai === 3 ? {backgroundColor:"red"} : "" }>
                              <Typography variant="body2" sx={{ color: "#9ca3af", fontWeight: "bold" }}>
                                {t.temperature}
                              </Typography>
                              <Typography variant="body2" sx={{ color: "white", fontWeight: "bold" }}>
                                {room.temperature || "N/A"}°C
                              </Typography>
                            </StatusItem>
                          </Grid>
                          <Grid item xs={6}>
                            <StatusItem sx={room.danger_status_ai === 2 ? {backgroundColor:"red"} : "" }>
                              <Typography variant="body2" sx={{ color: "#9ca3af", fontWeight: "bold" }}>
                                {t.ac}
                              </Typography>
                              <Chip
                                label={room.ac_status === "ON" ? t.on : t.off}
                                size="small"
                                sx={{
                                  backgroundColor: room.ac_status === "ON" ? "#22c55e" : "#ef4444",
                                  color: "white",
                                  fontWeight: "bold",
                                }}
                              />
                            </StatusItem>
                          </Grid>
                          <Grid item xs={6}>
                            <StatusItem sx={room.danger_status_ai === 3 ? {backgroundColor:"red"} : "" }>
                              <Typography variant="body2" sx={{ color: "#9ca3af", fontWeight: "bold" }}>
                                {t.humidity}
                              </Typography>
                              <Typography variant="body2" sx={{ color: "white", fontWeight: "bold" }}>
                                {room.humidity || "N/A"}%
                              </Typography>
                            </StatusItem>
                          </Grid>
                          <Grid item xs={6}>
                            <StatusItem sx={room.danger_status_ai === 2 ? {backgroundColor:"red"} : "" }>
                              <Typography variant="body2" sx={{ color: "#9ca3af", fontWeight: "bold" }}>
                                {t.window}
                              </Typography>
                              <Box sx={{ display: "flex", alignItems: "center" }}>
                                <Window sx={{ fontSize: 16, mr: 0.5, color: "#fff" }} />
                                <Typography variant="body2" sx={{ color: "white", fontWeight: "bold" }}>
                                  {room.window_status === "OPEN" ? t.open : t.closed}
                                </Typography>
                              </Box>
                            </StatusItem>
                          </Grid>
                        </Grid>
                      </Box>

                      <Divider sx={{ backgroundColor: "rgba(255,255,255,0.2)", my: 2 }} />

                      {/* Room Vacancy Section */}
                      <Box sx={{ mb: 2 }}>
                        <Box sx={{ display: "flex", alignItems: "center", mb: 2 }}>
                          <Schedule sx={{ mr: 1, color: "#fff" }} />
                          <Typography variant="h6" component="h2" sx={{ color: "white", fontWeight: "bold" }}>
                            {t.roomVacancy}
                          </Typography>
                        </Box>

                        <VacancyTable sx={room.danger_status_ai === 4 ? {backgroundColor:"red"} : "" }>
                          <TableHeader>
                            <TableCell>{t.detect}</TableCell>
                            <TableCell>{t.timeLeft}</TableCell>
                            <TableCell>{t.power}</TableCell>
                          </TableHeader>
                          <TableRow>
                            <TableCell>12:10</TableCell>
                            <TableCell>20</TableCell>
                            <TableCell sx={{ color: "#22c55e" }}>{t.on}</TableCell>
                          </TableRow>
                        </VacancyTable>
                      </Box>
                    </Box>
                  )}

                  {/* Tab 2: Room Information */}
                  {tabValue === 1 && (
                    <Box>
                      <Typography variant="h6" sx={{ color: "white", fontWeight: "bold", mb: 3, textAlign: "center" }}>
                        {t.roomInfoDetail}
                      </Typography>

                      <Stack spacing={2}>
                        <InfoItem>
                          <Box sx={{ display: "flex", alignItems: "center", flex: 1 }}>
                            <Home sx={{ mr: 2, color: "#00BFFF" }} />
                            <Box>
                              <Typography variant="body2" sx={{ color: "#9ca3af" }}>
                                {t.buildingName}
                              </Typography>
                              <Typography variant="body1" sx={{ color: "white", fontWeight: "bold" }}>
                                {room.building_name || "N/A"}
                              </Typography>
                            </Box>
                          </Box>
                        </InfoItem>

                        <InfoItem>
                          <Box sx={{ display: "flex", alignItems: "center", flex: 1 }}>
                            <LocationOn sx={{ mr: 2, color: "#22c55e" }} />
                            <Box>
                              <Typography variant="body2" sx={{ color: "#9ca3af" }}>
                                {t.location}
                              </Typography>
                              <Typography variant="body1" sx={{ color: "white", fontWeight: "bold" }}>
                                {room.floor_number ? `${room.floor_number}${language === 'korean' ? '층' : ` ${t.floor}`}` : "N/A"} • {room.room_number || "N/A"}{language === 'korean' ? '호' : ''}
                              </Typography>
                            </Box>
                          </Box>
                        </InfoItem>

                        <InfoItem>
                          <Box sx={{ display: "flex", alignItems: "center", flex: 1 }}>
                            <Numbers sx={{ mr: 2, color: "#eab308" }} />
                            <Box>
                              <Typography variant="body2" sx={{ color: "#9ca3af" }}>
                                {t.roomInfoDetail}
                              </Typography>
                              <Typography variant="body1" sx={{ color: "white", fontWeight: "bold" }}>
                                {t.roomNumber}: {room.room_number || "N/A"} • {t.capacity}: {room.room_capacity || "N/A"}{language === 'korean' ? '명' : ` ${t.people}`}
                              </Typography>
                            </Box>
                          </Box>
                        </InfoItem>

                        <InfoItem>
                          <Box sx={{ display: "flex", alignItems: "center", flex: 1 }}>
                            <People sx={{ mr: 2, color: "#8b5cf6" }} />
                            <Box>
                              <Typography variant="body2" sx={{ color: "#9ca3af" }}>
                                {t.currentOccupants}
                              </Typography>
                              <Typography variant="body1" sx={{ color: "white", fontWeight: "bold" }}>
                                {room.occupant_count || 0} / {room.room_capacity || "N/A"} {language === 'korean' ? '명' : t.people}
                              </Typography>
                            </Box>
                          </Box>
                        </InfoItem>

                        <InfoItem>
                          <Box sx={{ display: "flex", alignItems: "center", flex: 1 }}>
                            <Schedule sx={{ mr: 2, color: "#f97316" }} />
                            <Box>
                              <Typography variant="body2" sx={{ color: "#9ca3af" }}>
                                {t.lastUpdate}
                              </Typography>
                              <Typography variant="body1" sx={{ color: "white", fontWeight: "bold" }}>
                                {room.last_updated ? new Date(room.last_updated).toLocaleString(language === 'korean' ? 'ko-KR' : 'en-US') : "Unknown"}
                              </Typography>
                            </Box>
                          </Box>
                        </InfoItem>
                      </Stack>
                    </Box>
                  )}

                  {/* Tab 3: Occupants Information */}
                  {tabValue === 2 && (
                    <Box>
                      <Typography variant="h6" sx={{ color: "white", fontWeight: "bold", mb: 3, textAlign: "center" }}>
                        {t.occupantInfo}
                      </Typography>

                      {room.occupants ? (
                        <Box>
                          <InfoItem sx={{ mb: 2 }}>
                            <Box sx={{ display: "flex", alignItems: "center", flex: 1 }}>
                              <People sx={{ mr: 2, color: "#8b5cf6" }} />
                              <Box>
                                <Typography variant="body2" sx={{ color: "#9ca3af" }}>
                                  {t.totalOccupants}
                                </Typography>
                                <Typography variant="body1" sx={{ color: "white", fontWeight: "bold" }}>
                                  {room.occupant_count || 0}{language === 'korean' ? '명' : ` ${t.people}`}
                                </Typography>
                              </Box>
                            </Box>
                          </InfoItem>

                          <Typography variant="body1" sx={{ color: "#9ca3af", mb: 2, textAlign: "center" }}>
                            {t.currentStudents}
                          </Typography>

                          <Box sx={{ backgroundColor: "rgba(255, 255, 255, 0.05)", borderRadius: 2, p: 2 }}>
                            {room.occupants.split(',').map((occupant, idx) => (
                              <Chip
                                key={idx}
                                label={occupant.trim()}
                                sx={{
                                  backgroundColor: "rgba(255, 255, 255, 0.1)",
                                  color: "white",
                                  m: 0.5,
                                  fontWeight: "bold"
                                }}
                              />
                            ))}
                          </Box>
                        </Box>
                      ) : (
                        <Box sx={{ textAlign: "center", py: 4 }}>
                          <People sx={{ fontSize: 48, color: "#6b7280", mb: 2 }} />
                          <Typography variant="body1" sx={{ color: "#9ca3af" }}>
                            {t.noStudents}
                          </Typography>
                        </Box>
                      )}
                    </Box>
                  )}

                  {/* Last Updated - All Tabs */}
                  <Typography
                    variant="caption"
                    sx={{
                      color: "#9ca3af",
                      textAlign: "center",
                      display: "block",
                      mt: 3,
                      fontStyle: "italic"
                    }}
                  >
                    {t.lastUpdate}: {room.last_updated ? new Date(room.last_updated).toLocaleString(language === 'korean' ? 'ko-KR' : 'en-US') : "Unknown"}
                  </Typography>
                </CardContent>
              </StyledCard>
            </Grid>
          ))}
        </Grid>

        {roomData.length === 0 && (
          <Box sx={{ textAlign: "center", mt: 4 }}>
            <Typography variant="h6" sx={{ color: "#9ca3af" }}>
              {t.noData}
            </Typography>
          </Box>
        )}
      </Container>
    </Box>
  );
};

export default MainTop;