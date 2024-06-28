import React, { useState } from 'react';
import { TextField, Button, Paper, Typography, List, ListItem, IconButton } from '@mui/material';
import { Add as AddIcon, Clear, Person } from '@mui/icons-material';

const AddGroupForm = ({ addGroup }) => {
  const [groupName, setGroupName] = useState('');
  const [userName, setUserName] = useState('');
  const [users, setUsers] = useState([]);
  const [groupError, setGroupError] = useState('');
  const [userError, setUserError] = useState('');

  const handleAddUser = () => {
    if (userName.trim() === '') {
      setUserError('User name cannot be empty');
      return;
    }
    if (users.some(user => user.name === userName.trim())) {
      setUserError('User name already exists in the group');
      return;
    }
    setUsers([...users, { id: users.length + 1, name: userName.trim(), balance: 0 }]);
    setUserName('');
    setUserError('');
  };

  const handleRemoveUser = (userId) => {
    setUsers(users.filter(user => user.id !== userId));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (groupName.trim() === '') {
      setGroupError('Group name cannot be empty');
      return;
    }
    if (users.length === 0) {
      setGroupError('Group must have at least one user');
      return;
    }
    addGroup(groupName.trim(), users);
    setGroupName('');
    setUsers([]);
    setGroupError('');
  };

  return (
    <>
      <Paper elevation={3} style={{ padding: '20px', marginBottom: '20px' }}>
        <Typography variant="h5" gutterBottom align='center'>
          Add New Group
        </Typography>
        <form onSubmit={handleSubmit} noValidate autoComplete="off">
          <TextField
            label="Group Name"
            value={groupName}
            onChange={(e) => setGroupName(e.target.value)}
            fullWidth
            margin="normal"
            error={!!groupError}
            helperText={groupError}
          />
          
          <Typography variant="h6" gutterBottom align='center' paddingTop={'10px'}>
            Add Users
          </Typography>
          <TextField
            label="User Name"
            value={userName}
            onChange={(e) => setUserName(e.target.value)}
            fullWidth
            margin="normal"
            error={!!userError}
            helperText={userError}
          />
          <div align='center'>
            <Button variant="contained" color="primary" onClick={handleAddUser} style={{ marginTop: '10px', marginBottom: '20px' }}>
              <AddIcon /> Add User
            </Button>
          </div>
          
          <List>
            {users.map(user => (
              <ListItem key={user.id}>
                <Person />
                {user.name}
                <IconButton edge="end" aria-label="delete" onClick={() => handleRemoveUser(user.id)}>
                  <Clear />
                </IconButton>
              </ListItem>
            ))}
          </List>
          <div align="center">
            <Button align='center' type="submit" variant="contained" color="primary" style={{ marginTop: '20px' }}>
              Add Group
            </Button>
          </div>
        </form>
      </Paper>
    </>
  );
};

export default AddGroupForm;
