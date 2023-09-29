import React, { useState } from 'react';
import './App.css';
import SessionListing from './SessionListing';
import SessionClaim from './SessionClaim';
import Calendar from './Calendar';


function App() {
  const [date, setDate]= useState(new Date())
  
  return (
    <div className="App">
      <h1>WELCOME TO THE CITY FARM</h1>     
      <Calendar onChange={setDate} value={Date} />
      <SessionListing />
      <SessionClaim/>
    </div>
  );
}

export default App;


