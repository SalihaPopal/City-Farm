import React, { useState } from 'react';

import axios from 'axios';

function SessionClaim({ session_id }) {
  const [claimed, setClaimed] = useState(false);
  const [error, setError] = useState([]);

  const handleClaimSession = async () => {
    try {
      
      await axios.post(`http://localhost:5ooo/sessions/claim-session/${session_id}`);
      setClaimed(true);
    } catch (error) {
      setError('An error occurred while claiming the session');
    }
  };

  return (
    <div>
      {error && <p>Error: {error}</p>}
      <button onClick={handleClaimSession} disabled={claimed}>
        {claimed ? 'Claimed' : 'Claim'}
      </button>
    </div>
  );
}

export default SessionClaim;
