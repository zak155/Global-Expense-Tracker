import { useState } from 'react';
import { PlusCircle, Banknote } from 'lucide-react'; // Import icons
import { createExpense } from '../services/api';
import type { Expense } from '../types/Expense';
import './ExpenseForm.css';

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
    <form onSubmit={handleSubmit} className="expense-form-container">
      {/* Input Group with Icon */}
      <div className="input-wrapper">
        <Banknote className="input-icon" size={18} />
        <input
          type="number"
          className="form-input icon-padding"
          value={amount}
          onChange={(e) => setAmount(e.target.value === '' ? '' : Number(e.target.value))}
          placeholder="0.00"
          required
        />
      </div>
      
      <select
        className="form-select"
        value={currency}
        onChange={(e) => setCurrency(e.target.value as 'USD' | 'ETB' | 'EUR')}
      >
        <option value="USD">USD</option>
        <option value="ETB">ETB</option>
        <option value="EUR">EUR</option>
      </select>

      <button
        className="submit-button"
        type="submit"
        disabled={loading || amount === ''}
      >
        {loading ? (
          <span className="loader"></span> 
        ) : (
          <>
            <PlusCircle size={18} style={{ marginRight: '8px' }} />
            Add Expense
          </>
        )}
      </button>
    </form>
  );
};

export default ExpenseForm;