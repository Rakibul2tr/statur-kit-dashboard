'use client'

import React, { useState } from 'react'

import Image from 'next/image'

export default function Page() {
  const [formData, setFormData] = useState({
    title: '',
    profileImage: null,
    status: 'active'
  })

  const handleChange = e => {
    const { name, value, files } = e.target

    if (name === 'profileImage') {
      setFormData({
        ...formData,
        profileImage: files[0]
      })
    } else {
      setFormData({
        ...formData,
        [name]: value
      })
    }
  }

  const handleSubmit = e => {
    e.preventDefault()

    // Handle form submission (e.g., API call to update user info)

    console.log('Form submitted', formData)
  }

  return (
    <div className=' p-2'>
      {/* main title  */}
      <div className='main-header bg-slate-900 flex flex-row items-center justify-between shadow-md shadow-red-400 py-3 px-3 rounded-t-md'>
        <h1 className='text-slate-300 text-2xl '>Add Body Part</h1>
        <button className='p-3 rounded-lg bg-yellow-400 text-white hover:bg-yellow-500 cursor-pointer'>Back</button>
      </div>
      <div className=' mx-auto bg-slate-800 p-8 border border-t-0 border-gray-200 rounded-b-lg shadow'>
        <form onSubmit={handleSubmit} className='grid grid-cols-1 md:grid-cols-3 gap-6'>
          <div>
            <label htmlFor='firstname' className='block text-sm font-medium text-gray-200'>
              Title *
            </label>
            <input
              type='text'
              name='title'
              id='title'
              value={formData.title}
              onChange={handleChange}
              className='mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring focus:ring-blue-200 focus:border-blue-300'
            />
          </div>

          <div>
            <label htmlFor='gender' className='block text-sm font-medium text-gray-200'>
              Status *
            </label>
            <select
              name='status'
              id='status'
              value={formData.status}
              onChange={handleChange}
              className='mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring focus:ring-blue-200 focus:border-blue-300'
            >
              <option value=''>Status </option>
              <option value='active'>Active</option>
              <option value='inactive'>Inactive</option>
              <option value='other'>Other</option>
            </select>
          </div>
          <div>
            <label htmlFor='profileImage' className='block text-sm font-medium text-gray-200'>
              Profile Image
            </label>
            <input
              type='file'
              name='profileImage'
              id='profileImage'
              accept='image/*'
              onChange={handleChange}
              className='mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring focus:ring-blue-200 focus:border-blue-300'
            />
          </div>
          <div className='md:col-span-1'>
            <button
              type='submit'
              className='w-full py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-yellow-500 hover:bg-yellow-600 focus:outline-none focus:ring-2 focus:ring-offset-2'
            >
              Save
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}
