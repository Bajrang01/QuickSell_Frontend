import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./App.css";
import plus from "./images/plus.png";
import dots from "./images/dots.png";
import KanbanCard from "./Card.js";
import urgent from "./images/siren.png";
import high from "./images/high.png";
import low from "./images/low.png";
import medium from "./images/medium.png";
import Navbar from "./Navbar";

const Priority = () => {
  const navigate = useNavigate();

  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [selectedGrouping, setSelectedGrouping] = useState("default");
  const [selectedOrdering, setSelectedOrdering] = useState("default");
  const [ticketsData, setTicketsData] = useState([]);
  const [originalOrder, setOriginalOrder] = useState([]);
  const [selectedUser, setSelectedUser] = useState("default");

  useEffect(() => {
    fetch("https://api.quicksell.co/v1/internal/frontend-assignment")
      .then((response) => response.json())
      .then((data) => {
        setTicketsData(data.tickets);
        setOriginalOrder(data.tickets);
      })
      .catch((error) => console.error("Error fetching data:", error));
  }, []);
  const organizeTicketsByPriority = () => {
    const priorityLists = {
      4: [], // Urgent
      3: [], // High
      2: [], // Medium
      1: [], // Low
      0: [], // No priority
    };

    ticketsData.forEach((ticket) => {
      priorityLists[ticket.priority].push(ticket);
    });

    return priorityLists;
  };

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
      // Display the original order
      setTicketsData(originalOrder);
    }
  };

  const countTickets = (status) => {
    return ticketsData.filter((ticket) => ticket.status === status).length;
  };

  const renderPrioritySections = () => {
    const priorityLists = organizeTicketsByPriority();

    return Object.entries(priorityLists).map(([priority, tickets]) => (
      <div className="kanban-column" key={priority}>
        <p>
          <img
            src={getPriorityIcon(priority)}
            alt="Display Icon"
            className="icon headers"
          />{" "}
          {getPriorityLabel(priority)}({tickets.length}){" "}
          <img
            src={plus}
            alt="Display Icon"
            className="icon headers with-margin"
          />
          <img src={dots} alt="Display Icon" className="icon headers" />
        </p>{" "}
        {tickets.map((ticket) => (
          <KanbanCard
            key={ticket.id}
            title={ticket.title}
            heading={ticket.id}
            paragraph={ticket.tag.join(", ")}
          />
        ))}{" "}
      </div>
    ));
  };

  const getPriorityLabel = (priority) => {
    switch (parseInt(priority)) {
      case 4:
        return "Urgent";
      case 3:
        return "High";
      case 2:
        return "Medium";
      case 1:
        return "Low";
      case 0:
        return "No priority";
      default:
        return "";
    }
  };

  const getPriorityIcon = (priority) => {
    switch (parseInt(priority)) {
      case 4:
        return urgent;
      case 3:
        return high;
      case 2:
        return medium;
      case 1:
        return low;
      case 0:
        return dots;
      default:
        return "";
    }
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
        <div className="kanban-board"> {renderPrioritySections()} </div>{" "}
      </div>{" "}
    </div>
  );
};

export default Priority;
