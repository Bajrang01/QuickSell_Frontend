import { useNavigate } from "react-router-dom";
import React, { useState, useEffect } from "react";
import "./App.css";
import plus from "./images/plus.png";
import dots from "./images/dots.png";
import todo from "./images/todo.png";
import done from "./images/check.png";
import cancel from "./images/cancel.png";
import progress from "./images/progress.png";
import backlog from "./images/clock.png";
import KanbanCard from "./Card.js";
import Navbar from "./Navbar";

const Status = () => {
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
        // Update the state with the fetched data
        setTicketsData(data.tickets);
        setOriginalOrder(data.tickets); // Save the original order
      })
      .catch((error) => console.error("Error fetching data:", error));
  }, []);
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
        <div className="kanban-board">
          <div className="kanban-column">
            <p>
              <img src={backlog} alt="Display Icon" className="icon headers" />{" "}
              Backlog({countTickets("Backlog")}){" "}
              <img
                src={plus}
                alt="Display Icon"
                className="icon headers with-margin"
              />
              <img src={dots} alt="Display Icon" className="icon headers" />
            </p>{" "}
            {ticketsData
              .filter((ticket) => ticket.status === "Backlog")
              .map((ticket) => (
                <KanbanCard
                  title={ticket.title}
                  key={ticket.id}
                  heading={ticket.id}
                  paragraph={ticket.tag.join(", ")}
                />
              ))}{" "}
          </div>{" "}
          <div className="kanban-column">
            <p>
              <img src={todo} alt="Display Icon" className="icon headers" />{" "}
              Todo({countTickets("Todo")}){" "}
              <img
                src={plus}
                alt="Display Icon"
                className="icon headers with-margin"
              />
              <img src={dots} alt="Display Icon" className="icon headers" />
            </p>{" "}
            {ticketsData
              .filter((ticket) => ticket.status === "Todo")
              .map((ticket) => (
                <KanbanCard
                  key={ticket.id}
                  title={ticket.title}
                  heading={ticket.id}
                  paragraph={ticket.tag.join(", ")}
                />
              ))}{" "}
          </div>{" "}
          <div className="kanban-column">
            <p>
              <img src={progress} alt="Display Icon" className="icon headers" />{" "}
              In Progress({countTickets("In progress")}){" "}
              <img
                src={plus}
                alt="Display Icon"
                className="icon headers with-margin"
              />
              <img src={dots} alt="Display Icon" className="icon headers" />
            </p>{" "}
            {ticketsData
              .filter((ticket) => ticket.status === "In progress")
              .map((ticket) => (
                <KanbanCard
                  key={ticket.id}
                  title={ticket.title}
                  heading={ticket.id}
                  paragraph={ticket.tag.join(", ")}
                />
              ))}{" "}
          </div>{" "}
          <div className="kanban-column">
            <p>
              <img src={done} alt="Display Icon" className="icon headers" />{" "}
              Done({countTickets("Done")}){" "}
              <img
                src={plus}
                alt="Display Icon"
                className="icon headers with-margin"
              />
              <img src={dots} alt="Display Icon" className="icon headers" />
            </p>{" "}
            {ticketsData
              .filter((ticket) => ticket.status === "Done")
              .map((ticket) => (
                <KanbanCard
                  key={ticket.id}
                  title={ticket.title}
                  heading={ticket.id}
                  paragraph={ticket.tag.join(", ")}
                />
              ))}{" "}
          </div>{" "}
          <div className="kanban-column">
            <p>
              <img src={cancel} alt="Display Icon" className="icon headers" />{" "}
              Canceled({countTickets("Canceled")}){" "}
            </p>{" "}
            {ticketsData
              .filter((ticket) => ticket.status === "Canceled")
              .map((ticket) => (
                <KanbanCard
                  key={ticket.id}
                  title={ticket.title}
                  heading={ticket.id}
                  paragraph={ticket.tag.join(", ")}
                />
              ))}{" "}
          </div>{" "}
        </div>{" "}
      </div>{" "}
    </div>
  );
};

export default Status;
