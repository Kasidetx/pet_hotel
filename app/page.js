"use client";

import React from "react";
import {
  Box,
  Button,
  Container,
  Typography,
  Grid,
  Paper,
  Card,
  CardContent,
  Avatar,
  Divider
} from "@mui/material";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import HomeIcon from "@mui/icons-material/Home";
import AddIcon from "@mui/icons-material/Add";
import SentimentSatisfiedAltIcon from "@mui/icons-material/SentimentSatisfiedAlt";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import PhoneIcon from "@mui/icons-material/Phone";
import styles from "./page.module.css";
import { green } from "@mui/material/colors";

// สร้างธีมสำหรับเว็บไซต์
const theme = createTheme({
  palette: {
    primary: {
      main: "#1976d2",
    },
    secondary: {
      main: "#f50057",
    },
    background: {
      default: "#f8faff",
    },
  },
  typography: {
    fontFamily: "'Kanit', 'Roboto', 'Arial', sans-serif",
    h1: {
      fontWeight: 700,
    },
    h2: {
      fontWeight: 700,
    },
    h3: {
      fontWeight: 600,
    },
  },
});

export default function Home() {
  return (
    <ThemeProvider theme={theme}>
      <Box className={styles.container}>
        <Box className={styles.heroSection}>
          <Container maxWidth="md" className={styles.heroContent}>
            <Typography
              variant="h1"
              className={styles.heroTitle}
              sx={{ fontSize: { xs: "2rem", md: "3rem" } }}
            >
              "Your friendly neighborhood pet care"
            </Typography>

            <Typography
              variant="body1"
              className={styles.heroDescription}
              sx={{ fontSize: { xs: "1rem", md: "1.25rem" } }}
            >
              บริการรับฝากสุนัข แมว มีพนักงานดูแลอย่างใกล้ชิด Pet Hotel โรงแรมสุนัขและแมว
              มีพนักงานดูแลอย่างใกล้ชิด มี Indoor Playground ปล่อยให้วิ่งเล่นวันละ 3 เวลา ไม่ขังกรง ลดความเครียดของสุนัขและแมว
              พร้อมบริการ Day Care ดูแลชั่วคราวรายชั่วโมง
            </Typography>

            <Button
              variant="contained"
              size="large"
              href="/booking"
              className={styles.heroButton}
              sx={{ mt: 4 }}
            >
              จองเลย
            </Button>
          </Container>
        </Box>

        <Container maxWidth="lg" className={styles.featuresSection}>
          <Grid container spacing={4} justifyContent="center">

            <Grid>
              <Card elevation={3} className={styles.featureCard}>
                <Avatar className={styles.featureIcon}>
                  <HomeIcon className={styles.featureIconSize} sx={{ color: green[500] }} />
                </Avatar>
                <Typography
                  variant="h5"
                  component="h3"
                  className={styles.featureTitle}
                >
                  ห้องพักสะอาด
                </Typography>

                <Typography
                  variant="body1"
                  color="text.secondary"
                  className={styles.featureDescription}
                >
                  พื้นที่พักผ่อนสำหรับสัตว์เลี้ยงที่สะอาด ปลอดภัย และสบาย
                </Typography>
              </Card>
            </Grid>

            <Grid>
              <Card elevation={3} className={styles.featureCard}>
                <Avatar className={styles.featureIcon}>
                  <AddIcon className={styles.featureIconSize} sx={{ color: green[500] }} />
                </Avatar>

                <Typography
                  variant="h5"
                  component="h3"
                  className={styles.featureTitle}
                >
                  ดูแลใกล้ชิด
                </Typography>

                <Typography
                  variant="body1"
                  color="text.secondary"
                  className={styles.featureDescription}
                >
                  พนักงานมืออาชีพคอยดูแลสัตว์เลี้ยงของคุณตลอด 24 ชั่วโมง
                </Typography>
              </Card>
            </Grid>

            <Grid>
              <Card elevation={3} className={styles.featureCard}>
                <Avatar className={styles.featureIcon}>
                  <SentimentSatisfiedAltIcon className={styles.featureIconSize} sx={{ color: green[500] }} />
                </Avatar>

                <Typography
                  variant="h5"
                  component="h3"
                  className={styles.featureTitle}
                >
                  พื้นที่เล่น
                </Typography>

                <Typography
                  variant="body1"
                  color="text.secondary"
                  className={styles.featureDescription}
                >
                  Indoor Playground ให้สัตว์เลี้ยงออกกำลังกายวันละ 3 เวลา
                </Typography>
              </Card>
            </Grid>
          </Grid>
        </Container>

        <Box className={styles.aboutSection}>
          <Container maxWidth="md">
            <Box sx={{ textAlign: "center" }}>
              <Typography
                variant="h2"
                component="h2"
                className={styles.aboutTitle}
                sx={{ fontSize: { xs: "32px", md: "40px" } }}
              >
                ABOUT PET HOTEL BANGKOK
              </Typography>

              <Divider
                className={styles.aboutDivider}
                sx={{
                  borderBottomWidth: 3,
                  borderColor: '#1976d2',
                  width: '10%',
                  margin: '20px auto'
                }}
              />


              <Typography variant="body1" className={styles.aboutText}>
                Pet Hotel คือโรงแรม 5 ดาวที่ให้บริการดูแลและรับฝากสัตว์เลี้ยงแทนคุณ
              </Typography>

              <Typography variant="body1" className={styles.aboutText}>
                Pet Hotel ตั้งอยู่ที่สุขุมวิท 103 มีห้องหลายขนาดให้เลือกตั้งเเต่ระดับ Standard - Suite
              </Typography>

              <Typography variant="body1" className={styles.aboutText}>
                สะดวกในการเดินทางไป รถวิ่งไฟฟ้าสายสีเเดง สถานีหลักหก
              </Typography>
            </Box>
          </Container>
        </Box>

        <Box className={styles.contactSection}>
          <Container maxWidth="md">
            <Typography
              variant="h2"
              component="h2"
              align="center"
              className={styles.contactTitle}
            >
              ติดต่อเรา
            </Typography>
            <Divider
              sx={{
                borderBottomWidth: 3,
                borderColor: 'primary.main',
                width: '10%',
                mx: 'auto',
                mt: 2,
                mb: 4
              }}
            />
            <Grid container spacing={4} justifyContent="center">
              <Grid>
                <Paper elevation={3} className={styles.contactCard}>
                  <Avatar className={`${styles.contactIcon} ${styles.locationIconBg}`}>
                    <LocationOnIcon className={styles.locationIconColor} />
                  </Avatar>
                  <Typography variant="h6" gutterBottom className={styles.contactSubtitle}>
                    ที่อยู่
                  </Typography>
                  <Typography variant="body1" color="text.secondary">
                    52 347 ถ. พหลโยธิน ตำบล หลักหก อำเภอเมืองปทุมธานี ปทุมธานี 12000
                  </Typography>
                </Paper>
              </Grid>

              <Grid>
                <Paper elevation={3} className={styles.contactCard}>
                  <Avatar className={`${styles.contactIcon} ${styles.phoneIconBg}`}>
                    <PhoneIcon className={styles.phoneIconColor} />
                  </Avatar>
                  <Typography variant="h6" gutterBottom className={styles.contactSubtitle}>
                    โทรศัพท์
                  </Typography>
                  <Typography variant="body1" color="text.secondary">
                    02-123-4567
                  </Typography>
                </Paper>
              </Grid>
            </Grid>
          </Container>
        </Box>
      </Box>
    </ThemeProvider>
  );
}