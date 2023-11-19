import { useNavigate } from "react-router-dom";
import React, { useState, useEffect } from "react";
import "./App.css";
import KanbanCard from "./Card.js";
import Navbar from "./Navbar";

const User = () => {
  const navigate = useNavigate();

  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [selectedGrouping, setSelectedGrouping] = useState("default");
  const [selectedOrdering, setSelectedOrdering] = useState("default");
  const [ticketsData, setTicketsData] = useState([]);
  const [originalOrder, setOriginalOrder] = useState([]);
  const [selectedUser, setSelectedUser] = useState("default");
  const [users, setUsers] = useState([]);

  useEffect(() => {
    fetch("https://api.quicksell.co/v1/internal/frontend-assignment")
      .then((response) => response.json())
      .then((data) => {
        setTicketsData(data.tickets);
        setUsers(data.users);
      })
      .catch((error) => console.error("Error fetching data:", error));
  }, []); //
  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  const handleGroupingChange = (event) => {
    setSelectedGrouping(event.target.value);
  };

  const handleUserChange = (event) => {
    setSelectedUser(event.target.value);
  };

  const handleOrderingChange = (event) => {
    const newOrdering = event.target.value;
    setSelectedOrdering(newOrdering);

    if (newOrdering === "Sort") {
      const sortedTickets = [...ticketsData].sort(
        (a, b) => a.priority - b.priority
      );
      setTicketsData(sortedTickets);
    } else if (newOrdering === "Without Sort") {
      setTicketsData(originalOrder);
    }
  };

  const groupTicketsByUser = () => {
    const groupedTickets = {};

    ticketsData.forEach((ticket) => {
      const { userId } = ticket;
      if (!groupedTickets[userId]) {
        groupedTickets[userId] = [];
      }
      groupedTickets[userId].push(ticket);
    });

    return groupedTickets;
  };

  const countTicketsForUser = (userId) => {
    return ticketsData.filter((ticket) => ticket.userId === userId).length;
  };

  const getUserName = (userId) => {
    const user = users.find((user) => user.id === userId);
    return user ? user.name : "Unknown User";
  };

  const renderKanbanColumns = () => {
    const groupedTickets = groupTicketsByUser();

    return Object.keys(groupedTickets).map((userId) => {
      const user = groupedTickets[userId];
      return (
        <div className="kanban-column" key={userId}>
          <p>
            {" "}
            {getUserName(userId)}({countTicketsForUser(userId)}){" "}
          </p>{" "}
          {user.map((ticket) => (
            <KanbanCard
              key={ticket.id}
              title={ticket.title}
              heading={ticket.id}
              paragraph={ticket.tag.join(", ")}
            />
          ))}{" "}
        </div>
      );
    });
  };

  const handleSelection = (selectedValue) => {
    if (selectedValue === "Status") {
      navigate("/status");
    } else if (selectedValue === "User") {
      navigate("/user");
    } else if (selectedValue === "Priority") {
      navigate("/priority");
    }
  };

  return (
    <div className="app-container">
      <Navbar
        isDropdownOpen={isDropdownOpen}
        toggleDropdown={() => setIsDropdownOpen(!isDropdownOpen)}
        handleSelection={handleSelection}
      />{" "}
      <div className="body-content">
        <div className="kanban-board"> {renderKanbanColumns()} </div>{" "}
      </div>{" "}
    </div>
  );
};

export default User;
