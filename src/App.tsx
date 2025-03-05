import React, { useState, useEffect, FormEvent } from 'react';
import axios from 'axios';
import { Expense } from './types';

const App: React.FC = () => {
    const [expense, setExpense] = useState<Expense>({
        amount: 0,
        category: '',
        date: '',
        description: ''
    });
    const [expenses, setExpenses] = useState<Expense[]>([]);
    const [filterCategory, setFilterCategory] = useState<string>('');
    const [filterDate, setFilterDate] = useState<string>('');

    useEffect(() => {
      fetchExpenses();
    }, []);

    const fetchExpenses = async (category = '', date = '') => {
      try {
          const params = new URLSearchParams();
          if (category) params.append('category', category);
          if (date) params.append('date', date);
          const response = await axios.get('http://localhost:3000/expenses', { params });
          setExpenses(response.data);
      } catch (error) {
          console.error('Error fetching expenses:', error);
      }
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setExpense(prev => ({
            ...prev,
            [name]: name === 'amount' ? Number(value) : value
        }));
    };

    const handleFilterChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      const { name, value } = e.target;
      if (name === 'filterCategory') setFilterCategory(value);
      if (name === 'filterDate') setFilterDate(value);
    };

    const handleSubmit = async (e: FormEvent) => {
        e.preventDefault();
        try {
            const response = await axios.post('http://localhost:3000/expenses', expense);
            console.log('Expense added:', response.data);
            // Reset form
            setExpense({ amount: 0, category: '', date: '', description: '' });
            fetchExpenses();
        } catch (error) {
            console.error('Error adding expense:', error);
        }
    };

    const handleSearch = () => {
      fetchExpenses(filterCategory, filterDate);
    };

    const clearFilters = () => {
      setFilterCategory('');
      setFilterDate('');
      fetchExpenses();
    };

    return (
      <div style={{
          width: '100vw', 
          minHeight: '100vh',
          padding: '20px',
          fontFamily: 'Arial, sans-serif',
          backgroundColor: '#f4f7fa',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'flex-start'
      }}>
          <div style={{
              width: '100%',
              maxWidth: '1200px', 
              margin: '0 auto'
          }}>
              <h1 style={{ textAlign: 'center', color: '#2c3e50', marginBottom: '30px' }}>
                  Expense Tracker
              </h1>

              {/* Add Expense Form */}
              <form onSubmit={handleSubmit} style={{
                  backgroundColor: '#ffffff',
                  padding: '25px',
                  borderRadius: '10px',
                  boxShadow: '0 2px 10px rgba(0, 0, 0, 0.1)',
                  marginBottom: '40px'
              }}>
                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 2fr', gap: '20px' }}>
                      <label style={{ fontWeight: '600', color: '#34495e', alignSelf: 'center' }}>
                          Amount ($):
                      </label>
                      <input
                          type="number"
                          name="amount"
                          value={expense.amount === 0 ? '' : expense.amount}
                          onChange={handleChange}
                          required
                          placeholder="Enter amount"
                          style={{
                              padding: '10px',
                              border: '1px solid #bdc3c7',
                              borderRadius: '6px',
                              fontSize: '16px',
                              outline: 'none',
                              transition: 'border-color 0.3s',
                          }}
                          onFocus={(e) => e.target.style.borderColor = '#3498db'}
                          onBlur={(e) => e.target.style.borderColor = '#bdc3c7'}
                      />

                      <label style={{ fontWeight: '600', color: '#34495e', alignSelf: 'center' }}>
                          Category:
                      </label>
                      <input
                          type="text"
                          name="category"
                          value={expense.category}
                          onChange={handleChange}
                          required
                          placeholder="e.g., Food"
                          style={{
                              padding: '10px',
                              border: '1px solid #bdc3c7',
                              borderRadius: '6px',
                              fontSize: '16px',
                              outline: 'none',
                              transition: 'border-color 0.3s',
                          }}
                          onFocus={(e) => e.target.style.borderColor = '#3498db'}
                          onBlur={(e) => e.target.style.borderColor = '#bdc3c7'}
                      />

                      <label style={{ fontWeight: '600', color: '#34495e', alignSelf: 'center' }}>
                          Date:
                      </label>
                      <input
                          type="date"
                          name="date"
                          value={expense.date}
                          onChange={handleChange}
                          required
                          style={{
                              padding: '10px',
                              border: '1px solid #bdc3c7',
                              borderRadius: '6px',
                              fontSize: '16px',
                              outline: 'none',
                              transition: 'border-color 0.3s',
                          }}
                          onFocus={(e) => e.target.style.borderColor = '#3498db'}
                          onBlur={(e) => e.target.style.borderColor = '#bdc3c7'}
                      />

                      <label style={{ fontWeight: '600', color: '#34495e', alignSelf: 'center' }}>
                          Description:
                      </label>
                      <input
                          type="text"
                          name="description"
                          value={expense.description || ''}
                          onChange={handleChange}
                          placeholder="Optional"
                          style={{
                              padding: '10px',
                              border: '1px solid #bdc3c7',
                              borderRadius: '6px',
                              fontSize: '16px',
                              outline: 'none',
                              transition: 'border-color 0.3s',
                          }}
                          onFocus={(e) => e.target.style.borderColor = '#3498db'}
                          onBlur={(e) => e.target.style.borderColor = '#bdc3c7'}
                      />
                  </div>
                  <button
                      type="submit"
                      style={{
                          width: '100%',
                          padding: '12px',
                          backgroundColor: '#3498db',
                          color: '#fff',
                          border: 'none',
                          borderRadius: '6px',
                          fontSize: '16px',
                          fontWeight: '600',
                          cursor: 'pointer',
                          marginTop: '20px',
                          transition: 'background-color 0.3s',
                      }}
                      onMouseOver={(e) => (e.currentTarget.style.backgroundColor = '#2980b9')}
                      onMouseOut={(e) => (e.currentTarget.style.backgroundColor = '#3498db')}
                  >
                      Add Expense
                  </button>
              </form>

              {/* Filter Section */}
              <div style={{
                    backgroundColor: '#ffffff',
                    padding: '20px',
                    borderRadius: '10px',
                    boxShadow: '0 2px 10px rgba(0, 0, 0, 0.1)',
                    marginBottom: '40px',
                    display: 'flex',
                    gap: '15px',
                    alignItems: 'center',
                    flexWrap: 'wrap',
                }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '10px', flex: '1', minWidth: '250px'}}>
                        <label style={{ fontWeight: '600', color: '#34495e', whiteSpace: 'nowrap' }}>
                            Category:
                        </label>
                        <input
                            type="text"
                            name="filterCategory"
                            value={filterCategory}
                            onChange={handleFilterChange}
                            placeholder="e.g., Food"
                            style={{
                                padding: '10px',
                                border: '1px solid #bdc3c7',
                                borderRadius: '6px',
                                fontSize: '16px',
                                outline: 'none',
                                flex: '1',
                                transition: 'border-color 0.3s',
                            }}
                            onFocus={(e) => e.target.style.borderColor = '#3498db'}
                            onBlur={(e) => e.target.style.borderColor = '#bdc3c7'}
                        />
                    </div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '10px', flex: '1', minWidth: '250px' }}>
                        <label style={{ fontWeight: '600', color: '#34495e', whiteSpace: 'nowrap' }}>
                            Date:
                        </label>
                        <input
                            type="date"
                            name="filterDate"
                            value={filterDate}
                            onChange={handleFilterChange}
                            style={{
                                padding: '10px',
                                border: '1px solid #bdc3c7',
                                borderRadius: '6px',
                                fontSize: '16px',
                                outline: 'none',
                                flex: '1',
                                transition: 'border-color 0.3s',
                            }}
                            onFocus={(e) => e.target.style.borderColor = '#3498db'}
                            onBlur={(e) => e.target.style.borderColor = '#bdc3c7'}
                        />
                    </div>
                    <div style={{ display: 'flex', gap: '10px', alignItems: 'center' }}>
                      <button
                          onClick={handleSearch}
                          style={{
                              padding: '10px 20px',
                              backgroundColor: '#2ecc71',
                              color: '#fff',
                              border: 'none',
                              borderRadius: '6px',
                              fontSize: '16px',
                              fontWeight: '600',
                              cursor: 'pointer',
                              transition: 'background-color 0.3s',
                          }}
                          onMouseOver={(e) => (e.currentTarget.style.backgroundColor = '#27ae60')}
                          onMouseOut={(e) => (e.currentTarget.style.backgroundColor = '#2ecc71')}
                      >
                          Search
                      </button>
                      <button
                          onClick={clearFilters}
                          style={{
                              padding: '10px 20px',
                              backgroundColor: '#e74c3c',
                              color: '#fff',
                              border: 'none',
                              borderRadius: '6px',
                              fontSize: '16px',
                              fontWeight: '600',
                              cursor: 'pointer',
                              transition: 'background-color 0.3s',
                          }}
                          onMouseOver={(e) => (e.currentTarget.style.backgroundColor = '#c0392b')}
                          onMouseOut={(e) => (e.currentTarget.style.backgroundColor = '#e74c3c')}
                      >
                          Clear Filters
                      </button>
                    </div>
                </div>

              {/* Expense List */}
              <h2 style={{ color: '#2c3e50', marginBottom: '20px' }}>Your Expenses</h2>
              {expenses.length === 0 ? (
                  <p style={{ color: '#7f8c8d', fontStyle: 'italic', textAlign: 'center' }}>
                      No expenses recorded yet.
                  </p>
              ) : (
                  <table style={{
                      width: '100%',
                      borderCollapse: 'collapse',
                      backgroundColor: '#fff',
                      borderRadius: '10px',
                      boxShadow: '0 2px 10px rgba(0, 0, 0, 0.1)',
                      overflow: 'hidden'
                  }}>
                      <thead>
                          <tr style={{ backgroundColor: '#ecf0f1' }}>
                              <th style={{ padding: '15px', textAlign: 'left', color: '#34495e', fontWeight: '600' }}>Amount</th>
                              <th style={{ padding: '15px', textAlign: 'left', color: '#34495e', fontWeight: '600' }}>Category</th>
                              <th style={{ padding: '15px', textAlign: 'left', color: '#34495e', fontWeight: '600' }}>Date</th>
                              <th style={{ padding: '15px', textAlign: 'left', color: '#34495e', fontWeight: '600' }}>Description</th>
                          </tr>
                      </thead>
                      <tbody>
                          {expenses.map(exp => (
                              <tr key={exp._id} style={{ borderBottom: '1px solid #ecf0f1' }}>
                                  <td style={{ padding: '15px', color: '#2c3e50' }}>${exp.amount.toFixed(2)}</td>
                                  <td style={{ padding: '15px', color: '#2c3e50' }}>{exp.category}</td>
                                  <td style={{ padding: '15px', color: '#2c3e50' }}>{new Date(exp.date).toLocaleDateString()}</td>
                                  <td style={{ padding: '15px', color: '#2c3e50' }}>{exp.description || 'N/A'}</td>
                              </tr>
                          ))}
                      </tbody>
                  </table>
              )}
          </div>
      </div>
  );
};

export default App;