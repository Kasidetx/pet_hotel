'use client'

import { useState, useEffect } from 'react'
import {
  Box,
  Container,
  Paper,
  Typography,
  TextField,
  Button,
  Alert,
  CircularProgress,
  InputAdornment,
  IconButton,
  Avatar,
} from '@mui/material'
import { Email, Lock, Visibility, VisibilityOff, Login } from '@mui/icons-material'
import styles from './page.module.css'
import { useRouter } from 'next/navigation'

export default function LoginPage() {
  const router = useRouter()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)
  const [showPassword, setShowPassword] = useState(false)

  useEffect(() => {
    const checkAuthToken = async () => {
      try {
        const res = await fetch('/api/utils/auth', {
          method: 'GET',
          credentials: 'include'
        })

        const data = await res.json()

        if (res.ok && data.authenticated) {
          router.replace('/')
        }
      } catch (error) {
        console.error("Error checking authentication:", error)
      }
    }

    checkAuthToken()
  }, [router])

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);
    try {
      const res = await fetch('/api/utils/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include',
        body: JSON.stringify({ email, password })
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || 'เข้าสู่ระบบไม่สำเร็จ');

      localStorage.setItem('authToken', data.token);
      window.location.href = '/';
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };


  return (
    <Container maxWidth="xs" className={styles.loginContainer}>
      <Box className={styles.boxContainer}>
        <Paper elevation={6} className={styles.loginPaper}>
          <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', mb: 3 }}>
            <Avatar className={styles.avatarIcon}>
              <Login fontSize="large" />
            </Avatar>
            <Typography variant="h5" component="h1" className={styles.loginTitle}>
              เข้าสู่ระบบ
            </Typography>
          </Box>

          {error && (
            <Alert severity="error" className={styles.errorAlert}>
              {error}
            </Alert>
          )}

          <Box
            component="form"
            onSubmit={handleSubmit}
            noValidate
            className={styles.formContainer}
          >
            <TextField
              label="อีเมล"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              fullWidth
              variant="outlined"
              sx={{ mb: 2 }}
              className={styles.inputField}
              slotProps={{
                input: {
                  startAdornment: (
                    <InputAdornment position="start">
                      <Email className={styles.inputIcon} />
                    </InputAdornment>
                  ),
                }
              }}
            />
            <TextField
              label="รหัสผ่าน"
              type={showPassword ? 'text' : 'password'}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              fullWidth
              variant="outlined"
              sx={{ mb: 2 }}
              className={styles.inputField}
              slotProps={{
                input: {
                  startAdornment: (
                    <InputAdornment position="start">
                      <Lock className={styles.inputIcon} />
                    </InputAdornment>
                  ),
                  endAdornment: (
                    <InputAdornment position="end">
                      <IconButton onClick={() => setShowPassword(!showPassword)} edge="end" className={styles.visibilityButton}>
                        {showPassword ? <VisibilityOff className={styles.inputIcon} /> : <Visibility className={styles.inputIcon} />}
                      </IconButton>
                    </InputAdornment>
                  ),
                }
              }}
            />

            <Button
              type="submit"
              variant="contained"
              size="large"
              disabled={loading}
              className={styles.loginButton}
              fullWidth
            >
              {loading ? <CircularProgress size={24} /> : 'เข้าสู่ระบบ'}
            </Button>
          </Box>

          <Box sx={{ mt: 2, textAlign: 'center', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <Typography variant="body2" color="textSecondary">
              มีบัญชีแล้ว?
              <Button
                color="primary"
                onClick={() => router.push('/register')}
                sx={{ textTransform: 'none', fontWeight: 'bold' }}
              >
                สมัครสมาชิก
              </Button>
            </Typography>
          </Box>
        </Paper>
      </Box>
    </Container>
  );
}