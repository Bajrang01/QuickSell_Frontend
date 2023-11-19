import React from "react";
import "./App.css";
import filter from "./images/setting.png";
import downarrow from "./images/down.png";

const Navbar = ({ isDropdownOpen, toggleDropdown, handleSelection }) => {
  return (
    <div className="navbar">
      <button className="display-btn" onClick={toggleDropdown}>
        <img src={filter} alt="Display Icon" className="icon" />
        Display <img src={downarrow} alt="Display Icon" className="icon" />
      </button>{" "}
      {isDropdownOpen && (
        <div className="dropdown-content">
          <div className="grouping-section">
            <label> Grouping </label>{" "}
            <button
              className="status-btn"
              onClick={() => handleSelection("Status")}
            >
              {" "}
              Status <img
                src={downarrow}
                alt="Display Icon"
                className="icon"
              />{" "}
            </button>{" "}
          </div>{" "}
          <div className="user-section">
            <label> User </label>{" "}
            <button
              className="user-btn"
              onClick={() => handleSelection("User")}
            >
              {" "}
              User <img
                src={downarrow}
                alt="Display Icon"
                className="icon"
              />{" "}
            </button>{" "}
          </div>{" "}
          <div className="ordering-section">
            <label> Ordering </label>{" "}
            <button
              className="priority-btn"
              onClick={() => handleSelection("Priority")}
            >
              {" "}
              Priority{" "}
              <img src={downarrow} alt="Display Icon" className="icon" />{" "}
            </button>{" "}
          </div>{" "}
        </div>
      )}{" "}
    </div>
  );
};

export default Navbar;
