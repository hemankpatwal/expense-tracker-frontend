export interface Expense {
    _id?: string; 
    amount: number;
    category: string;
    date: string;
    description?: string; 
}