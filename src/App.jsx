import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider, useAuth } from './context/AuthContext';
import { TransactionProvider } from './context/TransactionContext';
import Login from './pages/Login';
import Register from './pages/Register';
import Dashboard from './pages/Dashboard';
import Explorer from './pages/Explorer';
import Sidebar from './components/common/Sidebar';

const ProtectedRoute = ({ children }) => {
  const { user, loading } = useAuth();

  if (loading) return (
    <div className="flex-center" style={{ height: '100vh' }}>
      <div className="loader"></div>
    </div>
  );

  if (!user) {
    return <Navigate to="/login" replace />;
  }

  return (
    <div className="app-layout">
      <Sidebar />
      <main className="content">
        {children}
      </main>
    </div>
  );
};

const App = () => {
  return (
    <AuthProvider>
      <TransactionProvider>
        <Router>
          <Routes>
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route
              path="/dashboard"
              element={
                <ProtectedRoute>
                  <Dashboard />
                </ProtectedRoute>
              }
            />
            <Route
              path="/explorer"
              element={
                <ProtectedRoute>
                  <Explorer />
                </ProtectedRoute>
              }
            />
            <Route path="/" element={<Navigate to="/dashboard" replace />} />
          </Routes>
        </Router>
      </TransactionProvider>
    </AuthProvider>
  );
};

export default App;
