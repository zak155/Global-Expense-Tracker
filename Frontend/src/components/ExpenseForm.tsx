import { useState } from 'react';
import { createExpense } from '../services/api';
import type { Expense } from '../types/Expense';

interface Props {
  onAdd: (newExpense: Expense) => void;
}

const ExpenseForm: React.FC<Props> = ({ onAdd }) => {
  const [amount, setAmount] = useState<number | ''>('');
  const [currency, setCurrency] = useState<'USD' | 'ETB' | 'EUR'>('USD');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (amount === '' || amount <= 0) return;

    setLoading(true);
    try {
      const newExpense = await createExpense({ amount, currency });
      onAdd(newExpense);
      setAmount('');
      setCurrency('USD');
    } catch (error) {
      console.error('Error adding expense', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} style={{ margin: '20px 0', display: 'flex', gap: '10px' }}>
      <input
        type="number"
        value={amount}
        onChange={(e) => setAmount(Number(e.target.value))}
        placeholder="Amount"
        required
        style={{ padding: '8px', borderRadius: '6px', border: '1px solid #ccc', width: '120px' }}
      />
      <select
        value={currency}
        onChange={(e) => setCurrency(e.target.value as 'USD' | 'ETB' | 'EUR')}
        style={{ padding: '8px', borderRadius: '6px', border: '1px solid #ccc' }}
      >
        <option value="USD">USD</option>
        <option value="ETB">ETB</option>
        <option value="EUR">EUR</option>
      </select>
      <button
        type="submit"
        disabled={loading}
        style={{
          padding: '8px 16px',
          borderRadius: '6px',
          backgroundColor: '#6366f1',
          color: 'white',
          fontWeight: 'bold',
          transform: loading ? 'scale(0.95)' : 'scale(1)',
          transition: 'transform 0.2s',
          cursor: loading ? 'not-allowed' : 'pointer'
        }}
      >
        {loading ? 'Adding...' : 'Add Expense'}
      </button>
    </form>
  );
};

export default ExpenseForm;