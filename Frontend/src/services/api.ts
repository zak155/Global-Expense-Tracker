import axios from 'axios';
import type { Expense } from '../types/Expense';

const API_URL = 'http://127.0.0.1:8000/api/expenses/';

export const fetchExpenses = async (): Promise<Expense[]> => {
  const response = await axios.get(API_URL);
  return response.data;
};

export const createExpense = async (data: {
  amount: number;
  currency: string;
}): Promise<Expense> => {
  const response = await axios.post(API_URL, data);
  return response.data;
};