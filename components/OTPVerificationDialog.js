'use client'

import { useState, useEffect, Children } from 'react'
import {
    Dialog,
    DialogTitle,
    DialogContent,
    DialogActions,
    TextField,
    Button,
    Typography,
    CircularProgress,
    Box,
    Paper,
    InputAdornment,
    Divider,
    Fade,
    Tooltip
} from '@mui/material'
import { Email, Timer, Error } from '@mui/icons-material'
import { styled } from '@mui/material/styles'
import { sendOtpEmail } from '../lib/emailjs' // เรียกใช้ฟังก์ชัน sendOtpEmail จาก lib/emailjs.js

// ปรับปรุง styles โดยลดการใช้ className
const StyledDialog = styled(Dialog)(({ theme }) => ({
    '& .MuiPaper-root': {
        borderRadius: 16,
        padding: 8
    }
}))

const StyledDialogTitle = styled(DialogTitle)({
    textAlign: 'center',
    fontSize: 24,
    fontWeight: 600
})

const StyledDialogContent = styled(DialogContent)({
    padding: '16px 24px'
})

const StyledOtpField = styled(TextField)({
    '& input': {
        letterSpacing: 4,
        textAlign: 'center',
        fontSize: 20
    }
})

const StyledErrorPaper = styled(Paper)({
    margin: '16px 0',
    padding: '8px 12px',
    borderRadius: 8,
    backgroundColor: 'rgba(255, 0, 0, 0.08)',
    textAlign: 'center'
})

const StyledDialogActions = styled(DialogActions)({
    padding: '8px 24px 24px',
    justifyContent: 'space-between'
})

const EmailHighlight = styled('span')({
    fontWeight: 600,
    color: '#1976d2'
})

const ActionButton = styled(Button)({
    borderRadius: 8,
    padding: '8px 16px',
    minWidth: 120
})

/**
 * OTPVerificationDialog - Component สำหรับยืนยัน OTP แบบทั่วไป
 */
export default function OTPVerificationDialog({
    open,
    onClose,
    email,
    onVerified,
    title = "ยืนยันตัวตน",
    icon = null,
    otpLength = 6,
    otpExpiry = 300,
    resendDelay = 60,
    maxAttempts = 3,
    children
}) {
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState('')
    const [correctOtp, setCorrectOtp] = useState('')
    const [otpValue, setOtpValue] = useState('')
    const [resendCountdown, setResendCountdown] = useState(0)
    const [expiryTime, setExpiryTime] = useState(0)
    const [otpSent, setOtpSent] = useState(false)
    const [attempts, setAttempts] = useState(0)

    useEffect(() => {
        if (open) {
            setOtpValue('')
            setError('')
            setOtpSent(false)
            setAttempts(0)
        }
    }, [open])

    useEffect(() => {
        if (resendCountdown > 0) {
            const timer = setTimeout(() => setResendCountdown(c => c - 1), 1000)
            return () => clearTimeout(timer)
        }
    }, [resendCountdown])

    useEffect(() => {
        if (expiryTime > 0) {
            const timer = setTimeout(() => setExpiryTime(e => e - 1), 1000)
            return () => clearTimeout(timer)
        } else if (expiryTime === 0 && otpSent) {
            setError('OTP หมดอายุ กรุณาส่งใหม่')
        }
    }, [expiryTime, otpSent])

    const formatTime = seconds => {
        const m = Math.floor(seconds / 60)
        const s = seconds % 60
        return `${m.toString().padStart(2, '0')}:${s.toString().padStart(2, '0')}`
    }

    useEffect(() => {
        if (open && email && !otpSent) {
            handleSendOtp()
        }
    }, [open, email])

    // Send OTP to user email
    const handleSendOtp = async () => {
        setError('')
        setAttempts(0)
        if (!email) {
            setError('ไม่พบอีเมลผู้ใช้')
            return
        }

        try {
            setLoading(true)
            const maxVal = Math.pow(10, otpLength) - 1
            const minVal = Math.pow(10, otpLength - 1)
            const generated = Math.floor(minVal + Math.random() * (maxVal - minVal + 1)).toString()

            setCorrectOtp(generated)

            await sendOtpEmail(email, generated)

            setOtpSent(true)
            setResendCountdown(resendDelay)
            setExpiryTime(otpExpiry)
        } catch (err) {
            console.error('Error sending OTP:', err)
            setError('ส่ง OTP ไม่สำเร็จ')
        } finally {
            setLoading(false)
        }
    }

    const handleOtpChange = (e) => {
        const value = e.target.value.replace(/[^0-9]/g, '').slice(0, otpLength)
        setOtpValue(value)
    }

    const verifyOtp = (value = otpValue) => {
        if (value === correctOtp && expiryTime > 0) {
            setError('')
            if (typeof onVerified === 'function') {
                // Don't close the dialog here - let the parent component control that
                onVerified()
            }
        } else if (expiryTime <= 0) {
            setError('รหัส OTP หมดอายุ กรุณาส่งใหม่')
        } else {
            const newAttempts = attempts + 1
            setAttempts(newAttempts)

            if (newAttempts >= maxAttempts) {
                setError(`ยืนยันผิด ${maxAttempts} ครั้ง กรุณาส่ง OTP ใหม่`)
            } else {
                setError(`รหัส OTP ไม่ถูกต้อง (ผิด ${newAttempts}/${maxAttempts} ครั้ง)`)
            }
        }
    }

    // Verify OTP button handler
    const handleVerifyOtp = () => {
        verifyOtp()
    }

    // Calculate remaining attempts
    const remainingAttempts = maxAttempts - attempts

    return (
        <StyledDialog
            open={open}
            onClose={loading ? undefined : onClose}
            fullWidth
            maxWidth="xs"
            transition={Fade}
            transitionDuration={400}
        >
            <StyledDialogTitle>
                <Box display="flex" alignItems="center" justifyContent="center" gap={1}>
                    {icon}
                    {title}
                </Box>
            </StyledDialogTitle>
            <Divider />
            <StyledDialogContent>
                <Box sx={{ mb: 3, textAlign: 'center' }}>
                    {email ? (
                        <Typography variant="body1">
                            ส่งรหัส OTP ไปที่ <EmailHighlight>{email}</EmailHighlight>
                        </Typography>
                    ) : (
                        <Typography variant="body1" color="error">
                            ไม่พบอีเมลผู้ใช้
                        </Typography>
                    )}
                </Box>

                <StyledOtpField
                    autoFocus
                    margin="dense"
                    label="รหัส OTP"
                    fullWidth
                    value={otpValue}
                    onChange={handleOtpChange}
                    placeholder={Array(otpLength).fill('0').join('')}
                    InputProps={{
                        startAdornment: (
                            <InputAdornment position="start">
                                <Email color="action" />
                            </InputAdornment>
                        ),
                    }}
                    disabled={attempts >= maxAttempts}
                />

                {expiryTime > 0 && (
                    <Typography color="primary" sx={{ fontWeight: 500, mt: 1, display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 1 }}>
                        <Timer fontSize="small" /> OTP จะหมดอายุภายใน {formatTime(expiryTime)}
                    </Typography>
                )}

                {error && (
                    <StyledErrorPaper elevation={0}>
                        <Typography color="error" variant="body2">{error}</Typography>
                    </StyledErrorPaper>
                )}
                {children}
            </StyledDialogContent>
            <StyledDialogActions>
                <ActionButton
                    onClick={handleSendOtp}
                    disabled={loading || resendCountdown > 0}
                    variant="outlined"
                    color="secondary"
                >
                    {loading ? (
                        <CircularProgress size={20} />
                    ) : resendCountdown > 0 ? (
                        `ส่งอีกครั้ง (${resendCountdown}s)`
                    ) : (
                        'ส่ง OTP อีกครั้ง'
                    )}
                </ActionButton>

                <Tooltip
                    title={attempts >= maxAttempts ? `คุณยืนยันผิดครบ ${maxAttempts} ครั้งแล้ว กรุณาส่ง OTP ใหม่` : ''}
                    open={attempts >= maxAttempts}
                    placement="top"
                >
                    <span>
                        <ActionButton
                            variant="contained"
                            onClick={handleVerifyOtp}
                            disabled={loading || otpValue.length !== otpLength || attempts >= maxAttempts}
                            color="primary"
                            startIcon={attempts > 0 && attempts < maxAttempts ? <Error sx={{ fontSize: 16, mr: 0.5 }} /> : null}
                        >
                            {loading ? (
                                <CircularProgress size={20} />
                            ) : attempts > 0 && attempts < maxAttempts ? (
                                `ยืนยัน (เหลือ ${remainingAttempts} ครั้ง)`
                            ) : attempts >= maxAttempts ? (
                                'ยืนยันผิดเกินที่กำหนด'
                            ) : (
                                'ยืนยัน OTP'
                            )}
                        </ActionButton>
                    </span>
                </Tooltip>
            </StyledDialogActions>
        </StyledDialog>
    );
}