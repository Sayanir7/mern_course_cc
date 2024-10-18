import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  setQuestions,
  selectOption,
  submitAnswer,
  skipQues,
  resetQuiz,
  setTimer,
} from "../services/quizSlice";
import useAuth from "../services/auth";
import { useData } from "../services/data";
import { useNavigate } from "react-router-dom";
import './css/quiz.css';

const Quiz = () => {
  useAuth();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { data, error, isLoading } = useData();
  //   const [isSubmitted, setSubmitted] = useState(false);

  const {
    questions,
    currentQuestion,
    selectedOption,
    score,
    isSubmitted,
    timer,
  } = useSelector((state) => state.quiz);

  // Fetch questions only once when data is available
  useEffect(() => {
    if (data && Array.isArray(data)) {
      const randomQuestions = data.sort(() => 0.5 - Math.random()).slice(0, 10);
      dispatch(setQuestions(randomQuestions));
    }
  }, [data, dispatch]);
  useEffect(() => {
    
    if (currentQuestion + 1 > 10) {
      dispatch(resetQuiz());

      return navigate("/result");
    }
  }, [data, dispatch, currentQuestion, navigate]);

  useEffect(() => {
    const timerInterval = setInterval(() => {
      dispatch(setTimer());
    }, 1000);

    if (timer === 0) {
      dispatch(resetQuiz());
      navigate("/result");
    }

    return () => clearInterval(timerInterval); // Clean up the interval on component unmount
  }, [dispatch, timer, navigate]);
  // Handle loading and error states
  if (isLoading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;

  // Check if there are questions available
  if (!questions.length) {
    return <p>No questions available</p>; // Handle the case when there are no questions
  }

  if (currentQuestion <= 9) {
    const { question, A, B, C, D, answer } = questions[currentQuestion];

    // const handleSubmit = () => {
    //   dispatch(submitAnswer());
    //   setSubmitted(true);
    // };

    const getStyle = (option) => {
      if (!isSubmitted) {
        return {};
      }
      if (option === answer) {
        return { color: "green" };
      }
      if (option !== answer && selectedOption === option) {
        return { color: "red" };
      }
      return {};
    };


    return (
        <div className="quiz-page">
          <div className="quiz-container">
            <h2>
              Question {currentQuestion + 1} of {questions.length}
            </h2>
            <p className="question-text">{question}</p>
    
            <div className="options">
              <label className={`option ${selectedOption === "A" ? 'selected' : ''}`} style={getStyle("A")}>
                <input
                  type="radio"
                  value="A"
                  checked={selectedOption === "A"}
                  onChange={() => dispatch(selectOption("A"))}
                />
                {A}
              </label>
              <label className={`option ${selectedOption === "B" ? 'selected' : ''}`} style={getStyle("B")}>
                <input
                  type="radio"
                  value="B"
                  checked={selectedOption === "B"}
                  onChange={() => dispatch(selectOption("B"))}
                />
                {B}
              </label>
              <label className={`option ${selectedOption === "C" ? 'selected' : ''}`} style={getStyle("C")}>
                <input
                  type="radio"
                  value="C"
                  checked={selectedOption === "C"}
                  onChange={() => dispatch(selectOption("C"))}
                />
                {C}
              </label>
              <label className={`option ${selectedOption === "D" ? 'selected' : ''}`} style={getStyle("D")}>
                <input
                  type="radio"
                  value="D"
                  checked={selectedOption === "D"}
                  onChange={() => dispatch(selectOption("D"))}
                />
                {D}
              </label>
            </div>
    
            <div className="action-buttons">
              <button
                className="submit-btn"
                onClick={() => dispatch(submitAnswer())}
                disabled={!selectedOption || isSubmitted}
              >
                Submit Answer
              </button>
              <button
                className="skip-btn"
                onClick={() => dispatch(skipQues())}
                disabled={isSubmitted}
              >
                Skip
              </button>
              <button
                className="next-btn"
                onClick={() => dispatch(skipQues())}
                disabled={!isSubmitted}
              >
                Next
              </button>
            </div>
    
            <div className="info-section">
              <p className="score">Score: {score}</p>
              <p className="timer">
                Time remaining: {Math.floor(timer / 60)}:{timer % 60 < 10 ? `0${timer % 60}` : timer % 60}
              </p>
            </div>
          </div>
        </div>
      );

   
  }
};

export default Quiz;
