import React, { useEffect, useState } from 'react';
import axios from 'axios';

function Protected() {
  const [campaigns, setCampaigns] = useState([]);
  const [error, setError] = useState('');
  const [message, setMessage] = useState('');
  const API_BASE_URL = process.env.REACT_APP_API_URL || 'http://localhost:5000';

  useEffect(() => {
    const token = localStorage.getItem('token');
    axios.get(`${API_BASE_URL}/api/protected`, {
      headers: { Authorization: `Bearer ${token}` }
    })
    .then(res => setMessage(res.data.message))
    .catch(() => setMessage('Access denied'));
    const user = localStorage.getItem('user'); // Retrieve the user object from localStorage
    if (!user) {
      setError('User not found in localStorage');
      return;
    }
    axios.get(`${API_BASE_URL}/api/campaigns`, {
      headers: { Authorization: `Bearer ${token}` },
      params: { user: user } // Pass the user ID as a query parameter
    })
    .then(res => setCampaigns(res.data))
    .catch(() => setError('Failed to fetch campaigns'));
  }, []);

  return (
    <div>
      <h2>Protected Page</h2>
      <div className="alert alert-success">{message}</div>
      {error && <div className="alert alert-danger">{error}</div>}
      <div className="list-group">
        {campaigns.map(campaign => (
          <a key={campaign._id} href="#" className="list-group-item list-group-item-action">{campaign.name}</a>
        ))}
      </div>
    </div>
  );
}

export default Protected;
