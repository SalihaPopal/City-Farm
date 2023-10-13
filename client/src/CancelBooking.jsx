import React from "react";

export default function CancelBooking({ bookingId, onDelete }) {
  const handleDeleteSlot = () => {
    fetch(`https://city-farms-db.onrender.com/booking/${bookingId}`, {
      method: "DELETE",
    }).then((res) => {
      if (res.status === 200) {
        onDelete(bookingId);
      }
    })
  };

  return (
    <button className="btn btn-danger" onClick={handleDeleteSlot}>
      Cancel Booking
    </button>
  );
}