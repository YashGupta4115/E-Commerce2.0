import "./TicketRaiser.css";
import React from "react";

const TicketRaiser = () => {
  return (
    <div className="ticket-raise-container">
      <select className="query-drop-down">
        <option>A</option>
        <option>B</option>
        <option>C</option>
      </select>
      <input type="text" placeholder="order number" />
      <textarea cols="20" rows="10"></textarea>
    </div>
  );
};

export default TicketRaiser;
