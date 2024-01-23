// This is a simplified React.js example. You would typically use state management libraries like Redux for a real application.
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Link,
} from "react-router-dom";

import Home from './Home'
import Display from "./Display";
import Dashboard from './Dashboard';
import React from "react";

function App() {
  return (
    <div>
      <Router>
        <nav>
          <Link to="/">Home</Link>
          <Link to="/dashboard">Change details</Link>
          <Link to="/display">View Users</Link>
        </nav>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/display" element={<Display />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
