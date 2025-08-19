import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { deleteNote, updateNote } from '../features/notes/noteSlice';

function NoteItem({ note }) {
  const dispatch = useDispatch();

  // Local state for edit mode
  const [isEditing, setIsEditing] = useState(false);
  const [updatedData, setUpdatedData] = useState({
    title: note.title,
    content: note.content,
  });

  const { title, content } = updatedData;

  const onChange = (e) => {
    setUpdatedData((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };

  const handleDelete = () => {
    // Add a confirmation dialog before deleting
    if (window.confirm('Are you sure you want to delete this note?')) {
      dispatch(deleteNote(note._id));
    }
  };

  const handleSave = () => {
    dispatch(updateNote({ id: note._id, title, content }));
    setIsEditing(false); // Exit edit mode
  };

  return (
    <div className='note'>
      {isEditing ? (
        <div className='note-edit'>
          <input type="text" name="title" value={title} onChange={onChange} />
          <textarea name="content" value={content} onChange={onChange}></textarea>
          <button onClick={handleSave} className='btn btn-save'>Save</button>
        </div>
      ) : (
        <div>
          <div>{new Date(note.createdAt).toLocaleString('en-US')}</div>
          <h2>{note.title}</h2>
          <p>{note.content}</p>
          <div className='note-actions'>
            <button onClick={() => setIsEditing(true)} className='btn btn-edit'>Edit</button>
            <button onClick={handleDelete} className='btn btn-delete'>Delete</button>
          </div>
        </div>
      )}
    </div>
  );
}

export default NoteItem;