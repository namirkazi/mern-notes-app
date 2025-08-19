import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { createNote } from '../features/notes/noteSlice';

function NoteForm() {
  const [formData, setFormData] = useState({ title: '', content: '' });
  const { title, content } = formData;
  const dispatch = useDispatch();

  const onChange = (e) => {
    setFormData((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };

  const onSubmit = (e) => {
    e.preventDefault();
    dispatch(createNote({ title, content }));
    setFormData({ title: '', content: '' });
  };

  return (
    <section className='form'>
      <form onSubmit={onSubmit}>
        <div className='form-group'>
          <label htmlFor='title'>Title</label>
          <input type='text' name='title' id='title' value={title} onChange={onChange} />
        </div>
        <div className='form-group'>
          <label htmlFor='content'>Content</label>
          <textarea name='content' id='content' value={content} onChange={onChange}></textarea>
        </div>
        <div className='form-group'>
          <button className='btn btn-block' type='submit'>
            Add Note
          </button>
        </div>
      </form>
    </section>
  );
}
export default NoteForm;