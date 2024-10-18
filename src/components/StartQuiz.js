import React from "react";
import useAuth from "../services/auth";
import { Link } from "react-router-dom";
import Cookies from "js-cookie";
import './css/startquiz.css'



const StartQuiz = () => {

    useAuth();

    const username = Cookies.get('username');


    
    
    return (
        <div className="start-quiz">
          <div className="quiz-container">
            <h1>Welcome to the Quiz, {username}!</h1>
            <p className="quiz-rules">
              Quiz Rules: Answer 10 questions in 5 minutes.  +3 for correct answer, -1 for incorrect answer, 0 for unattempt question
            </p>
            <Link to='/quiz'>
              <button className="start-button" onSubmit={navigator}>Start Quiz</button>
            </Link>
          </div>
        </div>
      );
};
  
  export default StartQuiz;