import React, { useState, useEffect } from 'react';
import './App.css'
import axios from 'axios';

function SessionListing() {
  const [sessions, setSessions] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
   
    axios
      .get('http://localhost:5ooo/sessions') 
      .then((response) => {
        setSessions(response.data);
      })
      .catch((error) => {
        setError('An error occurred while fetching sessions.');
      });
  }, []);

  const claimSession = async (session_id) => {
    try {

      await axios.post(`http://localhost:5ooo/sessions/claim-session/${session_id}`); 
      setSessions((prevSessions) => {
        return prevSessions.map((session) => {
          if (session.session_id === session_id) {
            return { ...session, claimed: true };
          }
          return session;
        });
      });
    } catch (error) {
      console.error('Error claiming session:', error);
      setError('An error occurred while claiming the session.');
    }
  };

  return (
    <div>
      <h2>Claimed Sessions</h2>
      {error && <p>Error: {error}</p>}
      <ul>
        {sessions.map((session) => (
          <li key={sessions.session_id}>
            {sessions.session_date}, {sessions.session_time}
            {!session.claimed ? (
              <button 
              onClick={() => claimSession(sessions.session_id)}>
                {sessions.claimed ? 'Claimed' : 'Claim'}
              </button>
            ) : (
              <span>Claimed</span>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default SessionListing;
