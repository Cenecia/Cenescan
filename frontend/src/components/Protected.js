import React, { useEffect, useState } from 'react';
import axios from 'axios';

function Protected() {
  const [message, setMessage] = useState('');
  const API_BASE_URL = process.env.REACT_APP_API_URL || 'http://localhost:5000';

  useEffect(() => {
    const token = localStorage.getItem('token');
    axios.get(`${API_BASE_URL}/api/protected`, {
      headers: { Authorization: `Bearer ${token}` }
    })
    .then(res => setMessage(res.data.message))
    .catch(() => setMessage('Access denied'));
  }, []);

  return (
    <div>
      <h2>Protected Page</h2>
      <div className="alert alert-success">{message}</div>
    </div>
  );
}

export default Protected;
