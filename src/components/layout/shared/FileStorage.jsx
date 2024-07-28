import React, { useState } from 'react'

const UploadForm = () => {
  const [photo, setPhoto] = useState(null)
  const [video, setVideo] = useState(null)

  const handlePhotoChange = event => {
    setPhoto(event.target.files[0])
  }

  const handleVideoChange = event => {
    setVideo(event.target.files[0])
  }

  const handleSubmit = event => {
    event.preventDefault()

    if (photo) {
      console.log({ photo })
      alert('photo uploaded successfully!')
    } else if (video) {
      console.log({ video })
      alert('video uploaded successfully!')
    } else if (!photo || !video) {
      alert('Please upload both photo and video.')

      return
    }

    setPhoto(null)
    setVideo(null)
    event.target.reset()
  }

  return (
    <>
      <div className='flex items-center justify-start gap-2 w-full mb-1'>
        <div className='flex items-center w-5/12 justify-between bg-slate-950 p-2 rounded-md'>
          <span className='text-xs'>This is photo link</span>
          <i className='tabler-copy text-[#ffff00] '></i>
        </div>
        <div className='flex items-center w-5/12 justify-between bg-slate-950 p-2 rounded-md'>
          <span className='text-xs'>This is video link</span>
          <i className='tabler-copy text-[#ffff00] '></i>
        </div>
      </div>
      <form onSubmit={handleSubmit} className='flex flex-row items-center space-x-4'>
        <div className='flex items-center '>
          <label htmlFor='photo' className='text-sm font-medium text-white mr-2'>
            <i className='tabler-camera-plus text-[#ffff00] '></i>
          </label>
          <input
            type='file'
            id='photo'
            accept='image/*'
            onChange={handlePhotoChange}
            className=' w-48 text-sm text-white border border-gray-300 rounded-lg cursor-pointer focus:outline-none'
          />
        </div>
        <div className=' flex items-center'>
          <label htmlFor='video' className=' text-sm font-medium text-white mr-2'>
            <i className='tabler-video text-[#ffff00] '></i>
          </label>
          <input
            type='file'
            id='video'
            accept='video/*'
            onChange={handleVideoChange}
            className='  text-sm text-white w-48 border border-gray-300 rounded-lg cursor-pointer focus:outline-none'
          />
        </div>
        <button
          type='submit'
          className='px-4 py-1 bg-[#ffff22] text-black rounded-lg hover:bg-[#fff333] focus:outline-none'
        >
          Submit
        </button>
      </form>
    </>
  )
}

export default UploadForm
