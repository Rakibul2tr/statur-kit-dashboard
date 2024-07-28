'use client'
import { useEffect, useState } from 'react'

// Next Imports
import { redirect } from 'next/navigation'

export default function Page() {
  const [userInfo, setUserInfo] = useState()

  useEffect(() => {
    const localData = async () => {
      const data = localStorage.getItem('user')
      const userData = JSON.parse(data)

      if (userData) {
        setUserInfo(userData)
      } else {
        return
      }
    }

    localData()
  }, [])

  if (userInfo) {
    return redirect('/dashboard')
  }

  return redirect('/login')
}
