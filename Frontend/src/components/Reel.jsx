import React from 'react'
import { useNavigate } from 'react-router-dom'

function Reel({reel, location}) {

  const navigate = useNavigate()

  return (
    <div
      className="aspect-square rounded-xl border border-gray-300 dark:border-neutral-700 bg-gray-100 dark:bg-neutral-800 flex items-center justify-center text-xs text-gray-400 overflow-hidden"
    >
      <video
        src={reel.video}
        muted
        playsInline
        preload="metadata"
        className="h-full w-full object-cover cursor-pointer"
        onMouseEnter={(e) => e.currentTarget.play()}
        onMouseLeave={(e) => {
          e.currentTarget.pause()
          e.currentTarget.currentTime = 0
        }}
        onClick={() => {
          navigate(`/creator/reel/${reel._id}`, {
            state: { backgroundLocation: location }
          })
        }}
      />
    </div>
  )
}

export default Reel