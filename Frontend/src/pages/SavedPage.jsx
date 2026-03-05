import React from 'react'
import { IoIosArrowRoundBack } from 'react-icons/io'
import { useReel } from '../context/ReelContext'
import { useEffect } from 'react'
import Reel from '../components/Reel'
import { useLocation, useNavigate } from 'react-router-dom'
import Loader from '../components/Loader'

function SavedPage() {

  const { userSavedReels, getUserSavedReels } = useReel()

  const location = useLocation()

  const navigate = useNavigate()

  useEffect(() => {
    getUserSavedReels()
  }, [])

  return (
    <div className='min-h-screen w-full relative'>
      {
        !userSavedReels.length ?
          <Loader /> :
          <div className='p-4'>
            <button onClick={() => navigate(-1)} className='dark:text-white'>
              <IoIosArrowRoundBack size={25} />
            </button>
            <h2 className='dark:text-white text-2xl font-semibold'>Your Saved Reels</h2>
            <div className='h-px bg-gray-200 dark:bg-neutral-800 my-2' />
            <div className='grid grid-cols-3 gap-3'>
              {
                userSavedReels.map(reel => (
                  <Reel key={reel._id} reel={reel.savedReel} location={location} />
                ))
              }
            </div>
          </div>}
    </div>
  )
}

export default SavedPage