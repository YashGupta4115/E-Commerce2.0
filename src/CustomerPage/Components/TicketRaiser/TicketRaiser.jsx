import "./TicketRaiser.css";
import React, { useState } from "react";

const TicketRaiser = () => {
  const [issueLevel, setIssueLevel] = useState(null);
  const [orderTitle, setTitle] = useState(null);
  const [descp, setDescp] = useState(null);
  const handleTicketRaiser = () => {
    console.log(issueLevel, orderTitle, descp);
  };
  return (
    <div className="ticket-raise-container">
      <div className="raise-ticket-form">
        <div className="raise-ticket-form-part">
          <p>Level : </p>
          <select
            style={{ marginLeft: "0.5rem" }}
            className="query-drop-down"
            onChange={(e) => setIssueLevel(e.target.value)}
          >
            <option>Low</option>
            <option>Moderate</option>
            <option>High</option>
          </select>
        </div>
        <input
          style={{ padding: "9px" }}
          className="raise-ticket-form-part"
          type="text"
          placeholder="title"
          onChange={(e) => setTitle(e.target.value)}
        />
        <textarea
          className="raise-ticket-form-part"
          cols="20"
          rows="10"
          placeholder="Enter Query"
          onChange={(e) => setDescp(e.target.value)}
        ></textarea>
        <button className="raise-ticket-form-part" onClick={handleTicketRaiser}>
          Raise Ticket
        </button>
      </div>
    </div>
  );
};

export default TicketRaiser;
