import React, { useState, useEffect } from 'react';
import Button from '@mui/material/Button';
import './App.css';
import FormDialogue from './FormDialogue'; // Import the FormDialogue component from the correct path

function SessionBooking() {
  const [sessions, setSessions] = useState([]);
  const [error, setError] = useState(null);
  const [isFormDialogueOpen, setIsFormDialogueOpen] = useState(false); // State for dialog visibility

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('https://city-farm-back-end.onrender.com/sessions',{
          method: 'GET',
        });
        if (!response.ok) {
          throw new Error(`Failed to fetch. Error: ${response.status}`);
        }
        const data = await response.json();
        setSessions(data.sessions);
      } catch (error) {
        setError('An error occurred while fetching sessions.');
      }
    };

    fetchData();
  }, []); // Fetch data only once when the component mounts

  const handleBookSession = async (session_id) => {
    try {
      const response = await fetch(`https://city-farm-back-end.onrender.com/sessions/${session_id}`, {
        method: 'POST',
      });

      if (!response.ok) {
        throw new Error('Network response was not ok');
      }

      // Update the session status as 'Booked'
      setSessions((prevSessions) =>
        prevSessions.map((session) => {
          if (session.session_id === session_id) {
            return { ...session, status: 'Booked' };
          }
          return session;
        })
      );
    } catch (error) {
      console.error('Error booking session:', error);
      setError('An error occurred while booking the session.');
    }
  };

  // Event handler to open the dialog for morning sessions
  const handleOpenMorningDialog = () => {
    setIsFormDialogueOpen(true);
  };

  // Event handler to open the dialog for evening sessions
  const handleOpenEveningDialog = () => {
    setIsFormDialogueOpen(true);
  };

  // Event handler to close the dialog
  const handleCloseDialogue = () => {
    setIsFormDialogueOpen(false);
  };

  return (
    <div>
      <h2 className="h2">Claimed Sessions</h2>
      {error && <p className="p">Error: {error}</p>}
      <div>
        <Button variant="contained" color="primary" onClick={handleOpenMorningDialog}>
          Morning
        </Button>
        <Button variant="contained" color="primary" onClick={handleOpenEveningDialog}>
          Evening
        </Button>
      </div>
      <ul>
        {sessions.map((session) => (
          <li key={sessions.session_id}>
            {sessions.session_date}, {session.session_time},
            {!sessions.session_status ? (
              <button
                variant="contained"
                color="primary"
                onClick={() => handleBookSession(session.session_id)}
              >
                Book
              </button>
            ) : (
              <span>Booked</span>
            )}
          </li>
        ))}
      </ul>
      {isFormDialogueOpen && <FormDialogue session={{ session_id: 'sessions.session_id' }} onClose={handleCloseDialogue} onBookSession={handleBookSession}
 />}
    </div>
  );
}

export default SessionBooking;

