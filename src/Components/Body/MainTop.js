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
  Tabs
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
  Numbers
} from "@mui/icons-material";

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
        setError("사용자 ID를 찾을 수 없습니다 (localStorage 비어있음)");
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
        throw new Error(`HTTP 오류! 상태: ${response.status}`);
      }

      const data = await response.json();
      setRoomData(Array.isArray(data) ? data : [data]);
    } catch (err) {
      console.error("Fetch 오류:", err);
      setError(err.message || "데이터를 가져올 수 없습니다");
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
        <Typography variant="h6">데이터 로딩 중...</Typography>
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
          다시 시도
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
          로그아웃
        </Button>
      </Container>
    );
  }

  return (
    <Box sx={{ backgroundColor: "#0B1120", minHeight: "100vh", py: 4 }}>
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
            기숙사 환경 상태
          </Typography>
          <Button
            variant="contained"
            startIcon={<Logout />}
            onClick={handleLogout}
            sx={{
              backgroundColor: "#ef4444",
              "&:hover": { backgroundColor: "#dc2626" },
              borderRadius: 20,
              px: 3,
            }}
          >
            로그아웃
          </Button>
        </Box>

        {/* Room Cards */}
        <Grid container spacing={3}>
          {roomData.map((room, index) => (
            <Grid item xs={12} key={index}>
              <StyledCard>
                <CardContent>
                  {/* Tab Navigation */}
                  <StyledTabs value={tabValue} onChange={handleTabChange} centered>
                    <Tab label="환경 상태" />
                    <Tab label="방 정보" />
                    <Tab label="거주자 정보" />
                  </StyledTabs>

                  {/* Tab 1: Environment Status */}
                  {tabValue === 0 && (
                    <Box>
                      {/* Smart Outlet Section */}
                      <Box sx={{ mb: 3 }}>
                        <Box sx={{ display: "flex", alignItems: "center", mb: 1 }}>
                          <Power sx={{ mr: 1, color: "#fff" }} />
                          <Typography variant="h6" component="h2" sx={{ color: "white", fontWeight: "bold" }}>
                            Smart outlet
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
                        <PowerUsageBox>
                          <Typography variant="body1" sx={{ color: "#9ca3af" }}>
                            Power Usage:
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
                            Windows open AC On
                          </Typography>
                        </Box>
                        
                        <Grid container spacing={1}>
                          <Grid item xs={6}>
                            <StatusItem>
                              <Typography variant="body2" sx={{ color: "#9ca3af", fontWeight: "bold" }}>
                                온도:
                              </Typography>
                              <Typography variant="body2" sx={{ color: "white", fontWeight: "bold" }}>
                                {room.temperature || "N/A"}°C
                              </Typography>
                            </StatusItem>
                          </Grid>
                          <Grid item xs={6}>
                            <StatusItem>
                              <Typography variant="body2" sx={{ color: "#9ca3af", fontWeight: "bold" }}>
                                AC:
                              </Typography>
                              <Chip
                                label={room.ac_status || "OFF"}
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
                            <StatusItem>
                              <Typography variant="body2" sx={{ color: "#9ca3af", fontWeight: "bold" }}>
                                습도:
                              </Typography>
                              <Typography variant="body2" sx={{ color: "white", fontWeight: "bold" }}>
                                {room.humidity || "N/A"}%
                              </Typography>
                            </StatusItem>
                          </Grid>
                          <Grid item xs={6}>
                            <StatusItem>
                              <Typography variant="body2" sx={{ color: "#9ca3af", fontWeight: "bold" }}>
                                WD:
                              </Typography>
                              <Box sx={{ display: "flex", alignItems: "center" }}>
                                <Window sx={{ fontSize: 16, mr: 0.5, color: "#fff" }} />
                                <Typography variant="body2" sx={{ color: "white", fontWeight: "bold" }}>
                                  {room.window_status || "CLOSED"}
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
                            Room Vacant (30Min limit)
                          </Typography>
                        </Box>
                        
                        <VacancyTable>
                          <TableHeader>
                            <TableCell>Detect</TableCell>
                            <TableCell>left</TableCell>
                            <TableCell>Power</TableCell>
                          </TableHeader>
                          <TableRow>
                            <TableCell>12:10</TableCell>
                            <TableCell>20</TableCell>
                            <TableCell sx={{ color: "#22c55e" }}>ON</TableCell>
                          </TableRow>
                        </VacancyTable>
                      </Box>
                    </Box>
                  )}

                  {/* Tab 2: Room Information */}
                  {tabValue === 1 && (
                    <Box>
                      <Typography variant="h6" sx={{ color: "white", fontWeight: "bold", mb: 3, textAlign: "center" }}>
                        방 기본 정보
                      </Typography>
                      
                      <Stack spacing={2}>
                        <InfoItem>
                          <Box sx={{ display: "flex", alignItems: "center", flex: 1 }}>
                            <Home sx={{ mr: 2, color: "#00BFFF" }} />
                            <Box>
                              <Typography variant="body2" sx={{ color: "#9ca3af" }}>
                                건물 이름
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
                                위치 정보
                              </Typography>
                              <Typography variant="body1" sx={{ color: "white", fontWeight: "bold" }}>
                                {room.floor_number ? `${room.floor_number}층` : "N/A"} • {room.room_number || "N/A"}호
                              </Typography>
                            </Box>
                          </Box>
                        </InfoItem>

                        <InfoItem>
                          <Box sx={{ display: "flex", alignItems: "center", flex: 1 }}>
                            <Numbers sx={{ mr: 2, color: "#eab308" }} />
                            <Box>
                              <Typography variant="body2" sx={{ color: "#9ca3af" }}>
                                방 정보
                              </Typography>
                              <Typography variant="body1" sx={{ color: "white", fontWeight: "bold" }}>
                                방 번호: {room.room_number || "N/A"} • 정원: {room.room_capacity || "N/A"}명
                              </Typography>
                            </Box>
                          </Box>
                        </InfoItem>

                        <InfoItem>
                          <Box sx={{ display: "flex", alignItems: "center", flex: 1 }}>
                            <People sx={{ mr: 2, color: "#8b5cf6" }} />
                            <Box>
                              <Typography variant="body2" sx={{ color: "#9ca3af" }}>
                                현재 거주 인원
                              </Typography>
                              <Typography variant="body1" sx={{ color: "white", fontWeight: "bold" }}>
                                {room.occupant_count || 0} / {room.room_capacity || "N/A"} 명
                              </Typography>
                            </Box>
                          </Box>
                        </InfoItem>

                        <InfoItem>
                          <Box sx={{ display: "flex", alignItems: "center", flex: 1 }}>
                            <Schedule sx={{ mr: 2, color: "#f97316" }} />
                            <Box>
                              <Typography variant="body2" sx={{ color: "#9ca3af" }}>
                                마지막 업데이트
                              </Typography>
                              <Typography variant="body1" sx={{ color: "white", fontWeight: "bold" }}>
                                {room.last_updated ? new Date(room.last_updated).toLocaleString('ko-KR') : "Unknown"}
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
                        거주자 정보
                      </Typography>
                      
                      {room.occupants ? (
                        <Box>
                          <InfoItem sx={{ mb: 2 }}>
                            <Box sx={{ display: "flex", alignItems: "center", flex: 1 }}>
                              <People sx={{ mr: 2, color: "#8b5cf6" }} />
                              <Box>
                                <Typography variant="body2" sx={{ color: "#9ca3af" }}>
                                  총 거주자 수
                                </Typography>
                                <Typography variant="body1" sx={{ color: "white", fontWeight: "bold" }}>
                                  {room.occupant_count || 0}명
                                </Typography>
                              </Box>
                            </Box>
                          </InfoItem>

                          <Typography variant="body1" sx={{ color: "#9ca3af", mb: 2, textAlign: "center" }}>
                            현재 거주 중인 학생들:
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
                            현재 이 방에 거주 중인 학생이 없습니다.
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
                    Last updated: {room.last_updated ? new Date(room.last_updated).toLocaleString('en-US') : "Unknown"}
                  </Typography>
                </CardContent>
              </StyledCard>
            </Grid>
          ))}
        </Grid>

        {roomData.length === 0 && (
          <Box sx={{ textAlign: "center", mt: 4 }}>
            <Typography variant="h6" sx={{ color: "#9ca3af" }}>
              표시할 방 데이터가 없습니다.
            </Typography>
          </Box>
        )}
      </Container>
    </Box>
  );
};

export default MainTop;