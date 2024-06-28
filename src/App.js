import React, { useState, useEffect } from 'react';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import GroupList from './components/GroupList';
import UserList from './components/UserList';
import TransactionHistory from './components/TransactionHistory';
import DebtSettler from './components/DebtSettler';
import AddTransactionForm from './components/AddTransactionForm';
import AddGroupForm from './components/AddGroupForm';
import { Container, Grid, Paper, Typography, Button } from '@mui/material';

const darkTheme = createTheme({
  palette: {
    mode: 'dark',
    background: {
      default: '#121212',
      paper: '#1d1d1d',
    },
    primary: {
      main: '#0080ff',
    },
    secondary: {
      main: '#730099',
    },
    text: {
      primary: '#ffffff',
      secondary: '#b0b0b0',
    },
  },
});

const App = () => {
  const [groups, setGroups] = useState(() => {
    const storedGroups = localStorage.getItem('groups');
    return storedGroups ? JSON.parse(storedGroups) : [];
  });
  const [selectedGroup, setSelectedGroup] = useState(null);

  useEffect(() => {
    localStorage.setItem('groups', JSON.stringify(groups));
  }, [groups]);

  const handleSelectGroup = (groupId) => {
    const group = groups.find(group => group.id === groupId);
    setSelectedGroup(group);
  };

  const addGroup = (groupName, users) => {
    const newGroup = {
      id: groups.length + 1,
      name: groupName,
      users: users.map(user => ({ ...user, balance: 0 })),
      transactions: [],
    };
    setGroups([...groups, newGroup]);
  };

  const addTransaction = (groupId, transaction) => {
    const updatedGroups = groups.map(group => {
      if (group.id === groupId) {
        const updatedUsers = group.users.map(user => {
          if (user.name === transaction.from) {
            return { 
              ...user, 
              balance: Math.round((user.balance - (group.users.length-1) * transaction.amount / group.users.length) * 100) / 100 
            };
          }
          return { 
            ...user, 
            balance: Math.round((user.balance + transaction.amount / group.users.length) * 100) / 100 
          };
        });

        return {
          ...group,
          transactions: [...group.transactions, transaction],
          users: updatedUsers,
        };
      }
      return group;
    });

    setGroups(updatedGroups);
    if (selectedGroup && selectedGroup.id === groupId) {
      setSelectedGroup(updatedGroups.find(group => group.id === groupId));
    }
  };

  const calculateSettlements = (users) => {
    const balances = users.map(user => ({ name: user.name, balance: user.balance }));
    
    const positive = balances.filter(u => u.balance > 0);
    const negative = balances.filter(u => u.balance < 0);

    positive.sort((a, b) => b.balance - a.balance);
    negative.sort((a, b) => a.balance - b.balance);

    const settlements = [];

    let i = 0, j = 0;

    while (i < positive.length && j < negative.length) {
      const amount = Math.min(positive[i].balance, -negative[j].balance);

      settlements.push({
        id: settlements.length + 1,
        from: positive[i].name,
        to: negative[j].name,
        amount: Math.round(amount * 100) / 100,
      });

      positive[i].balance = Math.round((positive[i].balance - amount) * 100) / 100;
      negative[j].balance = Math.round((negative[j].balance + amount) * 100) / 100;

      if (positive[i].balance === 0) i++;
      if (negative[j].balance === 0) j++;
    }

    return settlements;
  };

  const settleDebts = () => {
    const updatedGroups = groups.map(group => {
      const settledUsers = group.users.map(user => ({ ...user, balance: 0 }));
      return { ...group, users: settledUsers };
    });

    setGroups(updatedGroups);
    setSelectedGroup(null);
  };

  const deleteGroup = (groupId) => {
    const updatedGroups = groups.filter(group => group.id !== groupId);
    setGroups(updatedGroups);
    setSelectedGroup(null);
  };

  return (
    <ThemeProvider theme={darkTheme}>
      <Container>
        <Typography align='center' variant="h3" gutterBottom>
          DebtEase App
        </Typography>
        <Grid container spacing={3}>
          <Grid item xs={12} md={4}>
            <Paper elevation={3} style={{ padding: '20px' }}>
              <GroupList groups={groups} onSelectGroup={handleSelectGroup} onDeleteGroup={deleteGroup} />
              <AddGroupForm addGroup={addGroup} />
            </Paper>
          </Grid>
          <Grid item xs={12} md={8}>
            {selectedGroup && (
              <>
                <Paper elevation={3} style={{ padding: '20px', marginBottom: '20px' }}>
                  <UserList users={selectedGroup.users} />
                </Paper>
                <TransactionHistory transactions={selectedGroup.transactions} />
                <AddTransactionForm groupId={selectedGroup.id} addTransaction={addTransaction} groupUsers={selectedGroup.users} />
                <DebtSettler settlements={calculateSettlements(selectedGroup.users)} />
                <div align='center'>
                <Button
                  variant="contained"
                  color="secondary"
                  onClick={settleDebts}
                  style={{ marginTop: '20px', marginBottom :'30px' }}
                >
                  Settle Debts and Reset Balances
                </Button>
                </div>
              </>
            )}
          </Grid>
        </Grid>
      </Container>
    </ThemeProvider>
  );
};

export default App;
