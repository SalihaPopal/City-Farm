// import React, {useState} from 'react';
// import Button from '@mui/material/Button';
// import TextField from '@mui/material/TextField';
// import Dialog from '@mui/material/Dialog';
// import DialogActions from '@mui/material/DialogActions';
// import DialogContent from '@mui/material/DialogContent';
// import DialogContentText from '@mui/material/DialogContentText';
// import DialogTitle from '@mui/material/DialogTitle';

// export default function FormDialog(session, onsubmit) {
//   const [open, setOpen] = React.useState(false);
//   const [name, setName] = useState("");

//   const handleClickOpen = () => {
//     setOpen(true);
//   };

//   const handleClose = () => {
//     setOpen(false);
//   };

//   const handleSubmit = () => {
//     if (name.trim() === "") {
//       alert("Error, Please provide your name.");
//       return;
//     }

//     onBookSession(session.session_id);
    
    
//     setOpen(false);
//   }

//   return (
//     <div>
//       <Button variant="outlined" onClick={handleClickOpen}>
//         Book A Session
//       </Button>
//       <Dialog open={open} onClose={handleClose}>
//         <DialogTitle>Book the Session</DialogTitle>
//         <DialogContent>
//           <DialogContentText>
//           To book the session, please enter your name here. We
//             will send updates occasionally.
//           </DialogContentText>
//           <TextField
//             autoFocus
//             margin="dense"
//             id="name"
//             label="Name"
//             type="text"
//             fullWidth
//             variant="standard"
//             value={name}
//             onChange={(e) => setName(e.target.value)}
//           />
//         </DialogContent>
//         <DialogActions>
//           <Button onClick={handleClose}>Cancel</Button>
//           <Button onClick={handleSubmit}>Book</Button>
//         </DialogActions>
//       </Dialog>
//     </div>
//   );
// }






import React, { useState } from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';

export default function FormDialog({ sessions, onClose, onBookSession }) {
  const [name, setName] = useState('');

  const handleSubmit = () => {
    if (name.trim() === '') {
      alert('Error, Please provide your name.');
      return;
    }

    // Call the function to book the session
    onBookSession(sessions.session_id);

    // Close the dialog
    onClose();
  };

  return (
    <div>
      <Dialog open={true} onClose={onClose}>
        <DialogTitle>Book the Session</DialogTitle>
        <DialogContent>
          <DialogContentText>
            To book the session, please enter your name here. We will send updates occasionally.
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
