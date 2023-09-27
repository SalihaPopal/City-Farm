// import React, { useState, useEffect } from 'react';
// import axios from 'axios';

// function SessionListing() {
//   const [Sessions, setSessions] = useState([]);

//   useEffect(() => {
  
//     axios.get('/api/Sessions').then((response) => {
//       setSessions(response.data);
//     });
//   }, []);

//   function SessionClaim({ Session_id }) {
  
//   }
//   return (
//     <div>
//       <h2>Available Sessions</h2>
//       <ul>
//         {Sessions.map((session) => (
//           <li key={session.id}>
//             {session.date}, {session.time}
//             <button onClick={() => SessionClaim(session.id)}>Claim</button>
//           </li>
//         ))}
//       </ul>
//     </div>
//   );
// }

// export default SessionListing;



// // import React, { useState, useEffect } from 'react';
// // import axios from 'axios';

// // function SessionListing() {
// //   const [Sessions, setSessions] = useState([]);
// //   const [claimed, setClaimed] = useState(false);

// //   const claimSession = (Session_id) => {
// //     // Make a POST request to claim the session
// //     axios.post(`/api/Sessions/${Session_id}/claim`).then(() => {
// //       setClaimed(true);
// //     });
// //   };

// //   useEffect(() => {
// //     axios.get('/api/Sessions').then((response) => {
// //       setSessions(response.data);
// //     });
// //   }, []);

// //   return (
// //     <div>
// //       <h2>Available Sessions</h2>
// //       <ul>
// //         {Sessions.map((session) => (
// //           <li key={session.id}>
// //             {session.date}, {session.time}
// //             <button onClick={() => claimSession(session.id)}>Claim</button>
// //           </li>
// //         ))}
// //       </ul>
// //     </div>
// //   );
// // }

// // export default SessionListing;


import React, { useState, useEffect } from 'react';
import axios from 'axios';

function SessionListing() {
  const [sessions, setSessions] = useState([]);

  useEffect(() => {
   
    axios.get('/api/Sessions').then((response) => {
      setSessions(response.data);
    });
  }, []); 

  const claimSession = (sessionId) => {
   
    axios.post(`/api/Sessions/${sessionId}/claim`).then(() => {
     
      setSessions((prevSessions) => {
        return prevSessions.map((session) => {
          if (session.id === sessionId) {
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

