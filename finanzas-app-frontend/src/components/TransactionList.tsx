import React from 'react';
import '../styles/components/transactionList.css';

interface Transaction {
  id: number;
  type: 'income' | 'expense';
  amount: number;
  description: string;
  category: string;
  date: string;
}

interface Props {
  transactions: Transaction[];
}

const TransactionList: React.FC<Props> = ({ transactions }) => {
  return (
    <ul className="transaction-list">
      {transactions.map(tx => (
        <li key={tx.id} className={tx.type}>
          <div>
            <strong>{tx.description}</strong>
            <span>{tx.category}</span>
          </div>
          <div>
            <span>{tx.type === 'income' ? '+' : '-'}S/ {tx.amount}</span>
            <small>{tx.date}</small>
          </div>
        </li>
      ))}
    </ul>
  );
};

export default TransactionList;


