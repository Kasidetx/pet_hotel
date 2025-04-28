'use client'

import { useState } from 'react'
import {
    Box, Typography, TextField, Button, Alert, DialogActions,
    CircularProgress, Divider
} from '@mui/material'
import {
    Visibility as VisibilityIcon,
    VisibilityOff as VisibilityOffIcon
} from '@mui/icons-material'

export default function PasswordChangeForm({ email, onClose, onSuccess }) {
    const [formData, setFormData] = useState({
        newPassword: '',
        confirmPassword: ''
    })
    const [states, setStates] = useState({
        error: '',
        loading: false,
        success: false,
        showPassword: false
    })

    const updateState = (newState) => setStates(prev => ({ ...prev, ...newState }))
    const updateForm = (field, value) => setFormData(prev => ({ ...prev, [field]: value }))

    const togglePasswordVisibility = () => {
        updateState({ showPassword: !states.showPassword })
    }

    const handleChangePassword = async () => {
        const { newPassword, confirmPassword } = formData

        // ตรวจสอบความถูกต้องของรหัสผ่าน
        if (!newPassword) {
            updateState({ error: 'กรุณากรอกรหัสผ่านใหม่' })
            return
        }

        if (newPassword.length < 8) {
            updateState({ error: 'รหัสผ่านต้องมีอย่างน้อย 8 ตัวอักษร' })
            return
        }

        if (newPassword !== confirmPassword) {
            updateState({ error: 'รหัสผ่านไม่ตรงกัน' })
            return
        }

        updateState({ loading: true, error: '' })

        try {
            const token = localStorage.getItem('authToken')
            const res = await fetch('/api/utils/profile', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                },
                body: JSON.stringify({ newPassword })
            })

            const data = await res.json()

            if (!res.ok) {
                throw new Error(data.error || 'เปลี่ยนรหัสผ่านไม่สำเร็จ')
            }

            updateState({ success: true, error: '' })

            // Reset form
            updateForm('newPassword', '')
            updateForm('confirmPassword', '')

            // แจ้ง parent component เมื่อเปลี่ยนรหัสผ่านสำเร็จ
            if (typeof onSuccess === 'function') {
                setTimeout(() => {
                    onSuccess()
                }, 2000)
            }

        } catch (err) {
            updateState({ error: err.message })
        } finally {
            updateState({ loading: false })
        }
    }

    const { newPassword, confirmPassword } = formData
    const { error, loading, success, showPassword } = states

    if (success) {
        return (
            <Box sx={{ mt: 2 }}>
                <Alert severity="success" sx={{ mb: 2 }}>
                    เปลี่ยนรหัสผ่านสำเร็จ! กำลังปิดหน้าต่างนี้...
                </Alert>
            </Box>
        )
    }

    return (
        <Box sx={{ mt: 2 }}>
            <Divider sx={{ mb: 2 }} />
            <Typography variant="h6" gutterBottom sx={{ textAlign: 'center' }}>
                เปลี่ยนรหัสผ่านใหม่
            </Typography>

            <TextField
                margin="dense"
                label="รหัสผ่านใหม่"
                type={showPassword ? 'text' : 'password'}
                fullWidth
                value={newPassword}
                onChange={(e) => updateForm('newPassword', e.target.value)}
                InputProps={{
                    endAdornment: (
                        <Button
                            onClick={togglePasswordVisibility}
                            sx={{ minWidth: 'auto' }}
                        >
                            {showPassword ? <VisibilityOffIcon /> : <VisibilityIcon />}
                        </Button>
                    ),
                }}
                sx={{ mb: 2 }}
            />

            <TextField
                margin="dense"
                label="ยืนยันรหัสผ่านใหม่"
                type={showPassword ? 'text' : 'password'}
                fullWidth
                value={confirmPassword}
                onChange={(e) => updateForm('confirmPassword', e.target.value)}
                sx={{ mb: 2 }}
            />

            {error && (
                <Alert severity="error" sx={{ mb: 2 }}>
                    {error}
                </Alert>
            )}

            <DialogActions>
                <Button
                    onClick={onClose}
                    color="inherit"
                >
                    ยกเลิก
                </Button>
                <Button
                    onClick={handleChangePassword}
                    variant="contained"
                    color="primary"
                    disabled={loading}
                >
                    {loading ? (
                        <>
                            <CircularProgress size={20} sx={{ mr: 1 }} />
                            กำลังบันทึก...
                        </>
                    ) : 'บันทึกรหัสผ่านใหม่'}
                </Button>
            </DialogActions>
        </Box>
    )
}