// src/components/GroupList.js
import React from 'react';
import { List, ListItem, ListItemText, ListItemSecondaryAction, IconButton, Typography ,Box} from '@mui/material';
import {Delete , Group } from '@mui/icons-material';

const GroupList = ({ groups, onSelectGroup, onDeleteGroup }) => {
  const handleDelete = (groupId) => {
    onDeleteGroup(groupId);
  };

  return (
    <>
      <Typography variant="h5" gutterBottom>
      <Box display="flex" alignItems="center">
        Groups
        <Group fontSize="large" style={{ marginLeft: '10px' }} />
      </Box>
    </Typography>
      <List component="nav">
        {groups.map(group => (
          <ListItem button key={group.id} onClick={() => onSelectGroup(group.id)}>
            <ListItemText primary={group.name} />
            <ListItemSecondaryAction>
              <IconButton edge="end" aria-label="delete" onClick={() => handleDelete(group.id)}>
                <Delete />
              </IconButton>
            </ListItemSecondaryAction>
          </ListItem>
        ))}
      </List>
    </>
  );
};

export default GroupList;
