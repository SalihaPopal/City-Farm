import React, { useState } from 'react';
import './App.css';
import SessionBooking from './SessionBooking';
import SessionClaim from './SessionClaim';
import Calendar from './Calendar';


function App() {
  const [date, setDate]= useState(new Date())
  
  return (
    <div className="App">
      <h1>WELCOME TO THE CITY FARM</h1>     
      <Calendar onChange={setDate} value={Date} />
      {/* <h2 className='h2'>Claimed Sessions</h2> */}
      <SessionBooking />
      <SessionClaim/>
    </div>
  );
}

export default App;


