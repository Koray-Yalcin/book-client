import * as userTypes from '../actionTypes/user';
import { auth, googleAuthProvider } from '../firebase';

const registerStart = () => ({
    type: userTypes.REGISTER_START,
});

const registerSuccess = (user) => ({
    type: userTypes.REGISTER_SUCCESS,
    payload: user
});

const registerFail = (user) => ({
    type: userTypes.REGISTER_FAIL,
    payload: user
});

const loginStart = () => ({
  type: userTypes.LOGIN_START,
});

const loginSuccess = (user) => ({
  type: userTypes.LOGIN_SUCCESS,
  payload: user
});

const loginFail = (user) => ({
  type: userTypes.LOGIN_FAIL,
  payload: user
});

const logoutStart = () => ({
  type: userTypes.LOGOUT_START,
});

const logoutSuccess = () => ({
  type: userTypes.LOGOUT_SUCCESS
});

const logoutFail = (error) => ({
  type: userTypes.LOGOUT_FAIL,
  payload: error
});

export const setUser = (user) => ({
  type: userTypes.SET_USER,
  payload: user
});

const googleSignInStart = () => ({
  type: userTypes.GOOGLE_SIGN_IN_START,
});

const googleSignInSuccess = (user) => ({
  type: userTypes.GOOGLE_SIGN_IN_SUCCESS,
  payload: user
});

const googleSignInFail = (error) => ({
  type: userTypes.GOOGLE_SIGN_IN_FAIL,
  payload: error
});

export const registerInitiate = (email, password, displayName) => {
  return function (dispatch) {
    dispatch(registerStart());
    auth
      .createUserWithEmailAndPassword(email, password)
      .then(({ user }) => {
        user.updateProfile({
          displayName,
        });
        dispatch(registerSuccess({ user, additionalData: { displayName } }));
      })
      .catch((error) => dispatch(registerFail(error.message)));
  };
};

export const loginInitiate = (email, password) => {
  return function (dispatch) {
    dispatch(loginStart());
    auth
      .signInWithEmailAndPassword(email, password)
      .then(({ user }) => {
        dispatch(loginSuccess({ user }));
      })
      .catch((error) => dispatch(loginFail(error.message)));
  };
};

export const logoutInitiate = () => {
  return function (dispatch) {
    dispatch(logoutStart());
    auth
      .signOut()
      .then(( resp ) => 
        dispatch(logoutSuccess()))
      .catch((error) => dispatch(logoutFail(error.message)));
  };
};

export const googleSignInInitiate = () => {
  return function (dispatch) {
    dispatch(googleSignInStart());
    auth
      .signInWithPopup(googleAuthProvider)
      .then(({user}) => {
        dispatch(googleSignInSuccess(user))
      })
      .catch((error) => dispatch(googleSignInFail(error.message)));
  };
};