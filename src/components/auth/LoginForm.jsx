import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'

const LoginForm = () => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [role, setRole] = useState('USER')
  const navigate = useNavigate()

  const handlelogin = async (e) => {
    e.preventDefault()
    try {
      const response = await fetch('http://localhost:5000/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password, role }),
      })

      const result = await response.json()

      if (result.success) {
        localStorage.setItem('token', result.token)
        localStorage.setItem('role', result.data.role)

        if (result.data.role === 'COMPANY') {
          navigate('/company-dashboard')
        } else {
          navigate('/user-dashboard')
        }
      } else {
        console.error('Login failed:', result.message)
      }
    } catch (error) {
      console.error('Login failed', error)
    }
  }

  return (
    <div className='flex flex-col items-center justify-center bg-gray-100'>
      <form onSubmit={handlelogin} className='w-full max-w-md space-y-4'>
        <div>
          <label className='block text-sm font-medium mb-1'>Role</label>
          <select
            value={role}
            onChange={(e) => setRole(e.target.value)}
            className='w-full p-2 border rounded'
          >
            <option value='USER'>Job Seeker</option>
            <option value='COMPANY'>Company</option>
          </select>
        </div>
        <input
          type='email'
          placeholder='Email'
          className='w-full p-2 border rounded'
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <input
          type='password'
          placeholder='Password'
          className='w-full p-2 border rounded'
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <button type='submit' className='w-full p-2 bg-black text-white rounded'>
          Sign in
        </button>
      </form>
    </div>
  )
}

export default LoginForm