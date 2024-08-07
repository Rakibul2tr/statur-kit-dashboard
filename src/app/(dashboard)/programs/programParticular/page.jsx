'use client'
import React, { useEffect, useState } from 'react'

import Image from 'next/image'

import { useForm, useFieldArray } from 'react-hook-form'

import Swal from 'sweetalert2'

import Modal from '../../../components/Modal'

import CodeEditor from '../../../components/CodeEditor'

import {
  useProgramContentQuery,
  useProgramParticularQuery,
  useUpdateProgramParticularMutation,
  useCreateProgramParticularMutation,
  useDeleteProgramParticularMutation
} from '@/redux/api/apiSlice'
import DynamicForm from '../../../components/FormTest'

const theadData = [
  {
    content_name: 'content name',
    content_image: 'content image',
    particular_title: 'title',
    description: 'Description',
    actions: 'actions'
  }
]

export default function Page() {
  const [userData, setUserData] = useState({})
  const [updateModal, setUpdateModal] = useState(false)
  const [createProgConteModal, setCreateProgConteModal] = useState(false)
  const [selectedItem, setSelectedItem] = useState({})

  const { data: programsContent } = useProgramContentQuery({ token: userData?.token ? userData.token : null })

  const {
    data: programsParticular,
    isSuccess,
    refetch
  } = useProgramParticularQuery({ token: userData?.token ? userData.token : null })

  const [updateProgramParticular, { isSuccess: updateSuccess, error }] = useUpdateProgramParticularMutation()

  const [createProgramParticular, { isSuccess: createSuccess, error: createError }] =
    useCreateProgramParticularMutation()

  const [deleteProgramParticular, { isSuccess: deleteSuccess, error: deleteError }] =
    useDeleteProgramParticularMutation()

  // user info from local storage
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
  }, [selectedItem])

  //  modal open handel

  const toggleModal = item => {
    setSelectedItem(item)
    setUpdateModal(true)
  }

  //  modal close handel

  const closeModal = () => {
    setUpdateModal(false)
    setCreateProgConteModal(false)
    setSelectedItem({})
  }

  // create program particular content data handel=====================

  const { register, handleSubmit, control, watch, setValue } = useForm({
    defaultValues: {
      content: selectedItem?.content || '',
      title: selectedItem?.title || '',
      description: selectedItem?.description || '',
      data: selectedItem?.data || [{ key: '', data: '', type: '' }],
      features: selectedItem?.features || [{ key: '', data: '', type: 'video' }],
      is_active: selectedItem?.is_active || false,
      order: 1
    }
  })

  const {
    fields: dataFields,
    append: appendData,
    remove: removeData
  } = useFieldArray({
    control,
    name: 'data'
  })

  const {
    fields: featureFields,
    append: appendFeature,
    remove: removeFeature
  } = useFieldArray({
    control,
    name: 'features'
  })

  useEffect(() => {
    if (selectedItem) {
      setValue('content', selectedItem.content)
      setValue('title', selectedItem.title)
      setValue('description', selectedItem.description)
      setValue('data', selectedItem.data)
      setValue('features', selectedItem.features)
      setValue('is_active', selectedItem.is_active)
      setValue('order', 1)
    }
  }, [selectedItem, setValue])

  const createOnSubmit = data => {
    data.content = parseInt(data.content)
    createProgramParticular({ data, token: userData.token })
  }

  useEffect(() => {
    if (createSuccess) {
      Swal.fire({
        title: 'Good job!',
        text: 'Created successful!',
        icon: 'success'
      })
      setCreateProgConteModal(false)
      refetch()
    } else if (createError) {
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'Something went wrong!'
      })
    }
  }, [createSuccess, createError, refetch])

  //  update program particular content data handel===============

  const id = selectedItem.id
  const token = userData.token

  const updateHandleSubmit = data => {
    data.content = parseInt(data.content)

    // console.log('particular update data', a, typeof selectedItem.id, data, userData.token)

    updateProgramParticular({ id, token, data })
  }

  useEffect(() => {
    if (updateSuccess) {
      Swal.fire({
        title: 'Good job!',
        text: 'Updated successful!',
        icon: 'success'
      })
      setUpdateModal(false)
      refetch()
    } else if (error) {
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'Something went wrong!'
      })
    }
  }, [updateSuccess, error, refetch])

  // delete a program particular content handel=========================
  const deleteHandel = id => {
    deleteProgramParticular({ id: id, token: userData?.token })
  }

  useEffect(() => {
    if (deleteSuccess) {
      Swal.fire({
        title: 'Good job!',
        text: 'Program is deleted!',
        icon: 'success'
      })
      refetch()
    } else if (deleteError) {
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'Something went wrong!'
      })
    }
  }, [deleteSuccess, deleteError, refetch])

  // delete a program particular content handel end =========================

  return (
    <div className=' p-2 '>
      {/* main title  */}
      <div className=' '>
        <div className='  bg-slate-900 flex flex-row items-center justify-between shadow-md shadow-red-400 py-3 px-3 rounded-t-md'>
          <h1 className='text-slate-300 text-2xl '>Program Particular Content List</h1>
          <button
            onClick={() => setCreateProgConteModal(true)}
            className='p-3 rounded-lg bg-yellow-400 text-white hover:bg-yellow-500 cursor-pointer'
          >
            Add Program Particular Content
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
                      {programsParticular?.map((item, index) => {
                        return (
                          <tr key={index}>
                            <td className='px-4 py-4 text-sm text-slate-300 whitespace-nowrap overflow-hidden'>
                              {item?.content?.title}
                            </td>
                            <td className='px-4 py-4 text-sm text-slate-300 whitespace-nowrap'>
                              <Image src={item?.content?.photo_url} alt='' width={50} height={40} className='rounded' />
                            </td>
                            <td className='px-4 max-w-48 py-4 text-sm text-slate-300 whitespace-nowrap overflow-hidden text-ellipsis'>
                              {item?.title}
                            </td>

                            <td className='px-4 max-w-48 py-4 text-sm text-slate-300 whitespace-nowrap overflow-hidden text-ellipsis'>
                              {item?.description}
                            </td>
                            <td className=' text-sm font-medium text-right whitespace-nowrap'>
                              <div className='flex justify-between gap-2'>
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
        {updateModal ? (
          <Modal>
            <div className='relative w-full max-w-4xl bg-white p-6 rounded-lg shadow-lg'>
              <button
                onClick={() => closeModal()}
                className='cursor-pointer absolute top-6 rounded-lg right-0  m-2 bg-[#fff555] p-2'
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
                <h2 className='text-slate-800 text-center'>Update a Program particular content</h2>
              </div>
              <div className='h-4/6 overflow-y-auto w-full p-4 bg-slate-900 shadow-md rounded-lg'>
                <form onSubmit={handleSubmit(updateHandleSubmit)} className='w-full'>
                  <div className='mb-4'>
                    <label className='block text-white font-bold mb-2'>Content Name:</label>
                    <select
                      {...register('content')}
                      defaultValue={selectedItem?.content?.id}
                      className='w-full px-3 py-2 bg-slate-700 border rounded-lg shadow-sm focus:outline-none focus:border-white text-white'
                    >
                      {programsContent?.map((i, index) => (
                        <option value={i.id} key={index}>
                          Content No: - {i.id} / Content Name - {i.title}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div className='mb-4'>
                    <label className='block text-white font-bold mb-2'>Particular content Title:</label>
                    <input
                      type='text'
                      {...register('title')}
                      className='w-full px-3 py-2 bg-slate-700 border rounded-lg shadow-sm focus:outline-none focus:border-white text-white'
                    />
                  </div>

                  <div className='mb-4'>
                    <label className='block text-white font-bold mb-2'> Particular Description:</label>
                    <textarea
                      {...register('description')}
                      className='w-full px-3 py-2 bg-slate-700 border rounded-lg shadow-sm focus:outline-none focus:border-white text-white'
                    />
                  </div>
                  <fieldset className='mb-4'>
                    <legend className='text-lg font-bold text-white'>Data</legend>
                    {dataFields.map((item, index) => (
                      <div key={item.id} className='mb-4'>
                        <label className='block text-white text-sm font-bold mb-2' htmlFor={`data-type-${index}`}>
                          Select field type
                        </label>
                        <select
                          {...register(`data.${index}.type`)}
                          className='shadow bg-slate-700 appearance-none border rounded w-full py-2 px-3 text-white leading-tight focus:outline-none focus:shadow-outline'
                          id={`data-type-${index}`}
                          defaultValue={item.type}
                        >
                          <option value='text'>Text</option>
                          <option value='image'>Image</option>
                          <option value='video'>Video</option>
                        </select>
                        <label className='block text-white text-sm font-bold mb-2' htmlFor={`data-key-${index}`}>
                          select name
                        </label>
                        <select
                          {...register(`data.${index}.key`)}
                          className='shadow bg-slate-700 appearance-none border rounded w-full py-2 px-3 text-white leading-tight focus:outline-none focus:shadow-outline'
                          id={`data-type-${index}`}
                          defaultValue={item.key}
                        >
                          <option value='title'>Title</option>
                          <option value='sub_title'>Sub Title</option>
                          <option value='description'>Description</option>
                          <option value='list_text'>List Text</option>
                          <option value='image'>image</option>
                          <option value='video'>video</option>
                        </select>

                        <label className='block text-white text-sm font-bold mb-2' htmlFor={`data-data-${index}`}>
                          Value
                        </label>
                        <input
                          {...register(`data.${index}.data`)}
                          className='shadow bg-slate-700 text-white appearance-none border rounded w-full py-2 px-3 leading-tight focus:outline-none focus:shadow-outline'
                          id={`data-data-${index}`}
                          type='text'
                          defaultValue={item.data}
                        />

                        <button
                          type='button'
                          className='bg-red-600 hover:bg-red-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline mt-2'
                          onClick={() => removeData(index)}
                        >
                          Remove
                        </button>
                      </div>
                    ))}
                    <button
                      type='button'
                      className='bg-[#fff000] hover:bg-[#ffff222] text-slate-800 font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline'
                      onClick={() => appendData({ key: '', data: '', type: '' })}
                    >
                      Add Data
                    </button>
                  </fieldset>

                  <fieldset className='mb-4'>
                    <legend className='text-lg font-bold text-white'>Features</legend>
                    {featureFields.map((item, index) => (
                      <div key={item.id} className='mb-4'>
                        <label className='block text-white text-sm font-bold mb-2' htmlFor={`data-type-${index}`}>
                          Select field type
                        </label>
                        <select
                          {...register(`features.${index}.type`)}
                          className='shadow bg-slate-700 appearance-none border rounded w-full py-2 px-3 text-white leading-tight focus:outline-none focus:shadow-outline'
                          id={`features-type-${index}`}
                          defaultValue={item.type}
                        >
                          <option value='text'>Text</option>
                          <option value='image'>Image</option>
                          <option value='video'>Video</option>
                        </select>
                        <label className='block text-white text-sm font-bold mb-2' htmlFor={`data-key-${index}`}>
                          select name
                        </label>
                        <select
                          {...register(`features.${index}.key`)}
                          className='shadow bg-slate-700 appearance-none border rounded w-full py-2 px-3 text-white leading-tight focus:outline-none focus:shadow-outline'
                          id={`features-type-${index}`}
                          defaultValue={item.key}
                        >
                          <option value='title'>Title</option>
                          <option value='sub_title'>Sub Title</option>
                          <option value='description'>Description</option>
                          <option value='list_text'>List Text</option>
                          <option value='image'>image</option>
                          <option value='video'>video</option>
                        </select>

                        <label className='block text-white text-sm font-bold mb-2' htmlFor={`features-data-${index}`}>
                          Value
                        </label>
                        <input
                          {...register(`features.${index}.data`)}
                          className='shadow bg-slate-700 text-white appearance-none border rounded w-full py-2 px-3 leading-tight focus:outline-none focus:shadow-outline'
                          id={`features-data-${index}`}
                          type='text'
                          defaultValue={item.data}
                        />

                        <button
                          type='button'
                          className='bg-red-600 hover:bg-red-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline mt-2'
                          onClick={() => removeFeature(index)}
                        >
                          Remove
                        </button>
                      </div>
                    ))}
                    <button
                      type='button'
                      className='bg-[#fff000] hover:bg-[#ffff222] text-slate-800 font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline'
                      onClick={() => appendFeature({ key: '', data: '' })}
                    >
                      Add Feature
                    </button>
                  </fieldset>
                  {/* <CodeEditor setValue={setValue} /> */}

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
                    className='w-3/6 px-4 cursor-pointer py-2 bg-yellow-500 text-black font-bold rounded-lg shadow-md hover:bg-yellow-300 focus:outline-none'
                  >
                    update Content
                  </button>
                  {/* <div className='mb-4'>
                    <label className='block text-white font-bold mb-2'>Content Name:</label>
                    <select
                      {...register('content')}
                      // onChange={handleContentChange}

                      className='w-full px-3 py-2 bg-slate-700 border rounded-lg shadow-sm focus:outline-none focus:border-white text-white'
                    >
                      {programsContent?.map((i, index) => (
                        <option value={i.id} key={index}>
                          Content No: - {i.id} / Content Name - {i.title}
                        </option>
                      ))}
                    </select>
                  </div>
                  <div className='mb-4'>
                    <label className='block text-white font-bold mb-2'>Program Title:</label>
                    <input
                      type='text'
                      {...register('title')}
                      defaultValue={selectedItem?.title}
                      // onChange={handleChange}
                      className='w-full px-3 py-2 bg-slate-700 border rounded-lg shadow-sm focus:outline-none focus:border-white text-white'
                    />
                  </div>
                  <div className='mb-4'>
                    <label className='block text-white font-bold mb-2'>Description:</label>
                    <textarea
                      {...register('description')}
                      defaultValue={selectedItem?.description}
                      // onChange={handleChange}
                      className='w-full px-3 py-2 bg-slate-700 border rounded-lg shadow-sm focus:outline-none focus:border-white text-white'
                    />
                  </div>
                  {/* <CodeEditor setValue={setValue} selectedItem={selectedItem} />

                  <div className='mb-4'>
                    <label className='block text-white font-bold mb-2'>Active:</label>
                    <div className='flex items-center'>
                      <input
                        type='checkbox'
                        {...register('is_active')}
                        defaultValue={selectedItem?.is_active}
                        className='toggle-checkbox '
                        id='is_active'
                      />
                      <label htmlFor='is_active' className='ml-2 text-white'>
                        {watch('is_active') ? 'Active' : 'Inactive'}
                      </label>
                    </div>
                  </div>
                  <button
                    type='submit'
                    className='w-full px-4 cursor-pointer py-2 bg-[#ffff00] text-black font-bold rounded-lg shadow-md hover:bg-yellow-300 focus:outline-none'
                  >
                    Update
                  </button> */}
                </form>
              </div>
            </div>
          </Modal>
        ) : null}
        {createProgConteModal ? (
          <Modal>
            <div className='relative w-full max-w-4xl bg-white p-6 rounded-lg shadow-lg'>
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
                <h2 className='text-slate-800 text-center'>Create a Particular Content</h2>
              </div>
              <div className='h-4/6 overflow-y-auto p-4 bg-slate-900 shadow-md rounded-lg'>
                {/* <DynamicForm /> */}
                <form onSubmit={handleSubmit(createOnSubmit)}>
                  <div className='mb-4'>
                    <label className='block text-white font-bold mb-2'>Content Name:</label>
                    <select
                      {...register('content')}
                      className='w-full px-3 py-2 bg-slate-700 border rounded-lg shadow-sm focus:outline-none focus:border-white text-white'
                    >
                      {programsContent?.map((i, index) => (
                        <option value={i.id} key={index}>
                          Content No: - {i.id} / Content Name - {i.title}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div className='mb-4'>
                    <label className='block text-white font-bold mb-2'>Particular content Title:</label>
                    <input
                      type='text'
                      {...register('title')}
                      className='w-full px-3 py-2 bg-slate-700 border rounded-lg shadow-sm focus:outline-none focus:border-white text-white'
                    />
                  </div>

                  <div className='mb-4'>
                    <label className='block text-white font-bold mb-2'> Particular Description:</label>
                    <textarea
                      {...register('description')}
                      className='w-full px-3 py-2 bg-slate-700 border rounded-lg shadow-sm focus:outline-none focus:border-white text-white'
                    />
                  </div>
                  <fieldset className='mb-4'>
                    <legend className='text-lg font-bold text-white'>Data</legend>
                    {dataFields.map((item, index) => (
                      <div key={item.id} className='mb-4'>
                        <label className='block text-white text-sm font-bold mb-2' htmlFor={`data-type-${index}`}>
                          Select field type
                        </label>
                        <select
                          {...register(`data.${index}.type`)}
                          className='shadow bg-slate-700 appearance-none border rounded w-full py-2 px-3 text-white leading-tight focus:outline-none focus:shadow-outline'
                          id={`data-type-${index}`}
                          defaultValue={item.type}
                        >
                          <option value='text'>Text</option>
                          <option value='image'>Image</option>
                          <option value='video'>Video</option>
                          <option value='pdf'>pdf</option>
                        </select>
                        <label className='block text-white text-sm font-bold mb-2' htmlFor={`data-key-${index}`}>
                          select name
                        </label>
                        <select
                          {...register(`data.${index}.key`)}
                          className='shadow bg-slate-700 appearance-none border rounded w-full py-2 px-3 text-white leading-tight focus:outline-none focus:shadow-outline'
                          id={`data-type-${index}`}
                          defaultValue={item.key}
                        >
                          <option value='title'>Title</option>
                          <option value='sub_title'>Sub Title</option>
                          <option value='description'>Description</option>
                          <option value='list_text'>List Text</option>
                          <option value='image'>image</option>
                          <option value='video'>video</option>
                          <option value='pdf'>pdf</option>
                        </select>

                        <label className='block text-white text-sm font-bold mb-2' htmlFor={`data-data-${index}`}>
                          Value
                        </label>
                        <input
                          {...register(`data.${index}.data`)}
                          className='shadow bg-slate-700 text-white appearance-none border rounded w-full py-2 px-3 leading-tight focus:outline-none focus:shadow-outline'
                          id={`data-data-${index}`}
                          type='text'
                          defaultValue={item.data}
                        />

                        <button
                          type='button'
                          className='bg-red-600 hover:bg-red-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline mt-2'
                          onClick={() => removeData(index)}
                        >
                          Remove
                        </button>
                      </div>
                    ))}
                    <button
                      type='button'
                      className='bg-[#fff000] hover:bg-[#ffff222] text-slate-800 font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline'
                      onClick={() => appendData({ key: '', data: '', type: '' })}
                    >
                      Add Data
                    </button>
                  </fieldset>

                  <fieldset className='mb-4'>
                    <legend className='text-lg font-bold text-white'>Features</legend>
                    {featureFields.map((item, index) => (
                      <div key={item.id} className='mb-4'>
                        <label className='block text-white text-sm font-bold mb-2' htmlFor={`data-type-${index}`}>
                          Select field type
                        </label>
                        <select
                          {...register(`features.${index}.type`)}
                          className='shadow bg-slate-700 appearance-none border rounded w-full py-2 px-3 text-white leading-tight focus:outline-none focus:shadow-outline'
                          id={`features-type-${index}`}
                          defaultValue={item.type}
                        >
                          <option value='rest'>Rest time</option>
                          <option value='video'>Video</option>
                        </select>

                        <label className='block text-white text-sm font-bold mb-2' htmlFor={`features-data-${index}`}>
                          Video Title
                        </label>
                        <input
                          {...register(`features.${index}.key`)}
                          className='shadow bg-slate-700 text-white appearance-none border rounded w-full py-2 px-3 leading-tight focus:outline-none focus:shadow-outline'
                          id={`features-data-${index}`}
                          type='text'
                          defaultValue={item.data}
                        />
                        {featureFields[index]?.type == 'video' ? (
                          <>
                            <label
                              className='block text-white text-sm font-bold mb-2'
                              htmlFor={`features-data-${index}`}
                            >
                              Video link
                            </label>

                            <input
                              {...register(`features.${index}.data`)}
                              className='shadow bg-slate-700 text-white appearance-none border rounded w-full py-2 px-3 leading-tight focus:outline-none focus:shadow-outline'
                              id={`features-data-${index}`}
                              type='text'
                              defaultValue={item.data}
                            />
                          </>
                        ) : null}

                        <button
                          type='button'
                          className='bg-red-600 hover:bg-red-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline mt-2'
                          onClick={() => removeFeature(index)}
                        >
                          Remove
                        </button>
                      </div>
                    ))}
                    <button
                      type='button'
                      className='bg-[#fff000] hover:bg-[#ffff222] text-slate-800 font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline'
                      onClick={() => appendFeature({ key: '', data: '', type: 'video' })}
                    >
                      Add Feature
                    </button>
                  </fieldset>
                  {/* <CodeEditor setValue={setValue} /> */}

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
                    className='w-3/6 px-4 cursor-pointer py-2 bg-yellow-500 text-black font-bold rounded-lg shadow-md hover:bg-yellow-300 focus:outline-none'
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
