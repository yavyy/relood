import React from 'react'
import { Navigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'

function ReverseProtectedRoute({ children }) {
  const { user } = useAuth()
  return !user ? children : <Navigate to={'/explore'} replace />
}

export default ReverseProtectedRoute