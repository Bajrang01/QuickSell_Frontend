// KanbanCard.js
import React from "react";
import "./KanbanCard.css"; // Import the CSS file

const KanbanCard = ({ title, heading, paragraph, userImage }) => {
  return (
    <div className="kanban-card">
      <h4> {heading} </h4> <h3> {title} </h3> <p> {paragraph} </p>{" "}
    </div>
  );
};

export default KanbanCard;
