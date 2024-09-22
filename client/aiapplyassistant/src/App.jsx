import { useState } from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import HomePage from './pages/Homepage'
import LoginPage from './pages/LoginPage'

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/signin" element={<LoginPage />} />
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
