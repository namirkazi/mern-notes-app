const express = require('express');
const router = express.Router();
// Import all four functions
const {
  getNotes,
  createNote,
  updateNote,
  deleteNote,
} = require('../controllers/noteController');

const { protect } = require('../middleware/authMiddleware');

// Routes for getting all notes and creating a new note
router.route('/').get(protect, getNotes).post(protect, createNote);

// Routes for updating and deleting a specific note by its ID
router.route('/:id').put(protect, updateNote).delete(protect, deleteNote);

module.exports = router;