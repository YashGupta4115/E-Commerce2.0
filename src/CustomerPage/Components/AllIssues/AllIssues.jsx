import React, { useContext } from "react";
import { queryContext } from "../../../Context/queryContext";
import "./AllIssues.css";

const AllIssues = () => {
  const { queries } = useContext(queryContext);

  return (
    <div className="all-issues-container">
      <div className="issue-section-header">
        <div className="issue-section-indi-item">IssueLevel</div>
        <div className="issue-section-indi-item">IssueTitle</div>
        <div className="issue-section-indi-item">Issue Description</div>
        <div className="issue-section-indi-item">Date created</div>
        <div className="issue-section-indi-item">Current Status</div>
      </div>
      {queries.length > 0 ? (
        queries.map((query, index) => (
          <div key={index} className="issue-container">
            <div className="issue-section-indi-item">{query.issueLevel}</div>
            <div className="issue-section-indi-item">{query.orderTitle}</div>
            <div className="issue-section-indi-item">{query.descp}</div>
            <div className="issue-section-indi-item">
              {query.createdAt && typeof query.createdAt.toDate === "function"
                ? query.createdAt.toDate().toLocaleString()
                : "Loading..."}
            </div>
            <div className="issue-section-indi-item">{query.status}</div>
          </div>
        ))
      ) : (
        <div>Loading...</div>
      )}
    </div>
  );
};

export default AllIssues;
