import React from 'react';
import { List, ListItem, ListItemText, Typography } from '@mui/material';

const UserList = ({ users }) => {

  return (
    <div>
      <Typography variant="h4" gutterBottom>
        Users
      </Typography>
      <List>
        {users.map(user => (
          <ListItem key={user.id}>
            <ListItemText 
              primary={`${user.name} - ${user.balance > 0 ? `owes: ${user.balance}` : `owed: ${Math.abs(user.balance)}`}`} 
            />
          </ListItem>
        ))}
      </List>
    </div>
  );
};

export default UserList;
