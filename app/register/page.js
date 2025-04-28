'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import {
  Box, TextField, Button, Typography, Alert, Paper, Container, CircularProgress, InputAdornment, IconButton,
  Avatar
} from '@mui/material'
import { Visibility, VisibilityOff, Email, Person, Lock, Check, HowToReg } from '@mui/icons-material'
import OTPVerificationDialog from '../../components/OTPVerificationDialog'
import styles from './page.module.css'

export default function RegisterPage() {
  const router = useRouter()

  const [formData, setFormData] = useState({
    email: '', firstName: '', lastName: '', password: ''
  })
  const [showPassword, setShowPassword] = useState(false)
  const [loading, setLoading] = useState(false)
  const [errorMessage, setErrorMessage] = useState('')

  const [showOtpDialog, setShowOtpDialog] = useState(false)
  const [otpVerified, setOtpVerified] = useState(false)
  const [otpSending, setOtpSending] = useState(false)
  const [otpResendCountdown, setOtpResendCountdown] = useState(0)

  useEffect(() => {
    if (otpResendCountdown > 0) {
      const timer = setTimeout(() => setOtpResendCountdown(c => c - 1), 1000)
      return () => clearTimeout(timer)
    }
  }, [otpResendCountdown])

  const isValidEmail = email => /\S+@\S+\.\S+/.test(email)

  const handleChange = e => setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }))

  const handleSendOtp = async () => {
    if (!formData.email) return setErrorMessage('กรุณากรอกอีเมล')
    if (!isValidEmail(formData.email)) return setErrorMessage('รูปแบบอีเมลไม่ถูกต้อง')

    try {
      setErrorMessage('')
      setOtpSending(true)
      const resCheck = await fetch('/api/utils/auth', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email: formData.email })
      })
      const dataCheck = await resCheck.json()

      if (!resCheck.ok) {
        setErrorMessage('เกิดข้อผิดพลาดในการตรวจสอบอีเมล กรุณาลองใหม่')
        return
      }

      if (dataCheck.exists) {
        setErrorMessage('อีเมลนี้ถูกใช้งานแล้ว')
        return
      }

      setShowOtpDialog(true)
      setOtpResendCountdown(60)
    } catch (err) {
      console.error(err)
      setErrorMessage(err.message || 'เกิดข้อผิดพลาด กรุณาลองใหม่')
    } finally {
      setOtpSending(false)
    }
  }

  const handleOtpVerified = () => {
    setOtpVerified(true)
    setShowOtpDialog(false)
  }

  const handleRegister = async () => {
    if (!otpVerified) return setErrorMessage('กรุณายืนยัน OTP ก่อน')
    try {
      setLoading(true)
      const res = await fetch('/api/utils/auth/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      })
      const data = await res.json()
      if (!res.ok) throw new Error(data.error || 'เกิดข้อผิดพลาดในการสมัคร')
      router.push('/login')
    } catch (err) {
      setErrorMessage(err.message)
      setTimeout(() => setErrorMessage(''), 3000)
    } finally {
      setLoading(false)
    }
  }

  const isPasswordValid = formData.password.length >= 8
  const canRegister = otpVerified && formData.email && formData.firstName && formData.lastName && formData.password && isPasswordValid

  return (
    <Container className={styles.registerContainer}>
      <Paper className={styles.registerPaper} elevation={6}>
        <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', mb: 4 }}>
          <Avatar className={styles.avatarIcon}>
            <HowToReg fontSize="large" />
          </Avatar>
          <Typography variant="h4" className={styles.registerTitle}>
            สมัครสมาชิก
          </Typography>
        </Box>

        {errorMessage && (
          <Alert severity="error" className={styles.errorAlert}>
            {errorMessage}
          </Alert>
        )}

        <Box className={styles.formSection}>
          <Box sx={{ display: 'flex', gap: 2, mb: 2 }}>
            <TextField
              fullWidth
              label="อีเมล"
              name="email"
              type="email"
              value={formData.email}
              onChange={handleChange}
              disabled={otpVerified}
              className={styles.emailField}
              variant="outlined"
              InputProps={{
                startAdornment: (<InputAdornment position="start"><Email className={styles.blueIcon} /></InputAdornment>)
              }}
            />
            <Button
              variant={otpVerified ? 'contained' : 'outlined'}
              color={otpVerified ? 'success' : 'primary'}
              onClick={handleSendOtp}
              disabled={otpSending || otpVerified || otpResendCountdown > 0}
              startIcon={otpVerified ? <Check /> : otpSending ? <CircularProgress size={20} /> : null}
              className={styles.otpButton}
              sx={{ minWidth: '180px' }}
            >
              {otpVerified ? 'ยืนยันแล้ว' : otpSending ? 'กำลังส่ง...' : otpResendCountdown > 0 ? `ส่งอีกครั้ง (${otpResendCountdown}s)` : 'ส่ง OTP'}
            </Button>
          </Box>
        </Box>

        <Box className={styles.formSection}>
          <Box className={styles.nameFieldsContainer}>
            <TextField
              fullWidth
              label="ชื่อ"
              name="firstName"
              value={formData.firstName}
              onChange={handleChange}
              disabled={!otpVerified}
              className={styles.nameField}
              variant="outlined"
              InputProps={{
                startAdornment: (<InputAdornment position="start"><Person className={styles.blueIcon} /></InputAdornment>)
              }}
            />
            <TextField
              fullWidth
              label="นามสกุล"
              name="lastName"
              value={formData.lastName}
              onChange={handleChange}
              disabled={!otpVerified}
              className={styles.nameField}
              variant="outlined"
              InputProps={{
                startAdornment: (<InputAdornment position="start"><Person className={styles.blueIcon} /></InputAdornment>)
              }}
            />
          </Box>
          <TextField
            fullWidth
            label="รหัสผ่าน"
            type={showPassword ? 'text' : 'password'}
            name="password"
            value={formData.password}
            onChange={handleChange}
            disabled={!otpVerified}
            sx={{ mb: 1 }}
            variant="outlined"
            error={formData.password && !isPasswordValid}
            helperText={formData.password && !isPasswordValid ? "รหัสผ่านต้องมีความยาวอย่างน้อย 8 ตัวอักษร" : ""}
            InputProps={{
              startAdornment: (<InputAdornment position="start"><Lock className={styles.blueIcon} /></InputAdornment>),
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton onClick={() => setShowPassword(s => !s)} edge="end">
                    {showPassword ? <VisibilityOff /> : <Visibility />}
                  </IconButton>
                </InputAdornment>
              )
            }}
          />

          <Box sx={{ mb: 2 }}></Box>

          <Button
            fullWidth
            variant="contained"
            color="primary"
            size="large"
            onClick={handleRegister}
            disabled={!canRegister || loading}
            className={styles.registerButton}
          >
            {loading && <CircularProgress size={24} sx={{ mr: 1 }} />}
            สมัครสมาชิก
          </Button>

          <Box sx={{ mt: 2, textAlign: 'center' }}>
            <Typography variant="body2" color="textSecondary">
              มีบัญชีแล้ว?
              <Button
                color="primary"
                onClick={() => router.push('/login')}
                sx={{ textTransform: 'none', fontWeight: 'bold' }}
              >
                เข้าสู่ระบบ
              </Button>
            </Typography>
          </Box>
        </Box>
      </Paper>

      <OTPVerificationDialog
        open={showOtpDialog}
        email={formData.email}
        onVerified={handleOtpVerified}
        title="ยืนยันตัวตน"
      />
    </Container>
  );
}