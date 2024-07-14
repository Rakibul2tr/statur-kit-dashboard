'use client'

import React, { useEffect, useState } from 'react'

import { useCreateProductMutation } from '@/redux/api/apiSlice'

export default function Page() {
  const [formData, setFormData] = useState({
    category: 1,
    title: '',
    description: '',
    photo_url: '',
    discount_percent: 0
  })

  const [userData, setUserData] = useState({})
  const [createProduct, { isSuccess, error }] = useCreateProductMutation()

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
  }, [])
  useEffect(() => {
    if (isSuccess) {
      alert('created succesfull')
    } else if (error) {
      alert('Your category id is over. please gitve valid id.')
      console.log(error.data.category[0])
    }
  }, [isSuccess, error])

  console.log('error', error)

  const handleChange = e => {
    const { name, value } = e.target

    setFormData(prev => ({
      ...prev,
      [name]: name === 'discount_percent' || name === 'category' ? parseFloat(value) : value
    }))
  }

  const handleSubmit = async e => {
    e.preventDefault()
    console.log('product', formData)

    try {
      const token = userData.token

      await createProduct({ token: token, formData: formData })
    } catch (error) {
      console.error('Error submitting form data:', error)
    }
  }

  return (
    <div>
      <form onSubmit={handleSubmit} className='max-w-2xl mx-auto p-4 bg-slate-900 shadow-md rounded-lg'>
        <div className='mb-4'>
          <label className='block text-white font-bold mb-2'>Product Category Id :</label>
          <input
            type='number'
            name='category'
            value={formData.category}
            onChange={handleChange}
            className='w-full px-3 py-2 bg-slate-700 border rounded-lg shadow-sm focus:outline-none focus:border-white text-white'
          />
        </div>
        <div className='mb-4'>
          <label className='block text-white font-bold mb-2'>Product Title:</label>
          <input
            type='text'
            name='title'
            value={formData.title}
            onChange={handleChange}
            className='w-full px-3 py-2 bg-slate-700 border rounded-lg shadow-sm focus:outline-none focus:border-white text-white'
          />
        </div>
        <div className='mb-4'>
          <label className='block text-white font-bold mb-2'>Description:</label>
          <textarea
            name='description'
            value={formData.description}
            onChange={handleChange}
            className='w-full px-3 py-2 bg-slate-700 border rounded-lg shadow-sm focus:outline-none focus:border-white text-white'
          />
        </div>
        {/* <fieldset className='mb-4'>
          <legend className='text-white font-bold mb-2'>Features</legend>
          {formData.features.map((feature, index) => (
            <div key={index} className='mb-4 p-4 border rounded-lg shadow-sm'>
              <div className='mb-2'>
                <label className='block text-white font-bold mb-1'>Key:</label>
                <input
                  type='text'
                  name='key'
                  value={feature.key}
                  onChange={e => handleFeatureChange(index, e)}
                  className='w-full px-3 py-2 bg-slate-700 border rounded-lg shadow-sm focus:outline-none focus:border-white text-white'
                />
              </div>
              <div className='mb-2'>
                <label className='block text-white font-bold mb-1'>Data:</label>
                <input
                  type='text'
                  name='data'
                  value={feature.data}
                  onChange={e => handleFeatureChange(index, e)}
                  className='w-full px-3 py-2 bg-slate-700 border rounded-lg shadow-sm focus:outline-none focus:border-white text-white'
                />
              </div>
              <div className='mb-2'>
                <label className='block text-white font-bold mb-1'>Type:</label>
                <input
                  type='text'
                  name='type'
                  value={feature.type}
                  onChange={e => handleFeatureChange(index, e)}
                  className='w-full px-3 py-2 bg-slate-700 border rounded-lg shadow-sm focus:outline-none focus:border-white text-white'
                />
              </div>
            </div>
          ))}
          <button
            type='button'
            onClick={addFeature}
            className='px-4 py-2 bg-slate-700 text-white font-bold rounded-lg shadow-md hover:bg-blue-700 focus:outline-none'
          >
            Add Feature
          </button>
        </fieldset> */}
        {/* <div className='mb-4'>
          <label className='block text-white font-bold mb-2'>Is Active:</label>
          <input
            type='checkbox'
            name='is_active'
            checked={formData['is_active']}
            onChange={e => handleChange({ target: { name: 'is_active', value: e.target.checked } })}
            className='h-5 w-5 bg-slate-700  border-gray-300 rounded checked:bg-[#ffff00]'
          />
        </div> */}
        <div className='mb-4'>
          <label className='block text-white font-bold mb-2'>Photo URL:</label>
          <input
            type='text'
            name='photo_url'
            value={formData.photo_url}
            onChange={handleChange}
            className='w-full px-3 bg-slate-700 py-2 border rounded-lg shadow-sm focus:outline-none focus:border-white text-white'
          />
        </div>

        <div className='mb-4'>
          <label className='block text-white font-bold mb-2'>Tax Percentage:</label>
          <input
            type='number'
            name='discount_percent'
            value={formData.discount_percent}
            onChange={handleChange}
            className='w-full px-3 bg-slate-700 py-2 border rounded-lg shadow-sm focus:outline-none focus:border-white text-white'
          />
        </div>
        <button
          type='submit'
          className='w-full px-4 cursor-pointer py-2 bg-[#ffff00] text-black font-bold rounded-lg shadow-md hover:bg-yellow-300 focus:outline-none'
        >
          Create Product
        </button>
      </form>
    </div>
  )
}
