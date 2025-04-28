'use client'

import React, { useEffect, useState } from 'react'
import { useAuth } from '@/context/AuthContext'
import { redirect, useRouter } from 'next/navigation'
import {
  Box,
  Container,
  Typography,
  Divider,
  Grid,
  Card,
  CardMedia,
  Button,
  CircularProgress,
  Alert,
  Chip
} from '@mui/material'
import AcUnitIcon from '@mui/icons-material/AcUnit'
import { ThemeProvider, createTheme } from '@mui/material/styles'

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

export default function BookingPage() {
  const { user, loading } = useAuth()
  const router = useRouter()
  const [rooms, setRooms] = useState([])
  const [dataLoading, setDataLoading] = useState(true)
  const [error, setError] = useState(null)
  const [bookingStatus, setBookingStatus] = useState({ status: null, message: '' })

  async function loadRooms() {
    try {
      setDataLoading(true)
      const response = await fetch('/api/utils/rooms')

      if (!response.ok) {
        throw new Error('ไม่สามารถดึงข้อมูลห้องได้')
      }

      const data = await response.json()
      setRooms(data.rooms)
      setDataLoading(false)
    } catch (error) {
      console.error("เกิดข้อผิดพลาดในการโหลดห้อง:", error)
      setError(error.message)
      setDataLoading(false)
    }
  }

  useEffect(() => {
    loadRooms()
  }, [])

  useEffect(() => {
    if (!loading && !user) {
      redirect('/login')
    }
  }, [loading, user])

  const handleBookRoom = async (roomId, roomType) => {
    try {
      setBookingStatus({ status: 'loading', message: 'กำลังทำการจองห้อง' })
      
      const selectedRoom = rooms.find(room => room.id === roomId);
      
      if (!selectedRoom) {
        throw new Error('');
      }
      
      setBookingStatus({
        status: 'success',
        message: 'จองห้องที่เลือกสำเร็จ กำลังส่งไปหน้าสรุปการจอง'
      })
      
      const roomData = {
        id: selectedRoom.id,
        title: selectedRoom.title,
        price: selectedRoom.price,
        type: roomType
      };
      
      localStorage.setItem('selectedRoom', JSON.stringify(roomData));
      
      setTimeout(() => {
        router.push(`/summary?roomId=${roomId}&title=${encodeURIComponent(selectedRoom.title)}&price=${selectedRoom.price}`);
      }, 1500);

    } catch (error) {
      console.error("Error booking room:", error)
      setBookingStatus({
        status: 'error',
        message: `ไม่สามารถจองห้อง: ${error.message}`
      })
    }
  }

  if (loading || dataLoading) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', mt: 4 }}>
        <CircularProgress size={48} /> กำลังโหลดข้อมูล
      </Box>
    )
  }

  if (error) {
    return (
      <Container maxWidth="lg" sx={{ py: 6 }}>
        <Alert severity="error">ไม่สามารถโหลดข้อมูลห้องพักได้: {error}</Alert>
      </Container>
    )
  }

  return (
    <ThemeProvider theme={theme}>
      <Container maxWidth="lg" sx={{ py: 6, backgroundColor: 'background.default' }}>
        <Typography variant="h4">ห้องทั้งหมด</Typography>
        <Divider sx={{ mb: 4 }} />

        {bookingStatus.status && (
          <Alert
            severity={bookingStatus.status === 'success' ? 'success' : bookingStatus.status === 'loading' ? 'info' : 'error'}
            sx={{ mb: 3 }}
          >
            {bookingStatus.message}
          </Alert>
        )}

        {rooms.map((room) => {
          return (
            <Box key={room.id} sx={{ mb: 4 }}>
              <Grid container spacing={2} alignItems="center">
                <Grid item xs={12} md={4}>
                  <Card>
                    <CardMedia
                      component="img"
                      image={room.img}
                      alt={room.title}
                      sx={{ width: '100%', height: 180, objectFit: 'cover' }}
                    />
                  </Card>
                </Grid>

                <Grid item xs={12} md={5}>
                  <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
                    <Typography variant="h5">{room.title}</Typography>
                  </Box>
                  <Typography variant="body2" color="text.secondary" sx={{
                    marginBottom: "16px"
                  }}>
                    {room.description}
                  </Typography>
                  <Box component="ul" sx={{ pl: 2, mb: 2 }}>
                    {room.features.map(feat => (
                      <Box component="li" key={feat} sx={{ mb: 0.5 }}>
                        {feat}
                      </Box>
                    ))}
                  </Box>

                  <Typography variant="subtitle2" gutterBottom>
                    สิ่งอำนวยความสะดวก:
                  </Typography>
                  <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1, mb: 2 }}>
                    {room.amenities.map(amenity => (
                      <Chip key={amenity} label={amenity} size="small" />
                    ))}
                  </Box>

                  <Divider />
                  <Box sx={{ mt: 2 }}>
                    <AcUnitIcon color="disabled" />
                  </Box>
                </Grid>

                <Grid item xs={12} md={3} sx={{ textAlign: 'center' }}>
                  <Typography variant="caption" color="text.secondary" sx={{ display: 'block' }}>
                    From
                  </Typography>
                  <Typography variant="h5" gutterBottom>
                    ฿{room.price}
                  </Typography>
                  <Button
                    variant="contained"
                    fullWidth
                    sx={{
                      backgroundColor: 'secondary.main',
                      height: '36px',
                      maxWidth: '160px'
                    }}
                    disabled={bookingStatus.status === 'loading'}
                    onClick={() => handleBookRoom(room.id, room.title)}
                  >
                    {bookingStatus.status === 'loading' ? 'Processing...' : 'BOOK NOW'}
                  </Button>
                </Grid>
              </Grid>
            </Box>
          );
        })}
      </Container>
    </ThemeProvider>
  );
}