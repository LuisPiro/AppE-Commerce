// src/context/AuthContext.jsx
import { createContext, useReducer, useEffect } from "react";
import axiosInstance from "../axiosConfig";
import * as jwtDecode from "jwt-decode";

const AuthContext = createContext();

const initialState = {
  user: null,
  token: null,
  isAuthenticated: false,
};

const authReducer = (state, action) => {
  switch (action.type) {
    case 'LOGIN_SUCCESS':
      return {
        ...state,
        user: action.payload.user,
        token: action.payload.token,
        isAuthenticated: true,
      };
    case 'LOGOUT':
      return {
        ...state,
        user: null,
        token: null,
        isAuthenticated: false,
      };
    default:
      return state;
  }
};

export const AuthProvider = ({ children }) => {
  const [state, dispatch] = useReducer(authReducer, initialState);

  const login = async (credentials) => {
    try {
      const { data } = await axiosInstance.post('/auth/login', credentials);
      const decodedUser = jwtDecode(data.token); // Aquí sigue igual
      dispatch({
        type: 'LOGIN_SUCCESS',
        payload: {
          user: decodedUser,
          token: data.token,
        },
      });
      localStorage.setItem('token', data.token);
    } catch (error) {
      console.error(error);
    }
  };

  const logout = () => {
    dispatch({ type: 'LOGOUT' });
    localStorage.removeItem('token');
  };

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      const decodedUser = jwtDecode(token);
      dispatch({
        type: 'LOGIN_SUCCESS',
        payload: { user: decodedUser, token },
      });
    }
  }, []);

  return (
    <AuthContext.Provider value={{ ...state, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContext;
