import React from 'react'

const Modal = ({ children }) => {
  return (
    <div className='fixed top-10 inset-0 bg-gray-600 bg-opacity-50 flex justify-center items-center z-50'>
      <div className='bg-white p-6 rounded shadow-lg w-2/6'>{children}</div>
    </div>
  )
}

export default Modal
