import React, { useState, useEffect } from "react";

function App() {

  const [transactions, setTransactions] = useState([]);
  const [text, setText] = useState("");
  const [amount, setAmount] = useState("");

  // Load from localStorage
  useEffect(() => {
    const saved = JSON.parse(localStorage.getItem("transactions"));
    if (saved) setTransactions(saved);
  }, []);

  // Save to localStorage
  useEffect(() => {
    localStorage.setItem("transactions", JSON.stringify(transactions));
  }, [transactions]);

  // Add transaction
  const addTransaction = (e) => {
    e.preventDefault();

    if (!text || !amount) return;

    const newTransaction = {
      id: Date.now(),
      text,
      amount: Number(amount)
    };

    setTransactions([newTransaction, ...transactions]);

    setText("");
    setAmount("");
  };

  // Delete transaction
  const deleteTransaction = (id) => {
    setTransactions(transactions.filter(t => t.id !== id));
  };

  // Calculate values
  const income = transactions
    .filter(t => t.amount > 0)
    .reduce((a, t) => a + t.amount, 0);

  const expense = transactions
    .filter(t => t.amount < 0)
    .reduce((a, t) => a + t.amount, 0);

  const balance = income + expense;

  return (
    <div className="container">

      <h1> Budget Tracker</h1>

      {/* Balance */}
      <div className="balance">
        <h2>Balance: ₹{balance}</h2>

        <div className="row">
          <p className="income">Income: ₹{income}</p>
          <p className="expense">Expense: ₹{Math.abs(expense)}</p>
        </div>
      </div>

      {/* Form */}
      <form className="form" onSubmit={addTransaction}>

        <input
          type="text"
          placeholder="Enter description"
          value={text}
          onChange={(e) => setText(e.target.value)}
        />

        <input
          type="number"
          placeholder="Enter amount (+income, -expense)"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
        />

        <button type="submit">Add Transaction</button>

      </form>

      {/* Transactions */}
      <div className="list">

        <h3>Transactions</h3>

        {transactions.length === 0 && <p>No transactions yet</p>}

        {transactions.map((t) => (
          <div
            key={t.id}
            className={`item ${t.amount < 0 ? "expense" : "income"}`}
          >
            <span>{t.text}</span>
            <span>₹{t.amount}</span>

            <button onClick={() => deleteTransaction(t.id)}>
              ❌
            </button>
          </div>
        ))}

      </div>

    </div>
  );
}

export default App;
