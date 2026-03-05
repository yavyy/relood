import React from 'react'
import { useNavigate } from 'react-router-dom'

function Modal({message}) {
  const navigate = useNavigate()
  return (
    <div className='min-h-screen w-full bg-black/50 backdrop-blur-sm flex justify-center items-center relative'>
      <div className='p-4 bg-black text-white rounded-md border border-gray-200 flex flex-col justify-center gap-5 shadow-md'>
        <p className='text-lg'>{message}</p>
        <button onClick={() => navigate(-1)} className='bg-white text-black px-4 rounded self-start hover:bg-white/90 cursor-pointer'>Okay</button>
      </div>
    </div>
  )
}

export default Modal