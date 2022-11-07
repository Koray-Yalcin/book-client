import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { googleSignInInitiate, loginInitiate } from '../store/actions/userActions';
import './Login.css';

function Login() {
    const [state, setState] = useState({
        email: '',
        password: ''
    });

    const {email, password} = state;
    const {currentUser} = useSelector((state) => state.user);
    const dispatch = useDispatch();
    const navigate = useNavigate();

    useEffect(() => {
      if(currentUser) {
        navigate('/');
      }
    }, [currentUser, navigate]);
    const handleGoogleSignIn = () => {
         dispatch(googleSignInInitiate());
    }
    const handleFBSignIn = () => {}
    const handleSubmit = (e) => {
        e.preventDefault();
        if(!email || !password) {
            return;
        }
        dispatch(loginInitiate(email, password));
        setState({email: '', password: ''});
    }
    const handleChange = (e) => {
        let { name, value } = e.target;
        setState({ ...state, [name]: value });
      };

  return (
    <div>
        <div id='logreg-forms' style={{textAlign: 'center'}}>
            <form className='form-signin' onSubmit={handleSubmit}>
                <h1 className='h3 mb-3 font-weight-normal' style={{textAlign: 'center'}} >
                    Sign in
                </h1>
                <div className='social-login'>
                    <button className='btn google-btn social-btn' type='button' onClick={handleGoogleSignIn}>
                        <span>
                        <i className="fab fa-google-plus-g"></i> Sign in with Google+
                        </span>
                    </button>
                    <button className='btn facebook-btn social-btn' type='button' onClick={handleFBSignIn}>
                        <span>
                        <i className="fab fa-facebook-f"></i> Sign in with Facebook
                        </span>
                    </button>
                </div>
                <p style={{textAlign: 'center'}}>OR</p>
                <input
                type={'email'}
                id='inputEmail'
                className='form-control'
                typeof='button'
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
                typeof='button'
                placeholder='Password'
                name='password'
                onChange={handleChange}
                value={password}
                required>
                </input>
                <button className='btn btn-secondary btn-block' type='submit'>Sign In</button>
                <hr></hr>
                <p>Don't have an account?</p>
                <Link to={'/register'}>
                <button className='btn btn-primary btn-block' type='button' id='btn-signup'>
                    <i className='fas fa-user-plus'></i> Sign Up New Account
                </button>
                </Link>
            </form>
        </div>
    </div>
  )
}

export default Login;