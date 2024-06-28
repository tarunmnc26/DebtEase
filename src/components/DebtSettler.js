// src/components/DebtSettler.js
import React from 'react';
import { List, ListItem, ListItemText, Typography, Paper } from '@mui/material';

const DebtSettler = ({ settlements }) => {
  return (
    <Paper elevation={3} style={{ padding: '20px', marginBottom: '20px' }}>
      <Typography variant="h5" gutterBottom>
        Debt Settlements
      </Typography>
      <List>
        {settlements.map(settlement => (
          <ListItem key={settlement.id}>
            <ListItemText primary={`${settlement.from}  ---->  ${settlement.to} ₹${settlement.amount}`} />
          </ListItem>
        ))}
      </List>
    </Paper>
  );
};

export default DebtSettler;
