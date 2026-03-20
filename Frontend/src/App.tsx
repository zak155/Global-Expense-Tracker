import { useEffect, useState } from 'react';
import { fetchExpenses } from './services/api';
import type { Expense } from './types/Expense';

function App() {
  const [expenses, setExpenses] = useState<Expense[]>([]);

  useEffect(() => {
    fetchExpenses().then(setExpenses);
  }, []);

  return (
    <div>
      <h1>Expenses</h1>
      {expenses.map((e) => (
        <div key={e.id}>
          {e.amount} {e.currency} → ${e.normalized_usd}
        </div>
      ))}
    </div>
  );
}

export default App;