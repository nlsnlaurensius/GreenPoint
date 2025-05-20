// src/contexts/AuthContext.jsx
import React, { createContext, useState, useContext, useEffect } from 'react';
import api from '../api';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [user, setUserState] = useState(null);
    const [token, setToken] = useState(null);
    const [role, setRole] = useState(null);
    const [loading, setLoading] = useState(true);

    const setUser = (userData) => {
        setUserState(userData);
        if (userData) {
            localStorage.setItem('user', JSON.stringify(userData));
            setRole(userData.role);
        } else {
             localStorage.removeItem('user');
             setRole(null);
        }
    };

    useEffect(() => {
        const storedToken = localStorage.getItem('token');
        const storedUser = localStorage.getItem('user');

        if (storedToken && storedUser) {
            try {
                const userData = JSON.parse(storedUser);
                setToken(storedToken);
                setUserState(userData);
                setRole(userData.role);
                setIsAuthenticated(true);
            } catch (error) {
                localStorage.removeItem('token');
                localStorage.removeItem('user');
                setIsAuthenticated(false);
                setUserState(null);
                setToken(null);
                setRole(null);
            }
        }
        setLoading(false);
    }, []);

    const login = async (email, password) => {
        try {
            const response = await api.post('/auth/login', { email, password });

            if (response.data && response.data.success && response.data.payload) {
                const { token, user: userData } = response.data.payload;

                localStorage.setItem('token', token);
                localStorage.setItem('user', JSON.stringify(userData));

                setToken(token);
                setUserState(userData);
                setRole(userData.role);
                setIsAuthenticated(true);

                return { success: true, role: userData.role, user: userData };
            } else {
                console.error('Login failed: Invalid response format', response.data);
                 return { success: false, message: 'Invalid response from server.' };
            }

        } catch (error) {
            console.error('Login failed:', error.response?.data?.message || error.message);
            const errorMessage = error.response?.data?.message || 'An error occurred during login';

            setIsAuthenticated(false);
            setUserState(null);
            setToken(null);
            setRole(null);

            return { success: false, message: errorMessage };
        }
    };

    const logout = () => {
        localStorage.removeItem('token');
        localStorage.removeItem('user');

        setIsAuthenticated(false);
        setUserState(null);
        setToken(null);
        setRole(null);
    };

    if (loading) {
        return <div>Loading authentication...</div>;
    }

    return (
        <AuthContext.Provider value={{ isAuthenticated, user, token, role, login, logout, setUser }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => useContext(AuthContext);