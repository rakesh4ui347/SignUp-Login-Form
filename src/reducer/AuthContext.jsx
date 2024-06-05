import React, {
  createContext,
  useCallback,
  useContext,
  useReducer,
} from 'react';
import { AUTH_ACTION, authReducer, initialState } from './authReducer';
import { authService } from '../services/authService';

export const AuthContext = createContext();

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
  const [state, dispatch] = useReducer(authReducer, initialState);

  const performLogin = useCallback(
    (payload) => {
      (async () => {
        try {
          const response = await authService.login(payload);
          dispatch({ type: AUTH_ACTION.LOGIN_SUCCESS, payload: response.user });
        } catch (error) {
          dispatch({ type: AUTH_ACTION.LOGIN_FAILURE, payload: error.message });
        }
      })();
    },
    [dispatch]
  );

  const performSignup = useCallback(
    (payload) => {
      (async () => {
        try {
          const response = await authService.signup(payload);
          dispatch({
            type: AUTH_ACTION.SIGNUP_SUCCESS,
            payload: response.user,
          });
        } catch (error) {
          dispatch({
            type: AUTH_ACTION.SIGNUP_FAILURE,
            payload: error.message,
          });
        }
      })();
    },
    [dispatch]
  );

  const handleSubmit = useCallback((e, isSignup = false) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const payload = Object.fromEntries(formData);
    if (isSignup) {
      performSignup(payload);
    } else {
      performLogin(payload);
    }
  }, []);

  const value = { handleSubmit, ...state };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
