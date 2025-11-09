import { Tooltip, Box, Typography } from "@mui/material";
import { CheckCircle, WarningAmber } from "@mui/icons-material";

const dangerMessages = {
  0: "방 상태는 안전합니다. 이상 없음.", // Safe
  1: "전력 소비가 2kW를 초과했습니다. 과부하 위험이 있습니다.", // Over Power
  2: "에어컨과 창문이 동시에 열려 있습니다. 에너지 낭비 가능성.", // AC and window
  3: "온도 또는 습도가 비정상적인 수준입니다.", // Temp Hum
  4: "방이 비어있는데 전력 소비가 높습니다.", // No student in room
};

// AI Durumunu Gösteren Bileşen
function AiDangerStatus({ danger_status_ai }) {
  const message = dangerMessages[danger_status_ai] || "AI 상태를 불러오는 중...";

  return (
    <Tooltip title={message} arrow>
      <Box sx={{ display: "flex", alignItems: "center", ml: 1 }}>
        {danger_status_ai === 0 ? (
          <CheckCircle sx={{ color: "#22c55e", fontSize: 24 }} />
        ) : (
          <WarningAmber sx={{ color: "#ef4444", fontSize: 24 }} />
        )}
      </Box>
    </Tooltip>
  );
}
export default AiDangerStatus;