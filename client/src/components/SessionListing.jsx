import React, { useState, useEffect } from 'react';
import axios from 'axios';

function SessionListing() {
  const [sessions, setSessions] = useState([]);

  useEffect(() => {
   
    axios.get('https://city-farm-back-end.onrender.com/Sessions').then((response) => {
      setSessions(response.data);
    });
  }, []); 

  const claimSession = (Session_id) => {
   
    axios.post(`https://city-farm-back-end.onrender.com/Sessions/${Session_id}/claim`).then(() => {
     
      setSessions((prevSessions) => {
        return prevSessions.map((session) => {
          if (session.id === Session_id) {
            return { ...session, claimed: true };
          }
          return session;
        });
      });
    });
  };

  return (
    <div>
      <h2>Available Sessions</h2>
      <ul>
        {sessions.map((session) => (
          <li key={session.id}>
            {session.date}, {session.time}
            {!session.claimed ? (
              <button onClick={() => claimSession(session.id)}>Claim</button>
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

