export const initialState = {
  user: null,
  message: '',
};

export const AUTH_ACTION = {
  LOGIN_SUCCESS: 'LOGIN_SUCCESS',
  LOGIN_FAILURE: 'LOGIN_FAILURE',
  SIGNUP_SUCCESS: 'SIGNUP_SUCCESS',
  SIGNUP_FAILURE: 'SIGNUP_FAILURE',
  CLEAR_MESSAGE: 'CLEAR_MESSAGE',
};

export const authReducer = (state = initialState, action) => {
  switch (action.type) {
    case AUTH_ACTION.LOGIN_SUCCESS:
      return { ...state, user: action.payload, message: 'Login Success' };
    case AUTH_ACTION.LOGIN_FAILURE:
      return { ...state, user: null, message: action.payload };
    case AUTH_ACTION.SIGNUP_SUCCESS:
      return { ...state, user: action.payload, message: 'Signup Success' };
    case AUTH_ACTION.SIGNUP_FAILURE:
      return { ...state, user: null, message: action.payload };
    case AUTH_ACTION.CLEAR_MESSAGE:
      return { ...state, message: '' };
    default:
      return state;
  }
};
