import React, { useEffect, useState } from "react";
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
  Dialog,
  DialogContent,
  DialogTitle,
  IconButton,
  AppBar,
  Toolbar,
  Tooltip,
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
  Close,
  Thermostat,
  WaterDrop,
  ElectricBolt,
  Person,
  Home,
  LocationOn,
  People,
  Numbers,
  WarningAmber
} from "@mui/icons-material";
import AiDangerStatus from "../AiDangerStatus";

const StyledCard = styled(Card)(({ theme }) => ({
  background: "rgba(255, 255, 255, 0.1)",
  backdropFilter: "blur(10px)",
  border: "1px solid rgba(255, 255, 255, 0.2)",
  borderRadius: 16,
  color: "white",
  cursor: "pointer",
  transition: "all 0.3s ease",
  "&:hover": {
    background: "rgba(255, 255, 255, 0.15)",
    transform: "translateY(-4px)",
    boxShadow: "0 12px 28px rgba(0, 0, 0, 0.3)",
  },
}));

const StatusChip = styled(Chip)(({ theme }) => ({
  fontWeight: "bold",
  color: "white",
  fontSize: "0.7rem",
  height: 24,
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

const InfoItem = styled(Box)(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  padding: theme.spacing(1.5),
  backgroundColor: "rgba(255, 255, 255, 0.05)",
  borderRadius: 8,
  border: "1px solid rgba(255, 255, 255, 0.1)",
  marginBottom: theme.spacing(1),
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
  marginBottom: theme.spacing(2),
}));

const MainAdminTop = () => {
  const [allRoomsData, setAllRoomsData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedRoom, setSelectedRoom] = useState(null);
  const [tabValue, setTabValue] = useState(0);

  useEffect(() => {
    const user = localStorage.getItem("user_id");
    if (!user) {
      window.location.href = "/login";
      return;
    }
    fetchAllRoomsStatus();
  }, []);

  const fetchAllRoomsStatus = async () => {
    try {
      setLoading(true);
      setError(null);
      const userId = localStorage.getItem("user_id");

      if (!userId) {
        setError("사용자 ID를 찾을 수 없습니다");
        setLoading(false);
        return;
      }

      const response = await fetch(
        "https://home-repair-api.onrender.com/api/room/getRoomStatus/",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ user_id: userId }),
        }
      );

      if (!response.ok) {
        throw new Error(`HTTP 오류! 상태: ${response.status}`);
      }

      const data = await response.json();
      setAllRoomsData(Array.isArray(data) ? data : [data]);
    } catch (err) {
      console.error("Fetch 오류:", err);
      setError(err.message || "데이터를 가져올 수 없습니다");
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("user");
    localStorage.removeItem("user_id");
    localStorage.removeItem("role");
    window.location.href = "/login";
  };

  const handleTabChange = (event, newValue) => {
    setTabValue(newValue);
  };

  const RoomCard = ({ room }) => (
    <Grid item xs={12} sm={6} md={4} lg={3}>
      <StyledCard onClick={() => setSelectedRoom(room)}>
        <CardContent>
          <Typography
            variant="h6"
            sx={{
              color: "#60a5fa",
              fontWeight: "bold",
              textAlign: "center",
              mb: 1,
            }}
          >
            {room.building_name} • {room.floor_number}층
          </Typography>
          <Typography
            variant="h5"
            sx={{
              color: "#fff",
              fontWeight: "bold",
              textAlign: "center",
              mb: 2,
            }}
          >
            {room.room_number}호
          </Typography>
          <Box sx={{ display: "flex", alignItems: "center", mb: 2 }}>
            <Typography sx={{ mr: 1 }}>AI 🤖</Typography>
            <AiDangerStatus danger_status_ai={room.danger_status_ai} />
          </Box>

          <Stack spacing={1} sx={{ mb: 2 }}>
            <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
              <Box sx={{ display: "flex", alignItems: "center" }}>
                <Thermostat sx={{ fontSize: 16, mr: 1, color: "#ef4444" }} />
                <Typography variant="body2" sx={{ color: "#9ca3af" }}>
                  온도
                </Typography>
              </Box>
              <Typography variant="body2" sx={{ color: "white", fontWeight: "bold" }}>
                {room.temperature}°C
              </Typography>
            </Box>

            <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
              <Box sx={{ display: "flex", alignItems: "center" }}>
                <WaterDrop sx={{ fontSize: 16, mr: 1, color: "#3b82f6" }} />
                <Typography variant="body2" sx={{ color: "#9ca3af" }}>
                  습도
                </Typography>
              </Box>
              <Typography variant="body2" sx={{ color: "white", fontWeight: "bold" }}>
                {room.humidity}%
              </Typography>
            </Box>

            <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
              <Box sx={{ display: "flex", alignItems: "center" }}>
                <ElectricBolt sx={{ fontSize: 16, mr: 1, color: "#eab308" }} />
                <Typography variant="body2" sx={{ color: "#9ca3af" }}>
                  전력
                </Typography>
              </Box>
              <Typography variant="body2" sx={{ color: "white", fontWeight: "bold" }}>
                {room.power_consumption}W
              </Typography>
            </Box>

            {/* Occupants Info */}
            <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
              <Box sx={{ display: "flex", alignItems: "center" }}>
                <People sx={{ fontSize: 16, mr: 1, color: "#8b5cf6" }} />
                <Typography variant="body2" sx={{ color: "#9ca3af" }}>
                  거주자
                </Typography>
              </Box>
              <Typography variant="body2" sx={{ color: "white", fontWeight: "bold" }}>
                {room.occupant_count || 0}/{room.room_capacity}
              </Typography>
            </Box>
          </Stack>

          <Stack direction="row" spacing={1} justifyContent="center" flexWrap="wrap" gap={0.5}>
            <StatusChip
              label="AC"
              size="small"
              sx={{
                backgroundColor: room.ac_status === "ON" ? "#22c55e" : "#ef4444",
              }}
            />
            <StatusChip
              label="WD"
              size="small"
              sx={{
                backgroundColor: room.window_status === "OPEN" ? "#22c55e" : "#ef4444",
              }}
            />
            <StatusChip
              label={room.room_occupancy === "OCCUPIED" ? "OCCUPIED" : "VACANT"}
              size="small"
              sx={{
                backgroundColor: room.room_occupancy === "OCCUPIED" ? "#3b82f6" : "#6b7280",
              }}
            />
          </Stack>
        </CardContent>
      </StyledCard>
    </Grid>
  );

  const RoomDetailModal = ({ room, onClose }) => (
    <Dialog
      open={!!room}
      onClose={onClose}
      maxWidth="md"
      fullWidth
      PaperProps={{
        sx: {
          backgroundColor: "#1e293b",
          borderRadius: 3,
          background: "rgba(30, 41, 59, 0.95)",
          backdropFilter: "blur(20px)",
        },
      }}
    >
      <DialogTitle sx={{ borderBottom: "1px solid rgba(255,255,255,0.1)", pb: 2 }}>
        <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
          <Box>
            <Typography variant="h5" sx={{ color: "white", fontWeight: "bold" }}>
              {room.building_name} • {room.floor_number}층 {room.room_number}호
            </Typography>
            <Typography variant="body2" sx={{ color: "#9ca3af" }}>
              Room ID: {room.room_id}
            </Typography>
          </Box>
          <IconButton onClick={onClose} sx={{ color: "white" }}>
            <Close />
          </IconButton>
        </Box>
      </DialogTitle>

      <DialogContent sx={{ mt: 2 }}>
        {/* Tab Navigation */}
        <StyledTabs value={tabValue} onChange={handleTabChange} centered>
          <Tab label="환경 상태" />
          <Tab label="방 정보" />
          <Tab label="거주자 정보" />
        </StyledTabs>

        {/* Tab 1: Environment Status */}
        {tabValue === 0 && (
          <Box>
            {/* 스마트 콘센트 Section */}
            <Box sx={{ mb: 3 }}>
              <Box sx={{ display: "flex", alignItems: "center", mb: 1 }}>
                <Power sx={{ mr: 1, color: "#fff" }} />
                <Typography variant="h6" sx={{ color: "white", fontWeight: "bold" }}>
                  스마트 콘센트
                </Typography>
              </Box>
              <Chip
                label="(MAX 3KW)"
                size="small"
                sx={{
                  backgroundColor: "rgba(255,255,255,0.1)",
                  color: "#9ca3af",
                  mb: 2,
                }}
              />
              <PowerUsageBox sx={room.danger_status_ai === 1 ? {backgroundColor:"red"} : "" }>
                <Typography variant="body1" sx={{ color: "#9ca3af" }}>
                  {room.danger_status_ai === 1 &&
                    <WarningAmber />}
                  전력 사용량:
                </Typography>
                <Typography variant="h6" sx={{ color: "white", fontWeight: "bold" }}>
                  {room.power_consumption}W
                </Typography>
              </PowerUsageBox>
            </Box>

            <Divider sx={{ backgroundColor: "rgba(255,255,255,0.2)", my: 2 }} />

            {/* Environment Status Section */}
            <Box sx={{ mb: 3 }}>
              <Box sx={{ display: "flex", alignItems: "center", mb: 2 }}>
                <AcUnit sx={{ mr: 1, color: "#fff" }} />
                <Typography variant="h6" sx={{ color: "white", fontWeight: "bold" }}>
                  창문 열림 / 에어컨 켜짐
                </Typography>
              </Box>

              <Grid container spacing={1}>
                <Grid item xs={6}>
                  <StatusItem sx={room.danger_status_ai === 3 ? {backgroundColor:"red"} : "" }>
                    <Typography variant="body2" sx={{ color: "#9ca3af", fontWeight: "bold" }}>
                      온도:
                    </Typography>
                    <Typography variant="body2" sx={{ color: "white", fontWeight: "bold" }}>
                      {room.temperature}°C
                    </Typography>
                  </StatusItem>
                </Grid>
                <Grid item xs={6}>
                  <StatusItem sx={room.danger_status_ai === 2 ? {backgroundColor:"red"} : "" }>
                    <Typography variant="body2" sx={{ color: "#9ca3af", fontWeight: "bold" }}>
                      에어컨:
                    </Typography>
                    <Chip
                      label={room.ac_status}
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
                      습도:
                    </Typography>
                    <Typography variant="body2" sx={{ color: "white", fontWeight: "bold" }}>
                      {room.humidity}%
                    </Typography>
                  </StatusItem>
                </Grid>
                <Grid item xs={6}>
                  <StatusItem sx={room.danger_status_ai === 2 ? {backgroundColor:"red"} : "" }>
                    <Typography variant="body2" sx={{ color: "#9ca3af", fontWeight: "bold" }}>
                      창문:
                    </Typography>
                    <Box sx={{ display: "flex", alignItems: "center" }}>
                      <Window sx={{ fontSize: 16, mr: 0.5, color: "#fff" }} />
                      <Typography variant="body2" sx={{ color: "white", fontWeight: "bold" }}>
                        {room.window_status}
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
                <Typography variant="h6" sx={{ color: "white", fontWeight: "bold" }}>
                  빈 방 (30분 제한)
                </Typography>
              </Box>

              <VacancyTable sx={room.danger_status_ai === 4 ? {backgroundColor:"red"} : "" }>
                <TableHeader>
                  <TableCell>감지</TableCell>
                  <TableCell>남은 시간</TableCell>
                  <TableCell>전력</TableCell>
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

        {/* 마지막 업데이트 - All Tabs */}
        <Typography
          variant="caption"
          sx={{
            color: "#9ca3af",
            textAlign: "center",
            display: "block",
            mt: 3,
            fontStyle: "italic",
          }}
        >
          마지막 업데이트: {room.last_updated ? new Date(room.last_updated).toLocaleString('en-US') : "Unknown"}
        </Typography>
      </DialogContent>
    </Dialog>
  );

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
        <CircularProgress sx={{ color: "#00BFFF", mb: 2 }} size={60} />
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
          onClick={fetchAllRoomsStatus}
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
    <Box sx={{ backgroundColor: "#0B1120", minHeight: "100vh" }}>
      {/* Header */}
      <AppBar
        position="static"
        sx={{
          backgroundColor: "rgba(15, 23, 42, 0.8)",
          backdropFilter: "blur(10px)",
          mb: 4,
        }}
      >
        <Toolbar>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1, color: "white" }}>
            Admin Dashboard
          </Typography>
          <Typography variant="body1" sx={{ color: "#9ca3af", mr: 2 }}>
            전체 {allRoomsData.length}개 방
          </Typography>
          <Tooltip title="데이터 새로고침">
            <IconButton
              onClick={fetchAllRoomsStatus}
              sx={{ color: "white", mr: 1 }}
            >
              <Refresh />
            </IconButton>
          </Tooltip>
          {/* <Button
            color="error"
            variant="contained"
            startIcon={<Logout />}
            onClick={handleLogout}
            size="small"
          >
            로그아웃
          </Button> */}
        </Toolbar>
      </AppBar>

      <Container maxWidth="xl" sx={{ pb: 4 }}>
        <Grid container spacing={3}>
          {allRoomsData.map((room, index) => (
            <RoomCard key={index} room={room} />
          ))}
        </Grid>

        {allRoomsData.length === 0 && (
          <Box sx={{ textAlign: "center", mt: 8 }}>
            <Typography variant="h6" sx={{ color: "#9ca3af" }}>
              표시할 방 데이터가 없습니다.
            </Typography>
          </Box>
        )}
      </Container>

      {selectedRoom && (
        <RoomDetailModal
          room={selectedRoom}
          onClose={() => setSelectedRoom(null)}
        />
      )}
    </Box>
  );
};

export default MainAdminTop;