'use client'

import React, { useState } from 'react'

import Image from 'next/image'

export default function Page() {
  const [formData, setFormData] = useState({
    title: '',
    profileImage: null,
    status: 'active',
    checkbox: '',
    workout: '',
    feature: 'yes',
    diet_categ: '',
    calories: '',
    carbs: '',
    protein: '',
    fat: '',
    servings: '',
    totaltime: ''
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

    console.log(formData)

    // Handle form submission (e.g., API call to update user info)

    console.log('Form submitted', formData)
  }

  return (
    <div className=' p-2'>
      {/* main title  */}
      <div className='main-header bg-slate-900 flex flex-row items-center justify-between shadow-md shadow-red-400 py-3 px-3 rounded-t-md'>
        <h1 className='text-slate-300 text-2xl '>Add Diet</h1>
        <button className='p-3 rounded-lg bg-yellow-400 text-white hover:bg-yellow-500 cursor-pointer'>Back</button>
      </div>
      <div className=' mx-auto bg-slate-800 p-8 border border-t-0 border-gray-200 rounded-b-lg shadow'>
        <form onSubmit={handleSubmit} className='grid grid-cols-1 md:grid-cols-3 gap-6'>
          {/* item  */}
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
              className=' mt-1 block w-full px-3 py-2 border bg-slate-900 border-gray-700 rounded-md shadow-sm focus:outline-none focus:ring focus:ring-yellow-400 '
            />
          </div>

          {/* item  */}
          <div>
            <label htmlFor='diet_categ' className='block text-sm font-medium text-gray-200'>
              Category Diet *
            </label>
            <select
              name='diet_categ'
              id='diet_categ'
              value={formData.diet_categ}
              onChange={handleChange}
              className='mt-1 block w-full px-3 py-2 border bg-slate-900 border-gray-700 text-slate-400 rounded-md shadow-sm focus:outline-none focus:rounded-b-none '
            >
              <option value='exercis_ball'>Exercise ball </option>
              <option value='barbell'>barbell</option>
              <option value='bench'>bench</option>
              <option value='kettlebells'>kettlebells</option>
              <option value='jump_rope'>jump rope</option>
              <option value='dumbell'>dumbell</option>
            </select>
          </div>
          {/* item  */}
          <div>
            <label htmlFor='calories' className='block text-sm font-medium text-gray-200'>
              calories *
            </label>
            <input
              type='text'
              name='calories'
              id='calories'
              value={formData.calories}
              onChange={handleChange}
              className=' mt-1 block w-full px-3 py-2 border bg-slate-900 border-gray-700 rounded-md shadow-sm focus:outline-none focus:ring focus:ring-yellow-400 '
            />
          </div>
          {/* item  */}
          <div>
            <label htmlFor='calories' className='block text-sm font-medium text-gray-200'>
              calories *
            </label>
            <input
              type='text'
              name='calories'
              id='calories'
              value={formData.calories}
              onChange={handleChange}
              className=' mt-1 block w-full px-3 py-2 border bg-slate-900 border-gray-700 rounded-md shadow-sm focus:outline-none focus:ring focus:ring-yellow-400 '
            />
          </div>
          {/* item  */}
          <div>
            <label htmlFor='carbs' className='block text-sm font-medium text-gray-200'>
              carbs *
            </label>
            <input
              type='text'
              name='carbs'
              id='carbs'
              value={formData.carbs}
              onChange={handleChange}
              className=' mt-1 block w-full px-3 py-2 border bg-slate-900 border-gray-700 rounded-md shadow-sm focus:outline-none focus:ring focus:ring-yellow-400 '
            />
          </div>
          {/* item  */}
          <div>
            <label htmlFor='protein' className='block text-sm font-medium text-gray-200'>
              protein *
            </label>
            <input
              type='text'
              name='protein'
              id='protein'
              value={formData.protein}
              onChange={handleChange}
              className=' mt-1 block w-full px-3 py-2 border bg-slate-900 border-gray-700 rounded-md shadow-sm focus:outline-none focus:ring focus:ring-yellow-400 '
            />
          </div>
          {/* item  */}
          <div>
            <label htmlFor='fat' className='block text-sm font-medium text-gray-200'>
              fat *
            </label>
            <input
              type='text'
              name='fat'
              id='fat'
              value={formData.fat}
              onChange={handleChange}
              className=' mt-1 block w-full px-3 py-2 border bg-slate-900 border-gray-700 rounded-md shadow-sm focus:outline-none focus:ring focus:ring-yellow-400 '
            />
          </div>
          {/* item  */}
          <div>
            <label htmlFor='servings' className='block text-sm font-medium text-gray-200'>
              servings *
            </label>
            <input
              type='text'
              name='servings'
              id='servings'
              value={formData.servings}
              onChange={handleChange}
              className=' mt-1 block w-full px-3 py-2 border bg-slate-900 border-gray-700 rounded-md shadow-sm focus:outline-none focus:ring focus:ring-yellow-400 '
            />
          </div>
          {/* item  */}
          <div>
            <label htmlFor='totaltime' className='block text-sm font-medium text-gray-200'>
              totaltime *
            </label>
            <input
              type='text'
              name='totaltime'
              id='totaltime'
              value={formData.totaltime}
              onChange={handleChange}
              className=' mt-1 block w-full px-3 py-2 border bg-slate-900 border-gray-700 rounded-md shadow-sm focus:outline-none focus:ring focus:ring-yellow-400 '
            />
          </div>

          {/* item  */}
          <div>
            <label htmlFor='status' className='block text-sm font-medium text-gray-200'>
              Status *
            </label>
            <select
              name='status'
              id='status'
              value={formData.status}
              onChange={handleChange}
              className='mt-1 block w-full px-3 py-2 border bg-slate-900 border-gray-700 text-slate-400 rounded-md shadow-sm focus:outline-none focus:rounded-b-none'
            >
              <option value=''>Status </option>
              <option value='active'>Active</option>
              <option value='inactive'>Inactive</option>
              <option value='other'>Other</option>
            </select>
          </div>
          {/* item  */}
          <div>
            <label htmlFor='profileImage' className='block text-sm font-medium text-gray-200'>
              Image
            </label>
            <input
              type='file'
              name='profileImage'
              id='profileImage'
              accept='image/*'
              onChange={handleChange}
              className='mt-1 block w-full px-3 py-2 border bg-slate-900 border-gray-700 text-slate-400-gray-300 rounded-md shadow-sm focus:outline-none focus:rounded-b-none'
            />
          </div>
          {/* item  */}
          <div>
            <label htmlFor='redio' className='block text-sm font-medium text-gray-200'>
              Feature
            </label>
            <div className='flex items-center space-x-4'>
              <label className='flex items-center space-x-2'>
                <input
                  type='radio'
                  name='feature'
                  value='yes'
                  checked={formData.feature == 'yes'}
                  onChange={handleChange}
                  className=' '
                  style={{ backgroundColor: '#c2c' }}
                />
                <span>Yes</span>
              </label>
              <label className='flex items-center space-x-2'>
                <input
                  type='radio'
                  name='feature'
                  value='no'
                  checked={formData.feature == 'no'}
                  onChange={handleChange}
                  className=' '
                  style={{ backgroundColor: '#c2c' }}
                />
                <span>No</span>
              </label>
            </div>
          </div>

          {/* item  */}
          <div className=' mt-3'>
            <label htmlFor='checkbox' className='block text-sm font-medium text-gray-200'>
              Premium
            </label>
            <input type='checkbox' name='checkbox' id='checkbox' value={formData.checkbox} onChange={handleChange} />
          </div>

          {/* item  */}
          <div className='md:col-span-2'>
            <label htmlFor='description' className='block text-sm font-medium text-gray-200'>
              Description
            </label>
            <textarea
              name='description'
              id='description'
              cols='30'
              rows='10'
              className=' mt-1 block w-full px-3 py-2 border bg-slate-900 border-gray-700 rounded-md shadow-sm focus:outline-none focus:ring focus:ring-yellow-400 '
            ></textarea>
          </div>
          <div className='w-full h-48  flex items-end justify-end'>
            <button
              type='submit'
              className='w-48 cursor-pointer h-10 py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-yellow-500 hover:bg-yellow-600 focus:outline-none focus:ring-2 focus:ring-offset-2'
            >
              Save
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}
