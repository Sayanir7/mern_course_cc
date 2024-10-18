import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Cookies from 'js-cookie';
import './css/login.css';
import { Link } from 'react-router-dom';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await fetch('/api/auth/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ email, password }),
            });
            const data = await response.json();
            if (response.ok) {
            // Store the JWT token in localStorage
            // localStorage.setItem('token', data.token);
            Cookies.set('token', data.token, {expires:0.5});
            Cookies.set('username', data.name,{expires:0.5} )
            // Redirect to start quiz page
            navigate('/startquiz');  // Use navigate instead of history.push
            } else {
            setError(data.message);
            }
        } catch (err) {
            setError('Something went wrong. Please try again.');
        }
    };


    return (
        <div className="login-page">
          <div className="login-container">
            <h2>Login</h2>
            {error && <p className="error-message">{error}</p>}
            <form onSubmit={handleSubmit}>
              <input
                type="email"
                placeholder="Email"
                required = 'true'
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="login-input"
              />
              <input
                type="password"
                placeholder="Password"
                required = 'true'
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="login-input"
              />
              <button type="submit" className="login-button">Login</button>
              <p>Don't have an account?<Link to ='/register'>Sign up</Link></p>
            </form>
          </div>
        </div>
      );
};

export default Login;
