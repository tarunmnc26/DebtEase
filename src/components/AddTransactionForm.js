import React, { useState } from 'react';
import { TextField, Button, Paper, Typography, Alert } from '@mui/material';

const AddTransactionForm = ({ groupId, addTransaction, groupUsers }) => {
  const [description, setDescription] = useState('');
  const [amount, setAmount] = useState('');
  const [from, setFrom] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();

    // Check if the entered user name exists in the group
    const userExists = groupUsers.some(user => user.name === from);
    if (!userExists) {
      setError('User does not exist in the group.');
      return;
    }

    // Check if the entered amount is greater than 0
    const parsedAmount = parseFloat(amount);
    if (parsedAmount <= 0 || isNaN(parsedAmount)) {
      setError('Amount must be greater than 0.');
      return;
    }

    const transaction = {
      id: Date.now(),
      description,
      amount: parsedAmount,
      from,
      to: 'Group',
    };

    addTransaction(groupId, transaction);

    setDescription('');
    setAmount('');
    setFrom('');
    setError(''); // Clear any previous error
  };

  return (
    <Paper elevation={3} style={{ padding: '20px', marginBottom: '20px' }}>
      <Typography variant="h5" gutterBottom>
        Add Transaction
      </Typography>
      {error && <Alert severity="error">{error}</Alert>}
      <form onSubmit={handleSubmit} noValidate autoComplete="off">
        <TextField
          label="Description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          fullWidth
          margin="normal"
        />
        <TextField
          label="Amount"
          type="number"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
          fullWidth
          margin="normal"
        />
        <TextField
          label="From (User Name)"
          value={from}
          onChange={(e) => setFrom(e.target.value)}
          fullWidth
          margin="normal"
        />
        <Button type="submit" variant="contained" color="primary" style={{ marginTop: '20px' }}>
          Add Transaction
        </Button>
      </form>
    </Paper>
  );
};

export default AddTransactionForm;
