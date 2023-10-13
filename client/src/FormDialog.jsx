import React, { useState } from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';

export default function FormDialog({session, onClose, onBookSession}) {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [volunteers, setVolunteers] = useState([]);
  const [confirmationMessage, setConfirmationMessage] = useState('');

  const handleSubmit = () => {
    if (name.trim() === '' || email.trim() === '' || phone.trim() === '') {
      alert('Error, Please provide all the required information.');
      return;
    }
  
    // Check if a volunteer with the same name already exists
    const existingVolunteer = volunteers.find((volunteer) => volunteer.name === name);
    if (existingVolunteer) {
      alert('Error, A volunteer with the same name already exists.');
      return;
    }

    const newVolunteer = {
      name,
      email,
      phone,
    };

    setVolunteers([...volunteers, newVolunteer]);

 // Clear the form fields
    setName('');
    setEmail('');
    setPhone('');
  };

  return (
    <div>
       <Dialog open={true} onClose={onClose}>
      <DialogTitle>Book the Session</DialogTitle>
      <DialogContent>
        <DialogContentText>
          To book the selected session, please enter your information here.
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
        <TextField
          autoFocus
          margin="dense"
          id="email"
          label="Email Address"
          type="email"
          fullWidth
          variant="standard"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <TextField
          autoFocus
          margin="dense"
          id="phone"
          label="Phone Number"
          type="text"
          fullWidth
          variant="standard"
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
        />
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose}>Cancel</Button>
        <Button onClick={handleSubmit}>Submit</Button>
      </DialogActions>
    </Dialog>

      {confirmationMessage && (
        <div className="confirmation-message">{setConfirmationMessage}</div>
      )}

      <ul>
        {volunteers.length > 0 ? (
          volunteers.map((volunteer, index) => (
            <li key={index}>
              {volunteers.name}  {volunteer.email}, {volunteer.phone}
            </li>
          ))
        ) : (
          <p>No volunteers added yet.</p>
        )}
      </ul>
    </div>
  );
}









