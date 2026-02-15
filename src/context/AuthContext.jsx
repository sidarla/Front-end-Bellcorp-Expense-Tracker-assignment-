import React, { createContext, useState, useEffect, useContext } from 'react';
import axios from 'axios';

const AuthContext = createContext();
const API_URL = 'https://bellcorp-expense-tracker-assignment-1.onrender.com/api';

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const storedUser = localStorage.getItem('user');
        if (storedUser) {
            setUser(JSON.parse(storedUser));
        }
        setLoading(false);
    }, []);

    const login = async (email, password) => {
        const response = await axios.post(`${API_URL}/auth/login`, { email, password });
        setUser(response.data);
        localStorage.setItem('user', JSON.stringify(response.data));
        return response.data;
    };

    const register = async (username, email, password) => {
        const response = await axios.post(`${API_URL}/auth/register`, { username, email, password });
        setUser(response.data);
        localStorage.setItem('user', JSON.stringify(response.data));
        return response.data;
    };

    const logout = () => {
        setUser(null);
        localStorage.removeItem('user');
    };

    return (
        <AuthContext.Provider value={{ user, loading, login, register, logout }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => useContext(AuthContext);
