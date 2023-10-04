import './Calendar.css';
import React, { useState } from "react";
import "./App.css";
function Calendar(props) {

     const [sDate, setsDate] = useState(new Date());
     const [sessionStatus, setSessionStatus] = useState(false);

     const [selectedSession, setSelectedSession] = useState(null);
     const [bookedSessions, setBookedSessions] = useState([]);
     const [slots, setSlots] = useState([]);
  
     const findMonthDays = (y, m) => {
        return new Date(y, m + 1, 0).getDate();
     };
  
     const findFirstDay = (y, m) => {
        return new Date(y, m, 1).getDay();
     };
  
     const changeToPrevMonth = () => {
        setsDate((pDate) => {
           const pMonth = pDate.getMonth() - 1;
           const pYear = pDate.getFullYear();
           return new Date(pYear, pMonth, 1);
        });
     };
  
     const changeToNextMonth = () => {
        setsDate((pDate) => {
           const nMonth = pDate.getMonth() + 1;
           const nYear = pDate.getFullYear();
           return new Date(nYear, nMonth, 1);
        });
     };
  
     const handleDateClick = (date) => {
        setsDate(date);
     };

   //   const handleBooked = (date) => {
   //    setSessionStatus(date)
   //   }

   const handleBooked = (session_date) => {
      // Send a request to the backend to claim the session for the selected date
      fetch(`https://city-farm-back-end.onrender.com/sessions/${session_date}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ date: session_date }),
      })
        .then((response) => response.json())
        .then((data) => {
          if (data.success) {
            setSessionStatus(session_date);
            props.onSessionClaimed(); // Notify the parent component about the claim
          } else {
            // Handle error or display a message
            console.error("Failed to claim session.");
          }
        })
        .catch((error) => {
          console.error("Error claiming session:", error);
        });
    };
  
  
     const showCalendar = () => {
        const y = sDate.getFullYear();
        const m = sDate.getMonth();
        const mDays = findMonthDays(y, m);
        const fDay = findFirstDay(y, m);
  
        const allDays = [];
  
        // For empty cells
        for (let p = 0; p < fDay; p++) {
           allDays.push(<div key={`em-${p}`} className="box empty"></div>);
        }
  
        // Show actual days
        for (let d = 1; d <= mDays; d++) {
           const date = new Date(y, m, d);
           const isSelected = sDate && date.toDateString() === sDate.toDateString();
  
           allDays.push(
              <div
                 key={`d-${d}`}
                 className={`box ${isSelected ? "selected" : ""}`}
                 onClick={() => handleDateClick(date)}
                 onClickCapture={()=> handleBooked(date)}
              >
                 {d}
              </div>
           );
        }
  
        return allDays;
     };
  
     return (
        <div>

           <div className="main">
              <div className="header">
                 <button onClick={changeToPrevMonth}>&lt;</button>
                 <h2>
                    {sDate.toLocaleString("default", {
                       month: "long",
                       year: "numeric",
                    })}
                 </h2>
                 <button className='btn' onClick={changeToNextMonth}>&gt;</button>
              </div>
              <div className="body">{showCalendar()}</div>
              {sDate && (
                 <div className="selected-date">
                    Selected Date: {sDate.toLocaleDateString()}
                 </div>
              )}
           </div>
        </div>
     );
  }
  
 
  

export default Calendar;
