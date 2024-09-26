import React, { createContext, useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Api from '../Api';
import { jwtDecode } from "jwt-decode"

const AuthContext = createContext();

export default AuthContext;

export const AuthProvider = ({ children }) => {
    const [authTokens, setAuthTokens] = useState(() =>
        localStorage.getItem('token')
          ? JSON.parse(localStorage.getItem('token'))
          : null
      );
      const [user, setUser] = useState(() =>
        localStorage.getItem('token')
          ? jwtDecode(localStorage.getItem('token'))
          : null
      );
      const [loading, setLoading] = useState(true);
      const [error, setError] = useState('');
      const history = useNavigate();


  const loginUser = async (email, password) => {
    try {
      const response = await Api.post('api/user/login', {
        email,
        password,
      },
    );
      if (response.status === 200) {
            setAuthTokens(response.data.token);
            localStorage.setItem('token', JSON.stringify(response.data.token));
            setError('');
            history('/dashboard');
      }
    } catch (error) {
      setError(error.response.data.message);
    }
  };

  const handleGoogleAuth = async (credentials) => {
    try {
      const decodedCredentials = jwtDecode(credentials);
      const data = {
        email: decodedCredentials.email,
        sub: decodedCredentials.sub
      };

      const response = await Api.post('api/auth/google', data,);
      if (response.status === 200) {
            setAuthTokens(response.data.token);
            localStorage.setItem('token', JSON.stringify(response.data.token));
            setError('');
            history('/dashboard');

      }
    } catch (error) {
      setError(error.response.data.message);
    }
  };

  const logoutUser = async () => {
    localStorage.removeItem('token');
    setAuthTokens(null);
    history('/signin');
  };



  const contextData = {
    error,
    user,
    loginUser,
    logoutUser,
    handleGoogleAuth,
  };

  useEffect(() => {
    if (authTokens) {
      setUser(jwtDecode(authTokens));
    }
    setLoading(false);
  }, [authTokens, loading]);

  return (
    <AuthContext.Provider value={contextData}>
      {loading ? null : children}
    </AuthContext.Provider>
  );
};
