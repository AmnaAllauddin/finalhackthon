const Note = require('../models/Note');
exports.createNote = async (req, res) => {
  try {
    const { title, content, subject, createdBy } = req.body;
    const newNote = new Note({
      title,
      content,
      subject,
      createdBy,
      collaborators: [createdBy],  
    });

    await newNote.save();
    res.status(201).json(newNote);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
};

// Get all notes
exports.getAllNotes = async (req, res) => {
  try {
    const notes = await Note.find();
    res.status(200).json(notes);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
};

// Get note by ID
exports.getNoteById = async (req, res) => {
  const { id } = req.params;
  try {
    const note = await Note.findById(id);
    if (!note) {
      return res.status(404).json({ message: 'Note not found' });
    }
    res.status(200).json(note);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
};

// Update a note
exports.updateNote = async (req, res) => {
  const { id } = req.params;
  const { title, content, subject, lastEditedBy } = req.body;
  try {
    const note = await Note.findById(id);
    if (!note) {
      return res.status(404).json({ message: 'Note not found' });
    }

    note.title = title || note.title;
    note.content = content || note.content;
    note.subject = subject || note.subject;
    note.lastEditedBy = lastEditedBy;
    note.lastEditedAt = Date.now();

    await note.save();
    res.status(200).json(note);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
};

// Delete a note
exports.deleteNote = async (req, res) => {
  const { id } = req.params;
  try {
    const note = await Note.findByIdAndDelete(id);
    if (!note) {
      return res.status(404).json({ message: 'Note not found' });
    }
    res.status(200).json({ message: 'Note deleted successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
};

// Share a note with others (update collaborators)
exports.shareNote = async (req, res) => {
  const { id } = req.params;
  const { collaboratorId } = req.body; // userId to add as a collaborator
  try {
    const note = await Note.findById(id);
    if (!note) {
      return res.status(404).json({ message: 'Note not found' });
    }

    // Ensure collaborator is not already added
    if (!note.collaborators.includes(collaboratorId)) {
      note.collaborators.push(collaboratorId);
      await note.save();
      res.status(200).json({ message: 'Note shared successfully', note });
    } else {
      res.status(400).json({ message: 'User is already a collaborator' });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
};
