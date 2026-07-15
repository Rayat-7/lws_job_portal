import { Routes, Route } from 'react-router-dom'
import './App.css'
import HomePage from '../pages/Homepage'
import Login from '../pages/Login'
import RegisterCompany from '../pages/Register-Company'
import Registration from '../pages/Registration'
import ProtectedRoute from './components/auth/ProtectedRoute'
import CompanyDashboard from '../pages/company/CompanyDashboard'
import UserDashboard from '../pages/UserDashboard'
import User_profile from '../pages/job-seekers/User_profile'
import Applied_jobs from '../pages/job-seekers/Applied_jobs'
import EditProfile from '../pages/job-seekers/Edit-User-Profile'
import {QueryClient,QueryClientProvider} from "@tanstack/react-query"
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'
import CreateJob from '../pages/company/CreateJob'
import CompanyProfile from '../pages/company/CompanyProfile'
import createJob from '../pages/company/CreateJob'

function App() {
 const queryClient = new QueryClient()

  return (
    <QueryClientProvider client={queryClient}>
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

<Route path="/edit-profile" element={
          <ProtectedRoute allowedRole="USER">
            <EditProfile />
          </ProtectedRoute>
        } />

        <Route path='/my-applications' element={
          <ProtectedRoute allowedRole="USER">
            <Applied_jobs />
          </ProtectedRoute>
        } />
        
        {/* /// Role-Specific Protected Routes for Company */}

        <Route path="/company-dashboard" element={
          <ProtectedRoute allowedRole="COMPANY">
            <CompanyDashboard />
          </ProtectedRoute>
        } />
        <Route path="/company-profile" element={
          <ProtectedRoute allowedRole="COMPANY">
            <CompanyProfile />
          </ProtectedRoute>
        } />

        <Route path="/create-job" element={
          <ProtectedRoute allowedRole="COMPANY">
            <CreateJob />
          </ProtectedRoute>
        } />

        {/* Default route */}
        <Route path="/" element={<HomePage/>} />
        
      </Routes>
       <ReactQueryDevtools initialIsOpen={false} />
      </QueryClientProvider>
  )
}

export default App
