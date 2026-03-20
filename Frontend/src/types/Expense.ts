export interface Expense {
  id: number;
  amount: number;
  currency: 'USD' | 'ETB' | 'EUR';
  normalized_usd: number;
  exchange_rate: number;
  created_at: string;
}