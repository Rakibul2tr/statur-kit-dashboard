'use client'
import React, { useEffect, useState } from 'react'

import { useCreateProductCategoryMutation } from '@/redux/api/apiSlice'

export default function Page() {
  const [userData, setUserData] = useState({})
  const [createProductCategory, { isLoading, isSuccess, isError, error }] = useCreateProductCategoryMutation()

  const [formData, setFormData] = useState({
    id: 3,
    title: 'test cat 3',
    description: 'details',
    photo_url: 'https://i.ibb.co/R6Mgx17/product-1.jpg',
    is_active: true
  })

  useEffect(() => {
    const localData = async () => {
      const data = await localStorage.getItem('user')
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

  console.log('user', userData)

  const handleSubmit = async e => {
    e.preventDefault()

    // Replace with actual token

    await createProductCategory({ token: userData?.token, categoryData: formData })
  }

  return (
    <div>
      <form onSubmit={handleSubmit} className='max-w-2xl mx-auto p-4 bg-white shadow-md rounded-lg'>
        <div className='mb-4'>
          <label className='block text-gray-700 font-bold mb-2'>ID:</label>
          <input
            type='number'
            name='id'
            value={formData.id}
            onChange={handleChange}
            className='w-full px-3 py-2 border rounded-lg shadow-sm focus:outline-none focus:border-blue-500'
          />
        </div>
        <div className='mb-4'>
          <label className='block text-gray-700 font-bold mb-2'>Title:</label>
          <input
            type='text'
            name='title'
            value={formData.title}
            onChange={handleChange}
            className='w-full px-3 py-2 border rounded-lg shadow-sm focus:outline-none focus:border-blue-500'
          />
        </div>
        <div className='mb-4'>
          <label className='block text-gray-700 font-bold mb-2'>Description:</label>
          <textarea
            name='description'
            value={formData.description}
            onChange={handleChange}
            className='w-full px-3 py-2 border rounded-lg shadow-sm focus:outline-none focus:border-blue-500'
          />
        </div>
        <div className='mb-4'>
          <label className='block text-gray-700 font-bold mb-2'>Photo URL:</label>
          <input
            type='text'
            name='photo_url'
            value={formData.photo_url}
            onChange={handleChange}
            className='w-full px-3 py-2 border rounded-lg shadow-sm focus:outline-none focus:border-blue-500'
          />
        </div>
        <div className='mb-4'>
          <label className='block text-gray-700 font-bold mb-2'>Is Active:</label>
          <input
            type='checkbox'
            name='is_active'
            checked={formData.is_active}
            onChange={handleChange}
            className='h-5 w-5 text-blue-500 focus:ring-blue-500 border-gray-300 rounded'
          />
        </div>
        <button
          type='submit'
          className='w-full px-4 py-2 bg-green-500 text-white font-bold rounded-lg shadow-md hover:bg-green-700 focus:outline-none'

          // disabled={isLoading}
        >
          Submit
        </button>
      </form>
    </div>
  )
}
