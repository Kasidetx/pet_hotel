'use client'

import { useEffect, useState } from 'react'
import { useSearchParams } from 'next/navigation'
import { useAuth } from '@/context/AuthContext'
import { redirect } from 'next/navigation'

import {
  Box,
  Container,
  Typography,
  Divider,
  Paper,
  Grid,
  Button,
  CircularProgress,
  Alert,
  Card,
  CardContent,
  Stepper,
  Step,
  StepLabel,

} from '@mui/material'
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline'
import { ThemeProvider, createTheme } from '@mui/material/styles'
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider'
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs'
import { DatePicker } from '@mui/x-date-pickers/DatePicker'
import dayjs from 'dayjs'

const theme = createTheme({
  palette: {
    primary: { main: '#000000' },
    secondary: { main: '#d1b973' },
    background: { default: '#f8faff' }
  },
  typography: {
    fontFamily: "'Kanit','Roboto','Arial',sans-serif",
    h4: { fontWeight: 700 }
  }
})

const steps = ['เลือกห้องพัก', 'ข้อมูลการจอง', 'ยืนยันการจอง']

export default function BookingSummaryPage() {
  const { user, loading } = useAuth()
  const searchParams = useSearchParams()
  const [bookingData, setBookingData] = useState(null)
  const [checkIn, setCheckIn] = useState(dayjs().add(1, 'day'))
  const [checkOut, setCheckOut] = useState(dayjs().add(2, 'day'))
  const [totalNights, setTotalNights] = useState(1)
  const [totalPrice, setTotalPrice] = useState(0)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [confirmationStatus, setConfirmationStatus] = useState(null)

  useEffect(() => {
    if (!loading && !user) {
      redirect('/login')
    }
  }, [loading, user])

  useEffect(() => {
    if (searchParams) {
      const roomId = searchParams.get('roomId')
      const title = searchParams.get('title')
      const price = searchParams.get('price')

      if (roomId && title && price) {
        setBookingData({
          roomId,
          title,
          price: parseFloat(price)
        })
      } else {
        const storedRoom = localStorage.getItem('selectedRoom')
        if (storedRoom) {
          try {
            const parsedRoom = JSON.parse(storedRoom)
            setBookingData(parsedRoom)
          } catch (error) {
            console.error("Error parsing stored room data:", error)
          }
        }
      }
    }
  }, [searchParams])

  useEffect(() => {
    if (checkIn && checkOut) {
      const nights = checkOut.diff(checkIn, 'day')
      setTotalNights(nights > 0 ? nights : 1)
    }
  }, [checkIn, checkOut])

  useEffect(() => {
    if (bookingData && totalNights) {
      setTotalPrice(bookingData.price * totalNights)
    }
  }, [bookingData, totalNights])

  const handleConfirmBooking = async () => {
    try {
      setIsSubmitting(true);

      console.log("Current user data:", user);

      const bookingPayload = {
        userId: user.id,
        roomId: bookingData.roomId,
        title: bookingData.title,
        price: bookingData.price,
        checkIn: checkIn.format('YYYY-MM-DD'),
        checkOut: checkOut.format('YYYY-MM-DD'),
      };

      console.log("Booking payload:", bookingPayload);

      const response = await fetch('/api/utils/booking', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(bookingPayload),
      });

      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.error || 'เกิดข้อผิดพลาดในการจอง');
      }

      localStorage.setItem('bookingConfirmation', JSON.stringify({
        ...bookingPayload,
        bookingReference: result.bookingReference,
        bookingId: result.bookingId,
        totalNights: totalNights,
        totalPrice: totalPrice,
        taxAmount: totalPrice * 0.07,
        grandTotal: totalPrice * 1.07
      }));

      setConfirmationStatus('success');

      localStorage.removeItem('selectedRoom');

    } catch (error) {
      console.error("Error confirming booking:", error);
      setConfirmationStatus('error');
    } finally {
      setIsSubmitting(false);
    }
  };

  if (loading) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', mt: 4 }}>
        <CircularProgress size={48} /> กำลังโหลดข้อมูล
      </Box>
    )
  }

  if (!bookingData) {
    return (
      <Container maxWidth="md" sx={{ py: 6 }}>
        <Alert severity="error">
          ไม่พบข้อมูลห้องพัก โปรดกลับไปเลือกห้องพักใหม่อีกครั้ง
          <Button
            href="/booking"
            sx={{ ml: 2, color: 'inherit', textDecoration: 'underline' }}
          >
            กลับไปหน้าเลือกห้องพัก
          </Button>
        </Alert>
      </Container>
    )
  }

  if (confirmationStatus === 'success') {
    return (
      <ThemeProvider theme={theme}>
        <Container maxWidth="md" sx={{ py: 6 }}>
          <Paper sx={{ p: 4, textAlign: 'center' }}>
            <CheckCircleOutlineIcon color="success" sx={{ fontSize: 80, mb: 2 }} />
            <Typography variant="h4" gutterBottom>จองห้องพักเรียบร้อยแล้ว!</Typography>
            <Typography variant="body1" sx={{
              marginBottom: "16px"
            }}>
              ขอบคุณที่ใช้บริการกับเรา การจองของคุณได้รับการยืนยันแล้ว
            </Typography>
            <Typography variant="body2" color="text.secondary" sx={{
              marginBottom: "16px"
            }}>
              เราได้ส่งอีเมลยืนยันการจองไปที่อีเมลของคุณแล้ว โปรดตรวจสอบอีเมลของคุณ
            </Typography>
            <Box sx={{ mt: 4 }}>
              <Button
                variant="contained"
                color="primary"
                href="/"
                sx={{ mr: 2 }}
              >
                กลับสู่หน้าแรก
              </Button>
              <Button
                variant="outlined"
                href="/booking"
              >
                จองห้องเพิ่มเติม
              </Button>
            </Box>
          </Paper>
        </Container>
      </ThemeProvider>
    );
  }

  return (
    <ThemeProvider theme={theme}>
      <Container maxWidth="lg" sx={{ py: 6, backgroundColor: 'background.default' }}>
        <Box sx={{ width: '100%', mb: 6 }}>
          <Stepper activeStep={1} alternativeLabel>
            {steps.map((label) => (
              <Step key={label}>
                <StepLabel>{label}</StepLabel>
              </Step>
            ))}
          </Stepper>
        </Box>

        <Typography variant="h4" gutterBottom>สรุปการจองห้องพัก</Typography>
        <Divider sx={{ mb: 4 }} />

        {confirmationStatus === 'error' && (
          <Alert severity="error" sx={{ mb: 3 }}>
            เกิดข้อผิดพลาดในการยืนยันการจอง โปรดลองใหม่อีกครั้ง
          </Alert>
        )}

        <Grid container spacing={4}>
          <Grid item xs={12} md={7}>
            <Paper sx={{ p: 3, mb: 3 }}>
              <Typography variant="h6" gutterBottom>ข้อมูลห้องพัก</Typography>
              <Divider sx={{ mb: 2 }} />

              <Grid container spacing={2}>
                <Grid item xs={12}>
                  <Typography variant="subtitle1" fontWeight="bold">
                    {bookingData.title}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    ราคาต่อคืน: ฿{bookingData.price.toLocaleString()}
                  </Typography>
                </Grid>
              </Grid>
            </Paper>

            <Paper sx={{ p: 3 }}>
              <Typography variant="h6" gutterBottom>ข้อมูลการเข้าพัก</Typography>
              <Divider sx={{ mb: 2 }} />

              <LocalizationProvider dateAdapter={AdapterDayjs}>
                <Grid container spacing={3}>
                  <Grid item xs={12} sm={6}>
                    <DatePicker
                      label="วันที่เช็คอิน"
                      value={checkIn}
                      onChange={(newValue) => setCheckIn(newValue)}
                      minDate={dayjs()}
                      sx={{ width: '100%' }}
                    />
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <DatePicker
                      label="วันที่เช็คเอาท์"
                      value={checkOut}
                      onChange={(newValue) => setCheckOut(newValue)}
                      minDate={checkIn.add(1, 'day')}
                      sx={{ width: '100%' }}
                    />
                  </Grid>
                </Grid>
              </LocalizationProvider>
            </Paper>
          </Grid>

          <Grid item xs={12} md={5}>
            <Card sx={{ position: 'sticky', top: '20px' }}>
              <CardContent>
                <Typography variant="h6" gutterBottom>สรุปการชำระเงิน</Typography>
                <Divider sx={{ mb: 2 }} />

                <Box sx={{ mb: 2 }}>
                  <Grid container justifyContent="space-between" sx={{ mb: 1 }}>
                    <Typography variant="body1">ค่าห้องพัก ({totalNights} คืน)</Typography>
                    <Typography variant="body1">฿{(bookingData.price * totalNights).toLocaleString()}</Typography>
                  </Grid>
                  <Grid container justifyContent="space-between" sx={{ mb: 1 }}>
                    <Typography variant="body1">ภาษีและค่าบริการ</Typography>
                    <Typography variant="body1">฿{(totalPrice * 0.07).toLocaleString()}</Typography>
                  </Grid>
                </Box>

                <Divider sx={{ my: 2 }} />

                <Grid container justifyContent="space-between" sx={{ mb: 3 }}>
                  <Typography variant="h6">ยอดรวมทั้งสิ้น</Typography>
                  <Typography variant="h6">฿{(totalPrice * 1.07).toLocaleString()}</Typography>
                </Grid>

                <Button
                  variant="contained"
                  color="secondary"
                  size="large"
                  fullWidth
                  onClick={handleConfirmBooking}
                  disabled={isSubmitting}
                >
                  {isSubmitting ? 'กำลังดำเนินการ...' : 'ยืนยันการจอง'}
                </Button>

                <Box sx={{ mt: 2, textAlign: 'center' }}>
                  <Typography variant="caption" color="text.secondary">
                    -------------------------------------------------------
                  </Typography>
                </Box>
              </CardContent>
            </Card>
          </Grid>
        </Grid>
      </Container>
    </ThemeProvider>
  )
}