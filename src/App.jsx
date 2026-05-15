import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from './assets/vite.svg'
import heroImg from './assets/hero.png'
import {Routes,Route, BrowserRouter} from 'react-router-dom'
import './App.css'
import HomePage from '../pages/Homepage'
import Login from '../pages/Login'
import RegisterCompany from '../pages/Register-Company'
import Registration from '../pages/Registration'
import ProtectedRoute from './components/auth/ProtectedRoute'
import CompanyDashboard from '../pages/CompanyDashboard'
import UserDashboard from '../pages/UserDashboard'
function App() {
 

  return (
    <BrowserRouter>
      <Routes>
        {/* Public Routes */}
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Registration />} />
        
        {/* Role-Specific Protected Routes */}
        <Route path="/user-dashboard" element={
          <ProtectedRoute allowedRole="USER">
            <UserDashboard />
          </ProtectedRoute>
        } />

        <Route path="/company-dashboard" element={
          <ProtectedRoute allowedRole="COMPANY">
            <CompanyDashboard />
          </ProtectedRoute>
        } />

        {/* Default route */}
        <Route path="/" element={<HomePage/>} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
