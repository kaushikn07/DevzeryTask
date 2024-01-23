// This is a simplified React.js example. You would typically use state management libraries like Redux for a real application.
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Link,
} from "react-router-dom";

import Home from './components/Home'
import Display from "./components/Display";
import Dashboard from './components/Dashboard';
import React from "react";


function App() {
  return (
    <div>
      <Router>
        <nav>
          <div><Link to="/">Home</Link></div>
          <div><Link to="/dashboard">Change details</Link></div>
          <div><Link to="/display">View Users</Link></div>
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
