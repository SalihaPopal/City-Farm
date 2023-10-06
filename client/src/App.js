import React, { useState } from 'react';
import SessionBooking from './SessionBooking';
import Calendar from './Calendar';
import './App.css';


function App() {
  const [date, setDate]= useState(new Date())
  
  return (
    <div className="App">
      <h1>WELCOME TO THE CITY FARM</h1>     
      <Calendar onChange={setDate} value={Date} />
      {/* <h2 className='h2'>Claimed Sessions</h2> */}
      <SessionBooking />
    </div>
  );
}

export default App;


