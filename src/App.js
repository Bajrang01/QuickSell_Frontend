import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

import StatusContent from "./Status";
import UserContent from "./User";
import PriorityContent from "./Priority";

const App = () => {
  return (
    <Router>
      <div>
        <Routes>
          <Route path="" element={<StatusContent />} />{" "}
          <Route path="/status" element={<StatusContent />} />{" "}
          <Route path="/user" element={<UserContent />} />{" "}
          <Route path="/priority" element={<PriorityContent />} />{" "}
        </Routes>{" "}
      </div>{" "}
    </Router>
  );
};

export default App;
