import React, { useState, useEffect } from 'react';
import { X, Save, Trash2 } from 'lucide-react';
import { useTransactions } from '../../context/TransactionContext';

const TransactionModal = ({ isOpen, onClose, transactionToEdit }) => {
    const [formData, setFormData] = useState({
        title: '',
        amount: '',
        category: 'Food',
        date: new Date().toISOString().split('T')[0],
        notes: ''
    });
    const { addTransaction, updateTransaction, deleteTransaction } = useTransactions();
    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
        if (transactionToEdit) {
            setFormData({
                title: transactionToEdit.title,
                amount: transactionToEdit.amount,
                category: transactionToEdit.category,
                date: new Date(transactionToEdit.date).toISOString().split('T')[0],
                notes: transactionToEdit.notes || ''
            });
        } else {
            setFormData({
                title: '',
                amount: '',
                category: 'Food',
                date: new Date().toISOString().split('T')[0],
                notes: ''
            });
        }
    }, [transactionToEdit, isOpen]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsLoading(true);
        try {
            if (transactionToEdit) {
                await updateTransaction(transactionToEdit._id, formData);
            } else {
                await addTransaction(formData);
            }
            onClose();
        } catch (error) {
            console.error('Error saving transaction', error);
        } finally {
            setIsLoading(false);
        }
    };

    const handleDelete = async () => {
        if (window.confirm('Are you sure you want to delete this transaction?')) {
            setIsLoading(true);
            try {
                await deleteTransaction(transactionToEdit._id);
                onClose();
            } catch (error) {
                console.error('Error deleting transaction', error);
            } finally {
                setIsLoading(false);
            }
        }
    };

    if (!isOpen) return null;

    return (
        <div className="flex-center" style={{ position: 'fixed', inset: 0, zIndex: 100, background: 'rgba(0,0,0,0.6)', backdropFilter: 'blur(4px)' }}>
            <div className="card glass animate-fade-in" style={{ width: '100%', maxWidth: '500px', padding: '2rem', position: 'relative' }}>
                <button onClick={onClose} style={{ position: 'absolute', top: '1.5rem', right: '1.5rem', background: 'transparent', border: 'none', color: 'var(--text-muted)', cursor: 'pointer' }}>
                    <X size={24} />
                </button>

                <h2 style={{ marginBottom: '2rem' }}>{transactionToEdit ? 'Edit Transaction' : 'New Transaction'}</h2>

                <form onSubmit={handleSubmit}>
                    <div className="input-group">
                        <label className="input-label">Transaction Title</label>
                        <input
                            type="text"
                            className="input-field"
                            placeholder="e.g. Grocery Shopping"
                            value={formData.title}
                            onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                            required
                        />
                    </div>

                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
                        <div className="input-group">
                            <label className="input-label">Amount ($)</label>
                            <input
                                type="number"
                                step="0.01"
                                className="input-field"
                                placeholder="0.00"
                                value={formData.amount}
                                onChange={(e) => setFormData({ ...formData, amount: e.target.value })}
                                required
                            />
                        </div>
                        <div className="input-group">
                            <label className="input-label">Category</label>
                            <select
                                className="input-field"
                                value={formData.category}
                                onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                                required
                            >
                                <option value="Food">Food</option>
                                <option value="Rent">Rent</option>
                                <option value="Transport">Transport</option>
                                <option value="Entertainment">Entertainment</option>
                                <option value="Shopping">Shopping</option>
                                <option value="Health">Health</option>
                                <option value="Other">Other</option>
                            </select>
                        </div>
                    </div>

                    <div className="input-group">
                        <label className="input-label">Date</label>
                        <input
                            type="date"
                            className="input-field"
                            value={formData.date}
                            onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                            required
                        />
                    </div>

                    <div className="input-group">
                        <label className="input-label">Notes (Optional)</label>
                        <textarea
                            className="input-field"
                            style={{ minHeight: '80px', resize: 'vertical' }}
                            placeholder="Added context..."
                            value={formData.notes}
                            onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
                        ></textarea>
                    </div>

                    <div style={{ display: 'flex', gap: '1rem', marginTop: '1rem' }}>
                        {transactionToEdit && (
                            <button
                                type="button"
                                className="btn"
                                style={{ background: 'rgba(239, 68, 68, 0.1)', color: '#ef4444' }}
                                onClick={handleDelete}
                                disabled={isLoading}
                            >
                                <Trash2 size={20} />
                            </button>
                        )}
                        <button
                            type="submit"
                            className="btn btn-primary"
                            style={{ flex: 1 }}
                            disabled={isLoading}
                        >
                            <Save size={20} />
                            {isLoading ? 'Saving...' : 'Save Transaction'}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default TransactionModal;
