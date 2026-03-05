import Loader from '../components/Loader'
import { useAuth } from '../context/AuthContext'
import { Navigate } from 'react-router-dom'

function ProtectedRoutes({ children }) {
  const { user, loading } = useAuth()
  if (loading) {
    return (
      <div className='min-h-screen flex items-center justify-center'>
        <Loader size={100} />
      </div>
    )
  }
  return user ? children : <Navigate to={'/login'} replace />
}

export default ProtectedRoutes