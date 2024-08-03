import React from 'react'

const Modal = ({ children }) => {
  return (
    <div className='absolute top-0 w-3/6 mx-auto bg-gray-700 bg-opacity-50 flex justify-center items-center z-search'>
      <div className='bg-white p-6 rounded shadow-lg w-full min-h-5/6 border-4 border-[#ffff00]'>{children}</div>
    </div>
  )
}

export default Modal
