const express = require('express');
const User = require('../models/User');

const router = express.Router();

// Create a new user
router.post('/', async (req, res) => {
  const { userId, displayName, email } = req.body;
  try {
    const user = new User({ userId, displayName, email });
    await user.save();
    res.status(201).json(user);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

module.exports = router;
