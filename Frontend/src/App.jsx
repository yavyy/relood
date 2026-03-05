import { AuthProvider } from './context/AuthContext'
import ReelProvider from './context/ReelContext'
import SavedPage from './pages/SavedPage'
import AppRoutes from './routes/AppRoutes'
import { BrowserRouter as Router } from 'react-router-dom'

function App() {
  return (
    <div className='min-h-screen bg-black/95 w-full place-items-center'>
      <Router>
        <AuthProvider>
          <ReelProvider>
            <AppRoutes />
          </ReelProvider>
        </AuthProvider>
      </Router>
    </div>
  )
}

export default App