import { createContext, useContext, useEffect, useState } from "react";
import axios from 'axios'

const AuthContext = createContext({})


export function AuthProvider({ children }) {
  const [user, setUser] = useState(null)
  const [loading, setLoading] = useState(true)

  async function signup(userData) {
    try {
      const { data: responseData } = await axios.post('http://localhost:3000/api/user/auth/register', userData, { withCredentials: true })
      // console.log(responseData)
      setUser(responseData.user)
      return {
        success: responseData.success,
        message: responseData.message
      }
    } catch (error) {
      return {
        success: error.response.data.success,
        message: error.response.data.message || error.message
      }
    }
  }

  async function login(userData) {
    try {
      const { data: responseData } = await axios.post('http://localhost:3000/api/user/auth/login', userData, { withCredentials: true })
      setUser(responseData.user)
      return {
        success: responseData.success,
        message: responseData.message
      }
    } catch (error) {
      return {
        success: error.response.data.success || false,
        message: error.response.data.message || error.message
      }
    }
  }

  useEffect(() => {
    async function getUser() {
      try {
        const { data: responseData } = await axios.get('http://localhost:3000/api/user/auth', { withCredentials: true })
        setUser(responseData.user)
        return {
          success: responseData.success
        }
      } catch (error) {
        setUser(null)
        return {
          success: error.responseData?.success || false,
          message: error.responseData?.message || error.message
        }
      } finally {
        setLoading(false)
      }
    }

    getUser()
  }, [])

  async function logout() {
    try {
      const {data: responseData} = await axios.post('http://localhost:3000/api/user/auth/logout', {}, {withCredentials: true})
      setUser(null)
      return {
        success: responseData.success
      }
    } catch (error) {
      console.log("Logout Error",error)
    }
  }

  return (
    <AuthContext.Provider value={{ signup, user, login, loading, logout }}>
      {children}
    </AuthContext.Provider>
  )
}


export const useAuth = () => {
  const context = useContext(AuthContext)
  return context
}