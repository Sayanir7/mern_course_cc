import { useNavigate } from "react-router-dom";
import useAuth from "../services/auth"
import { useDispatch, useSelector } from "react-redux";
import { resetScore } from "../services/quizSlice";
import Cookies from "js-cookie";
import './css/result.css';
// import { useEffect } from "react";




const Result = ()=>{
    useAuth();
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const username = Cookies.get('username');

    const {
        score,
    } = useSelector((state) => state.quiz);

    

    const startQuiz = ()=>{
        dispatch(resetScore());
        navigate('/startquiz');
    }
    const goLeaderboard= ()=>{
        dispatch(resetScore());
        navigate('/leaderboard');

    }
    const logout= ()=>{
        dispatch(resetScore());
        Cookies.remove('token');
        navigate('/');


        
    }

    return (
    <div className="score-page">
      <div className="score-container">
        <p className="greeting">Dear {username},</p>
        <p className="score-display">Your score is: <span>{score}</span></p>
        
        <div className="button-group">
          <button className="action-btn" onClick={startQuiz}>Go to Start Page</button>
          <button className="action-btn" onClick={goLeaderboard}>Check Leaderboard</button>
          <button className="action-btn logout-btn" onClick={logout}>Logout</button>
        </div>
      </div>
    </div>
  );
}

export default Result;