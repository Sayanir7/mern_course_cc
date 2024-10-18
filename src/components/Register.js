import React, {useState} from 'react';
import {  Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import './css/register.css';

const Register = () => {
    const [name, setName] = useState('');
    const [email, setEmail]= useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');

    const navigate = useNavigate();

    const handleSubmit = async (e) =>{
        e.preventDefault();
        try{
            const response = await fetch('/api/auth/register' , {
                method:'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({name:name,email:email,password:password}),

            })
            const data = await response.json();

            if(response.ok){
                navigate('/');
            }
            else{
                setError(data.message);

            }
        }catch(e){
            setError('Something went wrong');
        }

        


    }

    return (
        <div className="register-page">
          <div className="register-container">
            <h2>Register</h2>
            {error && <p className="error-message">{error}</p>}
            <form onSubmit={handleSubmit} className="register-form">
              <input
                type="text"
                placeholder="Your Name"
                required = 'true'
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="input-field"
              />
              <input
                type="email"
                placeholder="Email"
                required = 'true'
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="input-field"
              />
              <input
                type="password"
                placeholder="Password"
                required = 'true'
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="input-field"
              />
              <button type="submit" className="submit-btn">Register</button>
            </form>
            <p className="sign-in-text">
              Already have an account? <Link to="/" className="sign-in-link">Sign in</Link>
            </p>
          </div>
        </div>
      );
};

export default Register;
