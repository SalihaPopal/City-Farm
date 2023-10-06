import React, { useState } from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';

export default function FormDialog({ session, onClose, onBookSession }) {
  const [name, setName] = useState('');
 
  
  const handleSubmit = () => {
    console.log('hi')
    if (name.trim() === '') {
      alert('Error, Please provide your name.');
      return;
    }

    onBookSession(session);
    onClose();
  };

  return (
    <div>
      <Dialog open={true} onClose={onClose}>
        <DialogTitle>Book the Session</DialogTitle>
        <DialogContent>
          <DialogContentText>
            To book the selected session, please enter your name here.
          </DialogContentText>
          <TextField
            autoFocus
            margin="dense"
            id="name"
            label="Name"
            type="text"
            fullWidth
            variant="standard"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={onClose}>Cancel</Button>
          <Button onClick={handleSubmit}>Submit</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}


