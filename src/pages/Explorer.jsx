import React, { useState, useEffect } from 'react';
import { useTransactions } from '../context/TransactionContext';
import { Search, Filter, ChevronLeft, ChevronRight, Edit2, Wallet } from 'lucide-react';
import TransactionModal from '../components/explorer/TransactionModal';

const Explorer = () => {
    const { fetchTransactions, loading } = useTransactions();
    const [localTransactions, setLocalTransactions] = useState([]);
    const [meta, setMeta] = useState({ pages: 1, currentPage: 1, total: 0 });

    // Filters State
    const [searchTerm, setSearchTerm] = useState('');
    const [categoryFilter, setCategoryFilter] = useState('All');
    const [dateRange, setDateRange] = useState({ start: '', end: '' });
    const [currentPage, setCurrentPage] = useState(1);

    const [isModalOpen, setIsModalOpen] = useState(false);
    const [editingTransaction, setEditingTransaction] = useState(null);

    const loadData = async (page = currentPage) => {
        const result = await fetchTransactions({
            search: searchTerm,
            category: categoryFilter,
            startDate: dateRange.start,
            endDate: dateRange.end,
            page: page,
            limit: 10
        });
        if (result) {
            setLocalTransactions(result.transactions);
            setMeta({
                pages: result.pages,
                currentPage: result.currentPage,
                total: result.total
            });
        }
    };

    useEffect(() => {
        const timer = setTimeout(() => {
            setCurrentPage(1);
            loadData(1);
        }, 300); // Debounce search
        return () => clearTimeout(timer);
    }, [searchTerm, categoryFilter, dateRange]);

    useEffect(() => {
        loadData(currentPage);
    }, [currentPage]);

    const handleEditClick = (transaction) => {
        setEditingTransaction(transaction);
        setIsModalOpen(true);
    };

    const handleCloseModal = () => {
        setIsModalOpen(false);
        setEditingTransaction(null);
        loadData(); // Refresh list after edit
    };

    return (
        <div className="animate-fade-in" style={{ maxWidth: '1100px', margin: '0 auto' }}>
            <header style={{ marginBottom: '3rem' }}>
                <h1 style={{ fontSize: '2.25rem', fontWeight: 800, letterSpacing: '-0.04em', marginBottom: '0.5rem' }}>Explorer</h1>
                <p style={{ color: 'var(--text-muted)', fontSize: '0.95rem' }}>Manage and analyze your full transaction history.</p>
            </header>

            <div className="card" style={{ marginBottom: '2rem', border: '1px solid var(--border)', background: 'var(--surface)', padding: '1.5rem' }}>
                <div style={{ display: 'grid', gridTemplateColumns: '1.5fr 1fr 1fr 1fr', gap: '1.25rem', alignItems: 'end' }}>
                    <div className="input-group" style={{ marginBottom: 0 }}>
                        <label className="input-label" style={{ fontWeight: 600, fontSize: '0.75rem', textTransform: 'uppercase', letterSpacing: '0.05em' }}>Search</label>
                        <div style={{ position: 'relative' }}>
                            <Search size={16} style={{ position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)', color: 'var(--text-muted)' }} />
                            <input
                                type="text"
                                className="input-field"
                                style={{ paddingLeft: '2.5rem', background: 'var(--background)', fontSize: '0.9rem' }}
                                placeholder="Filter by title..."
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                            />
                        </div>
                    </div>

                    <div className="input-group" style={{ marginBottom: 0 }}>
                        <label className="input-label" style={{ fontWeight: 600, fontSize: '0.75rem', textTransform: 'uppercase', letterSpacing: '0.05em' }}>Category</label>
                        <select
                            className="input-field"
                            style={{ background: 'var(--background)', fontSize: '0.9rem' }}
                            value={categoryFilter}
                            onChange={(e) => setCategoryFilter(e.target.value)}
                        >
                            <option value="All">All Categories</option>
                            <option value="Food">Food</option>
                            <option value="Rent">Rent</option>
                            <option value="Transport">Transport</option>
                            <option value="Entertainment">Entertainment</option>
                            <option value="Shopping">Shopping</option>
                            <option value="Health">Health</option>
                            <option value="Other">Other</option>
                        </select>
                    </div>

                    <div className="input-group" style={{ marginBottom: 0 }}>
                        <label className="input-label" style={{ fontWeight: 600, fontSize: '0.75rem', textTransform: 'uppercase', letterSpacing: '0.05em' }}>From</label>
                        <input
                            type="date"
                            className="input-field"
                            style={{ background: 'var(--background)', fontSize: '0.9rem' }}
                            value={dateRange.start}
                            onChange={(e) => setDateRange({ ...dateRange, start: e.target.value })}
                        />
                    </div>

                    <div className="input-group" style={{ marginBottom: 0 }}>
                        <label className="input-label" style={{ fontWeight: 600, fontSize: '0.75rem', textTransform: 'uppercase', letterSpacing: '0.05em' }}>To</label>
                        <input
                            type="date"
                            className="input-field"
                            style={{ background: 'var(--background)', fontSize: '0.9rem' }}
                            value={dateRange.end}
                            onChange={(e) => setDateRange({ ...dateRange, end: e.target.value })}
                        />
                    </div>
                </div>
            </div>

            <div className="card" style={{ padding: 0, overflow: 'hidden', border: '1px solid var(--border)', background: 'var(--surface)' }}>
                <div style={{ overflowX: 'auto' }}>
                    <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left' }}>
                        <thead>
                            <tr style={{ borderBottom: '1px solid var(--border)', background: 'rgba(255,255,255,0.01)' }}>
                                <th style={{ padding: '1rem 1.5rem', color: 'var(--text-muted)', fontWeight: 600, fontSize: '0.75rem', textTransform: 'uppercase', letterSpacing: '0.05em' }}>Date</th>
                                <th style={{ padding: '1rem 1.5rem', color: 'var(--text-muted)', fontWeight: 600, fontSize: '0.75rem', textTransform: 'uppercase', letterSpacing: '0.05em' }}>Title</th>
                                <th style={{ padding: '1rem 1.5rem', color: 'var(--text-muted)', fontWeight: 600, fontSize: '0.75rem', textTransform: 'uppercase', letterSpacing: '0.05em' }}>Category</th>
                                <th style={{ padding: '1rem 1.5rem', color: 'var(--text-muted)', fontWeight: 600, fontSize: '0.75rem', textTransform: 'uppercase', letterSpacing: '0.05em' }}>Amount</th>
                                <th style={{ padding: '1rem 1.5rem', textAlign: 'right' }}></th>
                            </tr>
                        </thead>
                        <tbody>
                            {localTransactions.map(t => (
                                <tr key={t._id} className="table-row" style={{ borderBottom: '1px solid var(--border)', transition: 'var(--transition)' }}>
                                    <td style={{ padding: '1.25rem 1.5rem', fontSize: '0.9rem', color: 'var(--text-muted)' }}>
                                        {new Date(t.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}
                                    </td>
                                    <td style={{ padding: '1.25rem 1.5rem' }}>
                                        <p style={{ fontWeight: 600, fontSize: '0.95rem', color: 'white' }}>{t.title}</p>
                                        <p style={{ fontSize: '0.75rem', color: 'var(--text-muted)', marginTop: '2px' }}>ID: {t._id.slice(-6)}</p>
                                    </td>
                                    <td style={{ padding: '1.25rem 1.5rem' }}>
                                        <span className={`badge badge-${t.category.toLowerCase()}`} style={{ border: '1px solid rgba(255,255,255,0.05)', display: 'inline-flex', alignItems: 'center', gap: '4px' }}>
                                            <div style={{ width: '6px', height: '6px', borderRadius: '50%', background: 'currentColor' }}></div>
                                            {t.category}
                                        </span>
                                    </td>
                                    <td style={{ padding: '1.25rem 1.5rem', color: 'white', fontWeight: 700, fontSize: '1rem' }}>-${t.amount.toFixed(2)}</td>
                                    <td style={{ padding: '1.25rem 1.5rem', textAlign: 'right' }}>
                                        <button
                                            className="btn"
                                            style={{ padding: '0.5rem', background: 'var(--surface-light)', color: 'var(--text-muted)', borderRadius: '8px', border: '1px solid var(--border)' }}
                                            onClick={() => handleEditClick(t)}
                                        >
                                            <Edit2 size={14} />
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
                {localTransactions.length === 0 && !loading && (
                    <div style={{ padding: '5rem 2rem', textAlign: 'center', color: 'var(--text-muted)', background: 'rgba(255,255,255,0.01)' }}>
                        <Wallet size={40} style={{ marginBottom: '1.25rem', opacity: 0.15 }} />
                        <h3 style={{ color: 'white', marginBottom: '0.5rem' }}>No results found</h3>
                        <p style={{ fontSize: '0.9rem' }}>Try adjusting your search or filters to find what you're looking for.</p>
                    </div>
                )}
                {loading && (
                    <div className="flex-center" style={{ padding: '5rem' }}>
                        <div className="loader" style={{ width: '28px', height: '28px' }}></div>
                    </div>
                )}
            </div>

            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: '2rem' }}>
                <p style={{ color: 'var(--text-muted)', fontSize: '0.85rem', fontWeight: 500 }}>
                    Showing <span style={{ color: 'white' }}>{localTransactions.length}</span> of <span style={{ color: 'white' }}>{meta.total}</span> records
                </p>
                <div className="flex-center" style={{ gap: '0.5rem' }}>
                    <button
                        className="btn btn-secondary"
                        style={{ padding: '0.5rem', width: '36px', height: '36px', borderRadius: '8px', background: 'var(--surface)', border: '1px solid var(--border)' }}
                        disabled={currentPage === 1 || loading}
                        onClick={() => setCurrentPage(p => p - 1)}
                    >
                        <ChevronLeft size={18} />
                    </button>
                    <div style={{ height: '36px', padding: '0 1rem', display: 'flex', alignItems: 'center', background: 'var(--surface)', border: '1px solid var(--border)', borderRadius: '8px', fontSize: '0.85rem', fontWeight: 600 }}>
                        {meta.currentPage} / {meta.pages}
                    </div>
                    <button
                        className="btn btn-secondary"
                        style={{ padding: '0.5rem', width: '36px', height: '36px', borderRadius: '8px', background: 'var(--surface)', border: '1px solid var(--border)' }}
                        disabled={currentPage === meta.pages || loading}
                        onClick={() => setCurrentPage(p => p + 1)}
                    >
                        <ChevronRight size={18} />
                    </button>
                </div>
            </div>

            <TransactionModal
                isOpen={isModalOpen}
                onClose={handleCloseModal}
                transactionToEdit={editingTransaction}
            />
        </div>
    );
};

export default Explorer;
