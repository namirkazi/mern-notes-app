const mongoose = require('mongoose');

const noteSchema = mongoose.Schema(
  {
    // This creates a relationship between the Note and the User
    user: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: 'User', // The model to link to
    },
    title: {
      type: String,
      required: [true, 'Please add a title'],
    },
    content: {
      type: String,
      required: [true, 'Please add some content'],
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model('Note', noteSchema);