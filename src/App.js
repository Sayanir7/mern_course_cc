import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Login from './components/Login';
import StartQuiz from './components/StartQuiz';
import Quiz from './components/Quiz';
import Result from './components/Result';

import Register from './components/Register';
import Navbar from './components/Navbar';
import Leaderboard from './components/Leaderboard';
// import Navbar from './components/Navbar';
// import Menu from './components/Menu';
// import Cart from './components/Cart';
// import Home from './components/Home';
// import Footer from './components/Footer';
// import NotFound from './components/NotFound'


function App() {
  return (
    <Router>
      {/* <Navbar/> */}
      <Routes>
        <Route path="/" element={<Login/>} />
        <Route path='/register' element ={<Register/>}/>
        <Route path="/startquiz" element={<StartQuiz/>} />
        <Route path="/quiz" element={<Quiz/>} />
        <Route path="/result" element={<Result/>} />
        
        <Route path="/leaderboard" element={<Leaderboard/>} />

        {/* <Route path="/" element={<NotFound />} /> */}
      </Routes>
      
    </Router>
  );
}

export default App;
