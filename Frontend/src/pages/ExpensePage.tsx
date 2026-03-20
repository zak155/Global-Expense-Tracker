import { useEffect, useState } from 'react';
import { fetchExpenses } from '../services/api';
import type { Expense } from '../types/Expense';
import GenericTable from '../components/GenericTable';

const ExpensePage = () => {
  const [data, setData] = useState<Expense[]>([]);

  useEffect(() => {
    fetchExpenses().then(setData);
  }, []);

  const columns = [
    { key: 'amount', label: 'Amount' },
    { key: 'currency', label: 'Currency' },
    { key: 'normalized_usd', label: 'USD Value' },
  ] as const;

  return <GenericTable data={data} columns={columns} />;
};

export default ExpensePage;