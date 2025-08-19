import { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { register, reset } from '../features/auth/authSlice';

function Register() {
  const [formData, setFormData] = useState({ name: '', email: '', password: '', password2: '' });
  const { name, email, password, password2 } = formData;
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
    if (password !== password2) {
      console.log('Passwords do not match');
    } else {
      dispatch(register({ name, email, password }));
    }
  };

  if (isLoading) {
    return <h1>Loading...</h1>;
  }

  return (
    <>
      <section className='heading'>
        <h1>Register</h1>
        <p>Please create an account</p>
      </section>
      <section className='form'>
        <form onSubmit={onSubmit}>
          <div className='form-group'>
            <input type='text' id='name' name='name' value={name} placeholder='Enter your name' onChange={onChange} />
          </div>
          <div className='form-group'>
            <input type='email' id='email' name='email' value={email} placeholder='Enter your email' onChange={onChange} />
          </div>
          <div className='form-group'>
            <input type='password' id='password' name='password' value={password} placeholder='Enter password' onChange={onChange} />
          </div>
          <div className='form-group'>
            <input type='password' id='password2' name='password2' value={password2} placeholder='Confirm password' onChange={onChange} />
          </div>
          <div className='form-group'>
            <button type='submit' className='btn btn-block'>Submit</button>
          </div>
        </form>
      </section>
    </>
  );
}
export default Register;