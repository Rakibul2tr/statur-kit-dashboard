'use client'
import React, { useEffect, useState } from 'react'

import Image from 'next/image'

import { useForm, useFieldArray } from 'react-hook-form'

import {
  useAllBodyPartCategoryQuery,
  useGetBodyPartContentQuery,
  useCreateBodyPartContentMutation,
  useDeleteBodyPartContentMutation,
  useUpdateBodyPartContentMutation
} from '@/redux/api/apiSlice'
import Modal from '../../../components/Modal'

const theadData = [
  {
    id: 'content Id',
    Category_id: 'Category Id',
    title: 'title',
    description: 'description',
    image: 'image',
    action: 'Action'
  }
]

export default function Page() {
  const [userData, setUserData] = useState({})
  const [showModal, setShowModal] = useState(false)
  const [createModal, setCreateModal] = useState(false)
  const [selectedItem, setSelectedItem] = useState({})

  // api fetching
  const { data: Category } = useAllBodyPartCategoryQuery(userData ? { token: userData?.token } : null)

  const {
    data: CategoryContentList,
    isSuccess,
    refetch
  } = useGetBodyPartContentQuery(userData ? { token: userData?.token } : null)

  const [createBodyPartContent, { isSuccess: createSuccess, error: createError }] = useCreateBodyPartContentMutation()

  const [updateBodyPartContent, { data, isSuccess: updateSuccess, error: updateError }] =
    useUpdateBodyPartContentMutation()

  const [deleteBodyPartContent, { isSuccess: deleteSuccess, error: deleteError }] = useDeleteBodyPartContentMutation()

  // react hook form===================
  const { register, handleSubmit, control, watch, reset } = useForm({
    defaultValues: selectedItem
  })

  const { fields: dataFields, append: appendData } = useFieldArray({
    control,
    name: 'data'
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
  }, [])

  //  modal open handel
  const toggleModal = item => {
    reset(selectedItem)
    setSelectedItem(item)
    setShowModal(true)
  }

  //  modal close handel

  const closeModal = () => {
    setShowModal(false)
    setCreateModal(false)
  }

  // create body part content with react hook form============

  const onSubmit = data => {
    data.category = parseInt(data.category)
    console.log('create', data)

    createBodyPartContent({ data, token: userData.token })
  }

  useEffect(() => {
    if (createSuccess) {
      alert('Created successful')
      setCreateModal(false)
      refetch()
    } else if (createError) {
      console.log('create content error', createError)
    }
  }, [createSuccess, createError, refetch])

  //========================== body part content update handel=====================

  const onSubmitUpdate = data => {
    // Convert necessary fields to numbers
    data.category = parseInt(data.category)
    data.data = data.data.map(item => ({
      ...item,
      key: item.key,
      data: item.data,
      type: item.type
    }))

    updateBodyPartContent({ data, id: selectedItem.category.id, token: userData.token })
  }

  useEffect(() => {
    if (updateSuccess) {
      alert('Update Successful')
      setShowModal(false)
      refetch()
    } else if (updateError) {
      console.log(updateError)
    }
  }, [updateSuccess, updateError, refetch])

  //=====================body part category delete handel===================
  const DeleteHandel = id => {
    deleteBodyPartContent({ id: id, token: userData?.token })
  }

  useEffect(() => {
    if (deleteSuccess) {
      alert('Content is deleted')
      refetch()
    } else if (deleteError) {
      alert(deleteError)
    }
  }, [deleteSuccess, deleteError, refetch])

  return (
    <div className=' p-2'>
      {/* main title  */}
      <div className='main-header bg-slate-900 flex flex-row items-center justify-between shadow-md shadow-red-400 py-3 px-3 rounded-t-md'>
        <h1 className='text-slate-300 text-2xl capitalize'>Body Part contetn list</h1>
        <button
          className='p-3 rounded-lg bg-yellow-400 text-white hover:bg-yellow-500 cursor-pointer'
          onClick={() => setCreateModal(true)}
        >
          Add Content
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
                    {CategoryContentList?.map(item => {
                      return (
                        <tr key={item.id}>
                          <td className='px-6 py-4 text-sm font-medium text-slate-300 whitespace-nowrap'>{item?.id}</td>
                          <td className='px-6 py-4 text-sm font-medium text-slate-300 whitespace-nowrap'>
                            {item?.category?.id}
                          </td>
                          <td className='px-6 py-4 text-sm text-slate-300 whitespace-nowrap'>{item?.title}</td>
                          <td className='px-6 max-w-48 py-4 text-sm text-slate-300 whitespace-nowrap overflow-hidden text-ellipsis'>
                            {item.description}
                          </td>
                          <td className='px-6 py-4 text-sm text-slate-300 whitespace-nowrap'>
                            <Image src={item?.photo_url} alt='' width={50} height={40} className='rounded' />
                          </td>
                          <td className=' text-sm font-medium text-right whitespace-nowrap'>
                            <div className='flex justify-between mr-2'>
                              <div className='bg-[#ffff00] px-2 py-1 rounded-md '>
                                <button className='bg-[#ffff00] cursor-pointer' onClick={() => toggleModal(item)}>
                                  <i className='tabler-edit'></i>
                                </button>
                              </div>
                              <div className='bg-[#ffff00] px-2 py-1 rounded-md'>
                                <button className='bg-[#ffff00] cursor-pointer' onClick={() => DeleteHandel(item.id)}>
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
      {/* update  */}
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
            <h2 className='text-slate-800 text-center'>Update a body part content</h2>
          </div>
          <div className='h-96 overflow-y-auto p-4 bg-slate-900 shadow-md rounded-lg'>
            <form onSubmit={handleSubmit(onSubmitUpdate)}>
              <div className='mb-4'>
                <label className='block text-white font-bold mb-2'>Category Name:</label>
                <select
                  {...register('category')}
                  defaultValue={selectedItem?.category?.id}
                  className='w-full px-3 py-2 bg-slate-700 border rounded-lg shadow-sm focus:outline-none focus:border-white text-white'
                >
                  {Category?.map((i, index) => {
                    return (
                      <option value={i.id} key={index}>
                        Id : {i.id} / {i?.title}
                      </option>
                    )
                  })}
                </select>
              </div>

              <div className='mb-4'>
                <label className='block text-white font-bold mb-2'>Content Title:</label>
                <input
                  type='text'
                  {...register('title')}
                  defaultValue={selectedItem?.title}
                  className='w-full px-3 py-2 bg-slate-700 border rounded-lg shadow-sm focus:outline-none focus:border-white text-white'
                />
              </div>

              <div className='mb-4'>
                <label className='block text-white font-bold mb-2'>Description:</label>
                <textarea
                  {...register('description')}
                  defaultValue={selectedItem?.description}
                  className='w-full px-3 py-2 bg-slate-700 border rounded-lg shadow-sm focus:outline-none focus:border-white text-white'
                />
              </div>

              <fieldset className='mb-4'>
                <legend className='text-lg font-bold text-white'>Data</legend>
                {dataFields.map((item, index) => (
                  <div key={item.id} className='mb-4'>
                    <label className='block text-white text-sm font-bold mb-2' htmlFor={`data-key-${index}`}>
                      Key
                    </label>
                    <input
                      {...register(`data.${index}.key`)}
                      defaultValue={selectedItem.data[index]?.key}
                      className='shadow bg-slate-700 appearance-none border rounded w-full py-2 px-3 text-white leading-tight focus:outline-none focus:shadow-outline'
                      id={`data-key-${index}`}
                      type='text'
                    />

                    <label className='block text-white text-sm font-bold mb-2' htmlFor={`data-data-${index}`}>
                      Value
                    </label>
                    <input
                      {...register(`data.${index}.data`)}
                      defaultValue={selectedItem.data[index]?.data}
                      className='shadow bg-slate-700 text-white appearance-none border rounded w-full py-2 px-3 leading-tight focus:outline-none focus:shadow-outline'
                      id={`data-data-${index}`}
                      type='text'
                    />

                    <label className='block text-white text-sm font-bold mb-2' htmlFor={`data-type-${index}`}>
                      Type
                    </label>
                    <select
                      {...register(`data.${index}.type`)}
                      defaultValue={selectedItem.data[index]?.type}
                      className='shadow bg-slate-700 appearance-none border rounded w-full py-2 px-3 text-white leading-tight focus:outline-none focus:shadow-outline'
                      id={`data-type-${index}`}
                    >
                      <option value='text'>Text</option>
                      <option value='image'>Image</option>
                      <option value='video'>Video</option>
                    </select>
                  </div>
                ))}
                <button
                  type='button'
                  className='bg-slate-800 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline'
                  onClick={() => appendData({ key: '', data: '', type: '' })}
                >
                  Add Data
                </button>
              </fieldset>

              <div className='mb-4'>
                <label className='block text-white font-bold mb-2'>Active:</label>
                <div className='flex items-center'>
                  <input
                    type='checkbox'
                    {...register('is_active')}
                    defaultChecked={selectedItem.is_active}
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
                className='w-full px-4 cursor-pointer py-2 bg-yellow-500 text-black font-bold rounded-lg shadow-md hover:bg-yellow-300 focus:outline-none'
              >
                Update Content
              </button>
            </form>
          </div>
        </Modal>
      ) : null}
      {/* create */}
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
            <h2 className='text-slate-800 text-center capitalize'>Create a category content</h2>
          </div>

          <div className='h-96 overflow-y-auto p-4 bg-slate-900 shadow-md rounded-lg'>
            <form onSubmit={handleSubmit(onSubmit)}>
              <div className='mb-4'>
                <label className='block text-white font-bold mb-2'>Category Name:</label>
                <select
                  {...register('category')}
                  className='w-full px-3 py-2 bg-slate-700 border rounded-lg shadow-sm focus:outline-none focus:border-white text-white'
                >
                  {Category?.map((i, index) => (
                    <option value={i.id} key={index}>
                      Id : {i.id} / {i.title}
                    </option>
                  ))}
                </select>
              </div>

              <div className='mb-4'>
                <label className='block text-white font-bold mb-2'>Content Title:</label>
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

              <fieldset className='mb-4'>
                <legend className='text-lg font-bold text-white'>Data</legend>
                {dataFields.map((item, index) => (
                  <div key={item.id} className='mb-4'>
                    <label className='block text-white text-sm font-bold mb-2' htmlFor={`data-key-${index}`}>
                      Key
                    </label>
                    <input
                      {...register(`data.${index}.key`)}
                      className='shadow bg-slate-700 appearance-none border rounded w-full py-2 px-3 text-white leading-tight focus:outline-none focus:shadow-outline'
                      id={`data-key-${index}`}
                      type='text'
                    />

                    <label className='block text-white text-sm font-bold mb-2' htmlFor={`data-data-${index}`}>
                      Value
                    </label>
                    <input
                      {...register(`data.${index}.data`)}
                      className='shadow bg-slate-700 text-white appearance-none border rounded w-full py-2 px-3 leading-tight focus:outline-none focus:shadow-outline'
                      id={`data-data-${index}`}
                      type='text'
                    />

                    <label className='block text-white text-sm font-bold mb-2' htmlFor={`data-type-${index}`}>
                      Type
                    </label>
                    <select
                      {...register(`data.${index}.type`)}
                      className='shadow bg-slate-700 appearance-none border rounded w-full py-2 px-3 text-white leading-tight focus:outline-none focus:shadow-outline'
                      id={`data-type-${index}`}
                    >
                      <option value='text'>Text</option>
                      <option value='image'>Image</option>
                      <option value='video'>Video</option>
                    </select>
                  </div>
                ))}
                <button
                  type='button'
                  className='bg-slate-800 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline'
                  onClick={() => appendData({ key: '', data: '', type: '' })}
                >
                  Add Data
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
        </Modal>
      ) : null}
    </div>
  )
}
