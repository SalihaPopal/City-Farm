import React, { useState } from 'react';
import axios from 'axios';

function SessionClaim({ Session_id }) {
  const [claimed, setClaimed] = useState(false);

  const claimSession = () => {
    // Make a POST request to claim the session
    axios.post(`https://business-problem-city-farm-server.onrender.com/Sessions/${Session_id}/claim`).then(() => {
      setClaimed(true);
    });
  };

  return (
    <div>
      <button onClick={claimSession} disabled={claimed}>
        {claimed ? 'Claimed' : 'Claim'}
      </button>
    </div>
  );
}

export default SessionClaim;
