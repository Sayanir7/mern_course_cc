import { Link } from "react-router-dom";
import React from "react";
import './css/navbar.css'

const Navbar = () => {

    return (
        <div>
          <nav className="navbar">
            <ul className="nav-links">
              <li><Link to="/register" className="nav-link">Register</Link></li>
              <li><Link to="/quiz" className="nav-link">Quiz</Link></li>
              <li><Link to="/startquiz" className="nav-link">Start Quiz</Link></li>
              <li><Link to="/result" className="nav-link">Result</Link></li>
              <li><Link to="/leaderboard" className="nav-link">Leaderboard</Link></li>
            </ul>
          </nav>
        </div>
      );


};


export default Navbar;