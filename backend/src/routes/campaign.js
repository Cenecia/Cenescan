const express = require('express');
const Campaign = require('../models/Campaign');
const auth = require('../middleware/auth');

const router = express.Router();

// Create a new campaign
router.post('/', auth, async (req, res) => {
  const { name } = req.body;

  try {
    const campaign = new Campaign({
      name,
      user: req.user.id, // Associate the campaign with the authenticated user
    });

    await campaign.save();
    res.status(201).json({ message: 'Campaign created', campaign });
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
});

// Get all campaigns for the authenticated user
router.get('/', auth, async (req, res) => {
  try {
    const campaigns = await Campaign.find({ user: req.user.id });
    res.json(campaigns);
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
});

module.exports = router;