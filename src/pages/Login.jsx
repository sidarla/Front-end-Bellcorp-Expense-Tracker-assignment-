import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { Wallet, Mail, Lock, Loader2 } from 'lucide-react';

const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState('');
    const { login } = useAuth();
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsLoading(true);
        setError('');
        try {
            await login(email, password);
            navigate('/dashboard');
        } catch (err) {
            setError(err.response?.data?.message || 'Login failed');
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="flex-center animate-fade-in" style={{ height: '100vh', padding: '1rem' }}>
            <div style={{ width: '100%', maxWidth: '400px' }}>
                <div style={{ textAlign: 'center', marginBottom: '2.5rem' }}>
                    <div style={{
                        width: '48px',
                        height: '48px',
                        background: 'linear-gradient(135deg, var(--primary), var(--secondary))',
                        borderRadius: '12px',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        margin: '0 auto 1.5rem',
                        boxShadow: '0 10px 20px -5px rgba(139, 92, 246, 0.5)'
                    }}>
                        <Wallet size={24} color="white" />
                    </div>
                    <h1 style={{ fontSize: '2rem', fontWeight: 800, letterSpacing: '-0.04em', marginBottom: '0.5rem' }}>Expensy</h1>
                    <p style={{ color: 'var(--text-muted)', fontSize: '0.95rem' }}>Sign in to manage your finances</p>
                </div>

                <div className="card" style={{ border: '1px solid var(--border)', background: 'var(--surface)', padding: '2.5rem', boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.5)' }}>
                    {error && (
                        <div style={{ padding: '0.75rem', background: 'rgba(239, 68, 68, 0.08)', color: '#f87171', borderRadius: '8px', marginBottom: '1.5rem', fontSize: '0.85rem', textAlign: 'center', border: '1px solid rgba(239, 68, 68, 0.2)' }}>
                            {error}
                        </div>
                    )}

                    <form onSubmit={handleSubmit}>
                        <div className="input-group">
                            <label className="input-label" style={{ fontWeight: 600, color: 'var(--text-muted)', fontSize: '0.75rem', textTransform: 'uppercase', letterSpacing: '0.05em' }}>Email Address</label>
                            <input
                                type="email"
                                className="input-field"
                                style={{ background: 'var(--background)' }}
                                placeholder="name@example.com"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                required
                            />
                        </div>

                        <div className="input-group">
                            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.5rem' }}>
                                <label className="input-label" style={{ marginBottom: 0, fontWeight: 600, color: 'var(--text-muted)', fontSize: '0.75rem', textTransform: 'uppercase', letterSpacing: '0.05em' }}>Password</label>
                                <a href="#" style={{ fontSize: '0.75rem', color: 'var(--primary)', textDecoration: 'none', fontWeight: 500 }}>Forgot?</a>
                            </div>
                            <input
                                type="password"
                                className="input-field"
                                style={{ background: 'var(--background)' }}
                                placeholder="••••••••"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                required
                            />
                        </div>

                        <button
                            type="submit"
                            className="btn btn-primary"
                            style={{ width: '100%', marginTop: '0.5rem', padding: '0.8rem', fontWeight: 600 }}
                            disabled={isLoading}
                        >
                            {isLoading ? 'Signing in...' : 'Sign In'}
                        </button>
                    </form>
                </div>

                <p style={{ marginTop: '2rem', textAlign: 'center', color: 'var(--text-muted)', fontSize: '0.9rem' }}>
                    New to Expensy? <Link to="/register" style={{ color: 'white', textDecoration: 'none', fontWeight: 600, borderBottom: '1px solid var(--primary)' }}>Create an account</Link>
                </p>
            </div>
        </div>
    );
};

export default Login;
