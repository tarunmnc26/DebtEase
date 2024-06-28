// src/components/TransactionHistory.js
import React from 'react';
import { List, ListItem, ListItemText, Typography, Paper } from '@mui/material';

const TransactionHistory = ({ transactions }) => {
  return (
    <Paper elevation={3} style={{ padding: '20px', marginBottom: '20px' }}>
      <Typography variant="h5" gutterBottom>
        Transaction History
      </Typography>
      <List>
        {transactions.map(transaction => (
          <ListItem key={transaction.id}>
            <ListItemText primary={`${transaction.description} - ₹${transaction.amount}`} />
          </ListItem>
        ))}
      </List>
    </Paper>
  );
};

export default TransactionHistory;
