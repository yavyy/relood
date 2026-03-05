import { useCallback, useContext } from 'react'
import { createContext } from 'react'
import axios from 'axios'
import { useState } from 'react'
import { useEffect } from 'react'
import { useAuth } from './AuthContext'


const ReelContext = createContext(null)


export default function ReelProvider({ children }) {

  const [videos, setVideos] = useState([])
  const [userSavedReels, setUserSavedReels] = useState([])
  const [creator, setCreator] = useState({})
  const [loading, setLoading] = useState(true)
  const [reel, setReel] = useState(null)

  const API = import.meta.env.VITE_BACKEND_API_URL

  const { user, loading: authLoading } = useAuth()

  async function createReel(fileData) {
    try {
      const { data: responseData } = await axios.post(`${API}/creator/create`, fileData, { withCredentials: true })
      if (!responseData) {
        throw new Error("Failed to create")
      }
      setVideos(prev => [...prev, responseData.reel])
      return {
        success: responseData.success,
        message: responseData.message
      }
    } catch (error) {
      return {
        success: error.response?.data?.success || false,
        message: error.response?.data?.message || error.message
      }
    }
  }

  async function getReels() {
    try {
      const { data: responseData } = await axios.get(`${API}/reel/reels`, { withCredentials: true })
      setVideos(responseData.reels || [])
      return {
        success: responseData?.success,
        message: responseData?.message
      }
    } catch (error) {
      setVideos([])
      return {
        success: error.response?.data?.success || false,
        message: error.response?.data?.message || error.message
      }
    } finally {
      setLoading(false)
    }
  }

  async function likeReel(id) {
    try {
      const { data: responseData } = await axios.post(`${API}/reel/like`, { reelId: id }, { withCredentials: true })
      // if (responseData?.like) {
      //   setVideos(prev => prev.map(video => video._id === id ? { ...video, likes: video.likes + 1 } : video))
      // } else {
      //   setVideos(prev => prev.map(video => video._id === id ? { ...video, likes: video.likes - 1 } : video))
      // }
      setVideos(prev => prev.map(video => (
        video._id === id ?
          {
            ...video,
            likes: responseData.like ? video.likes + 1 : video.likes - 1,
            isLiked: responseData.like
          } :
          video
      )))
      return {
        success: responseData?.success,
        message: responseData?.message,
      }
    } catch (error) {
      return {
        success: error.response?.data?.success || false,
        message: error.response?.data?.message || error.message
      }
    }
  }

  const getReel = useCallback(async function (reelId) {
    try {
      setReel(null)
      const { data: responseData } = await axios.get(`${API}/reel/${reelId}`, { withCredentials: true })
      setReel(responseData.reel)
      return {
        success: responseData?.success || true,
        message: responseData?.message,
      }
    } catch (error) {
      setReel(null)
      return {
        success: error.reponse?.data?.success || false,
        message: error.reponse?.data?.message || error.message,
      }
    }
  }, [])

  const getCreator = useCallback(
    async function (creatorId) {
      try {
        const { data: responseData } = await axios.get(`${API}/creator/${creatorId}`, { withCredentials: true })
        console.log(responseData)
        setCreator(responseData.creatorData)
        return {
          success: responseData.success || true,
          message: responseData.message
        }
      } catch (error) {
        return {
          success: error.response?.data?.success || false,
          message: error.response?.data?.message || error.message
        }
      }
    }, [])

  async function saveReel(reelId) {
    try {
      const { data: responseData } = await axios.post(`${API}/reel/save`, { reelId }, { withCredentials: true })
      console.log(responseData)
      setVideos(prev => prev.map(video => (
        video._id === reelId ?
          {
            ...video,
            saved: responseData.saved
          } :
          video
      )))
    } catch (error) {
      return {
        success: error.reponse?.data.success || false,
        message: error.reponse?.data.message || error.message
      }
    }
  }

  async function getUserSavedReels() {
    try {
      const { data: responseData } = await axios.get(`${API}/user/saved`, { withCredentials: true })
      setUserSavedReels(responseData.userSavedReels)
    } catch (error) {
      return {
        success: error.reponse.data.success || false,
        message: error
      }
    }
  }

  useEffect(() => {
    if (authLoading) return

    if (!user) {
      setVideos([])
      setLoading(false)
      return
    }

    getReels()
  }, [user, authLoading, setVideos])

  return (
    <ReelContext.Provider value={{ createReel, videos, loading, likeReel, getCreator, creator, getReel, reel, setReel, saveReel, userSavedReels, getUserSavedReels }}>
      {children}
    </ReelContext.Provider>
  )
}


export const useReel = () => {
  const context = useContext(ReelContext)
  return context
}