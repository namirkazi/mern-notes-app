import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import NoteForm from '../components/NoteForm';
import NoteItem from '../components/NoteItem';
import { getNotes, reset } from '../features/notes/noteSlice';

function Dashboard() {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { user } = useSelector((state) => state.auth);
  // ✅ This line looks for `state.note`. This requires `note:` to be in the store.
  const { notes, isLoading, isError, message } = useSelector(
    (state) => state.note
  );

  useEffect(() => {
    if (isError) console.log(message);
    if (!user) {
      navigate('/login');
      return;
    }
    dispatch(getNotes());
    return () => {
      dispatch(reset());
    };
  }, [user, navigate, isError, message, dispatch]);

  if (isLoading) return <h1>Loading...</h1>;

  // ✅ The error happens here because 'notes' is undefined
  return (
    <>
      <section className='heading'>
        <h1>Welcome {user && user.name}</h1>
        <p>Notes Dashboard</p>
      </section>

      <NoteForm />

      <section className='content'>
        {notes && notes.length > 0 ? ( // Added a check for notes itself
          <div className='notes'>
            {notes.map((note) => (
              <NoteItem key={note._id} note={note} />
            ))}
          </div>
        ) : (
          <h3>You have not created any notes yet</h3>
        )}
      </section>
    </>
  );
}

export default Dashboard;