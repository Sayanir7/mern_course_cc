import React from "react";
import useAuth from "../services/auth";
const Leaderboard = () => {
    useAuth();
    return (
      <div className="leaderboard-page">
        <h2>Leaderboard</h2>
      
      </div>
    );
  };
  
  export default Leaderboard;
  