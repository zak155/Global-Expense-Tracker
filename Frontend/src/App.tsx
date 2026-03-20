import { useEffect, useState } from 'react';
import { fetchExpenses } from './services/api';
import type { Expense } from './types/Expense';
import ExpenseForm from './components/ExpenseForm';
import GenericTable from './components/GenericTable';
import './App.css'; // Don't forget this!

function App() {
  const [expenses, setExpenses] = useState<Expense[]>([]);

  useEffect(() => {
    const loadExpenses = async () => {
      try {
        const data = await fetchExpenses();
        setExpenses(data);
      } catch (err) {
        console.error('Failed to fetch expenses:', err);
      }
    };
    loadExpenses();
  }, []);

  const handleAdd = (newExpense: Expense) => {
    setExpenses((prev) => [...prev, newExpense]);
  };

  const columns = [
    { 
      key: 'amount' as const, 
      label: 'Amount',
      render: (val: number) => <strong style={{color: '#0f172a'}}>{val.toLocaleString()}</strong>
    },
    { 
      key: 'currency' as const, 
      label: 'Currency',
      render: (val: string) => <span className={`badge badge-${val.toLowerCase()}`}>{val}</span>
    },
    { 
      key: 'normalized_usd' as const, 
      label: 'USD Value',
      render: (val: number) => <span style={{color: '#64748b'}}>${val.toFixed(2)}</span>
    },
  ];

  return (
    <div className="app-container">
      <header className="app-header">
        <h1>Global Expense Tracker</h1>
        <p>Monitor your spending across multiple currencies in real-time.</p>
      </header>

      <div className="content-card">
        <h2 className="section-title">Add New Transaction</h2>
        <ExpenseForm onAdd={handleAdd} />

        <h2 className="section-title">Recent History</h2>
        <GenericTable data={expenses} columns={columns} />
      </div>
    </div>
  );
}

export default App;