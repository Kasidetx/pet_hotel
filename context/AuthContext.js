'use client'

import React, { createContext, useState, useContext, useEffect } from 'react';
import { Snackbar, Alert } from '@mui/material';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);
    const [snackbar, setSnackbar] = useState({
        open: false,
        message: '',
        severity: 'info'
    });

    const handleCloseSnackbar = () => setSnackbar(prev => ({ ...prev, open: false }));

    const showSnackbar = (message, severity = 'info') => {
        setSnackbar({ open: true, message, severity });
    };

    useEffect(() => {
        const checkAuth = async () => {
            try {
                setLoading(true);
                const token = localStorage.getItem('authToken'); // Get token from localStorage
                if (!token) {
                    setUser(null);
                    return;
                }

                const res = await fetch('/api/utils/auth', {
                    method: 'GET',
                    headers: { Authorization: `Bearer ${token}` }, // Pass token in Authorization header
                });

                const data = await res.json();
                if (res.ok) {
                    setUser(data.user);
                } else {
                    setUser(null);
                }
            } catch (error) {
                console.error('Error:', error);
            } finally {
                setLoading(false);
            }
        };
        checkAuth();
    }, []);

    return (
        <AuthContext.Provider value={{ user, loading }}>
            {children}
            <Snackbar
                open={snackbar.open}
                autoHideDuration={6000}
                onClose={handleCloseSnackbar}
                anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
            >
                <Alert
                    onClose={handleCloseSnackbar}
                    severity={snackbar.severity}
                    sx={{ width: '100%' }}
                >
                    {snackbar.message}
                </Alert>
            </Snackbar>
        </AuthContext.Provider>
    );
};

export const useAuth = () => useContext(AuthContext);