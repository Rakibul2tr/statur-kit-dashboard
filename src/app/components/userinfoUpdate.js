'use client'

import React, { useState } from 'react'

import Image from 'next/image'

const UserInfoUpdate = () => {
  const [formData, setFormData] = useState({
    firstname: '',
    lastname: '',
    username: '',
    email: '',
    phone: '',
    password: '',
    gender: '',
    age: '',
    profileImage: null,
    status: 'active',
    role: 'user'
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
    <div className='flex flex-row w-full'>
      <div className='userImage w-3/12 bg-white rounded-lg'>
        <h2 className='text-2xl py-3 font-bold mb-6 text-slate-600 text-center'>Add User</h2>
        <div className='flex flex-col items-center justify-center'>
          <label
            htmlFor='profileImage'
            className='flex flex-col items-center justify-center text-sm font-medium text-gray-700'
          >
            <div className='flex bg-slate-800 w-24 h-24 rounded-xl items-center justify-center'>
              <Image src={''} alt='profile image' width={80} height={80} className='rounded-xl' />
            </div>
            <div className='relative text-center bottom-4 left-5 bg-slate-500 w-8 h-8 rounded-full'>
              <i className='tabler-pencil-plus text-red-600 ' />
            </div>
          </label>

          <input
            type='file'
            name='profileImage'
            id='profileImage'
            accept='image/*'
            onChange={handleChange}
            placeholder=''
            className='w-8 bg-yellow-300 absolute right-1 bottom-2 hidden'
          />
        </div>
        {/* user status  */}
        <div className='px-3'>
          <label htmlFor='status' className='block text-sm font-medium text-slate-500'>
            Status
          </label>
          <select
            name='status'
            id='status'
            value={formData.status}
            onChange={handleChange}
            className='mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring focus:ring-blue-200 focus:border-blue-300'
          >
            <option value='active'>Active</option>
            <option value='Inactive'>Inactive</option>
            <option value='pending'>Pending</option>
            <option value='Banned'>Banned</option>
          </select>
        </div>
        {/* user role  */}
        <div className='p-3'>
          <label htmlFor='role' className='block text-sm font-medium text-slate-500'>
            Role *
          </label>
          <select
            name='role'
            id='role'
            value={formData.role}
            onChange={handleChange}
            className='mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring focus:ring-blue-200 focus:border-blue-300'
          >
            <option value='User'>User</option>
            <option value='Admin'>Admin</option>
          </select>
        </div>
      </div>

      <div className='max-w-4xl w-8/12 mx-auto bg-white p-8 border border-gray-200 rounded-lg shadow'>
        <h2 className='text-2xl font-bold mb-6 text-gray-800'>Update User Info</h2>
        <form onSubmit={handleSubmit} className='grid grid-cols-1 md:grid-cols-2 gap-6'>
          <div>
            <label htmlFor='firstname' className='block text-sm font-medium text-gray-700'>
              First Name
            </label>
            <input
              type='text'
              name='firstname'
              id='firstname'
              value={formData.firstname}
              onChange={handleChange}
              className='mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring focus:ring-blue-200 focus:border-blue-300'
            />
          </div>
          <div>
            <label htmlFor='lastname' className='block text-sm font-medium text-gray-700'>
              Last Name
            </label>
            <input
              type='text'
              name='lastname'
              id='lastname'
              value={formData.lastname}
              onChange={handleChange}
              className='mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring focus:ring-blue-200 focus:border-blue-300'
            />
          </div>
          <div>
            <label htmlFor='username' className='block text-sm font-medium text-gray-700'>
              Username
            </label>
            <input
              type='text'
              name='username'
              id='username'
              value={formData.username}
              onChange={handleChange}
              className='mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring focus:ring-blue-200 focus:border-blue-300'
            />
          </div>
          <div>
            <label htmlFor='email' className='block text-sm font-medium text-gray-700'>
              Email
            </label>
            <input
              type='email'
              name='email'
              id='email'
              value={formData.email}
              onChange={handleChange}
              className='mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring focus:ring-blue-200 focus:border-blue-300'
            />
          </div>
          <div>
            <label htmlFor='phone' className='block text-sm font-medium text-gray-700'>
              Phone
            </label>
            <input
              type='text'
              name='phone'
              id='phone'
              value={formData.phone}
              onChange={handleChange}
              className='mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring focus:ring-blue-200 focus:border-blue-300'
            />
          </div>
          <div>
            <label htmlFor='password' className='block text-sm font-medium text-gray-700'>
              Password
            </label>
            <input
              type='password'
              name='password'
              id='password'
              value={formData.password}
              onChange={handleChange}
              className='mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring focus:ring-blue-200 focus:border-blue-300'
            />
          </div>
          <div>
            <label htmlFor='gender' className='block text-sm font-medium text-gray-700'>
              Gender
            </label>
            <select
              name='gender'
              id='gender'
              value={formData.gender}
              onChange={handleChange}
              className='mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring focus:ring-blue-200 focus:border-blue-300'
            >
              <option value=''>Select Gender</option>
              <option value='male'>Male</option>
              <option value='female'>Female</option>
              <option value='other'>Other</option>
            </select>
          </div>
          <div>
            <label htmlFor='password' className='block text-sm font-medium text-gray-700'>
              Age
            </label>
            <input
              type='text'
              name='age'
              id='age'
              value={formData.age}
              onChange={handleChange}
              className='mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring focus:ring-blue-200 focus:border-blue-300'
            />
          </div>
          <div>
            <button
              type='submit'
              className='w-full py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-yellow-400 hover:bg-yellow-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-yellow-700 cursor-pointer'
            >
              Update Info
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}

export default UserInfoUpdate
