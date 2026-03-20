import { useEffect, useState } from 'react';
import { fetchExpenses } from '../services/api';
import type { Expense } from '../types/Expense';
import GenericTable from '../components/GenericTable';
import ExpenseForm from '../components/ExpenseForm';

const ExpensePage = () => {
  const [data, setData] = useState<Expense[]>([]);

  const loadExpenses = async () => {
    const expenses = await fetchExpenses();
    setData(expenses);
  };

  useEffect(() => {
    loadExpenses();
  }, []);

  const columns = [
    { key: 'amount', label: 'Amount' },
    { key: 'currency', label: 'Currency' },
    { key: 'normalized_usd', label: 'USD Value' },
  ] as const;

  const handleAdd = (newExpense: Expense) => {
    setData((prev) => [...prev, newExpense]);
  };

  return (
    <div style={{ padding: '20px' }}>
      <ExpenseForm onAdd={handleAdd} />
      <GenericTable data={data} columns={columns} />
    </div>
  );
};

export default ExpensePage;