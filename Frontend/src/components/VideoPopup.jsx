import { IoClose } from "react-icons/io5";
import { useReel } from "../context/ReelContext";
import { useNavigate, useParams } from "react-router-dom";
import { useEffect } from "react";

function VideoPopup() {

  const { reel, getReel, setReel } = useReel()

  const { reelId } = useParams()

  const navigate = useNavigate()

  useEffect(() => {
    if (!reelId) return
    getReel(reelId)

    return () => setReel(null)
  }, [reelId, getReel, setReel])

  return (
    <div className='bg-white/5 backdrop-blur-md min-h-screen w-full flex items-center justify-center fixed top-0'>
      <div className='h-[90vh] w-[90vw] md:w-1/3 rounded overflow-hidden relative'>
        <video
          key={reelId}
          className='w-full h-full object-cover'
          src={reel?.video}
          playsInline
          loop
          muted
          autoPlay
        />
        <button onClick={() => navigate(-1)} className="text-gray-400 absolute right-5 top-5 outline-none p-1 rounded-full bg-white/5">
          <IoClose />
        </button>
      </div>
    </div>
  )
}

export default VideoPopup