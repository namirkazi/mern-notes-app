const Note = require('../models/noteModel');

// ... (your existing getNotes and createNote functions are here) ...
const getNotes = async (req, res) => {
  const notes = await Note.find({ user: req.user._id });
  res.status(200).json(notes);
};

const createNote = async (req, res) => {
  const { title, content } = req.body;
  if (!title || !content) {
    return res.status(400).json({ message: 'Please add a title and content' });
  }
  const note = await Note.create({
    title,
    content,
    user: req.user._id,
  });
  res.status(201).json(note);
};

// @desc    Update a note
// @route   PUT /api/notes/:id
// @access  Private
const updateNote = async (req, res) => {
  const note = await Note.findById(req.params.id);

  if (!note) {
    return res.status(404).json({ message: 'Note not found' });
  }

  // Authorization: Check if the note belongs to the logged-in user
  if (note.user.toString() !== req.user._id.toString()) {
    return res.status(401).json({ message: 'User not authorized' });
  }

  const updatedNote = await Note.findByIdAndUpdate(req.params.id, req.body, {
    new: true, // Return the updated document
  });

  res.status(200).json(updatedNote);
};

// @desc    Delete a note
// @route   DELETE /api/notes/:id
// @access  Private
const deleteNote = async (req, res) => {
  const note = await Note.findById(req.params.id);

  if (!note) {
    return res.status(404).json({ message: 'Note not found' });
  }

  // Authorization: Check if the note belongs to the logged-in user
  if (note.user.toString() !== req.user._id.toString()) {
    return res.status(401).json({ message: 'User not authorized' });
  }

  await note.deleteOne();

  res.status(200).json({ id: req.params.id, message: 'Note removed' });
};


// Make sure to export the new functions
module.exports = {
  getNotes,
  createNote,
  updateNote,
  deleteNote,
};