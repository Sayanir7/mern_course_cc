// src/quizSlice.js
import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  questions: [],
  currentQuestion: 0,
  selectedOption: null,
  score: 0,
  isSubmitted:false,
  timer:300,
};

const quizSlice = createSlice({
  name: 'quiz',
  initialState,
  reducers: {
    setQuestions: (state, action) => {
      state.questions = action.payload;
    },
    selectOption: (state, action) => {
      state.selectedOption = action.payload;
    },
    submitAnswer: (state) => {
      const currentQ = state.questions[state.currentQuestion];
      if (currentQ.answer === state.selectedOption) {
        state.score += 3; // Increase score for correct answers
      }
      else{
        state.score-=1;

      }
      state.isSubmitted = true;
    //   state.selectedOption = null; // Reset selected option
    //   state.currentQuestion += 1; // Move to next question
    },
    skipQues:(state) =>{
        state.currentQuestion+=1;
        state.selectedOption=null;
        state.isSubmitted = false;
        

    },
    // nextQues:(state)=>{
    //     state.selectedOption = null; // Reset selected option
    //     state.currentQuestion += 1; // Move to next question
    // },
    resetQuiz: (state) => {
      state.currentQuestion = 0;
      state.selectedOption = null;
    //   state.score = 0;
      state.timer = 300;

    },
    resetScore:(state)=> {
        state.score = 0;
    },
    setTimer: (state)=>{
        if(state.timer>0){
            state.timer-=1;
        }
    }
  },
});

export const { setQuestions, selectOption, submitAnswer, skipQues, resetQuiz, resetScore, setTimer } = quizSlice.actions;
export default quizSlice.reducer;