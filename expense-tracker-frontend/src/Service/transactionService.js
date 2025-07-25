import api from './api';

// ✅ Get all transactions
export const getAllTransactions = () => api.get('/transactions');

// ✅ Get transaction by ID
export const getTransactionById = (id) => api.get(`/transactions/${id}`);

// ✅ Get transactions by user name
export const getTransactionsByUserName = (userName) =>
  api.get('/transactions/by-user', { params: { userName } });

// ✅ Get transactions by date (pass date string in YYYY-MM-DD format)
export const getTransactionsByDate = (date) =>
  api.get('/transactions/by-date', { params: { date } });

// ✅ Get transactions by category (enum, e.g., FOOD)
export const getTransactionsByCategory = (category) =>
  api.get('/transactions/by-category', { params: { category } });

// ✅ Get transactions by type (enum, e.g., INCOME or EXPENSE)
export const getTransactionsByType = (type) =>
  api.get('/transactions/by-type', { params: { type } });

// ✅ Create a new transaction
export const createTransaction = (data) => api.post('/transactions', data);

// ✅ Update an existing transaction by ID
export const updateTransaction = (id, data) => api.put(`/transactions/${id}`, data);

// ✅ Delete a transaction by ID
export const deleteTransaction = (id) => api.delete(`/transactions/${id}`);
