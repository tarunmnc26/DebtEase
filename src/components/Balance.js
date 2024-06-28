// src/components/Balance.js
import React from 'react';
import { Typography, Paper } from '@mui/material';

const Balance = ({ user }) => {
  return (
    <Paper elevation={3} style={{ padding: '20px', marginBottom: '20px' }}>
      <Typography variant="h5">
        {user.name}'s Balance
      </Typography>
      <Typography variant="h6">
        ${user.balance}
      </Typography>
    </Paper>
  );
};

export default Balance;
