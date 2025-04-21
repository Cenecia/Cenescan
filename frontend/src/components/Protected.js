import React, { useEffect, useState } from 'react';
import axios from 'axios';

function Protected() {
  const [campaigns, setCampaigns] = useState([]);
  const [newCampaignName, setNewCampaignName] = useState('');  
  const [error, setError] = useState('');
  const [message, setMessage] = useState('');
  const API_BASE_URL = process.env.REACT_APP_API_URL || 'http://localhost:5000';

  const user = localStorage.getItem('user'); // Retrieve the user object from localStorage
  const token = localStorage.getItem('token'); // Retrieve the token from localStorage

  const handleAddCampaign = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post(`${API_BASE_URL}/api/campaigns`, 
        { name: newCampaignName, user },
        { headers: { Authorization: `Bearer ${token}`} }
    );
      // localStorage.setItem('token', res.data.token);
      // localStorage.setItem('user', res.data.user);
      // setMsg('Login successful!');
      window.location.href = '/protected';
    } catch (err) {
      console.log(err);
      setMessage('Failed');
    }
  };

  useEffect(() => {
    
    axios.get(`${API_BASE_URL}/api/protected`, {
      headers: { Authorization: `Bearer ${token}` }
    })
      .then(res => setMessage(res.data.message))
      .catch(() => setMessage('Access denied'));
    
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

      {/* Button to trigger the modal */}
      <button
        type="button"
        className="btn btn-primary mt-3"
        data-bs-toggle="modal"
        data-bs-target="#exampleModal"
      >
        Launch Modal
      </button>

      {/* Bootstrap Modal */}
      <div
        className="modal fade"
        id="exampleModal"
        tabIndex="-1"
        aria-labelledby="exampleModalLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog">
        <form onSubmit={handleAddCampaign}>
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id="exampleModalLabel">New Campaign</h5>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>
            <div className="modal-body">
                <div className="mb-3">
                  <label>Give your campaign a name:</label>
                  <input type="text" className="form-control" value={newCampaignName}
                    onChange={(e) => setNewCampaignName(e.target.value)} required />
                </div>
            </div>
            <div className="modal-footer">
              <button
                type="button"
                className="btn btn-secondary"
                data-bs-dismiss="modal"
              >
                Close
              </button>
              <button type="submit" className="btn btn-primary">
                Add it!
              </button>
            </div>
          </div>
        </form>
        </div>
      </div>
    </div>
  );
}

export default Protected;
