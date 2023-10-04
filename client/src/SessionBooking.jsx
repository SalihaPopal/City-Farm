// import React, { useState, useEffect } from 'react';
// import Button from '@mui/material/Button';
// import './App.css';
// import FormDialogue from './FormDialogue'; // Import the FormDialogue component from the correct path

// function SessionBooking() {
//   const [sessions, setSessions] = useState([]);
//   const [error, setError] = useState(null);
//   const [sessionStatus, setSessionStatus] = useState(false);
//   const [isFormDialogueOpen, setIsFormDialogueOpen] = useState(false); // State for dialog visibility

//   useEffect(() => {
//     const fetchData = async () => {
//       try {
//         const response = await fetch('https://city-farm-back-end.onrender.com/sessions');
//         if (!response.ok) {
//           throw new Error(`Failed to fetch. Error: ${response.status}`);
//         }
//         const data = await response.json();
//         setSessions(data);
//       } catch (error) {
//         setError('An error occurred while fetching sessions.');
//       }
//     };

//     fetchData();
//   }, [sessionStatus]);

//   const bookedSession = async (session_id) => {
//     try {
//     const requestOptions = {
//       method: 'POST',
//       headers: { 'Content-Type': 'application/json' },
//       body: JSON.stringify({ title: 'React POST Request Example' })
//     }
//         const response = await fetch(`https://city-farm-back-end.onrender.com/sessions/${session_id}`, requestOptions);
//     const data = await response.json();
//     this.setState({ postId: data.id });
//     }
//     catch (error) {
//       console.error('Error booking session:', error);
//     }

//     async function bookSession(session_id) {
//       try {
//         const response = await fetch(`https://city-farm-back-end.onrender.com/sessions/${session_id}`, {
//           method: 'POST',
//         });
    
//         if (!response.ok) {
//           throw new Error('Network response was not ok');
//         }
    
//         // Assuming that the session data includes a 'claimed' field
//         // Update the session in your state to mark it as claimed
//         setSessions((prevSessions) =>
//           prevSessions.map((session) => {
//             if (session.session_id === session_id) {
//               return { ...session, claimed: true };
//             }
//             return session;
//           })
//         );
//       } catch (error) {
//         console.error('Error booking session:', error);
//         setError('An error occurred while booking the session.');
//       }
//     }
    


//   const filterSessions = (period) => {
//     if (period === 'Morning') {
//       return sessions.filter((session) => {
//         const sessionTime = parseInt(session.session_time.split(':')[0]);
//         return sessionTime < 12;
//       });
//     } else if (period === 'Evening') {
//       return sessions.filter((session) => {
//         const sessionTime = parseInt(session.session_time.split(':')[0]);
//         return sessionTime >= 12;
//       });
//     }
//     return sessions; // Default to showing all sessions
//   };

//   // Event handler to open the dialog for morning sessions
//   const handleOpenMorningDialog = () => {
//     setSessions(filterSessions('Morning')); // Update the session list based on morning sessions
//     setIsFormDialogueOpen(true);
//   };

//   // Event handler to open the dialog for evening sessions
//   const handleOpenEveningDialog = () => {
//     setSessions(filterSessions('Evening')); // Update the session list based on evening sessions
//     setIsFormDialogueOpen(true);
//   };

//   // Event handler to close the dialog
//   const handleCloseDialog = () => {
//     setIsFormDialogueOpen(false);
//   };

//   return (
//     <div>
//       <h2 className="h2">Claimed Sessions</h2>
//       {error && <p className="p">Error: {error}</p>}
//       <div>
//         {/* <Button variant="contained" color="primary" onClick={() => setSessionStatus(!sessionStatus)}>
//           Cancel Sessions
//         </Button> */}
//         <Button variant="contained" color="primary" onClick={handleOpenMorningDialog}>
//           Morning
//         </Button>
//         <Button variant="contained" color="primary" onClick={handleOpenEveningDialog}>
//           Evening
//         </Button>
//       </div>
//       <ul>
//         {sessions.map((session) => (
//           <li key={session.session_id}>
//             {session.session_date}, {session.session_time}
//             {/* {!session.claimed ? ( */}
//               {!session.status ? (
//               <button
//                 variant="contained"
//                 color="primary"
//                 onClick={() => bookedSession(sessions.session_id)}
//               >
//                 {sessions.status ? 'Booked' : 'Book'}
//               </button>
//             ) : (
//               <span>Booked</span>
//             )}
//           </li>
//         ))}
//       </ul>
//       {/* Conditionally render the FormDialogue component based on state */}
//       {isFormDialogueOpen && <FormDialogue onClose={handleCloseDialog} />}
//     </div>
//   );
// }

// export default SessionBooking;





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
        const response = await fetch('https://city-farm-back-end.onrender.com/sessions');
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
          <li key={session.session_id}>
            {sessions.session_date}, {session.session_time}
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
      {/* Conditionally render the FormDialogue component based on state */}
      {isFormDialogueOpen && <FormDialogue session={{ session_id: 'sessions.session_id' }} onClose={handleCloseDialogue} onBookSession={handleBookSession}
 />}
    </div>
  );
}

export default SessionBooking;






// import React, { useState, useEffect } from 'react';
// import Button from '@mui/material/Button';
// import './App.css';
// import FormDialog from './FormDialogue'; // Import the FormDialog component from the correct path

// function SessionBooking() {
//   const [sessions, setSessions] = useState([]);
//   // const [error, setError] = useState(null);
//   const [sessionStatus, setSessionStatus] = useState(false);
//   const [isFormDialogOpen, setIsFormDialogOpen] = useState(false); // State for dialog visibility
//   const [selectedSession, setSelectedSession] = useState(null); // State to store the selected session
//   const [conformBooking, setConformBooking] = useState(false);

//   // useEffect(() => {
//   //   const fetchData = async () => {
//   //     try {
//   //       const response = await fetch('https://city-farm-back-end.onrender.com/sessions');
//   //       if (!response.ok) {
//   //         throw new Error(`Failed to fetch. Error: ${response.status}`);
//   //       }
//   //       const data = await response.json();
//   //       setSessions(data);
//   //     } catch (error) {
//   //       // setError('An error occurred while fetching sessions.');
//   //       console.log(error);
//   //     }
//   //   };

//   //   fetchData();
//   // }, [sessionStatus]);

//   useEffect(() => {
//     fetch("https://city-farm-back-end.onrender.com/sessions", 
//     {method:"GET"})
//     .then((response) => response.json())
//     .then((data)=>{
//       setSessions(data.sessions);
//     }).catch((error)=>console.log(error));

//   }, []);

//   const bookingStatus = async (session_id) =>{
//     try{
//       const fetchedURL = "https://city-farm-back-end.onrender.com/sessions/${session_id}";
//       const response = await fetch(fetchedURL, {
//         method: "PUT"
//       });
//       const result = await response.json();
//       setConformBooking(true);
//       console.log(result);
//   }catch(e) {
//     console.log(e);
//   }
// }

//   const bookedSession = async (session_id) => {
//     try {
//       const response = await fetch(`https://city-farm-back-end.onrender.com/sessions/${session_id}`, {
//         method: 'POST',
//       });

//       if (!response.ok) {
//         throw new Error('Network response was not ok');
//       }

//       setSessions((prevSessions) => {
//         return prevSessions.map((session) => {
//           if (session.session_id === session_id) {
//             return { ...session, status: 'Booked' };
//           }
//           return session;
//         });
//       });
//     } catch (error) {
//       console.error('Error booking session:', error);
//       // setError('An error occurred while booking the session.');
//       console.log("hi");
//     }
//   };

//   const handleOpenFormDialog = (session) => {
//     setSelectedSession(session);
//     setIsFormDialogOpen(true);
//   };

//   const handleCloseFormDialog = () => {
//     setIsFormDialogOpen(false);
//   };

//   return (
//     <div>
//       <h2 className="h2">Claimed Sessions</h2>
//       {/* {error && <p className="p">Error: {error}</p>} */}
//       <div>
//         <Button variant="contained" color="primary" onClick={() => setSessionStatus(!sessionStatus)}>
//           Toggle Sessions
//         </Button>
//       </div>
//       <ul>
//         {sessions.map((session) => (
//           <li key={session.session_id}>
//             {session.session_date}, {session.session_time}
//             {/* {!session.claimed ? ( */}
//               {!session.status ? (
//               <button
//                 variant="contained"
//                 color="primary"
//                 onClick={() => bookedSession(sessions.session_id)}
//               >
//                 {sessions.status ? 'Booked' : 'Book'}
//               </button>
//             ) : (
//               <span>Booked</span>
//             )}
//           </li>
//         ))}
//       </ul>
//       {isFormDialogOpen && (
//         <FormDialog
//           session={selectedSession}
//           onClose={handleCloseFormDialog}
//           onBookSession={bookedSession}
//         />
//       )}
//     </div>
//   );
// }

// export default SessionBooking;

