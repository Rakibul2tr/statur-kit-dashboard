'use client'

import React, { useEffect, useState } from 'react'

import UserInfoUpdate from '../../../components/userinfoUpdate'

export default function Page() {
  const [userData, setUserData] = useState({})

  console.log('user', userData)

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

  return (
    <div>
      <div className='userinfo'>
        <UserInfoUpdate userData={userData} />
      </div>
    </div>
  )
}
