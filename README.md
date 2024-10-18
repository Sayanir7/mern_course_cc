# Getting Started with Create React App

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in your browser.

The page will reload when you make changes.\
You may also see any lint errors in the console.

### `npm test`

Launches the test runner in the interactive watch mode.\
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `npm run build`

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.\
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

### `npm run eject`

**Note: this is a one-way operation. Once you `eject`, you can't go back!**

If you aren't satisfied with the build tool and configuration choices, you can `eject` at any time. This command will remove the single build dependency from your project.

Instead, it will copy all the configuration files and the transitive dependencies (webpack, Babel, ESLint, etc) right into your project so you have full control over them. All of the commands except `eject` will still work, but they will point to the copied scripts so you can tweak them. At this point you're on your own.

You don't have to ever use `eject`. The curated feature set is suitable for small and middle deployments, and you shouldn't feel obligated to use this feature. However we understand that this tool wouldn't be useful if you couldn't customize it when you are ready for it.

## Learn More

You can learn more in the [Create React App documentation](https://facebook.github.io/create-react-app/docs/getting-started).

To learn React, check out the [React documentation](https://reactjs.org/).

### Code Splitting

This section has moved here: [https://facebook.github.io/create-react-app/docs/code-splitting](https://facebook.github.io/create-react-app/docs/code-splitting)

### Analyzing the Bundle Size

This section has moved here: [https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size](https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size)

### Making a Progressive Web App

This section has moved here: [https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app](https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app)

### Advanced Configuration

This section has moved here: [https://facebook.github.io/create-react-app/docs/advanced-configuration](https://facebook.github.io/create-react-app/docs/advanced-configuration)

### Deployment

This section has moved here: [https://facebook.github.io/create-react-app/docs/deployment](https://facebook.github.io/create-react-app/docs/deployment)

### `npm run build` fails to minify

This section has moved here: [https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify](https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify)






import React, { useState, useEffect } from 'react';

const Quiz = () => {
  const [questions, setQuestions] = useState([]);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(true);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedOption, setSelectedOption] = useState(null);
  const [score, setScore] = useState(0);

  // Fetch questions when the component mounts
  useEffect(() => {
    const fetchQuestions = async () => {
      try {
        const response = await fetch('https://krish-2512.github.io/api/questions-2.json');
        const data = await response.json();

        // Check if the data fetched is an array and has content
        if (Array.isArray(data) && data.length > 0) {
          // Select 10 random questions from the fetched data
          const randomQuestions = data.sort(() => 0.5 - Math.random()).slice(0, 10);
          setQuestions(randomQuestions);
        } else {
          setError('No questions available');
        }
        setLoading(false);
      } catch (err) {
        setError('Error fetching questions');
        setLoading(false);
      }
    };

    fetchQuestions();
  }, []);

  // Handle answer selection
  const handleAnswerSelection = (option) => {
    setSelectedOption(option);
  };

  // Handle submit for each question
  const handleSubmitAnswer = () => {
    // Compare selected option with the correct answer
    if (selectedOption === questions[currentQuestion].answer) {
      setScore(score + 3); // Add points for correct answer
    }
    else{
        setScore(score - 1);
    }

    // Move to the next question
    setCurrentQuestion(currentQuestion + 1);
    setSelectedOption(null); // Reset selected option for next question
  };

  const skipQuestion = ()=>{
    setCurrentQuestion(currentQuestion + 1);
    setSelectedOption(null);
  }

  if (loading) return <p>Loading questions...</p>;
  if (error) return <p style={{ color: 'red' }}>{error}</p>;

  // Check if questions array is populated
  if (!questions.length) return <p>No questions available.</p>;

  // If all questions are answered, show final score
  if (currentQuestion >= questions.length) {
    return (
      <div>
        <h2>Quiz Completed</h2>
        <p>Your score: {score}</p>
      </div>
    );
  }

  // Destructure question and options for readability
  const { question, A, B, C, D } = questions[currentQuestion];

  return (
    <div className="quiz-page">
      <h2>Question {currentQuestion + 1} of {questions.length}</h2>
      <p>{question}</p>

      {/* Display the options A, B, C, D */}
      <button
        onClick={() => handleAnswerSelection('A')}
        style={{
          backgroundColor: selectedOption === 'A' ? 'lightblue' : 'white',
          margin: '5px',
          padding: '10px',
        }}
      >
        {A}
      </button>
      <button
        onClick={() => handleAnswerSelection('B')}
        style={{
          backgroundColor: selectedOption === 'B' ? 'lightblue' : 'white',
          margin: '5px',
          padding: '10px',
        }}
      >
        {B}
      </button>
      <button
        onClick={() => handleAnswerSelection('C')}
        style={{
          backgroundColor: selectedOption === 'C' ? 'lightblue' : 'white',
          margin: '5px',
          padding: '10px',
        }}
      >
        {C}
      </button>
      <button
        onClick={() => handleAnswerSelection('D')}
        style={{
          backgroundColor: selectedOption === 'D' ? 'lightblue' : 'white',
          margin: '5px',
          padding: '10px',
        }}
      >
        {D}
      </button>

      <div>
        <button onClick={handleSubmitAnswer} disabled={!selectedOption}>
          Submit Answer
        </button>
      </div>

      <div>
        <button onClick={skipQuestion}  >skip </button>
      </div>

      <p>your score:{score}</p>
    </div>
  );
};

export default Quiz;