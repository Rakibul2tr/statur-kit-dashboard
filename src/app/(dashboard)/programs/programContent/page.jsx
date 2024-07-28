'use client'
import React, { useEffect, useState } from 'react'

import Image from 'next/image'

import { useForm, useFieldArray } from 'react-hook-form'

import Modal from '../../../components/Modal'

import {
  useCreateProgramContentMutation,
  useDeleteProgramContentMutation,
  useProgramContentQuery,
  useProgramDataGetQuery,
  useUpdateProgramContentMutation
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
  const [updateModal, setUpdateModal] = useState(false)
  const [createProgConteModal, setCreateProgConteModal] = useState(false)
  const [selectedItem, setSelectedItem] = useState({})

  const { data: programs } = useProgramDataGetQuery({ token: userData?.token ? userData.token : null })

  const { data: programsContent, refetch } = useProgramContentQuery({ token: userData?.token ? userData.token : null })

  const [updateProgramContent, { isSuccess: success, error }] = useUpdateProgramContentMutation()

  const [createProgramContent, { isSuccess: createSuccess, error: createError }] = useCreateProgramContentMutation()
  const [deleteProgramContent, { isSuccess: deleteSuccess, error: deleteError }] = useDeleteProgramContentMutation()

  const [formData, setFormData] = useState({
    program: parseInt(selectedItem?.program?.id || 0),
    title: selectedItem.title || '',
    description: selectedItem.description || '',
    photo_url: selectedItem.photo_url || '',
    features: [{ key: '', data: '' }]
  })

  // console.log('selectedItem', selectedItem, 'formData', formData)
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
      program: parseInt(selectedItem?.program?.id || 0),
      title: selectedItem?.title || '',
      description: selectedItem?.description || '',
      photo_url: selectedItem?.photo_url || '',
      features: [{ key: '', data: '' }]
    })
  }, [selectedItem])

  const handleChange = e => {
    const { name, value } = e.target

    setFormData(prev => ({
      ...prev,
      [name]: name == 'program' ? parseInt(value) : value
    }))
  }

  // const handleFeatureChange = (index, e) => {
  //   const { name, value } = e.target
  //   const newFeatures = formData.features.map((feature, i) => (i === index ? { ...feature, [name]: value } : feature))

  //   setFormData(prev => ({
  //     ...prev,
  //     features: newFeatures
  //   }))
  // }

  // const addFeature = () => {
  //   setFormData(prev => ({
  //     ...prev,
  //     features: [...prev.features, { key: '', data: '' }]
  //   }))
  // }

  //  modal open handel

  const openEditModal = item => {
    setSelectedItem(item)
    setUpdateModal(true)
  }

  //  modal close handel=======================

  const closeModal = () => {
    setFormData({
      program: 0,
      title: '',
      description: '',
      photo_url: '',
      features: [{ key: '', data: '' }]
    })
    setSelectedItem({})
    setUpdateModal(false)
    setCreateProgConteModal(false)
  }

  //  update program content data handel==========================
  const token = userData.token

  const updateHandleSubmit = async e => {
    e.preventDefault()

    try {
      await updateProgramContent({
        token: token,
        formData: formData,
        id: selectedItem.id
      })
    } catch (error) {
      console.error('Error submitting form data:', error)
    }
  }

  useEffect(() => {
    if (success) {
      alert('updated Successful')
      setUpdateModal(false)
      refetch()
    } else if (error) {
      console.log(error)
    }
  }, [success, error, refetch])

  //  update program content data handel end ==========================

  // create program content data handel with react hook form============
  const { register, handleSubmit, control, watch } = useForm({
    defaultValues: {
      features: [{ key: '', data: '' }],
      is_active: false
    }
  })

  const { fields, append } = useFieldArray({
    control,
    name: 'features'
  })

  const onSubmit = data => {
    console.log(data)

    createProgramContent({ data, token: userData.token })
  }

  useEffect(() => {
    if (createSuccess) {
      alert('Created successful')
      setCreateProgConteModal(false)
      refetch()
    } else if (createError) {
      console.log('create program error', createError)
    }
  }, [createSuccess, createError, refetch])

  // create program content data handel end ============

  // delete a program handel=============================
  const deleteHandel = id => {
    deleteProgramContent({ id: id, token: userData?.token })
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
    <div className=' p-2 '>
      {/* main title  */}
      <div className=' '>
        <div className='  bg-slate-900 flex flex-row items-center justify-between shadow-md shadow-red-400 py-3 px-3 rounded-t-md'>
          <h1 className='text-slate-300 text-2xl '>Program Content List</h1>
          <button
            onClick={() => setCreateProgConteModal(true)}
            className='p-3 rounded-lg bg-yellow-400 text-white hover:bg-yellow-500 cursor-pointer'
          >
            Add Program Content
          </button>
        </div>
        {/* search box */}
        <div className=' py-5 bg-slate-900 flex flex-row items-center justify-between shadow-md shadow-red-400 px-3 rounded-t-md'>
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
                        {
                          /* console.log('programsContent item', item) */
                        }

                        return (
                          <tr key={item.id}>
                            <td className='px-4 py-4 text-sm font-medium text-slate-300 whitespace-nowrap'>
                              {item.id}
                            </td>
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
                                  <button className='bg-[#ffff00] cursor-pointer' onClick={() => openEditModal(item)}>
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
        {updateModal ? (
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
                  name='program'
                  defaultValue={formData?.program}
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
        {createProgConteModal ? (
          <Modal>
            <div className='relative w-full max-w-2xl bg-white p-6 rounded-lg shadow-lg'>
              <button
                onClick={() => closeModal()}
                className='cursor-pointer absolute top-2 right-2 rounded-lg bg-yellow-500 p-2'
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
                  className='icon icon-tabler icon-tabler-x'
                >
                  <path stroke='none' d='M0 0h24v24H0z' fill='none' />
                  <path d='M18 6L6 18' />
                  <path d='M6 6l12 12' />
                </svg>
              </button>
              <div className='pb-3'>
                <h2 className='text-slate-800 text-center'>Create a Program Content</h2>
              </div>
              <div className='h-96 overflow-y-auto p-4 bg-slate-900 shadow-md rounded-lg'>
                <form onSubmit={handleSubmit(onSubmit)}>
                  <div className='mb-4'>
                    <label className='block text-white font-bold mb-2'>Program Name:</label>
                    <select
                      {...register('program')}
                      className='w-full px-3 py-2 bg-slate-700 border rounded-lg shadow-sm focus:outline-none focus:border-white text-white'
                    >
                      {programs?.map((i, index) => (
                        <option value={i.id} key={index}>
                          {i.title}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div className='mb-4'>
                    <label className='block text-white font-bold mb-2'>Program content Title:</label>
                    <input
                      type='text'
                      {...register('title')}
                      className='w-full px-3 py-2 bg-slate-700 border rounded-lg shadow-sm focus:outline-none focus:border-white text-white'
                    />
                  </div>

                  <div className='mb-4'>
                    <label className='block text-white font-bold mb-2'>Description:</label>
                    <textarea
                      {...register('description')}
                      className='w-full px-3 py-2 bg-slate-700 border rounded-lg shadow-sm focus:outline-none focus:border-white text-white'
                    />
                  </div>

                  <div className='mb-4'>
                    <label className='block text-white font-bold mb-2'>Photo URL:</label>
                    <input
                      type='text'
                      {...register('photo_url')}
                      className='w-full px-3 bg-slate-700 py-2 border rounded-lg shadow-sm focus:outline-none focus:border-white text-white'
                    />
                  </div>

                  <fieldset className='mb-4'>
                    <legend className='text-lg font-bold text-white'>Features</legend>
                    {fields.map((feature, index) => (
                      <div key={feature.id} className='mb-4'>
                        <label className='block text-white text-sm font-bold mb-2' htmlFor={`feature-key-${index}`}>
                          Key
                        </label>
                        <select
                          {...register(`features.${index}.key`)}
                          className='shadow bg-slate-700 appearance-none border rounded w-full py-2 px-3 text-white leading-tight focus:outline-none focus:shadow-outline'
                          id={`feature-key-${index}`}
                        >
                          <option value='text'>Text</option>
                          <option value='image'>Image</option>
                          <option value='video'>Video</option>
                        </select>

                        <label className='block text-white text-sm font-bold mb-2' htmlFor={`feature-data-${index}`}>
                          Value
                        </label>
                        <input
                          {...register(`features.${index}.data`)}
                          className='shadow bg-slate-700 text-white appearance-none border rounded w-full py-2 px-3 leading-tight focus:outline-none focus:shadow-outline'
                          id={`feature-data-${index}`}
                          type='text'
                        />
                      </div>
                    ))}
                    <button
                      type='button'
                      className='bg-slate-800 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline'
                      onClick={() => append({ key: '', data: '' })}
                    >
                      Add Feature
                    </button>
                  </fieldset>

                  <div className='mb-4'>
                    <label className='block text-white font-bold mb-2'>Active:</label>
                    <div className='flex items-center'>
                      <input type='checkbox' {...register('is_active')} className='toggle-checkbox ' id='is_active' />
                      <label htmlFor='is_active' className='ml-2 text-white'>
                        {watch('is_active') ? 'Active' : 'Inactive'}
                      </label>
                    </div>
                  </div>
                  <button
                    type='submit'
                    className='w-full px-4 cursor-pointer py-2 bg-yellow-500 text-black font-bold rounded-lg shadow-md hover:bg-yellow-300 focus:outline-none'
                  >
                    Create Content
                  </button>
                </form>
              </div>
            </div>
          </Modal>
        ) : null}
      </div>
    </div>
  )
}


