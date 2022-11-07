import * as userTypes from '../actionTypes/user';

const initialState = {
    loading: false,
    currentUser: null,
    error: null,
}

const userReducer = (state = initialState, action) => {
    switch (action.type) {
        case userTypes.REGISTER_START:
        case userTypes.LOGIN_START:
        case userTypes.LOGOUT_START:
        case userTypes.GOOGLE_SIGN_IN_START:
            return {...state, loading: true};
        case userTypes.REGISTER_SUCCESS:
        case userTypes.LOGIN_SUCCESS:
        case userTypes.GOOGLE_SIGN_IN_SUCCESS:
            return {...state, loading: false, currentUser: action.payload};
        case userTypes.LOGOUT_SUCCESS:
            return {...state, currentUser: null}
        case userTypes.REGISTER_FAIL:
        case userTypes.LOGIN_FAIL:
        case userTypes.LOGOUT_FAIL:
        case userTypes.GOOGLE_SIGN_IN_FAIL:
            return {...state, loading: false, error: action.payload};
        case userTypes.SET_USER:
            return {...state, loading: false, currentUser: action.payload};
        default:
            return state;
    }
}

export default userReducer;