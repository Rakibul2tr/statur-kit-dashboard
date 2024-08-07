'use client'
import React, { useEffect, useState } from 'react'

import Swal from 'sweetalert2'

import { useForm, useFieldArray } from 'react-hook-form'

import CustomEditor from '../../../components/CustomEditor'

import {
  useAllDietCategoryQuery,
  useAllDietListQuery,
  useCreateDietMutation,
  useDeleteDietMutation,
  useUpdateDietMutation
} from '@/redux/api/apiSlice'
import Modal from '../../../components/Modal'

const theadData = [
  {
    diet_Id: 'Product Id',
    title: 'title',
    category_id: 'category Id',
    category_title: 'category Title',
    discount: 'Discount Percent',
    action: 'Action'
  }
]

export default function Page() {
  const [userData, setUserData] = useState({})
  const [showModal, setShowModal] = useState(false)

  // const [refresh, setRefresh] = useState(false)
  const [createModal, setCreateModal] = useState(false)
  const [selectedItem, setSelectedItem] = useState({})

  // api fetching
  const { data: allDietCatList } = useAllDietCategoryQuery(userData ? { token: userData?.token } : null)

  const { data: allDietList, isSuccess, refetch } = useAllDietListQuery(userData ? { token: userData?.token } : null)
  const [createDiet, { isSuccess: createSuccess, error: createError }] = useCreateDietMutation()
  const [updateDiet, { data, isSuccess: updateSuccess, error: updateError }] = useUpdateDietMutation()
  const [deleteDiet, { isSuccess: deleteSuccess, error: deleteError }] = useDeleteDietMutation()

  const [formData, setFormData] = useState({
    category: selectedItem.category || 1,
    title: selectedItem.title || '',
    description: selectedItem.description || '',
    photo_url: selectedItem.photo_url || '',
    data: selectedItem?.data || { key: '', data: '', type: '' },
    is_active: true,
    is_featured: false
  })

  const [chengInput, setChangeInput] = useState({ value: '' })

  console.log('input change', chengInput)

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
      category: selectedItem?.category?.id,
      title: selectedItem?.title,
      description: selectedItem?.description,
      photo_url: selectedItem?.photo_url,
      discount_percent: selectedItem?.discount_percent,
      is_active: true
    })
  }, [selectedItem, allDietList, refetch])

  // modal for data update

  // Handle input changes for static fields
  const handleChange = e => {
    const { name, value, type, checked } = e.target

    setFormData(prev => ({
      ...prev,

      [name]: type === 'checkbox' ? checked : name === 'category' ? Number(value) : value
    }))
  }

  // Handle input changes for dynamic fields

  const handleDataChange = e => {
    const { name, value } = e.target

    setFormData(prev => ({
      ...prev,
      data: {
        ...prev.data,
        [name]: value
      }
    }))
  }

  //  modal open handel

  const toggleModal = (item, key) => {
    if (key == 'update') {
      setSelectedItem(item)
      setShowModal(true)
    } else {
      setCreateModal(true)
    }
  }

  //  modal close handel

  const closeModal = () => {
    setFormData({
      category: null,
      title: '',
      description: '',
      photo_url: '',
      discount_percent: null,
      is_active: true
    })
    setShowModal(false)
    setCreateModal(false)
  }

  // create diet======================================
  // create program particular content data handel=====================

  const { register, handleSubmit, control, watch, setValue } = useForm({
    defaultValues: {
      category: selectedItem?.category || '',
      title: selectedItem?.title || '',
      description: selectedItem?.description || '',
      data: selectedItem?.data || [{ key: '', data: '', type: '' }],
      is_active: selectedItem?.is_active || false
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

  useEffect(() => {
    if (selectedItem) {
      setValue('category', selectedItem.category)
      setValue('title', selectedItem.title)
      setValue('description', selectedItem.description)
      setValue('data', selectedItem.data)
      setValue('is_active', selectedItem.is_active)
      setValue('html', selectedItem.html)
    }
  }, [selectedItem, setValue])

  const createOnSubmit = data => {
    data.category = parseInt(data.category)
    console.log('data', data)

    // createDiet({
    //   token: userData.token,
    //   formData: data
    // })
  }

  useEffect(() => {
    if (createSuccess) {
      Swal.fire({
        title: 'Good job!',
        text: 'Created successful!',
        icon: 'success'
      })
      setCreateModal(false)
      refetch()
    } else if (createError) {
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'Something went wrong!'
      })
    }
  }, [createSuccess, createError, refetch])

  // diet update handel=================================
  const updateHandleSubmit = async e => {
    e.preventDefault()
    const token = userData.token

    try {
      await updateDiet({
        token: token,
        formData: formData,
        id: selectedItem.id
      })
    } catch (error) {
      console.error('Error submitting form data:', error)
    }
  }

  useEffect(() => {
    if (updateSuccess) {
      alert('Create Successful')
      setShowModal(false)
      refetch()
    } else if (updateError) {
      console.log(updateError)
    }
  }, [updateSuccess, updateError, refetch])

  //single diet delete handel============================
  const dietDeleteHandel = id => {
    deleteDiet({ id: id, token: userData?.token })
  }

  useEffect(() => {
    if (deleteSuccess) {
      Swal.fire({
        title: 'Good job!',
        text: 'Diet item is deleted!',
        icon: 'success'
      })
      refetch()
    } else if (deleteError) {
      alert(deleteError)
    }
  }, [deleteSuccess, deleteError, refetch])

  return (
    <div className=' p-2'>
      {/* main title  */}
      <div className='main-header bg-slate-900 flex flex-row items-center justify-between shadow-md shadow-red-400 py-3 px-3 rounded-t-md'>
        <h1 className='text-slate-300 text-2xl '>Diet List</h1>
        <button
          className='p-3 rounded-lg bg-yellow-400 text-white hover:bg-yellow-500 cursor-pointer'
          onClick={() => toggleModal()}
        >
          Add diet
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
                    {allDietList?.map(item => {
                      return (
                        <tr key={item.id}>
                          <td className='px-6 py-4 text-sm font-medium text-slate-300 whitespace-nowrap'>{item.id}</td>
                          <td className='px-6 py-4 text-sm text-slate-300 whitespace-nowrap'>{item.title}</td>

                          <td className='px-6 py-4 text-sm text-slate-300 whitespace-nowrap'>{item?.category?.id}</td>

                          <td className='px-6 py-4 text-sm text-slate-300 whitespace-nowrap'>
                            {item?.category?.title}
                          </td>

                          <td className='px-6 py-4 text-sm text-slate-300 whitespace-nowrap'>
                            {item?.discount_percent}
                          </td>

                          <td className=' text-sm font-medium text-right whitespace-nowrap'>
                            <div className='flex justify-between mr-2'>
                              <div className='bg-[#ffff00] px-2 py-1 rounded-md '>
                                <button
                                  className='bg-[#ffff00] cursor-pointer'
                                  onClick={() => toggleModal(item, 'update')}
                                >
                                  <i className='tabler-edit'></i>
                                </button>
                              </div>
                              <div className='bg-[#ffff00] px-2 py-1 rounded-md'>
                                <button
                                  className='bg-[#ffff00] cursor-pointer'
                                  onClick={() => dietDeleteHandel(item.id)}
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
      {/* diet update  */}
      {showModal ? (
        <Modal>
          <button
            onClick={() => closeModal()}
            className='cursor-pointer absolute top-6 rounded-lg right-2  m-2 bg-[#ffff00] p-2'
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
            <h2 className='text-slate-800 text-center'>Update a diet</h2>
          </div>
          <form onSubmit={updateHandleSubmit} className='max-w-2xl mx-auto p-4 bg-slate-900 shadow-md rounded-lg'>
            <div className='mb-4'>
              <label className='block text-white font-bold mb-2'>Diet category</label>

              <select
                name='category'
                value={formData.category}
                onChange={handleChange}
                className='w-full px-3 py-2 bg-slate-700 border rounded-lg shadow-sm focus:outline-none focus:border-white text-white'
              >
                {allDietCatList.map(category => {
                  return (
                    <option key={category.id} value={category.id}>
                      {category.title}
                    </option>
                  )
                })}
              </select>
            </div>
            <div className='mb-4'>
              <label className='block text-white font-bold mb-2'>Diet plan Title:</label>
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
              Update Diet
            </button>
          </form>
        </Modal>
      ) : null}

      {createModal ? (
        <Modal>
          <button
            onClick={() => closeModal()}
            className='cursor-pointer absolute top-6 rounded-lg right-2 m-2 bg-[#ffff00] p-2'
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
            <h2 className='text-slate-800 text-center'>Create a diet</h2>
          </div>

          <form
            onSubmit={handleSubmit(createOnSubmit)}
            className='max-w-xl mx-auto p-4 bg-slate-900 shadow-md rounded-lg'
          >
            <div className='mb-4'>
              <label className='block text-white font-bold mb-2'>Diet Category Id :</label>
              <select
                name='category'
                {...register('category')}
                onChange={handleChange}
                className='w-full px-3 py-2 bg-slate-700 border rounded-lg shadow-sm focus:outline-none focus:border-white text-white'
              >
                {allDietCatList.map(category => {
                  return (
                    <option key={category.id} value={category.id}>
                      {category.title}
                    </option>
                  )
                })}
              </select>
            </div>
            <div className='mb-4'>
              <label className='block text-white font-bold mb-2'>Diet plan Title:</label>
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
                    onChange={e => setChangeInput(e.target.value)}
                  >
                    <option value='text'>Text</option>
                    <option value='image'>Image</option>
                    <option value='video'>Video</option>
                    <option value='pdf'>Pdf</option>
                  </select>

                  {/* <CustomEditor setValue={setValue} /> */}

                  {/* {chengInput == 'text' && <CodeEditor setValue={setValue} />} */}
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
                    <option value='pdf'>Pdf</option>
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

const productCategory = [
  { id: 1, value: 'Diet' },
  { id: 2, value: 'leg' },
  { id: 3, value: 'body' },
  { id: 4, value: 'hand' },
  { id: 5, value: 'Category-5' },
  { id: 6, value: 'Category-6' },
  { id: 7, value: 'Category-7' },
  { id: 8, value: 'Category-8' }
]
