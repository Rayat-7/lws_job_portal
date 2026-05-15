import React from 'react'
import { Navigate } from 'react-router-dom'

export default function ProtectedRoute ({children,allowedRole})  {
    const token =localStorage.getItem('token');
    const userRole=localStorage.getItem('role');
     
    if(!token){
        return <Navigate to="/login"/>
    }
    if(allowedRole && userRole !==allowedRole){
        return <Navigate to={userRole ==="COMPANY" ? '/company-dashboard' : "/user-dashboard"} />
    }

  return children;
}
