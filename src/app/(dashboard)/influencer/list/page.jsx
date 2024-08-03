'use client'
import React, { useEffect, useState } from 'react'

import Image from 'next/image'

import Modal from '../../../components/Modal'

import {
  useGetInfluencerListQuery,
  useCreateInfluencerMutation,
  useUpdateInfluencerMutation,
  useDeleteInfluencerMutation
} from '@/redux/api/apiSlice'

const theadData = [
  {
    Id: 'id',
    name: 'name',
    description: 'Description',
    commission: 'commission_percentage',
    discount: 'discount_percentage',
    image: 'photo_url',
    facebook: 'facebook',
    instagram: 'instagram',
    actions: 'actions'
  }
]

export default function Page() {
  const [userData, setUserData] = useState({})
  const [showModal, setShowModal] = useState(false)
  const [createModal, setCreateModal] = useState(false)
  const [selectedItem, setSelectedItem] = useState({})

  const {
    data: influencer,
    isSuccess,
    refetch
  } = useGetInfluencerListQuery({ token: userData.token ? userData.token : null })

  const [createInfluencer, { isSuccess: createSuccess, error: createError }] = useCreateInfluencerMutation()
  const [updateInfluencer, { data, isSuccess: updateSuccess, error: updateError }] = useUpdateInfluencerMutation()
  const [deleteInfluencer, { isSuccess: deleteSuccess, error: deleteError }] = useDeleteInfluencerMutation()

  const [formData, setFormData] = useState({
    name: selectedItem?.name || '',
    description: selectedItem?.description || '',
    commission_percentage: selectedItem?.commission_percentage || 0,
    discount_percentage: selectedItem?.discount_percentage || 0,
    is_active: true,
    social_links: {
      photo_url: selectedItem?.social_links?.photo_url || '',
      facebook: selectedItem?.social_links?.facebook || '',
      instagram: selectedItem?.social_links?.instagram || ''
    }
  })

  // console.log('programs', programs)
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
    setFormData({
      name: selectedItem?.name || '',
      description: selectedItem?.description || '',
      commission_percentage: selectedItem?.commission_percentage || 0,
      discount_percentage: selectedItem?.discount_percentage || 0,
      is_active: true,
      social_links: {
        photo_url: selectedItem?.social_links?.photo_url || '',
        facebook: selectedItem?.social_links?.facebook || '',
        instagram: selectedItem?.social_links?.instagram || ''
      }
    })
  }, [selectedItem])

  const handleChange = e => {
    const { name, value } = e.target
    const [field, subField] = name.split('.')

    if (subField) {
      setFormData(prevState => ({
        ...prevState,
        [field]: {
          ...prevState[field],
          [subField]: value
        }
      }))
    } else {
      setFormData(prevState => ({
        ...prevState,
        [name]: name === 'commission_percentage' || name === 'discount_percentage' ? parseInt(value) : value
      }))
    }
  }

  //  modal open handel

  const toggleModal = item => {
    setSelectedItem(item)
    setShowModal(true)
  }

  //  modal close handel

  const closeModal = () => {
    setFormData({})
    setShowModal(false)
    setCreateModal(false)
  }

  // create data for program handel======================
  const createHandleSubmit = e => {
    e.preventDefault()
    createInfluencer({ formData, token: userData?.token })
  }

  useEffect(() => {
    if (createSuccess) {
      alert('Created successful')
      setCreateModal(false)
      refetch()
    } else if (createError) {
      console.log('create program error', createError)
    }
  }, [createSuccess, createError, refetch])

  // create data for program handel end======================

  //  update program data handel========================

  const updateHandle = async e => {
    e.preventDefault()

    updateInfluencer({ formData, token: userData.token, id: selectedItem.id })
  }

  useEffect(() => {
    if (updateSuccess) {
      alert('updated Successful')
      setShowModal(false)
      refetch()
    } else if (updateError) {
      console.log(updateError)
    }
  }, [updateSuccess, updateError, refetch])

  //  update program data handel end========================

  // delete a program handel===========================
  const deleteHandel = id => {
    deleteInfluencer({ id: id, token: userData?.token })
  }

  useEffect(() => {
    if (deleteSuccess) {
      alert('Program is Deleted')
      refetch()
    } else if (deleteError) {
      // alert(deleteError)
      console.log('error', deleteError)
    }
  }, [deleteSuccess, deleteError, refetch])

  // delete a program handel end ===========================

  return (
    <div className=' p-2'>
      {/* main title  */}
      <div className='main-header bg-slate-900 flex flex-row items-center justify-between shadow-md shadow-red-400 py-3 px-3 rounded-t-md'>
        <h1 className='text-slate-300 text-2xl '>Influencer List</h1>
        <button
          onClick={() => setCreateModal(true)}
          className='p-3 rounded-lg bg-yellow-400 text-white hover:bg-yellow-500 cursor-pointer'
        >
          Add Influencer
        </button>
      </div>
      {/* search box */}
      <div className='main-header py-5 bg-slate-900 flex flex-row items-center justify-between shadow-md shadow-red-400 px-3 rounded-t-md'>
        <div className='flex- flex-row items-center'>
          <span className='text-md'>Show</span>
          <select name='' id='' className='p-2 w-16 rounded-sm mx-3 focus:outline-none bg-white'>
            <option value='10'>10</option>
            <option value='30'>30</option>
            <option value='50'>50</option>
            <option value='100'>100</option>
          </select>
          <span className='text-md'>Entries</span>
        </div>
        <div className='search w-52'>
          <input
            type='search'
            name=''
            id=''
            placeholder='search'
            className='p-3 w-full rounded-md focus:outline-none bg-white'
          />
        </div>
      </div>
      <div className='overflow-hidden'>
        <div className='flex flex-col'>
          <div className='overflow-x-auto'>
            <div className=' w-full inline-block align-middle'>
              <div className=' '>
                <table className='min-w-full divide-y divide-gray-200 border border-t-0 rounded-b-lg'>
                  <thead className=''>
                    <tr>
                      {Object.keys(theadData[0]).map(val => (
                        <th
                          key={val}
                          scope='col'
                          className='bg-slate-800 px-6 py-3 text-xs font-bold text-left text-gray-600 uppercase '
                        >
                          {val}
                        </th>
                      ))}
                    </tr>
                  </thead>
                  <tbody className='divide-y divide-gray-200 overflow-x-auto'>
                    {influencer?.map((item, index) => {
                      return (
                        <tr key={index}>
                          <td className='px-6 py-4 text-sm font-medium text-slate-300 whitespace-nowrap'>{item?.id}</td>
                          <td className='px-6 py-4 text-sm text-slate-300 whitespace-nowrap'>{item?.name}</td>

                          <td className='px-6 max-w-48 py-4 text-sm text-slate-300 whitespace-nowrap overflow-hidden text-ellipsis'>
                            {item?.description}
                          </td>
                          <td className='px-6 max-w-48 py-4 text-sm text-slate-300 whitespace-nowrap overflow-hidden text-ellipsis'>
                            {item?.commission_percentage}
                          </td>
                          <td className='px-6 max-w-48 py-4 text-sm text-slate-300 whitespace-nowrap overflow-hidden text-ellipsis'>
                            {item?.discount_percentage}
                          </td>
                          <td className='px-6 py-4 text-sm text-slate-300 whitespace-nowrap'>
                            <Image
                              src={item?.social_links?.photo_url}
                              alt=''
                              width={50}
                              height={40}
                              className='rounded'
                            />
                          </td>
                          <td className='px-6 max-w-48 py-4 text-sm text-slate-300 whitespace-nowrap overflow-hidden text-ellipsis'>
                            {item?.social_links?.facebook}
                          </td>
                          <td className='px-6 max-w-48 py-4 text-sm text-slate-300 whitespace-nowrap overflow-hidden text-ellipsis'>
                            {item?.social_links?.instagram}
                          </td>

                          <td className=' text-sm font-medium text-right whitespace-nowrap'>
                            <div className='flex justify-between mr-2'>
                              <div className='bg-[#ffff00] px-2 py-1 rounded-md '>
                                <button className='bg-[#ffff00] cursor-pointer' onClick={() => toggleModal(item)}>
                                  <i className='tabler-edit'></i>
                                </button>
                              </div>
                              <div className='bg-[#ffff00] px-2 py-1 rounded-md'>
                                <button className='bg-[#ffff00] cursor-pointer' onClick={() => deleteHandel(item.id)}>
                                  <i className='tabler-trash text-red-600'></i>
                                </button>
                              </div>
                            </div>
                          </td>
                        </tr>
                      )
                    })}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </div>
      {showModal ? (
        <Modal>
          <button
            onClick={() => closeModal()}
            className='cursor-pointer absolute top-6 rounded-lg right-96  m-2 bg-[#ffff00] p-2'
          >
            <svg
              xmlns='http://www.w3.org/2000/svg'
              width='24'
              height='24'
              viewBox='0 0 24 24'
              fill='none'
              stroke='currentColor'
              strokeWidth='2'
              strokeLinecap='round'
              strokeLinejoin='round'
              className='icon icon-tabler icons-tabler-outline icon-tabler-x'
            >
              <path stroke='none' d='M0 0h24v24H0z' fill='none' />
              <path d='M18 6l-12 12' />
              <path d='M6 6l12 12' />
            </svg>
          </button>
          <div className='pb-3'>
            <h2 className='text-slate-800 text-center'>Update a Influencer</h2>
          </div>
          <div className='h-96 overflow-y-auto p-4 bg-slate-900 shadow-md rounded-lg'>
            <form onSubmit={updateHandle}>
              <div className='mb-4'>
                <label className='block text-white font-bold mb-2'>Name:</label>
                <input
                  type='text'
                  name='name'
                  value={formData.name}
                  onChange={handleChange}
                  className='w-full px-3 py-2 bg-slate-700 border rounded-lg shadow-sm focus:outline-none focus:border-white text-white'
                />
              </div>
              <div className='mb-4'>
                <label className='block text-white font-bold mb-2'>Description:</label>
                <input
                  type='text'
                  name='description'
                  value={formData.description}
                  onChange={handleChange}
                  className='w-full px-3 py-2 bg-slate-700 border rounded-lg shadow-sm focus:outline-none focus:border-white text-white'
                />
              </div>
              <div className='mb-4'>
                <label className='block text-white font-bold mb-2'>Photo URL:</label>
                <input
                  type='text'
                  name='social_links.photo_url'
                  value={formData.social_links?.photo_url}
                  onChange={handleChange}
                  className='w-full px-3 py-2 bg-slate-700 border rounded-lg shadow-sm focus:outline-none focus:border-white text-white'
                />
              </div>
              <div className='mb-4'>
                <label className='block text-white font-bold mb-2'>Facebook:</label>
                <input
                  type='text'
                  name='social_links.facebook'
                  value={formData.social_links?.facebook}
                  onChange={handleChange}
                  className='w-full px-3 py-2 bg-slate-700 border rounded-lg shadow-sm focus:outline-none focus:border-white text-white'
                />
              </div>
              <div className='mb-4'>
                <label className='block text-white font-bold mb-2'>Instagram:</label>
                <input
                  type='text'
                  name='social_links.instagram'
                  value={formData.social_links?.instagram}
                  onChange={handleChange}
                  className='w-full px-3 py-2 bg-slate-700 border rounded-lg shadow-sm focus:outline-none focus:border-white text-white'
                />
              </div>
              <div className='mb-4'>
                <label className='block text-white font-bold mb-2'>Commission Percentage:</label>
                <input
                  type='number'
                  name='commission_percentage'
                  value={formData.commission_percentage}
                  onChange={handleChange}
                  className='w-full px-3 py-2 bg-slate-700 border rounded-lg shadow-sm focus:outline-none focus:border-white text-white'
                />
              </div>
              <div className='mb-4'>
                <label className='block text-white font-bold mb-2'>Discount Percentage:</label>
                <input
                  type='number'
                  name='discount_percentage'
                  value={formData.discount_percentage}
                  onChange={handleChange}
                  className='w-full px-3 py-2 bg-slate-700 border rounded-lg shadow-sm focus:outline-none focus:border-white text-white'
                />
              </div>
              <div className='mb-4'>
                <label className='block text-white font-bold mb-2'>Active:</label>
                <input
                  type='checkbox'
                  name='is_active'
                  checked={formData.is_active}
                  onChange={e => setFormData(prevState => ({ ...prevState, is_active: e.target.checked }))}
                  className='toggle-checkbox'
                />
              </div>
              <button
                type='submit'
                className='w-full px-4 cursor-pointer py-2 bg-yellow-500 text-black font-bold rounded-lg shadow-md hover:bg-yellow-300 focus:outline-none'
              >
                Update
              </button>
            </form>
          </div>
        </Modal>
      ) : null}
      {createModal ? (
        <Modal>
          <button
            onClick={() => closeModal()}
            className='cursor-pointer absolute top-6 rounded-lg right-96  m-2 bg-[#ffff00] p-2'
          >
            <svg
              xmlns='http://www.w3.org/2000/svg'
              width='24'
              height='24'
              viewBox='0 0 24 24'
              fill='none'
              stroke='currentColor'
              strokeWidth='2'
              strokeLinecap='round'
              strokeLinejoin='round'
              className='icon icon-tabler icons-tabler-outline icon-tabler-x'
            >
              <path stroke='none' d='M0 0h24v24H0z' fill='none' />
              <path d='M18 6l-12 12' />
              <path d='M6 6l12 12' />
            </svg>
          </button>
          <div className='pb-3'>
            <h2 className='text-slate-800 text-center'>Create a influencer</h2>
          </div>
          <div className='h-96 overflow-y-auto p-4 bg-slate-900 shadow-md rounded-lg'>
            <form onSubmit={createHandleSubmit}>
              <div className='mb-4'>
                <label className='block text-white font-bold mb-2'>Name:</label>
                <input
                  type='text'
                  name='name'
                  value={formData.name}
                  onChange={handleChange}
                  className='w-full px-3 py-2 bg-slate-700 border rounded-lg shadow-sm focus:outline-none focus:border-white text-white'
                />
              </div>
              <div className='mb-4'>
                <label className='block text-white font-bold mb-2'>Description:</label>
                <input
                  type='text'
                  name='description'
                  value={formData.description}
                  onChange={handleChange}
                  className='w-full px-3 py-2 bg-slate-700 border rounded-lg shadow-sm focus:outline-none focus:border-white text-white'
                />
              </div>
              <div className='mb-4'>
                <label className='block text-white font-bold mb-2'>Photo URL:</label>
                <input
                  type='text'
                  name='social_links.photo_url'
                  value={formData.social_links?.photo_url}
                  onChange={handleChange}
                  className='w-full px-3 py-2 bg-slate-700 border rounded-lg shadow-sm focus:outline-none focus:border-white text-white'
                />
              </div>
              <div className='mb-4'>
                <label className='block text-white font-bold mb-2'>Facebook:</label>
                <input
                  type='text'
                  name='social_links.facebook'
                  value={formData.social_links?.facebook}
                  onChange={handleChange}
                  className='w-full px-3 py-2 bg-slate-700 border rounded-lg shadow-sm focus:outline-none focus:border-white text-white'
                />
              </div>
              <div className='mb-4'>
                <label className='block text-white font-bold mb-2'>Instagram:</label>
                <input
                  type='text'
                  name='social_links.instagram'
                  value={formData.social_links?.instagram}
                  onChange={handleChange}
                  className='w-full px-3 py-2 bg-slate-700 border rounded-lg shadow-sm focus:outline-none focus:border-white text-white'
                />
              </div>
              <div className='mb-4'>
                <label className='block text-white font-bold mb-2'>Commission Percentage:</label>
                <input
                  type='number'
                  name='commission_percentage'
                  value={formData.commission_percentage}
                  onChange={handleChange}
                  className='w-full px-3 py-2 bg-slate-700 border rounded-lg shadow-sm focus:outline-none focus:border-white text-white'
                />
              </div>
              <div className='mb-4'>
                <label className='block text-white font-bold mb-2'>Discount Percentage:</label>
                <input
                  type='number'
                  name='discount_percentage'
                  value={formData.discount_percentage}
                  onChange={handleChange}
                  className='w-full px-3 py-2 bg-slate-700 border rounded-lg shadow-sm focus:outline-none focus:border-white text-white'
                />
              </div>
              <div className='mb-4'>
                <label className='block text-white font-bold mb-2'>Active:</label>
                <input
                  type='checkbox'
                  name='is_active'
                  checked={formData.is_active}
                  onChange={e => setFormData(prevState => ({ ...prevState, is_active: e.target.checked }))}
                  className='toggle-checkbox'
                />
              </div>
              <button
                type='submit'
                className='w-full px-4 cursor-pointer py-2 bg-yellow-500 text-black font-bold rounded-lg shadow-md hover:bg-yellow-300 focus:outline-none'
              >
                Create
              </button>
            </form>
          </div>
        </Modal>
      ) : null}
    </div>
  )
}
