const express = require('express');
const Note = require('../models/Note');

const router = express.Router();

// Create or update a note
router.post('/', async (req, res) => {
  const { noteId, title, content, subject, createdBy, collaborators } = req.body;
  try {
    const note = new Note({
      noteId,
      title,
      content,
      subject,
      createdBy,
      collaborators,
    });
    await note.save();
    res.status(201).json(note);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// Get all notes
router.get('/', async (req, res) => {
  try {
    const notes = await Note.find();
    res.json(notes);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;
