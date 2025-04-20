import React, { useState } from 'react';
import axios from 'axios';

function Register() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [msg, setMsg] = useState('');
  const API_BASE_URL = process.env.REACT_APP_API_URL || 'http://localhost:5000';

  const handleRegister = async (e) => {
    e.preventDefault();
    try {
      await axios.post(`${API_BASE_URL}/api/register`, { email, password });
      setMsg('Registration successful! You can now log in.');
    } catch (err) {
      setMsg('Registration failed');
    }
  };

  return (
    <div>
      <h2>Register</h2>
      {msg && <div className="alert alert-info">{msg}</div>}
      <form onSubmit={handleRegister}>
        <div className="mb-3">
          <label>Email</label>
          <input type="email" className="form-control" value={email}
                 onChange={(e) => setEmail(e.target.value)} required />
        </div>
        <div className="mb-3">
          <label>Password</label>
          <input type="password" className="form-control" value={password}
                 onChange={(e) => setPassword(e.target.value)} required />
        </div>
        <button type="submit" className="btn btn-primary">Register</button>
        <a href='./login' className="btn btn-link">Have an account? Log n!</a>
      </form>
    </div>
  );
}

export default Register;
