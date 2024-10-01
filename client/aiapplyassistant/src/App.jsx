import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { AuthProvider } from "./context/AuthContext";
import PrivateRoute from './context/PrivateRoute';
import HomePage from './pages/Homepage'
import LoginPage from './pages/LoginPage'
import Dashboard from './pages/Dashboard'
import GithubLogin from './pages/GithubLogin';

function App() {
  return (
    <>
      <BrowserRouter>
        <AuthProvider>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/signin" element={<LoginPage />} />
          <Route path="/auth/github/callback" element={<GithubLogin />} />
          <Route path="/dashboard" element={<PrivateRoute><Dashboard /></PrivateRoute>} />
        </Routes>
        </AuthProvider>
      </BrowserRouter>
    </>
  )
}

export default App
