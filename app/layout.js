'use client'

import NextLink from 'next/link'
import Image from 'next/image'
import {
  AppBar,
  Toolbar,
  Typography,
  Button,
  Box,
  CssBaseline,
  Container,
  CircularProgress,
} from '@mui/material'
import { ThemeProvider, createTheme } from '@mui/material/styles'
import AccountBoxTwoToneIcon from '@mui/icons-material/AccountBoxTwoTone'
import HomeTwoToneIcon from '@mui/icons-material/HomeTwoTone'
import logo from '../public/logo.png'
import Link from 'next/link'
import MuiLink from '@mui/material/Link'
import { AuthProvider, useAuth } from '@/context/AuthContext'
import styles from './layout.module.css'

const theme = createTheme({
  palette: {
    primary: { main: '#6F4F37', light: '#9E7C53', dark: '#4C372B', contrastText: '#ffffff' },
    secondary: { main: '#FFFAF0', light: '#FFFFFF', dark: '#D3D3D3' },
    background: { default: '#FFFAF0', paper: '#FFFFFF' },
    error: { main: '#FF3D57' }
  },
  typography: {
    fontFamily: '"Prompt", "Kanit", "Sarabun", "Roboto", "Helvetica", "Arial", sans-serif',
    h6: {
      fontWeight: 500,
      letterSpacing: '0.0075em'
    },
    caption: {
      fontWeight: 400
    },
    button: {
      fontWeight: 500
    }
  },
  shape: { borderRadius: 8 },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          textTransform: 'none',
          fontWeight: 500,
          transition: 'all 0.2s ease',
          '&:hover': {
            transform: 'translateY(-2px)',
            boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)'
          }
        }
      }
    },
    MuiAppBar: {
      styleOverrides: {
        root: {
          boxShadow: '0 4px 20px rgba(0, 0, 0, 0.1)',
          transition: 'all 0.3s ease'
        }
      }
    },
    MuiContainer: {
      styleOverrides: {
        root: {
          padding: '1.5rem',
          borderRadius: '12px',
          transition: 'all 0.3s ease'
        }
      }
    },
    MuiCard: {
      styleOverrides: {
        root: {
          boxShadow: '0 8px 30px rgba(0, 0, 0, 0.06)',
          transition: 'transform 0.3s ease, box-shadow 0.3s ease',
          '&:hover': {
            transform: 'translateY(-5px)',
            boxShadow: '0 12px 40px rgba(0, 0, 0, 0.1)'
          }
        }
      }
    },
    MuiLink: {
      styleOverrides: {
        root: {
          transition: 'all 0.2s ease',
          position: 'relative',
          '&:hover': {
            textDecoration: 'none',
            '&::after': {
              width: '100%'
            }
          },
          '&::after': {
            content: '""',
            position: 'absolute',
            bottom: '-2px',
            left: 0,
            width: 0,
            height: '2px',
            backgroundColor: 'currentColor',
            transition: 'width 0.3s ease'
          }
        }
      }
    }
  }
});

export default function RootLayout({ children }) {
  return (
    <AuthProvider>
      <RootLayoutWithAuth>{children}</RootLayoutWithAuth>
    </AuthProvider>
  );
}

function RootLayoutWithAuth({ children }) {
  const { user, loading } = useAuth();

  return (
    <html lang="th">
      <head>
        <link
          href="https://fonts.googleapis.com/css2?family=Prompt:wght@300;400;500;600;700&family=Kanit:wght@300;400;500;600&family=Sarabun:wght@300;400;500;600;700&display=swap"
          rel="stylesheet"
        />
        <link
          rel="stylesheet"
          href="https://fonts.googleapis.com/css2?family=Material+Symbols+Rounded:opsz,wght,FILL,GRAD@20..48,100..700,0..1,-50..200"
        />
      </head>
      <body>
        <ThemeProvider theme={theme}>
          <CssBaseline />

          <AppBar
            position="sticky"
            className={styles.headerAppBar}
          >
            <Toolbar className={styles.toolbar}>
              <Box className={styles.appLogo}>
                <Link href="/">
                  <Image src={logo} alt="Logo" width={200} height={200} priority />
                </Link>
              </Box>

              <Box className={styles.centerLink}>
                {loading ? (
                  <CircularProgress size={36} color="secondary" />
                ) : user ? (
                  <Box className={styles.welcomeText}>
                    <Typography variant="h6">
                      ยินดีต้อนรับ {user.first_name} {user.last_name}
                    </Typography>
                  </Box>
                ) : (
                  <Box sx={{ display: 'flex', alignItems: 'center' }}>
                    <MuiLink
                      component={NextLink}
                      href="/login"
                      sx={{
                        color: '#FFFFFF',
                        fontWeight: 500,
                        textDecoration: 'none',
                        position: 'relative',
                        padding: '4px 8px',
                        '&:hover': {
                          backgroundColor: 'rgba(255, 255, 255, 0.1)',
                        }
                      }}
                    >
                      <Typography
                        variant="body1"
                        component="span"
                        sx={{ fontSize: '25px' }}
                      >
                        เข้าสู่ระบบหรือลงทะเบียน
                      </Typography>
                    </MuiLink>
                  </Box>
                )}
              </Box>

              <Box className={styles.navButtons}>
                <Button
                  color="inherit"
                  component={NextLink}
                  href="/"
                  className={styles.profileBtn}
                >
                  <HomeTwoToneIcon sx={{ fontSize: '40px' }} />
                  <Typography variant="caption" sx={{ mt: 0.5, fontSize: '14px' }}>หน้าหลัก</Typography>
                </Button>
                <Button
                  color="inherit"
                  component={NextLink}
                  href="/profile"
                  className={styles.profileBtn}
                >
                  <AccountBoxTwoToneIcon sx={{ fontSize: '40px' }} />
                  <Typography variant="caption" sx={{ mt: 0.5, fontSize: '14px' }}>โปรไฟล์</Typography>
                </Button>
              </Box>
            </Toolbar>
          </AppBar>

          <Box
            component="main"
            className={styles.mainContent}
          >
            {children}
          </Box>

          <Box className={styles.footer}>
            <Container maxWidth="lg">
              <Typography variant="body2" align="center">
                © 2025 Pet Hotel
              </Typography>
            </Container>
          </Box>
        </ThemeProvider>
      </body>
    </html>
  );
}