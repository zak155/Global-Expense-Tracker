import { useEffect, useState } from 'react';
import { fetchExpenses } from '../services/api';
import type { Expense } from '../types/Expense';
import GenericTable from '../components/GenericTable';
import ExpenseForm from '../components/ExpenseForm';

// Define columns explicitly with correct type
const columns: { key: keyof Expense; label: string }[] = [
  { key: 'amount', label: 'Amount' },
  { key: 'currency', label: 'Currency' },
  { key: 'normalized_usd', label: 'USD Value' },
];

const ExpensePage: React.FC = () => {
  const [data, setData] = useState<Expense[]>([]);

  // Load expenses from backend
  const loadExpenses = async () => {
    try {
      const expenses = await fetchExpenses();
      setData(expenses);
    } catch (error) {
      console.error('Failed to load expenses', error);
    }
  };

  useEffect(() => {
    loadExpenses();
  }, []);

  // Callback when a new expense is added
  const handleAdd = (newExpense: Expense) => {
    setData((prev) => [...prev, newExpense]);
  };

  return (
    <div style={{ padding: '20px' }}>
      {/* Expense form */}
      <ExpenseForm onAdd={handleAdd} />

      {/* Generic table */}
      <GenericTable data={data} columns={columns} />
    </div>
  );
};

export default ExpensePage;