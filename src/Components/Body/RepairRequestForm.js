import React from "react";
import { TextField, Button, MenuItem, Container, Typography, Grid } from "@mui/material";

const RepairRequestForm = () => {
  return (
    <Container maxWidth="sm">
      <Typography variant="h4" gutterBottom>
        수리 요청 양식
      </Typography>
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <TextField fullWidth label="이름" variant="outlined" />
        </Grid>
        <Grid item xs={12}>
          <TextField fullWidth label="전화번호" variant="outlined" />
        </Grid>
        <Grid item xs={12}>
          <TextField fullWidth label="이메일" variant="outlined" />
        </Grid>
        <Grid item xs={12}>
          <TextField fullWidth label="주소" variant="outlined" />
        </Grid>
        <Grid item xs={12}>
          <TextField fullWidth label="제품 모델" variant="outlined" />
        </Grid>
        <Grid item xs={12}>
          <TextField
            select
            fullWidth
            label="고장 유형"
            variant="outlined"
          >
            <MenuItem value="전원 문제">전원 문제</MenuItem>
            <MenuItem value="화면 문제">화면 문제</MenuItem>
            <MenuItem value="소프트웨어 문제">소프트웨어 문제</MenuItem>
            <MenuItem value="기타">기타</MenuItem>
          </TextField>
        </Grid>
        <Grid item xs={12}>
          <TextField
            fullWidth
            label="문제 설명"
            variant="outlined"
            multiline
            rows={4}
          />
        </Grid>
        <Grid item xs={12}>
          <Button variant="contained" color="primary" fullWidth>
            제출하기
          </Button>
        </Grid>
      </Grid>
    </Container>
  );
};

export default RepairRequestForm;
