import React, { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom';
import './Register.css';
import { useDispatch, useSelector } from 'react-redux';
import { registerInitiate } from '../store/actions/userActions';

function Register() {
    const [state, setState] = useState({
      displayName: '',
      email: '',
      password: '',
      passwordConfirm: '',
    });
    const {currentUser} = useSelector((state) => state.user);
    const dispatch = useDispatch();
    const { displayName, email, password, passwordConfirm} = state;
    const navigate = useNavigate();

    useEffect(() => {
      if(currentUser) {
        navigate('/');
      }
    }, [currentUser, navigate]);

    const handleSubmit = (e) => {
      e.preventDefault();
      if(password !== passwordConfirm) {
        return;
      }
      dispatch(registerInitiate(email, password, displayName));
      console.log(email,password, displayName)
      console.log(e);
      setState({email: '', displayName: '', password: '', passwordConfirm: ''})
    }
    
    const handleChange = (e) => {
      let { name, value } = e.target;
      setState({ ...state, [name]: value });
    };

  return (
    <div>
        <div id='register-form' style={{textAlign: 'center'}}>
            <form className='form-signup' onSubmit={handleSubmit}>
                <h1 className='h3 mb-3 font-weight-normal' style={{textAlign: 'center'}} >
                    Sign up
                </h1>
                <input
                type={'text'}
                id='displayName'
                className='form-control'
                placeholder='Full Name'
                name='displayName'
                onChange={handleChange}
                value={displayName}
                required>
                </input>
                <input
                type={'email'}
                id='user-email'
                className='form-control'
                placeholder='Email'
                name='email'
                onChange={handleChange}
                value={email}
                required>
                </input>
                <input
                type={'password'}
                id='inputPassword'
                className='form-control'
                placeholder='Password'
                name='password'
                onChange={handleChange}
                value={password}
                required>
                </input>
                <input
                type={'password'}
                id='inputRePassword'
                className='form-control'
                placeholder='Repeat Password'
                name='passwordConfirm'
                onChange={handleChange}
                value={passwordConfirm}
                required>
                </input>
                <button className='btn btn-primary btn-block' type='submit'>
                  <i className='fas fa-user'></i> Sign In
                </button>
                <Link to={'/login'}>
                  <i className='fas fa-angle-left'></i> Back
                </Link>
            </form>
            <br></br>
        </div>
    </div>
  )
}

export default Register;