import React, { useState } from 'react'

import { useForm, Controller } from 'react-hook-form'

import Select from 'react-select'

const options = [
  { value: 'text', label: 'Text' },
  { value: 'image', label: 'Image' },
  { value: 'video', label: 'Video' },
  { value: 'pdf', label: 'PDF' }
]

const DynamicForm = () => {
  const { control, register, handleSubmit } = useForm()
  const [fields, setFields] = useState([{ type: '', id: Date.now() }])

  const onSubmit = data => {
    console.log(data)
  }

  const addField = () => {
    setFields([...fields, { type: '', id: Date.now() }])
  }

  const removeField = id => {
    setFields(fields.filter(field => field.id !== id))
  }

  const handleTypeChange = (index, option) => {
    const newFields = [...fields]

    newFields[index].type = option.value
    setFields(newFields)
  }

  const renderInputField = (type, index) => {
    const commonStyles =
      'w-full px-3 py-2 bg-slate-700 border rounded-lg shadow-sm focus:outline-none focus:border-white text-white'

    switch (type) {
      case 'text':
        return <input {...register(`features.${index}.textInput`)} placeholder='Enter text' className={commonStyles} />
      case 'image':
        return (
          <input type='file' {...register(`features.${index}.imageInput`)} accept='image/*' className={commonStyles} />
        )
      case 'video':
        return (
          <input type='file' {...register(`features.${index}.videoInput`)} accept='video/*' className={commonStyles} />
        )
      case 'pdf':
        return (
          <input
            type='file'
            {...register(`features.${index}.pdfInput`)}
            accept='application/pdf'
            className={commonStyles}
          />
        )
      default:
        return null
    }
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className='mb-4'>
        <label className='block text-white font-bold mb-2'>Title</label>
        <input
          {...register('title')}
          placeholder='Enter title'
          className='w-full px-3 py-2 bg-slate-700 border rounded-lg shadow-sm focus:outline-none focus:border-white text-white'
        />
      </div>
      <div className='mb-4'>
        <label className='block text-white font-bold mb-2'>Description</label>
        <textarea
          {...register('description')}
          placeholder='Enter description'
          className='w-full px-3 py-2 bg-slate-700 border rounded-lg shadow-sm focus:outline-none focus:border-white text-white'
        />
      </div>

      {fields.map((field, index) => (
        <div key={field.id} className='mb-4'>
          <div className='flex items-center'>
            <div className='flex-1'>
              <label className='block text-white font-bold mb-2'>Select type</label>
              <Controller
                name={`features.${index}.type`}
                control={control}
                render={({ field }) => (
                  <Select
                    {...field}
                    options={options}
                    className='w-full text-black'
                    onChange={option => {
                      field.onChange(option)
                      handleTypeChange(index, option)
                    }}
                  />
                )}
              />
            </div>
          </div>
          <div className='mt-2'>{renderInputField(field.type, index)}</div>
          <div className='pt-2'>
            <button
              type='button'
              onClick={() => removeField(field.id)}
              className='bg-red-600 hover:bg-red-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline ml-2'
            >
              Remove
            </button>
          </div>
        </div>
      ))}
      <div className='ml-2'>
        <button
          type='button'
          onClick={addField}
          className='bg-[#fff000] hover:bg-[#ffff222] text-slate-800 font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline mt-2 mb-4'
        >
          Add New
        </button>
      </div>
      <div className='block'>
        <button
          type='submit'
          className='w-3/6 px-4 cursor-pointer py-2 bg-yellow-500 text-black font-bold rounded-lg shadow-md hover:bg-yellow-300 focus:outline-none'
        >
          Submit
        </button>
      </div>
    </form>
  )
}

export default DynamicForm
