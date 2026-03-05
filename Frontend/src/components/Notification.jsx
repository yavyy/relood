import React from 'react'
import { useState } from 'react'

function Notification({ message, success, showNotification }) {

  

  return (
    showNotification &&
    <div div className={`absolute w-1/2 md:w-1/4 z-50 top-40 rounded-md ${success ? 'bg-green-200' : 'bg-red-200'} p-3`} >
      <p className={`${success ? 'text-green-500' : 'text-red-500'} font`}>{message}</p>
    </div >
  )
}

export default Notification