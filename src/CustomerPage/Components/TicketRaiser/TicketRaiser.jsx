import { queryContext } from "../../../Context/queryContext";
import { UserContext } from "../../../Context/userContext";
import { createQueryDocumentOnFireStore } from "../../../Firebase/firebase";
import "./TicketRaiser.css";
import React, { useContext, useState } from "react";

const TicketRaiser = () => {
  const [issueLevel, setIssueLevel] = useState("low");
  const [orderTitle, setTitle] = useState(null);
  const [descp, setDescp] = useState(null);
  const { addQueries } = useContext(queryContext);
  const { currentUser } = useContext(UserContext);
  const handleTicketRaiser = async () => {
    const createdAt = new Date();
    const status = "pending";
    let user = null;
    if (currentUser) {
      user = currentUser.uid;
    }
    const issue = { issueLevel, orderTitle, descp, createdAt, status, user };
    addQueries(issue);
    await createQueryDocumentOnFireStore(issue);
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
