import React, { useEffect, useState } from 'react';
import { useTransactions } from '../context/TransactionContext';
import { Plus, TrendingDown, CreditCard, PieChart as PieChartIcon, Calendar } from 'lucide-react';
import { Pie } from 'react-chartjs-2';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import TransactionModal from '../components/explorer/TransactionModal';

ChartJS.register(ArcElement, Tooltip, Legend);

const Dashboard = () => {
    const { stats, fetchStats, loading } = useTransactions();
    const [isModalOpen, setIsModalOpen] = useState(false);

    useEffect(() => {
        fetchStats();
    }, []);

    if (loading && !stats) return <div className="flex-center" style={{ height: '100%' }}><div className="loader"></div></div>;

    const chartData = {
        labels: stats ? Object.keys(stats.categoryBreakdown) : [],
        datasets: [
            {
                data: stats ? Object.values(stats.categoryBreakdown) : [],
                backgroundColor: [
                    '#8b5cf6', '#06b6d4', '#f59e0b', '#10b981', '#f43f5e', '#6366f1', '#a1a1aa'
                ],
                borderWidth: 0,
                hoverOffset: 15
            },
        ],
    };

    const chartOptions = {
        plugins: {
            legend: {
                position: 'bottom',
                labels: {
                    color: '#a1a1aa',
                    font: {
                        family: 'Inter',
                        size: 11,
                        weight: '500'
                    },
                    usePointStyle: true,
                    padding: 15
                }
            }
        },
        cutout: '70%',
        maintainAspectRatio: false
    };

    return (
        <div className="animate-fade-in" style={{ maxWidth: '1100px', margin: '0 auto' }}>
            <header style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '3rem' }}>
                <div>
                    <h1 style={{ fontSize: '2.25rem', fontWeight: 800, letterSpacing: '-0.04em', marginBottom: '0.5rem' }}>Overview</h1>
                    <p style={{ color: 'var(--text-muted)', fontSize: '0.95rem' }}>Welcome back, here is a summary of your activity.</p>
                </div>
                <button className="btn btn-primary" onClick={() => setIsModalOpen(true)} style={{ boxShadow: '0 10px 15px -3px rgba(139, 92, 246, 0.3)', padding: '0.75rem 1.5rem' }}>
                    <Plus size={18} />
                    New Transaction
                </button>
            </header>

            <div className="grid-dashboard" style={{ gridTemplateColumns: 'repeat(3, 1fr)', gap: '1.5rem', marginBottom: '3rem' }}>
                <div className="card" style={{ border: '1px solid var(--border)', background: 'var(--surface)', padding: '1.75rem' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '1.5rem' }}>
                        <div style={{ background: 'rgba(139, 92, 246, 0.1)', padding: '0.5rem', borderRadius: '8px' }}>
                            <TrendingDown size={18} color="var(--primary)" />
                        </div>
                        <span style={{ fontSize: '0.75rem', fontWeight: 600, color: 'var(--success)', padding: '2px 8px', background: 'rgba(16, 185, 129, 0.1)', borderRadius: '12px' }}>+12.5%</span>
                    </div>
                    <p style={{ fontSize: '0.875rem', fontWeight: 500, color: 'var(--text-muted)', marginBottom: '0.5rem' }}>Total Spending</p>
                    <h2 style={{ fontSize: '2rem', fontWeight: 800, letterSpacing: '-0.025em' }}>${stats?.totalExpenses?.toLocaleString(undefined, { minimumFractionDigits: 2 })}</h2>
                </div>

                <div className="card" style={{ border: '1px solid var(--border)', background: 'var(--surface)', padding: '1.75rem' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '1.5rem' }}>
                        <div style={{ background: 'rgba(6, 182, 212, 0.1)', padding: '0.5rem', borderRadius: '8px' }}>
                            <CreditCard size={18} color="var(--secondary)" />
                        </div>
                    </div>
                    <p style={{ fontSize: '0.875rem', fontWeight: 500, color: 'var(--text-muted)', marginBottom: '0.5rem' }}>Categories</p>
                    <h2 style={{ fontSize: '2rem', fontWeight: 800, letterSpacing: '-0.025em' }}>{stats ? Object.keys(stats.categoryBreakdown).length : 0}</h2>
                </div>

                <div className="card" style={{ border: '1px solid var(--border)', background: 'var(--surface)', padding: '1.75rem' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '1.5rem' }}>
                        <div style={{ background: 'rgba(244, 63, 94, 0.1)', padding: '0.5rem', borderRadius: '8px' }}>
                            <Calendar size={18} color="var(--accent)" />
                        </div>
                    </div>
                    <p style={{ fontSize: '0.875rem', fontWeight: 500, color: 'var(--text-muted)', marginBottom: '0.5rem' }}>Transactions</p>
                    <h2 style={{ fontSize: '2rem', fontWeight: 800, letterSpacing: '-0.025em' }}>{stats?.recentTransactions?.length || 0}</h2>
                </div>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: '1.6fr 1fr', gap: '2rem' }}>
                <div className="card" style={{ border: '1px solid var(--border)', background: 'var(--surface)', padding: '2rem' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem' }}>
                        <h3 style={{ fontSize: '1.25rem', fontWeight: 700, display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                            Recent Transactions
                        </h3>
                        <button style={{ background: 'none', border: 'none', color: 'var(--primary)', fontSize: '0.875rem', fontWeight: 600, cursor: 'pointer' }}>View All</button>
                    </div>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
                        {stats?.recentTransactions?.map(t => (
                            <div key={t._id} className="flex-center" style={{ justifyContent: 'space-between', padding: '1rem', background: 'rgba(255,255,255,0.02)', borderRadius: '12px', border: '1px solid transparent', transition: 'var(--transition)' }}>
                                <div className="flex-center" style={{ gap: '1rem', justifyContent: 'flex-start' }}>
                                    <div className={`badge badge-${t.category.toLowerCase()}`} style={{ width: '42px', height: '42px', display: 'flex', alignItems: 'center', justifyContent: 'center', borderRadius: '10px', fontSize: '1rem', border: '1px solid rgba(255,255,255,0.05)' }}>
                                        {t.category === 'Food' ? '🍔' : t.category === 'Transport' ? '🚗' : t.category === 'Rent' ? '🏠' : '📦'}
                                    </div>
                                    <div>
                                        <p style={{ fontWeight: 600, fontSize: '0.95rem' }}>{t.title}</p>
                                        <p style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>{new Date(t.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}</p>
                                    </div>
                                </div>
                                <div style={{ textAlign: 'right' }}>
                                    <p style={{ fontWeight: 700, color: 'white', fontSize: '1rem' }}>-${t.amount.toFixed(2)}</p>
                                    <p style={{ fontSize: '0.7rem', color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '0.05em' }}>{t.category}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                <div className="card" style={{ border: '1px solid var(--border)', background: 'var(--surface)', padding: '2rem' }}>
                    <h3 style={{ fontSize: '1.25rem', fontWeight: 700, marginBottom: '2rem' }}>Category Distribution</h3>
                    <div style={{ height: '320px', position: 'relative' }}>
                        {stats && Object.keys(stats.categoryBreakdown).length > 0 ? (
                            <Pie data={chartData} options={chartOptions} />
                        ) : (
                            <div className="flex-center" style={{ height: '100%', color: 'var(--text-muted)', fontSize: '0.875rem' }}>No data available</div>
                        )}
                    </div>
                </div>
            </div>

            <TransactionModal
                isOpen={isModalOpen}
                onClose={() => setIsModalOpen(false)}
            />
        </div>
    );
};

export default Dashboard;
