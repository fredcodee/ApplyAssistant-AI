import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { AuthProvider } from "./context/AuthContext";
import PrivateRoute from './context/PrivateRoute';
import HomePage from './pages/Homepage'
import LoginPage from './pages/LoginPage'
import Dashboard from './pages/Dashboard'
import GithubLogin from './pages/GithubLogin';
import JobDetails from './pages/JobDetails';
import AddJob from './pages/AddJob';
import Index from './Resume/index';

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
          <Route path="/job" element={<PrivateRoute><JobDetails /></PrivateRoute>} />
          <Route path="/add-job" element={<PrivateRoute><AddJob /></PrivateRoute>} />
          <Route path="/kits" element={<PrivateRoute><Index /></PrivateRoute>} />
        </Routes>
        </AuthProvider>
      </BrowserRouter>
    </>
  )
}

export default App
