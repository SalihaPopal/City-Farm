// import React, { useState, useEffect } from 'react';
// import Button from '@mui/material/Button';
// import FormDialog from './FormDialog';
// import './App.css';

// function SessionBooking() {
//   const [sessions, setSessions] = useState([]);
//   const [error, setError] = useState(null);
//   const [isFormDialogOpen, setIsFormDialogOpen] = useState(false);

//   useEffect(() => {
//     const fetchData = async () => {
//       try {
//         const response = await fetch('http://localhost:5000/sessions', {
//           method: 'GET',
//         });
//         if (!response.ok) {
//           throw new Error(`Failed to fetch. Error: ${response.status}`);
//         }
//         const data = await response.json();
//         setSessions(data.sessions);
//       } catch (error) {
//         setError('An error occurred while fetching sessions.');
//       }
//     };

//     fetchData();
//   }, []);

//   const handleBookSession = async (session_id) => {
//     try {
//       const response = await fetch(`http://localhost:5000/sessions`, {
//         method: 'POST',
//         headers: { 'Content-Type': 'application/json' },
//         body: JSON.stringify({ title: 'React POST Request Example' }),
//       });

//       if (!response.ok) {
//         throw new Error('Network response was not ok');
//       }

//       // Update the session status as 'Booked'
//       setSessions((prevSessions) =>
//         prevSessions.map((session) => {
//           if (session.session_id === session_id) {
//             return { ...session, session_status: 'Booked' }; // Fix the status property name
//           }
//           return session;
//         })
//       );
//     } catch (error) {
//       console.error('Error booking session:', error);
//       setError('An error occurred while booking the session.');
//     }
//   };

//   const handleOpenMorningDialog = () => {
//     setIsFormDialogOpen(true);
//   };

//   const handleOpenEveningDialog = () => {
//     setIsFormDialogOpen(true);
//   };

//   const handleCloseDialog = () => {
//     setIsFormDialogOpen(false);
//   };

//   return (
//     <div>
//       <h2 className="h2">Claimed Sessions</h2>
//       {error && <p className="p">Error: {error}</p>}
//       <div className='btn'>
//         <Button className='mor-btn' variant="contained" color="primary" onClick={handleOpenMorningDialog}>
//           Morning
//         </Button>
//         <Button className='eve-btn' variant="contained" color="primary" onClick={handleOpenEveningDialog}>
//           Evening
//         </Button>
//       </div>

// {isFormDialogOpen && (
//   <FormDialog
//     sessions={sessions}
//     onClose={handleCloseDialog}
//     onBookSession={handleBookSession} // Pass the function here
//   />

// )}
//     </div>
//   );
// }

// export default SessionBooking;









import React, { useState, useEffect } from 'react';
import Button from '@mui/material/Button';
import FormDialog from './FormDialog';

function SessionBooking({ onBookSession }) {
  const [sessions, setSessions] = useState([]);
  const [error, setError] = useState(null);
  const [isFormDialogOpen, setIsFormDialogOpen] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('http://localhost:5000/sessions', {
          method: 'GET',
        });
        if (!response.ok) {
          throw new Error(`Failed to fetch. Error: ${response.status}`);
        }
        const data = await response.json();
        setSessions(data);
      } catch (error) {
        setError('An error occurred while fetching sessions.');
      }
    };

    fetchData();
  }, []);

  const handleBookSession = async (session_id) => {
    try {
      const response = await fetch(`http://localhost:5000/sessions/book-session`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ session_id }),
      });

      if (!response.ok) {
        throw new Error('Network response was not ok');
      }

      // Update the session status as 'Booked'
      setSessions((prevSessions) =>
        prevSessions.map((session) => {
          if (session.session_id === session_id) {
            return { ...session, session_status: 'Booked' };
          }
          return session;
        })
      );
    } catch (error) {
      console.error(error);
      setError('An error occurred while booking the session.');
    }
  };

  const handleOpenMorningDialog = () => {
    setIsFormDialogOpen(true);
  };

  const handleOpenEveningDialog = () => {
    setIsFormDialogOpen(true);
  };

  const handleCloseDialog = () => {
    setIsFormDialogOpen(false);
  };

  return (
    <div>
      {sessions.map((session) => (
        <div key={session.session_id}>
          <Button
            variant="contained"
            color="primary"
            onClick={() => handleBookSession(session.session_id)}
          >
            Book Session {session.session_id}
          </Button>
        </div>
      ))}

      <h2 className="h2">Claimed Sessions</h2>
      {error && <p className="p">Error: {error}</p>}
      <div className="btn">
        <Button
          className="mor-btn"
          variant="contained"
          color="primary"
          onClick={handleOpenMorningDialog}
        >
          Morning
        </Button>
        <Button
          className="eve-btn"
          variant="contained"
          color="primary"
          onClick={handleOpenEveningDialog}
        >
          Evening
        </Button>
      </div>

      {isFormDialogOpen && (
        <FormDialog
          onClose={handleCloseDialog}
          onBookSession={handleBookSession}
        />
      )}
    </div>
  );
}

export default SessionBooking;
