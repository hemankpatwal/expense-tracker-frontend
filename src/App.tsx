import React, { useState, FormEvent } from 'react';
import axios from 'axios';
import { Expense } from './types';

const App: React.FC = () => {
    const [expense, setExpense] = useState<Expense>({
        amount: 0,
        category: '',
        date: '',
        description: ''
    });

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setExpense(prev => ({
            ...prev,
            [name]: name === 'amount' ? Number(value) : value
        }));
    };

    const handleSubmit = async (e: FormEvent) => {
        e.preventDefault();
        try {
            const response = await axios.post('http://localhost:3000/expenses', expense);
            console.log('Expense added:', response.data);
            // Reset form
            setExpense({ amount: 0, category: '', date: '', description: '' });
        } catch (error) {
            console.error('Error adding expense:', error);
        }
    };

    return (
        <div>
            <h1>Expense Tracker</h1>
            <form onSubmit={handleSubmit}>
                <div>
                    <label>Amount:</label>
                    <input
                        type="number"
                        name="amount"
                        value={expense.amount}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div>
                    <label>Category:</label>
                    <input
                        type="text"
                        name="category"
                        value={expense.category}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div>
                    <label>Date:</label>
                    <input
                        type="date"
                        name="date"
                        value={expense.date}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div>
                    <label>Description:</label>
                    <input
                        type="text"
                        name="description"
                        value={expense.description}
                        onChange={handleChange}
                    />
                </div>
                <button type="submit">Add Expense</button>
            </form>
        </div>
    );
};

export default App;