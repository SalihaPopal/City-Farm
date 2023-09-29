import React, { useState, useEffect } from 'react';
import axios from 'axios';

function VolunteerDashboard() {
  const [availableSessions, setAvailableSessions] = useState([]);

  useEffect(() => {
    // Fetch available sessions from the backend when the component mounts
    axios.get('/api/sessions/available').then((response) => {
      setAvailableSessions(response.data);
    });
  }, []);

  const claimSession = (session_id) => {
    // Make a POST request to claim the session
    axios.post(`/api/sessions/claim/${session_id}`).then(() => {
      // Update the state to remove the claimed session
      setAvailableSessions((prevSessions) =>
        prevSessions.filter((session) => session.session_id !== session_id)
      );
    });
  };

  return (
    <div>
      <h2>Available Sessions</h2>
      <ul>
        {availableSessions.map((session) => (
          <li key={session.session_id}>
            {sessions.session_date} at {session.session_time}
            <button onClick={() => claimSession(session.session_id)}>
              Claim
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default VolunteerDashboard;
