'use client'

import { useState, useEffect } from 'react'
import { useAuth } from '@/context/AuthContext'
import { redirect } from 'next/navigation'
import {
    CircularProgress, Typography, Box, Container, TextField, Button,
    Card, CardContent, Grid, Fade, Alert, Dialog, DialogActions, DialogContent, DialogTitle,
    Divider, Accordion, AccordionSummary, AccordionDetails, Chip
} from '@mui/material'
import {
    Logout as LogoutIcon, Edit as EditIcon, Save as SaveIcon,
    Cancel as CancelIcon, Lock as LockIcon, Email as EmailIcon,
    CalendarToday as CalendarTodayIcon, Person as PersonIcon,
    ExpandMore as ExpandMoreIcon, Pets as PetsIcon, History as HistoryIcon
} from '@mui/icons-material'
import OTPVerificationDialog from '@/components/OTPVerificationDialog'
import PasswordChangeForm from '@/components/PasswordChangeForm'
import styles from './page.module.css'


export default function ProfilePage() {
    const { user, loading } = useAuth()
    const [formData, setFormData] = useState({ firstName: '', lastName: '' })
    const [states, setStates] = useState({
        editing: false,
        saving: false,
        error: '',
        otpDialogOpen: false,         // Renamed from dialogOpen for clarity
        passwordDialogOpen: false,     // New separate state for password dialog
        otpVerified: false,
        showPasswordForm: false,
        changingPassword: false,
        passwordChangeSuccess: false
    })
    const [bookingHistory, setBookingHistory] = useState([])
    const [loadingBookings, setLoadingBookings] = useState(false)

    const updateState = (newState) => setStates(prev => ({ ...prev, ...newState }))
    const updateForm = (field, value) => setFormData(prev => ({ ...prev, [field]: value }))

    const handleLogout = async () => {
        localStorage.removeItem('authToken');
        window.location.href = '/login';
    };

    // Updated to open only OTP dialog
    const openDialog = () => {
        updateState({
            otpDialogOpen: true,
            passwordDialogOpen: false,
            otpVerified: false,
            showPasswordForm: false,
            error: '',
            passwordChangeSuccess: false
        })
    }

    // Close OTP dialog after verification and open password dialog
    const handleOtpVerified = () => {
        // First close the OTP dialog
        updateState({
            otpDialogOpen: false,
            otpVerified: true
        });

        // Then open password dialog with a slight delay for better UX
        setTimeout(() => {
            updateState({
                passwordDialogOpen: true,
                showPasswordForm: true
            });
        }, 300);
    }

    const handlePasswordChangeSuccess = () => {
        updateState({
            passwordChangeSuccess: true
        });

        // Close the password dialog after showing success message
        setTimeout(() => {
            updateState({
                passwordDialogOpen: false,
                showPasswordForm: false,
                passwordChangeSuccess: false
            });
        }, 3000);
    }

    const fetchBookingHistory = async () => {
        if (!user) return;

        setLoadingBookings(true);
        try {
            const token = localStorage.getItem('authToken');
            const response = await fetch('/api/utils/history', {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            });

            const data = await response.json();

            if (!response.ok) {
                throw new Error(data.error || 'ไม่สามารถดึงข้อมูลประวัติการจองได้');
            }

            setBookingHistory(data.bookings);
        } catch (error) {
            console.error('Error fetching booking history:', error);
        } finally {
            setLoadingBookings(false);
        }
    };

    useEffect(() => {
        if (user) {
            updateForm('firstName', user.first_name)
            updateForm('lastName', user.last_name)
            fetchBookingHistory();
        }
    }, [user])

    if (loading) {
        return (
            <Box className={styles.loadingContainer}>
                <CircularProgress size={60} thickness={4} >
                    <Typography sx={{ mt: 2 }} variant="body1">กำลังโหลดข้อมูล...</Typography>
                </CircularProgress>
            </Box>
        )
    }

    if (!user) {
        redirect('/login')
    }

    const handleSave = async () => {
        updateState({ saving: true, error: '' })
        try {
            const token = localStorage.getItem('authToken');

            const res = await fetch('/api/utils/profile', {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                },
                body: JSON.stringify({
                    firstName: formData.firstName,
                    lastName: formData.lastName
                })
            })
            const data = await res.json()
            if (!res.ok || !data.success) {
                throw new Error(data.error || 'บันทึกไม่สำเร็จ')
            }
            updateState({ editing: false })
            window.location.href = '/profile'
        } catch (err) {
            updateState({ error: err.message })
        } finally {
            updateState({ saving: false })
        }
    }

    const getInitials = () => {
        return `${formData.firstName.charAt(0)}${formData.lastName.charAt(0)}`.toUpperCase()
    }

    const formatThaiDate = (dateString) => {
        return new Date(dateString).toLocaleDateString('th-TH', {
            day: 'numeric',
            month: 'long',
            year: 'numeric'
        })
    }

    const getStatusLabel = (status) => {
        const statusMap = {
            'confirmed': 'ยืนยันแล้ว',
            'cancelled': 'ยกเลิกแล้ว',
            'completed': 'เสร็จสิ้น',
            'pending': 'รอการยืนยัน'
        };
        return statusMap[status] || status;
    }

    const getStatusColor = (status) => {
        const colorMap = {
            'confirmed': 'success',
            'cancelled': 'error',
            'completed': 'info',
            'pending': 'warning'
        };
        return colorMap[status] || 'default';
    }

    const { firstName, lastName } = formData;
    const { editing, saving, error, otpDialogOpen, passwordDialogOpen, showPasswordForm, passwordChangeSuccess } = states;

    return (
        <Container className={styles.container} maxWidth="md">
            <Fade in={true} timeout={800}>
                <Card className={styles.card}>
                    <Box className={styles.headerSection}>
                        <Typography variant="h4" gutterBottom className={styles.title}>โปรไฟล์ของคุณ</Typography>

                        {!editing && (
                            <Button
                                variant="outlined"
                                startIcon={<EditIcon />}
                                onClick={() => updateState({ editing: true })}
                                className={`${styles.editButton} ${styles.whiteButton}`}
                            >
                                แก้ไข
                            </Button>
                        )}

                        <div className={styles.avatar}>
                            {getInitials()}
                        </div>
                    </Box>

                    <CardContent className={styles.contentSection}>
                        {editing ? (
                            <Box sx={{ mb: 4 }}>
                                <Typography variant="h6" gutterBottom color="primary">แก้ไขข้อมูลส่วนตัว</Typography>

                                <div className={styles.editContainer}>
                                    <div className={styles.fieldLabel}>
                                        <PersonIcon />
                                        <Typography>ชื่อ:</Typography>
                                    </div>
                                    <TextField
                                        value={firstName}
                                        onChange={e => updateForm('firstName', e.target.value)}
                                        variant="outlined"
                                        size="small"
                                        fullWidth
                                        className={styles.textField}
                                        placeholder="กรอกชื่อของคุณ"
                                    />
                                </div>

                                <div className={styles.editContainer}>
                                    <div className={styles.fieldLabel}>
                                        <PersonIcon />
                                        <Typography>นามสกุล:</Typography>
                                    </div>
                                    <TextField
                                        value={lastName}
                                        onChange={e => updateForm('lastName', e.target.value)}
                                        variant="outlined"
                                        size="small"
                                        fullWidth
                                        className={styles.textField}
                                        placeholder="กรอกนามสกุลของคุณ"
                                    />
                                </div>

                                {error && (
                                    <Typography className={styles.errorText}>
                                        {error}
                                    </Typography>
                                )}

                                <div className={styles.actionButtons}>
                                    <Button
                                        variant="outlined"
                                        startIcon={<CancelIcon />}
                                        onClick={() => updateState({ editing: false })}
                                        className={styles.button}
                                    >
                                        ยกเลิก
                                    </Button>
                                    <Button
                                        variant="contained"
                                        startIcon={<SaveIcon />}
                                        onClick={handleSave}
                                        disabled={saving}
                                        className={styles.button}
                                    >
                                        {saving ? 'กำลังบันทึก...' : 'บันทึก'}
                                    </Button>
                                </div>
                            </Box>
                        ) : (
                            <Grid container spacing={3}>
                                {[{ icon: <PersonIcon />, label: 'ชื่อ-นามสกุล', value: `${firstName} ${lastName}` },
                                { icon: <EmailIcon />, label: 'อีเมล', value: user.email },
                                { icon: <CalendarTodayIcon />, label: 'วันที่สมัคร', value: formatThaiDate(user.created_at) }].map((item, index) => (
                                    <Grid item xs={12} key={index}>
                                        <div className={styles.infoRow}>
                                            {item.icon}
                                            <div className={styles.infoBox}>
                                                <Typography variant="body2" className={styles.infoLabel}>{item.label}</Typography>
                                                <Typography variant="h6" className={styles.infoValue}>{item.value}</Typography>
                                            </div>
                                        </div>
                                    </Grid>
                                ))}
                            </Grid>
                        )}

                        <div className={styles.buttonsContainer}>
                            <Button
                                variant="outlined"
                                color="primary"
                                startIcon={<LockIcon />}
                                onClick={openDialog}
                                className={styles.button}
                            >
                                เปลี่ยนรหัสผ่าน
                            </Button>

                            <Button
                                variant="contained"
                                color="error"
                                startIcon={<LogoutIcon />}
                                onClick={handleLogout}
                                className={styles.button}
                            >
                                ออกจากระบบ
                            </Button>
                        </div>

                        <Box sx={{ mt: 4 }}>
                            <Divider sx={{ mb: 2 }} />
                            <Typography variant="h6" gutterBottom sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                                <HistoryIcon sx={{ mr: 1 }} />
                                ประวัติการจองห้องพัก
                            </Typography>

                            {loadingBookings ? (
                                <Box sx={{ display: 'flex', justifyContent: 'center', my: 4 }}>
                                    <CircularProgress size={40} />
                                </Box>
                            ) : bookingHistory.length === 0 ? (
                                <Box sx={{ textAlign: 'center', py: 3, bgcolor: '#f8f9fa', borderRadius: 2 }}>
                                    <PetsIcon sx={{ fontSize: 60, color: '#ccc', mb: 1 }} />
                                    <Typography variant="body1" color="text.secondary">
                                        คุณยังไม่มีประวัติการจองห้องพัก
                                    </Typography>
                                    <Button
                                        variant="outlined"
                                        color="primary"
                                        sx={{ mt: 2 }}
                                        href="/booking"
                                    >
                                        จองห้องพักเลย
                                    </Button>
                                </Box>
                            ) : (
                                <Box>
                                    {bookingHistory.map((booking, index) => (
                                        <Accordion key={booking.id || index} sx={{ mb: 2, borderRadius: '8px', overflow: 'hidden' }}>
                                            <AccordionSummary
                                                expandIcon={<ExpandMoreIcon />}
                                                sx={{ bgcolor: '#f5f5f5' }}
                                            >
                                                <Grid container alignItems="center" spacing={1}>
                                                    <Grid item xs={8} sm={6}>
                                                        <Typography fontWeight="medium">{booking.title}</Typography>
                                                        <Typography variant="body2" color="text.secondary">
                                                            {booking.booking_reference || `การจองที่ ${index + 1}`}
                                                        </Typography>
                                                    </Grid>
                                                    <Grid item xs={4} sm={3} sx={{ textAlign: { xs: 'right', sm: 'center' } }}>
                                                        <Chip
                                                            label={getStatusLabel(booking.status)}
                                                            color={getStatusColor(booking.status)}
                                                            size="small"
                                                        />
                                                    </Grid>
                                                    <Grid item xs={12} sm={3} sx={{ textAlign: { xs: 'left', sm: 'right' } }}>
                                                        <Typography variant="body2" sx={{ fontWeight: 'bold' }}>
                                                            ฿{(booking.grand_total || booking.price_per_night).toLocaleString()}
                                                        </Typography>
                                                    </Grid>
                                                </Grid>
                                            </AccordionSummary>
                                            <AccordionDetails>
                                                <Grid container spacing={2}>
                                                    <Grid item xs={12} sm={6}>
                                                        <Typography variant="body2" color="text.secondary">เช็คอิน</Typography>
                                                        <Typography variant="body1">{formatThaiDate(booking.check_in_date)}</Typography>
                                                    </Grid>
                                                    <Grid item xs={12} sm={6}>
                                                        <Typography variant="body2" color="text.secondary">เช็คเอาท์</Typography>
                                                        <Typography variant="body1">{formatThaiDate(booking.check_out_date)}</Typography>
                                                    </Grid>
                                                    <Grid item xs={12} sm={6}>
                                                        <Typography variant="body2" color="text.secondary">จำนวนคืน</Typography>
                                                        <Typography variant="body1">{booking.nights || 1} คืน</Typography>
                                                    </Grid>
                                                    <Grid item xs={12} sm={6}>
                                                        <Typography variant="body2" color="text.secondary">ราคาต่อคืน</Typography>
                                                        <Typography variant="body1">฿{booking.price_per_night?.toLocaleString() || 'ไม่ระบุ'}</Typography>
                                                    </Grid>
                                                    <Grid item xs={12}>
                                                        <Divider sx={{ my: 1 }} />
                                                        <Grid container justifyContent="space-between">
                                                            <Typography variant="body2" color="text.secondary">วันที่จอง</Typography>
                                                            <Typography variant="body2">{formatThaiDate(booking.created_at)}</Typography>
                                                        </Grid>
                                                        <Grid container justifyContent="space-between">
                                                            <Typography variant="body1" fontWeight="bold" sx={{ mt: 1 }}>ยอดรวมทั้งสิ้น </Typography>
                                                            <Typography variant="body1" fontWeight="bold" sx={{ mt: 1 }}>
                                                                : {booking.grand_total?.toLocaleString() || (booking.price_per_night * (booking.nights || 1)).toLocaleString()}฿
                                                            </Typography>
                                                        </Grid>
                                                    </Grid>
                                                </Grid>
                                            </AccordionDetails>
                                        </Accordion>
                                    ))}
                                </Box>
                            )}
                        </Box>
                    </CardContent>
                </Card>
            </Fade>

            <OTPVerificationDialog
                open={otpDialogOpen}
                onClose={() => updateState({ otpDialogOpen: false })}
                email={user?.email}
                onVerified={handleOtpVerified}
            />

            <Dialog
                open={passwordDialogOpen}
                onClose={() => updateState({ passwordDialogOpen: false })}
                fullWidth
                maxWidth="xs"
            >
                <Divider />
                <DialogContent>
                    {passwordChangeSuccess && (
                        <Alert severity="success" sx={{ mb: 2 }}>
                            เปลี่ยนรหัสผ่านสำเร็จ!
                        </Alert>
                    )}
                    {showPasswordForm && (
                        <PasswordChangeForm
                            email={user?.email}
                            onClose={() => updateState({
                                passwordDialogOpen: false,
                                showPasswordForm: false
                            })}
                            onSuccess={handlePasswordChangeSuccess}
                        />
                    )}
                </DialogContent>
                {!passwordChangeSuccess && (
                    <DialogActions sx={{ px: 3, pb: 3 }}>
                        <Button
                            onClick={() => updateState({
                                passwordDialogOpen: false,
                                showPasswordForm: false
                            })}
                            variant="outlined"
                            color="secondary"
                        >
                            ยกเลิก
                        </Button>
                    </DialogActions>
                )}
            </Dialog>
        </Container>
    )
}