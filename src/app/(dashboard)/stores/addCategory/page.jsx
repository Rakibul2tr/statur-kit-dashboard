'use client'
import React, { useEffect, useState } from 'react'

import { useCreateProductCategoryMutation } from '@/redux/api/apiSlice'

export default function Page() {
  const [userData, setUserData] = useState({})
  const [createProductCategory, { isLoading, isSuccess, isError, error }] = useCreateProductCategoryMutation()

  const [formData, setFormData] = useState({
    id: 0,
    title: 'test cat 3',
    description: 'details',
    photo_url: '',
    is_active: true
  })

  useEffect(() => {
    const localData = async () => {
      const data = localStorage.getItem('user')
      const userData = JSON.parse(data)

      if (userData) {
        setUserData(userData)
      } else {
        return
      }
    }

    localData()

    if (isSuccess) {
      alert('created succesfull')
    } else if (isError) {
      alert('check error')
    }
  }, [isSuccess, isError])

  const handleChange = e => {
    const { name, value, type, checked } = e.target

    setFormData({
      ...formData,
      [name]: type === 'checkbox' ? checked : value
    })
  }

  // console.log('user', userData)

  const handleSubmit = async e => {
    e.preventDefault()

    // Replace with actual token

    await createProductCategory({ token: userData?.token, categoryData: formData })
  }

  return (
    <div>
      {/* main title  */}
      <div className='  py-8 px-3 '>
        <h1 className='text-slate-300 text-2xl text-center'>Create Product Category </h1>
      </div>
      <form onSubmit={handleSubmit} className='max-w-2xl mx-auto p-4 bg-slate-950 shadow-md rounded-lg'>
        <div className='mb-4'>
          <label className='block text-white font-bold mb-2'>ID:</label>
          <input
            type='number'
            name='id'
            value={formData.id}
            onChange={handleChange}
            className='w-full px-3 py-2 text-white bg-slate-800 border rounded-lg shadow-sm focus:outline-none focus:border-blue-500'
          />
        </div>
        <div className='mb-4'>
          <label className='block text-white font-bold mb-2'>Title:</label>
          <input
            type='text'
            name='title'
            value={formData.title}
            onChange={handleChange}
            className='w-full px-3 py-2 text-white border bg-slate-800 rounded-lg shadow-sm focus:outline-none focus:border-blue-500'
          />
        </div>
        <div className='mb-4'>
          <label className='block text-white font-bold mb-2'>Description:</label>
          <textarea
            name='description'
            value={formData.description}
            onChange={handleChange}
            className='w-full px-3 py-2 text-white border bg-slate-800 rounded-lg shadow-sm focus:outline-none focus:border-blue-500'
          />
        </div>
        <div className='mb-4'>
          <label className='block text-white font-bold mb-2'>Photo URL:</label>
          <input
            type='text'
            name='photo_url'
            value={formData.photo_url}
            onChange={handleChange}
            className='w-full px-3 py-2 text-white border bg-slate-800 rounded-lg shadow-sm focus:outline-none focus:border-blue-500'
          />
        </div>
        <button
          type='submit'
          className='w-full px-4 py-2 bg-[#ffff00] text-black font-bold rounded-lg shadow-md hover:bg-[#ffff44] focus:outline-none cursor-pointer'

          // disabled={isLoading}
        >
          Create Category
        </button>
      </form>
    </div>
  )
}
