'use client'
import React, { useEffect, useState } from 'react'

import Image from 'next/image'

import {
  useCreateProductCategoryMutation,
  useDeleteCategoryMutation,
  useProductCategoryQuery,
  useUpdateProductCategoryMutation
} from '@/redux/api/apiSlice'
import Modal from '../../../components/Modal'

const theadData = [
  {
    category_id: 'category Id',
    category_title: 'category Title',
    description: 'description',
    photo: 'photo',
    action: 'Action'
  }
]

export default function Page() {
  const [userData, setUserData] = useState({})
  const [showModal, setShowModal] = useState(false)
  const [createCategoryModal, setCreateCategoryModal] = useState(false)
  const [selectedItem, setSelectedItem] = useState({})

  const {
    data: allCategory,
    isSuccess,
    error,
    refetch
  } = useProductCategoryQuery({ token: userData?.token ? userData?.token : null })

  const [updateProductCategory, { isSuccess: success, error: updateError }] = useUpdateProductCategoryMutation()
  const [createProductCategory, { isSuccess: createSuccess, error: CreateError }] = useCreateProductCategoryMutation()
  const [deleteCategory, { isSuccess: deleteSuccess, error: deleteError }] = useDeleteCategoryMutation()

  // data get from local storage
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

    if (error) {
      console.log(error)
    }
  }, [isSuccess, allCategory, error])

  // modal for data update
  useEffect(() => {
    setFormData({
      category: selectedItem?.id || null,
      title: selectedItem?.title || '',
      description: selectedItem?.description || '',
      photo_url: selectedItem?.photo_url || ''
    })
  }, [selectedItem])

  //   formData is her

  const [formData, setFormData] = useState({
    category: selectedItem?.id || null,
    title: selectedItem?.title || '',
    description: selectedItem?.description || '',
    photo_url: selectedItem?.photo_url || ''
  })

  const handleChange = e => {
    const { name, value } = e.target

    setFormData(prev => ({
      ...prev,
      [name]: value
    }))
  }

  //  modal open handel

  const toggleModal = item => {
    setSelectedItem(item)
    setShowModal(true)
  }

  //  modal close handel

  const closeModal = () => {
    setFormData({
      category: null,
      title: '',
      description: '',
      photo_url: ''
    })
    setShowModal(false)
    setCreateCategoryModal(false)
  }



  // category data update handel============================

  const id = selectedItem.id
  const token = userData.token

  const updateHandleSubmit = async e => {
    e.preventDefault()
    await updateProductCategory({ token, formData, id }).unwrap()
  }

  useEffect(() => {
    if (success) {
      alert('updated successful')
      setShowModal(false)
      refetch()
    } else if (updateError) {
      alert(updateError)
    }
  }, [success, updateError, refetch])

  // create a product category============================

  const categoryCreateHandel = e => {
    e.preventDefault()

    let object = {
      title: formData.title,
      description: formData.description,
      photo_url: formData.photo_url
    }

    createProductCategory({ token, formData: object })
  }

  useEffect(() => {
    if (createSuccess) {
      alert('Category Created successful')
      setCreateCategoryModal(false)
      refetch()
    } else if (CreateError) {
      alert('Created field!')
    }
  }, [createSuccess, CreateError, refetch])

  //category delete handel===================================
  const categoryDeleteHandel = id => {
    deleteCategory({ id, token: userData?.token })
  }

  useEffect(() => {
    if (deleteSuccess) {
      alert('Product is Deleted')
      refetch()
    } else if (deleteError) {
      // alert(deleteError)
      console.log('error', deleteError)
    }
  }, [deleteSuccess, deleteError, refetch])

  return (
    <div className=' p-2'>
      {/* main title  */}
      <div className='main-header bg-slate-900 flex flex-row items-center justify-between shadow-md shadow-red-400 py-3 px-3 rounded-t-md'>
        <h1 className='text-slate-300 text-2xl '>Products Category List</h1>
        <button
          className='p-3 rounded-lg bg-yellow-400 text-white hover:bg-yellow-500 cursor-pointer'
          onClick={() => setCreateCategoryModal(true)}
        >
          Add Category
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
                    {allCategory?.map(item => {
                      return (
                        <tr key={item.id}>
                          <td className='px-6 py-4 text-sm font-medium text-slate-300 whitespace-nowrap'>{item.id}</td>
                          {item?.title && (
                            <td className='px-6 py-4 text-sm text-slate-300 whitespace-nowrap'>{item.title}</td>
                          )}
                          {item?.description && (
                            <td className='px-6 py-4 text-sm text-slate-300 max-w-48 whitespace-nowrap overflow-hidden'>
                              {item.description}
                            </td>
                          )}
                          {item?.photo_url && (
                            <td className='px-6 py-4 text-sm text-slate-300 whitespace-nowrap'>
                              <Image src={item.photo_url} alt='image' width={50} height={40} className='rounded ' />
                            </td>
                          )}

                          <td className=' text-sm font-medium text-right whitespace-nowrap'>
                            <div className='flex justify-between mr-2'>
                              <div className='bg-[#ffff00] px-2 py-1 rounded-md '>
                                <button className='bg-[#ffff00] cursor-pointer' onClick={() => toggleModal(item)}>
                                  <i className='tabler-edit'></i>
                                </button>
                              </div>
                              <div className='bg-[#ffff00] px-2 py-1 rounded-md'>
                                <button
                                  className='bg-[#ffff00] cursor-pointer'
                                  onClick={() => categoryDeleteHandel(item.id)}
                                >
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
      {/* category data update form */}
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
            <h2 className='text-slate-800 text-center'>Update a category</h2>
          </div>
          <form onSubmit={updateHandleSubmit} className='max-w-2xl mx-auto p-4 bg-slate-900 shadow-md rounded-lg'>
            <div className='mb-4'>
              <label className='block text-white font-bold mb-2'>Category ID:</label>
              <input
                type='number'
                name='category'
                defaultValue={formData?.category}
                onChange={handleChange}
                className='w-full px-3 py-2 bg-slate-700 border rounded-lg shadow-sm focus:outline-none focus:border-white text-white'
              />
            </div>
            <div className='mb-4'>
              <label className='block text-white font-bold mb-2'>Product Title:</label>
              <input
                type='text'
                name='title'
                defaultValue={formData?.title}
                onChange={handleChange}
                className='w-full px-3 py-2 bg-slate-700 border rounded-lg shadow-sm focus:outline-none focus:border-white text-white'
              />
            </div>
            <div className='mb-4'>
              <label className='block text-white font-bold mb-2'>Description:</label>
              <textarea
                name='description'
                defaultValue={formData?.description}
                onChange={handleChange}
                className='w-full px-3 py-2 bg-slate-700 border rounded-lg shadow-sm focus:outline-none focus:border-white text-white'
              />
            </div>

            <div className='mb-4'>
              <label className='block text-white font-bold mb-2'>Photo URL:</label>
              <input
                type='text'
                name='photo_url'
                defaultValue={formData?.photo_url}
                onChange={handleChange}
                className='w-full px-3 bg-slate-700 py-2 border rounded-lg shadow-sm focus:outline-none focus:border-white text-white'
              />
            </div>
            <button
              type='submit'
              className='w-full px-4 cursor-pointer py-2 bg-[#ffff00] text-black font-bold rounded-lg shadow-md hover:bg-yellow-300 focus:outline-none'
            >
              Update Category
            </button>
          </form>
        </Modal>
      ) : null}
      {/* category data create form */}
      {createCategoryModal ? (
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
            <h2 className='text-slate-800 text-center'>Create a category</h2>
          </div>
          <form onSubmit={categoryCreateHandel} className='max-w-2xl mx-auto p-4 bg-slate-900 shadow-md rounded-lg'>
            <div className='mb-4'>
              <label className='block text-white font-bold mb-2'>Product Title:</label>
              <input
                type='text'
                name='title'
                defaultValue={formData?.title}
                onChange={handleChange}
                className='w-full px-3 py-2 bg-slate-700 border rounded-lg shadow-sm focus:outline-none focus:border-white text-white'
              />
            </div>
            <div className='mb-4'>
              <label className='block text-white font-bold mb-2'>Description:</label>
              <textarea
                name='description'
                defaultValue={formData?.description}
                onChange={handleChange}
                className='w-full px-3 py-2 bg-slate-700 border rounded-lg shadow-sm focus:outline-none focus:border-white text-white'
              />
            </div>

            <div className='mb-4'>
              <label className='block text-white font-bold mb-2'>Photo URL:</label>
              <input
                type='text'
                name='photo_url'
                defaultValue={formData?.photo_url}
                onChange={handleChange}
                className='w-full px-3 bg-slate-700 py-2 border rounded-lg shadow-sm focus:outline-none focus:border-white text-white'
              />
            </div>
            <button
              type='submit'
              className='w-full px-4 cursor-pointer py-2 bg-[#ffff00] text-black font-bold rounded-lg shadow-md hover:bg-yellow-300 focus:outline-none'
            >
              Create Category
            </button>
          </form>
        </Modal>
      ) : null}
    </div>
  )
}
