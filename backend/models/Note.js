const mongoose = require('mongoose');

const noteSchema = new mongoose.Schema({
  noteId: { type: String, required: true, unique: true },
  title: { type: String, required: true },
  content: { type: String, required: true },
  subject: { type: String, required: true },
  createdBy: { type: String, required: true },
  lastEditedBy: { type: String },
  lastEditedAt: { type: Date },
  createdAt: { type: Date, default: Date.now },
  collaborators: [{ type: String }],
});

module.exports = mongoose.model('Note', noteSchema);
