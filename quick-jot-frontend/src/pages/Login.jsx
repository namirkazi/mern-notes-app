import { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { login, reset } from '../features/auth/authSlice';

function Login() {
  const [formData, setFormData] = useState({ email: '', password: '' });
  const { email, password } = formData;
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { user, isLoading, isError, isSuccess, message } = useSelector(
    (state) => state.auth
  );

  useEffect(() => {
    if (isError) {
      console.error(message);
    }
    if (user) {
      navigate('/');
    }
    // This cleanup function runs ONLY when we leave the component
    return () => {
      dispatch(reset());
    };
  }, [user, isError, navigate, dispatch]);

  const onChange = (e) => {
    setFormData((prevState) => ({ ...prevState, [e.target.name]: e.target.value }));
  };

  const onSubmit = (e) => {
    e.preventDefault();
    dispatch(login({ email, password }));
  };

  if (isLoading) {
    return <h1>Loading...</h1>;
  }

  return (
    <>
      <section className='heading'>
        <h1>Login</h1>
        <p>Login and start creating notes</p>
      </section>
      <section className='form'>
        <form onSubmit={onSubmit}>
          <div className='form-group'>
            <input type='email' id='email' name='email' value={email} placeholder='Enter your email' onChange={onChange} />
          </div>
          <div className='form-group'>
            <input type='password' id='password' name='password' value={password} placeholder='Enter password' onChange={onChange} />
          </div>
          <div className='form-group'>
            <button type='submit' className='btn btn-block'>Submit</button>
          </div>
        </form>
      </section>
    </>
  );
}
export default Login;