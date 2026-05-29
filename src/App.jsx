import { Routes, Route } from 'react-router-dom'
import './App.css'
import HomePage from '../pages/Homepage'
import Login from '../pages/Login'
import RegisterCompany from '../pages/Register-Company'
import Registration from '../pages/Registration'
import ProtectedRoute from './components/auth/ProtectedRoute'
import CompanyDashboard from '../pages/CompanyDashboard'
import UserDashboard from '../pages/UserDashboard'
import User_profile from '../pages/job-seekers/User_profile'
import Applied_jobs from '../pages/job-seekers/Applied_jobs'
function App() {
 

  return (
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
         {/* Role-Specific Protected Routes */}
        <Route path="/user-profile" element={
          <ProtectedRoute allowedRole="USER">
            <User_profile />
          </ProtectedRoute>
        } />

        <Route path='/my-applications' element={
          <ProtectedRoute allowedRole="USER">
            <Applied_jobs />
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
  )
}

export default App
