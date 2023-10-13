import React, { useState } from 'react';
import SessionBooking from './SessionBooking';
import Calendar from './Calendar';
import './App.css';


function App() {
  const [date, setDate]= useState(new Date());

  return (
    <div className="App">
      <h1>WELCOME TO THE CITY FARM</h1>     
      <Calendar onChange={setDate} value={Date} />
      <SessionBooking />
    </div>
  );
}

export default App;


