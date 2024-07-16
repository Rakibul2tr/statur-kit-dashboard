'use client'
import React, { useEffect, useState } from 'react'

import Image from 'next/image'

import Modal from '../../../components/Modal'

import {
  useDeleteProgramMutation,
  useProgramContentQuery,
  useProgramCreateMutation,
  useUpdateProgramDataMutation
} from '@/redux/api/apiSlice'

const theadData = [
  {
    content_id: 'content Id',
    program_Id: 'Program Id',
    program_name: 'Program name',
    program_image: 'Program image',
    title: 'title',
    description: 'Description',
    photo_url: 'photo_url',
    actions: 'actions'
  }
]

export default function Page() {
  const [userData, setUserData] = useState({})
  const [showModal, setShowModal] = useState(false)
  const [createProgramModal, setCreateProgramModal] = useState(false)
  const [selectedItem, setSelectedItem] = useState({})

  const { data: programsContent, isSuccess } = useProgramContentQuery({ token: userData.token })

  const [updateProgramData, { data, isSuccess: success, error }] = useUpdateProgramDataMutation()

  const [programCreate, { isSuccess: createSuccess, error: createError }] = useProgramCreateMutation()
  const [deleteProgram, { isSuccess: deleteSuccess, error: deleteError }] = useDeleteProgramMutation()

  const [formData, setFormData] = useState({
    id: selectedItem.id || 1,
    title: selectedItem.title || '',
    description: selectedItem.description || '',
    photo_url: selectedItem.photo_url || '',
    is_active: true
  })

  // console.log('programsContent', programsContent)
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

    if (success) {
      alert('updated Successful')
      setShowModal(false)
    } else if (error) {
      console.log(error)
    }

    setFormData({
      id: selectedItem?.id,
      title: selectedItem?.title,
      description: selectedItem?.description,
      photo_url: selectedItem?.photo_url,
      is_active: true
    })
  }, [selectedItem, error, success])

  // modal for data update

  // console.log('user', typeof selectedItem.id)

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
      id: null,
      title: '',
      description: '',
      photo_url: '',
      is_active: true
    })
    setShowModal(false)
    setCreateProgramModal(false)
  }

  //  update program data handel
  const token = userData.token

  const updateHandleSubmit = async e => {
    e.preventDefault()

    try {
      await updateProgramData({
        token: token,
        formData: formData,
        id: selectedItem.id
      })
    } catch (error) {
      console.error('Error submitting form data:', error)
    }
  }

  // create data for program handel

  const createHandleSubmit = e => {
    e.preventDefault()
    let sendFormData = {
      title: formData.title,
      description: formData.description,
      photo_url: formData.photo_url
    }

    programCreate({ sendFormData, token })
  }

  useEffect(() => {
    if (createSuccess) {
      alert('Created successful')
    } else if (createError) {
      console.log('create program error', createError)
    }
  }, [createSuccess, createError])

  // delete a program handel
  const programDeleteHandel = id => {
    deleteProgram({ id: id, token: userData?.token })
  }

  useEffect(() => {
    if (deleteSuccess) {
      alert('Program is Deleted')
    } else if (deleteError) {
      // alert(deleteError)
      console.log('error', deleteError)
    }
  }, [deleteSuccess, deleteError])

  return (
    <div className=' p-2'>
      {/* main title  */}
      <div className='main-header bg-slate-900 flex flex-row items-center justify-between shadow-md shadow-red-400 py-3 px-3 rounded-t-md'>
        <h1 className='text-slate-300 text-2xl '>Programs List</h1>
        <button
          onClick={() => setCreateProgramModal(true)}
          className='p-3 rounded-lg bg-yellow-400 text-white hover:bg-yellow-500 cursor-pointer'
        >
          Add Program
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
                          className='bg-slate-800 px-1 py-3 text-xs font-bold text-center text-gray-600 uppercase '
                        >
                          {val}
                        </th>
                      ))}
                    </tr>
                  </thead>
                  <tbody className='divide-y divide-gray-200 overflow-x-auto'>
                    {programsContent?.map(item => {
                      console.log('programsContent item', item)

                      return (
                        <tr key={item.id}>
                          <td className='px-4 py-4 text-sm font-medium text-slate-300 whitespace-nowrap'>{item.id}</td>
                          <td className='px-4 py-4 text-sm text-slate-300 whitespace-nowrap'>{item.program.id}</td>
                          <td className='px-4 py-4 text-sm text-slate-300 whitespace-nowrap overflow-hidden'>
                            {item.program.title}
                          </td>
                          <td className='px-4 py-4 text-sm text-slate-300 whitespace-nowrap'>
                            <Image src={item.program.photo_url} alt='' width={50} height={40} className='rounded' />
                          </td>
                          <td className='px-4 py-4 text-sm text-slate-300 whitespace-nowrap'>{item.title}</td>

                          <td className='px-4 max-w-48 py-4 text-sm text-slate-300 whitespace-nowrap overflow-hidden text-ellipsis'>
                            {item?.description}
                          </td>

                          <td className='px-4 py-4 text-sm text-slate-300 whitespace-nowrap'>
                            <Image src={item.photo_url} alt='' width={50} height={40} className='rounded' />
                          </td>
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
                                  onClick={() => programDeleteHandel(item.id)}
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
            <h2 className='text-slate-800 text-center'>Update a Program</h2>
          </div>
          <form onSubmit={updateHandleSubmit} className='max-w-2xl mx-auto p-4 bg-slate-900 shadow-md rounded-lg'>
            <div className='mb-4'>
              <label className='block text-white font-bold mb-2'>Program Number :</label>
              <input
                type='number'
                name='id'
                defaultValue={formData?.id}
                onChange={handleChange}
                className='w-full px-3 py-2 bg-slate-700 border rounded-lg shadow-sm focus:outline-none focus:border-white text-white'
              />
            </div>
            <div className='mb-4'>
              <label className='block text-white font-bold mb-2'>Program Title:</label>
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
              Update
            </button>
          </form>
        </Modal>
      ) : null}
      {createProgramModal ? (
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
            <h2 className='text-slate-800 text-center'>Create a Program</h2>
          </div>
          <form onSubmit={createHandleSubmit} className='max-w-2xl mx-auto p-4 bg-slate-900 shadow-md rounded-lg'>
            <div className='mb-4'>
              <label className='block text-white font-bold mb-2'>Program Title:</label>
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
              Create
            </button>
          </form>
        </Modal>
      ) : null}
    </div>
  )
}
