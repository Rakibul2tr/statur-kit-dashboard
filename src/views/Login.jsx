'use client'

// React Imports
import { useEffect, useState } from 'react'

import Image from 'next/image'

// Next Imports
import { useRouter } from 'next/navigation'

// MUI Imports
import { styled, useTheme } from '@mui/material/styles'
import Typography from '@mui/material/Typography'

// Third-party Imports
import classnames from 'classnames'

// Config Imports
import themeConfig from '@configs/themeConfig'

import { useSettings } from '@core/hooks/useSettings'
import { useLoginUserMutation } from '@/redux/api/apiSlice'

const LoginV2 = () => {
  // States
  const [showPassword, setShowPassword] = useState(false)
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  // Hooks
  const router = useRouter()

  const { settings } = useSettings()
  const theme = useTheme()

  // redux data fetching
  const [loginUser, { data, isLoading, isSuccess, isError, error }] = useLoginUserMutation()

  // login handel
  const handleSubmit = e => {
    e.preventDefault()
    loginUser({
      email: email,
      password: password
    })
  }

  // console.log('isSuccess', isSuccess)
  // console.log('user', data)
  // console.log('isError', isError)
  // console.log('error', error)

  useEffect(() => {
    if (isSuccess) {
      localStorage.setItem('user', JSON.stringify(data))
      router.push('/dashboard')
    } else if (isError) {
      console.log('error check')
    }
  }, [isSuccess, router, isError, data])

  if (isLoading) {
    return (
      <div className='flex-col items-center justify-center w-full h-screen '>
        <h1 className='text-center'>Loading...</h1>
        <h3 className='text-center'>Please wait some minutes</h3>
      </div>
    )
  }

  return (
    <div className='md:flex max-md:flex-col md:bs-full max-md:bs-12 justify-center max-md:justify-around '>
      <div
        className={classnames(
          'flex md:bs-full items-center justify-center flex-1 min-bs-[100dvh] max-md:min-bs-24 relative p-6   bg-backgroundPaper'
        )}
      >
        <Image src='/images/logo/icon-white.png' alt='' width={500} height={400} priority={false} />
      </div>
      <div className='flex justify-center items-center md:bs-full max-md:bs-full bg-backgroundPaper !min-is-full p-6 md:!min-is-[unset] md:p-12 md:is-[480px] '>
        <div className='flex flex-col gap-6 is-full sm:is-auto md:is-full sm:max-is-[400px] md:max-is-[unset] mbs-11 sm:mbs-14 md:mbs-0'>
          <div className='flex flex-col gap-1'>
            <Typography variant='h4'>{`Welcome to ${themeConfig.templateName}! 👋🏻`}</Typography>
            <Typography>Please ign-in to your account and start the adventure</Typography>
          </div>

          <form className='space-y-6' onSubmit={handleSubmit}>
            <div>
              <label htmlFor='email' className='block text-sm font-medium text-gray-700'>
                Email address
              </label>
              <input
                id='email'
                name='email'
                type='email'
                autoComplete='email'
                placeholder='Enter your email'
                required
                className='w-full px-3 py-2 mt-1 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500'
                value={email}
                onChange={e => setEmail(e.target.value)}
              />
            </div>
            <div>
              <label htmlFor='password' className='block text-sm font-medium text-gray-700'>
                Password
              </label>
              <div className='relative'>
                <input
                  id='password'
                  name='password'
                  type={showPassword ? 'text' : 'password'}
                  autoComplete='current-password'
                  required
                  className='w-full px-3 py-2 mt-1 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500'
                  value={password}
                  placeholder='Enter your password'
                  onChange={e => setPassword(e.target.value)}
                />
                <button
                  type='button'
                  className='absolute inset-y-0 right-0 flex items-center px-3 text-sm font-medium text-gray-700 focus:outline-none h-3 top-3'
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? 'Hide' : 'Show'}
                </button>
              </div>
            </div>
            <div>
              <button
                type='submit'
                className='cursor-pointer w-full px-4 py-2 text-sm font-medium text-white bg-indigo-600 border border-transparent rounded-md shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500'
              >
                Sign In
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  )
}

export default LoginV2
