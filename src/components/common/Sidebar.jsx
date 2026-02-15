import React from 'react';
import { NavLink } from 'react-router-dom';
import { LayoutDashboard, ListFilter, LogOut, Wallet } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';

const Sidebar = () => {
    const { logout, user } = useAuth();

    return (
        <aside className="sidebar glass" style={{ borderRight: '1px solid var(--glass-border)', padding: '2rem 1rem' }}>
            <div className="logo flex-center" style={{ gap: '0.75rem', marginBottom: '3.5rem', justifyContent: 'flex-start', paddingLeft: '0.75rem' }}>
                <div style={{
                    width: '36px',
                    height: '36px',
                    background: 'linear-gradient(135deg, var(--primary), var(--secondary))',
                    borderRadius: '8px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    boxShadow: '0 8px 16px -4px rgba(139, 92, 246, 0.4)'
                }}>
                    <Wallet size={20} color="white" />
                </div>
                <h2 style={{ fontSize: '1.5rem', fontWeight: 800, letterSpacing: '-0.04em', background: 'linear-gradient(to right, #fff, #a1a1aa)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
                    Expensy
                </h2>
            </div>

            <nav style={{ flex: 1 }}>
                <ul style={{ listStyle: 'none' }}>
                    <li>
                        <NavLink
                            to="/dashboard"
                            className={({ isActive }) => `btn ${isActive ? 'btn-primary' : 'btn-secondary'}`}
                            style={({ isActive }) => ({
                                width: '100%',
                                justifyContent: 'flex-start',
                                marginBottom: '0.5rem',
                                padding: '0.75rem 1rem',
                                borderRadius: '10px',
                                background: isActive ? 'var(--primary)' : 'transparent',
                                color: isActive ? 'white' : 'var(--text-muted)',
                                border: isActive ? 'none' : '1px solid transparent'
                            })}
                        >
                            <LayoutDashboard size={18} />
                            <span style={{ fontWeight: 500 }}>Dashboard</span>
                        </NavLink>
                    </li>
                    <li>
                        <NavLink
                            to="/explorer"
                            className={({ isActive }) => `btn ${isActive ? 'btn-primary' : 'btn-secondary'}`}
                            style={({ isActive }) => ({
                                width: '100%',
                                justifyContent: 'flex-start',
                                marginBottom: '0.5rem',
                                padding: '0.75rem 1rem',
                                borderRadius: '10px',
                                background: isActive ? 'var(--primary)' : 'transparent',
                                color: isActive ? 'white' : 'var(--text-muted)',
                                border: isActive ? 'none' : '1px solid transparent'
                            })}
                        >
                            <ListFilter size={18} />
                            <span style={{ fontWeight: 500 }}>Explorer</span>
                        </NavLink>
                    </li>
                </ul>
            </nav>

            <div className="user-profile" style={{
                marginTop: 'auto',
                padding: '1.25rem',
                background: 'rgba(255,255,255,0.03)',
                borderRadius: '12px',
                border: '1px solid var(--glass-border)'
            }}>
                <div style={{ marginBottom: '1rem', display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                    <div style={{ width: '32px', height: '32px', borderRadius: '50%', background: 'var(--surface-light)', display: 'flex', alignItems: 'center', justifyContent: 'center', border: '1px solid var(--glass-border)' }}>
                        <Wallet size={16} color="var(--primary)" />
                    </div>
                    <div style={{ overflow: 'hidden' }}>
                        <p style={{ fontSize: '0.875rem', fontWeight: 600, color: 'white', whiteSpace: 'nowrap', textOverflow: 'ellipsis' }}>{user?.username}</p>
                        <p style={{ fontSize: '0.75rem', color: 'var(--text-muted)', whiteSpace: 'nowrap', textOverflow: 'ellipsis' }}>{user?.email}</p>
                    </div>
                </div>
                <button
                    onClick={logout}
                    className="btn btn-secondary"
                    style={{
                        width: '100%',
                        justifyContent: 'center',
                        background: 'rgba(239, 68, 68, 0.08)',
                        color: '#f87171',
                        border: '1px solid rgba(239, 68, 68, 0.2)',
                        padding: '0.5rem',
                        fontSize: '0.875rem'
                    }}
                >
                    <LogOut size={16} />
                    Sign Out
                </button>
            </div>
        </aside>
    );
};

export default Sidebar;
