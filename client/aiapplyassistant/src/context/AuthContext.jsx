import React, { createContext, useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Api from '../Api';
import Cookies from 'js-cookie';

const AuthContext = createContext();

export default AuthContext;

export const AuthProvider = ({ children }) => {
  const [authTokens, setAuthTokens] = useState(() => Cookies.get('access_token') || null);
  const [user, setUser] = useState(() => Cookies.get('access_token') ? jwtDecode(Cookies.get('access_token')) : null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const loginUser = async (email, password) => {
    try {
      const response = await Api.post('api/user/login', {
        email,
        password,
      });

      const data = response.data;
      if (response.status === 200) {
        // Set authTokens in cookies
        Cookies.set('access_token', data.token, { expires: 7 }); // Set for 7 days
        setAuthTokens(data.token);
        setError('');
        navigate('/dashboard');
      }
    } catch (error) {
      setError(error.response.data.message);
    }
  };

  const handleGoogleAuth = async (credentials, accountType) => {
    try {
      const decodedCredentials = jwtDecode(credentials);
      if (!decodedCredentials || !accountType) {
        setError('Error, please make sure you choose an account type and try again');
        return;
      }

      const data = {
        email: decodedCredentials.email,
        sub: decodedCredentials.sub
      };

      const response = await Api.post('api/auth/google', data);
      if (response.status === 200) {
        Cookies.set('access_token', response.data.token, { expires: 7 });
        setAuthTokens(response.data.token);
        setError('');
        navigate('/dashboard');
      }
    } catch (error) {
      setError(error.response.data.message);
    }
  };

  const logoutUser = async () => {
    // Clear cookies
    Cookies.remove('access_token');
    setAuthTokens(null);
    setError('');
    navigate('/login');
  };

  const contextData = {
    error,
    loginUser,
    logoutUser,
    handleGoogleAuth,
  };

  useEffect(() => {
    if (authTokens) {
      setUser(jwtDecode(authTokens));
    }
    setLoading(false);
  }, [authTokens]);

  return (
    <AuthContext.Provider value={contextData}>
      {loading ? null : children}
    </AuthContext.Provider>
  );
};
