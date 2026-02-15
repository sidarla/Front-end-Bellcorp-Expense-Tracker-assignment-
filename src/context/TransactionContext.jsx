import React, { createContext, useState, useContext } from 'react';
import axios from 'axios';
import { useAuth } from './AuthContext';

const TransactionContext = createContext();
const API_URL = 'https://bellcorp-expense-tracker-assignment-1.onrender.com/api';

export const TransactionProvider = ({ children }) => {
    const [transactions, setTransactions] = useState([]);
    const [stats, setStats] = useState(null);
    const [loading, setLoading] = useState(false);
    const { user } = useAuth();

    const config = {
        headers: {
            Authorization: `Bearer ${user?.token}`
        }
    };

    const fetchTransactions = async (params = {}) => {
        setLoading(true);
        try {
            const response = await axios.get(`${API_URL}/transactions`, {
                ...config,
                params
            });
            setTransactions(response.data.transactions);
            return response.data;
        } catch (error) {
            console.error('Error fetching transactions', error);
        } finally {
            setLoading(false);
        }
    };

    const fetchStats = async () => {
        try {
            const response = await axios.get(`${API_URL}/transactions/stats`, config);
            setStats(response.data);
        } catch (error) {
            console.error('Error fetching stats', error);
        }
    };

    const addTransaction = async (data) => {
        const response = await axios.post(`${API_URL}/transactions`, data, config);
        setTransactions([response.data, ...transactions]);
        fetchStats();
        return response.data;
    };

    const updateTransaction = async (id, data) => {
        const response = await axios.put(`${API_URL}/transactions/${id}`, data, config);
        setTransactions(transactions.map(t => t._id === id ? response.data : t));
        fetchStats();
        return response.data;
    };

    const deleteTransaction = async (id) => {
        await axios.delete(`${API_URL}/transactions/${id}`, config);
        setTransactions(transactions.filter(t => t._id !== id));
        fetchStats();
    };

    return (
        <TransactionContext.Provider value={{
            transactions,
            stats,
            loading,
            fetchTransactions,
            fetchStats,
            addTransaction,
            updateTransaction,
            deleteTransaction
        }}>
            {children}
        </TransactionContext.Provider>
    );
};

export const useTransactions = () => useContext(TransactionContext);
